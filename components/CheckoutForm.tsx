"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

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

interface CheckoutFormProps {
  items: CartItem[];
  totalPrice: number;
  taxAmount: number;
  onSubmit: (data: {
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZip: string;
    paymentMethod: string;
  }) => void;
  isSubmitting: boolean;
  error: string | null;
}

export default function CheckoutForm({
  items,
  totalPrice,
  taxAmount,
  onSubmit,
  isSubmitting,
  error,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    paymentMethod: "credit-card",
  });

  const finalTotal = totalPrice + taxAmount;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
        {/* Error Alert */}
        {error && (
          <div
            className="flex gap-3 p-4 rounded border-2"
            style={{
              borderColor: "var(--color-danger)",
              backgroundColor: "rgba(168, 74, 61, 0.1)",
            }}
          >
            <AlertCircle
              size={20}
              style={{ color: "var(--color-danger)", flexShrink: 0 }}
            />
            <p style={{ color: "var(--color-danger)" }}>{error}</p>
          </div>
        )}

        {/* Shipping Section */}
        <fieldset className="space-y-4">
          <h2
            className="text-2xl font-serif font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Shipping Details
          </h2>

          <div>
            <label
              className="block text-sm font-sans font-semibold mb-2"
              htmlFor="shippingName"
              style={{ color: "var(--color-text)" }}
            >
              Full Name
            </label>
            <input
              id="shippingName"
              type="text"
              name="shippingName"
              value={formData.shippingName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded font-sans outline-none transition-all"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-sans font-semibold mb-2"
              htmlFor="shippingAddress"
              style={{ color: "var(--color-text)" }}
            >
              Street Address
            </label>
            <input
              id="shippingAddress"
              type="text"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded font-sans outline-none transition-all"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-sans font-semibold mb-2"
                htmlFor="shippingCity"
                style={{ color: "var(--color-text)" }}
              >
                City
              </label>
              <input
                id="shippingCity"
                type="text"
                name="shippingCity"
                value={formData.shippingCity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded font-sans outline-none transition-all"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-sans font-semibold mb-2"
                htmlFor="shippingState"
                style={{ color: "var(--color-text)" }}
              >
                State
              </label>
              <input
                id="shippingState"
                type="text"
                name="shippingState"
                value={formData.shippingState}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded font-sans outline-none transition-all"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-sans font-semibold mb-2"
              htmlFor="shippingZip"
              style={{ color: "var(--color-text)" }}
            >
              ZIP Code
            </label>
            <input
              id="shippingZip"
              type="text"
              name="shippingZip"
              value={formData.shippingZip}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded font-sans outline-none transition-all"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>
        </fieldset>

        {/* Payment Section */}
        <fieldset className="space-y-4">
          <h2
            className="text-2xl font-serif font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Payment Method
          </h2>

          <div>
            <label
              className="block text-sm font-sans font-semibold mb-2"
              htmlFor="paymentMethod"
              style={{ color: "var(--color-text)" }}
            >
              Select Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded font-sans outline-none transition-all"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 rounded font-sans font-semibold text-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-surface)",
          }}
        >
          {isSubmitting ? "Processing..." : "Complete Purchase"}
        </button>
      </form>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div
          className="sticky top-24 p-6 rounded-lg"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <h2
            className="text-2xl font-serif font-bold mb-6"
            style={{ color: "var(--color-primary)" }}
          >
            Order Summary
          </h2>

          {/* Items */}
          <div className="space-y-4 mb-6 pb-6 border-b" style={{ borderColor: "var(--color-border)" }}>
            {items.map((item) => (
              <div key={item.bookId} className="flex justify-between">
                <div>
                  <p
                    className="font-sans text-sm font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item.book.title}
                  </p>
                  <p
                    className="text-xs font-sans"
                    style={{ color: "var(--color-muted-text)" }}
                  >
                    Qty: {item.quantity}
                  </p>
                </div>
                <p
                  className="font-mono font-semibold"
                  style={{ color: "var(--color-accent)" }}
                >
                  ${((item.book.price * item.quantity) / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span
                className="font-sans text-sm"
                style={{ color: "var(--color-text)" }}
              >
                Subtotal
              </span>
              <span
                className="font-mono font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                ${(totalPrice / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className="font-sans text-sm"
                style={{ color: "var(--color-text)" }}
              >
                Tax (10%)
              </span>
              <span
                className="font-mono font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                ${(taxAmount / 100).toFixed(2)}
              </span>
            </div>
            <div
              className="flex justify-between pt-4 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span
                className="font-serif font-bold text-lg"
                style={{ color: "var(--color-primary)" }}
              >
                Total
              </span>
              <span
                className="font-mono font-bold text-lg"
                style={{ color: "var(--color-accent)" }}
              >
                ${(finalTotal / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}