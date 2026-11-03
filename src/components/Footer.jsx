"use client"

import Link from "next/link";
import {
  FiGithub,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-470 px-5 py-12 lg:px-7">
        
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#211d27]">
                <img src="/Logo.jpeg" alt="" />
              </div>

              <span className="text-2xl font-semibold text-white">
                Cine<span className="text-violet-400">Find</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Discover movies worth watching. Explore new releases,
              popular films, and hidden gems all in one place.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-md font-medium text-white">
              Explore
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-gray-500 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/movies"
                className="text-sm text-gray-500 transition hover:text-white"
              >
                Movies
              </Link>

              <Link
                href="/genres"
                className="text-sm text-gray-500 transition hover:text-white"
              >
                Genres
              </Link>

              <Link
                href="/about"
                className="text-sm text-gray-500 transition hover:text-white"
              >
                About
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-md font-medium text-white">
              Follow us
            </h3>

            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-300"
              >
                <FiGithub size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-300"
              >
                <FiInstagram size={16} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-300"
              >
                <FiTwitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 CineFind. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="#"
              className="transition hover:text-gray-400"
            >
              Privacy
            </Link>

            <Link
              href="#"
              className="transition hover:text-gray-400"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}