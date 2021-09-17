const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
// state
let items = [];

function displayItems() {
  const html = items
    .map(
      item => `
      <li class="shopping-item">
       <input type="checkbox" value="${item.id}" ${item.complete && 'checked'}/>
       <span class="itemName">${item.name}</span>
       <button value="${item.id}" aria-label="Remove ${
        item.name
      }">&times;</button>
      </li>`
    )
    .join('');
  list.innerHTML = html;
}
function addItem(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  items.push(item);
  e.target.reset();

  // fire off a custom event
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems?.length) {
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
function markAsComplete(id) {
  const itemToChange = items.find(item => item.id === id);
  itemToChange.complete = !itemToChange.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', addItem);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// event delegation: we listen on the list <ul>
list.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  } else if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});
restoreFromLocalStorage();
