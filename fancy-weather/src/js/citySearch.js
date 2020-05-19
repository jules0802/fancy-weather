import { openCageToken } from './constants';
import { store } from './storage';
import CurrentDate from './CurrentDate';
import getCurrentPositionCoordinates from './getCurrentGeoData';
import { updateBackground } from './background';
import { recalc } from './getWeather';
import { translatePage } from './translation';
import { getWeather } from './getWeather';

export async function getRequestedGeoData(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${openCageToken}&language=${store.lang}&pretty=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}



