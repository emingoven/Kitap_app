let readings = JSON.parse(localStorage.getItem("readings")) || []

function addReading(){

let book=document.getElementById("bookName").value
let pages=parseInt(document.getElementById("pages").value)

if(!book || !pages) return

readings.push({
book,
pages,
date:new Date().toLocaleDateString()
})

localStorage.setItem("readings",JSON.stringify(readings))

updateUI()

}

function saveGoals(){

let daily=document.getElementById("dailyGoal").value
let monthly=document.getElementById("monthlyGoal").value

localStorage.setItem("dailyGoal",daily)
localStorage.setItem("monthlyGoal",monthly)

alert("Hedef kaydedildi")

}

function updateUI(){

renderHistory()
renderLibrary()
renderBadges()
renderChart()

}

function renderHistory(){

let div=document.getElementById("history")

div.innerHTML=""

readings.forEach((r,i)=>{

div.innerHTML+=`
<div class="book">

<b>${r.book}</b>
<br>

${r.pages} sayfa - ${r.date}

<br>

<button onclick="deleteEntry(${i})">Sil</button>

</div>
`

})

}

function deleteEntry(i){

readings.splice(i,1)

localStorage.setItem("readings",JSON.stringify(readings))

updateUI()

}

function renderLibrary(){

let books=[...new Set(readings.map(r=>r.book))]

let div=document.getElementById("library")

div.innerHTML=""

books.forEach(b=>{
div.innerHTML+=`<div class="book">📖 ${b}</div>`
})

}

function renderBadges(){

let total=readings.reduce((a,b)=>a+b.pages,0)

let badges=[]

if(total>100) badges.push("100 Sayfa")
if(total>500) badges.push("500 Sayfa")
if(total>1000) badges.push("1000 Sayfa")
if(total>3000) badges.push("Kitap Kurdu")

let div=document.getElementById("badges")

div.innerHTML=""

badges.forEach(b=>{
div.innerHTML+=`<span class="badge">${b}</span>`
})

}

function renderChart(){

let ctx=document.getElementById("chart")

let pages=readings.map(r=>r.pages)

let dates=readings.map(r=>r.date)

new Chart(ctx,{
type:"line",
data:{
labels:dates,
datasets:[{
label:"Okunan Sayfa",
data:pages
}]
}
})

}

updateUI()
