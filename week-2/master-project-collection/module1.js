/* MODULE-1 :USER PROCESSING ENGINE
  -> Get only active users
  -> Extract names of active users
  -> Check if any admin exists
  -> Find user by id
  -> Deactivate a user immutably */
// module1.js

const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: true },
  { id: 3, name: "Suman", role: "student", active: false }
];

// Get only active users
export function getActiveUsers() {
  return users.filter(user => user.active);
}

// Extract names of active users
export function getActiveUserNames() {
  return getActiveUsers().map(user => user.name);
}

// Check if any admin exists
export function isAdminExist() {
  return users.some(user => user.role === "admin");
}

// Find user by id
export function findUserById(id) {
  return users.find(user => user.id === id);
}

// Deactivate a user immutably
export function deactivateUser(id) {
  return users.map(user =>
    user.id === id ? { ...user, active: false } : user
  );
}
