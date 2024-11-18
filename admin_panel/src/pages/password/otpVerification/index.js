import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { decrypt } from "../../../common/enc_dec";
import { otpverify, resendOtp } from "../../../slices/authSlice";
import logo_icon from "../../../assets/leaIcon.png"
import { showPromiseNotification } from "../../../common/notification";
import Spinner from "../../../components/spinner";

const OtpVerification = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const [timer, setTimer] = useState(() => {
        const storedTimer = localStorage.getItem("otpTimer");
        return storedTimer ? parseInt(atob(storedTimer), 10) : 59;
    });
    const [canResend, setCanResend] = useState(false);

    const queryParams = new URLSearchParams(location.search);
    const _email = decrypt(queryParams.get("email"));
    const { email } = location.state || ""

    console.log(queryParams, "email", _email);

    const otpValidationSchema = useMemo(() => {
        return Yup.object({
            email: Yup.string()
                .required("Please enter Email")
                .email("Please enter valid email"),
            otp: Yup.string()
                .required("Please enter OTP")
                .matches(/^\S*$/, "OTP should not contain spaces"),
        });
    }, []);

    const otpInitialValues = useMemo(() => {
        return { email: email, otp: "" };
    }, [email]);

    const handleVerifyOtp = useCallback(
        async (values, { setSubmitting }) => {
            const myPromise = new Promise((resolve, reject) => {
                dispatch(
                    otpverify({
                        payload: {
                            ...values,
                        },
                    })
                )
                    .then((response) => {
                        console.log(response, "user res");
                        if (response.payload.code === 200) {
                            resolve(response.payload);
                            localStorage.removeItem("otpTimer");
                            navigate("/set-password", { state: { id: response?.payload?.data?.id } });
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

    const handleResendOtp = useCallback(async () => {
        const myPromise = new Promise((resolve, reject) => {
            setIsLoading(true);
            dispatch(
                resendOtp({
                    payload: {
                        email,
                    },
                })
            )
                .then((response) => {
                    console.log(response, "user res");
                    if (response.payload.code === 200) {
                        resolve(response.payload);
                        setTimer(59); // Reset timer to 59 seconds
                        localStorage.setItem("otpTimer", btoa("59")); // Update localStorage with new timer value encoded with btoa
                        setCanResend(false); // Disable resend button

                        // Start countdown
                        const countdown = setInterval(() => {
                            setTimer((prevTimer) => {
                                const newTimer = prevTimer - 1;
                                localStorage.setItem("otpTimer", btoa(newTimer.toString())); // Encode new timer value with btoa
                                if (newTimer <= 0) {
                                    clearInterval(countdown);
                                    setCanResend(true); // Enable resend button when timer reaches 0
                                }
                                return newTimer;
                            });
                        }, 1000);

                        // Clean up interval on component unmount or re-render
                        return () => clearInterval(countdown);
                    } else {
                        reject(response.payload);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });

        // if (!isLoading) {
        //     showPromiseNotification(myPromise);
        // }


    }, [dispatch, email]);

    useEffect(() => {
        let countdown;
        const storedTimer = localStorage.getItem("otpTimer");
        const parsedTimer = storedTimer ? parseInt(atob(storedTimer), 10) : 59;
        setTimer(parsedTimer);

        if (parsedTimer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTimer = prevTimer - 1;
                    localStorage.setItem("otpTimer", btoa(newTimer.toString())); // Encode new timer value with btoa
                    if (newTimer <= 0) {
                        clearInterval(countdown);
                        setCanResend(true); // Enable resend button when timer reaches 0
                    }
                    return newTimer;
                });
            }, 1000);
        } else {
            setCanResend(true); // Enable resend button if timer is already at 0
        }

        // Clean up interval on component unmount or re-render
        return () => clearInterval(countdown);
    }, []);

    return (
        <div className="account-pages authentication-bg authentication-bg-pattern d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
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
                                    <p className="text-muted mb-1 mt-3">
                                        {!isLoading && "OTP sent to your email."}
                                    </p>
                                </div>

                                <Formik
                                    initialValues={otpInitialValues}
                                    validationSchema={otpValidationSchema}
                                    onSubmit={handleVerifyOtp}
                                >
                                    {({ isSubmitting, submitCount, errors }) => (
                                        <Form>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    Email address
                                                </label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    readOnly
                                                    className={`form-control ${submitCount > 0 && errors.email ? "is-invalid" : ""
                                                        }`}
                                                    value={email}
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="otp" className="form-label">
                                                    OTP
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="otp"
                                                    id="otp"
                                                    className={`form-control ${submitCount > 0 && errors.otp ? "is-invalid" : ""
                                                        }`}
                                                    placeholder="Enter OTP"
                                                />
                                                <ErrorMessage
                                                    name="otp"
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
                                                    Verify OTP
                                                </button>
                                            </div>
                                            <div className="text-center mt-3">
                                                {timer > 0 ? (
                                                    <p className="text-muted">
                                                        Resend OTP in {timer} seconds
                                                    </p>
                                                ) : (
                                                    <button
                                                        className="btn btn-link"
                                                        type="button"
                                                        onClick={handleResendOtp}
                                                        disabled={!canResend}
                                                    >
                                                        {isLoading ? <Spinner /> : "Resend OTP"}
                                                    </button>
                                                )}
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

export default OtpVerification;
