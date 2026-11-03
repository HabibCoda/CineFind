"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/data/movies";
import { useParams } from "next/navigation";
import {
  FiPlay,
  FiShare2,
  FiStar,
  FiClock,
  FiDownload,
} from "react-icons/fi";

const cast = [
  {
    name: "Timothée Chalamet",
    role: "Paul Atreides",
    image: "https://image.tmdb.org/t/p/w500/BE2sdjpgsa2rNTFa66f7upkaOP.jpg",
  },
  {
    name: "Zendaya",
    role: "Chani",
    image: "https://image.tmdb.org/t/p/w500/7e2lL8G7K5qjK8G7K5qjK8G7K5q.jpg",
  },
  {
    name: "Rebecca Ferguson",
    role: "Lady Jessica",
    image: "https://image.tmdb.org/t/p/w500/lJloTOheuQSirSLXux6mQKkTt1.jpg",
  },
  {
    name: "Josh Brolin",
    role: "Gurney Halleck",
    image: "https://image.tmdb.org/t/p/w500/suU1oL6zM8X7G7w9K7X7K7X7K7.jpg",
  },
];

export default function MovieDetails() {
  const params = useParams();
  const movieId = Number(params.id);
  const movie = movies.find((item) => item.id === movieId)

  if (!movie) {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-3xl font-bold text-white">
          Movie Not Found
        </h1>

        <p className="mt-3 text-gray-400">
          Sorry, we couldn't find the movie you're looking for.
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
              src={movie.backdrop || movie.poster}
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
                  src={movie.poster}
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
                  <span>{movie.year}</span>
                  <span className="flex items-center gap-1.5">
                    <FiStar className="text-yellow-400 fill-yellow-400" />
                    {movie.rating}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiClock />
                    {movie.duration} min
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    {movie.genre}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                  {movie.description}
                </p>
                <div className="grid gap-4 mt-3 sm:grid-cols-2">
                  {/* Director */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                      Director
                    </span>
                    <p className="mt-1 text-sm font-medium text-white">
                      Denis Villeneuve
                    </p>
                  </div>

                  {/* Writers */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                      Writers
                    </span>
                    <p className="mt-1 text-sm font-medium text-white">
                      Jon Spaihts, Denis Villeneuve, Craig Mazin
                    </p>
                  </div>
                </div>
                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 rounded-full text-sm bg-violet-400 px-6 py-3 font-semibold text-black transition hover:bg-violet-300">
                    <FiPlay />
                    Watch Trailer
                  </button>
                  <button className="flex items-center gap-2 rounded-full text-sm border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10">
                    <FiDownload />
                    Download Movie
                  </button>
                  <button
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
          <div className="flex flex-wrap gap-3 sm:gap-5 lg:gap-5">
            {cast.map((actor) => (
              <div key={actor.name} className="group flex flex-col justify-center items-center">
                <div className="overflow-hidden w-15 h-15 rounded-full border border-white/5 bg-[#1b1920]">
                  <img
                    src={actor.image}
                    alt=""
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">
                  {actor.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {actor.role}
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
            {movies.filter((item) => item.id !== movie.id).slice(0, 6).map((similarMovie) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}