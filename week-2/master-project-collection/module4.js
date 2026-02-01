/*MODULE 4: ROLE & PERMISSION ENGINE
  -> Get all role names
  -> Check if student can delete
  -> Create a flat list of all unique permissions
  -> Add new role moderator immutably*/
// module4.js

const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};

// Get all role names
export function getRoleNames() {
  return Object.keys(roles);
}

// Check if student can delete
export function canStudentDelete() {
  return roles.student.includes("delete");
}

// Create a flat list of all unique permissions
export function getAllUniquePermissions() {
  return [...new Set(Object.values(roles).flat())];
}

// Add new role moderator immutably
export function addModeratorRole() {
  return {
    ...roles,
    moderator: ["view", "update"]
  };
}
