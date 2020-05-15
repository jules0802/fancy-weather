import { unsplashToken } from './constants'

async function getBackgroundImage() {
  const url = `https://api.unsplash.com/photos/random?query=morning&client_id=${unsplashToken}`;
   const res = await fetch(url);
   const data = await res.json();
   console.log(data.urls.regular)
   return data.urls.regular;
}

async function updateBackground() {
  document.querySelector('html').style.backgroundImage = `url(${await getBackgroundImage()})`;
}

export { updateBackground }