import { openWeatherToken } from './constants';
import { store } from './storage';

async function getWeather(coords) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&exclude=minutely,hourly&appid=${openWeatherToken}&lang=${store.lang}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showCurrentWeather(data.current);
}
export { getWeather };

function showCurrentWeather(data) {
  document.querySelector('.current-temperature-value').innerText = store.scale === 'f' ? Math.round(data.temp) : calcFtoC(data.temp);  
  document.querySelector('.details__description').innerText = data.weather[0].description;
  document.querySelector('.feelings-value').innerText = store.scale === 'f' ? Math.round(data.feels_like) : calcFtoC(data.feels_like);
  document.querySelector('.wind-value').innerText = Math.round(data.wind_speed);
  document.querySelector('.humidity-value').innerText = Math.round(data.humidity);
}

function showForecast() {

}

function calcFtoC(fahrengates) {
  return Math.round((fahrengates - 32) * (5 / 9));
}

function calcCtoF(celsiuses) {
  return Math.round((celsiuses * (9 / 5)) + 32);
}