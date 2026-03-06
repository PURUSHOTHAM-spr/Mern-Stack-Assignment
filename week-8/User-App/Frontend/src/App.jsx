import { createBrowserRouter, RouterProvider } from "react-router"
import RootLayout from "./components/RootLayout"
import AddUser from "./components/AddUser"
import UserList from "./components/UserList"

function App() {

  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "userList",
          element: <UserList />
        },
        {
          path: "addUser",
          element: <AddUser /> 
        }
      ]
    }
  ])

  return <RouterProvider router={routerObj} />
}

export default App