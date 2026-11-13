import { fetchFromTMDB } from "@/lib/tmdb";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const movie = await fetchFromTMDB(`/movie/${id}`, {
      revalidate: 3600,
    });

    return {
      title: movie.title || "Movie Details",
      description:
        movie.overview ||
        "Discover movie details, cast, ratings and recommendations on CineFind.",
      openGraph: {
        title: `${movie.title} | CineFind`,
        description:
          movie.overview ||
          "Discover movies worth watching on CineFind.",
        type: "video.movie",
        images: ["/og-image.png"],
      },
    };
  } catch {
    return {
      title: "Movie Details",
      description: "Discover movies worth watching on CineFind.",
    };
  }
}

export default function MovieLayout({ children }) {
  return children;
}