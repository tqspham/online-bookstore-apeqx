"use client";

import BookCard from "./BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  genre: string;
}

interface BookGridProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
  isLoading: boolean;
}

export default function BookGrid({
  books,
  onAddToCart,
  isLoading,
}: BookGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <p
          className="text-lg font-sans"
          style={{ color: "var(--color-muted-text)" }}
        >
          Loading books...
        </p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex justify-center items-center py-24">
        <p
          className="text-lg font-sans"
          style={{ color: "var(--color-muted-text)" }}
        >
          No books found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAddToCart={onAddToCart}
          href={`/books/${book.id}`}
        />
      ))}
    </div>
  );
}