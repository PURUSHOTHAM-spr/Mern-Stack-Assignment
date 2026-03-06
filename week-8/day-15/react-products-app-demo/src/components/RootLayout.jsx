
import Footer from "./Footer"
import Header from './Header'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div>
        <Header/>
        <div className="bg-amber-50">
            <Outlet/>

        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout