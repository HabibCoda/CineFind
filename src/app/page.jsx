import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import {
  getTrendingMovies,
  getPopularMovies,
} from "@/lib/movies";
import Link from "next/link";

export default async function Home() {
  const [trendingResult, popularResult] = await Promise.allSettled([
    getTrendingMovies(),
    getPopularMovies(),
  ]);

  const trendingMovies =
    trendingResult.status === "fulfilled" ? trendingResult.value : [];

  const popularMovies =
    popularResult.status === "fulfilled" ? popularResult.value : [];

  const featuredMovie = trendingMovies[0];

  return (
    <>
      <Navbar />

      <main>
        {featuredMovie && <Hero movie={featuredMovie} />}

        <MovieRow
          title="Trending Now"
          movies={trendingMovies.slice(0, 12)}
        />

        <MovieRow
          title="Popular Movies"
          movies={popularMovies.slice(0, 12)}
        />

        <section className="mx-auto max-w-470 px-5 py-10 lg:px-8">
          <div className="mb-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Browse by Genre
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Find your next movie by genre.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
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
            ].map((genre) => (
              <Link
                key={genre.name}
                href={`/movies?genre=${genre.id}`}
                className="rounded-full border cursor-pointer font-medium border-white/10 bg-white/3 px-5 py-2.5 text-md text-gray-300 transition hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-300"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}