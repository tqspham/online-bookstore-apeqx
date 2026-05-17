"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchFilterBarProps {
  onSearch: (query: string) => void;
  onFilterByGenre: (genre: string | null) => void;
  genres: string[];
}

export default function SearchFilterBar({
  onSearch,
  onFilterByGenre,
  genres,
}: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleGenreClick = (genre: string) => {
    const newGenre = selectedGenre === genre ? null : genre;
    setSelectedGenre(newGenre);
    onFilterByGenre(newGenre);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="mb-12 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded border-2"
          style={{ borderColor: "var(--color-secondary)" }}
        >
          <Search size={20} style={{ color: "var(--color-secondary)" }} />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1 bg-transparent font-sans outline-none"
            style={{ color: "var(--color-text)" }}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="p-1 hover:opacity-70 transition-opacity"
            >
              <X size={16} style={{ color: "var(--color-muted-text)" }} />
            </button>
          )}
        </div>
      </div>

      {/* Genre Filter Pills */}
      {genres.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <span
            className="text-sm font-sans font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-muted-text)" }}
          >
            Filter by genre:
          </span>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className="px-4 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 border-2"
              style={{
                borderColor: "var(--color-secondary)",
                backgroundColor:
                  selectedGenre === genre
                    ? "var(--color-secondary)"
                    : "transparent",
                color:
                  selectedGenre === genre
                    ? "var(--color-surface)"
                    : "var(--color-secondary)",
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}