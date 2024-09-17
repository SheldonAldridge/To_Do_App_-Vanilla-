
export const userEl = function(input,date,button){

    let appcontainer = document.querySelector('.app-container');

    let userContainer = document.createElement('div');
    userContainer.classList.add('user-container');

    let userinputEl = document.createElement('input');
    userinputEl.setAttribute('type','text');

    let userdateEl = document.createElement('input');
    userdateEl.setAttribute('type', 'date');

    let taskBtn = document.createElement('button');
    taskBtn.textContent = button || 'Add Task'

    appcontainer.append(userContainer)
    userContainer.append(userinputEl,userdateEl,taskBtn)

    return userContainer
}

