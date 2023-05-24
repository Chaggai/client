import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import LoginPage from "./LoginPage";
import ErrorPage from "./ErrorPage";
import Movies from "./Movies";
import Users from "./Users";

import Layout from "../components/Layout";

import ShowAllMovies from "../components/Movies";
import CreateMovie from "../components/Movies/CreateMovie";
import UpdateMovie from "../components/Movies/UpdateMovie";

import ShowAllUsers from "../components/Users";
import CreateUser from "../components/Users/CreateUser";
import UpdateUser from "../components/Users/UpdateUser";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/authSlice";
import ShowAllMembers from "../components/Members";
import CreateMember from "../components/Members/CreateMember";
import UpdateMember from "../components/Members/UpdateMember";
import Members from "./Members";

const Root = () => {
  const token = useSelector(selectCurrentToken);
  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Layout /> : <Navigate to="/login" />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "movies",
          element: <Movies />,
          children: [
            { path: "all", element: <ShowAllMovies /> },
            { path: "create", element: <CreateMovie /> },
            { path: "update/:movieId", element: <UpdateMovie /> },
          ],
        },
        {
          path: "users/",
          element: <Users />,
          children: [
            { path: "all", element: <ShowAllUsers /> },
            { path: "create", element: <CreateUser /> },
            { path: "update/:userId", element: <UpdateUser /> },
          ],
        },
        {
          path: "members/",
          element: <Members />,
          children: [
            { path: "all", element: <ShowAllMembers /> },
            { path: "create", element: <CreateMember /> },
            { path: "update/:memberId", element: <UpdateMember /> },
          ],
        },
      ],
    },
    {
      path: "login",
      element: !token ? <LoginPage /> : <Navigate to="/movies/all" />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Root;
