const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"');

function handleTabClick(event) {
  // hide all tab pannels
  tabPanels.forEach(panel => (panel.hidden = true));
  // mark all tabs as unselected
  tabButtons.forEach(tab => tab.setAttribute('aria-selected', false));
  // mark the click tab as selected
  event.currentTarget.setAttribute('aria-selected', true);
  // find the asscociated tab pannel and show it
  const { id } = event.currentTarget;
  // one way
  /* const tabPanel = Array.from(tabPanels).find(
    tp => tp.getAttribute('aria-labelledby') === id
  ); */
  // another way
  const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
