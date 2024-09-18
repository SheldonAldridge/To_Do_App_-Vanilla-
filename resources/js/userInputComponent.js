
export const userEl = function(input,date,button){

    let appContainer = document.querySelector('.app-container');

    let userContainer = document.createElement('div');
    userContainer.classList.add('user-container');

    let userInputEl = document.createElement('input');
    userInputEl.setAttribute('type','text');

    let userDateEl = document.createElement('input');
    userDateEl.setAttribute('type', 'date');

    let taskBtn = document.createElement('button');
    taskBtn.textContent = button || 'Add Task'

    appContainer.append(userContainer)
    userContainer.append(userInputEl,userDateEl,taskBtn)

    return {userInputEl, userDateEl,taskBtn}
}

