const mainContainer = document.getElementById('foods');
const searchButton = document.getElementById('searchButton');
const warning = document.getElementById('warning');

// EventListener With Validation

searchButton.addEventListener('click', function () {
    const findKey = document.getElementById('findKey').value;
    mainContainer.innerHTML = '';
    if (findKey === '') {
        warning.style.display = 'block';
    } else {
        takeFood(findKey);
        warning.style.display = 'none';
    }
});

const foodDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            foodInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};

// Food Details Modal
const foodInfo = food => {
    const foodDetails = document.getElementById('foodsDetails');

    foodDetails.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2">Ingredients</h5>
    <ul>
        <li>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li>${food.strMeasure3}, ${food.strIngredient3}</li>
    </ul>

`;
};

// Main API

function takeFood(foodId) {
    const foodApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodId}`;

    fetch(foodApi)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foods');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = `
                        <div onclick="foodDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                     `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            warning.style.display = 'block';
        }
    };
}
