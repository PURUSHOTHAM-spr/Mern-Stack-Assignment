/*Assignment 3: Age Calculator (Intermediate)
-------------------------------------------
Input:
    let dob = "2000-05-15";
    Tasks:
        1. Calculate exact age in years

*/
let dob = new Date("2000-05-15");
let dateToday = new Date("2026-01-21");

let years = dateToday.getFullYear() - dob.getFullYear();
let months = dateToday.getMonth() - dob.getMonth();
let days = dateToday.getDate() - dob.getDate();
// Adjust for negative months and days
if (days < 0) {
  months--;
  days += 30;
}
if (months < 0) {
  years--;
  months += 12;
}
//printing the date in a formated way
let age = `${years}-${months}-${days}`;
console.log("Age is", age);