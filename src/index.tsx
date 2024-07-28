import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Main from "./Main";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import Register from "./Register";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		children: [
			{
				path: "",
				element: <Main />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "dashboard",
				element: <Dashboard />,
			},
		],
	},
]);

root.render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</LocalizationProvider>
	</React.StrictMode>
);
