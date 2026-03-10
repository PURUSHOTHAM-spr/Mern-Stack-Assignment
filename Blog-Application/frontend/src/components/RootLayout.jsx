import React from 'react'
import Login from './Login'
import Home from './Home'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'

const RootLayout = () => {
  return (
    <div>
      <Header />
      <div className='min-w-screen'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout