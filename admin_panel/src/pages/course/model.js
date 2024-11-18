import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import videoIcon from "../../assets/play-button.png";
import { useDispatch } from 'react-redux';
import { addLession, updateLession } from '../../slices/courseSlice';
import { showPromiseNotification } from '../../common/notification';
import uploadToS3 from '../../common/s3AwsService';

const LessionModal = ({ update, isOpen, onClose, course_id, language }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0); // State to store video duration
    const videoRef = useRef(null);
    const fileRef = useRef(null);

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

    const initialValues = useMemo(() => ({
        title: update.status && update?.data ? update?.data?.title : '',
        video: update.status && update?.data ? update?.data?.video : null,
        file: update.status && update?.data ? update?.data?.file : null,
    }), [update]);

    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            title: Yup.string().required('Please enter a title'),
            video: Yup.mixed().required('Please upload a video'),
            file: Yup.mixed().required("Please upload a file"),
        });
    }, []);

    const handleVideoChange = useCallback((e, setFieldValue) => {
        const file = e.target.files[0];

        // Generate a new file name based on the current timestamp and replace spaces with underscores
        const timestamp = new Date().getTime();
        const newFileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;

        // Create a new File object with the updated name
        const newFile = new File([file], newFileName, { type: file.type });

        if (file) {
            const videoURL = URL.createObjectURL(newFile);
            setVideoPreview(videoURL);
            setFieldValue('video', newFile);

            // Calculate video duration
            calculateVideoDuration(newFile);
        }
    }, []);

    const handleFileChange = useCallback((e, setFieldValue) => {
        const file = e.target.files[0];

        // Generate a new file name based on the current timestamp and replace spaces with underscores
        const timestamp = new Date().getTime();
        const newFileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;

        // Create a new File object with the updated name
        const newFile = new File([file], newFileName, { type: file.type });

        if (file) {
            setFieldValue('file', newFile);
        }
    }, []);

    const handleIconClick = () => {
        videoRef.current.click(); // Trigger file input click
    };

    const handleFileIconClick = () => {
        fileRef.current.click(); // Trigger file input click
    };

    const handleSubmit = useCallback(
        async (values, { setSubmitting }) => {
            const videoData = await uploadToS3(values?.video, "lession_video", "public-read-write");
            const fileData = await uploadToS3(values?.file, "lession_file", "public-read-write");

            if (videoData) {
                values.video = values.video.name;
            } else {
                values.video = "";
            }

            if (fileData) {
                values.file = values.file.name;
            } else {
                values.file = "";
            }

            const myPromise = new Promise((resolve, reject) => {
                if (update.status) {
                    dispatch(updateLession({
                        payload: {
                            ...values,
                            id: update.data.id,
                            course_id: course_id,
                            duration: videoPreview ? formatVideoDuration(videoDuration) : update.data.duration
                        }
                    }))
                        .then((response) => {
                            if (response.payload.code === 200) {
                                resolve(response.payload);
                            } else {
                                reject(response.payload);
                            }
                        })
                } else {
                    dispatch(addLession({
                        payload: {
                            course_id: course_id,
                            lession_data: [
                                {
                                    title: values.title,
                                    video: values.video,
                                    file: values.file,
                                    language: language,
                                    duration: formatVideoDuration(videoDuration) // Assign formatted video duration to the payload
                                }
                            ]
                        }
                    }))
                        .then((response) => {
                            if (response.payload.code === 200) {
                                resolve(response.payload);
                            } else {
                                reject(response.payload);
                            }
                        })
                }
            });

            showPromiseNotification(myPromise);
            setSubmitting(false);
            onClose();

        },
        [onClose, update, dispatch, videoDuration]
    );

    // Function to calculate video duration
    const calculateVideoDuration = (file) => {
        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            setVideoDuration(video.duration);
        };

        video.src = URL.createObjectURL(file);
    };

    // Function to format video duration to hh:mm:ss
    const formatVideoDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            {isOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div
                        className="modal-dialog modal-dialog-centered"
                        ref={modalRef}
                        style={{ minWidth: '40%', minHeight: '80%' }}
                    >
                        <div className="modal-content" style={{ height: 'auto', overflow: 'auto' }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "22px" }}>
                                    {update.status ? "Edit Lesson Details" : "Add Lesson"}
                                </h5>
                                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                            </div>

                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                                {({ isSubmitting, setFieldValue, errors }) => (
                                    <Form>
                                        <div className="modal-body">
                                            <div className="mb-3 text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    {!videoPreview && (
                                                        <div className="upload-icon" onClick={handleIconClick}>
                                                            <img src={videoIcon} alt="Upload Video" style={{ width: '100px', height: '100px', cursor: 'pointer' }} />
                                                            <input
                                                                type="file"
                                                                name="video"
                                                                ref={videoRef}
                                                                className={`form-control ${errors.video ? 'is-invalid' : ''} d-none`}
                                                                accept="video/*"
                                                                onChange={(e) => handleVideoChange(e, setFieldValue)}
                                                            />
                                                            <ErrorMessage name="video" component="div" className="invalid-feedback" />
                                                        </div>
                                                    )}
                                                    {videoPreview && (
                                                        <video width="100%" controls style={{ marginTop: '10px' }}>
                                                            <source src={videoPreview} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )}
                                                </div>
                                                {videoDuration > 0 && <p>Duration: {formatVideoDuration(videoDuration)}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    <sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Title
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="title"
                                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                    placeholder="Enter title"
                                                />
                                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                            </div>

                                            {/* File Upload Field */}
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    <sup style={{ color: "red", fontSize: "12px", fontWeight: "lighter" }}><span>*</span></sup>Upload File
                                                </label>
                                                <input
                                                    type="file"
                                                    name="file"
                                                    ref={fileRef}
                                                    className={`form-control ${errors.file ? 'is-invalid' : ''}`}
                                                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.xls"
                                                    onChange={(e) => handleFileChange(e, setFieldValue)}
                                                />
                                                <ErrorMessage name="file" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                {isSubmitting ? 'Please wait...' : update.status ? "Save Changes" : 'Add Lesson'}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LessionModal;
