"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import CatalogHero from "@/components/CatalogHero";
import SearchFilterBar from "@/components/SearchFilterBar";
import BookGrid from "@/components/BookGrid";
import BookList from "@/components/BookList";
import LayoutToggle from "@/components/LayoutToggle";
import CartIndicator from "@/components/CartIndicator";
import CartDrawer from "@/components/CartDrawer";
import { useCartStore } from "@/lib/cart";
import { cn } from "@/lib/utils";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  description: string;
  genre: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const { items, addItem, updateQuantity, removeItem, getTotalPrice } =
    useCartStore();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data.books);
        setGenres(data.genres);
        setFilteredBooks(data.books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    let results = books;

    if (searchQuery.trim()) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      results = results.filter((book) => book.genre === selectedGenre);
    }

    setFilteredBooks(results);
  }, [searchQuery, selectedGenre, books]);

  const handleAddToCart = (book: Book) => {
    addItem(book);
  };

  const featuredBook = books.length > 0 ? books[0] : null;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header with Cart Indicator */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-serif font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            Literary Treasures
          </h1>
          <CartIndicator
            itemCount={items.length}
            totalPrice={getTotalPrice()}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>
      </header>

      {/* Featured Section */}
      {featuredBook && (
        <CatalogHero
          featuredBook={featuredBook}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter Bar */}
        <SearchFilterBar
          onSearch={setSearchQuery}
          onFilterByGenre={setSelectedGenre}
          genres={genres}
        />

        {/* Layout Toggle */}
        <div className="flex justify-end mb-8">
          <LayoutToggle currentLayout={layout} onToggle={setLayout} />
        </div>

        {/* Catalog */}
        {layout === "grid" ? (
          <BookGrid
            books={filteredBooks}
            onAddToCart={handleAddToCart}
            isLoading={isLoading}
          />
        ) : (
          <BookList
            books={filteredBooks}
            onAddToCart={handleAddToCart}
            isLoading={isLoading}
          />
        )}
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