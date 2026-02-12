/*Assignment 2: Date Comparison & Validation (Beginner → Intermediate)
--------------------------------------------------------------------

 Given:
      let enrollmentDeadline = new Date("2026-01-20");

Tasks:
  1.Check if:
      * Today is before deadline → "Enrollment Open"
      * Today is after deadline → "Enrollment Closed"

  2. Validate user input date:
      * Input: "2026-02-30"
      * Detect whether the date is valid or invalid */

let enrollmentDeadline = new Date("2026-01-20");
let closeDate = new Date("2026-02-30");
let dateToday = new Date();

if (closeDate.toString() === "Invalid Date") {
    console.log("Invalid Date: 2026-02-30");
} else {
    console.log("Valid Date");
}

// Compare enrollment deadline with today
if (dateToday < enrollmentDeadline) {
    console.log("Enrollment Open");
} else {
    console.log("Enrollment Closed");
}