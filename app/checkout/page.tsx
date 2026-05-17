"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CartIndicator from "@/components/CartIndicator";
import CheckoutForm from "@/components/CheckoutForm";
import { useCartStore } from "@/lib/cart";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = getTotalPrice();
  const taxAmount = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice + taxAmount;

  const handleSubmit = async (formData: {
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZip: string;
    paymentMethod: string;
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          totalPrice,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create order");
        setIsSubmitting(false);
        return;
      }

      clearCart();
      router.push(
        `/checkout/success?orderId=${data.orderId}&totalPrice=${data.totalPrice}&taxAmount=${data.taxAmount}`
      );
    } catch (err) {
      setError("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">
          <p
            className="text-lg font-serif mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Your cart is empty
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-surface)",
            }}
          >
            <ArrowLeft size={16} />
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={20} style={{ color: "var(--color-primary)" }} />
            <span
              className="font-serif font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              Literary Treasures
            </span>
          </Link>
          <CartIndicator
            itemCount={items.length}
            totalPrice={getTotalPrice()}
            onOpenCart={() => {}}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1
          className="text-4xl font-serif font-bold mb-12"
          style={{ color: "var(--color-primary)" }}
        >
          Checkout
        </h1>
        <CheckoutForm
          items={items}
          totalPrice={totalPrice}
          taxAmount={taxAmount}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </main>
    </div>
  );
}