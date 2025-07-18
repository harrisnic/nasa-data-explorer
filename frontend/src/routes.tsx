import {createBrowserRouter} from "react-router-dom";
import type {RouteObject} from "react-router-dom";
import Layout from "@/pages/Layout.tsx";
import Homepage from "@/pages/Homepage.tsx";
import PhotoDetailPage from "@/pages/PhotoDetailPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import NasaBotPage from "@/pages/NasaBotPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            { index: true, element: <Homepage/> },
            { path: 'photos/:id', element: <PhotoDetailPage/> },
            { path: 'nasa-bot/', element: <NasaBotPage/> },
        ]
    }
] as RouteObject[])

export default router;
