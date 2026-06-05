import Home from "@/components/Home/Home";
import MeterTokenReader from "@/components/MeterTokenReader/MeterTokenReader";
import RootLayout from "@/Layouts/RootLayout";
import React from "react";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'meter-token-reader',
          Component: MeterTokenReader
        }
    ]
  },
]);

export default router;