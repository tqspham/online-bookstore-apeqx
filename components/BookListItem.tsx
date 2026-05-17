"use client";

import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  genre: string;
  description: string;
}

interface BookListItemProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  href: string;
}

export default function BookListItem({
  book,
  onAddToCart,
  href,
}: BookListItemProps) {
  return (
    <div
      className="flex gap-6 p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Thumbnail */}
      <Link href={href} className="flex-shrink-0">
        <img
          src={book.coverImageUrl}
          alt={book.title}
          className="w-24 h-32 object-cover rounded transition-transform duration-200 hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex-grow">
        <Link href={href}>
          <h3
            className="font-serif font-bold text-xl mb-1 hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            {book.title}
          </h3>
        </Link>
        <p
          className="font-sans text-sm mb-3"
          style={{ color: "var(--color-secondary)" }}
        >
          by {book.author}
        </p>
        <p className="text-sm font-sans mb-3" style={{ color: "var(--color-text)" }}>
          {book.description}
        </p>
        <p
          className="text-xs font-sans font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-muted-text)" }}
        >
          Genre: {book.genre}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end justify-between flex-shrink-0">
        <p
          className="font-mono font-bold text-xl"
          style={{ color: "var(--color-accent)" }}
        >
          ${(book.price / 100).toFixed(2)}
        </p>
        <button
          onClick={() => onAddToCart(book)}
          className="px-6 py-2 rounded font-sans font-semibold transition-all duration-200 hover:shadow-md"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-surface)",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}