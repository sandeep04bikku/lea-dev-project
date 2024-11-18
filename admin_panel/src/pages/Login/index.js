import React, { useCallback, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { showErrorMessage, showPromiseNotification, showSuccessMessage } from "../../common/notification";
import logo_icon from "../../assets/leaIcon.png"

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Define validation schema using Yup
  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string()
        .required("Please enter email")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Please enter a valid email"
        ),
      password: Yup.string()
        .required("Please enter password")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    });
  }, []);

  // Initial form values
  const initialValues = useMemo(() => {
    return { email: "", password: "", rememberMe: true };
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (values, { setSubmitting }) => {
      const myPromise = new Promise((resolve, reject) => {
        dispatch(
          loginUser({
            payload: {
              ...values,
              login_type: "S",
              device_name: "apple",
              device_token: "aplle5454",
              device_type: "W",
              os_version: "16.0",
              app_version: "1.0",
            },
          })
        )
          .then((response) => {
            console.log(response, "user res");
            if (response.payload.code === 200) {
              resolve(response.payload);
              navigate("/dashboard");
            } else {
              reject(response.payload);
            }
          });
      });

      showPromiseNotification(myPromise);
      setSubmitting(false);
    },
    [dispatch, navigate]
  );

  // // Handle form submission
  // const handleSubmit = useCallback(
  //   (values, { setSubmitting }) => {
  //     const loginPromise = dispatch(
  //       loginUser({
  //         payload: {
  //           ...values,
  //           login_type: "S",
  //           device_name: "apple",
  //           device_token: "aplle5454",
  //           device_type: "W",
  //           os_version: "16.0",
  //           app_version: "1.0",
  //         },
  //       })
  //     ).unwrap();

  //     showPromiseNotification(loginPromise, "Logging in...");

  //     // loginPromise
  //     //   .then((response) => {
  //     //     console.log(response, "login respo");
  //     //     if (response.code === 200) {
  //     //       showSuccessMessage(response.message, {});
  //     //       // navigate("/dashboard");
  //     //     } else {
  //     //       showErrorMessage(response.message, {});
  //     //     }


  //     //   })
  //     //   .catch((err) => {
  //     //     console.error("Login error:", err);
  //     //     showErrorMessage(err.message || "Login failed");
  //     //   })
  //     //   .finally(() => {
  //     //     setSubmitting(false); // Ensure form is no longer submitting
  //     //   });
  //   },
  //   [dispatch, navigate]
  // );

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div className="account-pages authentication-bg authentication-bg-pattern d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="card bg-pattern">
              <div className="card-body p-4">
                <div className="text-center w-75 m-auto">
                  <div className="auth-logo">
                    <Link to="/" className="logo logo-dark text-center mb-3">
                      <img src={logo_icon} alt="logo_icon" style={{ height: "12vh" }} />
                      {/* <h2 className="" style={{ color: "#66CDAA" }}>
                        LEA.TRAINING
                      </h2> */}
                    </Link>
                  </div>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, submitCount, errors }) => {
                    // console.log(errors, "hjsjfsdhfksdf");
                    return (
                      <Form>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email address
                          </label>
                          <Field
                            type="text"
                            name="email"
                            id="email"
                            className={`form-control ${submitCount > 0 && errors.email ? "is-invalid" : ""
                              }`}
                            placeholder="Enter your email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <div className="input-group input-group-merge">
                            <Field
                              type={showPassword ? "text" : "password"}
                              name="password"
                              id="password"
                              className={`form-control ${submitCount > 0 && errors.password
                                ? "is-invalid"
                                : ""
                                }`}
                              placeholder="Enter your password"
                            />
                            <div
                              className={`input-group-text ${showPassword ? "show-password" : ""
                                } `}
                              onClick={togglePasswordVisibility}
                              style={{ cursor: "pointer" }}
                            >
                              <span className="password-eye"></span>
                            </div>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>


                        </div>
                        <div className="text-center d-grid">
                          <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Log In
                          </button>
                        </div>
                      </Form>
                    )
                  }}
                </Formik>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-center">
                <p>
                  <Link
                    to="/forget-password"
                    className="text-white-50 ms-1"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
