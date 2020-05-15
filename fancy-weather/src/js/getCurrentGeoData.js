import mapboxgl from 'mapbox-gl';
import { ipInfoToken, openCageToken, mapBoxToken } from './constants';
import { store } from './storage';
import { getWeather } from './getWeather';

async function showGeoData(coords) {
  console.log(coords);
  [document.querySelector('.coordinates__latitude .latitude-value').innerText,
    document.querySelector('.coordinates__longitude .longitude-value').innerText] = coords.map((el) => `${String(el).split('.')[0]}°${(String((+el).toFixed(2)).split('.')[1]*60/100).toFixed(0)}'`);

  const placeName = await getLocalityName(coords.join());

  document.querySelector('.header__location span').innerText = `${placeName.city}, ${placeName.country}`;
  addMap(coords);
}

function getCurrentPositionCoordinates() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    console.log('Ваше текущее метоположение:');
    console.log(`Широта: ${crd.latitude}`);
    console.log(`Долгота: ${crd.longitude}`);
    console.log(`Плюс-минус ${crd.accuracy} метров.`);

    showGeoData([crd.latitude, crd.longitude]);
    getWeather(crd);
  }

  async function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    const location = await getCurrentIPGeoData();
    showGeoData(location.split(','));
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

async function getCurrentIPGeoData() {
  const url = `https://ipinfo.io/json?token=${ipInfoToken}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data.loc;
}

async function getLocalityName(coords) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords}&key=${openCageToken}&language=${store.lang}&pretty=1`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data.results[0].components;
}

function addMap(coords) {
  console.log(coords);
  // eslint-disable-next-line no-param-reassign
  coords = coords.reverse();
  mapboxgl.accessToken = mapBoxToken;
  const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 14,
    center: coords,
    pitch: 80,
    antialias: true,
  });

  const marker = new mapboxgl.Marker()
    .setLngLat(coords)
    .addTo(map);
}

export default getCurrentPositionCoordinates;
