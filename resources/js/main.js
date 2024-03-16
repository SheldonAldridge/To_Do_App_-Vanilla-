/*Global Variables*/

let taskArray = [];
let completeTaskarray = [];
let submitForm = document.querySelector("#submit");
let InputTask = document.querySelector("#task");
let InputDate = document.querySelector("#duedate");
let InputNoTask = document.querySelector(".no-task-input");
let InputNoDate = document.querySelector(".no-date-input");
let timeout;

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


let taskListEl = document.getElementById("tasklist");



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
  let randomId = Math.round(Math.random() * parseInt(`${year}${month}${day}`, 10) * 100);

  let taskObj = {
    timeStamp: timeStamp,
    id: randomId,
    task: InputTask.value,
    date: InputDate.value,
  };

  taskArray.push(taskObj);
  renderTask()
  storeTaskArrayLocally();
  
}


/*Render Tasks on DOM*/
function renderTask(){
    
    taskArray.forEach((task) => {
        let divEl = document.createElement("div");
        divEl.classList.add("task-flex");
    
        divEl.innerHTML = `<div class="task-buttons">
            <img src="./resources/icons/edit.png" id="edit-button" alt="Edit Buttin"/>
            <img src="./resources/icons/bin.png" id="remove-button" alt="Bin Buttons" />
            <img src="./resources/icons/completed-task.png" id="complete-button" alt="Complete Task Button" />
          </div>
    
          <div class="task-to-do" data-id="${task.id}" data-value = "${task.timeStamp}">
              <div class="list" id="list-item-date">Due: ${task.date}</div>
              <div class="list" id="list-item-task">${task.task}</div>
          </div>`;
    
        taskListEl.append(divEl);
        
      });

      /*edit Task Function*/

    let editBtn = document.getElementById("edit-button");

    editBtn.addEventListener("click", (event) =>{
       for (let i = 0; i < taskArray.length; i++) {
        const element = element.target[i];
        console.log(element);
       }
    })

}



/*Local Storage*/

function storeTaskArrayLocally() {
  localStorage.setItem("taskLocalstorage", JSON.stringify(taskArray));
}

function initializeTaskAraryFromLocalStoraege(){
  const storedTask = localStorage.getItem("taskLocalstorage");

  if(storedTask){
      taskArray = JSON.parse(storedTask);
      renderTask();
  }
  
}

initializeTaskAraryFromLocalStoraege();
console.log(taskArray);