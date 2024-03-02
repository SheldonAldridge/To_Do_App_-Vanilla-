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
    e.preventDefault();
});


/*Form Validaion*/

let submitForm = document.querySelector("#submit");
let InputTask = document.querySelector("#task");
let InputDate = document.querySelector("#date");
let InputNoTask = document.querySelector(".no-task-input");
let InputNoDate = document.querySelector(".no-date-input");
let timeout;

submitForm.addEventListener("click",(e) => {

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
});