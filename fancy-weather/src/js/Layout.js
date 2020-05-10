export default class Layout {
  constructor(store) {
    this.lang = store.lang;
    this.scale = store.scale;
    this.body = document.querySelector('body');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.body.appendChild(this.wrapper);
  }

  addToolBar() {
    // LEFT TOOLBAR
    const toolBarContainer = document.createElement('div');
    toolBarContainer.className = 'toolbar-container__left toolbar';

    // fill ToolBar
    const refreshBtn = document.createElement('div');
    refreshBtn.className = 'toolbar__refresh-background-btn tool-btn';
    const refreshIcon = document.createElement('i');
    refreshIcon.className = 'small material-icons';
    refreshIcon.innerText = 'sync';
    refreshBtn.appendChild(refreshIcon);
    toolBarContainer.appendChild(refreshBtn);

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
        enOption.setAttribute('selected');
        break;
      }
      case 'ru': {
        ruOption.setAttribute('selected');
        break;
      }
      default: {
        beOption.setAttribute('selected');
        break;
      }
    }

    selectLang.appendChild(enOption);
    selectLang.appendChild(ruOption);
    selectLang.appendChild(beOption);
    selectLangContainer.appendChild(selectLang);
    toolBarContainer.appendChild(selectLangContainer);

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
    toolBarContainer.appendChild(selectScaleBtns);
    this.wrapper.appendChild(toolBarContainer);

    // FORM
    const form = document.createElement('form');
    form.className = 'toolbar__search search';

    // fill form
    const input = document.createElement('input');
    input.className = 'search__input browser-default';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Search city or ZIP');
    input.setAttribute('autofocus');

    form.appendChild(input);

    const speachButton = document.createElement('button');
    speachButton.className = 'search__speech-button';
    form.appendChild(speachButton);

    const searchButton = document.createElement('button');
    searchButton.className = 'search__general-button';
    searchButton.setAttribute('type', 'submit');
    searchButton.innerText = 'Search';
    form.appendChild(searchButton);

    this.wrapper.appendChild(form);
  }

  addMain() {
    const main = document.createElement('main');
    // WEATHER
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'weather';

    // header
    const header = document.createElement('div');
    header.className = 'weather__header header';

    const headerLocation = document.createElement('div');
    headerLocation.className = 'header__location';
    headerLocation.insertAdjacentHTML('afterbegin', '<i class="material-icons">location_on</i><span span ></span>');
    header.appendChild(headerLocation);

    const headerDate = document.createElement('div');
    headerDate.className = 'header__date';
    headerDate.insertAdjacentHTML('afterbegin', '<i class="material-icons">date_range</i><span> </span>');
    header.appendChild(headerDate);

    weatherContainer.appendChild(header);

    // currentWeather
    const currentWeather = document.createElement('div');
    currentWeather.className = 'current-weather';

    const currentTemperature = document.createElement('div');
    currentTemperature.className = 'current-weather__temperature';
    currentWeather.appendChild(currentTemperature);

    const currentWeatherDetails = document.createElement('div');
    currentWeatherDetails.className = 'current-weather__details details';

    const detailsIconContainer = document.createElement('div');
    detailsIconContainer.className = 'details__icon';
    detailsIconContainer.insertAdjacentHTML('afterbegin', '<i class="owf owf-200 owf-5x"></i>');
    currentWeatherDetails.appendChild(detailsIconContainer);

    const detailsDescription = document.createElement('div');
    detailsDescription.className = 'details__description';
    currentWeatherDetails.appendChild(detailsDescription);

    const detailsFeelings = document.createElement('div');
    detailsFeelings.className = 'details__feelings';
    currentWeatherDetails.appendChild(detailsFeelings);

    const detailsWind = document.createElement('div');
    detailsWind.className = 'details__wind';
    currentWeatherDetails.appendChild(detailsWind);

    const detailsHumidity = document.createElement('div');
    detailsHumidity.className = 'details__humidity';
    currentWeatherDetails.appendChild(detailsHumidity);

    currentWeather.appendChild(currentWeatherDetails);
    weatherContainer.appendChild(currentWeather);

    // forecast
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
      fcstBody.appendChild(fcstTemperature);

      const fcstIcon = document.createElement('div');
      fcstIcon.className = 'forecast-icon';
      fcstIcon.insertAdjacentHTML('afterbegin', '<i class="owf owf-200 owf-4x"></i>');
      fcstBody.appendChild(fcstIcon);

      day.appendChild(fcstBody);
    });

    weatherContainer.appendChild(forecastContainer);

    main.appendChild(weatherContainer);

    // LOCATION
    const locationContainer = document.createElement('div');
    locationContainer.className = 'location';

    const locationMap = document.createElement('div');
    locationMap.className = 'location__map';
    locationContainer.appendChild(locationMap);

    const locationCoordinates = document.createElement('div');
    locationCoordinates.className = 'location__coordinates coordinates';

    const latitude = document.createElement('span');
    latitude.className = 'coordinates__latitude';
    locationCoordinates.appendChild(latitude);

    const longtitude = document.createElement('span');
    longtitude.className = 'coordinates__longtitude';
    locationCoordinates.appendChild(longtitude);

    locationContainer.appendChild(locationCoordinates);

    main.appendChild(locationContainer);
    this.wrapper.appendChild(main);
  }
}
