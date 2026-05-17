"use client";

import BookListItem from "./BookListItem";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  genre: string;
  description: string;
}

interface BookListProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
  isLoading: boolean;
}

export default function BookList({
  books,
  onAddToCart,
  isLoading,
}: BookListProps) {
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
    <div className="space-y-4">
      {books.map((book) => (
        <BookListItem
          key={book.id}
          book={book}
          onAddToCart={onAddToCart}
          href={`/books/${book.id}`}
        />
      ))}
    </div>
  );
}