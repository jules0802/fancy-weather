import { openCageToken } from './constants';
import { store } from './storage';
import { openModal } from './helpers';

export async function getRequestedGeoData(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${openCageToken}&language=${store.lang}&pretty=1`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
  openModal(res, 'Open Cage Data');
}
