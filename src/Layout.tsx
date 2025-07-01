import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="w-full px-4 py-2 absolute z-1">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              className="w-28 h-[50px]"
              src="/src/assets/logo.png"
              alt="logo"
            />
            <h1 className="sr-only">Netflix</h1>
          </Link>

          <div className="flex justify-center items-center gap-4">
            <Link to="search">
              <div className="icon-search w-6 h-6" />

              <span className="sr-only">검색</span>
            </Link>
            <button>
              <div className="icon-bell w-6 h-6" />

              <span className="sr-only">검색</span>
            </button>
            <div>
              <img src="/src/assets/avatar.png" alt="user profile" />
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-black">
        <div className="max-w-[1149px] w-full px-4 py-6 mx-auto">
          <strong className="text-2xl text-white">NETFLIX</strong>
          <span className="block text-gray-400 text-xs mt-4 sm:text-sm">
            넷플릭스서비시스코리아 유한회사
          </span>
          <dl className="text-gray-400 text-xs sm:text-sm mt-4 space-y-2">
            {[
              { dt: "통신판매업신고번호:", dd: "제2018-서울종로-0426호" },
              { dt: "전화번호:", dd: "00-308-321-0161(수신자 부담)" },
              { dt: "대표:", dd: "레지널드 숀 톰프슨" },
              { dt: "이메일 주소:", dd: "korea@netflix.com" },
              {
                dt: "주소:",
                dd: "대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층",
              },
              { dt: "우편번호", dd: "03161" },
              { dt: "사업자등록번호", dd: "165-87-00119" },
              { dt: "클라우드 호스팅", dd: "Amazon Web Services Inc" },
            ].map(({ dt, dd }, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:space-x-2">
                <dt className="font-semibold">{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>
          <span className="text-gray-400 text-xs sm:text-sm mt-4 block">
            공정거래위원회 웹사이트
          </span>
        </div>
      </footer>
    </>
  );
}
