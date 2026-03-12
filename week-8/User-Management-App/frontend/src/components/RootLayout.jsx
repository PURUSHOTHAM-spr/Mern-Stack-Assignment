import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div>
      <Header />
      <div className="min-h-screen mx-20 mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
