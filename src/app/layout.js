import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  metadataBase: new URL("https://cinefind-bay.vercel.app"),
  title: {
    default: "CineFind | Discover Movies Worth Watching",
    template: "%s | CineFind",
  },
  description:
    "Discover movies worth watching with CineFind. Explore trending films, browse genres, and find your next favourite movie.",

  openGraph: {
    title: "CineFind | Discover Movies Worth Watching",
    description:
      "Explore trending films, discover movies by genre, and find your next favourite movie with CineFind.",
    siteName: "CineFind",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CineFind - Discover Movies Worth Watching",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CineFind | Discover Movies Worth Watching",
    description:
      "Discover trending films, explore genres, and find your next favourite movie.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
