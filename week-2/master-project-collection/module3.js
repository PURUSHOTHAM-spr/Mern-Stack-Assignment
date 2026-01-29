/*MODULE 3: SHOPPING CART ENGINE 
  -> Merge cart with courses to get full course info
  -> Calculate total cart amount
  -> Increase quantity of a course (immutably)
  -> Remove a course from cart
  -> Check if all cart items are paid courses*/
// module3.js

const courses = [
  { id: 101, title: "JavaScript", price: 999 },
  { id: 103, title: "Node", price: 1299 }
];

const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 }
];

// Merge cart with courses to get full course info
export function getCartDetails() {
  return cart.map(item => {
    const course = courses.find(c => c.id === item.courseId);
    return {
      ...course,
      qty: item.qty,
      total: course.price * item.qty
    };
  });
}

// Calculate total cart amount
export function getCartTotal() {
  return getCartDetails()
    .reduce((sum, item) => sum + item.total, 0);
}

// Increase quantity of a course (immutably)
export function increaseCartQty(courseId) {
  return cart.map(item =>
    item.courseId === courseId
      ? { ...item, qty: item.qty + 1 }
      : item
  );
}

// Remove a course from cart
export function removeFromCart(courseId) {
  return cart.filter(item => item.courseId !== courseId);
}

// Check if all cart items are paid courses
export function areAllCartItemsPaid() {
  return getCartDetails().every(item => item.price > 0);
}
