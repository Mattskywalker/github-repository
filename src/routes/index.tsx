import { RouteObject, Navigate } from "react-router-dom";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";


const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/favorites',
        element: <Favorites />,
    },
    {
        path: '*',
        element: <Navigate to={'/'} />,
    }
]

export default routes;