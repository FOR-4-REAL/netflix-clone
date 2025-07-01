import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";
import tmdb from "../utils/HTTP";
import useSwiperKeyboardControl from "../utils/swiper";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type Props = {
  genreName: string;
  genreId: number;
  country?: string;
};

export default function CategoryRow({ genreName, genreId, country }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { containerRef, registerSwiper } = useSwiperKeyboardControl();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await tmdb.get(`/discover/movie?with_genres=${genreId}`, {
        params: {
          with_genres: genreId,
          with_origin_country: country ?? null, // 기본값을 "KR"로
          sort_by: "popularity.desc",
          language: "ko",
          include_adult: false,
          with_watch_providers: 8,
          watch_region: "KR",
          certification_country: "KR",
          certification_lte: "12",
        },
      });
      setMovies(res.data.results);
    };
    fetchMovies();
  }, [genreId, country]);

  return (
    <section className="p-4 pt-8" ref={containerRef}>
      <h2 className="text-2xl font-bold text-white mb-4">{genreName}</h2>
      <Swiper
        spaceBetween={16}
        onSwiper={registerSwiper}
        mousewheel={{ forceToAxis: true }}
        simulateTouch
        grabCursor
        modules={[Keyboard, Mousewheel]}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 2.5,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 5.5,
            spaceBetween: 16,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="py-4">
            <a href="#" tabIndex={0} className="cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md shadow-md w-[280px] h-[360px] object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
