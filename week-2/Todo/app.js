/* 

iii. app.js - Main application
                  // TODO: Import task functions
                  // import { ... } from './task.js';
                  // Test your module system
                  // 1. Add some tasks
                  // 2. Display all tasks
                  // 3. Complete a task
                  // 4. Display all tasks again

*/

import { addTask, getAllTasks, completeTask } from "./task.js";

console.log(addTask("clean house", "low", "2026-02-02"));
console.log(addTask("Work on Research Paper", "medium", "2026-01-26"));
console.log(addTask("dentist appointment", "high", "2026-02-24"));

console.log(getAllTasks());

console.log(completeTask(1));

console.log(getAllTasks())