"use client";

import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
}

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  href: string;
}

export default function BookCard({ book, onAddToCart, href }: BookCardProps) {
  return (
    <Link href={href}>
      <div
        className="group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 h-full flex flex-col"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Cover Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Card Info */}
        <div
          className="p-4 flex flex-col flex-grow"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <h3
            className="font-serif font-bold text-lg line-clamp-2 mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            {book.title}
          </h3>
          <p
            className="font-sans text-sm mb-3 flex-grow"
            style={{ color: "var(--color-secondary)" }}
          >
            by {book.author}
          </p>
          <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "var(--color-border)" }}>
            <p
              className="font-mono font-bold text-lg"
              style={{ color: "var(--color-accent)" }}
            >
              ${(book.price / 100).toFixed(2)}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(book);
              }}
              className="px-3 py-2 rounded text-sm font-sans font-semibold transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-surface)",
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}