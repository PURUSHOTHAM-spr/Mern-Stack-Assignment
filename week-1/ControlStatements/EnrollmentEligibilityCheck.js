/*HANDS-ON 3: Enrollment Eligibility Checker
------------------------------------------
Initial data:
    let hasPaid = true;
    let hasCompletedBasics = false;

Tasks:
   1. If both conditions are true → "Enroll Now"
   2. Otherwise → "Complete Requirements"
   3. Use ternary operator
   4. Store result in enrollMessage
   5. Print message
   */
let hasPaid = true;
    let hasCompletedBasics = false;

//  1. If both conditions are true → "Enroll Now"
//  2. Otherwise → "Complete Requirements"
//  3. Use ternary operator
let enrollMessage = (hasPaid && hasCompletedBasics) ? "Enroll Now" : "Complete Requirements";
// 5. Print message
console.log(enrollMessage);