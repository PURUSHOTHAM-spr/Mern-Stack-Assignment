import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router"
import './App.css'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AddArticle from './components/AddArticle'
import AuthorDashboard from './components/AuthorDashboard'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import { Toaster } from "react-hot-toast"

function App() {
  const [count, setCount] = useState(0)
  const routerObj = createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      children:[
        {
          path:"/",
          element: <Home />
        },
        {
          path:"register",
          element: <Register />
        },
        {
          path:"login",
          element: <Login />
        },
        {
          path:"add-article",
          element:<AddArticle />
        },
        {
          path:"author-dash",
          element:<AuthorDashboard />
        },
        {
          path:"user-dash",
          element:<UserDashboard/>
        },
        {
          path:"admin-dash",
          element:<AdminDashboard/>
        },
      ]
    }
  ]);
  return (
    // <div>
    // <RouterProvider router={routerObj}></RouterProvider>
    // </div>
    <> 
    <Toaster position="top-center" reverseOrder={false}/>
    <RouterProvider router={routerObj}/>
   </>

  )
}

export default App