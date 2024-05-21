import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Portal from "../pages/Portal";
import SearchCourse from "../pages/SearchCourse";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";

export const router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search-course",
        element: <SearchCourse />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/portal",
        element: <Portal />,
      },
    ],
  },
];

const appRouter = createBrowserRouter(router);
export default appRouter;
