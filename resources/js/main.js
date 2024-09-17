import { userEl } from './userInputComponent.js'

let taskArray = [];
let completedTask = [];
let removedTasks = [];

userEl('Add Task')

const randomGenIDTest = function(){
  return Date.now() + Math.floor(Math.random() * 1e6)
}

const randomGenID = function() {
  return Math.floor(Math.random() + Date.now());
}

