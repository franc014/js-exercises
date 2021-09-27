function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

async function draw(el) {
  const text = el.textContent;
  const { typeMin, typeMax } = el.dataset;
  let soFar = '';

  for (const letter of text) {
    soFar += letter;

    el.textContent = soFar;
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);

    await wait(amountOfTimeToWait);
  }
}

document.querySelectorAll('[data-type]').forEach(draw);
