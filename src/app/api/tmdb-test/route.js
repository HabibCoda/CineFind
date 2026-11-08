import { fetchFromTMDB } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await fetchFromTMDB("/trending/movie/week");

    return Response.json({
      success: true,
      totalMovies: data.results.length,
      movies: data.results.slice(0, 5).map((movie) => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average,
        poster: movie.poster_path,
      })),
    });
  } catch (error) {
    console.error("TMDB Test Error:", error);

    return Response.json(
      { success: false, message: "TMDB connection failed." },
      { status: 500 }
    );
  }
}