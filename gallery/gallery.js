function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery found');
  }
  // select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const previousBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');

  let currentImage;

  function openModal() {
    if (modal.matches('.open')) {
      console.info('modal already open');
      return;
    }
    modal.classList.add('open');
    // Event listeners to be bound when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    nextBtn.addEventListener('click', showNextImage);
    previousBtn.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // todo add event listeners for clicks and keyboard
    // Event listeners to be bound when we close the modal
    window.removeEventListener('keyup', handleKeyUp);
    nextBtn.removeEventListener('click', showNextImage);
    previousBtn.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPrevImage();
  }

  function showImage(el) {
    if (!el) {
      console.info('no image to show');
    }
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.tile;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }
  function showNextImage(e) {
    showImage(currentImage.nextElementSibling || images[0]);
  }
  function showPrevImage(e) {
    showImage(currentImage.previousElementSibling || images[images.length - 1]);
  }

  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );
  images.forEach(image =>
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    })
  );

  modal.addEventListener('click', handleClickOutside);
  /* window.addEventListener('keyup', handleKeyUp);
  nextBtn.addEventListener('click', showNextImage); */
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
