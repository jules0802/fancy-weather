import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import './materialize';
import './preload_img';
import Layout from './Layout';
import {
  saveLanguageToStorage, saveScaleToStorage, store,
} from './storage';
import CurrentDate from './CurrentDate';
import { getCurrentPositionCoordinates, updateGeoData } from './getCurrentGeoData';
import { updateBackground } from './background';
import { recalc, renderWeather } from './getWeather';
import { translatePage, translateVoiceNotificationBtn } from './translation';
import { getRequestedGeoData } from './citySearch';
import {
  generateMessageToSay, setVoice, generateMessageForWeather, generateMessageForForecast,
} from './speechSynthesis';

document.addEventListener('DOMContentLoaded', async () => {
  const elems = document.querySelectorAll('select');
  // eslint-disable-next-line
  const instances = M.FormSelect.init(elems);
});
getCurrentPositionCoordinates();

// Layout
const layout = new Layout(store);
layout.addToolBar();
layout.addMain();

let volume = 0.5;

// Speech Recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechBtn = document.querySelector('.search__speech-button');
// eslint-disable-next-line no-undef
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = store.lang;
recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript);

  if (e.results[0].isFinal && transcript) {
    switch (transcript) {
      case 'Weather':
      case 'Погода':
      case 'Надвор\'е': {
        const msg = new SpeechSynthesisUtterance();
        msg.text = generateMessageForWeather();
        msg.voice = setVoice();
        msg.volume = volume;
        speechSynthesis.speak(msg);
        break;
      }
      case 'Forecast':
      case 'Прогноз':
      case 'Прагноз': {
        const msg = new SpeechSynthesisUtterance();
        msg.text = generateMessageForForecast();
        msg.voice = setVoice();
        msg.volume = volume;
        speechSynthesis.speak(msg);
        break;
      }
      case 'Louder':
      case 'Громче':
      case 'Гучней': {
        if (volume < 1) {
          volume += 0.1;
        }
        break;
      }
      case 'Quiter':
      case 'Тише':
      case 'Цішэй': {
        if (volume > 0) {
          volume -= 0.1;
        }
        break;
      }
      default: {
        document.querySelector('.search__input').value = transcript;
      }
    }
  }
});

speechBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (!speechBtn.classList.contains('active')) {
    speechBtn.classList.add('active');
    recognition.start();
  } else {
    speechBtn.classList.remove('active');
    speechBtn.blur();
    recognition.stop();
  }
});

recognition.addEventListener('end', () => {
  if (document.querySelector('.search__input').value) {
    document.querySelector('.search__general-button').click();
  }
  speechBtn.classList.remove('active');
  speechBtn.blur();
});

// Date
const currentDate = new CurrentDate();
currentDate.updateTimeOnPage();
currentDate.showForecastHeader();
store.season = currentDate.getCurrentSeason();
store.dayPart = currentDate.getCurrentPartOfDay();
const prom1 = updateBackground(store.season, store.dayPart);
prom1.then(() => { document.querySelector('.loader').classList.add('hidden'); });

const generalIntervalTimeRefresh = window.setInterval(() => {
  new CurrentDate().updateTimeOnPage();
}, 1000);

// Event Listeners

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
  recognition.lang = store.lang;
});


const form = document.querySelector('.toolbar__search');
const input = document.querySelector('.search__input');

let intervalLocalTimeRefresh;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  document.querySelector('.loader').classList.remove('hidden');
  document.querySelectorAll('.search button').forEach((btn) => btn.blur());
  clearInterval(generalIntervalTimeRefresh);
  clearInterval(intervalLocalTimeRefresh);
  const data = await getRequestedGeoData(input.value);
  store.coords = {
    latitude: data.results[0].geometry.lat,
    longitude: data.results[0].geometry.lng,
  };
  await updateGeoData([store.coords.latitude, store.coords.longitude]);

  const currentLocalDate = new CurrentDate();
  currentLocalDate.updateTimeOnPage(data.results[0].annotations.timezone.name);
  currentLocalDate.showForecastHeader();
  store.season = currentLocalDate.getCurrentSeason();
  store.dayPart = currentLocalDate.getCurrentPartOfDay(data.results[0].annotations.timezone.name);
  await updateBackground(store.season, store.dayPart);

  intervalLocalTimeRefresh = window.setInterval(() => {
    new CurrentDate().updateTimeOnPage(data.results[0].annotations.timezone.name);
  }, 1000);

  console.log(store.coords);

  await renderWeather(store.coords);
  document.querySelector('.loader').classList.add('hidden');
});

const voiceNotification = document.querySelector('.toolbar__voice-notification');
let clicksCount = 0;
voiceNotification.addEventListener('click', () => {
  clicksCount += 1;
  if (clicksCount === 1) {
    speechSynthesis.getVoices();
    voiceNotification.innerText = 'Listen to weather';
    translateVoiceNotificationBtn();
  } else if (!speechSynthesis.speaking) {
    voiceNotification.innerText = 'Stop';
    translateVoiceNotificationBtn();
    const msg = new SpeechSynthesisUtterance();
    msg.text = generateMessageToSay();
    msg.voice = setVoice();
    msg.volume = volume;
    console.log(store);
    console.log(msg.voice);
    speechSynthesis.speak(msg);
  } else {
    speechSynthesis.cancel();
    voiceNotification.innerText = 'Listen to weather';
    translateVoiceNotificationBtn();
  }
});
