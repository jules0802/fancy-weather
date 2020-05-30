const preloadImages = (...args) => {
  for (let i = 0; i < [...args].length; i += 1) {
    new Image().src = [...args][i];
  }
};

preloadImages(
  './assets/icons/broken_clouds.svg',
  './assets/icons/clear_sky_day.svg',
  './assets/icons/clear_sky_night.svg',
  './assets/icons/few_clouds_day.svg',
  './assets/icons/few_clouds_night.svg',
  './assets/icons/mist.svg',
  './assets/icons/rain_day.svg',
  './assets/icons/rain_night.svg',
  './assets/icons/scattered_clouds.svg',
  './assets/icons/shower_rain.svg',
  './assets/icons/snow.svg',
  './assets/icons/thunderstorm.svg',
);
