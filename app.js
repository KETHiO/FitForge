const exerciseLibrary = [

{
name:"Bench Press",
muscle:"chest",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Lie on a bench and press the bar upward until arms are extended."
},

{
name:"Incline Dumbbell Press",
muscle:"chest",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Press dumbbells upward on an incline bench."
},

{
name:"Pull-ups",
muscle:"back",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Pull your body upward until your chin clears the bar."
},

{
name:"Lat Pulldown",
muscle:"back",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Pull the bar down to your chest while seated."
},

{
name:"Squat",
muscle:"legs",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Lower your hips until thighs are parallel to the ground."
},

{
name:"Lunges",
muscle:"legs",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Step forward and lower your back knee toward the ground."
},

{
name:"Overhead Press",
muscle:"shoulders",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Press the bar overhead until arms are extended."
},

{
name:"Lateral Raise",
muscle:"shoulders",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Raise dumbbells to shoulder height with straight arms."
},

{
name:"Barbell Curl",
muscle:"arms",
video:"https://www.w3schools.com/html/mov_bbb.mp4",
instructions:"Curl the bar toward your chest while keeping elbows tucked."
}

]



function generateWorkout(){

let muscle=document.getElementById("muscleSelect").value

let exercises = exerciseLibrary.filter(e => e.muscle === muscle)

let list=document.getElementById("generatedWorkout")

list.innerHTML=""

exercises.forEach(exercise=>{

let li=document.createElement("li")

li.innerHTML = `
<strong>${exercise.name}</strong>
<br>
<button onclick="openDemo('${exercise.name}')">View Demo</button>
`

list.appendChild(li)

})

}



function openDemo(name){

let exercise = exerciseLibrary.find(e => e.name === name)

document.getElementById("demoTitle").innerText = exercise.name

document.getElementById("demoMuscle").innerText =
"Primary Muscle: " + exercise.muscle

document.getElementById("demoInstructions").innerText =
exercise.instructions

document.getElementById("demoVideo").src = exercise.video

document.getElementById("exerciseDemo").style.display="block"

}



function closeDemo(){

document.getElementById("exerciseDemo").style.display="none"

}



function showPage(page){

document.getElementById("dashboardPage").style.display="none"
document.getElementById("foodPage").style.display="none"
document.getElementById("workoutPage").style.display="none"
document.getElementById("profilePage").style.display="none"

document.getElementById(page).style.display="block"

}
