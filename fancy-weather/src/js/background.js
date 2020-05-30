import { unsplashToken } from './constants';
import { openModal } from './helpers';

async function getBackgroundImage(season, dayPart) {
  try {
    const url = `https://api.unsplash.com/photos/random?query=${season},${dayPart},city,nature&client_id=${unsplashToken}`;
    console.log('background img request', url);
    const res = await fetch(url);
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data.urls.regular;
    }
    openModal(res, 'Background');
  } catch (e) {
    console.log(e);
  }
}

async function updateBackground(season, dayPart) {
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
}

export { updateBackground };
