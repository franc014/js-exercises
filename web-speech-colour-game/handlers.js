import { isValidColor } from './colors';

function logWords(results) {
  console.log(results[results.length - 1][0].transcript);
}
export default function handleResult({ results }) {
  logWords(results);
  const words = results[results.length - 1][0].transcript;
  console.log(words);
  let color = words.toLowerCase();
  color = color.replace(/\s/g, '');
  if (!isValidColor(color)) return;
  const colorspan = document.querySelector(`.${color}`);
  colorspan.classList.add('got');
  console.log(`valid color `, colorspan);
  document.body.style.backgroundColor = color;
}
