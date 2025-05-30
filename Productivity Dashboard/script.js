function openFeatures() {
    let allElem = document.querySelectorAll('.elem');
    let fullElemPage = document.querySelectorAll('.fullElem')
    let fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')

    allElem.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}
// openFeatures()

function todoList() {
    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task List is empty')
    }

    function renderTask() {
        let allTask = document.querySelector('.allTask')
        let sum = ''

        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
                        <h5>${elem.task} <span class= ${elem.imp}>Imp</span></h5>
                        <button id= ${idx}>Mark As Completed</button>
                    </div>`
        })
        allTask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }
    renderTask()

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask()
        taskCheckbox.checked = false
        taskInput.value = ''
        taskDetailsInput.value = ''
    })
}
// todoList()

function dailyPlanner() {
    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}
    let dayPlanner = document.querySelector('.day-planner')
    let hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    let wholeDaySum = ''
    hours.forEach(function (elem, idx) {
        let saveData = dayPlanData[idx] || ''
        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${saveData}>
    </div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    let dayPlannerInput = document.querySelectorAll('.day-planner input')
    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}
// dailyPlanner()

function motivationalQuote() {
    let motivationQuoteContent = document.querySelector('.motivation-2 h1')
    let motivationAuthor = document.querySelector('.motivation-3 h2')


    async function fetchQuote() {
        let response = await fetch('https://api.realinspire.live/v1/quotes/random')
        let data = await response.json()

        motivationQuoteContent.innerHTML = (data[0].content)
        motivationAuthor.innerHTML = (data[0].author)
    }
    fetchQuote()
}
// motivationalQuote()

let totalSeconds = 25 * 60
let timer = document.querySelector('.pomo-timer h1')
let starBtn = document.querySelector('.pomo-timer .start-timer')
let pauseBtn = document.querySelector('.pomo-timer .pause-timer')
let resetBtn = document.querySelector('.pomo-timer .reset-timer')
let session = document.querySelector('.pomodoro-fullpage .session')
let timerInterval = null
let isWorkSession = true

function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60
    timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
}

function startTimer() {
    clearInterval(timerInterval)

    if (isWorkSession) {
        
        timerInterval = setInterval(function () {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTimer()
            }
            else {
                isWorkSession = false
                clearInterval(timerInterval)
                timer.innerHTML = '05:00'
                session.innerHTML = 'Take a Break'
                session.style.backgroundColor = 'var(--blue)'
                totalSeconds = 5 * 60
            }
        }, 1000)
    }
    else {

        
        timerInterval = setInterval(function () {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTimer()
            }
            else {
                isWorkSession = true
                clearInterval(timerInterval)
                timer.innerHTML = '25:00'
                session.innerHTML = 'Work Session'
                session.style.backgroundColor = 'var(--green)'
                totalSeconds = 25 * 60 
            }
        }, 1000)
    }
}

function pauseTimer() {
    clearInterval(timerInterval)
}

function resetTimer() {
    totalSeconds = 25 * 60
    clearInterval(timerInterval)
    updateTimer()
}

starBtn.addEventListener('click', startTimer)
pauseBtn.addEventListener('click', pauseTimer)
resetBtn.addEventListener('click', resetTimer)