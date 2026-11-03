"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { movies } from "@/data/movies";
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

const genres = [
  {
    number: "01",
    name: "Action",
    count: "420+ titles",
    icon: FiZap,
    image: movies[9].poster,
  },
  {
    number: "02",
    name: "Adventure",
    count: "310+ titles",
    icon: FiCompass,
    image: movies[11].poster,
  },
  {
    number: "03",
    name: "Comedy",
    count: "280+ titles",
    icon: FiFilm,
    image: movies[2].poster,
  },
  {
    number: "04",
    name: "Drama",
    count: "650+ titles",
    icon: FiHeart,
    image: movies[1].poster,
  },
  {
    number: "05",
    name: "Horror",
    count: "190+ titles",
    icon: FiEye,
    image: movies[8].poster,
  },
  {
    number: "06",
    name: "Sci-Fi",
    count: "340+ titles",
    icon: FiRadio,
    image: movies[3].poster,
  },
  {
    number: "07",
    name: "Thriller",
    count: "410+ titles",
    icon: FiZap,
    image: movies[4].poster,
  },
  {
    number: "08",
    name: "Animation",
    count: "230+ titles",
    icon: FiCopy,
    image: movies[5].poster,
  },
  {
    number: "09",
    name: "Romance",
    count: "290+ titles",
    icon: FiHeart,
    image: movies[6].poster,
  },
  {
    number: "10",
    name: "Mystery",
    count: "180+ titles",
    icon: FiSearch,
    image: movies[7].poster,
  },
  {
    number: "11",
    name: "Crime",
    count: "320+ titles",
    icon: FiBriefcase,
    image: movies[10].poster,
  },
  {
    number: "12",
    name: "Documentary",
    count: "150+ titles",
    icon: FiVideo,
    image: movies[12].poster,
  },
];

const collections = [
  {
    title: "Award-Winning Dramas",
    description:
      "Palme d’Or, Oscar, and Golden Lion recipients spanning five decades.",
    films: "28 Films",
    label: "Editorial Pick",
    images: [movies[1].poster, movies[6].poster, movies[8].poster],
  },
  {
    title: "Mind-Bending Sci-Fi",
    description:
      "Non-linear narratives, existential paradoxes, and speculative futures.",
    films: "34 Films",
    label: "Essential",
    images: [movies[0].poster, movies[3].poster, movies[5].poster],
  },
  {
    title: "Modern Neo-Noir",
    description:
      "Bleak urban morality tales rendered in shadow, neon, and rain.",
    films: "22 Films",
    label: "Staff Choice",
    images: [movies[4].poster, movies[5].poster, movies[9].poster],
  },
  {
    title: "Indie Discoveries",
    description:
      "Radical independent voices from Sundance, Locarno, and TIFF.",
    films: "41 Films",
    label: "Hidden Gems",
    images: [movies[6].poster, movies[7].poster, movies[8].poster],
  },
];

export default function Genres() {
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

            {genres.map((genre) => {
              const Icon = genre.icon;

              return (
                <button
                  key={genre.name}
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
                        {genre.count}
                      </p>
                    </div>

                  </div>
                </button>
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

            {collections.map((collection) => (
              <div
                key={collection.title}
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
                    <span>{collection.films}</span>
                    <span>{collection.label}</span>
                  </div>

                </div>
              </div>
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
            {[
              "Something Thrilling",
              "Something Funny",
              "Something Emotional",
              "Something Thought-Provoking",
              "Something Romantic",
              "Something Dark",
            ].map((mood) => (
              <button
                key={mood}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-violet-300"
              >
                {mood}
              </button>
            ))}
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}