"use client"

import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { movies } from "@/data/movies";
import Footer from "@/components/Footer";
import React from "react";

export default function Home() {
  const featuredMovie = movies[0]; // Assuming the first movie is the featured one
  return (
    <>
      <Navbar />
      <Hero movie={featuredMovie} />
      <MovieRow title="Trending Now" movies={movies.slice(0, 12)} />
      <MovieRow title="Popular Movies" movies={[...movies].reverse()} />
      <section className="mx-auto max-w-470 px-5 py-10 lg:px-8">
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Browse by Genre</h2>
          <p className="mt-1 text-sm text-gray-500">Find your next movie by genre.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            "Action",
            "Adventure",
            "Animation",
            "Comedy",
            "Drama",
            "Horror",
            "Sci-Fi",
            "Thriller",
          ].map((genre) => (<button key={genre} className="rounded-full border cursor-pointer font-medium border-white/10 bg-white/3 px-5 py-2.5 text-md text-gray-300 transition hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-300">{genre}</button>))}
        </div>
      </section>
      <Footer />
    </>
  );
}
