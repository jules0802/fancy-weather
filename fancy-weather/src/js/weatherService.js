/* eslint-disable consistent-return */
import { openWeatherToken, weatherIcons } from './constants';
import { store } from './storageService';
import { openModal } from './helpers';
// eslint-disable-next-line import/no-cycle
import { getTranslation } from './translationService';

const getIconPath = (weatherIconId) => weatherIcons[weatherIconId];

const calcFtoC = (fahrengateValue) => Math.round((fahrengateValue - 32) * (5 / 9));

const calcCtoF = (celsiusValue) => Math.round((celsiusValue * (9 / 5)) + 32);

const showCurrentWeather = (data) => {
  document.querySelector('.current-temperature-value').innerText = store.scale === 'f' ? Math.round(data.temp) : calcFtoC(data.temp);
  document.querySelector('.details__description').innerText = data.weather[0].description;
  document.querySelector('.feelings-value').innerText = store.scale === 'f' ? Math.round(data.feels_like) : calcFtoC(data.feels_like);
  document.querySelector('.wind-value').innerText = Math.round(data.wind_speed);
  document.querySelector('.humidity-value').innerText = Math.round(data.humidity);
  document.querySelector('.current-weather-icon').setAttribute('data', getIconPath(data.weather[0].icon));
};

const showForecast = (data) => {
  document.querySelector('.forecast-container').children.forEach(async (element, index) => {
    const temperature = element.querySelector('.fcst-temp-value');
    temperature.innerText = store.scale === 'f' ? Math.round(data[index].temp.day) : calcFtoC(data[index].temp.day);
    temperature.setAttribute('data-desc', data[index].weather[0].main);
    temperature.setAttribute('data-descru', await getTranslation(data[index].weather[0].main, 'ru'));
    element.querySelector('.fcst-weather-icon').setAttribute('data', getIconPath(data[index].weather[0].icon));
  });
};


const recalc = () => {
  const toBeRecalculated = [
    document.querySelector('.current-temperature-value'),
    document.querySelector('.forecast-container__first .fcst-temp-value'),
    document.querySelector('.forecast-container__second .fcst-temp-value'),
    document.querySelector('.forecast-container__third .fcst-temp-value'),
    document.querySelector('.feelings-value'),
  ];
  switch (store.scale) {
    case 'f': {
      toBeRecalculated.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.innerText = calcCtoF(+el.innerText);
      });
      break;
    }
    default: {
      toBeRecalculated.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.innerText = calcFtoC(+el.innerText);
      });
      break;
    }
  }
};

const getWeather = async (coords) => {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&exclude=minutely,hourly&appid=${openWeatherToken}&lang=`;
  if (store.lang !== 'be') {
    url += store.lang;
  } else {
    url += 'ru';
  }
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    openModal(res, 'Weather');
  } catch (e) {
    // eslint-disable-next-line no-undef
    const modal = M.Modal.getInstance(document.querySelector('.modal'));
    document.querySelector('.error-text').innerText = `Open Weather Map request failed with error: ${e}. 
    Please, turn on VPN and Ads blocks and retry.`;
    modal.open();
  }
};

const renderWeather = async (coords) => {
  const data = await getWeather(coords);
  showCurrentWeather(data.current);
  showForecast(data.daily);
};

export {
  getWeather, recalc, renderWeather, calcFtoC, calcCtoF, getIconPath,
};
