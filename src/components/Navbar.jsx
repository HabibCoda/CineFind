"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
// import { useRouter } from "next/router";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
    const searchRef = useRef(null);
    const mobileSearchRef = useRef(null);
    const mobileSearchInputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setSelectedIndex(-1);
        const controller = new AbortController();

        async function fetchSearchResults() {
            const query = searchQuery.trim();

            if (!query) {
                setSearchResults([]);
                setSearchError("");
                setIsSearching(false);
                return;
            }

            try {
                setIsSearching(true);
                setSearchError("");

                const params = new URLSearchParams({
                    query,
                    page: "1",
                });

                const response = await fetch(`/api/movies?${params}`, {
                    signal: controller.signal,
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || "Search failed.");
                }

                setSearchResults(data.movies.slice(0, 5));
            } catch (error) {
                if (error.name !== "AbortError") {
                    setSearchError(error.message);
                    setSearchResults([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsSearching(false);
                }
            }
        }

        const timer = setTimeout(fetchSearchResults, 400);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [searchQuery]);

    useEffect(() => {
        const savedHistory = localStorage.getItem("cinefind-search-history");

        if (savedHistory) {
            try {
                setSearchHistory(JSON.parse(savedHistory));
            } catch {
                localStorage.removeItem("cinefind-search-history");
            }
        }

        setIsHistoryLoaded(true);
    }, []);

    useEffect(() => {
        if (isHistoryLoaded) {
            localStorage.setItem(
                "cinefind-search-history",
                JSON.stringify(searchHistory)
            );
        }
    }, [searchHistory, isHistoryLoaded]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                !searchRef.current?.contains(event.target) &&
                !mobileSearchRef.current?.contains(event.target)
            ) {
                setIsSearchFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isSearch) {
            mobileSearchInputRef.current?.focus();
        }
    }, [isSearch]);

    const saveSearch = (query) => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) return;

        setSearchHistory((prev) => {
            const updatedHistory = [
                trimmedQuery,
                ...prev.filter(
                    (item) => item.toLowerCase() !== trimmedQuery.toLowerCase()
                ),
            ].slice(0, 5);

            return updatedHistory;
        });
    };

    const handleSearchSubmit = (e) => {
        if (e.key !== "Enter" || !searchQuery.trim()) return;

        const query = searchQuery.trim();

        saveSearch(query);
        setIsSearchFocused(false);
        setIsSearch(false);
        setSearchQuery("");
        setSelectedIndex(-1);

        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            router.push(`/movie/${searchResults[selectedIndex].id}`);
        } else {
            router.push(`/movies?query=${encodeURIComponent(query)}`);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Escape") {
            setIsSearchFocused(false);
            setIsSearch(false);
            setSelectedIndex(-1);
            return;
        }

        if (!searchQuery.trim() || searchResults.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev < searchResults.length - 1 ? prev + 1 : 0
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev > 0 ? prev - 1 : searchResults.length - 1
            );
        }
    };

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
                {/* Search */}
                <div ref={searchRef} className="hidden md:flex items-center gap-3 w-150 relative">
                    <div className="lg:w-full md:w-full items-center gap-2 rounded-full border border-white/5 bg-[#1b1920] px-4 py-2 sm:flex">
                        <FiSearch className="text-gray-500" size={15} />

                        <input
                            onKeyDown={(e) => {
                                handleSearchSubmit(e);
                                handleSearchKeyDown(e);
                            }}
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            className="w-full bg-transparent text-md text-white outline-none placeholder:text-gray-500 lg:w-full"
                        />
                    </div>

                    {isSearchFocused && (
                        <div className="absolute left-0 top-full mt-3 w-full rounded-xl border border-white/10 bg-[#1b1920] p-4 shadow-2xl">
                            {/* Search dropdown content will go here */}
                            {searchQuery.trim() ? (
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        Search Results
                                    </p>

                                    {isSearching ? (
                                        <p className="py-4 text-center text-sm text-gray-400">
                                            Searching movies...
                                        </p>
                                    ) : searchError ? (
                                        <p className="py-4 text-center text-sm text-red-400">
                                            {searchError}
                                        </p>
                                    ) : searchResults.length > 0 ? (
                                        <div className="flex flex-col gap-3">
                                            {searchResults.map((movie, index) => (
                                                <Link
                                                    key={movie.id}
                                                    href={`/movie/${movie.id}`}
                                                    onClick={() => {
                                                        saveSearch(searchQuery);
                                                        setIsSearchFocused(false);
                                                        setSearchQuery("");
                                                    }}
                                                    className={`flex items-center gap-3 rounded-lg p-2 transition ${selectedIndex === index
                                                            ? "bg-violet-500/20 ring-1 ring-violet-500/40"
                                                            : "hover:bg-white/5"
                                                        }`}
                                                >
                                                    <img
                                                        src={movie.poster}
                                                        alt={movie.title}
                                                        className="h-16 w-11 rounded-md object-cover"
                                                    />

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-medium text-white">
                                                            {movie.title}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {movie.year} · {movie.genre}
                                                        </p>
                                                    </div>

                                                    <span className="shrink-0 text-xs text-yellow-400">
                                                        ★ {movie.rating}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="py-4 text-center text-sm text-gray-400">
                                            No movies found.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Recent Searches
                                        </p>

                                        {searchHistory.length > 0 && (
                                            <button
                                                onClick={() => setSearchHistory([])}
                                                className="text-xs text-violet-400 transition hover:text-violet-300"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>

                                    {searchHistory.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            {searchHistory.map((item, index) => (
                                                <button
                                                    key={`${item}-${index}`}
                                                    onClick={() => setSearchQuery(item)}
                                                    className="flex items-center gap-3 rounded-lg p-2 text-left text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                                                >
                                                    <span className="text-gray-500">◷</span>
                                                    <span>{item}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="py-4 text-center text-sm text-gray-400">
                                            No recent searches.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex gap-15">
                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-7">
                        <Link href="/" className="text-md text-white transition hover:text-violet-400">Home</Link>
                        <Link href="/movies" className="text-md text-gray-400 transition hover:text-white">Movies</Link>
                        <Link href="/genres" className="text-md text-gray-400 transition hover:text-white">Genres</Link>
                        <Link href="/about" className="text-md  text-gray-400 transition hover:text-white"> About</Link>
                    </div>
                    <div>
                        <button
                            onClick={() => { setIsSearch(!isSearch); setIsOpen(false); }}
                            className={`md:hidden p-2 rounded-lg transition-colors ${isSearch ? "text-violet-400 bg-violet-500/10" : "text-white hover:bg-muted"}`}
                        >
                            <FiSearch size={20} />
                        </button>
                        <button
                            onClick={() => { setIsOpen(!isOpen); setIsSearch(false); }}
                            className={`md:hidden p-2 rounded-lg transition-colors ${isOpen ? "text-violet-400 bg-violet-500/10" : "text-white hover:bg-muted"}`}
                        >
                            <RxHamburgerMenu size={20} />
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="absolute left-0 top-full w-full border-t border-white/5 bg-background/95 px-6 py-6 backdrop-blur-md md:hidden">
                        <div className="flex flex-col items-center justify-evenly md:hidden">
                            <Link href="/" className="text-md text-white transition hover:text-violet-400 mb-3">Home</Link>
                            <Link href="/movies" className="text-md text-gray-400 transition hover:text-white mb-3">Movies</Link>
                            <Link href="/genres" className="text-md text-gray-400 transition hover:text-white mb-3">Genres</Link>
                            <Link href="/about" className="text-md text-gray-400 transition hover:text-white mb-3"> About</Link>
                        </div>
                    </div>
                )}
                {isSearch && (
                    <div ref={mobileSearchRef} className="absolute left-0 top-full w-full border-t border-white/5 bg-background/95 px-6 py-6 backdrop-blur-md md:hidden">
                        <div className="flex max-w-md w-full items-center gap-2 rounded-full border border-white/5 bg-[#1b1920] px-4 py-2 md:hidden">
                            <FiSearch className="text-gray-500" size={25} />
                            <input
                                onKeyDown={(e) => {
                                    handleSearchSubmit(e);
                                    handleSearchKeyDown(e);
                                }}
                                ref={mobileSearchInputRef}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                type="text"
                                placeholder="Search movies..."
                                className="w-full bg-transparent text-md text-white outline-none placeholder:text-gray-500 lg:w-full"
                            />
                        </div>
                        {isSearchFocused && (
                            <div className="mt-3 w-full max-w-md rounded-xl border border-white/10 bg-[#1b1920] p-4 shadow-2xl">
                                {searchQuery.trim() ? (
                                    <div>
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Search Results
                                        </p>

                                        {isSearching ? (
                                            <p className="py-4 text-center text-sm text-gray-400">
                                                Searching movies...
                                            </p>
                                        ) : searchError ? (
                                            <p className="py-4 text-center text-sm text-red-400">
                                                {searchError}
                                            </p>
                                        ) : searchResults.length > 0 ? (
                                            <div className="flex flex-col gap-3">
                                                {searchResults.map((movie) => (
                                                    <Link
                                                        key={movie.id}
                                                        href={`/movie/${movie.id}`}
                                                        onClick={() => {
                                                            saveSearch(searchQuery);
                                                            setIsSearchFocused(false);
                                                            setIsSearch(false);
                                                            setSearchQuery("");
                                                        }}
                                                        className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
                                                    >
                                                        <img
                                                            src={movie.poster}
                                                            alt={movie.title}
                                                            className="h-16 w-11 rounded-md object-cover"
                                                        />

                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-medium text-white">
                                                                {movie.title}
                                                            </p>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                {movie.year} · {movie.genre}
                                                            </p>
                                                        </div>

                                                        <span className="shrink-0 text-xs text-yellow-400">
                                                            ★ {movie.rating}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="py-4 text-center text-sm text-gray-400">
                                                No movies found.
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mb-3 flex items-center justify-between">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Recent Searches
                                            </p>

                                            {searchHistory.length > 0 && (
                                                <button
                                                    onClick={() => setSearchHistory([])}
                                                    className="text-xs text-violet-400 hover:text-violet-300"
                                                >
                                                    Clear All
                                                </button>
                                            )}
                                        </div>

                                        {searchHistory.length > 0 ? (
                                            <div className="flex flex-col gap-2">
                                                {searchHistory.map((item, index) => (
                                                    <button
                                                        key={`${item}-${index}`}
                                                        onClick={() => setSearchQuery(item)}
                                                        className="flex items-center gap-3 rounded-lg p-2 text-left text-sm text-gray-300 transition hover:bg-white/5"
                                                    >
                                                        <span className="text-gray-500">◷</span>
                                                        <span>{item}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="py-4 text-center text-sm text-gray-400">
                                                No recent searches.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}