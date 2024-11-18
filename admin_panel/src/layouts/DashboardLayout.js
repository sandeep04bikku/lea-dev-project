import React from "react";
import { Outlet } from "react-router-dom";
import AppTopbar from "../components/AppTopbar";
import AppSidebar from "../components/AppSidebar/AppSidebar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  return (
    <>

        <AppTopbar />
        <AppSidebar />
        <Outlet />
        <Footer />

    </>
  );
};

export default DashboardLayout;
