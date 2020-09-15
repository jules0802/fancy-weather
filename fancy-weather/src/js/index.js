import 'bootstrap';
import '../css/style.css';
import '../css/style.scss';
import './preload_img';
import 'materialize-css';
import Layout from './Layout';
import {
  saveScaleToStorage, store,
} from './storageService';
import CurrentDate from './CurrentDate';
import { getCurrentPositionCoordinates, updateGeoData } from './currentGeoDataService';
import updateBackground from './backgroundService';
import { recalc, renderWeather } from './weatherService';
import getRequestedGeoData from './citySearchService';
import { ONESEC } from './constants';
import enableSpeechRec from './speechRec';


// document.addEventListener('DOMContentLoaded', () => {
//   const elems = document.querySelectorAll('select');
//   // eslint-disable-next-line
//   const instances = M.FormSelect.init(elems);

//   const modals = document.querySelectorAll('.modal');
//   // eslint-disable-next-line
//   const modalInstance = M.Modal.init(modals);
// });

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-undef 

  getCurrentPositionCoordinates();

  // Layout
  const layout = new Layout(store);
  layout.addToolBar();
  layout.addMain();
  M.AutoInit();

  enableSpeechRec();

  // Date
  const currentDate = new CurrentDate();
  currentDate.updateTimeOnPage();
  currentDate.showForecastHeader();
  store.season = currentDate.getCurrentSeason();
  store.dayPart = currentDate.getCurrentPartOfDay();
  updateBackground(store.season, store.dayPart)
    .then(() => { document.querySelector('.loader').classList.add('hidden'); });

  const generalIntervalTimeRefresh = window.setInterval(() => {
    new CurrentDate().updateTimeOnPage();
  }, ONESEC);

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
    if (data.results.length) {
      store.coords = {
        latitude: data.results[0].geometry.lat,
        longitude: data.results[0].geometry.lng,
      };
      await updateGeoData([store.coords.latitude, store.coords.longitude]);

      const currentLocalDate = new CurrentDate();
      currentLocalDate.updateTimeOnPage(data.results[0].annotations.timezone.name);
      currentLocalDate.showForecastHeader();
      store.season = currentLocalDate.getCurrentSeason();
      store.dayPart = currentLocalDate
        .getCurrentPartOfDay(data.results[0].annotations.timezone.name);
      await updateBackground(store.season, store.dayPart);

      intervalLocalTimeRefresh = window.setInterval(() => {
        new CurrentDate().updateTimeOnPage(data.results[0].annotations.timezone.name);
      }, ONESEC);

      await renderWeather(store.coords);
      document.querySelector('.loader').classList.add('hidden');
    } else {
      document.querySelector('.loader').classList.add('hidden');
      // eslint-disable-next-line no-undef
      const modal = M.Modal.getInstance(document.querySelector('.modal'));
      document.querySelector('.error-text').innerText = `No results for ${input.value}. Change your request.`;
      modal.open();
    }
    input.value = '';
  });
});
