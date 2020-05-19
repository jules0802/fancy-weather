import { openWeatherToken, weatherIcons } from './constants';
import { store } from './storage';
// import { translatePage } from './translation';

function getIconPath(weatherIconId) {
  return weatherIcons[weatherIconId];
}

function calcFtoC(fahrengateValue) {
  return Math.round((fahrengateValue - 32) * (5 / 9));
}

function calcCtoF(celsiusValue) {
  return Math.round((celsiusValue * (9 / 5)) + 32);
}

function showCurrentWeather(data) {
  document.querySelector('.current-temperature-value').innerText = store.scale === 'f' ? Math.round(data.temp) : calcFtoC(data.temp);
  document.querySelector('.details__description').innerText = data.weather[0].description;
  document.querySelector('.feelings-value').innerText = store.scale === 'f' ? Math.round(data.feels_like) : calcFtoC(data.feels_like);
  document.querySelector('.wind-value').innerText = Math.round(data.wind_speed);
  document.querySelector('.humidity-value').innerText = Math.round(data.humidity);
  document.querySelector('.current-weather-icon').setAttribute('data', getIconPath(data.weather[0].icon));
}

function getDayTime(data) {
  return (data.dt > data.sunset || data.dt < data.sunrize) ? 'night' : 'day';
}


function showForecast(data) {
  document.querySelector('.forecast-container__first .fcst-weather-icon').setAttribute('data', getIconPath(data[0].weather[0].icon));
  document.querySelector('.forecast-container__second .fcst-weather-icon').setAttribute('data', getIconPath(data[1].weather[0].icon));
  document.querySelector('.forecast-container__third .fcst-weather-icon').setAttribute('data', getIconPath(data[2].weather[0].icon));

  document.querySelector('.forecast-container__first .fcst-temp-value').innerText = store.scale === 'f' ? Math.round(data[0].temp.day) : calcFtoC(data[0].temp.day);
  document.querySelector('.forecast-container__second .fcst-temp-value').innerText = store.scale === 'f' ? Math.round(data[1].temp.day) : calcFtoC(data[1].temp.day);
  document.querySelector('.forecast-container__third .fcst-temp-value').innerText = store.scale === 'f' ? Math.round(data[2].temp.day) : calcFtoC(data[2].temp.day);
}


function recalc() {
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
}

async function getWeather(coords) {
  console.log(store.coords);
  let url = '';
  if (store.lang !== 'be') {
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&exclude=minutely,hourly&appid=${openWeatherToken}&lang=${store.lang}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&exclude=minutely,hourly&appid=${openWeatherToken}&lang=ru`;
  }
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showCurrentWeather(data.current);
  showForecast(data.daily);
}

export { getWeather, recalc };
