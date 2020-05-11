export default function enableSpeechRecognition() {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // eslint-disable-next-line no-undef
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);

    if (e.results[0].isFinal && transcript) {
      document.querySelector('.search__input').value = transcript;
    }
  });

  document.querySelector('.search__speech-button').addEventListener('click', (event) => {
    event.preventDefault();
    recognition.start();
  });


  recognition.addEventListener('end', () => {
    if (document.querySelector('.search__input').value) {
      document.querySelector('.search__general-button').click();
    }
  });
}
