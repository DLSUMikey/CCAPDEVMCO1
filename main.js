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
  else {
    console.log('success')
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (()=>{
      add.setAttribute("data-bs-dismiss", "");
    })()
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text:textInput.value,
    date:dateInput.value,
    description: textArea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));


  console.log(data);
  createTasks();
}

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x,y)=> {
    return(tasks.innerHTML += `
    <div id${y}>
    <span class="fw-bold">${x.text}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.description}</p>
  
    </span class="options">
        <svg onClick ="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="edit-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
        <!-- done -->
        <svg onClick ="deleteTask(this)" class="done-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
    </span>
  
  </div>`);
  })
  
resetForm();
};

let deleteTask = (e)=> {
  e.parentElement.remove();
  data.splice(e.parentElement, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
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
  data = JSON.parse(localStorage.getItem("data"));
  createTasks();
})();
