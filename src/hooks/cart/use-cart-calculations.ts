import { useMemo } from "react";
import { CartItem } from "../../types/dishes";
import { calculateDiscountValue, calculateFinalValue, calculatePointsEarned, calculateTotalAmount } from "../../utils/cart";

export const useCartCalculations = (cartItems: CartItem[], pointsToUse: number) => {
  const totalAmount = useMemo(() => calculateTotalAmount(cartItems), [cartItems]);
  const discountValue = useMemo(() => calculateDiscountValue(pointsToUse), [pointsToUse]);
  const finalValue = useMemo(() => calculateFinalValue(totalAmount, discountValue), [totalAmount, discountValue]);
  const pointsEarned = useMemo(() => calculatePointsEarned(cartItems), [cartItems]);

  return {
    totalAmount: totalAmount.toFixed(2),
    discountValue,
    finalValue,
    pointsEarned,
  }
}
