import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
// import { getToken } from "../common/LocalStorageService";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace(process.env.REACT_APP_BASE_URL);
      console.log("-=-=-===========",process.env.REACT_APP_BASE_URL)
    } else {
      setIsRender(true);
    }
  }, [isLoggedIn, navigate]);
  if (!isRender) {
    return null;
  }
  return <Outlet />;
};

export default PrivateLayout;
