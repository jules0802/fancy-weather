import { DAYS_OF_WEEK, MONTHS } from './constants';
import { store } from './storage';

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
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    let currentDateString = this.date.toLocaleString(store.lang, options);

    const tempArr = currentDateString.split(' ');
    const day = tempArr[2].slice(0, -1);
    tempArr[2] = `${tempArr[1]},`;
    tempArr[1] = day;

    currentDateString = tempArr.join(' ');

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

  showForecastHeader() {
    const today = this.date.getDay() - 1;
    document.querySelector('.forecast-container__first .forecast-header').innerText = DAYS_OF_WEEK[(today + 1) % 7];
    document.querySelector('.forecast-container__second .forecast-header').innerText = DAYS_OF_WEEK[(today + 2) % 7];
    document.querySelector('.forecast-container__third .forecast-header').innerText = DAYS_OF_WEEK[(today + 3) % 7];
  }
}
