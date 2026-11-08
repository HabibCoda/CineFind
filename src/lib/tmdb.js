const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDB(endpoint) {
  const token = process.env.TMDB_ACCESS_TOKEN?.trim();

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("TMDB Response:", data);

    throw new Error(
      `TMDB API Error: ${response.status} - ${data.status_message}`
    );
  }

  return data;
}