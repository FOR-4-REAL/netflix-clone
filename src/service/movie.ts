import type { Movie } from "@/pages/Home.tsx";
import tmdb from "../utils/HTTP.ts";

export async function getPopularMovies() {
  const res = await tmdb.get("/discover/movie", {
    params: {
      with_origin_country: "KR",
      sort_by: "popularity.desc",
      language: "ko",
      include_adult: false,
      with_watch_providers: 8,
      watch_region: "KR",
      certification_country: "KR",
      certification_lte: "12",
    },
  });
  return res.data.results;
}

export async function getTop10PopularMovies() {
  const res = await tmdb.get<{ results: Movie[] }>("/discover/movie", {
    params: {
      with_origin_country: "KR",
      sort_by: "popularity.desc",
      include_adult: false,
      with_watch_providers: 8,
      watch_region: "KR",
      certification_country: "KR",
    },
  });

  return res.data.results.filter((movies) => movies.backdrop_path !== null);
}

export async function getNetflixOriginalsTop10() {
  const res = await tmdb.get(`/discover/tv`, {
    params: {
      with_origin_country: "KR",
      with_networks: 213,
      sort_by: "popularity.desc",
      with_watch_providers: 8,
      language: "ko",
      include_null_first_air_dates: false,
    },
  });
  return res.data.results.slice(0, 10);
}

export async function fetchDetailBundle(
  contentType: "movie" | "tv",
  id: string
) {
  try {
    const [detailRes, videosRes, castRes] = await Promise.all([
      tmdb.get(`/${contentType}/${id}`, {
        params: { language: "ko" },
      }),
      tmdb.get(`/${contentType}/${id}/videos`, {
        params: { language: "ko" },
      }),
      tmdb.get(`/${contentType}/${id}/credits`, {
        params: { language: "ko" },
      }),
    ]);

    return {
      detail: detailRes.data,
      videos: videosRes.data.results,
      cast: castRes.data.cast,
    };
  } catch (error) {
    console.error("상세정보 로드 실패", error);
    throw error;
  }
}
