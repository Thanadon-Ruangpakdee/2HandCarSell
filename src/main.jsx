import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import CarList from './pages/CarList';
import Welcome from './pages/Welcome';  
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <div>404 not Found</div>,
      children: [
        { path: '/', element: <Welcome />, },
        { path: '/Dashboard', element: <Dashboard />, },
        { path: '/Hightlight', element: <HighlightedCars />,},
        { path: '/CarList', element: <CarList />, }
      ],
    },
  ],
  { basename: '/2HandCarSell', }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
