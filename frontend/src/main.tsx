import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/login";
import "./index.css";
import Layout from "./layout";
import Dashboard from "./routes/dashboard";
import Order from "./routes/order";
import Menu from "./routes/menu";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "/order",
				element: <Order />,
			},
			{
				path: "/menu",
				element: <Menu />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
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
