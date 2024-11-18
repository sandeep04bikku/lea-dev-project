import React from "react";
import withLoadable from "../components/with-loadable";
import { useRoutes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { Helmet } from "react-helmet";
import { getUserPermissions, hasPermissionForModule, isAdmin } from "../common/LocalStorageService";

const PageNotFound = withLoadable(() => import("../pages/error/page404"));
const AccessDenied = withLoadable(() => import("../pages/error/page403"));
const DashboardPage = withLoadable(() => import("../pages/Dashboard"));
const LoginPage = withLoadable(() => import("../pages/Login"));
const ForgetPassword = withLoadable(() => import("../pages/password/forgetPassword"));
const OtpVerification = withLoadable(() => import("../pages/password/otpVerification"));
const SetPassword = withLoadable(() => import("../pages/password/createPassword"));
const Category = withLoadable(() => import("../pages/category"));
const CategoryView = withLoadable(() => import("../pages/category/view"));
const Course = withLoadable(() => import("../pages/course"));
const AddCourse = withLoadable(() => import("../pages/course/add"));
const UpdateCourse = withLoadable(() => import("../pages/course/update"));
const ViewCourse = withLoadable(() => import("../pages/course/view"));
const EnrollCourseUser = withLoadable(() => import("../pages/course/enrollUsers"));

const RouterContainer = () => {
  const routes = [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          path: "/",
          element: <LoginPage />,
        },
        {
          path: "/forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "/otp-verification",
          element: <OtpVerification />,
        },
        {
          path: "/set-password",
          element: <SetPassword />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
    {
      path: "/",
      element: <PrivateLayout />,
      children: [
        {
          element: <DashboardLayout />,
          children: [
            // {
            //   path: "*",
            //   element: <AccessDenied />,
            //   access: true
            // },
            {
              path: "/dashboard",
              element: <DashboardPage />,
              access: true
            },
            {
              path: "/category",
              element: <Category />,
            },
            {
              path: "/category/view",
              element: <CategoryView />,
            },
            {
              path: "/course",
              element: <Course />,
            },
            {
              path: "/course/add",
              element: <AddCourse />,
            },
            {
              path: "/course/edit",
              element: <UpdateCourse />,
            },
            {
              path: "/course/view",
              element: <ViewCourse />,
            },
            {
              path: "/course/enroll-users",
              element: <EnrollCourseUser />,
            },

          ],
        },
      ],

    },
  ];

  return (
    <>
      <Helmet>
        <script
          src={process.env.PUBLIC_URL + "/assets/js/app.js"}
          async
        ></script>
      </Helmet>
      {useRoutes(routes)}
    </>
  );
};

export default RouterContainer;
