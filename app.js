if(!localStorage.getItem("user")){
window.location="login.html"
}

let foods = JSON.parse(localStorage.getItem("foods")) || []

const exercises = {

chest:["Bench Press","Incline Dumbbell Press","Chest Fly"],
back:["Pull-ups","Lat Pulldown","Barbell Row"],
legs:["Squat","Leg Press","Lunges"],
shoulders:["Overhead Press","Lateral Raise","Arnold Press"],
arms:["Barbell Curl","Hammer Curl","Tricep Pushdown"]

}

let workoutPlan=[]
let currentExercise=0
let sets=0


function logout(){

localStorage.removeItem("user")

window.location="login.html"

}


function addFood(){

let name=document.getElementById("foodName").value
let calories=document.getElementById("foodCalories").value

foods.push({name,calories})

localStorage.setItem("foods",JSON.stringify(foods))

renderFoods()
updateCalories()

}


function renderFoods(){

let list=document.getElementById("foodList")

list.innerHTML=""

foods.forEach(food=>{

let li=document.createElement("li")

li.innerText=food.name+" - "+food.calories+" kcal"

list.appendChild(li)

})

}


function updateCalories(){

let consumed=foods.reduce((sum,f)=>sum+Number(f.calories),0)

document.getElementById("consumed").innerText=consumed

let percent=consumed/2200

let circumference=440
let offset=circumference-(percent*circumference)

document.getElementById("progressRing").style.strokeDashoffset=offset

}


function startScanner(){

Quagga.init({

inputStream:{name:"Live",type:"LiveStream",target:"#scanner"},
decoder:{readers:["ean_reader"]}

},function(err){

if(err){console.log(err);return}

Quagga.start()

})

Quagga.onDetected(function(data){

alert("Barcode: "+data.codeResult.code)

Quagga.stop()

})

}


function generateWorkout(){

let muscle=document.getElementById("muscleSelect").value

highlightMuscle(muscle)

workoutPlan=exercises[muscle]

let list=document.getElementById("generatedWorkout")

list.innerHTML=""

workoutPlan.forEach(e=>{

let li=document.createElement("li")

li.innerText=e+" | 3 sets x 10 reps"

list.appendChild(li)

})

}


function highlightMuscle(muscle){

document.querySelectorAll(".muscle").forEach(m=>m.classList.remove("active"))

let target=document.getElementById(muscle)

if(target) target.classList.add("active")

}


function showFront(){

document.getElementById("frontBody").style.display="block"
document.getElementById("backBody").style.display="none"

}


function showBack(){

document.getElementById("frontBody").style.display="none"
document.getElementById("backBody").style.display="block"

}


function startWorkout(){

currentExercise=0
sets=0

showPage("sessionPage")

loadExercise()

}


function loadExercise(){

document.getElementById("sessionExercise").innerText=workoutPlan[currentExercise]

document.getElementById("setCounter").innerText=0

}


function completeSet(){

sets++
document.getElementById("setCounter").innerText=sets

}


function nextExercise(){

currentExercise++

if(currentExercise>=workoutPlan.length){

alert("Workout Complete")

showPage("dashboardPage")

return

}

loadExercise()

}


let timerInterval

function startTimer(){

let time=60

clearInterval(timerInterval)

timerInterval=setInterval(()=>{

time--

document.getElementById("timer").innerText=time

if(time<=0){

clearInterval(timerInterval)

}

},1000)

}


function showPage(page){

document.getElementById("dashboardPage").style.display="none"
document.getElementById("foodPage").style.display="none"
document.getElementById("workoutPage").style.display="none"
document.getElementById("sessionPage").style.display="none"

document.getElementById(page).style.display="block"

}

renderFoods()
updateCalories()
