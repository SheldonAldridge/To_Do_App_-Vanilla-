import { userEl } from "./userInputComponent.js";

export const createTask = function () {

  const { userInputEl, userDateEl, taskBtn } = userEl();

  //Generates Random ID
  const randomGenID = function () {
    return Date.now() + Math.floor(Math.random() * 1e6);
  };

  taskBtn.addEventListener("click", () => {
    if (!userInputEl.value || !userDateEl.value) {
      alert("Please insert task and date");
    } else if (!userInputEl.value) {
      alert("Please insert task");
    } else if (!userDateEl.value) {
      alert("Please insert date");
    } else {
      //create object for the task
      let taskObj = {
        id: randomGenID(),
        task: userInputEl.value,
        dueDate: userDateEl.value,
      };
      console.log('Task Created:', taskObj)
    }

  });

  
};
