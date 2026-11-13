export const metadata = {
  title: "Explore Movies",
  description:
    "Explore movies on CineFind. Discover trending films, browse genres, filter collections, and find your next favourite movie.",
  openGraph: {
    title: "Explore Movies | CineFind",
    description:
      "Discover trending films, browse genres, and find your next favourite movie on CineFind.",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function MoviesLayout({ children }) {
  return children;
}