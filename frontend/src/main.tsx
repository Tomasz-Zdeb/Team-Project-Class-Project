import React, { ReactNode, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./routes/login";
import Layout from "./layout";
import Dashboard from "./routes/dashboard";
import Order from "./routes/order";
import Menu from "./routes/menu";
import Admin from "./routes/admin";
import "./index.css";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const AdminRoute = ({ children }: ProtectedRouteProps) => {
    const accessToken = localStorage.getItem('accessToken');
    const [hasAdminAccess, setHasAdminAccess] = useState<boolean | null>(null);
    const alertShownRef = useRef(false); // useRef do śledzenia, czy alert został pokazany


     useEffect(() => {
        if (accessToken) {
            fetch("http://localhost:8000/admin-access-check/", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(response => {
                if (response.ok) {
                    setHasAdminAccess(true);
                } else {
                    if (!alertShownRef.current) { // Sprawdzenie flagi
                        alert("Brak uprawnień dostępu do panelu zarządzania.");
                        alertShownRef.current = true; // Ustawienie flagi na true
                    }
                    setHasAdminAccess(false);
                }
            }).catch(error => {
                console.error('Error:', error);
                setHasAdminAccess(false);
            });
        }
        // Resetowanie flagi przy odmontowaniu komponentu
        return () => {
            alertShownRef.current = false;
        };
    }, [accessToken]);

    if (hasAdminAccess === null) {
        return <div>Loading...</div>;
    }

    if (!hasAdminAccess) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "menu",
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
