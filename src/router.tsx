import { Route, Routes, BrowserRouter } from "react-router-dom";
import BigList from "./pages/virtual-list";
import TableList from "./pages/virtual-table";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BigList />} />
        <Route path="/table" element={<TableList />} />
      </Routes>
    </BrowserRouter>
  );
};
