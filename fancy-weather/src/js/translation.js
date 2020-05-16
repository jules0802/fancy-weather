import {
  DAYS_OF_WEEK, DAYS_OF_WEEK_RU, DAYS_OF_WEEK_BE, yandexTranslateToken,
} from './constants';
import { store } from './storage';
import { getWeather } from './getWeather';

async function getTranslation(text, toLang) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexTranslateToken}&text=${text}&lang=${toLang}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.text;
}

function translateDayOfWeek(str, toLang) {
  let index;

  if (DAYS_OF_WEEK.includes(str)) {
    index = DAYS_OF_WEEK.indexOf(str);
  } else if (DAYS_OF_WEEK_RU.includes(str)) {
    index = DAYS_OF_WEEK_RU.indexOf(str);
  } else {
    index = DAYS_OF_WEEK_BE.indexOf(str);
  }

  let result = '';

  switch (toLang) {
    case 'en': {
      result = DAYS_OF_WEEK[index];
      break;
    }
    case 'ru': {
      result = DAYS_OF_WEEK_RU[index];
      break;
    }
    default: {
      result = DAYS_OF_WEEK_BE[index];
      break;
    }
  }

  return result;
}

async function translatePage(toLang) {
  const textNodesToBeTranslated = [
    document.querySelector('.details__description'),
    document.querySelector('.search__general-button'),
    document.querySelector('.header__location span'),
    document.querySelector('.header__date span'),
    document.querySelector('.wind-text'),
    document.querySelector('.wind-units'),
    document.querySelector('.coordinates__longitude > span:nth-child(1)'),
    document.querySelector('.coordinates__latitude > span:nth-child(1)'),
  ];

  textNodesToBeTranslated.forEach(async (el) => {
    // eslint-disable-next-line no-param-reassign
    el.innerText = await getTranslation(el.innerText, toLang);
  });

  switch (toLang) {
    case 'en': {
      document.querySelector('.feelings-text').innerText = 'FEELS LIKE: ';
      document.querySelector('.humidity-text').innerText = 'HUMIDITY: ';
      document.querySelector('.search input').placeholder = 'Search city';
      break;
    }
    case 'ru': {
      document.querySelector('.feelings-text').innerText = 'ОЩУЩАЕТСЯ КАК: ';
      document.querySelector('.humidity-text').innerText = 'ВЛАЖНОСТЬ: ';
      document.querySelector('.search input').placeholder = 'Найти город';
      break;
    }
    default: {
      document.querySelector('.feelings-text').innerText = 'АДЧУВАЕЦЦА ЯК: ';
      document.querySelector('.humidity-text').innerText = 'ВІЛЬГОТНАСЦЬ: ';
      document.querySelector('.search input').placeholder = 'Пошук горада';
      break;
    }
  }

  [document.querySelector('.forecast-container__first .forecast-header'),
    document.querySelector('.forecast-container__second .forecast-header'),
    document.querySelector('.forecast-container__third .forecast-header')].forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    el.innerText = translateDayOfWeek(el.innerText, toLang);
  });
}

export { translatePage };
