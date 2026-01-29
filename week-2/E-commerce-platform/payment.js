import { reduceStock } from './product.js';
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { applyDiscount } from './discount.js';

// Validate payment method
export function validatePaymentMethod(method) {
  return ['card', 'upi', 'cod'].includes(method);
}

// Process order and payment
export function processPayment(method, couponCode = null) {
  if (!validatePaymentMethod(method))
    return { status: 'failed', message: 'Invalid payment method' };

  const items = getCartItems();
  if (items.length === 0)
    return { status: 'failed', message: 'Cart is empty' };

  const subtotal = getCartTotal();
  let discount = 0;
  let total = subtotal;

  if (couponCode) {
    const discountResult = applyDiscount(subtotal, couponCode, items);
    discount = discountResult.discount;
    total = discountResult.finalTotal;
  }

  items.forEach(item => reduceStock(item.id, item.quantity));
  clearCart();

  return {
    orderId: generateOrderId(),
    items,
    subtotal,
    discount,
    total,
    paymentMethod: method,
    status: 'success',
    message: 'Order placed successfully'
  };
}

// Generate unique order ID
function generateOrderId() {
  return 'ORD' + Date.now();
}
