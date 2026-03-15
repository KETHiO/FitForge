let goal = 2200

let foods = JSON.parse(localStorage.getItem("foods")) || []
let workouts = JSON.parse(localStorage.getItem("workouts")) || []

function updateCalories(){

let consumed = foods.reduce((sum,food)=>sum + Number(food.calories),0)

let protein = foods.reduce((sum,food)=>sum + Number(food.protein),0)

let carbs = foods.reduce((sum,food)=>sum + Number(food.carbs),0)

let fat = foods.reduce((sum,food)=>sum + Number(food.fat),0)

document.getElementById("consumed").innerText = consumed

document.getElementById("remaining").innerText = goal - consumed

document.getElementById("proteinTotal").innerText = protein

document.getElementById("carbsTotal").innerText = carbs

document.getElementById("fatTotal").innerText = fat

let percent = consumed / goal

let circumference = 440

let offset = circumference - (percent * circumference)

document.getElementById("progressRing").style.strokeDashoffset = offset

}

function renderFoods(){

let list = document.getElementById("foodList")

list.innerHTML=""

foods.forEach(food=>{

let li=document.createElement("li")

li.innerText = food.name + 
" | " + food.calories + " kcal | P:" + food.protein +
" C:" + food.carbs +
" F:" + food.fat

list.appendChild(li)

})

updateCalories()

}

function renderWorkouts(){

let list=document.getElementById("workoutList")

list.innerHTML=""

workouts.forEach(workout=>{

let li=document.createElement("li")

li.innerText = workout.exercise + " | " + workout.sets + " sets x " + workout.reps + " reps"

list.appendChild(li)

})

}

function addFood(){

let name=document.getElementById("foodName").value
let calories=document.getElementById("foodCalories").value
let protein=document.getElementById("foodProtein").value
let carbs=document.getElementById("foodCarbs").value
let fat=document.getElementById("foodFat").value

foods.push({
name:name,
calories:calories,
protein:protein,
carbs:carbs,
fat:fat
})

localStorage.setItem("foods",JSON.stringify(foods))

renderFoods()

}

function addWorkout(){

let workout={
exercise:document.getElementById("exerciseName").value,
sets:document.getElementById("sets").value,
reps:document.getElementById("reps").value
}

workouts.push(workout)

localStorage.setItem("workouts",JSON.stringify(workouts))

renderWorkouts()

}

function showPage(page){

document.getElementById("dashboardPage").style.display="none"
document.getElementById("foodPage").style.display="none"
document.getElementById("workoutPage").style.display="none"
document.getElementById("profilePage").style.display="none"

document.getElementById(page).style.display="block"

}

function logout(){

localStorage.removeItem("user")

window.location="login.html"

}

async function lookupFood(barcode){

let url = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json"

let response = await fetch(url)

let data = await response.json()

if(data.status === 1){

let product = data.product

let name = product.product_name || "Unknown food"

let calories = product.nutriments["energy-kcal_100g"] || 0

let protein = product.nutriments.proteins_100g || 0

let carbs = product.nutriments.carbohydrates_100g || 0

let fat = product.nutriments.fat_100g || 0

document.getElementById("foodName").value = name
document.getElementById("foodCalories").value = calories
document.getElementById("foodProtein").value = protein
document.getElementById("foodCarbs").value = carbs
document.getElementById("foodFat").value = fat

alert("Food detected: " + name)

}else{

alert("Food not found")

}

}

function startScanner(){

Quagga.init({

inputStream:{
name:"Live",
type:"LiveStream",
target:document.querySelector("#scanner")
},

decoder:{
readers:["ean_reader"]
}

},function(err){

if(err){
console.log(err)
return
}

Quagga.start()

})

Quagga.onDetected(function(data){

let barcode=data.codeResult.code

Quagga.stop()

lookupFood(barcode)

})

}

renderFoods()
renderWorkouts()
