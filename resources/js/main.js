import { userEl } from './userInputComponent.js'

let taskArray = [];
let completedTask = [];
let removedTasks = [];

userEl('Add Task')

const randomGenID = function(){
  return Date.now() + Math.floor(Math.random() * 1e6)
}


