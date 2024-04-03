let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const readData = async () => {
    let rollDataR = await fetch('http://localhost:3000/tasks/getUser')
    let rollData = await rollDataR.json();
    return rollData;
}

async function load(){
    const dt = new Date();
    let eventForDay = await readData()

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays

            for (let i = 0; i < eventForDay.length; i++) {
                if (eventForDay[i].taskDateGiven == dayString) {
                    eventDiv.classList.add('event');
                    eventDiv.innerText = eventForDay.taskName;
                    daySquare.appendChild(eventDiv);
                }
                
            }

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }



            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding')
        }

        calendar.appendChild(daySquare)

    }

    
    console.log(paddingDays)
}


function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });
    document.getElementById('returnButton').addEventListener('click', () => {
        window.location.href = "../main.html"; 
    });
}

initButtons()
load()