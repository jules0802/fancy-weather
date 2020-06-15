/* eslint-disable no-alert */
import mapboxgl from 'mapbox-gl';
import { ipInfoToken, openCageToken, mapBoxToken } from './constants';
import { store } from './storageService';
import { renderWeather } from './weatherService';
import { translatePage } from './translationService';
import openModal from './helpers';

const getCurrentIPGeoData = async () => {
  const url = `https://ipinfo.io/json?token=${ipInfoToken}`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    store.coords = data.loc;
    return data.loc;
  }
  openModal(res, 'IP Info');
  return res;
};

const getLocalityName = async (coords) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords}&key=${openCageToken}&language=${store.lang}&pretty=1`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    return data.results[0].components;
  }
  openModal(res, 'Open Cage Data');
  return res;
};


const addMap = (coords) => {
  // eslint-disable-next-line no-param-reassign
  coords = coords.reverse();
  mapboxgl.accessToken = mapBoxToken;
  store.map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 8,
    center: coords,
    pitch: 80,
    antialias: true,
  });

  // eslint-disable-next-line no-unused-vars
  store.marker = new mapboxgl.Marker()
    .setLngLat(coords)
    .addTo(store.map);
};

const updateMap = (coords) => {
  // eslint-disable-next-line no-param-reassign
  coords = coords.reverse();
  store.map.flyTo({
    center: coords,
    zoom: 8,
    speed: 1,
    curve: 1,
    easing(t) {
      return t;
    },
  });
  store.marker.setLngLat(coords).addTo(store.map);
};

const showLatAndLng = (coords) => {
  const textArr = coords.map((el) => ` ${String(el).split('.')[0]}°${((String((+el).toFixed(2)).split('.')[1] * 60) / 100).toFixed(0)}'`);
  [document.querySelector('.coordinates__latitude .latitude-value').innerText,
    document.querySelector('.coordinates__longitude .longitude-value').innerText] = textArr;
};

const showGeoData = async (coords) => {
  showLatAndLng(coords);
  const placeName = await getLocalityName(coords.join());
  document.querySelector('.header__location span').innerText = `${placeName.city || placeName.county}, ${placeName.country}`;
  addMap(coords);
};

const updateGeoData = async (coords) => {
  showLatAndLng(coords);
  const placeName = await getLocalityName(coords.join());
  document.querySelector('.header__location span').innerText = `${placeName.city || placeName.county}, ${placeName.country}`;
  updateMap(coords);
};

const getCurrentPositionCoordinates = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = async (pos) => {
    const crd = pos.coords;
    store.coords = crd;
    await showGeoData([crd.latitude, crd.longitude]);
    await renderWeather(store.coords);
    translatePage(store.lang);
  };

  const error = async (err) => {
    // eslint-disable-next-line no-console
    console.warn(`ERROR(${err.code}): ${err.message}`);
    openModal(err, 'Navigator');
    const location = await getCurrentIPGeoData();
    showGeoData(location.split(','));
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
};

export {
  getCurrentPositionCoordinates, showGeoData, updateGeoData, getLocalityName,
};
