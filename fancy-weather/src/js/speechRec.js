
import {
  VOLUME_MID, VOLUME_UP, VOLUME_DOWN, ONESEC,
} from './constants';
import {
  generateMessageToSay, setVoice, generateMessageForWeather, generateMessageForForecast,
} from './speechSynthesisService';
import {
  saveLanguageToStorage, store,
} from './storageService';
import { translatePage, translateVoiceNotificationBtn } from './translationService';

const enableSpeechRec = () => {
  let volume = VOLUME_MID;

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechBtn = document.querySelector('.search__speech-button');
  // eslint-disable-next-line no-undef
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = store.lang;

  const msg = new SpeechSynthesisUtterance();
  msg.volume = volume;

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);
    if (e.results[0].isFinal && transcript) {
      switch (transcript.toString()) {
        case 'weather':
        case 'погода':
        case 'надвор\'е': {
          msg.text = generateMessageForWeather();
          msg.voice = setVoice();
          break;
        }
        case 'forecast':
        case 'прогноз':
        case 'прагноз': {
          msg.text = generateMessageForForecast();
          msg.voice = setVoice();
          break;
        }
        case 'louder':
        case 'громче':
        case 'гучней': {
          volume = volume === VOLUME_DOWN ? VOLUME_MID : VOLUME_UP;
          break;
        }
        case 'quiter':
        case 'тише':
        case 'цішэй': {
          volume = volume === VOLUME_MID ? VOLUME_DOWN : VOLUME_UP;
          break;
        }
        default: {
          document.querySelector('.search__input').value = transcript;
          break;
        }
      }
    }
  });

  speechBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (!speechBtn.classList.contains('active')) {
      speechBtn.classList.add('active');
      recognition.start();
    } else {
      speechBtn.classList.remove('active');
      speechBtn.blur();
      recognition.stop();
    }
  });

  recognition.addEventListener('end', () => {
    if (document.querySelector('.search__input').value) {
      document.querySelector('.search__general-button').click();
    } else {
      msg.volume = volume;
      if (msg.text) {
        setTimeout(() => {
          speechSynthesis.speak(msg);
        }, ONESEC);
      }
    }
    speechBtn.classList.remove('active');
    speechBtn.blur();
  });

  const voiceNotification = document.querySelector('.toolbar__voice-notification');
  let clicksCount = 0;
  voiceNotification.addEventListener('click', () => {
    clicksCount += 1;
    if (clicksCount === 1) {
      speechSynthesis.getVoices();
      voiceNotification.innerText = 'Listen to weather';
      translateVoiceNotificationBtn();
    } else if (!speechSynthesis.speaking) {
      voiceNotification.innerText = 'Stop';
      translateVoiceNotificationBtn();
      msg.text = generateMessageToSay();
      msg.voice = setVoice();
      speechSynthesis.speak(msg);
    } else {
      speechSynthesis.cancel();
      voiceNotification.innerText = 'Listen to weather';
      translateVoiceNotificationBtn();
    }
  });

  document.querySelector('select').addEventListener('change', (event) => {
    store.lang = event.target.value;
    saveLanguageToStorage(store.lang);
    translatePage(store.lang);
    recognition.lang = store.lang;
  });
};

export default enableSpeechRec;
