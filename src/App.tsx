import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./Layout";
import Home from "./pages/Home";

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
            path="details"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <div>Details Page</div>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
