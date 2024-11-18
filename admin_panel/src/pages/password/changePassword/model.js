import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { changeNewPassword } from '../../../slices/authSlice';
import { showPromiseNotification } from '../../../common/notification';

const ChangePassword = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    const validationSchema = useMemo(() => {
        return Yup.object({
            old_password: Yup.string().required("Please enter old password")
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                ),
            new_password: Yup.string()
                .required("Please enter password")
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                ),
            confirm_password: Yup.string()
                .required("Please re-enter password")
                .oneOf([Yup.ref("new_password"), null], "Passwords should be match"),
        });
    }, []);

    const initialValues = useMemo(() => {
        return { old_password: "", new_password: "", confirm_password: "" };
    }, []);

    const handleSubmit = useCallback(
        (values, { setSubmitting }) => {
            const myPromise = new Promise((resolve, reject) => {
                dispatch(
                    changeNewPassword({
                        payload: {
                            old_password: values.old_password,
                            new_password: values.new_password,
                            confirm_password: values.confirm_password,
                        },
                    })
                )
                    .then((response) => {
                        if (response.payload.code === 200) {
                            resolve(response.payload);
                            onClose();
                        } else {
                            reject(response.payload);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });

            showPromiseNotification(myPromise);
            setSubmitting(false);
        },
        [dispatch, navigate, onClose]
    );

    const togglePasswordVisibility = (passwordType) => {
        switch (passwordType) {
            case 'old':
                setShowOldPassword(!showOldPassword);
                break;
            case 'new':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    return (
        <>
            {isOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "22px" }}>
                                    Change Password
                                </h5>
                                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                            </div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, errors, touched }) => (
                                    <Form>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="oldPassword" className="form-label">
                                                    Old Password
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type={showOldPassword ? "text" : "password"}
                                                        name="old_password"
                                                        id="oldPassword"
                                                        className={`form-control ${errors.old_password && touched.old_password ? "is-invalid" : ""}`}
                                                        placeholder="Enter your old password"
                                                    />
                                                    <div
                                                        className={`input-group-text ${showOldPassword ? "show-password" : ""}`}
                                                        onClick={() => togglePasswordVisibility('old')}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <span className="password-eye"></span>
                                                    </div>
                                                    <ErrorMessage
                                                        name="old_password"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="newPassword" className="form-label">
                                                    New Password
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type={showNewPassword ? "text" : "password"}
                                                        name="new_password"
                                                        id="newPassword"
                                                        className={`form-control ${errors.new_password && touched.new_password ? "is-invalid" : ""}`}
                                                        placeholder="Enter your new password"
                                                    />
                                                    <div
                                                        className={`input-group-text ${showNewPassword ? "show-password" : ""}`}
                                                        onClick={() => togglePasswordVisibility('new')}
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
                                                <label htmlFor="confirmPassword" className="form-label">
                                                    Confirm Password
                                                </label>
                                                <div className="input-group">
                                                    <Field
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        name="confirm_password"
                                                        id="confirmPassword"
                                                        className={`form-control ${errors.confirm_password && touched.confirm_password ? "is-invalid" : ""}`}
                                                        placeholder="Confirm your new password"
                                                    />
                                                    <div
                                                        className={`input-group-text ${showConfirmPassword ? "show-password" : ""}`}
                                                        onClick={() => togglePasswordVisibility('confirm')}
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
                                                    Change Password
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default ChangePassword;
