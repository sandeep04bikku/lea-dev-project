import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import categoryIcon from "../../assets/online-course_10180838.png";
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../../slices/categorySlice';
import { showPromiseNotification } from '../../common/notification';
import { validateNoStartOrEndSpace } from '../../cutomValidationField';
import uploadToS3 from '../../common/s3AwsService';

const CategoryModal = ({ update, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileRef = useRef(null);
    const navigate = useNavigate();

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

    // Set initial values based on whether we are updating or adding a new category
    const initialValues = useMemo(() => ({
        image: update.status && update?.data ? update?.data?.image : null,
        name: update.status && update?.data ? update?.data?.name : ''
    }), [update]);

    useEffect(() => {
        if (update.status && update?.data) {
            setImagePreview(update?.data?.image);
        } else {
            setImagePreview(null)
        }

    }, [update]);

    // Validation schema for Formik
    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            image: Yup.mixed().required('Please upload an image'),
            name: Yup.string().required('Please enter a name')
                .min(2, "Name must be at least 2 characters")
                .max(50, "Name must be at most 50 characters")
                .test('no-start-or-end-space', 'Name must not start or end with whitespace', validateNoStartOrEndSpace),
        });
    }, []);

    // Handle image change in the image input field
    const handleImageChange = useCallback((e, setFieldValue) => {
        const file = e.target.files[0];

        // Generate a new file name based on the current timestamp and replace spaces with underscores
        const timestamp = new Date().getTime();
        const newFileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;

        // Create a new File object with the updated name
        const newFile = new File([file], newFileName, { type: file.type });

        // Generate the image preview URL
        const imagePreviewUrl = URL.createObjectURL(newFile);
        setImagePreview(imagePreviewUrl);

        // Set the new file in Formik's field value
        setFieldValue('image', newFile);


        // const file = event.currentTarget.files[0];
        // const imagePreviewUrl = URL.createObjectURL(file);
        // setImagePreview(imagePreviewUrl);
        // setFieldValue('image', file.name);
    }, []);

    // Handle form submission
    const handleSubmit = useCallback(
        async(values, { setSubmitting }) => {
            console.log(values,"value");
            
            const imageData = await uploadToS3(values?.image, "category", "public-read-write");
            if (imageData) {
                console.log(imageData, "imgData");
                values.image = values.image.name
            } else{
                values.image = ""
            }

            console.log(values,"after image upload values");
            
            const myPromise = new Promise((resolve, reject) => {
                if (update.status) {
                    dispatch(
                        updateCategory({
                            payload: {
                                ...values,
                                id: update?.data?.id
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


                } else {

                    dispatch(
                        addCategory({
                            payload: {
                                ...values,
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
                }
            });

            showPromiseNotification(myPromise);
            setSubmitting(false);
            onClose();
        },
        [onClose, update]
    );

    const uploadImage = () => {
        fileRef.current.click();
    };

    return (
        <>
            {isOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div
                        className="modal-dialog modal-dialog-centered"
                        ref={modalRef}
                        style={{ minWidth: '40%' }}
                    >
                        <div className="modal-content" style={{ height: 'auto', overflow: 'auto' }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "22px" }}>
                                    {update.status ? "Edit Category Details" : "Add Category"}
                                </h5>
                                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                            </div>

                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                                {({ isSubmitting, setFieldValue, errors }) => (
                                    <Form>
                                        <div className="modal-body">
                                            <div className="mb-3 text-center">
                                                <img
                                                    src={imagePreview || categoryIcon}
                                                    alt="Category Avatar"
                                                    style={{ width: "100px", height: "100px", cursor: "pointer", borderRadius: "50%" }}
                                                    onClick={uploadImage}
                                                />
                                                <input
                                                    type="file"
                                                    name="image"
                                                    ref={fileRef}
                                                    className={`form-control ${errors.image ? 'is-invalid' : ''} d-none`}
                                                    accept="image/*"
                                                    onChange={(e) => handleImageChange(e, setFieldValue)}
                                                />
                                                <ErrorMessage name="image" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"><sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Name</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                    placeholder="Enter name"
                                                />
                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                {update.status ? "Update" : "Submit"}
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

export default CategoryModal;
