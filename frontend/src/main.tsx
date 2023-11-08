import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import App from './App';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <div>Strona główna</div>, 
      },
      // Tutaj dodać więcej ścieżek jako dzieci
    ],
  },
  // Możesz można dodać więcej głównych ścieżek poza App
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

// Renderowanie aplikacji z RouterProviderem
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
