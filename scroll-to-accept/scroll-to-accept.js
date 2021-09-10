function scrollToAccept() {
  const terms = document.querySelector('.terms-and-conditions');
  if (!terms) {
    return;
  }
  const button = document.querySelector('.accept');

  function obCallback(payload) {
    if (payload[0].intersectionRatio === 1) {
      button.disabled = false;
      // stop observing the button
      ob.unobserve(terms.lastElementChild);
    } /* else {
      button.disabled = true;
    } */
  }
  const ob = new IntersectionObserver(obCallback, {
    root: terms,
    threshold: 1,
  });
  ob.observe(terms.lastElementChild);
  /* terms.addEventListener('scroll', function(e) {
    console.log(e);
  }); */
}
scrollToAccept();
