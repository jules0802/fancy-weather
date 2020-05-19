const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((el) => el.toUpperCase());
const DAYS_OF_WEEK_RU = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'].map((el) => el.toUpperCase());
const DAYS_OF_WEEK_BE = ['Панядзелак', 'Аўторак', 'Асяроддзе', 'Чацвер', 'Пятніца', 'Субота', 'Нядзеля'].map((el) => el.toUpperCase());
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ipInfoToken = 'df8d7fa9b9577f';
const openCageToken = '738f6b21910545658067b56a17e900ee';
const mapBoxToken = 'pk.eyJ1IjoianVsZXMwODAyIiwiYSI6ImNrYTU5cmlrajExeHEzbnBuMXBqbGg0dGkifQ.VL3SvWYyZDYt1ZA27u3exA';
const openWeatherToken = '6dc1fdac99307a3792884d3464da6470';
const unsplashToken = '-2TC2GgLDXXWzbhk2l4-AHyzoT2W02uxT5-o2NGoyo8';
const weatherIcons = {
  '01d': '../assets/icons/clear_sky_day.svg',
  '01n': '../assets/icons/clear_sky_night.svg',
  '02d': '../assets/icons/few_clouds_day.svg',
  '02n': '../assets/icons/few_clouds_night.svg',
  '03d': '../assets/icons/scattered_clouds.svg',
  '03n': '../assets/icons/scattered_clouds.svg',
  '04d': '../assets/icons/broken_clouds.svg',
  '04n': '../assets/icons/broken_clouds.svg',
  '09d': '../assets/icons/shower_rain.svg',
  '09n': '../assets/icons/shower_rain.svg',
  '10d': '../assets/icons/rain_day.svg',
  '10n': '../assets/icons/rain_night.svg',
  '11d': '../assets/icons/thunderstorm.svg',
  '11n': '../assets/icons/thunderstorm.svg',
  '13d': '../assets/icons/snow.svg',
  '13n': '../assets/icons/snow.svg',
  '50d': '../assets/icons/mist.svg',
  '50n': '../assets/icons/mist.svg',
};
const yandexTranslateToken = 'trnsl.1.1.20200428T081135Z.f88f4d02b6e83ecd.cdf6646574cac6cb030efeccb1517e02ee735ed2';

export {
  DAYS_OF_WEEK, DAYS_OF_WEEK_RU, DAYS_OF_WEEK_BE,
  MONTHS, ipInfoToken, openCageToken, mapBoxToken, openWeatherToken,
  weatherIcons, unsplashToken, yandexTranslateToken,
};
