
//get container class from HTML element
let taskContainer = document.querySelector('#container')
let UserContainer = document.querySelector('#user-input-container')
let userInput = document.querySelector('.user-input')
let taskList = document.querySelector('.task-list')
/*Create HTML Elements*/

//Create input HTML Element
let inputeEl = document.createElement('input')
//add inpute class to HTML Element
inputeEl.classList.add('input-task')

//Create inpute HTML Element
let dateEl = document.createElement('input')
//set date input to HTML Element
dateEl.setAttribute('type','date')

//add date input class to HTML element
dateEl.classList.add('input-date')

//Create HTML button element
let btnEl = document.createElement('button')
btnEl.innerText='Add Task'
//add button class to HTML element
btnEl.classList.add('task-button')

//Append created HTML element to container class
userInput.append(inputeEl)
userInput.append(dateEl)
userInput.append(btnEl)


//Create empty array for task to go into
let taskArray = []

//function that creates randomID
const randomIDGen = () =>{
    let id = Math.floor(Math.random() * 10000).toString(10) + Date.now().toString(10)
    return id
}

//create function that creates Tasks
const createTask = () =>{

    let taskInput = inputeEl.value.trim()
    let dateInput = dateEl.value.trim()

    //task form validation
        if(!inputeEl.value && !dateEl.value){
            alert("please fill in task and due date")
            return;
        }
        if(!inputeEl.value){
             alert("please fill in task")
             return;
        }
        if(!dateEl.value){
             alert("please fill in due date")
             return;
        }

        //object to store task input
       let taskObj = {
            id:randomIDGen(),
            task: taskInput,
            date: dateInput
        }

        taskArray.push(taskObj)
        //console.log(taskObj)
        storingTask()
        resetForm()

        return taskObj
}

btnEl.addEventListener('click', (event) =>{
    event.preventDefault()
    createTask()
    loadTask()
})

const renderTask = (event) => {

    taskList.innerHTML = '';

    taskArray.forEach(element => {

        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task-item');
        taskDiv.setAttribute('data-id',element.id);

        taskDiv.innerHTML = `
        <input type="checkbox" class= checkbox></input>
        <span class ="task"> ${element.task}</span>
        <span class ="date"> ${element.date}</span>
        <div class="action-icons">
            <span class = "delete-task"><img src="./Icons/Delete_Icon.png"></span>
            <span class = "edit-task"><img src="./Icons/Edit_Icon.png"></span>
         </div>
        `;
    
    // Append each task to the task list div
    taskList.appendChild(taskDiv)
    
    });
    completeTask()
    removeTask()
    editTask()
}

const resetForm = () =>{
    inputeEl.value = ''
    dateEl.value = ''
}

const completeTask = () =>{
    let checkBox = document.querySelectorAll('.checkbox')

    checkBox.forEach(checkBox => {
        checkBox.addEventListener('change',()=>{
            const taskId = checkBox.closest('.task-item').getAttribute('data-id')
            const findTask = taskArray.find(({id}) => id === taskId)
            if(findTask){
                let taskItem = checkBox.closest('.task-item')
                let taskList = taskItem.querySelector('.task-list')
                let deleteAction = taskItem.querySelector('.delete-task img')
                
            if (checkBox.checked) {
                taskItem.classList.add('complete-task');
                taskItem.classList.add('comp-delete-icon');
                console.log(deleteAction)
            } else {
                taskItem.classList.remove('complete-task');
                taskItem.classList.remove('comp-delete-icon');
                
            }
        }
            //console.log(findTask)
        })
    });  
}

const removeTask = () =>{
    let removeTaskEl = document.querySelectorAll('.delete-task img')
    //console.log(removeTaskEl)

    removeTaskEl.forEach(element => {
        element.addEventListener('click',()=>{
            const taskRemoveId =  element.closest('.task-item').getAttribute('data-id')
            const findTask = taskArray.find(({id}) => id === taskRemoveId)
            const index = taskArray.findIndex(({id}) => id === taskRemoveId)

            if(findTask){
                taskArray.splice(index, 1);

                renderTask()
                storingTask()
            }
        })
    });
}

const editTask = () => {
    let editTaskEl = document.querySelectorAll('.edit-task img');
    const editContainer = document.querySelector('.edit-container'); // Select the external edit container once

    editTaskEl.forEach(element => {
        element.addEventListener('click', () => {

            const taskItem = element.closest('.task-item');
            const taskId = taskItem.getAttribute('data-id');

            // Clear any existing form in the edit container to prevent duplicates
            editContainer.innerHTML = ''; 

            // Create a new edit form and append it to the external edit container
            const editElements = editedTaskEl();
            editContainer.append(editElements);

            let editSubBtnEl = editElements.querySelector('.edited-button');
            let editCancelBtnEl = editElements.querySelector('.cancel-button');

            let editTaskvalue = editElements.querySelector('.editTask');
            let editDatevalue = editElements.querySelector('.editDate');

            let taskData = taskArray.find(task => task.id === taskId);

            if (taskId) {
                editTaskvalue.value = taskData.task;
                editDatevalue.value = taskData.date;
            }

            editSubBtnEl.addEventListener('click', () => {
                let editTaskRep = editTaskvalue.value.trim();
                let editDateRep = editDatevalue.value.trim();

                if (!editTaskRep || !editDateRep) {
                    alert("Both task and date must be filled");
                    return;
                }

                let taskIndex = taskArray.findIndex(task => task.id === taskId);
                if (taskIndex > -1) {
                    taskArray[taskIndex].task = editTaskRep;
                    taskArray[taskIndex].date = editDateRep;
                }

                renderTask();
                storingTask();

                // Clear the edit container after saving the task
                editContainer.innerHTML = '';
            });

            editCancelBtnEl.addEventListener('click', () => {
                // Clear the edit container on cancel
                editContainer.innerHTML = '';
            });
        });
    });
}

const editedTaskEl = () => {
    // Create a new container element for each edit form instance
    let editContainer = document.createElement('div');
    editContainer.classList.add('edit-task-container');

    // Set the inner HTML for the edit form
    editContainer.innerHTML = `
                <div class="userEdits">
                    <input class="editTask" placeholder="Edit Task">
                    <input type="date" class="editDate">
                </div>
                <div class="editbtns">
                    <button class="edited-button">Submit</button>
                    <button class="cancel-button">Cancel</button>
                </div>
    `;

    return editContainer; // Return the newly created form container
}

const storingTask = () =>{
   localStorage.setItem('tasks',JSON.stringify(taskArray))
}

function loadTask(){
    const savedTask = JSON.parse(localStorage.getItem('tasks'));
    if(savedTask){
        taskArray = savedTask;
        renderTask()
       
    }
}

document.addEventListener('DOMContentLoaded',() =>{
    loadTask()
})

renderTask()

//console.log("tasks in array",taskArray)
