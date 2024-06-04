import { ConfigProvider, theme } from "antd";
import CustomHeader from "./components/CustomHeader";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import People from "./pages/People";
import { Home } from "./pages/Home";

const AppLayout = () => {
  return (
    <>
      <CustomHeader />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/characters", element: <People /> },
    ],
  },
]);

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
