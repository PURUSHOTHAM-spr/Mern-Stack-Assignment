/*MODULE 2: COURSE CATALOG ENGINE
  -> Get published courses
  -> Sort courses by price (high → low)
  -> Extract { title, price } only
  -> Calculate total value of published courses
  -> Add a new course immutably*/
// module2.js

const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

// Get published courses
export function getPublishedCourses() {
  return courses.filter(course => course.published);
}

// Sort courses by price (high → low)
export function sortCoursesByPriceDesc() {
  return [...courses].sort((a, b) => b.price - a.price);
}

// Extract { title, price } only
export function getCourseSummaries() {
  return courses.map(course => ({
    title: course.title,
    price: course.price
  }));
}

// Calculate total value of published courses
export function getTotalPublishedCourseValue() {
  return getPublishedCourses()
    .reduce((sum, course) => sum + course.price, 0);
}

// Add a new course immutably
export function addCourse(newCourse) {
  return [...courses, newCourse];
}
