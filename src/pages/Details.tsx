import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchDetailBundle } from "@/service/movie";

type Genre = { id: number; name: string };

type DetailCommon = {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: Genre[];
  vote_average: number;
  tagline: string;
};

type MovieDetail = DetailCommon & {
  title: string;
  release_date: string;
};

type TvDetail = DetailCommon & {
  name: string;
  first_air_date: string;
};

type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

type Cast = {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

function DetailPage() {
  const { pathname } = useLocation();
  const [, contentType, id] = pathname.split("/");

  const [detail, setDetail] = useState<MovieDetail | TvDetail | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !contentType) return;

    setLoading(true);
    fetchDetailBundle(contentType as "movie" | "tv", id!)
      .then(({ detail, videos, cast }) => {
        setDetail(detail);
        setVideos(videos);
        setCast(cast);
      })
      .catch((err) => console.error("로딩 오류:", err))
      .finally(() => setLoading(false));
  }, [contentType, id]);

  if (loading) return <div className="text-white p-4">로딩 중...</div>;
  if (!detail)
    return <div className="text-white p-4">데이터를 찾을 수 없습니다.</div>;

  const trailer = videos.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  const title = "title" in detail ? detail.title : detail.name;
  const date =
    "release_date" in detail ? detail.release_date : detail.first_air_date;

  return (
    <div className="min-h-screen  text-white pt-12 px-8 max-w-280 mx-auto">
      {trailer ? (
        <div className="mt-12 relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&rel=0`}
            title="예고편"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="mt-12 text-center text-gray-400">예고편이 없습니다.</p>
      )}

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {detail.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
            alt={title}
            className="hidden md:block w-[300px] shadow-lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm text-gray-400 mb-2">
            {date} · 평점{" "}
            {Math.floor(detail.vote_average) >= 5
              ? 5
              : Math.floor(detail.vote_average)}
          </p>
          {detail.tagline && (
            <p className="italic text-gray-300 mb-4">{detail.tagline}</p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {detail.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 text-sm bg-gray-700 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="leading-relaxed text-gray-200">{detail.overview}</p>
        </div>
      </div>

      <section className="my-16">
        <h2 className="text-2xl font-bold mb-4">출연진</h2>
        <ul className="flex flex-wrap gap-6">
          {cast.slice(0, 8).map((actor) => (
            <li key={actor.cast_id} className="w-[120px] text-center">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-lg mx-auto mb-2"
                />
              ) : (
                <div className="w-32 h-40 bg-gray-700 rounded-lg mb-2 flex items-center justify-center text-gray-400 text-xs">
                  사진 없음
                </div>
              )}
              <p className="font-semibold">{actor.name}</p>
              <p className="text-sm text-gray-400">{actor.character}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default DetailPage;
