import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import courseIcon from "../../assets/online-course_10180838.png";
import { decrypt, encrypt } from "../../common/enc_dec";
import VideoModal from "../../components/Modal/videoModel";
import { lession, deleteLession, course } from "../../slices/courseSlice";
import LessionModal from "./model";
import { showPromiseNotification } from "../../common/notification";
import AssignModel from "./assignModel";

const CourseView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { courseList, lessionList, addLessionData, updateLessionData, deleteLessionData, loading, error } = useSelector((state) => state.course);
    const { id } = location?.state || {};
    const [isOpen, setIsOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState({ status: false, data: {} });
    const [isAssignOpen, setIsAssignOpen] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const _id = decrypt(queryParams.get("id"));

    useEffect(() => {
        if (id) {
            dispatch(course({ id }));
            dispatch(lession({ payload: { course_id: id } }));
        }
    }, [dispatch, id, _id, addLessionData, deleteLessionData, updateLessionData]);

    const trainers = [
        { id: 1, name: 'Trainer 1' },
        { id: 2, name: 'Trainer 2' },
        { id: 3, name: 'Trainer 3' },
        // Add more trainers as needed
    ];

    const handleEdit = (row) => {
        navigate(`/course/edit?id=${encrypt(`${row.id}`)}`, { state: { data: row } });
    };

    const handleViewEnrollTrainee = (row) => {
        navigate(`/course/enroll-users?id=${encrypt(`${row.id}`)}`, { state: { data: row } });
    };

    const handleVideoClick = (url) => {
        setVideoUrl(url);
        setIsOpen(true);
    };

    const handleDeleteVideo = (id, course_id) => {
        console.log(course_id, "-------->", id);
        const myPromise = new Promise((resolve, reject) => {
            dispatch(deleteLession({ id, course_id }))
                .then((response) => {
                    console.log(response, "login response");
                    if (response.payload.code === 200) {
                        resolve(response.payload);
                    } else {
                        reject(response.payload);
                    }
                });
        });

        showPromiseNotification(myPromise);
    };

    const handleUpdateVideo = (lession) => {
        setIsUpdate({ status: true, data: lession });
        setIsAddEditOpen(true);
    };

    const handleAddLesson = () => {
        setIsAddEditOpen(true);
        setIsUpdate({ status: false, data: {} }); // Ensure update status is reset when adding a new lesson
    };

    const handleAssignTrainer = () => {
        setIsAssignOpen(true)
    }

    const handleLessionClose = () => {
        setIsUpdate({ status: false, data: {} });
        setIsAddEditOpen(false);
    };
    const calculateTotalDuration = (lessons) => {
        const totalDurationMs = lessons.reduce((acc, lesson) => acc + lesson.duration, 0);
        const duration = moment.duration(totalDurationMs, 'milliseconds');
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        return `${hours}h ${minutes}m`;
    };


    return (
        <>
            <Helmet>
                <title>LEA.TRAINING | Course | View</title>
            </Helmet>

            <div className="content-page">
                <div className="col-md-12 col-xl-12 mt-1">
                    <div className="widget-rounded-circle card">
                        <div className="card-body">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                <button className="btn" onClick={() => navigate(-1)}>
                                    <i className="fe-arrow-left font-22 avatar-title text-secondary" />
                                </button>
                                <h3 className="text-info">Course Details</h3>
                                <button className="btn" disabled={!courseList?.is_active} onClick={() => handleEdit(courseList)}>
                                    {/* <i className="fe-edit-1 font-22 avatar-title text-warning" /> */}
                                </button>
                            </div>
                            <div className="row">
                                <div className="col-md-4 text-center mb-2">
                                    <img
                                        src={courseList?.image || courseIcon}
                                        alt={"course img"}
                                        className="img-fluid"
                                        style={{ width: "100%", height: "auto", cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="col-md-8 mb-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="basic-info">
                                                <p><strong>ID:</strong> {courseList?.id}</p>
                                                <p><strong>Category:</strong> {courseList?.course_category?.name || "Not Available"}</p>
                                                <p><strong>Name:</strong> {courseList?.name}</p>
                                                <p><strong>Price:</strong> {'$' + courseList?.price}</p>
                                                <p><strong>Description:</strong> {courseList?.description}</p>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <p><strong>Language:</strong> {courseList?.language}</p>
                                            <p><strong>Total Review:</strong> {courseList?.total_review}</p>
                                            <p><strong>Total Lession:</strong> {courseList?.total_lession}</p>
                                            {/* <p><strong>Duration:</strong> {
                                                lessionList?.data && lessionList.data.length > 0 ?
                                                    calculateTotalDuration(lessionList.data) :
                                                    "Not Available"
                                            }</p> */}
                                                <p><strong>Duration:</strong> {courseList?.duration}</p>
                                            <p><strong>Total Purchase:</strong> {courseList?.total_purchase}</p>
                                            <p><strong>File:</strong> {courseList?.file}</p>
                                            <p><strong>Created Date:</strong> {moment(courseList?.created_at).format("DD-MMM-YYYY") || "Not Available"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-auto">
                                        <button className="btn btn-sm btn-primary mb-3" onClick={() => handleViewEnrollTrainee(courseList)} style={{ borderRadius: "20px" }}>View Enroll Trainee</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-sm btn-primary mb-3" onClick={handleAssignTrainer} style={{ borderRadius: "20px" }}>
                                            Assign Trainer
                                        </button>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <h5>Lessons</h5>
                                        <button className="btn btn-sm btn-primary mb-3" onClick={handleAddLesson} style={{ borderRadius: "20px" }}>Add Lesson</button>
                                        <div className="row">
                                            {lessionList?.data?.length > 0 ? (
                                                lessionList.data.map(lession => (
                                                    <div key={lession.id} className="col-md-4 mb-1">
                                                        <div className="card" style={{ boxShadow: "2px 2px 16px #b7b7b7" }}>
                                                            <video
                                                                src={lession.video}
                                                                className="img-fluid"
                                                                controls
                                                                onClick={() => handleVideoClick(lession.video)}
                                                                style={{ cursor: 'pointer', width: "100%" }}
                                                            />
                                                            <div style={{ marginLeft: "10px", marginTop: "10px", fontWeight: "bold", fontSize: "20px" }}> {lession.title}</div>
                                                            <div className="d-flex justify-content-end" style={{ marginBottom: "10px" }}>
                                                                {/* <button className="btn btn-primary btn-sm mt-2 me-1" onClick={() => handleDeleteVideo(lession.id, lession.course_id)} style={{ borderRadius: "20px" }}>
                                                                    delete
                                                                </button> */}
                                                                <button className="btn btn-primary btn-sm mt-2 me-1" onClick={() => handleUpdateVideo(lession)} style={{ borderRadius: "20px" }}>
                                                                    edit
                                                                </button>
                                                                <button className="btn btn-primary btn-sm mt-2 me-1" onClick={() => handleVideoClick(lession.video)} style={{ borderRadius: "20px" }}>
                                                                    view
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-12">
                                                    No Lesson Available
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <VideoModal
                    videoUrl={videoUrl}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}

            {isAddEditOpen && (
                <LessionModal
                    update={isUpdate}
                    isOpen={isAddEditOpen}
                    onClose={handleLessionClose}
                    course_id={id}
                    language={courseList?.language}
                />
            )}

            {isAssignOpen && (
                <AssignModel
                    isOpen={isAssignOpen}
                    onClose={() => setIsAssignOpen(false)}
                    course_id={id}
                />
            )}
        </>
    );
};

export default CourseView;
