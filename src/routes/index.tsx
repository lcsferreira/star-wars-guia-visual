import { Outlet, createBrowserRouter } from "react-router-dom";
import People from "../pages/People";
import { Home } from "../pages/Home";
import Movies from "../pages/Movies";
import CustomHeader from "../components/CustomHeader";
import Character from "../pages/Character";
import { RouteLayout } from "./style";
import Movie from "../pages/Movie";

const AppLayout = () => {
  return (
    <RouteLayout>
      <CustomHeader />
      <Outlet />
    </RouteLayout>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/characters", element: <People /> },
      { path: "/characters/:id", element: <Character /> },
      { path: "/movies", element: <Movies /> },
      { path: "/movies/:id", element: <Movie /> },
      {
        path: "/planets",
        element: <div>Planets</div>,
      },
      {
        path: "/species",
        element: <div>Species</div>,
      },
      {
        path: "/starships",
        element: <div>Starships</div>,
      },
      {
        path: "/vehicles",
        element: <div>Vehicles</div>,
      },
    ],
  },
]);

export default router;
