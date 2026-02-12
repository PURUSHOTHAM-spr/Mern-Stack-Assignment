import { getProductById, checkStock } from './product.js';

let cartItems = [];

// Add item to cart or update quantity
export function addToCart(productId, quantity) {
  const product = getProductById(productId);
  if (!product) return 'Product not found';

  if (!checkStock(productId, quantity)) return 'Insufficient stock';

  const item = cartItems.find(i => i.productId === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    cartItems.push({ productId, quantity });
  }

  return 'Item added to cart';
}

// Remove item from cart
export function removeFromCart(productId) {
  cartItems = cartItems.filter(i => i.productId !== productId);
  return 'Item removed';
}

// Update quantity after stock check
export function updateQuantity(productId, newQuantity) {
  if (!checkStock(productId, newQuantity)) return 'Insufficient stock';

  const item = cartItems.find(i => i.productId === productId);
  if (!item) return 'Item not in cart';

  item.quantity = newQuantity;
  return 'Quantity updated';
}

// Get cart items with product details
export function getCartItems() {
  return cartItems.map(item => {
    const product = getProductById(item.productId);
    return {
      ...product,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity
    };
  });
}

// Calculate cart total
export function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.totalPrice, 0);
}

// Clear cart
export function clearCart() {
  cartItems = [];
}
