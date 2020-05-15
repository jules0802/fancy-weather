import {
  DAYS_OF_WEEK, DAYS_OF_WEEK_RU, DAYS_OF_WEEK_BE, yandexTranslateToken,
} from './constants';
import { store } from './storage';

async function getTranslation(text, toLang) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexTranslateToken}&text=${text}&lang=${toLang}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data.text;
}

function translateDayOfWeek(str, toLang) {
  let index;

  console.log(str);

  console.log(DAYS_OF_WEEK);
  console.log(DAYS_OF_WEEK_RU);
  console.log(DAYS_OF_WEEK_BE);

  if (DAYS_OF_WEEK.includes(str)) {
    index = DAYS_OF_WEEK.findIndex(str);
  } else if (DAYS_OF_WEEK_RU.includes(str)) {
    index = DAYS_OF_WEEK_RU.findIndex(str);
  } else {
    index = DAYS_OF_WEEK_BE.findIndex(str);
  }

  console.log(index);

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
    document.querySelector('.search__general-button'),
    document.querySelector('.header__location span'),
    document.querySelector('.header__date span'),
    document.querySelector('.details__description'),
    document.querySelector('.feelings-text'),
    document.querySelector('.wind-text'),
    document.querySelector('.wind-units'),
    document.querySelector('.humidity-text'),
    document.querySelector('.coordinates__longitude > span:nth-child(1)'),
    document.querySelector('.coordinates__latitude > span:nth-child(1)'),
  ];

  textNodesToBeTranslated.forEach(async (el) => {
    // eslint-disable-next-line no-param-reassign
    el.innerText = await getTranslation(el.innerText, toLang);
  });

  document.querySelector('.search input').placeholder = await getTranslation(document.querySelector('.search input').placeholder, toLang);

  [document.querySelector('.forecast-container__first .forecast-header'),
    document.querySelector('.forecast-container__second .forecast-header'),
    document.querySelector('.forecast-container__third .forecast-header')].forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    el.innerText = translateDayOfWeek(el.innerText, toLang);
  });
}

export { translatePage };
