
import Footer from "./Footer";
import Header from "./Header";
import {Outlet} from "react-router";

function RootLayout() {
  return (
    <div>
       <Header/>
       <div className="ex">
        <Outlet/>
       </div>
       <Footer/>

    </div>
  )
}

export default RootLayout