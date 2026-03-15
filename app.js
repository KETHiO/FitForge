let goal = 2200

let foods = JSON.parse(localStorage.getItem("foods")) || []
let workouts = JSON.parse(localStorage.getItem("workouts")) || []


function updateCalories(){

let consumed = foods.reduce((sum,food)=>sum + Number(food.calories),0)

document.getElementById("consumed").innerText = consumed

document.getElementById("remaining").innerText = goal - consumed

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

foods.push({
name:name,
calories:calories
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

let code=data.codeResult.code

alert("Barcode detected: "+code)

Quagga.stop()

})

}


renderFoods()
renderWorkouts()
