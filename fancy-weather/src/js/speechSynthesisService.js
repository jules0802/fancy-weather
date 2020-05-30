import { store } from './storageService';
import { DAYS_OF_WEEK_RU } from './constants';

function generateMessageToSay() {
  switch (store.lang) {
    case 'en': {
      return `Today, ${document.querySelector('.header__date span').innerText.slice(0, -10)},
     the weather in ${document.querySelector('.header__location span').innerText} is following: 
     the temperature is ${document.querySelector('.current-temperature-value').innerText} degrees ${store.scale === 'c' ? 'centigrade' : 'fahrenheit'},
     ${document.querySelector('.details__description').innerText},
     ${document.querySelector('.feelings-text').innerText} ${document.querySelector('.feelings-value').innerText} degrees ${store.scale === 'c' ? 'centigrade' : 'fahrenheit'} ,
     ${document.querySelector('.wind-text').innerText} at speed ${document.querySelector('.wind-value').innerText} meters per second,
     ${document.querySelector('.details__humidity').innerText}`;
    }
    default: {
      return `Сегодня, ${DAYS_OF_WEEK_RU[new Date().getDay() - 1]} ${document.querySelector('.header__date span').innerText.slice(3, -10)},
     погода в ${document.querySelector('.header__location span').innerText} следующая: 
     температура воздуха ${document.querySelector('.current-temperature-value').innerText} градусов ${store.scale === 'c' ? 'по Цельсию' : 'по Фаренгейту'},
     ${document.querySelector('.details__description').innerText},
     ${document.querySelector('.feelings-text').innerText} ${document.querySelector('.feelings-value').innerText} градусов ${store.scale === 'c' ? 'по Цельсию' : 'по Фаренгейту'} ,
     ${document.querySelector('.wind-text').innerText} дует со скоростью ${document.querySelector('.wind-value').innerText} метров в секунду,
     ${document.querySelector('.details__humidity').innerText}`;
    }
  }
}

const generateMessageForWeather = () => {
  switch (store.lang) {
    case 'en': {
      return `Today, ${document.querySelector('.header__date span').innerText.slice(0, -10)},
     the weather in ${document.querySelector('.header__location span').innerText} is following: 
     the temperature is ${document.querySelector('.current-temperature-value').innerText} degrees ${store.scale === 'c' ? 'centigrade' : 'fahrenheit'},
     ${document.querySelector('.details__description').innerText},
     ${document.querySelector('.feelings-text').innerText} ${document.querySelector('.feelings-value').innerText} degrees ${store.scale === 'c' ? 'centigrade' : 'fahrenheit'} ,
     ${document.querySelector('.wind-text').innerText} at speed ${document.querySelector('.wind-value').innerText} meters per second,
     ${document.querySelector('.details__humidity').innerText}`;
    }
    default: {
      return `Сегодня, ${DAYS_OF_WEEK_RU[new Date().getDay() - 1]} ${document.querySelector('.header__date span').innerText.slice(3, -10)},
     погода в ${document.querySelector('.header__location span').innerText} следующая: 
     температура воздуха ${document.querySelector('.current-temperature-value').innerText} градусов ${store.scale === 'c' ? 'по Цельсию' : 'по Фаренгейту'},
     ${document.querySelector('.details__description').innerText},
     ${document.querySelector('.feelings-text').innerText} ${document.querySelector('.feelings-value').innerText} градусов ${store.scale === 'c' ? 'по Цельсию' : 'по Фаренгейту'} ,
     ${document.querySelector('.wind-text').innerText} дует со скоростью ${document.querySelector('.wind-value').innerText} метров в секунду,
     ${document.querySelector('.details__humidity').innerText}`;
    }
  }
};

const generateMessageForForecast = () => {
  let result = '';
  switch (store.lang) {
    case 'en': {
      result = 'Tomorrow, ';
      document.querySelector('.forecast-container').children.forEach((element) => {
        result += `On ${element.querySelector('.forecast-header').innerText} the temperature will be 
    ${element.querySelector('.fcst-temp-value').innerText} degrees ${store.scale === 'c' ? 'centigrade' : 'fahrenheit'}, 
    ${element.querySelector('.fcst-temp-value').dataset.desc}. `;
      });
      break;
    }
    default: {
      result = 'Завтра, ';
      document.querySelector('.forecast-container').children.forEach((element) => {
        result += `${element.querySelector('.forecast-header').innerText} температура воздуха будет составлять 
    ${element.querySelector('.fcst-temp-value').innerText} градусов ${store.scale === 'c' ? 'по Цельсию' : 'по Фаренгейту'}, 
    ${element.querySelector('.fcst-temp-value').dataset.descru}. `;
      });
      break;
    }
  }
  return result;
};

const setVoice = () => {
  switch (store.lang) {
    case 'en': {
      return speechSynthesis.getVoices().find((voice) => voice.lang === 'en-US');
    }
    default: {
      return speechSynthesis.getVoices().find((voice) => voice.lang === 'ru-RU');
    }
  }
};

export {
  generateMessageToSay, setVoice, generateMessageForWeather, generateMessageForForecast,
};
