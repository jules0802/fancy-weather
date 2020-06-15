/* eslint-disable class-methods-use-this */
export default class Layout {
  constructor(store) {
    this.lang = store.lang;
    this.scale = store.scale;
    this.body = document.querySelector('body');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.body.appendChild(this.wrapper);
  }

  createLeftToolBar() {
    const leftToolBar = document.createElement('div');
    leftToolBar.className = 'toolbar-container__left toolbar';    

    const refreshBtn = document.createElement('div');
    refreshBtn.className = 'toolbar__refresh-background-btn tool-btn';
    const refreshIcon = document.createElement('i');
    refreshIcon.className = 'small material-icons';
    refreshIcon.innerText = 'sync';
    refreshBtn.appendChild(refreshIcon);
    leftToolBar.appendChild(refreshBtn);

    const selectLangContainer = document.createElement('div');
    selectLangContainer.className = 'toolbar__lang-select tool-btn input-field col s12';
    const selectLang = document.createElement('select');
    selectLang.setAttribute('id', 'lang');
    const enOption = document.createElement('option');
    enOption.setAttribute('value', 'en');
    enOption.innerText = 'EN';
    const ruOption = document.createElement('option');
    ruOption.setAttribute('value', 'ru');
    ruOption.innerText = 'RU';
    const beOption = document.createElement('option');
    beOption.setAttribute('value', 'be');
    beOption.innerText = 'BE';

    switch (this.lang) {
      case 'en': {
        enOption.setAttribute('selected', true);
        break;
      }
      case 'ru': {
        ruOption.setAttribute('selected', true);
        break;
      }
      default: {
        beOption.setAttribute('selected', true);
        break;
      }
    }

    selectLang.appendChild(enOption);
    selectLang.appendChild(ruOption);
    selectLang.appendChild(beOption);
    selectLangContainer.appendChild(selectLang);
    leftToolBar.appendChild(selectLangContainer);

    const selectScaleBtns = document.createElement('div');
    selectScaleBtns.className = 'toolbar__temp-scale-select temp-scale-select';

    const fahrenheitBtn = document.createElement('div');
    fahrenheitBtn.className = 'temp-scale-select__fahrenheit tool-btn';
    fahrenheitBtn.insertAdjacentHTML('afterbegin', '<span>°F</span>');
    const celsiusBtn = document.createElement('div');
    celsiusBtn.className = 'temp-scale-select__celsius tool-btn';
    celsiusBtn.insertAdjacentHTML('afterbegin', '<span>°C</span>');

    switch (this.scale) {
      case 'c': {
        celsiusBtn.classList.add('active');
        break;
      }
      default: {
        fahrenheitBtn.classList.add('active');
        break;
      }
    }

    selectScaleBtns.appendChild(fahrenheitBtn);
    selectScaleBtns.appendChild(celsiusBtn);
    leftToolBar.appendChild(selectScaleBtns);
    return leftToolBar;
  }

  createVoiceNotificationBtn() {
    const voiceNotificationBtn = document.createElement('div');
    voiceNotificationBtn.className = 'toolbar__voice-notification tool-btn';
    voiceNotificationBtn.innerText = 'Activate Voice Weather';
    return voiceNotificationBtn;
  }

  createForm() {
    const form = document.createElement('form');
    form.className = 'toolbar__search search';

    // fill form
    const input = document.createElement('input');
    input.className = 'search__input browser-default';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Search city');
    input.setAttribute('autofocus', true);

    form.appendChild(input);

    const speachButton = document.createElement('button');
    speachButton.className = 'search__speech-button';
    speachButton.setAttribute('type', 'button');
    form.appendChild(speachButton);

    const searchButton = document.createElement('button');
    searchButton.className = 'search__general-button';
    searchButton.setAttribute('type', 'submit');
    searchButton.innerText = 'Search';
    form.appendChild(searchButton);
    return form;
  }

  addToolBar() {
    const toolBarContainer = document.createElement('div');
    toolBarContainer.className = 'toolbar-container';
    toolBarContainer.appendChild(this.createLeftToolBar());
    toolBarContainer.appendChild(this.createVoiceNotificationBtn());
    toolBarContainer.appendChild(this.createForm());
    this.wrapper.appendChild(toolBarContainer);
  }

  createWeather() {
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'weather';

    weatherContainer.appendChild(this.createHeader());
    weatherContainer.appendChild(this.createCurrentWeather());
    weatherContainer.appendChild(this.createForecast());

    return weatherContainer;
  }

  createHeader() {
    const header = document.createElement('div');
    header.className = 'weather__header header';

    const headerLocation = document.createElement('div');
    headerLocation.className = 'header__location';
    headerLocation.insertAdjacentHTML('afterbegin', '<i class="material-icons">location_on</i><span></span>');
    header.appendChild(headerLocation);

    const headerDate = document.createElement('div');
    headerDate.className = 'header__date';
    headerDate.insertAdjacentHTML('afterbegin', '<i class="material-icons">date_range</i><span> </span>');
    header.appendChild(headerDate);
    return header;
  }

  createCurrentWeather() {
    const currentWeather = document.createElement('div');
    currentWeather.className = 'current-weather';

    const currentTemperature = document.createElement('div');
    currentTemperature.className = 'current-weather__temperature';
    currentTemperature.insertAdjacentHTML('afterbegin', '<span class="current-temperature-value"></span>°');
    currentWeather.appendChild(currentTemperature);

    const currentWeatherDetails = document.createElement('div');
    currentWeatherDetails.className = 'current-weather__details details';

    const detailsIconContainer = document.createElement('div');
    detailsIconContainer.className = 'details__icon';
    detailsIconContainer.insertAdjacentHTML('afterbegin', '<object type="image/svg+xml" data="" width="180" height="180" class="current-weather-icon"></object>');
    currentWeatherDetails.appendChild(detailsIconContainer);

    const textDetails = document.createElement('div');
    textDetails.className = 'text-details';
    currentWeatherDetails.appendChild(textDetails);

    const detailsDescription = document.createElement('div');
    detailsDescription.className = 'details__description';
    textDetails.appendChild(detailsDescription);

    const detailsFeelings = document.createElement('div');
    detailsFeelings.className = 'details__feelings';
    detailsFeelings.insertAdjacentHTML('afterbegin', '<span class="feelings-text">FEELS LIKE: </span><span class="feelings-value"></span>°');
    textDetails.appendChild(detailsFeelings);

    const detailsWind = document.createElement('div');
    detailsWind.className = 'details__wind';
    detailsWind.insertAdjacentHTML('afterbegin', '<span class="wind-text">WIND: </span><span class="wind-value"></span><span class="wind-units">m/s</span>');
    textDetails.appendChild(detailsWind);

    const detailsHumidity = document.createElement('div');
    detailsHumidity.className = 'details__humidity';
    detailsHumidity.insertAdjacentHTML('afterbegin', '<span class="humidity-text">HUMIDITY: </span><span class="humidity-value"></span>%');
    textDetails.appendChild(detailsHumidity);

    currentWeather.appendChild(currentWeatherDetails);
    return currentWeather;
  }

  createForecast() {
    const forecastContainer = document.createElement('div');
    forecastContainer.className = 'forecast-container';

    const firstDay = document.createElement('div');
    firstDay.className = 'forecast-container__first';
    forecastContainer.appendChild(firstDay);

    const secondDay = document.createElement('div');
    secondDay.className = 'forecast-container__second';
    forecastContainer.appendChild(secondDay);

    const thirdDay = document.createElement('div');
    thirdDay.className = 'forecast-container__third';
    forecastContainer.appendChild(thirdDay);

    [firstDay, secondDay, thirdDay].forEach((day) => {
      const fcstHeader = document.createElement('div');
      fcstHeader.className = 'forecast-header';
      day.appendChild(fcstHeader);

      const fcstBody = document.createElement('div');
      fcstBody.className = 'forecast-body';

      const fcstTemperature = document.createElement('div');
      fcstTemperature.className = 'forecast-temperature';
      fcstTemperature.insertAdjacentHTML('afterbegin', '<span class="fcst-temp-value"></span>°');
      fcstBody.appendChild(fcstTemperature);

      const fcstIcon = document.createElement('div');
      fcstIcon.className = 'forecast-icon';
      fcstIcon.insertAdjacentHTML('afterbegin', '<object type="image/svg+xml" data="" width="100" height="100" class="fcst-weather-icon"></object>');
      fcstBody.appendChild(fcstIcon);

      day.appendChild(fcstBody);
    });
    return forecastContainer;
  }

  createLocation() {
    const locationContainer = document.createElement('div');
    locationContainer.className = 'location';

    const locationMap = document.createElement('div');
    locationMap.className = 'location__map';
    locationMap.setAttribute('id', 'map-container');
    locationContainer.appendChild(locationMap);

    const locationCoordinates = document.createElement('div');
    locationCoordinates.className = 'location__coordinates coordinates';

    const latitude = document.createElement('span');
    latitude.className = 'coordinates__latitude';
    latitude.insertAdjacentHTML('afterbegin', '<span>Latitude: </span><span class="latitude-value"></span>');
    locationCoordinates.appendChild(latitude);

    const longitude = document.createElement('span');
    longitude.className = 'coordinates__longitude';
    longitude.insertAdjacentHTML('afterbegin', '<span>Longitude: </span><span class="longitude-value"></span>');
    locationCoordinates.appendChild(longitude);

    locationContainer.appendChild(locationCoordinates);
    return locationContainer;
  }

  addMain() {
    const main = document.createElement('main');
    main.appendChild(this.createWeather());
    main.appendChild(this.createLocation());
    this.wrapper.appendChild(main);
  }
}
