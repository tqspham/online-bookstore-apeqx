import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const genre = searchParams.get("genre");

    let query = supabase
      .from("online_bookstore_apeqx_books")
      .select("*")
      .order("created_at", { ascending: true });

    if (genre) {
      query = query.eq("genre", genre);
    }

    const { data: books, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch books" },
        { status: 500 }
      );
    }

    // Get unique genres
    const { data: allBooks } = await supabase
      .from("online_bookstore_apeqx_books")
      .select("genre")
      .order("genre", { ascending: true });

    const genres = [
      ...new Set((allBooks || []).map((b: any) => b.genre).filter(Boolean)),
    ] as string[];

    const formattedBooks = (books || []).map((book: any) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImageUrl: book.cover_image_url,
      description: book.description,
      genre: book.genre,
    }));

    return NextResponse.json({
      books: formattedBooks,
      genres,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}