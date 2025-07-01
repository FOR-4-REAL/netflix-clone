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
  const today = new Date().toISOString().split("T")[0];
  const res = await tmdb.get("/discover/movie", {
    params: {
      with_origin_country: "KR",
      sort_by: "release_date.desc",
      "release_date.lte": today,
      include_adult: false,
      with_watch_providers: 8,
      watch_region: "KR",
      certification_country: "KR",
      certification_lte: "12",
    },
  });

  return res.data.results;
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
