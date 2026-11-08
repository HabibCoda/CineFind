import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { movies } from "@/data/movies";
import { fetchFromTMDB } from "@/lib/tmdb";
import { formatMovie } from "@/lib/movies";
import {
  FiZap,
  FiCompass,
  FiFilm,
  FiHeart,
  FiEye,
  FiLayers,
  FiRadio,
  FiCopy,
  FiSmile,
  FiSearch,
  FiBriefcase,
  FiVideo,
} from "react-icons/fi";
import Link from "next/link";

const genres = [
  { number: "01", name: "Action", id: 28, icon: FiZap },
  { number: "02", name: "Adventure", id: 12, icon: FiCompass },
  { number: "03", name: "Animation", id: 16, icon: FiCopy },
  { number: "04", name: "Comedy", id: 35, icon: FiFilm },
  { number: "05", name: "Crime", id: 80, icon: FiBriefcase },
  { number: "06", name: "Documentary", id: 99, icon: FiVideo },
  { number: "07", name: "Drama", id: 18, icon: FiHeart },
  { number: "08", name: "Horror", id: 27, icon: FiEye },
  { number: "09", name: "Mystery", id: 9648, icon: FiSearch },
  { number: "10", name: "Romance", id: 10749, icon: FiHeart },
  { number: "11", name: "Sci-Fi", id: 878, icon: FiRadio },
  { number: "12", name: "Thriller", id: 53, icon: FiZap },
];
const collections = [
  {
    title: "Award-Winning Dramas",
    description:
      "Highly acclaimed dramas recognized for their cinematic excellence.",
    label: "Editorial Pick",
    params: {
      with_genres: "18",
      sort_by: "vote_average.desc",
      "vote_count.gte": "500",
    },
  },
  {
    title: "Mind-Bending Sci-Fi",
    description:
      "Non-linear narratives, existential paradoxes, and speculative futures.",
    label: "Essential",
    params: {
      with_genres: "878,9648",
      sort_by: "popularity.desc",
    },
  },
  {
    title: "Modern Neo-Noir",
    description:
      "Crime and thriller stories filled with moral ambiguity and dark atmosphere.",
    label: "Staff Choice",
    params: {
      with_genres: "80,53",
      "primary_release_date.gte": "2000-01-01",
      sort_by: "popularity.desc",
    },
  },
  {
    title: "Indie Discoveries",
    description:
      "Lesser-known cinematic discoveries with strong audience appreciation.",
    label: "Hidden Gems",
    params: {
      sort_by: "vote_average.desc",
      "vote_count.gte": "100",
      "vote_count.lte": "2000",
    },
  },
];

const moods = [
  {
    title: "Something Thrilling",
    params: {
      with_genres: "53|28",
      sort_by: "popularity.desc",
    },
  },
  {
    title: "Something Funny",
    params: {
      with_genres: "35",
      sort_by: "popularity.desc",
    },
  },
  {
    title: "Something Emotional",
    params: {
      with_genres: "18|10749",
      sort_by: "vote_average.desc",
      "vote_count.gte": "100",
    },
  },
  {
    title: "Something Thought-Provoking",
    params: {
      with_genres: "878|9648",
      sort_by: "vote_average.desc",
      "vote_count.gte": "100",
    },
  },
  {
    title: "Something Romantic",
    params: {
      with_genres: "10749",
      sort_by: "popularity.desc",
    },
  },
  {
    title: "Something Dark",
    params: {
      with_genres: "27|80",
      sort_by: "popularity.desc",
    },
  },
];

async function getGenreData() {
  const genreData = await Promise.all(
    genres.map(async (genre) => {
      const data = await fetchFromTMDB(
        `/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&page=1`
      );

      const firstMovie = data.results?.[0];

      return {
        ...genre,
        count: data.total_results,
        image: firstMovie
          ? formatMovie(firstMovie).poster
          : "/placeholder.png",
      };
    })
  )
  return genreData
};

async function getCollectionData() {
  return Promise.all(
    collections.map(async (collection) => {
      const params = new URLSearchParams({
        ...collection.params,
        page: "1",
      });

      const data = await fetchFromTMDB(
        `/discover/movie?${params.toString()}`
      );

      return {
        ...collection,
        films: data.total_results,
        images: data.results
          .slice(0, 3)
          .map((movie) => formatMovie(movie).poster),
      };
    })
  );
}

export default async function Genres() {
  const [genreData, collectionData] = await Promise.all([
    getGenreData(),
    getCollectionData(),
  ]);
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-470 px-5 py-12 lg:px-8">

        {/* Page Header */}
        <section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                ● Curated Film Archives
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-4xl">
                Browse by Genre
              </h1>

              <p className="mt-2 max-w-2xl text-base text-gray-400 md:text-lg lg:text-md">
                Explore cinema across categories, from timeless classics to
                modern masterpieces.
              </p>
            </div>

            <div className="shrink-0">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Total Catalog:{" "}
                <span className="text-violet-300">3,990+ Films</span>
              </span>
            </div>
          </div>
        </section>

        {/* Genre Grid */}
        <section className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {genreData.map((genre) => {
              const Icon = genre.icon;

              return (
                <Link
                  key={genre.name}
                  href={`/movies?genre=${genre.id}`}
                  className="group relative h-44 overflow-hidden rounded-xl border border-white/5 bg-[#1b1920] text-left transition duration-300 hover:-translate-y-1 hover:border-violet-400/20"
                >
                  {/* Background Image */}
                  <img
                    src={genre.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-30 transition duration-500 group-hover:scale-105 group-hover:opacity-40"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#111015] via-[#111015]/70 to-[#111015]/20" />

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-between p-5">

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-400">
                        {genre.number}
                      </span>

                      <Icon
                        size={18}
                        className="text-gray-300 transition group-hover:text-violet-300"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-white md:text-2xl">
                        {genre.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        {genre.count.toLocaleString()} titles
                      </p>
                    </div>

                  </div>
                </Link>
              );
            })}

          </div>
        </section>
        {/* Curated Collections */}
        <section className="mt-20 border-t border-white/5 pt-12">

          {/* Section Heading */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                Spotlight Program
              </span>

              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                Curated Collections
              </h2>

              <p className="mt-2 max-w-2xl text-sm text-gray-400 md:text-base">
                Thematically sequenced cinephile deep-dives compiled by our
                screening panel.
              </p>
            </div>

            <button className="hidden text-sm font-medium text-violet-300 transition hover:text-violet-200 sm:block">
              View All Series →
            </button>
          </div>

          {/* Collection Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {collectionData.map((collection) => (
              <Link
                key={collection.title}
                href={`/movies?${new URLSearchParams(collection.params).toString()}`}
                className="group overflow-hidden rounded-xl border border-white/5 bg-[#1b1920] transition duration-300 hover:-translate-y-1 hover:border-violet-400/20"
              >

                {/* Image Collage */}
                <div className="grid h-44 grid-cols-3 gap-1 overflow-hidden p-3">
                  {collection.images.map((image, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-sm"
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                {/* Card Content */}
                <div className="px-4 pb-4">

                  <h3 className="text-lg font-semibold text-white">
                    {collection.title}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-gray-400">
                    {collection.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-gray-500">
                    <span>{collection.films.toLocaleString()} Films</span>
                    <span>{collection.label}</span>
                  </div>

                </div>
              </Link>
            ))}

          </div>

        </section>
        {/* Mood Selector */}
        <section className="mt-20 border-t border-white/5 pt-12">

          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
              Feeling Something?
            </span>

            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Pick Your Mood
            </h2>

            <p className="mt-2 text-sm text-gray-400 md:text-base">
              Let your current mood guide your next cinematic discovery.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <Link
                key={mood.title}
                href={`/movies?${new URLSearchParams(mood.params).toString()}`}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-violet-300"
              >
                {mood.title}
              </Link>
            ))}
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}