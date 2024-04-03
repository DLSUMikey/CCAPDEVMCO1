function goToCalendar() {
  window.location.href = 'Calendar/Calendar.html';
}


function goToCharacters() {
  window.location.href = 'Character.html';
}

function goToGacha() {
  window.location.href = 'gacha.html';
}

function goToStore() {
  window.location.href = 'Store.html';
}
function openModal() {
  document.getElementById('profileModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('profileModal').style.display = 'none';
}
window.onclick = function (event) {
  let modal = document.getElementById('profileModal');
  if (event.target == modal) {
    closeModal();
  }
}

// function goToCalendar() {
//     window.location.href = 'calendar.html';
//   }

// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.show()

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener('submit', (e)=> {
  e.preventDefault();
  formValidation();
})

let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Task title cannot be blank!";
  } else if (dateInput.value === "") {
    msg.innerHTML = "Due date cannot be blank!";
  } else {
    msg.innerHTML = "";
    acceptevents();
    add.setAttribute("events-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("events-bs-dismiss", "");
    })()
  }
};

let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

let acceptevents = () => {
  events.push({
    date:dateInput.value,
    title:textInput.value,
    assignment: textArea.value,
  });

  localStorage.setItem("events", JSON.stringify(events));


  console.log(events);
  createTasks();
}

let createTasks = () => {
  tasks.innerHTML = "";
  events.map((x,y)=> {
    return(tasks.innerHTML += `
    <div id${y}>
    <span class="fw-bold">${x.title}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.assignment}</p>
  
    </span class="options">
      <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
      <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
    </span>
  
  </div>`);
  })
  
resetForm();
};

let deleteTask = (e)=> {
  e.parentElement.remove();
  events.splice(e.parentElement, 1);
  localStorage.setItem("events", JSON.stringify(events));
  console.log(events);
};

let editTask = (e)=> {
  let selectedTask = e.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textArea.value = selectedTask.children[2].innerHTML;
  selectedTask.remove();
  deleteTask(e);

};


let resetForm  = () => {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

(()=> {
  events = JSON.parse(localStorage.getItem("events")) || [];
  createTasks();
})();
