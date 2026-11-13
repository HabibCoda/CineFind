const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDB(endpoint, { revalidate } = {}) {
    const token = process.env.TMDB_ACCESS_TOKEN?.trim();
    if (!token) {
        throw new Error("TMDB_ACCESS_TOKEN is not configured.");
    }

    let response;

    try {
        response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            ...(revalidate !== undefined ? { next: { revalidate }}: { cache: "no-store" }),
        });
    } catch (error) {
        if (error?.digest === "DYNAMIC_SERVER_USAGE") {
            throw error;
        }

        console.error("TMDB Network Error:", error);

        throw new Error("Unable to connect to TMDB. Please try again later.");
    }

let data;

try {
    data = await response.json();
} catch (error) {
    console.error("TMDB Invalid Response:", error);

    throw new Error("TMDB returned an invalid response.");
}

if (!response.ok) {
    console.error("TMDB Response:", data);

    throw new Error(
        `TMDB API Error: ${response.status} - ${data.status_message || "An unexpected error occurred."}`
    );
}

return data;
}