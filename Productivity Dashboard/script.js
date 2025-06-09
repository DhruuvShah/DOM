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
openFeatures()

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
todoList()

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
dailyPlanner()

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
motivationalQuote()

function pomodoroTimer() {
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
}
pomodoroTimer()

function dailyGoalsFeature() {
    const MAX_PROGRESS = 5;
    const STORAGE_KEY = 'dailyGoals-v1';

    function getGoals() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function setGoals(goals) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    }

    function renderGoals() {
        const goals = getGoals();
        const list = document.querySelector('.goals-list');
        if (!list) return;
        list.innerHTML = '';

        if (goals.length === 0) {
            list.innerHTML = '<div style="text-align:center;color:#aaa;">No goals yet. Add your first one!</div>';
            return;
        }

        goals.forEach((goal, idx) => {
            const card = document.createElement('div');
            card.className = 'goal-card';

            // Header
            const header = document.createElement('div');
            header.className = 'goal-header';

            const title = document.createElement('div');
            title.className = 'goal-title';
            title.textContent = goal.title;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'goal-remove';
            removeBtn.title = 'Remove goal';
            removeBtn.innerHTML = '✕';
            removeBtn.onclick = () => {
                goals.splice(idx, 1);
                setGoals(goals);
                renderGoals();
            };

            header.appendChild(title);
            header.appendChild(removeBtn);
            card.appendChild(header);

            // Progress bar
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-bar-container';

            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            const percent = Math.min(100, Math.round((goal.progress / MAX_PROGRESS) * 100));
            progressBar.style.width = percent + '%';

            progressContainer.appendChild(progressBar);
            card.appendChild(progressContainer);

            // Actions
            const actions = document.createElement('div');
            actions.className = 'goal-actions';

            if (goal.progress < MAX_PROGRESS) {
                const incrementBtn = document.createElement('button');
                incrementBtn.className = 'increment-btn';
                incrementBtn.textContent = '+ Progress';
                incrementBtn.onclick = () => {
                    goals[idx].progress++;
                    setGoals(goals);
                    renderGoals();
                };
                actions.appendChild(incrementBtn);

                const completeBtn = document.createElement('button');
                completeBtn.className = 'complete-btn';
                completeBtn.textContent = 'Complete';
                completeBtn.onclick = () => {
                    goals[idx].progress = MAX_PROGRESS;
                    setGoals(goals);
                    renderGoals();
                };
                actions.appendChild(completeBtn);
            } else {
                const done = document.createElement('span');
                done.textContent = '✅ Completed!';
                done.style.color = '#10b981';
                actions.appendChild(done);
            }

            card.appendChild(actions);
            list.appendChild(card);
        });
    }

    // Add-goal form handler
    const form = document.querySelector('.add-goal-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const goals = getGoals();
            const input = document.getElementById('goal-input');
            const val = input.value.trim();
            if (!val) return;
            if (goals.length >= 5) {
                alert('Maximum 5 daily goals allowed!');
                return;
            }
            goals.push({ title: val, progress: 0 });
            setGoals(goals);
            renderGoals();
            input.value = '';
        });
    }

    // Initial render
    renderGoals();
}
dailyGoalsFeature()

function weatherFunctionality() {
    let apiKey = '79a0cee1b7b14646bd9120439253005'
    let city = 'Ahmedabad';
    let header1Time = document.querySelector('.header1 h1');
    let header1Date = document.querySelector('.header1 h2');
    let header2Temp = document.querySelector('.header2 h2');
    let header4Condition = document.querySelector('.header2 h4');
    let precipitation = document.querySelector('.header2 .precipitation');
    let humidity = document.querySelector('.header2 .humidity');
    let wind = document.querySelector('.header2 .wind');


    let data = null;

    async function weatherAPICall() {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        data = await response.json();

        header2Temp.innerHTML = `${data.current.temp_c}°C`;
        header4Condition.innerHTML = `${data.current.condition.text}`;
        precipitation.innerHTML = `Precipitation: ${data.current.precip_in}%`;
        humidity.innerHTML = `Humidity:${data.current.humidity}%`;
        wind.innerHTML = `Wind: ${data.current.wind_kph}km/h`;
    }

    weatherAPICall();

    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);
}
weatherFunctionality()

function changeTheme() {
    let theme = document.querySelector('.theme')
    let rootElement = document.documentElement
    let flag = 0

    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }

    })
}
changeTheme()



