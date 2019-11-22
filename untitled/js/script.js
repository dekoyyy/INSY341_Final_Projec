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

var productArray = []; // we will store the JSON Object there before we separate it in a multidimensional array
var data = [];
var ingredientArray = [[],[],[],[],[]]; // ingredientArray[0] is the list of all ingredient 1 ingredientArray[0][0] is the first ingredient for the first recipe, ...
var ingredientArrayWithoutDupes = [[], [], []];
var counter = 0; // global variable for the change of ingredients 
var ingredientNumber = 0; //global variable for the number of the ingredient
var recipeArray = [];
var recipesChosen = [];
var recipeNameAndLink = [[],[]];


function displayData(arr) { // test function to see if read data works, not useful
    var result = "";
    var i = 0;
    // add for loop so it cycles through each array
    for (i = 0; i < arr.length; i++) {
        result = result + arr[i]['Ingredient 1'] + "<br>";
        console.log(result);
    }
    document.getElementById("demo").innerHTML = result;
}

function readData () { // straight out of slide 11 v3
    var loc = firebase.database().ref("recipes");
    firebase.database().ref("recipes").on('value', function(snapshot) {
            data = snapshot.val();
            console.log("got snapshot of all objects at this point in time");
            snapshot.forEach(function(loc){
                productArray.push(loc.val()); // push json object to productArray
            });
            console.log(productArray);
           // console.log(productArray[0]['Name of recipe']);
            updateIngredientArrays(productArray); // create 2 dimensional array with ingredient names
            removeDupes(ingredientArray);
            console.log("removed duplicates");
             // console.log(window.location.href.indexOf('index.html'));
            if (window.location.href.indexOf('index.html') > -1) { // only call addChocies if the page is index.html
                addChoices(ingredientArrayWithoutDupes);
            }
            if (window.location.href.indexOf('enterRecipes.html') > -1) { // only call addOptions if the page is enterRecipes.html
                addOptions(ingredientArrayWithoutDupes);
            }

        }

    );
}

function updateIngredientArrays(arr) { // updates ingredientArray. . It adds the name of every ingredient as an entry to the array ingredientArray, also adds the recipe name and link
    var newEntry = "";                  // stores the database locally
    var ingredientId;
    var target;
    var i = 0;
    var j = 0;
    var n;
    var len;
    var recipeName;           // gets data from productArray and stores it locally in an easier-to-access location
    var recipeNameTarget;           // gets data from productArray and stores it locally in an easier-to-access location
    var recipeLink;
    var recipeLinkTarget;
    var newRecipe = "";
    var newLink = "";

    len = arr.length;

    console.log('yes');
    for (j = 0; j < 3; j++ ) { // loops three times, once for each ingredient
        n = j + 1
        target = ingredientArray[j]; // sets the target where we will push the different entries
        ingredientId = "Ingredient " + n; // sets the name of the id we will get the value from
        for (i = 0; i < len; i++) { // loops through every recipe to add the ingredients to the array
            newEntry = arr[i][ingredientId];
            // console.log(newEntry)
            target.push(newEntry);  // pushing the ingredient
        }
        //console.log(target);
    }

    recipeName = "Name of recipe";
    recipeLink = "Link";
    recipeNameTarget = ingredientArray[3];
    recipeLinkTarget = ingredientArray[4];

    for (i = 0; i < len; i++) {
        newRecipe = arr[i][recipeName];
        newLink = arr[i][recipeLink];
        recipeNameTarget.push(newRecipe);
        recipeLinkTarget.push(newLink);
    }
    console.log(ingredientArray);
}

function removeDupes(arr) { // will remove duplicates and put them in the ingredientArrayWithoutDuplicates
    var i = 0;
    var j = 0;
    var targetId;
    var sourceId;
    var possibleEntry;

    for (i = 0; i < 3; i ++) { // will loop through Ingredient 1, 2 and 3
        targetId = ingredientArrayWithoutDupes[i];
        sourceId = ingredientArray[i];

        for (j = 0; j < arr[0].length; j ++) { // will loop through every recipe
            possibleEntry = sourceId[j];
            if (targetId.includes(possibleEntry) == false) { // if the possibleEntry is not in the array, add it
                targetId.push(possibleEntry);
            }
            // console.log(targetId);

        }
    }
    // console.log(ingredientArrayWithoutDupes);
}

function updateArrayWithoutDuplicates (arr, i) { // removes the ingredients that are not in arr from ingredientArrayWithoutDuplicates
    var j = 0;
    var targetId;
    var len;
    var tempArray = [];
    var possibleEntry;
    console.log("updateArrayWithoutDuplicates is called");
    //console.log(arr);
    console.log(ingredientArrayWithoutDupes);

    targetId = ingredientArrayWithoutDupes[i];
    len = targetId.length;

    for (j = 0; j < len; j++) { // we loop through every element in the ingredientArrayWithoutDuplicates
        possibleEntry =  targetId[j];
        console.log(arr.includes(possibleEntry));
        if (arr.includes(possibleEntry) == true) { // if arr include the possible entry, we remove the possible entry from ingredientArrayWithoutDuplicates
            tempArray.push(possibleEntry);
        }
    }
    console.log(tempArray);
    ingredientArrayWithoutDupes[i] = tempArray.slice(0);
    console.log(ingredientArrayWithoutDupes);
}

function addOptions(arr) { // dynamically adds options
    console.log("add options is called");
    var newOption;
    var targetId;
    var targetDom;
    var n = 0;
    var i = 0;
    var j = 0;

    for (i = 0; i < arr.length; i ++) {
        n = i + 1;
        targetId = "ingredient" + n; // selects ingredient1, ...
        targetDom = document.getElementById(targetId); // sets DOM

        for (j = 0; j < arr[i].length; j ++) {
            newOption = document.createElement("option"); // sets var equal to option
            newOption.text = arr[i][j];                   // sets text equal to specific ingredient
            newOption.value = arr[i][j];                  // sets value equal to specific ingredient
            // console.log(newOption);

            targetDom.add(newOption);                      // adds ingredient as an option to target DOM
        }
    }
}

function addChoices(arr) { // dynamically adds choices to index.html
    console.log("add choices is called");
    var targetId;
    var targetDom;
    var i = 0;
    var n = 0;
    var index;
    var len;
    console.log("counter is ", counter);
    console.log("ingredient number is ", ingredientNumber);

    len = arr[ingredientNumber].length;

    for (i = 0; i < arr.length; i ++) {
        n = i + 1;
        targetId = "choice" + n;
        // console.log(targetId);
        targetDom = document.getElementById(targetId);
        index = (len - i) % len;

        targetDom.innerHTML = arr[ingredientNumber][index]; // add text to ingredient 1, ...
        targetDom.setAttribute("value", arr[ingredientNumber][index]);
        targetDom.setAttribute("onclick", "makeChoice(this.innerHTML)");
    }
}

function changeChoices(arr) { // changes choices available in index.html
    console.log("change choices is called")
    var index;
    var indexModulo;
    var targetId;
    var targetDom;
    var i = 0;
    var n = 0;
    var len;

    len = arr[ingredientNumber].length

    counter ++; // Add 1 to counter everytime button is pressed
    index = counter + 2 * len; // sets index = counter dont ask but it works

    for (i = 0; i < arr.length; i ++) { // no idea how it works but it does, basically moves every choice to the right
        n = i + 1;
        targetId = "choice" + n; // sets id
        targetDom = document.getElementById(targetId); // sets dom
        indexModulo = Math.abs((len - index)) % len;
        targetDom.innerHTML = arr[ingredientNumber][indexModulo];
        targetDom.setAttribute("value", arr[ingredientNumber][indexModulo]);
        targetDom.setAttribute("onclick", "makeChoice(this.innerHTML)")
        index --;
        // console.log(indexModulo);
        // console.log(targetId);
    }
}

function clearChoice() {
    var i = 0;
    var n = 0;
    var targetId;
    var targetDom;


    for (i = 0; i < 3; i++) {
        n = i + 1;
        targetId = "choice" + n;
        targetDom = document.getElementById(targetId);
        targetDom.innerHTML = "";
        targetDom.setAttribute("value", null);
        targetDom.setAttribute("onclick", null);
    }
}

function makeChoice(innerHTML) { // adds choice to recipeArray and updates the choices so only the choices that have the previous ingredient are available
    var i = 0;
    var n;
    var tempArray = [];
    console.log("makeChoice is called");
    recipeArray[ingredientNumber] = innerHTML; // sets chosen ingredient to array index
    console.log(recipeArray);
    ingredientNumber ++; // add 1 to ingredientNumber
    counter = 0; // resetCounter

    if (ingredientNumber == 1) { // if choices are not all made
        tempArray = [];
        n = 0;
        for (i = 0; i < ingredientArray[ingredientNumber].length; i++) {
            if (ingredientArray[0][i] == recipeArray[0]) {
                tempArray.push(ingredientArray[1][i]); // gets the list of all the possibilities that are under a certain choice.
                                                                         // i.e. if you choose chicken, lists all the recipes whosesecond ingredient that have chicken as a first ingredient
                // console.log(tempArray);
            }

        }
        updateArrayWithoutDuplicates(tempArray, ingredientNumber);
        clearChoice();
        addChoices(ingredientArrayWithoutDupes);

    }  else if (ingredientNumber == 2) {
        tempArray = [];
        n = 1;
        for (i = 0; i < ingredientArray[ingredientNumber].length; i++) {
            if (ingredientArray[0][i] == recipeArray[0] && ingredientArray[1][i] == recipeArray[1]) {
                tempArray.push(ingredientArray[2][i]); // gets the list of all the possibilities that are under a certain choice.
                // i.e. if you choose chicken, lists all the recipes whose third ingredient have chicken as a first ingredient and tomatoes as a second, used so we never get an ending without a recipe linked to it .
                // console.log(tempArray);
            }

        }
        updateArrayWithoutDuplicates(tempArray, ingredientNumber);
        clearChoice();
        addChoices(ingredientArrayWithoutDupes);
    }  else if (ingredientNumber == 3) {
        clearChoice();
        displayRecipe();
        changeButton();
    }
}

function displayRecipe() { // function to display the possible recipes
    var i = 0;
    var j = 0;
    var len;


    len = ingredientArray[0].length;


    for (i = 0; i < len; i ++) { // push all recipes with ingredient 1 AND 2 AND 3
        if (ingredientArray[0][i] == recipeArray[0] && ingredientArray[1][i] == recipeArray[1] && ingredientArray[2][i] == recipeArray[2] ) {
            recipesChosen.push(i);
        }
    }
    var targetId;
    var targetDom;
    var n = 0;
    var index;
    var leng;
    var newLink;
    var newText;
    var newId;

    leng = recipesChosen.length;

    for (i = 0; i < 3; i ++) {
        n = i + 1;
        targetId = "choice" + n;
        // console.log(targetId);
        targetDom = document.getElementById(targetId);
        index = recipesChosen[(leng - i) % leng];
        console.log(index);
        // console.log(ingredientArray[3][index]);
        //  console.log(ingredientArray[4][index]);

        newId = "recipe" + n;
        newLink = document.createElement("A");
        newLink.setAttribute("href", ingredientArray[4][index]);
        newLink.setAttribute("id", newId);
        newText = document.createTextNode(ingredientArray[3][index]);
        newLink.appendChild(newText);
        targetDom.appendChild(newLink);
        // targetDom.setAttribute("value", arr[ingredientNumber][index]);
        // targetDom.setAttribute("onclick", "makeChoice(this.innerHTML)");
    }


}

function changeButton() {
    var targetDom;

    targetDom = document.getElementById("button");
    targetDom.setAttribute("onclick", "changeRecipe(recipesChosen)");
}

function changeRecipe(arr) {
    console.log("change recipe is called");
    var index;
    var index2;
    var indexModulo;
    var targetId;
    var targetDom;
    var i = 0;
    var n = 0;
    var len;

    len = arr.length;

    counter ++; // Add 1 to counter everytime button is pressed
    index = counter + 2 * len; // sets index = counter dont ask but it works

    for (i = 0; i < 3; i ++) { // no idea how it works but it does, basically moves every choice to the right
        n = i + 1;
        targetId = "recipe" + n; // sets id
        targetDom = document.getElementById(targetId); // sets dom
        indexModulo = Math.abs((len - index)) % len;
        index2 = arr[indexModulo];
        targetDom.innerHTML = ingredientArray[3][index2];
        targetDom.setAttribute("href", ingredientArray[4][index2]);
        index --;
        // console.log(indexModulo);
        // console.log(targetId);
    }
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

function createRecipeJson() { // creates a JSON object with the recipe that is created
    var recipe = {}; // initializes the recipe object
    var targetId;
    var i = 1;

    for (i = 1; i < 4; i++) { // loops through the three dropdowns
        targetId = "Ingredient " + i;
        recipe[targetId] = getDropDownValue(i); // sets
        console.log(recipe[targetId]);
    }

    recipe["Name of recipe"] =document.getElementById("recipeName").value;
    recipe["Link"]= document.getElementById("recipeLink").value;

    // console.log(recipe["recipeName"]);
    //  console.log(recipe["recipeLink"]);

    return recipe;
}

function saveData() { // pushes the recipe created by the user to the database
    var obj = createRecipeJson();
    firebase.database().ref("recipes").push(obj);
    console.log("Saved");
    window.location.reload(); // refreshes the page once the value is saved so that addOptions doesnt run a second time and add a bunch of options
                              // honestly, couldnt find a prettier way to do so
}

function getDropDownValue(i) { // returns the value selected in a drop down menu
    var targetId;
    var e;
    var strUser;

    targetId = "ingredient" + i;
    e = document.getElementById(targetId);
    strUser = e.options[e.selectedIndex].value;
    return strUser; // returns what is selected in the dropdown
    // console.log(strUser);
}
