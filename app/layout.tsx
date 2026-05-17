import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Literary Treasures - Online Bookstore",
  description:
    "Discover and purchase a curated collection of books. Browse by genre, search by title or author, and enjoy a warm, literary shopping experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}