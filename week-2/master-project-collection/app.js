// app.js

import {
  getActiveUsers,
  getActiveUserNames,
  isAdminExist
} from "./module1.js";

import {
  getPublishedCourses,
  getTotalPublishedCourseValue
} from "./module2.js";

import {
  getCartDetails,
  getCartTotal
} from "./module3.js";

import {
  getRoleNames,
  getAllUniquePermissions
} from "./module4.js";

// MODULE 1
console.log("Active Users:", getActiveUsers());
console.log("Active User Names:", getActiveUserNames());
console.log("Admin Exists:", isAdminExist());

// MODULE 2
console.log("Published Courses:", getPublishedCourses());
console.log("Total Course Value:", getTotalPublishedCourseValue());

// MODULE 3
console.log("Cart Details:", getCartDetails());
console.log("Cart Total:", getCartTotal());

// MODULE 4
console.log("Roles:", getRoleNames());
console.log("Permissions:", getAllUniquePermissions());
