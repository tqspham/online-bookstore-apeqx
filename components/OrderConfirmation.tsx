"use client";

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

interface OrderConfirmationProps {
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

export default function OrderConfirmation({
  orderId,
  items,
  totalPrice,
  shippingAddress,
}: OrderConfirmationProps) {
  return (
    <div
      className="rounded-lg p-8 space-y-8"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "2px solid var(--color-border)",
      }}
    >
      {/* Order Number */}
      <div className="text-center pb-8 border-b" style={{ borderColor: "var(--color-border)" }}>
        <p
          className="text-sm font-sans font-semibold uppercase tracking-wide mb-2"
          style={{ color: "var(--color-muted-text)" }}
        >
          Order Number
        </p>
        <p
          className="text-2xl font-mono font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          {orderId}
        </p>
      </div>

      {/* Order Items */}
      <div>
        <h3
          className="text-lg font-serif font-bold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          Order Items
        </h3>
        <div className="space-y-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.bookId} className="flex justify-between">
                <div>
                  <p
                    className="font-sans font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item.book.title}
                  </p>
                  <p
                    className="text-sm font-sans"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    Qty: {item.quantity}
                  </p>
                </div>
                <p
                  className="font-mono font-bold"
                  style={{ color: "var(--color-accent)" }}
                >
                  ${((item.book.price * item.quantity) / 100).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p
              className="text-sm font-sans"
              style={{ color: "var(--color-muted-text)" }}
            >
              No items to display
            </p>
          )}
        </div>
      </div>

      {/* Total */}
      <div className="pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex justify-between">
          <p
            className="font-serif font-bold text-lg"
            style={{ color: "var(--color-primary)" }}
          >
            Total Amount
          </p>
          <p
            className="font-mono font-bold text-lg"
            style={{ color: "var(--color-accent)" }}
          >
            ${(totalPrice / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}