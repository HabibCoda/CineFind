export const metadata = {
  title: "About CineFind",
  description:
    "Learn about CineFind, a movie discovery platform designed to help you explore films, discover new genres, and find your next favourite movie.",
  openGraph: {
    title: "About CineFind | Discover Movies Worth Watching",
    description:
      "Learn more about CineFind and our mission to make discovering movies easier.",
    type: "website",
    images: ["/og-image.png"]
  },
};

export default function AboutLayout({ children }) {
  return children;
}