const coupons = {
  WELCOME10: { type: 'percentage', value: 10, minAmount: 1000 },
  FLAT500: { type: 'flat', value: 500, minAmount: 5000 },
  ELECTRONICS20: { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
};

// Validate coupon rules
export function validateCoupon(code, total, items) {
  const coupon = coupons[code];
  if (!coupon) return { valid: false, message: 'Invalid coupon' };

  if (total < coupon.minAmount)
    return { valid: false, message: 'Minimum amount not met' };

  if (coupon.category) {
    const validCategory = items.some(i => i.category === coupon.category);
    if (!validCategory)
      return { valid: false, message: 'Coupon not applicable' };
  }

  return { valid: true, message: 'Coupon applied' };
}

// Calculate discount amount
export function calculateDiscount(code, total) {
  const coupon = coupons[code];
  return coupon.type === 'percentage'
    ? (total * coupon.value) / 100
    : coupon.value;
}

// Apply discount and return final total
export function applyDiscount(total, code, items) {
  const result = validateCoupon(code, total, items);
  if (!result.valid) {
    return { originalTotal: total, discount: 0, finalTotal: total, message: result.message };
  }

  const discount = calculateDiscount(code, total);
  return {
    originalTotal: total,
    discount,
    finalTotal: total - discount,
    message: 'Discount applied'
  };
}
