export const metadata = {
  title: "Browse by Genre",
  description:
    "Discover movies by genre on CineFind. Explore Action, Comedy, Drama, Horror, Sci-Fi, Romance, and more.",
  openGraph: {
    title: "Browse Movies by Genre | CineFind",
    description:
      "Find your next favourite movie by exploring different genres and curated movie collections on CineFind.",
    type: "website",
    images: ["/og-image.png"]
  },
};

export default function GenresLayout({ children }) {
  return children;
}