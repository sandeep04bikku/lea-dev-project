import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import categoryIcon from "../../assets/online-course_10180838.png"; // Assuming this is the default user icon
import CategoryModal from "./model";

const CategoryView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [update, setUpdate] = useState({ status: false, data: {} });

    // Dummy data to simulate real data
    const { data } = location.state || {};

    const handleEdit = (row) => {
        setUpdate({ status: true, data: row });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setUpdate({ status: false, data: {} });
        setIsModalOpen(false);
    };

    return (
        <>
            <Helmet>
                <title>LEA.TRAINING | Category | View</title>
            </Helmet>

            <div className="content-page">
                <div className="col-md-12 col-xl-12 mt-1">
                    <div className="widget-rounded-circle card">
                        <div className="card-body">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                <button className="btn" onClick={() => navigate(-1)}>
                                    <i className="fe-arrow-left font-22 avatar-title text-secondary" />
                                </button>
                                <h3 className="text-info text-capitalize">Category Details</h3>
                                <span></span>
                                {/* <button className="btn" disabled={!data.is_active} onClick={() => handleEdit(data)}>
                                    <i
                                        className="fe-edit-1 font-22 avatar-title text-warning"
                                        style={{ color: "orange" }}
                                    />
                                </button> */}
                            </div>
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <img
                                        src={data?.image || categoryIcon}
                                        alt={data?.name}
                                        className="img-fluid rounded-circle"
                                        style={{ width: "150px", height: "150px", objectFit: "cover", cursor: 'pointer' }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="basic-info">
                                        <p><strong>ID:</strong> <span>{data?.id}</span></p>
                                        <p><strong>Name:</strong> <span className="text-capitalize">{data?.name}</span></p>
                                        <p><strong>Created Date:</strong> <span>{moment(data?.created_at).format("DD-MMM-YYYY") || "Not Available"}</span></p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CategoryModal
                update={update}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default CategoryView;
