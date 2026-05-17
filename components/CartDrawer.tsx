"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Trash2 } from "lucide-react";

interface CartItem {
  bookId: string;
  quantity: number;
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    coverImageUrl: string;
  };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  totalPrice: number;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
}: CartDrawerProps) {
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h2
            className="text-xl font-serif font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-1 transition-opacity hover:opacity-70"
          >
            <X size={24} style={{ color: "var(--color-text)" }} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p
              className="text-center py-8 font-sans"
              style={{ color: "var(--color-muted-text)" }}
            >
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.bookId}
                  className="flex gap-4 pb-4 border-b"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.book.coverImageUrl}
                    alt={item.book.title}
                    className="w-16 h-24 object-cover rounded"
                  />

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-serif font-bold text-sm mb-1"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {item.book.title}
                      </h3>
                      <p
                        className="text-xs font-sans"
                        style={{ color: "var(--color-secondary)" }}
                      >
                        by {item.book.author}
                      </p>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.bookId,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center rounded border font-sans font-bold transition-colors"
                          style={{
                            borderColor: "var(--color-border)",
                            color: "var(--color-text)",
                          }}
                        >
                          −
                        </button>
                        <span
                          className="w-6 text-center font-mono font-bold"
                          style={{ color: "var(--color-text)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.bookId, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center rounded border font-sans font-bold transition-colors"
                          style={{
                            borderColor: "var(--color-border)",
                            color: "var(--color-text)",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <p
                        className="font-mono font-bold"
                        style={{ color: "var(--color-accent)" }}
                      >
                        ${((item.book.price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.bookId)}
                    className="p-1 transition-opacity hover:opacity-70"
                  >
                    <Trash2
                      size={18}
                      style={{ color: "var(--color-danger)" }}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="border-t px-6 py-4 space-y-4"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-sans font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                Total:
              </span>
              <p
                className="font-mono font-bold text-lg"
                style={{ color: "var(--color-accent)" }}
              >
                ${(totalPrice / 100).toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full px-6 py-3 rounded font-sans font-semibold transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-surface)",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}