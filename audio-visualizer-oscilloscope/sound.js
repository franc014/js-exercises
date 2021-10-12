import { hslToRgb } from './hslToRgb';

const WIDTH = 1500;
const HEIGHT = 1500;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

let analyzer;
let bufferLength;

async function getAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);
  // how much data should we collect
  analyzer.fftSize = 2 ** 10;
  // pull the data off the audio
  // how many pieces of data are there?
  bufferLength = analyzer.frequencyBinCount;
  const timeData = new Uint8Array(bufferLength);
  const frecuencyData = new Uint8Array(bufferLength);
  drawTimeData(timeData);
  drawFrequency(frecuencyData);
}

function drawTimeData(timeData) {
  // inject the time data into the time data array
  analyzer.getByteTimeDomainData(timeData);

  // now that we have the data, let's turn it into something visual

  // 1. clear the canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // 2. setup canvas drawing
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#ffc600';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  let x = 0;
  timeData.forEach((data, i) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2;

    // draw
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  });

  ctx.stroke();

  // call itself as soon as possible
  requestAnimationFrame(() => {
    drawTimeData(timeData);
  });
}

function drawFrequency(frecuencyData) {
  // get the frecuency data into the frecuency data array
  analyzer.getByteFrequencyData(frecuencyData);
  // figure out the bar width
  const barWidth = (WIDTH / bufferLength) * 2.5;
  let x = 0;
  frecuencyData.forEach(amount => {
    // 0 to 255
    const percent = amount / 255;
    const [h, s, l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
    const barhight = (HEIGHT * percent) / 2;
    // TODO: convert the color to hsl
    const [r, g, b] = hslToRgb(h, s, l);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, HEIGHT - barhight, barWidth, barhight);
    x += barWidth + 1;
  });

  requestAnimationFrame(() => {
    drawFrequency(frecuencyData);
  });
}

getAudio();
