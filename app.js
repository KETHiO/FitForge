const workouts = {

chest:[
"Bench Press",
"Incline Dumbbell Press",
"Chest Fly",
"Tricep Pushdown"
],

shoulders:[
"Overhead Press",
"Lateral Raise",
"Arnold Press",
"Face Pull"
],

arms:[
"Barbell Curl",
"Hammer Curl",
"Tricep Pushdown",
"Skull Crushers"
],

legs:[
"Squat",
"Leg Press",
"Lunges",
"Romanian Deadlift"
]

}



let recovery = JSON.parse(localStorage.getItem("recovery")) || {

chest:100,
shoulders:100,
arms:100,
legs:100

}



let history = JSON.parse(localStorage.getItem("history")) || {}



function generateWorkout(){

let muscle=document.getElementById("muscleSelect").value

buildWorkout(muscle)

highlightMuscle(muscle)

recovery[muscle]=0

localStorage.setItem("recovery",JSON.stringify(recovery))

updateRecovery()

}



function buildWorkout(muscle){

let plan=workouts[muscle]

let list=document.getElementById("generatedWorkout")

list.innerHTML=""

let title=document.createElement("h3")

title.innerText=muscle.toUpperCase()+" WORKOUT"

list.appendChild(title)

plan.forEach(exercise=>{

let lastWeight = history[exercise] || 20

let suggested = Math.round((lastWeight + 2.5)*10)/10

let li=document.createElement("li")

li.innerHTML = `
${exercise}
<br>
Last: ${lastWeight} kg
<br>
Suggested: ${suggested} kg
<br>
<input placeholder="Weight used (kg)" id="${exercise}">
<button onclick="saveWeight('${exercise}',${suggested})">Save</button>
`

list.appendChild(li)

})

}



function saveWeight(exercise,suggested){

let input=document.getElementById(exercise)

let weight=input.value

if(weight===""){

weight=suggested

}

history[exercise]=parseFloat(weight)

localStorage.setItem("history",JSON.stringify(history))

alert("Workout saved!")

}



function suggestWorkout(){

let best="chest"

let highest=0

for(let muscle in recovery){

if(recovery[muscle]>highest){

highest=recovery[muscle]

best=muscle

}

}

buildWorkout(best)

highlightMuscle(best)

alert("Recommended workout: "+best)

}



function highlightMuscle(muscle){

document.querySelectorAll(".muscle").forEach(m=>{

m.classList.remove("active")

})

document.getElementById(muscle).classList.add("active")

}



function updateRecovery(){

for(let muscle in recovery){

let element=document.getElementById(muscle)

let value=recovery[muscle]

if(value<30){

element.style.background="red"

}

else if(value<70){

element.style.background="orange"

}

else{

element.style.background="limegreen"

}

}

}



function recoverMuscles(){

for(let muscle in recovery){

recovery[muscle]+=5

if(recovery[muscle]>100){

recovery[muscle]=100

}

}

localStorage.setItem("recovery",JSON.stringify(recovery))

updateRecovery()

}



function showPage(page){

document.getElementById("dashboardPage").style.display="none"

document.getElementById("foodPage").style.display="none"

document.getElementById("workoutPage").style.display="none"

document.getElementById("profilePage").style.display="none"

document.getElementById(page).style.display="block"

}



setInterval(recoverMuscles,20000)

updateRecovery()
