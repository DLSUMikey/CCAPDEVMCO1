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

let formValidation = ()=> {
  if(textInput.value === "") {
    console.log('failure');
    msg.innerHTML = "Task cannot be blank!";
  }
  else if (dateInput.value === "") {
    msg.innerHTML = "Due Date cannot be blank!";
  }
  else {
    console.log('success')
    msg.innerHTML = "";
    acceptevents();
    add.setAttribute("events-bs-dismiss", "modal");
    add.click();
    (()=>{
      add.setAttribute("events-bs-dismiss", "");
    })()
  }
};

let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

let acceptevents = () => {
  const status = "not started"; // Set the initial status of the new task
  events.push({
    date: dateInput.value,
    title: textInput.value,
    assignment: textArea.value,
    status: status
  });
  localStorage.setItem("events", JSON.stringify(events));
  console.log(events);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  events.map((x, y) => {
    let statusClass = "";
    let statusText = "";
    switch (x.status) {
      case "not started":
        statusClass = "not-started";
        statusText = "Not Started";
        break;
      case "in progress":
        statusClass = "in-progress";
        statusText = "In Progress";
        break;
      case "complete":
        statusClass = "complete";
        statusText = "Complete";
        break;
    }
    return (tasks.innerHTML += `
  <div id="${y}">
    <span class="fw-bold">${x.title}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.assignment}</p>
    <select class="form-select status-select mb-3">
      <option value="not started">Not Started</option>
      <option value="in progress">In Progress</option>
      <option value="complete">Complete</option>
    </select>
    <span class="options">
      <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
      <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
    </span>
  </div>
`);
  });
  resetForm();
};

let deleteTask = (e)=> {
  e.parentElement.remove();
  events.splice(e.parentElement, 1);
  localStorage.setItem("events", JSON.stringify(events));
  console.log(events);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

let editTask = (e) => {
  let selectedTask = e.parentElement;
  let index = Array.from(tasks.children).indexOf(selectedTask);

  // Set the values of the input fields to the current values of the task object
  textInput.value = events[index].title;
  dateInput.value = events[index].date;
  textArea.value = events[index].assignment;
  document.querySelector("#statusSelect").value = events[index].status;

  // Show the modal
  let modal = new bootstrap.Modal(document.getElementById("formModal"));
  modal.show();

  // Update the task when the form is submitted
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    events[index].title = textInput.value;
    events[index].date = dateInput.value;
    events[index].assignment = textArea.value;
    events[index].status = document.querySelector("#statusSelect").value;
    localStorage.setItem("events", JSON.stringify(events));
    createTasks();
    //resetForm();
  });
};


// let editTask = (e) => {
//   let selectedTask = e.parentElement;

//   textInput.value = selectedTask.children[0].innerHTML;
//   dateInput.value = selectedTask.children[1].innerHTML;
//   textarea.value = selectedTask.children[2].innerHTML;

//   deleteTask(e);
// };

// let editTask = (e) => {
//   let selectedTask = e.parentElement;
//   let index = Array.from(tasks.children).indexOf(selectedTask);

//   // Set the values of the input fields to the current values of the task object
//   textInput.value = events[index].title;
//   dateInput.value = events[index].date;
//   textArea.value = events[index].assignment;
//   document.querySelector("#statusSelect").value = events[index].status;

//   // Remove the current task card
//   deleteTask(e);

//   // Show the modal
//   let modal = new bootstrap.Modal(document.getElementById("formModal"));
//   modal.show();

//   // Add a new task when the form is submitted
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     events.splice(index, 1, {
//       date: dateInput.value,
//       title: textInput.value,
//       assignment: textArea.value,
//       status: document.querySelector("#statusSelect").value
//     });
//     localStorage.setItem("events", JSON.stringify(events));
//     createTasks();
//     resetForm();
//   });
// };

(()=> {
  events = JSON.parse(localStorage.getItem("events")) || [];
  createTasks();
})();
