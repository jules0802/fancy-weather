
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
import getCurrentPositionCoordinates from './getCurrentGeoData';
import { updateBackground } from './background';
import { recalc } from './getWeather';
import { translatePage } from './translation';
import { getWeather } from './getWeather';

document.addEventListener('DOMContentLoaded', async () => {
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems);
  enableSpeechRecognition();
  updateBackground();
  getCurrentPositionCoordinates();
});

const layout = new Layout(store);
layout.addToolBar();
layout.addMain();

const currentDate = new CurrentDate();
currentDate.updateTimeOnPage();
currentDate.showForecastHeader();

setInterval(() => {
  new CurrentDate().updateTimeOnPage();
}, 1000);

document.querySelector('.toolbar__refresh-background-btn').addEventListener('click', () => {
  updateBackground();
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
