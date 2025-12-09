import MovieCard from "./components/MovieCard";
import { TMDB_BASE_URL, TMDB_API_KEY } from "./constants";
import './index.scss'
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import { useSupabaseAuth } from "./supabase"; 
import "swiper/css";
import "swiper/css/navigation";
import { useOutletContext } from "react-router-dom";  //Layout에서 contextAPI로 넘겨받음

const options = { method: "GET", headers: { accept: "application/json" } };

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getUserInfo } = useSupabaseAuth();

  const { searchQuery = "" } = useOutletContext() || {};
//NavBar에서 입력할때마다 바뀌는 값
const [ debouncedQuery, setDebouncedQuery ] = useState("");

useEffect(() => {
    async function fetchUser() {
      try {
        await getUserInfo(); // LocalStorage에 userInfo 저장됨
      } catch (err) {
        console.error("유저 정보 가져오기 실패:", err);
      }
    }
    fetchUser();
  }, [getUserInfo]);

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);
// 영화 이름 입력후 500ms 동안 추가 입력이 없으면 디바운스 실행
// 입력을 멈춘 순간 한 번만 실제 검색실행
    return() => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
//searchQuery가 바뀔때마다 새로은 timeout 시작 이전 setimeout은 clearTimeout로 제거
  
  useEffect(() => {
    async function fetchMovies(){
      try{                                        // 정상적인 호출
        setLoading(true);

        let url;
        // 값이 나중에 정해지기 때문에 let 사용 const 썻다가 고생함
        const trimmed = debouncedQuery.trim();
        

        if (trimmed !== ""){
          const query = encodeURIComponent(trimmed);  
          //encodeURIComponent로 URL을 안전한 문자로 바꿔서 안정화시킴
          url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=ko-
          KR&query=${query}&page=1&include_adult=false`;      
          // 검색어가 있을 때 TMDB 검색 API 사용 
        }else{
          url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=ko-
          KR&page=1`;                                   
          //검색어가 없을 때 기존처럼 인기 영화 API 사용
        }
        const res = await fetch(url, options);
        const data = await res.json();
        setMovies(data.results || []); 
      } catch (err){                                // 호출 실패시 에러로그
        console.error("영화 목록 불러오기 실패;", err);
        setMovies([]);                              // 불러오기 실패시 빈배열로 처리
      }finally{                                     // 성공 실패 없이 빈화면 안나오게
        setLoading(false);
      }
    }
// searchQuery는 입력하자마자 반응
// debouncedQuery 안에 searchQuery를 넣어서 입력되고 내가 정한 시간만큼 지연 후 반응


  fetchMovies();
  },[debouncedQuery]);                  //이제 debouncedQuery가 바뀔 때마다 호출 검색어 입력시  movie 호출 

  if(loading){
    return<p style={{ color:"white"}}>로딩 중...</p>;
  }

  return (
    <main>
      <div className='title-wrap'>
      <h1 className='movie_list' style={{ color: "white" }}>
        {debouncedQuery && debouncedQuery.trim() !== "" ? `검색결과:"${debouncedQuery}"`
        :"영화 목록"}
        </h1>
      </div>

      {movies.length === 0? (
        <p style={{ color:"white", textAlign:"center"}}>
          검색 결과가 없습니다.
        </p>                        // 검색 결과가 없을 때 
      ):(

      <section className="movie-grid">
        <Swiper
         modules={[Navigation, Pagination, Grid]} // 사용할 스위퍼 모듈
         grid={{ rows: 1, fill: "row" }}          // 1행 그리드
         spaceBetween={16}                        // 카드간간격
         slidesPerView={4}                        // 화면에 4장만 표시
         navigation                               // 포스터 좌우로 넘기는 기능
         pagination={{ clickable: true }}         
         style={{ paddingBottom: "20px" }}
       >
        {movies.map((movie)=> (
          <SwiperSlide key={movie.id}>
          <MovieCard
            id={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
            runtime={movie.runtime}
            release_date={movie.release_date}
          />
          </SwiperSlide>
        ))}
      </Swiper>
      </section>
  )}
    </main>
  );
}
