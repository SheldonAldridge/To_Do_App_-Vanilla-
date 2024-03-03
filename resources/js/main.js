/* Burger Menu*/
let burgerMenu = document.querySelector("#burger-menu");
let nav = document.querySelector(".navbar");

burgerMenu.addEventListener("click",() => {
    nav.classList.toggle("navbarShow");
})

/*Modal Input*/

let modal = document.querySelector("#modal");
let addTaskBtn = document.querySelector("#add-task");

addTaskBtn.addEventListener("click",() => {
    modal.style.display = "grid";
})

let closeModal = document.querySelector("#close");

closeModal.addEventListener("click",(e) => {
    e.preventDefault();
    modal.style.display = "none";
    if(closeModal){
        InputNoTask.style.display = "none";
        InputNoDate.style.display = "none";
        InputDate.style.marginTop = "0px";
        InputTask.style.marginTop = "0px";
    }
    if(timeout){
        clearTimeout(timeout);
    }
    

    InputTask.value = "";
    InputDate.value = "";
});

/*Arrray for Tasks*/

let taskArray=[];
console.log(taskArray);
let complTaskarray = [];
console.log(complTaskarray);
/*RandomID*/
let currentDate = new Date();

let year = currentDate.getFullYear();
let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
let day = currentDate.getDate().toString().padStart(2, '0'); 


let randomId = Math.round(Math.random() * parseInt(`${year}${month}${day}`, 10) * 100);
//console.log(randomId);


//console.log(timeStamp);

/*Submit  Task Form*/
let submitForm = document.querySelector("#submit");
let InputTask = document.querySelector("#task");
let InputDate = document.querySelector("#date");
let InputNoTask = document.querySelector(".no-task-input");
let InputNoDate = document.querySelector(".no-date-input");
let timeout;

submitForm.addEventListener("click",(e) => {

    e.preventDefault();
    /*Form Validaion*/
    if(!InputTask.value){
    
    InputNoTask.style.display = "block";
    InputTask.style.marginTop = "-1em";

    timeout = setTimeout(() =>{
        InputNoTask.style.display = "none";
        InputTask.style.marginTop = "0";
    }, 3000)
        e.preventDefault();
    }

    if(!InputDate.value){

        InputNoDate.style.display = "block";
        InputDate.style.marginTop = "-1em";

        timeout =  setTimeout(() =>{
            InputNoDate.style.display = "none";
            InputNoDate.style.marginTop = "0";
        }, 3000)
            e.preventDefault();
        }

        createTask();
        
        InputTask.value = "";
        InputDate.value = "";
});


function createTask(){

    /*Time Stamp*/
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let seconds = currentDate.getSeconds().toString().padStart(2, '0');

    let timeStamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    let taskListEl = document.querySelector(".taskList");

    let taskObj = {
        timeStamp: timeStamp, 
        id: randomId,
        task:InputTask.value,
        date:InputDate.value
    }

    taskArray.push(taskObj);

    taskArray.forEach(tasks => {
        
        tasks.innerHTML = ``
    });

}