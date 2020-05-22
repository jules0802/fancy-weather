import { unsplashToken } from './constants';

async function getBackgroundImage(season, dayPart) {
  const url = `https://api.unsplash.com/photos/random?query=${season},${dayPart},city,nature&client_id=${unsplashToken}`;
  console.log('background img request', url);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data.urls.regular;
}

async function updateBackground(season, dayPart) {  
  
  try {   
    const bgImg = new Image();
    bgImg.onload = function handler() {
      document.querySelector('html').style.backgroundImage = `url(${bgImg.src})`;
    };
    bgImg.src = await getBackgroundImage(season, dayPart);
  } catch (e) {
    console.log(e);
  }
}

export { updateBackground };
