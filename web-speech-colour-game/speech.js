import handleResult from './handlers';
import { colorsByLength, isDark } from './colors';

const colorsEl = document.querySelector('.colors');

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function displayColors(colors) {
  return colors
    .map(
      color =>
        `<span class='color ${color} ${
          isDark(color) ? 'dark' : ''
        }' style='background:${color}'>${color}</span>`
    )
    .join('');
}

function start() {
  // see if their browser supports this
  if (!('SpeechRecognition' in window)) {
    console.log('Your browser does not support speech recognition');
  }

  // it does work
  console.log('starting...');
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}

start();
colorsEl.innerHTML = displayColors(colorsByLength);
