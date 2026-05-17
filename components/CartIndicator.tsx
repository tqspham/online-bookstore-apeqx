"use client";

import { ShoppingCart } from "lucide-react";

interface CartIndicatorProps {
  itemCount: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export default function CartIndicator({
  itemCount,
  totalPrice,
  onOpenCart,
}: CartIndicatorProps) {
  return (
    <button
      onClick={onOpenCart}
      className="relative flex items-center gap-2 px-4 py-2 rounded transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: "var(--color-secondary)",
        color: "var(--color-surface)",
      }}
    >
      <ShoppingCart size={20} />
      <div className="flex flex-col items-end">
        <span className="font-mono font-bold text-sm">
          {itemCount}
          {itemCount === 1 ? " item" : " items"}
        </span>
        <span className="font-mono text-xs">
          ${(totalPrice / 100).toFixed(2)}
        </span>
      </div>
      {itemCount > 0 && (
        <div
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-surface)",
          }}
        >
          {itemCount}
        </div>
      )}
    </button>
  );
}