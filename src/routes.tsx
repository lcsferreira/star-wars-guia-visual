import { Outlet, createBrowserRouter } from "react-router-dom";
import People from "./pages/People";
import { Home } from "./pages/Home";
import Movies from "./pages/Movies";
import CustomHeader from "./components/CustomHeader";
import Character from "./pages/Character";

const AppLayout = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1551794804-840faad68ba9?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <CustomHeader />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/characters", element: <People /> },
      { path: "/movies", element: <Movies /> },
      { path: "/characters/:id", element: <Character /> },
    ],
  },
]);

export default router;
