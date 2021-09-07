const cardButtons = document.querySelectorAll('.card button');
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');
function handleCardButtonClick(e) {
  const button = e.currentTarget;
  const card = button.closest('.card');
  const imgSrc = card.querySelector('img').src;
  const { description } = card.dataset;
  const name = card.querySelector('h2').textConten;
  modalInner.innerHTML = `
        <img src="${imgSrc.replace(
          '200',
          600
        )}" alt="${name}" width="600" height="600" />    
        <p>${description}</p>
    `;
  modalOuter.classList.add('open');
}

function closeModal() {
  modalOuter.classList.remove('open');
}

cardButtons.forEach(button =>
  button.addEventListener('click', handleCardButtonClick)
);

modalOuter.addEventListener('click', function(event) {
  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
