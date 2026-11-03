"use client"

import Link from "next/link";
import { FiSearch, FiUser } from "react-icons/fi";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="sticky top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-xs">
            <nav className="relative flex gap-5 h-20 w-full px-5 sm:px-8 md:px-12 lg:px-7 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-18 w-18 items-center justify-center rounded-md bg-[#211d27]">
                        <img src="/Logo.jpeg" alt="Logo" />
                    </div>

                    <span className="text-2xl lg:text-4xl font-semibold tracking-tight text-white md:hidden lg:block">
                        Cine<span className="text-violet-400">Find</span>
                    </span>
                </Link>
                <div className="flex gap-25">
                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-7">
                        <Link href="/" className="text-md text-white transition hover:text-violet-400">Home</Link>
                        <Link href="/movies" className="text-md text-gray-400 transition hover:text-white">Movies</Link>
                        <Link href="/genres" className="text-md text-gray-400 transition hover:text-white">Genres</Link>
                        <Link href="/about" className="text-md  text-gray-400 transition hover:text-white"> About</Link>
                    </div>

                    {/* Search */}
                    <div className="hidden md:flex items-center gap-3 w-100">
                        <div className="lg:w-full  items-center gap-2 rounded-full border border-white/5 bg-[#1b1920] px-4 py-2 sm:flex">
                            <FiSearch className="text-gray-500" size={15} />

                            <input
                                type="text"
                                placeholder="Search movies..."
                                className="w-full bg-transparent text-md text-white outline-none placeholder:text-gray-500 lg:w-full"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:sr-only p-2 rounded-lg text-white hover:bg-muted"
                    >
                        <RxHamburgerMenu size={20} />
                    </button>
                </div>
                {isOpen && (
                    <div className="absolute left-0 top-full w-full border-t border-white/5 bg-background/95 px-6 py-6 backdrop-blur-md md:hidden">
                        <div className="flex flex-col items-center justify-evenly md:hidden">
                            <Link href="/" className="text-md text-white transition hover:text-violet-400 mb-3">Home</Link>
                            <Link href="/movies" className="text-md text-gray-400 transition hover:text-white mb-3">Movies</Link>
                            <Link href="/genres" className="text-md text-gray-400 transition hover:text-white mb-3">Genres</Link>
                            <Link href="/about" className="text-md text-gray-400 transition hover:text-white mb-3"> About</Link>

                            {/* Search + profile */}
                            {/* <div className="flex items-center gap-3 w-100"> */}
                                <div className="flex max-w-md w-full items-center gap-2 rounded-full border border-white/5 bg-[#1b1920] px-4 py-2">
                                    <FiSearch className="text-gray-500" size={25} />

                                    <input
                                        type="text"
                                        placeholder="Search movies..."
                                        className="w-full bg-transparent text-md text-white outline-none placeholder:text-gray-500 lg:w-full"
                                    />
                                </div>
                            {/* </div> */}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}