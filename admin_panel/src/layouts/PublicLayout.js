import { useSelector } from "react-redux";

const { useState, useEffect } = require("react");
const { useNavigate, Outlet } = require("react-router-dom");

const PublicLayout = () => {
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.replace(process.env.REACT_APP_BASE_URL + "dashboard");
      console.log("---------public--",process.env.REACT_APP_BASE_URL)
      // navigate("/dashboard");
    } else {
      setIsRender(true);
    }
  }, [isLoggedIn, navigate]);

  if (!isRender) {
    return null;
  }

  return <Outlet />;
};

export default PublicLayout;
