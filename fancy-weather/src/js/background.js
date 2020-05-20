import { unsplashToken } from './constants';

async function getBackgroundImage(season, dayPart) {
  console.log(season);
  console.log(dayPart);
  const url = `https://api.unsplash.com/photos/random?query=${season},${dayPart}&client_id=${unsplashToken}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data.urls.regular;
}

async function updateBackground(season, dayPart) {
  document.querySelector('html').style.backgroundImage = `url(${await getBackgroundImage(season, dayPart)})`;
}

export { updateBackground };
