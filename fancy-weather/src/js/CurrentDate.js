import {
  DAYS_OF_WEEK, DAYS_OF_WEEK_RU, DAYS_OF_WEEK_BE, MONTHS,
} from './constants';
import { store } from './storageService';

export default class CurrentDate {
  constructor() {
    this.date = new Date();
  }

  currentDateToString(timeZone) {
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const currentDateString = this.date.toLocaleString(store.lang, options);
    return currentDateString;
  }

  updateTimeOnPage(timeZone) {
    document.querySelector('.header__date span').innerText = this.currentDateToString(timeZone);
  }

  getCurrentDayOfWeek() {
    return DAYS_OF_WEEK[this.date.getDay()];
  }

  getCurrentMonth() {
    return MONTHS[this.date.getMonth()];
  }

  getCurrentPartOfDay(timeZone) {
    const hours = this.currentDateToString(timeZone).slice(-8, -6);
    if (hours >= 5 && hours < 12) return 'morning';
    if (hours >= 12 && hours < 16) return 'day';
    if (hours >= 16 && hours < 23) return 'evening';
    return 'night';
  }

  getCurrentSeason() {
    const month = this.date.getMonth();
    switch (month) {
      case 0:
      case 1:
      case 11: {
        return 'winter';
      }
      case 2:
      case 3:
      case 4: {
        return 'spring';
      }
      case 5:
      case 6:
      case 7: {
        return 'summer';
      }
      default: {
        return 'autumn';
      }
    }
  }

  showForecastHeader() {
    const today = this.date.getDay() - 1;
    const temp = [document.querySelector('.forecast-container__first .forecast-header'),
      document.querySelector('.forecast-container__second .forecast-header'),
      document.querySelector('.forecast-container__third .forecast-header')];
    switch (store.lang) {
      case 'en': {
        temp.forEach((e, i) => { e.innerText = DAYS_OF_WEEK[(today + i + 1) % 7]; });
        break;
      }
      case 'ru': {
        temp.forEach((e, i) => { e.innerText = DAYS_OF_WEEK_RU[(today + i + 1) % 7]; });
        break;
      }
      default: {
        temp.forEach((e, i) => { e.innerText = DAYS_OF_WEEK_BE[(today + i + 1) % 7]; });
        break;
      }
    }
  }
}
