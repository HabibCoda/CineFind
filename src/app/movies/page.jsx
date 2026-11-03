"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { movies } from '@/data/movies'
import MovieCard from '@/components/MovieCard'
import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg'

export default function Movies() {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage)
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
            <FiSearch className='mr-3 shrink-0 text-gray-400' size={15} />
            <input type="text" name="" id="" placeholder='Search by title, director, or keyword...' className='w-full bg-transparent text-lg text-white outline-none placeholder:text-gray-500 md:text-base' />
          </div>
        </section>
        <section className='mt-12'>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "All",
              "Action",
              "Adventure",
              "Animation",
              "Comedy",
              "Drama",
              "Horror",
              "Sci-Fi",
              "Thriller",
            ].map((genre) => (<button key={genre} className={`rounded-full border px-5 py-2.5 text-md cursor-pointer font-medium transition ${genre === "All" ? "border-violet-400/40 bg-violet-400/10 text-violet-300" : "border-white/10 bg-white/3 text-gray-400 hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-300"}`}>{genre}</button>))}
          </div>
        </section>
        <section className='mt-14'>
          {/* Grid Heading */}
          <div className='mb-6 flex items-end justify-between'>
            <div>
              <h2 className='text-2xl font-semibold text-white md:text-3xl'>All Movies</h2>
              <p className='mt-1 text-sm text-gray-500'>{movies.length} movies to explore</p>
            </div>
          </div>
          {/* Movie Grid */}
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5 xl:grid-cols-6'>{currentMovies.map((movie) => (<MovieCard key={movie.id} movie={movie} />))}</div>
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
                  className='text-gray-500 transition hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-30'
                  aria-label="Previous page"
                >
                  <CgChevronDoubleLeft size={20} />
                </button>

                {/* Compact page numbers */}
                {getPageNumbers().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className='text-gray-500'
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
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
                  className='text-gray-500 transition hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-30'
                  aria-label="Next page"
                >
                  <CgChevronDoubleRight size={20} />
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
