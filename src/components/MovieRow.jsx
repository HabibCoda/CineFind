"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {
    const [page, setPage] = useState(0);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    const [row1Page, setRow1Page] = useState(0);
    const [row2Page, setRow2Page] = useState(0);

    const cardsPerPage = 6;
    const homeMovies = movies.slice(0, 12);
    const totalPages = Math.ceil(homeMovies.length / cardsPerPage);

    const pages = [];

    for (let i = 0; i < homeMovies.length; i += cardsPerPage) {
        pages.push(homeMovies.slice(i, i + cardsPerPage));
    }

    const nextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const previousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <section className="mx-auto max-w-470 px-5 py-10 lg:px-8">

            {/* Heading */}
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-gray-500">
                        Discover something worth watching.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/movies"
                        className="lg:text-md md:text-sm text-xs text-violet-400 transition hover:text-violet-300 sm:block"
                    >
                        View all →
                    </Link>
                </div>
            </div>

            {/* Desktop */}
            <div className="relative hidden lg:block">
                {/* Arrow buttons */}
                <button
                    onClick={previousPage}
                    disabled={page === 0}
                    className="absolute left-2 top-45 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/90 text-black transition hover:bg-white/10 hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Previous movies"
                >
                    <FiChevronLeft size={20} />
                </button>
                {/* Desktop Carousel */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-2000 ease-in-out"
                        style={{
                            transform: `translateX(-${page * 100}%)`,
                        }}
                    >
                        {pages.map((moviePage, pageIndex) => (
                            <div
                                key={pageIndex}
                                className="grid min-w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
                            >
                                {moviePage.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Next Button */}
                <button
                    onClick={nextPage}
                    disabled={page === totalPages - 1}
                    className="absolute right-2 top-45 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/90 text-black transition hover:bg-white/10 hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Next movies"
                >
                    <FiChevronRight size={20} />
                </button>
                {/* Page indicator */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center gap-2">
                        {pages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index)}
                                aria-label={`Go to page ${index + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${page === index
                                    ? "w-6 bg-violet-400"
                                    : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/*  Mobile & Tablet */}
            <div className="space-y-6">
                {/* Row 1 */}
                <div ref={row1Ref} onScroll={() => { if (!row1Ref.current) return; const page = Math.round(row1Ref.current.scrollLeft / row1Ref.current.clientWidth); setRow1Page(page);}} className="movie-scrollbar overflow-x-auto">
                    <div className="flex gap-4">
                        {movies.slice(0, 6).map((movie) => (
                            <div
                                key={movie.id}
                                className="min-w-[47%] md:min-w-[32%] lg:hidden"
                            >
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Page indicator */}
                <div className="mb-10 hidden md:flex justify-center gap-2 lg:hidden">
                    {[0, 1].map((index) => (
                        <span
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${row1Page === index
                                ? "w-6 bg-violet-400"
                                : "w-2 bg-white/20"
                                }`}
                        />
                    ))}
                </div>
                <div className="mb-10 flex md:hidden justify-center gap-2 lg:hidden">
                    {[0, 1, 2].map((index) => (
                        <span
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${row1Page === index
                                ? "w-6 bg-violet-400"
                                : "w-2 bg-white/20"
                                }`}
                        />
                    ))}
                </div>

                {/* Row 2 */}
                <div ref={row2Ref} onScroll={() => { if (!row2Ref.current) return; const page = Math.round(row2Ref.current.scrollLeft / row2Ref.current.clientWidth); setRow2Page(page);}} className="movie-scrollbar overflow-x-auto">
                    <div className="flex gap-4">
                        {movies.slice(6, 12).map((movie) => (
                            <div
                                key={movie.id}
                                className="min-w-[47%] md:min-w-[32%] lg:hidden"
                            >
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-10 hidden md:flex justify-center gap-2 lg:hidden">
                    {[0, 1].map((index) => (
                        <span
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${row2Page === index
                                ? "w-6 bg-violet-400"
                                : "w-2 bg-white/20"
                                }`}
                        />
                    ))}
                </div>
                <div className="mb-10 flex md:hidden justify-center gap-2 lg:hidden">
                    {[0, 1, 2].map((index) => (
                        <span
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${row2Page === index
                                ? "w-6 bg-violet-400"
                                : "w-2 bg-white/20"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}