import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Festivals from "./pages/Festivals";
//import { loader as festivalsLoader } from "./pages/Festivals";
import { loader as loaderVenues } from "./pages/RootFestivals";
import { Suspense, lazy } from "react";
import Login from "./pages/Login";
import { tokenLoader } from "./util/auth";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import NewFestival from "./pages/NewFestival";
import { action as loginAction } from "./pages/Login";
import { acion as registrationAction } from "./pages/Registration";
import { action as logoutAction } from "./pages/Logout";
import { action as actionPostPatch } from "./components/FestivalForm";
import { action as festivalAction } from "./pages/FestivalDetail";
import RootFestivals from "./pages/RootFestivals";
const FestivalDetail = lazy(() => import("./pages/FestivalDetail"));
const EditFestival = lazy(() => import("./pages/EditFestival"));

const router = createBrowserRouter([
  {path: '*', element: <NotFound />},
  {
    path: "/",
    element: <Root />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/festivals",
        element: <RootFestivals />,
        id: "venues-list",
        loader: loaderVenues,

        children: [
          {
            index: true,
            element: <Festivals />,
            id: "festivals",
          },
          {
            path: ":festivalId",
            id: "festival-detail",
            loader: (meta) =>
              import("./pages/FestivalDetail").then((res) => res.loader(meta)),
            children: [
              {
                index: true,
                action: festivalAction,
                element: (
                  <Suspense
                    fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
                  >
                    <FestivalDetail />
                  </Suspense>
                ),
              },
              {
                path: "edit",
                action: actionPostPatch,
                element: (
                  <Suspense
                    fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
                  >
                    <EditFestival />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "new",
            element: <NewFestival />,
            action: actionPostPatch,
          },
        ],
      },
      { path: "login", element: <Login />, action: loginAction },
      { path: "registration", element: <Registration />, action: registrationAction},
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
