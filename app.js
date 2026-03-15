const exercises = {

chest:["Bench Press","Incline Dumbbell Press","Chest Fly","Push-ups"],

shoulders:["Overhead Press","Lateral Raise","Arnold Press"],

arms:["Bicep Curl","Tricep Pushdown","Hammer Curl"],

legs:["Squats","Leg Press","Lunges","Romanian Deadlift"]

}

function generateWorkout(){

let muscle=document.getElementById("muscleSelect").value

highlightMuscle(muscle)

let workout=exercises[muscle]

let list=document.getElementById("generatedWorkout")

list.innerHTML=""

workout.forEach(exercise=>{

let li=document.createElement("li")

li.innerText=exercise+" | 3 sets x 10 reps"

list.appendChild(li)

})

}

function highlightMuscle(muscle){

document.querySelectorAll(".muscle").forEach(m=>{
m.classList.remove("active")
})

document.getElementById(muscle).classList.add("active")

}

function showPage(page){

document.getElementById("dashboardPage").style.display="none"
document.getElementById("foodPage").style.display="none"
document.getElementById("workoutPage").style.display="none"
document.getElementById("profilePage").style.display="none"

document.getElementById(page).style.display="block"

}
