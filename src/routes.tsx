import { BrowserRouter, Route } from "react-router-dom";
import People from "./pages/People";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" element={<People />} />
    </BrowserRouter>
  );
};
