const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');
function getRandomMeal() {
  mealsEl.innerHTML = ""
  resultHeading.innerHTML = ""

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => res.json())
      .then(data => {
          const meal = data.meals[0];
          addMealToDOM(meal);
      })
}
getRandomMeal()
// Add meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    single_mealEl.innerHTML = `
      <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
          ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
          ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
          <p>${meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul> 
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  function searchMeal(e) {
    e.preventDefault()

    let inputValue = search.value

    if(inputValue.trim()) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
      .then(res => res.json())
      resultHeading.innerHTML = `<h2>Search results for '${inputValue}':</h2>`
    } else if(inputValue === null) {
        alert(resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`)
    }
  }

















  // Event listeners
  submit.addEventListener('submit', searchMeal);
  random.addEventListener('click', getRandomMeal);
  mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
      if (item.classList) {
        return item.classList.contains('meal-info');
      } else {
        return false;
      }
    });
    if (mealInfo) {
      const mealID = mealInfo.getAttribute('data-mealid');
      getMealById(mealID);
    }
  });