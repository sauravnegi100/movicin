import { NextRequest, NextResponse } from "next/server";
import { searchMovies, isTmdbConfigured, mapTmdbMovieToCard } from "@/lib/providers/tmdb";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  if (!query) {
    return NextResponse.json({
      results: [],
      page: 1,
      total_pages: 0,
      total_results: 0,
    });
  }

  if (!isTmdbConfigured()) {
    return NextResponse.json({
      isConfigMissing: true,
      error:
        "TMDB API key is not configured. Please set TMDB_API_KEY in .env.local to search movies.",
      results: [],
      page: 1,
      total_pages: 0,
      total_results: 0,
    });
  }

  const response = await searchMovies(query, isNaN(page) ? 1 : page);

  if (response.error) {
    return NextResponse.json(
      { error: response.error, results: [] },
      { status: 500 }
    );
  }

  const data = response.data;
  const cards = (data?.results || []).map(mapTmdbMovieToCard);

  return NextResponse.json(
    {
      results: cards,
      page: data?.page || 1,
      total_pages: data?.total_pages || 0,
      total_results: data?.total_results || 0,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    }
  );
}
