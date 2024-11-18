import React, { useCallback, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { setPassword } from "../../../slices/authSlice";
import logo_icon from "../../../assets/leaIcon.png"
import { showPromiseNotification } from "../../../common/notification";

const CreatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Access state from location object
  const { id } = location.state || {};

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log(id,"id");


  const validationSchema = useMemo(() => {
    return Yup.object({
      new_password: Yup.string()
        .required("Please enter password")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      confirm_password: Yup.string()
        .required("Please re-enter password")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    });
  }, []);

  const initialValues = useMemo(() => {
    return { new_password: "", confirm_password: "" };
  }, []);

  const handleSubmit = useCallback(
    (values, { setSubmitting }) => {
      const myPromise = new Promise((resolve, reject) => {

        dispatch(
          setPassword({
            payload: {
              ...values,
              id,
            },
          })
        )
          .then((response) => {
            console.log(response, "user res");
            if (response.payload.code === 200) {
              resolve(response.payload);
              navigate("/");
            } else {
              reject(response.payload);
            }
          });
      });

      showPromiseNotification(myPromise);
      setSubmitting(false);
    },
    [dispatch, id, navigate]
  );

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                      <span className="logo-lg">
                        <img src={logo_icon} alt="logo_icon" style={{ height: "12vh" }} />
                        {/* <h2 className="" style={{ color: "#66CDAA" }}>
                          LEA.TRAINING
                        </h2> */}
                      </span>
                    </Link>
                  </div>
                  {/* <p className="text-muted mb-4 mt-3">Enter your new password.</p> */}
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, submitCount, errors }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="new_password" className="form-label">
                          New Password
                        </label>
                        <div className="input-group">
                          <Field
                            type={showNewPassword ? "text" : "password"}
                            name="new_password"
                            id="new_password"
                            className={`form-control ${submitCount > 0 && errors.new_password ? "is-invalid" : ""
                              }`}
                            placeholder="Enter your new password"
                          />
                          <div
                            className={`input-group-text ${showNewPassword ? "show-password" : ""}`}
                            onClick={toggleNewPasswordVisibility}
                            style={{ cursor: "pointer" }}
                          >
                            <span className="password-eye"></span>
                          </div>
                          <ErrorMessage
                            name="new_password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">
                          Confirm Password
                        </label>
                        <div className="input-group">
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm_password"
                            id="confirm_password"
                            className={`form-control ${submitCount > 0 && errors.confirm_password ? "is-invalid" : ""
                              }`}
                            placeholder="Confirm your new password"
                          />
                          <div
                            className={`input-group-text ${showConfirmPassword ? "show-password" : ""}`}
                            onClick={toggleConfirmPasswordVisibility}
                            style={{ cursor: "pointer" }}
                          >
                            <span className="password-eye"></span>
                          </div>
                          <ErrorMessage
                            name="confirm_password"
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
                          Reset Password
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-center">
                <p>
                  <Link to="/" className="text-white-50 ms-1">
                    Back to Login
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

export default CreatePassword;
