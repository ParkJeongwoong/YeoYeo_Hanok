import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@components/layout/Layout";
import {
  Main,
  Service,
  Reservation,
  Room,
  Admin,
  Login,
  ReservationSuccess,
  ReservationCheck,
  ReservationDetail,
} from "../pages";

const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/room",
        element: <Room />,
      },
      {
        path: "/reservation",
        element: <Reservation />,
      },
      {
        path: "/reservation/success/:reservationId",
        element: <ReservationSuccess />,
      },
      {
        path: "/reservation/check",
        element: <ReservationCheck />,
      },
      {
        path: "/reservation/detail",
        element: <ReservationDetail />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default Router;
