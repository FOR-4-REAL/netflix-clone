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
      <footer>공용 푸터</footer>
    </>
  );
}
