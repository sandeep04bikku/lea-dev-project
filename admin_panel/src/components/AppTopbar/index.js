import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../slices/authSlice";
import { logoutAdmin } from "../../apis/apiHandler";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/leaIcon1.png"
import userIcon from "../../assets/avatar.png"
import ChangePassword from "../../pages/password/changePassword/model";

const AppTopbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isModelOpen, setIsModelOpen] = useState(false);

  console.log(userInfo, "userinfo");

  const handleLogout = useCallback(() => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-outline-success",
        cancelButton: "btn btn-outline-danger mx-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You will stepout from the system",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          logoutAdmin({})
            .then((response) => {
              if (response.code === 200) {
                dispatch(logout());
              }
            })
            .catch((err) => {
              console.log("logout err: ", err);
            })

        }
      });
  }, [dispatch]);

  const handleChangePassword = () => {
    setIsModelOpen(true);
  }

  const handleCloseModal = () => {
    setIsModelOpen(false)
  };

  return (
    <>
      <div className="navbar-custom">
        <div className="container-fluid">
          <ul className="list-unstyled topnav-menu float-end mb-0">
            <li className="dropdown notification-list topbar-dropdown">
              <a
                className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <img
                  src={userInfo?.image ? userInfo?.image : userIcon}
                  alt="user-image"
                  className="rounded-circle"
                />
                <span className="pro-user-name ms-1">
                  {userInfo?.full_name} <i className="mdi mdi-chevron-down" />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end profile-dropdown ">
                {/* item*/}
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome !</h6>
                </div>
                {/* item*/}
                <Link
                  to={""}
                  className="dropdown-item notify-item"
                >
                  <i className="fe-user" />
                  <span>My Account</span>
                </Link>
                {/* item*/}
                {/* <a
                href="javascript:void(0);"
                className="dropdown-item notify-item"
              >
                <i className="fe-settings" />
                <span>Settings</span>
              </a> */}
                {/* item*/}
                <Link
                  onClick={handleChangePassword}
                  className="dropdown-item notify-item"
                >
                  <i className="fe-lock" />
                  <span>Change Password</span>
                </Link>
                <div className="dropdown-divider" />
                {/* item*/}
                <Link
                  className="dropdown-item notify-item"
                  onClick={handleLogout}
                >
                  <i className="fe-log-out" />
                  <span>Logout</span>
                </Link>
              </div>
            </li>
          </ul>
          {/* LOGO */}
          <div className="logo-box">
            <a href="#" className="logo logo-dark text-center">
              <span className="logo-sm">
                {/*<img src="../assets/images/logo-sm.png" alt="logo" height={22} />*/}
                <span class="logo-lg-text-light">UBold</span>
              </span>
              <span className="logo-lg">
                {/* <img src="../assets/images/logo-dark.png" alt="logo" height={20} /> */}
                <span class="logo-lg-text-light">U</span>
              </span>
            </a>
            <Link to="/dashboard" className="logo logo-light text-center">
              <span className="logo-sm">
                {/* <img src={logoIcon}  alt="logo" height={22} /> */}
              </span>
              <span className="logo-lg">
                {/* <img src={logoIcon} alt="logo" height={55} width={150} /> */}
              </span>
            </Link>
          </div>
          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light">
                <i className="fe-menu" />
              </button>
            </li>
            <li>
              {/* Mobile menu toggle (Horizontal Layout)*/}
              <a
                href="#"
                className="navbar-toggle nav-link"
                data-bs-toggle="collapse"
                data-bs-target="#topnav-menu-content"
              >
                <div className="lines">
                  <span />
                  <span />
                  <span />
                </div>
              </a>
              {/* End mobile menu toggle*/}
            </li>

          </ul>
          {/* <div className="clearfix" /> */}
        </div>
      </div>

      <ChangePassword
        isOpen={isModelOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AppTopbar;
