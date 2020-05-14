
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



document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems);
  enableSpeechRecognition();
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
