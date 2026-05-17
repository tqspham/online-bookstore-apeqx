"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CartIndicator from "@/components/CartIndicator";
import BookDetail from "@/components/BookDetail";
import CartDrawer from "@/components/CartDrawer";
import { useCartStore } from "@/lib/cart";
import { ArrowLeft } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  description: string;
  genre: string;
}

export default function BookPage() {
  const params = useParams();
  const id = params.id as string;
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addItem, updateQuantity, removeItem, getTotalPrice } =
    useCartStore();

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/books`);
        const data = await response.json();
        const foundBook = data.books.find((b: Book) => b.id === id);
        if (foundBook) {
          setBook(foundBook);
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleAddToCart = (book: Book) => {
    addItem(book);
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <p style={{ color: "var(--color-muted-text)" }}>Loading...</p>
      </div>
    );
  }

  if (!book) {
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
            Book not found
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
            <span className="font-serif font-bold" style={{ color: "var(--color-primary)" }}>
              Literary Treasures
            </span>
          </Link>
          <CartIndicator
            itemCount={items.length}
            totalPrice={getTotalPrice()}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>
      </header>

      {/* Detail */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <BookDetail book={book} onAddToCart={handleAddToCart} />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}