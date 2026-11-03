"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { movies } from '@/data/movies'
import React from 'react'
import { SiXiaomi } from 'react-icons/si'

export default function About() {
    return (
        <div>
            <Navbar />
            <main className="mx-auto max-w-470 px-5 py-16 lg:px-8 lg:py-24">
                {/* Manifesto */}
                <section className="mx-auto max-w-4xl text-center">
                    <span className="inline-block rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                        The CineFind Manifesto
                    </span>
                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
                        Cinema is more than
                        <span className="block text-violet-300">
                            entertainment.
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                        We believe every film has a story worth discovering. CineFind
                        exists to help curious minds explore cinema beyond the
                        mainstream, uncover hidden gems, and find films that stay with
                        them long after the credits roll.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <a
                            href="/movies"
                            className="rounded-md bg-violet-400 px-7 py-3 font-semibold text-black transition hover:bg-violet-300"
                        >
                            Explore Movies
                        </a>
                        <a
                            href="/genres"
                            className="rounded-md border border-white/10 bg-white/5 px-7 py-3 font-medium text-white transition hover:bg-white/10"
                        >
                            Browse by Genre
                        </a>
                    </div>
                    {/* Decorative divider */}
                    <div className="mx-auto mt-16 h-px max-w-xs bg-linear-to-r from-transparent via-violet-400/50 to-transparent" />
                </section>

                {/* Cinema & Curation */}
                <section className="mt-20 grid items-center gap-10 md:grid-cols-2 lg:mt-28 lg:gap-16">
                    {/* Cinematic Image */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85"
                            alt="Cinematic movie theater with rows of seats"
                            className="h-80 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-5 left-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                                Our Philosophy
                            </p>
                            <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                                Every film deserves to be discovered.
                            </p>
                        </div>
                    </div>
                    {/* Curation Story */}
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                            Beyond the Algorithm
                        </span>
                        <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            Curated for the
                            <span className="text-violet-300"> curious.</span>
                        </h2>
                        <p className="mt-6 leading-7 text-gray-400">
                            Finding your next favourite film shouldn't feel overwhelming.
                            CineFind brings together cinema from different genres, eras, and
                            cultures to make discovery easier and more rewarding.
                        </p>
                        <p className="mt-4 leading-7 text-gray-400">
                            From celebrated masterpieces to overlooked independent films,
                            our goal is to help you explore beyond familiar titles and discover
                            stories you might otherwise miss.
                        </p>
                        <div className="mt-8 border-l-2 border-violet-400 pl-5">
                            <p className="text-lg italic leading-7 text-gray-300">
                                "The best film to watch next is often the one you haven't heard of yet."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Principles */}
                <section className="mt-20 border-t border-white/5 pt-14 lg:mt-28">
                    {/* Section Heading */}
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                            What Guides Us
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                            Our Core Principles
                        </h2>
                        <p className="mt-4 leading-7 text-gray-400">
                            The ideas that shape how we help you discover and appreciate cinema.
                        </p>
                    </div>
                    {/* Principle Cards */}
                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {/* Principle 1 */}
                        <article className="rounded-2xl border border-white/10 bg-[#1b1920] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 sm:p-8">
                            <span className="text-sm font-semibold tracking-widest text-violet-300">
                                01
                            </span>
                            <h3 className="mt-5 text-xl font-semibold text-white">
                                Thoughtful Discovery
                            </h3>
                            <p className="mt-3 leading-7 text-gray-400">
                                Explore films across genres, eras, and cultures instead of seeing
                                the same familiar recommendations repeatedly.
                            </p>
                        </article>
                        {/* Principle 2 */}
                        <article className="rounded-2xl border border-white/10 bg-[#1b1920] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 sm:p-8">
                            <span className="text-sm font-semibold tracking-widest text-violet-300">
                                02
                            </span>
                            <h3 className="mt-5 text-xl font-semibold text-white">
                                Quality Over Quantity
                            </h3>
                            <p className="mt-3 leading-7 text-gray-400">
                                Make it easier to find worthwhile films through a clear, focused
                                browsing experience built around discovery.
                            </p>
                        </article>
                        {/* Principle 3 */}
                        <article className="rounded-2xl border border-white/10 bg-[#1b1920] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 sm:p-8">
                            <span className="text-sm font-semibold tracking-widest text-violet-300">
                                03
                            </span>
                            <h3 className="mt-5 text-xl font-semibold text-white">
                                Cinema for Everyone
                            </h3>
                            <p className="mt-3 leading-7 text-gray-400">
                                Celebrate different storytelling traditions and help viewers
                                discover films beyond their usual preferences.
                            </p>
                        </article>
                    </div>
                </section>

                {/* CineFind Statistics */}
                <section className="mt-20 border-y border-white/10 py-12 lg:mt-28 lg:py-16">
                    {/* Section Heading */}
                    <div className="mb-10 text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                            By the Numbers
                        </span>

                        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                            CineFind at a Glance
                        </h2>
                    </div>
                    {/* Statistics Grid */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {/* Stat 1 */}
                        <div className="text-center">
                            <p className="text-4xl font-bold text-violet-300 sm:text-5xl">
                                {new Set(movies.map((movie) => movie.id)).size}
                            </p>
                            <p className="mt-3 text-sm text-gray-400 sm:text-base">
                                Unique Movie Entries
                            </p>
                        </div>
                        {/* Stat 2 */}
                        <div className="text-center">
                            <p className="text-4xl font-bold text-violet-300 sm:text-5xl">
                                {new Set(movies.map((movie) => movie.genre)).size}
                            </p>
                            <p className="mt-3 text-sm text-gray-400 sm:text-base">
                                Genres Represented
                            </p>
                        </div>

                        {/* Stat 3 */}
                        <div className="text-center">
                            <p className="text-4xl font-bold text-violet-300 sm:text-5xl">
                                {new Set(movies.map((movie) => movie.year)).size}
                            </p>
                            <p className="mt-3 text-sm text-gray-400 sm:text-base">
                                Release Years
                            </p>
                        </div>
                        {/* Stat 4 */}
                        <div className="text-center">
                            <p className="text-4xl font-bold text-violet-300 sm:text-5xl">
                                100%
                            </p>
                            <p className="mt-3 text-sm text-gray-400 sm:text-base">
                                Made for Movie Lovers
                            </p>
                        </div>
                    </div>
                </section>

                {/* Cinephile Profiles */}
                <section className="mt-20 lg:mt-28">
                    {/* Section Heading */}
                    <div className="mb-10">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                            The People Behind the Passion
                        </span>
                        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                            A Cinephile's Perspective
                        </h2>
                        <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                            CineFind is built around a simple idea: discovering a great film
                            should be part of the joy of watching one.
                        </p>
                    </div>
                    {/* Profile Cards */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Profile 1 */}
                        <article className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#1b1920] p-6 sm:flex-row sm:items-center sm:p-8">
                            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                <img
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85"
                                    alt="Illustrative portrait of a film enthusiast"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                                    Editorial Perspective
                                </span>
                                <h3 className="mt-2 text-xl font-semibold text-white">
                                    The Film Explorer
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-gray-400">
                                    Passionate about discovering overlooked films, international
                                    cinema, and stories that challenge familiar perspectives.
                                </p>
                            </div>
                        </article>
                        {/* Profile 2 */}
                        <article className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#1b1920] p-6 sm:flex-row sm:items-center sm:p-8">
                            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85"
                                    alt="Illustrative portrait of a cinema enthusiast"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                                    Curatorial Perspective
                                </span>
                                <h3 className="mt-2 text-xl font-semibold text-white">
                                    The Story Seeker
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-gray-400">
                                    Drawn to memorable performances, bold filmmaking, and the
                                    little-known stories that deserve a wider audience.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>
                
                {/* Call to Action */}
                <section className="relative mt-20 overflow-hidden rounded-3xl border border-violet-400/20 bg-[#1b1920] px-6 py-16 text-center sm:px-12 lg:mt-28 lg:py-20">

                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-violet-400/10 via-transparent to-transparent" />

                    <div className="relative mx-auto max-w-3xl">
                        <span className="inline-block rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                            Your Next Favourite Film Awaits
                        </span>
                        <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            Your next great story
                            <span className="block text-violet-300">
                                starts here.
                            </span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
                            Explore new genres, discover overlooked gems, and find films
                            that make every movie night worth remembering.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                href="/movies"
                                className="rounded-md bg-violet-400 px-7 py-3 font-semibold text-black transition hover:bg-violet-300"
                            >
                                Explore Movies
                            </a>
                            <a
                                href="/genres"
                                className="rounded-md border border-white/10 bg-white/5 px-7 py-3 font-medium text-white transition hover:bg-white/10"
                            >
                                Browse Genres
                            </a>
                        </div>
                    </div>
                </section>
                <div className='flex items-center justify-center gap-1.5 mt-10 text-sm'>
                    <p>
                        Typograhy: MiSans by
                    </p>
                    <span className='flex items-center gap-0.5'><SiXiaomi className='text-orange-500' /> Xiaomi.</span>
                </div>
            </main>
            <Footer />
        </div>
    )
}