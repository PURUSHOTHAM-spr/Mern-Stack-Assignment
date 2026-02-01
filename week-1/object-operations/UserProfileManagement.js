/*
Assignment 1: User Profile Manager
----------------------------------
Scenario : You are managing a logged-in user’s profile in a web application.

Test data:
const user = {
  id: 101,
  name: "Ravi",
  email: "ravi@gmail.com",
  role: "student",
  isActive: true
};

Tasks:
    1. Read and print the user’s name and email
    2. Add a new property lastLogin: "2026-01-01"
    3. Update role from "student" to "admin"
    4. Delete the isActive property
    5. Use Object.keys() to list all remaining fields*/

const user = {
  id: 101,
  name: "spr",
    email: "spr@gmail.com",
  role: "student",
  isActive: true
};      
// 1. Read and print the user’s name and email
console.log("Name:", user.name);
console.log("Email:", user.email);
// 2. Add a new property lastLogin: "2026-01-01"
user.lastLogin = "2026-01-01";
// 3. Update role from "student" to "admin"
user.role = "admin";
// 4. Delete the isActive property
delete user.isActive;
// 5. Use Object.keys() to list all remaining fields
console.log("Remaining Fields:", Object.keys(user));







