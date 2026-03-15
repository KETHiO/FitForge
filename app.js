let goal = 2200

let foods = JSON.parse(localStorage.getItem("foods")) || []
let workouts = JSON.parse(localStorage.getItem("workouts")) || []

let chart


const exercises = {

chest:[
"Bench Press",
"Incline Dumbbell Press",
"Chest Fly",
"Push-ups"
],

back:[
"Pull-ups",
"Lat Pulldown",
"Barbell Row",
"Seated Cable Row"
],

legs:[
"Squats",
"Leg Press",
"Lunges",
"Romanian Deadlift"
],

shoulders:[
"Overhead Press",
"Lateral Raise",
"Front Raise",
"Arnold Press"
],

arms:[
"Bicep Curl",
"Tricep Pushdown",
"Hammer Curl",
"Skull Crushers"
]

}


function generateWorkout(){

let muscle = document.getElementById("muscleSelect").value

let workout = exercises[muscle]

let list = document.getElementById("generatedWorkout")

list.innerHTML=""

workout.forEach(exercise=>{

let li=document.createElement("li")

li.innerText = exercise + " | 3 sets x 10 reps"

list.appendChild(li)

})

}


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

updateChart()

}


function renderFoods(){

let list = document.getElementById("foodList")

list.innerHTML=""

foods.forEach(food=>{

let li=document.createElement("li")

li.innerText =
food.name +
" | " + food.calories + " kcal" +
" P:" + food.protein +
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

li.innerText =
workout.exercise +
" | " +
workout.sets +
" sets x " +
workout.reps +
" reps"

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


renderFoods()
renderWorkouts()
