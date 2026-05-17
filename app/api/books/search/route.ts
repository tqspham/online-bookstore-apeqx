import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ books: [] });
    }

    const searchTerm = `%${query.toLowerCase()}%`;

    const { data: books, error } = await supabase
      .from("online_bookstore_apeqx_books")
      .select("*")
      .or(`title.ilike.${searchTerm},author.ilike.${searchTerm}`);

    if (error) {
      return NextResponse.json(
        { error: "Failed to search books" },
        { status: 500 }
      );
    }

    const formattedBooks = (books || []).map((book: any) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImageUrl: book.cover_image_url,
      description: book.description,
      genre: book.genre,
    }));

    return NextResponse.json({ books: formattedBooks });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}