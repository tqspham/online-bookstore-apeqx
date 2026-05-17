"use client";

import { Grid3x3, List } from "lucide-react";

interface LayoutToggleProps {
  currentLayout: "grid" | "list";
  onToggle: (layout: "grid" | "list") => void;
}

export default function LayoutToggle({
  currentLayout,
  onToggle,
}: LayoutToggleProps) {
  return (
    <div
      className="flex gap-2 p-2 rounded border-2"
      style={{ borderColor: "var(--color-secondary)" }}
    >
      <button
        onClick={() => onToggle("grid")}
        className={`p-2 rounded transition-all duration-200 ${
          currentLayout === "grid" ? "shadow-md" : ""
        }`}
        style={{
          backgroundColor:
            currentLayout === "grid"
              ? "var(--color-secondary)"
              : "transparent",
          color:
            currentLayout === "grid"
              ? "var(--color-surface)"
              : "var(--color-secondary)",
        }}
        title="Grid View"
      >
        <Grid3x3 size={20} />
      </button>
      <button
        onClick={() => onToggle("list")}
        className={`p-2 rounded transition-all duration-200 ${
          currentLayout === "list" ? "shadow-md" : ""
        }`}
        style={{
          backgroundColor:
            currentLayout === "list"
              ? "var(--color-secondary)"
              : "transparent",
          color:
            currentLayout === "list"
              ? "var(--color-surface)"
              : "var(--color-secondary)",
        }}
        title="List View"
      >
        <List size={20} />
      </button>
    </div>
  );
}