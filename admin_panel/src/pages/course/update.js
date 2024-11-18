import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import courseIcon from "../../assets/online-course_10180838.png";
import { updateCourse } from "../../slices/courseSlice";
import { category } from "../../slices/categorySlice";
import { showPromiseNotification } from "../../common/notification";
import { validateNoStartOrEndSpace, validateNoTrailingDot } from "../../cutomValidationField";
import uploadToS3 from "../../common/s3AwsService";

const UpdateCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [imagePreview, setImagePreview] = useState(null);
    const imageFileRef = useRef(null);
    const fileRef = useRef(null);
    const { data } = location.state;
    const { categoryList, loading, error } = useSelector((state) => state.category);
    const languageList  = []

    useEffect(() => {

        // dispatch(language({ limit: 1000, filter: "active" }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(category({ limit: 1000, filter: "active" }));
    }, [dispatch]);
    ;

    const uploadCourseImage = () => {
        imageFileRef.current.click();
    };

    const uploadCourseImageEvent = (e, setFieldValue) => {
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

    };

    const uploadFileEvent = (e, setFieldValue) => {
        const file = e.target.files[0];

        // Generate a new file name based on the current timestamp and replace spaces with underscores
        const timestamp = new Date().getTime();
        const newFileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;

        // Create a new File object with the updated name
        const newFile = new File([file], newFileName, { type: file.type });

        // Set the new file in Formik's field value
        setFieldValue('file', newFile);
    };

    // Define validation schema using Yup
    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            category_id: Yup.string().required("Please select a category"),
            name: Yup.string()
                .required("Please enter the course name")
                .min(2, "Full Name must be at least 2 characters")
                .max(50, "Full Name must be at most 50 characters")
                .test('no-start-or-end-space', 'Name must not start or end with whitespace', validateNoStartOrEndSpace),
            description: Yup.string()
                .required("Please enter a description")
                .test('no-start-or-end-space', 'Description must not start or end with whitespace', validateNoStartOrEndSpace),
            validity: Yup.string()
                .required("Please enter validity")
                .matches(/^[1-9]\d*$/, "Validity must be a positive integer without any decimal or leading zeros"),
            price: Yup.string()
                .required("Please enter a price")
                .matches(/^\d+(\.\d{1,2})?$/, {
                    message: 'Please enter a valid price (e.g., 65.00)',
                })
                .test('no-trailing-dot', 'Price must not end with a dot', validateNoTrailingDot), // Using the common function here
            file: Yup.mixed().required("Please upload a file"),
            image: Yup.mixed().required("Please upload an image"),
            language: Yup.string().required("Please select a language"),
        });
    }, []);

    // Initial form values
    const initialValues = useMemo(() => {
        return {
            category_id: data.course_category.id || "", // Assuming data.course_category.id is the category_id
            name: data.name || "",
            description: data.description || "",
            validity: data.validity || "",
            price: data.price || "",
            file: data.file || null,
            image: data.image || null,
            language: data.language || "", // Assuming language is stored as a single value
        };
    }, [data]);

    useEffect(() => {
        if (data?.image) {
            setImagePreview(data.image); // Assuming `data.image` contains the URL or path to the existing image
        }
    }, [data]);

    // Handle form submission
    const handleSubmit = useCallback(
        async (values, { setSubmitting }) => {
            console.log(values, "value");

            const imageData = await uploadToS3(values?.image, "course", "public-read-write");
            const fileData = await uploadToS3(values?.file, "course_file", "public-read-write");
            if (imageData) {
                console.log(imageData, "imgData");
                values.image = values.image.name
            } else {
                values.image = ""
            }

            if (fileData) {
                console.log(fileData, "fileData");
                values.file = values.file.name
            } else {
                values.file = ""
            }

            console.log(values, "after image upload values");
            const myPromise = new Promise((resolve, reject) => {
                dispatch(
                    updateCourse({
                        payload: {
                            ...values,
                            id: data.id, // Assuming data.id is the course id
                        },
                    })
                )
                    .then((response) => {
                        if (response.payload.code === 200) {
                            resolve(response.payload);
                            navigate("/course");
                        } else {
                            reject(response.payload);
                        }
                    });
            });

            showPromiseNotification(myPromise);
            setSubmitting(false);
        },
        [dispatch, navigate, data]
    );

    return (
        <>
            <Helmet>
                <title>LEA.TRAINING | Course | Edit</title>
            </Helmet>

            <div className="content-page">
                <button className="btn btn-sm" onClick={() => navigate(-1)}>
                    <i className="fe-arrow-left font-22 avatar-title text-secondary" />
                </button>
                <div className="row justify-content-center">
                    <div className="col-md-12 col-xl-8 mt-4">
                        <div className="widget-rounded-circle card">
                            <div className="card-body">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <div>
                                        <h2 className="text-align-center">Edit Course Details</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting, setFieldValue, submitCount, errors }) => (
                                            <Form>
                                                <div className="mb-3 text-center">
                                                    <img
                                                        src={imagePreview || courseIcon}
                                                        alt="Course Preview"
                                                        style={{ width: "100px", height: "100px", cursor: "pointer", borderRadius: "50%" }}
                                                        onClick={uploadCourseImage}
                                                    />
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        ref={imageFileRef}
                                                        className={`form-control ${submitCount > 0 && errors.image ? "is-invalid" : ""} d-none`}
                                                        accept="image/*"
                                                        onChange={(e) => uploadCourseImageEvent(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name="image" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="language" className="form-label"><sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Language</label>
                                                    <Field
                                                        as="select"
                                                        name="language"
                                                        id="language"
                                                        className={`form-control ${submitCount > 0 && errors.language ? "is-invalid" : ""}`}
                                                    >
                                                        <option value="">Select language</option>
                                                        {languageList?.data?.map((lang) => (
                                                            <option key={lang.id} value={lang.name}>
                                                                {lang.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="language" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="category_id" className="form-label"><sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Category</label>
                                                    <Field as="select" name="category_id" id="category_id"
                                                        className={`form-control ${submitCount > 0 && errors.category_id ? "is-invalid" : ""}`}
                                                    >
                                                        <option value="">Select category</option>
                                                        {categoryList?.data?.map((category) => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="category_id" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label"><sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Course Name</label>
                                                    <Field type="text" name="name" id="name"
                                                        className={`form-control ${submitCount > 0 && errors.name ? "is-invalid" : ""}`}
                                                        placeholder="Enter course name" />
                                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="description" className="form-label"><sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Description</label>
                                                    <Field as="textarea" name="description" id="description"
                                                        className={`form-control ${submitCount > 0 && errors.description ? "is-invalid" : ""}`}
                                                        placeholder="Enter course description" />
                                                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="validity" className="form-label">
                                                        <sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Validity
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="validity"
                                                        id="validity"
                                                        className={`form-control ${submitCount > 0 && errors.validity ? "is-invalid" : ""
                                                            }`}
                                                        placeholder="Enter course validity"
                                                    />
                                                    <ErrorMessage name="validity" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="price" className="form-label"><sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Price</label>
                                                    <Field type="text" name="price" id="price"
                                                        className={`form-control ${submitCount > 0 && errors.price ? "is-invalid" : ""}`}
                                                        placeholder="Enter course price" min="0" />
                                                    <ErrorMessage name="price" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="file" className="form-label"><sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Course File</label>
                                                    <input
                                                        id="file"
                                                        name="file"
                                                        ref={fileRef}
                                                        type="file"
                                                        className={`form-control ${submitCount > 0 && errors.file ? "is-invalid" : ""}`}
                                                        accept=".pdf"
                                                        onChange={(e) => uploadFileEvent(e, setFieldValue)}
                                                    />
                                                    <ErrorMessage name="file" component="div" className="invalid-feedback" />
                                                </div>

                                                <div className="text-center d-grid">
                                                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                                        Update
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateCourse;
