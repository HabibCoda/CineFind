import { fetchFromTMDB } from "@/lib/tmdb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !/^[1-9]\d*$/.test(id)) {
      return Response.json(
        { success: false, message: "Invalid movie ID." },
        { status: 400 }
      );
    }

    const movie = await fetchFromTMDB(
      `/movie/${id}?append_to_response=credits,videos,recommendations`
    );

    return Response.json({
      success: true,
      movie,
    });
  } catch (error) {
    console.error("Movie Details API Error:", error);

    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}