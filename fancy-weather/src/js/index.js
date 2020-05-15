
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
import {recalc} from './getWeather';

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems);
  enableSpeechRecognition();
  updateBackground();
});

const layout = new Layout(store);
layout.addToolBar();
layout.addMain();

const currentDate = new CurrentDate();
currentDate.updateTimeOnPage();

setInterval(() => {
  new CurrentDate().updateTimeOnPage();
}, 1000);

getCurrentPositionCoordinates();

document.querySelector('.toolbar__refresh-background-btn').addEventListener('click', () => {
  updateBackground();
})

const fBtn = document.querySelector('.temp-scale-select__fahrenheit');
const cBtn = document.querySelector('.temp-scale-select__celsius');

document.querySelector('.toolbar__temp-scale-select').addEventListener('click', () => {
  if(event.target.closest('.temp-scale-select__fahrenheit')) {
    fBtn.classList.add('active');
    cBtn.classList.remove('active');
    store.scale = 'f';
  } else {
    cBtn.classList.add('active');
    fBtn.classList.remove('active');    
    store.scale = 'c';
  }
  recalc();
  saveScaleToStorage(store.scale);
})
