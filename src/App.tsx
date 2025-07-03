import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./Layout";
import Home from "./pages/Home";
import MovieDetailes from "./pages/Details";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Layout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="tv/*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MovieDetailes />
              </Suspense>
            }
          />
          <Route
            path="movie/*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MovieDetailes />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
