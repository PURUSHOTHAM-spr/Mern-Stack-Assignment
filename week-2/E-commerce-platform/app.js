import { getAllProducts, searchProducts } from './product.js';
import { addToCart, getCartItems, getCartTotal, updateQuantity, removeFromCart } from './cart.js';
import { processPayment } from './payment.js';

console.log('=== E-Commerce Store ===');

// Browse products
console.log(getAllProducts());

// Search product
console.log('------SEARCH RESULTS------');
console.log(searchProducts('phone'));

// Cart operations
console.log('------CART OPERATIONS------');
console.log(addToCart(1, 2));
console.log(addToCart(3, 3));
console.log(addToCart(1, 1));

console.log(getCartItems());
console.log('Total:', getCartTotal());

console.log(updateQuantity(1, 2));
console.log(removeFromCart(3));

console.log(getCartItems());
console.log('Total:', getCartTotal());

// Checkout
console.log(processPayment('upi', 'WELCOME10'));
