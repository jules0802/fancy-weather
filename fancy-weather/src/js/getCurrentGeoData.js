import mapboxgl from 'mapbox-gl';
import { ipInfoToken, openCageToken, mapBoxToken } from './constants';
import { store } from './storage';
import { getWeather } from './getWeather';
import { translatePage } from './translation';

async function getCurrentIPGeoData() {
  const url = `https://ipinfo.io/json?token=${ipInfoToken}`;
  const res = await fetch(url);
  const data = await res.json();
  store.coords = data.loc;
  return data.loc;
}

async function getLocalityName(coords) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords}&key=${openCageToken}&language=${store.lang}&pretty=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results[0].components;
}

function addMap(coords) {
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
}

function updateMap(coords) {
  // eslint-disable-next-line no-param-reassign
  coords = coords.reverse();
  store.map.flyTo({
    center: coords,
    zoom: 8,
    speed: 1,
    curve: 1,
    easing(t) {
      return t;
    }
  });
  store.marker.setLngLat(coords).addTo(store.map);
}

function showLatAndLng(coords) {
  [document.querySelector('.coordinates__latitude .latitude-value').innerText,
    document.querySelector('.coordinates__longitude .longitude-value').innerText] = coords.map((el) => ` ${String(el).split('.')[0]}°${((String((+el).toFixed(2)).split('.')[1] * 60) / 100).toFixed(0)}'`);
}

async function showGeoData(coords) {
  console.log(coords);
  showLatAndLng(coords);

  const placeName = await getLocalityName(coords.join());
  console.log('placeName', placeName);
  document.querySelector('.header__location span').innerText = `${placeName.city || placeName.county}, ${placeName.country}`;
  addMap(coords);
}

async function updateGeoData(coords) {
  console.log(coords);
  showLatAndLng(coords);

  const placeName = await getLocalityName(coords.join());
  console.log('placeName', placeName);
  document.querySelector('.header__location span').innerText = `${placeName.city || placeName.county}, ${placeName.country}`;
  updateMap(coords);
}

function getCurrentPositionCoordinates() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    const crd = pos.coords;
    console.log(crd);
    store.coords = crd;
    await showGeoData([crd.latitude, crd.longitude]);
    await getWeather(store.coords);
    translatePage(store.lang);
  }

  async function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    const location = await getCurrentIPGeoData();
    showGeoData(location.split(','));
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

export { getCurrentPositionCoordinates, showGeoData, updateGeoData };
