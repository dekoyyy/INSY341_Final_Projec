
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyALtS557uXjtEhKFwXmgmUsS5UKWhHTwaI",
    authDomain: "insy341-finalprojet.firebaseapp.com",
    databaseURL: "https://insy341-finalprojet.firebaseio.com",
    projectId: "insy341-finalprojet",
    storageBucket: "insy341-finalprojet.appspot.com",
    messagingSenderId: "178979297905",
    appId: "1:178979297905:web:e247c72918a9bfd7ad99d0",
    measurementId: "G-ND4RGH5561"
};

var productArray = [];
var data = [];
var ingredient1Array = [];
var ingredient2Array = [];
var ingredient3Array = [];

// var databaseLocation = new Firebase ('https://insy341-finalprojet.firebaseio.com');


function displayData(arr) {
    var result = "";
    var i = 0;
    // add for loop so it cycles through each array
    for (i = 0; i < arr[0].length; i++) {
        result = result + arr[0][i].ingredient1 + "<br>";
    }
    document.getElementById("demo").innerHTML = result;
}

function updateIngredient1Array(arr) { // adds opttions underneath ingredient1
    var newOption;
    var i = 0;

    targetId = document.getElementById("ingredient1")

    for (i = 0; i < arr.length; i++) {
        newOption = document.createElement("option");
        newOption.text = arr[i].ingredient1;
        console.log(arr[i].ingredient1);
        targetId.add(newOption);
    }

}

function updateIngredient2Array(arr) { // adds opttions underneath ingredient1
    var newOption;
    var i = 0;

    targetId = document.getElementById("ingredient2")

    for (i = 0; i < arr.length; i++) {
        newOption = document.createElement("option");
        newOption.text = arr[i].ingredient2;
        console.log(arr[i].ingredient2)
        targetId.add(newOption);
    }

}

function updateIngredient3Array(arr) { // adds opttions underneath ingredient1
    var newOption;
    var i = 0;

    targetId = document.getElementById("ingredient3");

    for (i = 0; i < arr.length; i++) {
        newOption = document.createElement("option");
        newOption.text = arr[i].ingredient3;
        console.log(arr[i].ingredient3)
        targetId.add(newOption);
    }

}

function readData () {
    var loc = firebase.database().ref("recipes");
    firebase.database.ref("recipes").on('value', function(snapshot) {
            console.log("got snapshot of all objects at this point in time");
            snapshot.forEach(function(loc){
                productArray.push(loc.val());
                console.log(productArray)
            });
            // displayData(productArray);
           //  updateIngredient1Array(ingredient1Array);
           //  updateIngredient2Array(ingredient2Array);
           //  updateIngredient3Array(ingredient3Array);
        }
    );
}

var jasonObj =
    [
        {
            "Ingredient 1": "Chicken breasts",
            "Ingredient 2": "Mushroom",
            "Ingredient 3": "Pasta",
            "Name of recipe": "Chicken and mushroom pasta",
            "Link": "https://tasty.co/recipe/one-pot-chicken-and-mushroom-pasta"
        },
        {
            "Ingredient 1": "Rotisserie Chicken",
            "Ingredient 2": "Black beans",
            "Ingredient 3": "Tortilla chips",
            "Name of recipe": "Chicken and Black Beans Nachos",
            "Link": "https://www.countryliving.com/food-drinks/a28071322/chicken-and-black-bean-nachos-recipe/"
        },
        {
            "Ingredient 1": "Chicken breasts",
            "Ingredient 2": "Cheese",
            "Ingredient 3": "Eggs",
            "Name of recipe": "Chicken parmesan recipe",
            "Link": "https://www.allrecipes.com/recipe/223042/chicken-parmesan/"
        },
        {
            "Ingredient 1": "Chicken breasts",
            "Ingredient 2": "Black beans",
            "Ingredient 3": "Kidney Beans",
            "Name of recipe": "Slow Cooker Chicken Taco Soup",
            "Link": "https://www.allrecipes.com/recipe/70343/slow-cooker-chicken-taco-soup"
        },
        {
            "Ingredient 1": "Chicken breasts",
            "Ingredient 2": "Onion",
            "Ingredient 3": "Tomato sauce",
            "Name of recipe": "Curry Stand Chicken Tikka Masala",
            "Link": "https://www.allrecipes.com/recipe/228293/curry-stand-chicken-tikka-masala-sauce/"
        },
        {
            "Ingredient 1": "Chicken breasts",
            "Ingredient 2": "Cheese",
            "Ingredient 3": "Broccoli",
            "Name of recipe": "Cheesy Broccoli-Stuffed Chicken Breast",
            "Link": "https://www.allrecipes.com/recipe/273320/cheesy-broccoli-stuffed-chicken-breasts"
        },
        {
            "Ingredient 1": "Chicken breasts",
            "Ingredient 2": "Soy Sauce",
            "Ingredient 3": "Garlic",
            "Name of recipe": "Sweet, Sticky and Spicy Chicken",
            "Link": "https://www.allrecipes.com/recipe/143082/sweet-sticky-and-spicy-chicken"
        },
        {
            "Ingredient 1": "Chicken breasts",
            "Ingredient 2": "Mushroom",
            "Ingredient 3": "Garlic",
            "Name of recipe": "Chicken Breasts with Easy Mushroom Pan Sauce",
            "Link": "https://laughingspatula.com/easy-chicken-breasts-with-mushroom-pan-sauce/"
        },
        {
            "Ingredient 1": "Ground beef",
            "Ingredient 2": "Hamburger buns",
            "Ingredient 3": "Cheese",
            "Name of recipe": "The Classic Burger",
            "Link": "https://www.myrecipes.com/recipe/classic-burger"
        },
        {
            "Ingredient 1": "Ground beef",
            "Ingredient 2": "Crushed Tomatoes",
            "Ingredient 3": "Kidney Beans",
            "Name of recipe": "Best-Ever Beef Chili",
            "Link": "https://www.delish.com/cooking/recipe-ideas/recipes/a58253/best-homemade-chili-recipe/"
        },
        {
            "Ingredient 1": "Ground beef",
            "Ingredient 2": "Hamburger buns",
            "Ingredient 3": "Cheese",
            "Name of recipe": "Pizza burgers",
            "Link": "https://www.delish.com/cooking/recipe-ideas/recipes/a47675/pizza-burgers-recipe/"
        },
        {
            "Ingredient 1": "Ground beef",
            "Ingredient 2": "Tomatoes",
            "Ingredient 3": "Cheese",
            "Name of recipe": "Taco Tomatoes",
            "Link": "https://www.delish.com/cooking/recipe-ideas/recipes/a54559/taco-tomatoes-recipe/"
        },
        {
            "Ingredient 1": "Ground beef",
            "Ingredient 2": "Black beans",
            "Ingredient 3": "Flour Tortillas",
            "Name of recipe": "Beef Enchiladas",
            "Link": "https://www.delish.com/cooking/recipe-ideas/a22790411/beef-enchiladas-recipe/"
        },
        {
            "Ingredient 1": "Ground beef",
            "Ingredient 2": "Crushed Tomatoes",
            "Ingredient 3": "Spaghetti",
            "Name of recipe": "Spaghetti and Meatballs",
            "Link": "https://www.delish.com/cooking/recipe-ideas/recipes/a55764/best-spaghetti-and-meatballs-recipe/"
        },
        {
            "Ingredient 1": "Ground beef",
            "Ingredient 2": "Black beans",
            "Ingredient 3": "Flour Tortillas",
            "Name of recipe": "Cheesy Ground Beef Tacos",
            "Link": "https://www.delish.com/cooking/recipe-ideas/recipes/a46606/cheesy-ground-beef-tacos-recipe/"
        },
        {
            "Ingredient 1": "Ground beef",
            "Ingredient 2": "Black beans",
            "Ingredient 3": "Flour Tortillas",
            "Name of recipe": "Cheesy Beef Quesadillas",
            "Link": "https://www.delish.com/cooking/recipe-ideas/recipes/a51079/cheesy-beef-quesadillas-recipe/"
        },
        {
            "Ingredient 1": "Shrimp",
            "Ingredient 2": "Garlic",
            "Ingredient 3": "Lemon",
            "Name of recipe": "lemon garlic butter shrimps",
            "Link": "https://cafedelites.com/lemon-garlic-butter-shrimp/"
        },
        {
            "Ingredient 1": "Shrimp",
            "Ingredient 2": "Rice",
            "Ingredient 3": "Vegetables",
            "Name of recipe": "Shrimp Fried Rice",
            "Link": "https://www.tasteofhome.com/recipes/shrimp-fried-rice/"
        },
        {
            "Ingredient 1": "Shrimp",
            "Ingredient 2": "Pasta",
            "Ingredient 3": "Parmesan",
            "Name of recipe": "Parmesan Shrimp Pasta",
            "Link": "https://damndelicious.net/2014/01/15/spicy-parmesan-shrimp-pasta/"
        },
        {
            "Ingredient 1": "Shrimp",
            "Ingredient 2": "shredded coconut",
            "Ingredient 3": "panko",
            "Name of recipe": "Coconut shrimp",
            "Link": "https://damndelicious.net/2013/12/13/coconut-shrimp/"
        },
        {
            "Ingredient 1": "Pork",
            "Ingredient 2": "Rice",
            "Ingredient 3": "Vegetables",
            "Name of recipe": "Pork Fried Rice",
            "Link": "https://www.allrecipes.com/recipe/230818/pork-fried-rice/"
        }
    ]

function createRecipeJson() {
    var recipe = {};
    var targetId;
    var i = 1;

    for (i = 1; i < 4; i++) {
        targetId = "ingredient" + i;
        recipe[targetId] = getDropDownValue(i);
        console.log(recipe[targetId]);
    }

    recipe["recipeName"] =document.getElementById("recipeName").value;
    recipe["recipeLink"]= document.getElementById("recipeLink").value;

    console.log(recipe["recipeName"]);
    console.log(recipe["recipeLink"]);

    return recipe;
}

function saveData() {
        var obj = createRecipeJson();
        firebase.database().ref("recipes").push(obj);
        console.log("Saved");
    }



function getDropDownValue(i) {
    var targetId;
    var e;
    var strUser;

    targetId = "ingredient" + i;
    e = document.getElementById(targetId);
    strUser = e.options[e.selectedIndex].value;
    return strUser;
    console.log(strUser);
}