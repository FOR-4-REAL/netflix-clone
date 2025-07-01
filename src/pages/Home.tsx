// src/pages/Home.tsx
import { useEffect, useState } from "react";
import {
  getNetflixOriginalsTop10,
  getPopularMovies,
  getTop10PopularMovies,
} from "../service/movie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";

import "swiper/css";
import CategoryRow from "../components/CategoryRow";
import useSwiperKeyboardControl from "../utils/swiper";

type Movie = {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
};

function NetflixOriginalSectionSwiper() {
  const [originals, setOriginals] = useState<Movie[]>([]);
  const { registerSwiper, containerRef } = useSwiperKeyboardControl();

  useEffect(() => {
    getNetflixOriginalsTop10().then(setOriginals);
  }, []);

  return (
    <section className="p-4 pt-16 " ref={containerRef}>
      <h2 className="text-2xl font-bold text-white mb-4">
        넷플릭스 오리지널 인기순위
      </h2>
      <Swiper
        slidesPerView={5}
        className="!py-4 "
        mousewheel={{ forceToAxis: true }} // 수직 스크롤과 구분
        simulateTouch={true}
        grabCursor={true}
        onSwiper={registerSwiper}
        modules={[Keyboard, Mousewheel]}
        keyboard={{ enabled: true }}
      >
        {originals.map((movie, idx) => (
          <SwiperSlide key={movie.id} className="relative">
            <a tabIndex={0} href={void 0} className="cursor-pointer">
              {idx > 0 ? (
                <span className="rank-number absolute -bottom-0 -left-20">
                  {idx}
                </span>
              ) : (
                <></>
              )}

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.name || movie.title}
                className="relative rounded-sm shadow-lg h-[300px] object-cover z-1"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function Bandder() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getTop10PopularMovies().then((movies) => {
      const random = Math.floor(Math.random() * movies.length);
      setMovie(movies[random]);
    });
  }, []);

  if (!movie) return null;

  return (
    <section
      className="relative h-[80vh] text-white flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 상단 어둡게: 텍스트 가독성 */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        aria-hidden
      />

      {/* 하단 자연스러운 전환 */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"
        aria-hidden
      />

      {/* 하단 자연스러운 전환 */}
      <div
        className="absolute bottom-[-80px] left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"
        aria-hidden
      />

      {/* 텍스트 영역 */}
      <div className="relative z-20 p-8 max-w-3xl">
        <h1 className="text-4xl font-bold drop-shadow-lg mb-4">
          {movie.title}
        </h1>
        <p className="text-sm line-clamp-3 drop-shadow-md">{movie.overview}</p>
        <div className="mt-4 flex gap-4">
          <button className="bg-white text-black px-4 py-2 font-semibold rounded hover:bg-gray-200 transition">
            ▶ 재생
          </button>
          <button className="bg-gray-700/70 px-4 py-2 font-semibold rounded hover:bg-gray-600 transition">
            + 내가 찜한 리스트
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopularMovies().then(setMovies);
  }, []);

  return (
    <>
      <Bandder />

      <NetflixOriginalSectionSwiper />

      <CategoryRow
        genreName="한국 액션 인기 영화"
        genreId={80}
        country={"KR"}
      />
      <CategoryRow genreName="해외 인기 영화" genreId={28} />
      <CategoryRow genreName="시간순삭 모험 영화" genreId={12} country={"KR"} />
      <CategoryRow genreName="인기 에니메이션" genreId={16} country={"JP"} />
    </>
  );
}
