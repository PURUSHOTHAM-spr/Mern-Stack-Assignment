
/* 

 task.js - Task operations
                    // TODO: Import validator functions
                    // import { ... } from './validator.js';
                    
                    const tasks = [];
                    
                    // 1. Add new task
                    function addTask(title, priority, dueDate) {
                      // Validate using imported functions
                      // If valid, add to tasks array
                      // Return success/error message
                    }
                    
                    // 2. Get all tasks
                    function getAllTasks() {
                      // Return all tasks
                    }
                    
                    // 3. Mark task as complete
                    function completeTask(taskId) {
                      // Find task and mark as complete
                    }


*/


// Import validation functions
import {
  validateTitle, validatePriority,validateDueDate
} from "./validator.js";

// Task storage
const tasks = [];

// 1. Add new task
function addTask(title, priority, dueDate) {

  if (!validateTitle(title)) {
    return "Invalid Title";
  }

  if (!validatePriority(priority)) {
    return "Invalid Priority";
  }

  if (!validateDueDate(dueDate)) {
    return "Invalid Due Date";
  }

  const taskId = tasks.length + 1;

  const task = {
    id: taskId,
    title: title,
    priority: priority,
    dueDate: dueDate,
    completed: false
  };

  tasks.push(task);
  return "Task added successfully";
}

// 2. Get all tasks
function getAllTasks() {
  return tasks;
}

// 3. Complete task (YOUR REQUIRED CODE)
function completeTask(taskId) {
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    task.completed = true;
    return "Task marked as completed";
  }

  return "Task not found";
}

// Export functions
export { addTask,getAllTasks,completeTask
};
w