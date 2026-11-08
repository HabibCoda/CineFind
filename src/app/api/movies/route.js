import { fetchFromTMDB } from "@/lib/tmdb";
import { formatMovie, genreMap } from "@/lib/movies";

/* There are 20,001 movies to explore, but only 10,000 are visible because TMDB has a 500 pages restriction making the
remaining 10,001 not visible but still available */
const MOVIES_PER_PAGE = 12;
const TMDB_PAGE_SIZE = 20;
const MAX_TMDB_PAGES = 500;
/* CineFind exceeds the 500 pages because TMDB has a default of 20 movies per page, but cinefind is 12, making the number of pages to be increased,
TMDB: 20moviesperpage * 500pagesrestricton = 10,000movies; and CineFind: 10,000movies/12moviesperpage = 833+1pages */

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const page = Math.max(1, Number(searchParams.get("page")) || 1);
        const query = searchParams.get("query")?.trim();
        const genreId = searchParams.get("genre");

        // Only allow the TMDB filters CineFind currently needs.
        const allowedFilters = [
            "with_genres",
            "sort_by",
            "vote_count.gte",
            "vote_count.lte",
            "primary_release_date.gte",
        ];

        const discoveryFilters = new URLSearchParams();

        allowedFilters.forEach((filter) => {
            const value = searchParams.get(filter);

            if (value) {
                discoveryFilters.set(filter, value);
            }
        });

        // Maintain compatibility with the existing genre filter.
        if (
            !discoveryFilters.has("with_genres") &&
            genreId &&
            genreMap[genreId]
        ) {
            discoveryFilters.set("with_genres", genreId);
            discoveryFilters.set("sort_by", "popularity.desc");
        }

        let endpoint;

        if (query) {
            endpoint = "/search/movie";
        } else if (discoveryFilters.toString()) {
            endpoint = "/discover/movie";
        } else {
            endpoint = "/movie/popular";
        }

        const startIndex = (page - 1) * MOVIES_PER_PAGE;
        const tmdbPage = Math.floor(startIndex / TMDB_PAGE_SIZE) + 1;
        const offset = startIndex % TMDB_PAGE_SIZE;

        if (tmdbPage > MAX_TMDB_PAGES) {
            return Response.json({
                success: true,
                movies: [],
                currentPage: page,
                totalPages: 0,
                totalResults: 0,
            });
        }

        // Build a valid TMDB URL.
        const buildEndpoint = (apiPage) => {
            const params = new URLSearchParams();

            params.set("page", apiPage);

            if (query) {
                params.set("query", query);
            } else {
                discoveryFilters.forEach((value, key) => {
                    params.set(key, value);
                });
            }

            return `${endpoint}?${params.toString()}`;
        };
        
        const firstData = await fetchFromTMDB(buildEndpoint(tmdbPage));

        let results = [...firstData.results];

        if (
            offset + MOVIES_PER_PAGE > TMDB_PAGE_SIZE &&
            tmdbPage < firstData.total_pages &&
            tmdbPage < MAX_TMDB_PAGES
        ) {
            const secondData = await fetchFromTMDB(
                buildEndpoint(tmdbPage + 1)
            );

            results = [...results, ...secondData.results];
        }

        const totalResults = firstData.total_results;
        const accessubleResults = Math.min(totalResults, MAX_TMDB_PAGES * TMDB_PAGE_SIZE);
        const totalPages = Math.ceil(accessubleResults / MOVIES_PER_PAGE);

        const movies = results
            .slice(offset, offset + MOVIES_PER_PAGE)
            .map(formatMovie);

        return Response.json({
            success: true,
            movies,
            currentPage: page,
            totalPages,
            totalResults,
        });

    } catch (error) {
        console.error("Movies API Error:", error);

        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}