/*Global Variables*/

/*Arrays*/
let taskArray = [];
let completeTaskArray = [];

/*Selecting HTML Elements created in Javascrip*/
let submitForm = document.querySelector("#submit");
let InputTask = document.querySelector("#task");
let InputDate = document.querySelector("#duedate");
let InputNoTask = document.querySelector(".no-task-input");
let InputNoDate = document.querySelector(".no-date-input");
/*Selecting HTML Edited Elements created in Javascrip*/
let EditedsubmitForm = document.querySelector("#edit-submit");
let EditedInputTask = document.querySelector("#edit-task");
let EditedInputDate = document.querySelector("#edit-duedate");
let EditedInputNoTask = document.querySelector(".edit-no-task-input");
let EditedInputNoDate = document.querySelector(".edit-no-date-input");

/*Variable for storing data*/
let timeout;

/*Selecting HTML Elements*/
let completedTaskBtn = document.querySelector('#completedTask');
let currentTaskBtn = document.querySelector('#currentTaskBtn');

/*Global Variables*/

/* Burger Menu*/
let burgerMenu = document.querySelector("#burger-menu");
let nav = document.querySelector(".navbar");

burgerMenu.addEventListener("click", () => {
  nav.classList.toggle("navbarShow");
});

/*Modal Input*/

let modal = document.querySelector("#modal");
let addTaskBtn = document.querySelector("#add-task");

addTaskBtn.addEventListener("click", () => {
  modal.style.display = "grid";
});

/* Close Event Listeners */

let closeModal = document.querySelector("#close");

closeModal.addEventListener("click", (e) => {
  
  modal.style.display = "none";
  InputNoTask.style.display = "none";
  InputNoDate.style.display = "none";
  InputDate.style.marginTop = "0px";
  InputTask.style.marginTop = "0px";
  clearTimeout(timeout);
  InputTask.value = "";
  InputDate.value = "";
});

/*Show Completed Task Array*/
completedTaskBtn.addEventListener('click', () =>{
  let headertext = document.querySelector(".headertext");
  headertext.innerHTML = "Completed Tasks";
  let completedTask = document.querySelector('#completedTaskList');
  completedTask.style.display = 'block';
  taskListEl.style.display = 'none';
  renderCompletedTask();
  
})

/*Show Current Task Array*/
currentTaskBtn.addEventListener('click', () =>{
  let headertext = document.querySelector(".headertext");
  headertext.innerHTML = "Current Tasks";
  let completedTask = document.querySelector('#completedTaskList');
  completedTask.style.display = 'none';
  taskListEl.style.display = 'block';
  renderCurrentTask()

})

/*Submit Task Form*/

submitForm.addEventListener("click", (e) => {
 
  /*Form Validaion*/
  if (!InputTask.value) {
    InputNoTask.style.display = "block";
    InputTask.style.marginTop = "-1em";
    timeout = setTimeout(() => {
      InputNoTask.style.display = "none";
      InputTask.style.marginTop = "0";
    }, 3000);
  }

  if (!InputDate.value) {
    InputNoDate.style.display = "block";
    InputDate.style.marginTop = "-1em";

    timeout = setTimeout(() => {
      InputNoDate.style.display = "none";
      InputNoDate.style.marginTop = "0";
    }, 3000);
  } else {
    createTask();
    modal.style.display = "none";
    InputTask.value = "";
    InputDate.value = "";
  }
});

function createTask() {
  /*Time Stamp*/
  let currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  let hours = currentDate.getHours().toString().padStart(2, "0");
  let minutes = currentDate.getMinutes().toString().padStart(2, "0");
  let seconds = currentDate.getSeconds().toString().padStart(2, "0");

  let timeStamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  let randomId = Math.round(
    Math.random() * parseInt(`${year}${month}${day}`, 10) * 100
  );

  let taskObj = {
    timeStamp: timeStamp,
    id: randomId,
    task: InputTask.value,
    date: InputDate.value,
  };

  taskArray.push(taskObj);
  renderTask();
  storeTaskArrayLocally();
}

let taskListEl = document.getElementById("tasklist");


/*Edited Modal Input*/

let Editedmodal = document.querySelector("#edit-modal");
let editBtn = document.querySelector(".edit");

/*Render Tasks on DOM*/
function renderTask() {
  taskArray.forEach((task) => {
    let divEl = document.createElement("div");
    divEl.classList.add("task-flex");
   

    divEl.innerHTML = `<div class="task-buttons" data-id="${task.id}">
            <img src="./resources/icons/edit.png" class = "edit" data-action="edit" alt="Edit Buttin"/>
            <img src="./resources/icons/bin.png" class = "remove" data-action="remove" alt="Bin Buttons" />
            <img src="./resources/icons/completed-task.png" class = "complete" data-action="complete" alt="Complete Task Button" />
          </div>
    
          <div class="task-to-do" data-id="${task.id}" data-value = "${task.timeStamp}">
              <div class="list" id="list-item-date">Due: ${task.date}</div>
              <div class="list" id="list-item-task">${task.task}</div>
          </div>`;

    divEl.addEventListener("click", (event) => {
      switch (event.target.dataset.action) {
        case "edit":
          editTask(task.id);
          break;
        case "remove":
          removeTask(task.id);
          break;
        case "complete":
          completeTask(task.id);
          break;
      }
    });

    taskListEl.append(divEl);
  });
}

function editTask(id) {
  let taskIndex = taskArray.findIndex((task) => task.id === id);
  let taskElement = document.querySelector(`.task-to-do[data-id="${id}"]`);

  let Editedmodal = document.querySelector("#edit-modal");
  let EditedTask = document.querySelector("#edit-task");
  let EditedDate = document.querySelector("#edit-duedate");

  EditedObject = {
    EditTask: taskArray[taskIndex].task,
    EditDate: taskArray[taskIndex].date
  }

  Editedmodal.style.display = "grid";
  /*Submit Edited task Form*/
  EditedsubmitForm.addEventListener("click", (e) => {
    
    EditedTask.value = EditedObject.EditTask;
    EditedDate.value = EditedObject.EditDate;

    /*Form Validaion*/
    if (!EditedInputTask.value) {
      EditedInputNoTask.style.display = "block";
      EditedInputTask.style.marginTop = "-1em";
      timeout = setTimeout(() => {
        EditedInputNoTask.style.display = "none";
        EditedInputTask.style.marginTop = "0";
      }, 3000);
    }

    if (!EditedInputDate.value) {
        EditedInputNoDate.style.display = "block";
        EditedInputDate.style.marginTop = "-1em";

        timeout = setTimeout(() => {
        EditedInputNoDate.style.display = "none";
        EditedInputDate.style.marginTop = "0";
      }, 3000);
    } else {
      Editedmodal.style.display = "none";
  
      EditedInputTask.value = "";
      EditedInputDate.value = "";

      // Update task values in taskArray
      taskArray[taskIndex].task = EditedTask.value;
      taskArray[taskIndex].date = EditedDate.value;

      // Update task values in the DOM
      taskElement.querySelector("#list-item-date").textContent = `Due: ${taskArray[taskIndex].date}`;
      taskElement.querySelector("#list-item-task").textContent = taskArray[taskIndex].task;
      
      renderTask();
      storeTaskArrayLocally();

    }

    console.log(EditedObject);
    console.log(EditedTask);
  });

  /* Close Edited Task Event Listeners */

  let EditcloseModal = document.querySelector("#edit-close");

  EditcloseModal.addEventListener("click", (e) => {
    Editedmodal.style.display = "none";
    EditedInputNoTask.style.display = "none";
    EditedInputNoDate.style.display = "none";
    EditedInputDate.style.marginTop = "0px";
    EditedInputTask.style.marginTop = "0px";
    clearTimeout(timeout);
    EditedInputTask.value = "";
    EditedInputDate.value = "";
  });

  console.log("Edit task id " + id);
}

function removeTask(id) {
  let taskEl = document.querySelector(`.task-to-do[data-id="${id}"]`);
  let taskFlexEl = taskEl.closest(".task-flex");

  taskFlexEl.remove();
  
  let taskIndex = taskArray.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    taskArray.splice(taskIndex, 1);
    console.log("Task " + id + " removed");
  }

  storeTaskArrayLocally();
}

function completeTask(id) {
  let taskIndex = taskArray.findIndex((task) => task.id === id);
  if(taskIndex !== -1){
    completeTaskArray.push(taskArray[taskIndex]);
    taskArray.splice(taskIndex, 1);
    storeCompleteArrayLocally()
    storeTaskArrayLocally()
    window.location.reload();
  }
}

function renderCompletedTask(){
  
  let completedTask = document.querySelector('#completedTaskList');
  let completedTasksHTML = "";
 
  completeTaskArray.forEach((task) => {

    completedTasksHTML += `<div class="task-flex">
    <div class="task-buttons" data-id="${task.id}">
    <img src="./resources/icons/edit.png" class = "edit" data-action="edit" alt="Edit Button"/>
    <img src="./resources/icons/bin.png" class = "remove" data-action="remove" alt="Bin Buttons" />
    <img src="./resources/icons/completed-task.png" class = "complete" data-action="complete" alt="Complete Task Button" />
  </div>

  <div class="task-to-do" data-id="${task.id}" data-value = "${task.timeStamp}">
      <div class="list" id="list-item-date">Due: ${task.date}</div>
      <div class="list" id="list-item-task">${task.task}</div>
  </div>
  </div>`
  });

  completedTask.innerHTML = completedTasksHTML;
}

function renderCurrentTask(){
  
  let currentTask = document.getElementById("tasklist");
  let currentTasksHTML = "";
 
  taskArray.forEach((task) => {

    currentTasksHTML += `<div class="task-flex">
    <div class="task-buttons" data-id="${task.id}">
    <img src="./resources/icons/edit.png" class = "edit" data-action="edit" alt="Edit Button"/>
    <img src="./resources/icons/bin.png" class = "remove" data-action="remove" alt="Bin Buttons" />
    <img src="./resources/icons/completed-task.png" class = "complete" data-action="complete" alt="Complete Task Button" />
  </div>

  <div class="task-to-do" data-id="${task.id}" data-value = "${task.timeStamp}">
      <div class="list" id="list-item-date">Due: ${task.date}</div>
      <div class="list" id="list-item-task">${task.task}</div>
  </div>
  </div>`
  });

  currentTask.innerHTML = currentTasksHTML;
}

/*Local TaskArray Storage*/
function storeTaskArrayLocally() {
  localStorage.setItem("taskLocalstorage", JSON.stringify(taskArray));
}

function initializeTaskArrayFromLocalStorage() {
  const storedTask = localStorage.getItem("taskLocalstorage");

  if (storedTask) {
    taskArray = JSON.parse(storedTask);
    renderTask();
  }
}

/*Local Completed Task Array Storage*/
function storeCompleteArrayLocally() {
  localStorage.setItem("completeLocalstorage", JSON.stringify(completeTaskArray));
}

function initializeCompleteArrayFromLocalStorage() {
  const storedTask = localStorage.getItem("completeLocalstorage");

  if (storedTask) {
    completeTaskArray = JSON.parse(storedTask);
    renderTask();
  }
}

initializeCompleteArrayFromLocalStorage();
initializeTaskArrayFromLocalStorage();

console.log(`This is list of tasks Array  ${JSON.stringify(taskArray)}`);
console.log(`This is list of completed tasks Array ${JSON.stringify(completeTaskArray)}`);
