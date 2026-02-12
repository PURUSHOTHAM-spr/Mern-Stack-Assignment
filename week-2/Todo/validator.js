/* 

i. validator.js - Input validation
                      // TODO: Export these validation functions
                      
                      // 1. Validate task title (not empty, min 3 chars)
                      function validateTitle(title) {
                        // Your code here
                      }
                      
                      // 2. Validate priority (must be: low, medium, high)
                      function validatePriority(priority) {
                        // Your code here
                      }
                      
                      // 3. Validate due date (must be future date)
                      function validateDueDate(date) {
                        // Your code here
                      }

*/
// 1. Validate task title (not empty, min 3 chars)
function validateTitle(title) {
    if (title === null || title === undefined) {
        return false;
    }

    if (typeof title !== "string") {
        return false;
    }

    if (title.trim().length < 3) {
        return false;
    }

    return true;
}

// Validate priority (must be: low, medium, high)
function validatePriority(priority) {
    const priorities = ["low", "medium", "high"];

    for (let i = 0; i < priorities.length; i++) {
        if (priorities[i] === priority) {
            return true;
        }
    }
    return false;
}

// Validate due date (must be future date)
function validateDueDate(date) {
    const currentDate = new Date();
    const dueDate = new Date(date);

    if (dueDate.toString() === "Invalid Date") {
        return false;
    }

    return dueDate > currentDate;
}

module.exports = {
    validateTitle,
    validatePriority,
    validateDueDate
};
