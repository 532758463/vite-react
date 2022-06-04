import { Route, Routes, BrowserRouter } from 'react-router-dom';
import VirtualList from './pages/virtual-list';
import TableList from './pages/virtual-table';
import type { RouteProps } from 'react-router-dom';
import Navigation from './pages/index';
import Console from './pages/console';
interface IRoute extends RouteProps {
  path: string;
  name: string;
}

export const routes: IRoute[] = [
  {
    path: '/list',
    element: <VirtualList />,
    name: '虚拟列表'
  },
  {
    path: '/table',
    element: <TableList />,
    name: '表格'
  },
  {
    path: '/console',
    element: <Console />,
    name: '输出结果'
  }
];

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
