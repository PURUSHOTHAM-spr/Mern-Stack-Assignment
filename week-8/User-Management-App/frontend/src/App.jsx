import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import UserList from "./components/UsersList";
import User from "./components/User";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "add-user",
          element: <AddUser />,
        },
        {
          path: "users-list",
          element: <UserList />,
        },
        {
          path: "user",
          element: <User />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routerObj} />;
}

export default App;
