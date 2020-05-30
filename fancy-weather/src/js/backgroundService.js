import { unsplashToken } from './constants';
import openModal from './helpers';

// eslint-disable-next-line consistent-return
const getBackgroundImage = async (season, dayPart) => {
  try {
    const url = `https://api.unsplash.com/photos/random?query=${season},${dayPart},city,nature&client_id=${unsplashToken}`;
    console.log('background img request', url);
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.urls.regular;
    }
    openModal(res, 'Background');
  } catch (e) {
    console.log(e);
  }
};

const updateBackground = async (season, dayPart) => {
  const bgImg = new Image();
  bgImg.onload = function handler() {
    document.querySelectorAll('.background-container').forEach((el) => {
      if (!el.classList.contains('active')) {
        // eslint-disable-next-line no-param-reassign
        el.style.backgroundImage = `url(${bgImg.src})`;
      }
      el.classList.toggle('active');
    });
  };
  bgImg.src = await getBackgroundImage(season, dayPart);
};

export default updateBackground;
