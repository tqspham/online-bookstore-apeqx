"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import OrderConfirmation from "@/components/OrderConfirmation";
import { CheckCircle } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const totalPrice = parseInt(searchParams.get("totalPrice") || "0");
  const taxAmount = parseInt(searchParams.get("taxAmount") || "0");

  if (!orderId) {
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
            Order information not found
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-surface)",
            }}
          >
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
        className="border-b"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1
            className="text-2xl font-serif font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Literary Treasures
          </h1>
        </div>
      </header>

      {/* Success Message */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <CheckCircle
            size={64}
            className="mx-auto mb-4"
            style={{ color: "var(--color-success)" }}
          />
          <h1
            className="text-4xl font-serif font-bold mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            Order Confirmed
          </h1>
          <p
            className="text-lg"
            style={{ color: "var(--color-muted-text)" }}
          >
            Thank you for your purchase!
          </p>
        </div>

        {/* Order Details */}
        <OrderConfirmation
          orderId={orderId}
          items={[]}
          totalPrice={totalPrice}
          shippingAddress={{
            name: "",
            address: "",
            city: "",
            state: "",
            zip: "",
          }}
        />

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-12">
          <Link
            href="/"
            className="px-8 py-3 rounded font-sans font-semibold"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-surface)",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <p style={{ color: "var(--color-muted-text)" }}>Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}