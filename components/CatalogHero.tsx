"use client";

import Image from "next/image";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  description: string;
  genre: string;
}

interface CatalogHeroProps {
  featuredBook: Book;
  onAddToCart: (book: Book) => void;
}

export default function CatalogHero({
  featuredBook,
  onAddToCart,
}: CatalogHeroProps) {
  return (
    <section
      className="border-b py-12"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Featured Book Image */}
          <div className="relative group">
            <div
              className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl"
              style={{
                aspectRatio: "3/4",
              }}
            >
              <img
                src={featuredBook.coverImageUrl}
                alt={featuredBook.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Featured Book Info */}
          <div className="space-y-6">
            <div>
              <p
                className="text-sm font-sans font-semibold uppercase tracking-wide mb-2"
                style={{ color: "var(--color-secondary)" }}
              >
                Featured Collection
              </p>
              <h2
                className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                {featuredBook.title}
              </h2>
              <p
                className="text-xl font-sans"
                style={{ color: "var(--color-secondary)" }}
              >
                by {featuredBook.author}
              </p>
            </div>

            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              {featuredBook.description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
              <div>
                <p
                  className="text-sm text-sans"
                  style={{ color: "var(--color-muted-text)" }}
                >
                  Genre: {featuredBook.genre}
                </p>
                <p
                  className="text-3xl font-mono font-bold mt-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  ${(featuredBook.price / 100).toFixed(2)}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => onAddToCart(featuredBook)}
                  className="px-8 py-3 rounded font-sans font-semibold transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-surface)",
                  }}
                >
                  Add to Cart
                </button>
                <Link
                  href={`/books/${featuredBook.id}`}
                  className="px-8 py-3 rounded font-sans font-semibold border-2 transition-all duration-200 hover:shadow-lg"
                  style={{
                    borderColor: "var(--color-secondary)",
                    color: "var(--color-secondary)",
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}