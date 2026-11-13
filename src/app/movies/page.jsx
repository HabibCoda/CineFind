"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import React, { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg'

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [collectionFilters, setCollectionFilters] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const genre = params.get("genre");
    const query = params.get("query");

    if (query) {
      setSearchQuery(query);
      setCurrentPage(1);
    }

    if (genre) {
      setSelectedGenre(genre);
      setCurrentPage(1);
    }
    const allowedFilters = [
      "with_genres",
      "sort_by",
      "vote_count.gte",
      "vote_count.lte",
      "primary_release_date.gte",
    ];

    const filters = {};

    allowedFilters.forEach((filter) => {
      const value = params.get(filter);

      if (value) {
        filters[filter] = value;
      }
    });

    setCollectionFilters(filters);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const query = searchQuery.trim();

        const params = new URLSearchParams({
          page: currentPage,
        });

        if (query) {
          params.set("query", query);
        } else if (selectedGenre) {
          params.set("genre", selectedGenre);
        } else {
          Object.entries(collectionFilters).forEach(([key, value]) => {
            params.set(key, value);
          });
        }

        const response = await fetch(`/api/movies?${params}`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch movies.");
        }

        setMovies(data.movies);
        setTotalPages(data.totalPages);
        setTotalResults(data.totalResults);
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

    const timer = setTimeout(fetchMovies, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [currentPage, searchQuery, selectedGenre, collectionFilters]);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage, '...', totalPages];
  }
  const genres = [
    { name: "All", id: "" },
    { name: "Action", id: "28" },
    { name: "Adventure", id: "12" },
    { name: "Animation", id: "16" },
    { name: "Comedy", id: "35" },
    { name: "Crime", id: "80" },
    { name: "Documentary", id: "99" },
    { name: "Drama", id: "18" },
    { name: "Horror", id: "27" },
    { name: "Mystery", id: "9648" },
    { name: "Romance", id: "10749" },
    { name: "Sci-Fi", id: "878" },
    { name: "Thriller", id: "53" },
  ];

  return (
    <>
      <Navbar />
      <main className='mx-auto max-w-470 px-5 py-12 lg:px-8'>
        {/* Page Header */}
        <section className='text-center'>
          <span className='inline-block rounded-full bg-violet-400/10 px-3 py-1 uppercase text-xs font-semibold text-violet-300'> Cinefind Curated Index </span>
          <h1 className='mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-4xl'>Explore Movies</h1>
          <p className='mx-auto mt-3 max-w-2xl text-base text-gray-400 md:text-lg lg:text-md'>Discover movies worth watching, handpicked across genres and cinematic eras.</p>
          <div className='mx-auto mt-8 flex max-w-2xl items-center rounded-full border border-white/10 bg-[#1b1920] px-5 py-3.5'>
            <FiSearch aria-hidden="true" className='mr-3 shrink-0 text-gray-400' size={15} />
            <input type="text" aria-label='Search movies by title' value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setSelectedGenre(""); setCurrentPage(1); }} placeholder='Search by title...' className='w-full bg-transparent text-lg text-white outline-none placeholder:text-gray-400 md:text-base' />
          </div>
        </section>
        <section className='mt-12'>
          <div className="flex flex-wrap justify-center gap-3">
            {genres.map((genre) => (
              <button
                key={genre.id || "all"}
                onClick={() => {
                  setSelectedGenre(genre.id);
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                aria-pressed={selectedGenre === genre.id}
                className={`rounded-full border px-5 py-2.5 text-md cursor-pointer font-medium transition ${selectedGenre === genre.id
                  ? "border-violet-400/40 bg-violet-400/10 text-violet-300"
                  : "border-white/10 bg-white/3 text-gray-400 hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-300"
                  }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </section>
        <section className='mt-14'>
          {/* Grid Heading */}
          <div className='mb-6 flex items-end justify-between'>
            <div>
              <h2 className='text-2xl font-semibold text-white md:text-3xl'>All Movies</h2>
              <p className='mt-1 text-sm text-gray-400'>{totalResults} movies to explore</p>
            </div>
          </div>
          {/* Movie Grid */}
          {loading ? (
            <p className="col-span-full py-12 text-center text-gray-400">
              Loading movies...
            </p>
          ) : error ? (
            <p className="col-span-full py-12 text-center text-red-400">
              {error}
            </p>
          ) : movies.length === 0 ? (
            <p className="col-span-full py-12 text-center text-gray-400">
              No movies found.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className='mt-12 md:flex lg:flex items-center justify-between border-t border-white/10 pt-8'>

              {/* Page indicator */}
              <div className='flex mb-5 items-center gap-2 text-xs text-gray-400'>
                <span className='h-2 w-2 rounded-full bg-violet-400'></span>

                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              {/* Pagination navigation */}
              <div className='flex items-center gap-4'>

                {/* Previous */}
                <button
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(page - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className='text-gray-400 transition hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-30'
                  aria-label="Previous page"
                >
                  <CgChevronDoubleLeft aria-hidden="true" size={20} />
                </button>

                {/* Compact page numbers */}
                {getPageNumbers().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className='text-gray-400'
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-medium transition ${currentPage === page
                        ? 'bg-violet-400 text-black'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className='text-gray-400 transition hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-30'
                  aria-label="Next page"
                >
                  <CgChevronDoubleRight aria-hidden="true" size={20} />
                </button>

              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}