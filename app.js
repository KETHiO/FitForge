let goal = 2200

let foods = JSON.parse(localStorage.getItem("foods")) || []
let workouts = JSON.parse(localStorage.getItem("workouts")) || []

function updateCalories(){

let consumed = foods.reduce((sum,food)=>sum + Number(food.calories),0)

document.getElementById("consumed").innerText = consumed

document.getElementById("remaining").innerText = goal - consumed

let percent = (consumed/goal)*100

if(document.getElementById("progress")){
document.getElementById("progress").style.width = percent + "%"
}

}

function renderFoods(){

let list = document.getElementById("foodList")

list.innerHTML=""

foods.forEach(food=>{

let li=document.createElement("li")

li.innerText = food.name + " - " + food.calories + " kcal"

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

let food={
name:name,
calories:calories
}

foods.push(food)

localStorage.setItem("foods",JSON.stringify(foods))

document.getElementById("foodName").value=""
document.getElementById("foodCalories").value=""

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

document.getElementById("exerciseName").value=""
document.getElementById("sets").value=""
document.getElementById("reps").value=""

renderWorkouts()

}

function askAI(){

let question=document.getElementById("question").value.toLowerCase()

let response=""

if(question.includes("abs")){
response="To reveal abs: stay in a calorie deficit, train core 3 times per week, and keep protein high."
}

else if(question.includes("protein")){
response="A good protein target is about 1.6 to 2.2 grams per kg of body weight daily."
}

else if(question.includes("fat loss")){
response="For fat loss focus on a calorie deficit, strength training, and consistent cardio."
}

else if(question.includes("workout")){
response="A balanced routine includes push, pull, legs, and core training during the week."
}

else{
response="Stay consistent with nutrition and training. Progress comes from small daily habits."
}

document.getElementById("aiResponse").innerText=response

}

renderFoods()

renderWorkouts()
