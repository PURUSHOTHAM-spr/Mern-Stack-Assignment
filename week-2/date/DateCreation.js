/*Assignment 1: Date Creation & Extraction (Beginner)
---------------------------------------------------
Tasks:
       1. Create a Date object for current date & time.
       2. Extract and display:
                    * Year
                    * Month (human readable)
                    * Date
                    * Day of week
                    * Hours, minutes, seconds

      3. Display the date in this format:
                    DD-MM-YYYY HH:mm:ss*/

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1; //generally months are starting from 0
let date = currentDate.getDate();
let dayOfWeek = currentDate.getDay();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
console.log("Year:", year);
console.log("Month:", month);
console.log("Date:", date);
console.log("Day of Week:", dayOfWeek);
console.log("Hours:", hours);
console.log("Minutes:", minutes);
console.log("Seconds:", seconds);
let formattedDate = `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
console.log("Formatted Date:", formattedDate);

