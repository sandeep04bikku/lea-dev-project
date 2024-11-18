import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useRef, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { assigncourse } from '../../slices/courseSlice';
import { showPromiseNotification } from '../../common/notification';

const AssignModel = ({ isOpen, onClose, course_id }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

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

    const trainerList  = []

    useEffect(() => {
        const timer = setTimeout(() => {
            // dispatch(trainers({ limit: 1000, filter: "active" }));
        }, 100);

        return () => clearTimeout(timer);
    }, [dispatch]);

    const initialValues = useMemo(() => ({
        trainer_id: ''
    }), []);

    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            trainer_id: Yup.string().required('Please select a trainer')
        });
    }, []);

    const handleSubmit = (values, { setSubmitting }) => {
        const myPromise = new Promise((resolve, reject) => {

            dispatch(
                assigncourse({
                    payload: {
                        ...values,
                        course_id
                    },
                })
            )
                .then((response) => {
                    if (response.payload.code === 200) {
                        resolve(response.payload);
                    } else {
                        reject(response.payload);
                    }
                });
        });

        showPromiseNotification(myPromise);
        setSubmitting(false);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div
                        className="modal-dialog modal-dialog-centered"
                        ref={modalRef}
                        style={{ minWidth: '30%', minHeight: '50%' }}
                    >
                        <div className="modal-content" style={{ height: 'auto', overflow: 'auto' }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "22px" }}>
                                    Assign Trainer
                                </h5>
                                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                            </div>

                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                                {({ isSubmitting, touched, errors }) => (
                                    <Form>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label"><sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Trainer</label>
                                                <Field
                                                    as="select"
                                                    name="trainer_id"
                                                    className={`form-control ${touched.trainer_id && errors.trainer_id ? "is-invalid" : ""}`}
                                                >
                                                    <option value="" label="Select a trainer" />
                                                    {trainerList?.data && trainerList?.data.map(trainer => (
                                                        <option key={trainer.id} value={trainer.id} label={trainer.full_name} />
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="trainer_id" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                Assign
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                                Close
                                            </button>
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

export default AssignModel;
