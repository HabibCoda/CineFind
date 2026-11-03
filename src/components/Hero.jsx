import Link from "next/link";
import { FiPlay, FiInfo, FiStar } from "react-icons/fi";

export default function Hero({ movie }) {
  return (
    <section className="relative min-h-155 overflow-hidden pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
        }}
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-linear-to-r from-[#111014] via-[#111014]/75 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#111014] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-155 max-w-470 items-end px-5 pb-20 lg:px-8">
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex rounded-full bg-violet-400/10 px-3 py-1 lg:text-xs text-xs font-semibold uppercase tracking-wider text-violet-300">
            Featured Movie
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-5xl">
            {movie.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 lg:text-sm text-sm md:text-lg text-gray-300">
            <span className="flex items-center gap-1">
              <FiStar className="fill-yellow-400 text-yellow-400" />
              {movie.rating}
            </span>

            <span>•</span>
            <span>{movie.year}</span>

            <span>•</span>
            <span>{movie.genre}</span>
          </div>

          <p className="mt-5 max-w-xl text-md leading-7 text-gray-300 md:text-md lg:text-md">
            {movie.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/movie/${movie.id}`}
              className="flex items-center gap-2 rounded-lg bg-violet-400 px-5 py-3 text-xs font-semibold text-[#17151b] transition hover:bg-violet-300"
            >
              <FiInfo size={15} />
              View Details
            </Link>

            <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">
              <FiPlay size={15} />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}