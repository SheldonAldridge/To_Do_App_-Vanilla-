/*Global Variables*/

let taskArray = [];
let completeTaskarray = [];

let submitForm = document.querySelector("#submit");
let InputTask = document.querySelector("#task");
let InputDate = document.querySelector("#duedate");
let InputNoTask = document.querySelector(".no-task-input");
let InputNoDate = document.querySelector(".no-date-input");
let timeout;

let EditedsubmitForm = document.querySelector("#edit-submit");
let EditedInputTask = document.querySelector("#edit-task");
let EditedInputDate = document.querySelector("#edit-duedate");
let EditedInputNoTask = document.querySelector(".edit-no-task-input");
let EditedInputNoDate = document.querySelector(".edit-no-date-input");

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
  e.preventDefault();
  modal.style.display = "none";
  InputNoTask.style.display = "none";
  InputNoDate.style.display = "none";
  InputDate.style.marginTop = "0px";
  InputTask.style.marginTop = "0px";
  clearTimeout(timeout);
  InputTask.value = "";
  InputDate.value = "";
});

/*Submit Task Form*/

submitForm.addEventListener("click", (e) => {
  e.preventDefault();
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

/*Render Tasks on DOM*/
function renderTask() {
  taskArray.forEach((task) => {
    let divEl = document.createElement("div");
    divEl.classList.add("task-flex");

    divEl.innerHTML = `<div class="task-buttons">
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

/*Edited Modal Input*/

let Editedmodal = document.querySelector("#edit-modal");
let editBtn = document.querySelector(".edit");

function editTask(id) {
  let taskIndex = taskArray.findIndex((task) => task.id === id);
  let taskElement = document.querySelector(`.task-to-do[data-id="${id}"]`);

  let Editedmodal = document.querySelector("#edit-modal");


  EditedInputTask.value = taskArray[taskIndex].task;
  EditedInputDate.value = taskArray[taskIndex].date;

  Editedmodal.style.display = "grid";
  /*Submit Edited task Form*/
  EditedsubmitForm.addEventListener("click", (e) => {

    e.preventDefault();
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
      taskArray[taskIndex].task = taskObjEdited;
      taskArray[taskObjEdited.task] = DateStore;
    }

    taskArray[taskIndex].task = EditedInputTask.value;
    taskArray[taskIndex].date = EditedInputDate.value;

    taskElement.querySelector("#list-item-date").textContent = `Due: ${taskArray[taskIndex].date}`;
    taskElement.querySelector("#list-item-task").textContent = taskArray[taskIndex].task;

  });

  /* Close Edited Task Event Listeners */

  let EditcloseModal = document.querySelector("#edit-close");

  EditcloseModal.addEventListener("click", (e) => {
    e.preventDefault();
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
  console.log("Remove task id " + id);
}

function completeTask(id) {
  console.log("Complete task id " + id);
}

/*Local Storage*/

function storeTaskArrayLocally() {
  localStorage.setItem("taskLocalstorage", JSON.stringify(taskArray));
}

function initializeTaskAraryFromLocalStoraege() {
  const storedTask = localStorage.getItem("taskLocalstorage");

  if (storedTask) {
    taskArray = JSON.parse(storedTask);
    renderTask();
  }
}

initializeTaskAraryFromLocalStoraege();
console.log(taskArray);
console.log(completeTaskarray);
