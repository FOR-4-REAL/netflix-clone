import tmdb from "../utils/HTTP.ts";

export async function getPopularMovies() {
  const res = await tmdb.get("/movie/popular");
  return res.data.results;
}

export async function getTop10PopularMovies() {
  const res = await tmdb.get("/movie/popular");
  return res.data.results.slice(0, 10); // 상위 10개만
}

export async function getNetflixOriginalsTop10() {
  const res = await tmdb.get(
    `/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  );
  return res.data.results.slice(0, 10); // 상위 10개만
}
