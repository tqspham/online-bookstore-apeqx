"use client";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImageUrl: string;
  description: string;
  genre: string;
}

interface BookDetailProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}

export default function BookDetail({ book, onAddToCart }: BookDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Book Cover */}
      <div className="flex justify-center">
        <div
          className="relative overflow-hidden rounded-lg shadow-xl"
          style={{
            aspectRatio: "3/4",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Book Info */}
      <div className="space-y-6">
        <div>
          <h1
            className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            {book.title}
          </h1>
          <p
            className="text-xl font-sans mb-2"
            style={{ color: "var(--color-secondary)" }}
          >
            by {book.author}
          </p>
          <p
            className="text-sm font-sans font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-muted-text)" }}
          >
            Genre: {book.genre}
          </p>
        </div>

        <p
          className="text-lg leading-relaxed"
          style={{ color: "var(--color-text)" }}
        >
          {book.description}
        </p>

        <div className="pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <p
            className="text-3xl md:text-4xl font-mono font-bold mb-6"
            style={{ color: "var(--color-accent)" }}
          >
            ${(book.price / 100).toFixed(2)}
          </p>
          <button
            onClick={() => onAddToCart(book)}
            className="w-full px-8 py-4 rounded font-sans font-semibold text-lg transition-all duration-200 hover:shadow-lg"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-surface)",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}