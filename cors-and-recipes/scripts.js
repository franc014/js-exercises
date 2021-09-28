import 'regenerator-runtime/runtime';

const baseEndpoint = 'https://api.edamam.com/api/recipes/v2';
const appId = 'd0b9bc33';
const apiKey = '29d26709fbffd2faf3f54a24d634312a';
const form = document.querySelector('.search');
const recipesGrid = document.querySelector('.recipes');

async function fetchRecipes(query) {
  console.log(query);
  const res = await fetch(
    `https://cors-anywhere.herokuapp.com/${baseEndpoint}?q=${query}&type=public&app_id=${appId}&app_key=${apiKey}`
  );
  const data = await res.json();
  return data;
}

async function fetchAndDisplay(query) {
  // turn the form off
  form.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(query);
  console.log(recipes);
  form.submit.disabled = false;
  displayRecipes(recipes.hits);
}

function displayRecipes(recipes) {
  console.log('Creating HTML');
  const html = recipes.map(recipe => {
    let recipeHTML = `<div class="recipe">
      <h2>${recipe.recipe.label}</h2>`;
    const ingredients = recipe.recipe.ingredients
      .map(ingredient => `<p>${ingredient.text}</p>`)
      .join('');

    recipeHTML += ingredients;
    const footer =
      recipe.recipe.image &&
      `<img src="${recipe.recipe.image}" alt="${recipe.recipe.label}"  />
      <a href="${recipe.recipe.uri}">View Recipe →</a>
    </div>`;
    recipeHTML += footer;
    return recipeHTML;
  });
  recipesGrid.innerHTML = html.join('');
}

async function handleSubmit(e) {
  e.preventDefault();
  fetchAndDisplay(form.query.value);
}

form.addEventListener('submit', handleSubmit);

fetchRecipes('pizza');
