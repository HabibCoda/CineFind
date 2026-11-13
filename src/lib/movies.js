import { fetchFromTMDB } from "@/lib/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.slice(0, 4) || "N/A",
    rating: movie.vote_average?.toFixed(1) || "N/A",
    genre:
      movie.genre_ids
        ?.map((id) => genreMap[id])
        .filter(Boolean)
        .join(", ") || "Movie",
    description: movie.overview || "No description available.",
    poster: movie.poster_path
      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
      : "/placeholder.svg",
    backdrop: movie.backdrop_path
      ? `${IMAGE_BASE_URL}w1280${movie.backdrop_path}`
      : "/placeholder.svg",
  };
}

export async function getTrendingMovies() {
  const data = await fetchFromTMDB("/trending/movie/week");
  return Array.isArray(data.results)? data.results.map(formatMovie): [];
}

export async function getPopularMovies() {
  const data = await fetchFromTMDB("/movie/popular");
  return Array.isArray(data.results)? data.results.map(formatMovie): [];
}