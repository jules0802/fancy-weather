import { openCageToken } from './constants';
import { store } from './storageService';
import openModal from './helpers';

const getRequestedGeoData = async (city) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${openCageToken}&language=${store.lang}&pretty=1`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
  openModal(res, 'Open Cage Data');
  return res;
};

export default getRequestedGeoData;
