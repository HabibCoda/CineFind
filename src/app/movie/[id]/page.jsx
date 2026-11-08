"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { formatMovie } from "@/lib/movies";
import {
  FiPlay,
  FiShare2,
  FiStar,
  FiClock,
  FiDownload,
} from "react-icons/fi";


export default function MovieDetails() {
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/movie-details?id=${movieId}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch movie details.");
        }

        setMovie(data.movie);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMovieDetails();

    return () => controller.abort();
  }, [movieId]);

  const poster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  const backdrop = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : poster;

  const year = movie?.release_date?.slice(0, 4) || "N/A";

  const rating = movie?.vote_average?.toFixed(1) || "N/A";

  const genres = movie?.genres?.map((genre) => genre.name).join(", ") || "N/A";

  const crew = movie?.credits?.crew || [];

  const director =
    crew.find((person) => person.job === "Director")?.name || "N/A";

  const writers = [
    ...new Set(
      crew
        .filter((person) =>
          ["Writer", "Screenplay", "Story"].includes(person.job)
        )
        .map((person) => person.name)
    ),
  ].join(", ") || "N/A";

  const cast = movie?.credits?.cast?.slice(0, 10) || [];
  const similarMovies = movie?.recommendations?.results
    ?.slice(0, 6)
    .map(formatMovie) || [];
  const trailer = movie?.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  ) || movie?.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );
  const handleShare = async () => {
    const shareData = {
      title: movie.title,
      text: `Check out ${movie.title} on CineFind!`,
      url: window.location.href,
    };

    try {
      // Native sharing
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      // Clipboard API
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Movie link copied to clipboard!");
        return;
      }

      // Manual copy fallback
      window.prompt("Copy this movie link:", shareData.url);

    } catch (error) {
      if (error.name === "AbortError") return;

      console.error("Sharing failed:", error);

      // Final fallback
      window.prompt("Copy this movie link:", shareData.url);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-gray-400">Loading movie details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
          <h1 className="text-3xl font-bold text-white">
            Movie Not Found
          </h1>

          <p className="mt-3 text-gray-400">
            {error || "Sorry, we couldn't find the movie you're looking for."}
          </p>

          <a
            href="/movies"
            className="mt-6 rounded-full bg-violet-400 px-6 py-3 font-semibold text-black transition hover:bg-violet-300"
          >
            Explore Movies
          </a>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Movie Hero */}
        <section className="relative overflow-hidden">
          {/* Backdrop */}
          <div className="absolute inset-0">
            <img
              src={backdrop}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-linear-to-r from-[#111015] via-[#111015]/80 to-[#111015]/30" />
            <div className="absolute inset-0 bg-linear-to-t from-[#111015] via-transparent to-[#111015]/40" />
          </div>

          {/* Content */}
          <div className="relative mx-auto max-w-470 px-5 py-16 lg:px-8 lg:py-24">
            <div className="grid items-center gap-10 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">
              {/* Poster */}
              <div className="mx-auto w-full max-w-65 overflow-hidden rounded-xl border border-white/10 shadow-2xl lg:max-w-75">
                <img
                  src={poster}
                  alt={movie.title}
                  className="aspect-2/3 w-full object-cover"
                />
              </div>

              {/* Movie Information */}
              <div className="max-w-3xl">
                {/* Label */}
                <span className="inline-block rounded-full bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-300">
                  Featured Film
                </span>
                {/* Title */}
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>

                {/* Metadata */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-300">
                  <span>{year}</span>
                  <span className="flex items-center gap-1.5">
                    <FiStar className="text-yellow-400 fill-yellow-400" />
                    {rating}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiClock />
                    {movie.runtime || "N/A"} min
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    {genres}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                  {movie.overview}
                </p>
                <div className="grid gap-4 mt-3 sm:grid-cols-2">
                  {/* Director */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                      Director
                    </span>
                    <p className="mt-1 text-sm font-medium text-white">
                      {director}
                    </p>
                  </div>

                  {/* Writers */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                      Writers
                    </span>
                    <p className="mt-1 text-sm font-medium text-white">
                      {writers}
                    </p>
                  </div>
                </div>
                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {trailer ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full text-sm bg-violet-400 px-6 py-3 font-semibold text-black transition hover:bg-violet-300"
                    >
                      <FiPlay />
                      Watch Trailer
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex cursor-not-allowed items-center gap-2 rounded-full text-sm bg-violet-400/40 px-6 py-3 font-semibold text-gray-400"
                    >
                      <FiPlay />
                      Trailer Unavailable
                    </button>
                  )}
                  <button disabled title="Coming Soon" className="flex cursor-not-allowed items-center gap-2 rounded-full text-sm border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10">
                    <FiDownload />
                    Download Movie
                    <span className="ml-1 rounded-full bg-violet-400/10 px-2 py-1 text-[10px] font-semibold text-violet-300">Coming Soon</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white"
                    aria-label="Share movie"
                  >
                    <FiShare2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Movie Credits */}
        {/* <section className="mx-auto max-w-470 mt-5 px-5 lg:px-8">
          
        </section> */}
        {/* Cast */}
        <section className="mx-auto max-w-470 px-5 py-12 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
              The Ensemble
            </span>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Cast
            </h2>
          </div>
          <div className="flex overflow-x-auto pb-4 gap-3 sm:gap-5 lg:gap-5">
            {cast.map((actor) => (
              <div key={actor.id} className="group h-full w-28 shrink-0 flex flex-col justify-center items-center text-center">
                <div className="overflow-hidden w-25 h-30 rounded-lg border border-white/5 bg-[#1b1920]">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/placeholder.png"
                    }
                    alt=""
                    className="aspect-auto object-center transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 w-full text-sm font-semibold text-white whitespace-normal wrap-break-word">
                  {actor.name}
                </h3>
                <p className="mt-1 max-w-full text-xs text-gray-500 whitespace-normal wrap-break-words leading-relaxed">
                  {actor.character || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Similar Movies */}
        <section className="mx-auto max-w-470 px-5 py-12 lg:px-8">
          {/* Section Heading */}
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
              Keep Exploring
            </span>

            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Similar Movies
            </h2>

            <p className="mt-2 text-sm text-gray-400 md:text-base">
              Discover more films you might enjoy.
            </p>
          </div>
          {/* Movie Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
            {similarMovies.map((similarMovie) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}