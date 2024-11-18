import React, { useCallback, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { encrypt } from "../../../common/enc_dec";
import { forgetPassword } from "../../../slices/authSlice";
import logo_icon from "../../../assets/leaIcon.png";
import Spinner from "../../../components/spinner";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string().required("Please enter Email").email("Please enter valid email"),
    });
  }, []);

  const initialValues = useMemo(() => {
    return { email: "" };
  }, []);

  const handleSendOtp = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true);

      dispatch(forgetPassword({ payload: values }))
        .then((response) => {
          if (response.payload.code === 200) {
            localStorage.setItem("otpTimer", btoa("59"));
            navigate(`/otp-verification?email=${encrypt(response.payload.data.email)}`, {
              state: { email: response.payload.data.email },
            });
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [dispatch, navigate]
  );

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
                      </span>
                    </Link>
                  </div>
                  <p className="text-muted mb-1 mt-3">
                    Enter your email address to receive an OTP.
                  </p>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSendOtp}
                >
                  {({ isSubmitting, submitCount, errors }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <Field
                          type="text"
                          name="email"
                          id="email"
                          className={`form-control ${submitCount > 0 && errors.email ? "is-invalid" : ""}`}
                          placeholder="Enter your email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="text-center d-grid">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? < Spinner /> : "Send OTP"}
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

export default ForgetPassword;










// import React, { useCallback, useMemo, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { encrypt } from "../../../common/enc_dec";
// import { forgetPassword } from "../../../slices/authSlice";
// import logo_icon from "../../../assets/leaIcon.png";
// import { showPromiseNotification } from "../../../common/notification";
// import Spinner from "../../../components/spinner";

// const ForgetPassword = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isSend, setIsSend] = useState(false);

//   const validationSchema = useMemo(() => {
//     return Yup.object({
//       email: Yup.string().required("Please enter Email").email("Please enter valid email"),
//     });
//   }, []);

//   const initialValues = useMemo(() => {
//     return { email: "" };
//   }, []);

//   const handleSendOtp = useCallback(
//     async (values, { setSubmitting }) => {
//       setSubmitting(true);
//       const myPromise = new Promise((resolve, reject) => {
//         dispatch(
//           forgetPassword({
//             payload: {
//               ...values,
//             },
//           })
//         )
//           .then((response) => {
//             console.log(response, "res forget");
//             if (response.payload.code === 200) {
//               resolve(response.payload);
//               localStorage.setItem("otpTimer", btoa("59"));
//               navigate(`/otp-verification?email=${encrypt(response.payload.data.email)}`, {
//                 state: { email: response.payload.data.email },
//               });
//             }
//           })
//           .finally(() => {
//             setSubmitting(false);
//           });
//       });

//       showPromiseNotification(myPromise)

//     },
//     [dispatch, navigate]
//   );

//   return (
//     <div className="account-pages authentication-bg authentication-bg-pattern d-flex justify-content-center align-items-center">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-8 col-lg-6 col-xl-4">
//             <div className="card bg-pattern">
//               <div className="card-body p-4">
//                 <div className="text-center w-75 m-auto">
//                   <div className="auth-logo">
//                     <Link to="/" className="logo logo-dark text-center mb-3">
//                       <span className="logo-lg">
//                         <img src={logo_icon} alt="logo_icon" style={{ height: "12vh" }} />
//                       </span>
//                     </Link>
//                   </div>
//                   <p className="text-muted mb-1 mt-3">
//                     Enter your email address to receive an OTP.
//                   </p>
//                 </div>

//                 <Formik
//                   initialValues={initialValues}
//                   validationSchema={validationSchema}
//                   onSubmit={handleSendOtp}
//                 >
//                   {({ isSubmitting, submitCount, errors }) => {
//                     console.log(isSubmitting, "submit");
//                     return (
//                       <Form>
//                         <div className="mb-3">
//                           <label htmlFor="email" className="form-label">
//                             Email address
//                           </label>
//                           <Field
//                             type="text"
//                             name="email"
//                             id="email"
//                             className={`form-control ${submitCount > 0 && errors.email ? "is-invalid" : ""}`}
//                             placeholder="Enter your email"
//                           />
//                           <ErrorMessage
//                             name="email"
//                             component="div"
//                             className="invalid-feedback"
//                           />
//                         </div>
//                         <div className="text-center d-grid">
//                           <button
//                             className="btn btn-primary"
//                             type="submit"
//                             disabled={isSubmitting}
//                           >
//                             {isSubmitting ? <Spinner /> : "Send OTP"}
//                           </button>
//                         </div>
//                       </Form>
//                     );
//                   }}
//                 </Formik>
//               </div>
//             </div>
//             <div className="row mt-3">
//               <div className="col-12 text-center">
//                 <p>
//                   <Link to="/" className="text-white-50 ms-1">
//                     Back to Login
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
