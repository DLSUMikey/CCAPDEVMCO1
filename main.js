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
};

let form = document.getElementById("form");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  let textInput = document.getElementById("textInput");
  let dateInput = document.getElementById("dateInput");
  let textArea = document.getElementById("textArea");
  let msg = document.getElementById("msg");

  if (textInput.value === "") {
    msg.innerHTML = "Task cannot be blank!";
  }
  else if (dateInput.value === "") {
    msg.innerHTML = "Due Date cannot be blank!";
  }
  else {
    msg.innerHTML = "";
    let taskID = form.getAttribute("data-task-id");
    if (taskID) {
      updateTask(taskID);
    } else {
      createNewTask();
    }
  }
};

let createNewTask = () => {
  let userID = localStorage.getItem('currentUserID');
  let textInput = document.getElementById("textInput");
  let dateInput = document.getElementById("dateInput");
  let textArea = document.getElementById("textArea");

  const taskData = {
    userID: userID,
    taskName: textInput.value,
    taskDesc: textArea.value,
    taskDateDue: dateInput.value
  };

  fetch('http://localhost:3000/createTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      alert(data.message); // Display the message from JSON response
      displayTasks();
      resetForm();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while creating the task');
    });
};


let updateTask = (taskID) => {
  // Add logic to update an existing task
  let textInput = document.getElementById("textInput");
  let dateInput = document.getElementById("dateInput");
  let textArea = document.getElementById("textArea");

  const taskData = {
    taskName: textInput.value,
    taskDesc: textArea.value,
    taskDateDue: dateInput.value
  };

  fetch(`http://localhost:3000/updateTask/${taskID}`, {
    method: 'PUT', // Use PUT for update
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      displayTasks();
      resetForm();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while updating the task');
    });
};

let deleteTask = (taskID) => {
  // Send a request to delete the task
  fetch(`http://localhost:3000/deleteTask/${taskID}`, {
    method: 'DELETE',
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      displayTasks();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while deleting the task');
    });
};

let editTask = (taskID) => {
  // Retrieve task data and populate the form for editing
  fetch(`http://localhost:3000/getTask/${taskID}`)
    .then(response => response.json())
    .then(taskData => {
      document.getElementById("textInput").value = taskData.taskName;
      document.getElementById("dateInput").value = taskData.taskDateDue;
      document.getElementById("textArea").value = taskData.taskDesc;
      form.setAttribute("data-task-id", taskID);
      openModal();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while fetching task data');
    });
};

let resetForm = () => {
  document.getElementById("textInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("textArea").value = "";
  form.removeAttribute("data-task-id");
};


let displayTasks = () => {
  let userID = localStorage.getItem('currentUserID');
  let tasksContainer = document.getElementById("tasks");
  tasksContainer.innerHTML = ''; // Clear existing tasks

  fetch(`http://localhost:3000/getTasks?userID=${userID}`)
    .then(response => response.json())
    .then(tasks => {
      tasks.forEach(task => {
        tasksContainer.innerHTML += `
          <div id="task-${task._id}">
            <h3>${task.taskName}</h3>
            <p>${task.taskDesc}</p>
            <span>Due: ${new Date(task.taskDateDue).toLocaleDateString()}</span>
            <button onclick="editTask('${task._id}')">Edit</button>
            <button onclick="deleteTask('${task._id}')">Delete</button>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
};

displayTasks();
