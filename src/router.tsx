import { Route, Routes, BrowserRouter } from "react-router-dom";
import BigList from "./pages/big-list";
import BigData from "./pages/big-data";
import TableList from "./pages/virtual-table";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BigList />} />
        <Route path="/big" element={<BigData />} />
        <Route path="/table" element={<TableList />} />
      </Routes>
    </BrowserRouter>
  );
};
