
import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import './materialize';
import enableSpeechRecognition from './speech-recognition';
import Layout from './Layout';
import {
  saveLanguageToStorage, getLanguageFromStorage, saveScaleToStorage, getScaleFromStorage, store,
} from './storage';
import CurrentDate from './CurrentDate';
import { getCurrentPositionCoordinates, showGeoData } from './getCurrentGeoData';
import { updateBackground } from './background';
import { recalc } from './getWeather';
import { translatePage } from './translation';
import { getWeather } from './getWeather';
import { getRequestedGeoData } from './citySearch';


document.addEventListener('DOMContentLoaded', async () => {
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems); 
  enableSpeechRecognition();
});
getCurrentPositionCoordinates();

const layout = new Layout(store);
layout.addToolBar();
layout.addMain();

const currentDate = new CurrentDate();
currentDate.updateTimeOnPage();
currentDate.showForecastHeader();
store.season = currentDate.getCurrentSeason();
store.dayPart = currentDate.getCurrentPartOfDay();
console.log(store.season);
console.log(store.dayPart);
updateBackground(store.season, store.dayPart);

const generalIntervalTimeRefresh = window.setInterval(() => {
  new CurrentDate().updateTimeOnPage();
}, 1000);

document.querySelector('.toolbar__refresh-background-btn').addEventListener('click', () => {
  updateBackground(store.season, store.dayPart);
});

const fBtn = document.querySelector('.temp-scale-select__fahrenheit');
const cBtn = document.querySelector('.temp-scale-select__celsius');

document.querySelector('.toolbar__temp-scale-select').addEventListener('click', (event) => {
  if (event.target.closest('.temp-scale-select__fahrenheit') && !fBtn.classList.contains('active')) {
    fBtn.classList.toggle('active');
    cBtn.classList.toggle('active');
    store.scale = 'f';
    recalc();
  } else if (event.target.closest('.temp-scale-select__celsius') && !cBtn.classList.contains('active')) {
    cBtn.classList.toggle('active');
    fBtn.classList.toggle('active');
    store.scale = 'c';
    recalc();
  }
  saveScaleToStorage(store.scale);
});

document.querySelector('select').addEventListener('change', (event) => {
  store.lang = event.target.value;
  saveLanguageToStorage(store.lang);
  translatePage(store.lang);
});


const form = document.querySelector('.toolbar__search');
const input = document.querySelector('.search__input');

let intervalLocalTimeRefresh;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearInterval(generalIntervalTimeRefresh);
  clearInterval(intervalLocalTimeRefresh);
  console.log(input.value);  
  const data = await getRequestedGeoData(input.value);
  console.log(data);
  store.coords = { latitude: data.results[0].geometry.lat, longitude: data.results[0].geometry.lng };
  await showGeoData([store.coords.latitude, store.coords.longitude]);

  const currentLocalDate = new CurrentDate();
  currentLocalDate.updateTimeOnPage(data.results[0].annotations.timezone.name);
  currentLocalDate.showForecastHeader();
  store.season = currentLocalDate.getCurrentSeason();
  store.dayPart = currentLocalDate.getCurrentPartOfDay(data.results[0].annotations.timezone.name);
  updateBackground(store.season, store.dayPart);

  intervalLocalTimeRefresh = window.setInterval(() => {
    new CurrentDate().updateTimeOnPage(data.results[0].annotations.timezone.name);
  }, 1000);

  await getWeather(store.coords);
})
