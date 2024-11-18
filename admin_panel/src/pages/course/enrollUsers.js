import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import moment from "moment";
import DataTable from "react-data-table-component";
import courseIcon from "../../assets/online-course_10180838.png";
import { useLocation, useNavigate } from "react-router-dom";
import { decrypt } from "../../common/enc_dec";
import { enrollUser } from "../../slices/courseSlice";

const EnrollUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { enrollUserList, loading, error } = useSelector((state) => state.course);
    const { data } = location?.state || {}; // Ensure course_id is handled properly
    const [isDelayed, setIsDelayed] = useState(true);
    const [page, setPage] = useState(1); // Current page number
    const [limit, setLimit] = useState(10); // Number of items per page
    const queryParams = new URLSearchParams(location.search);
    const _id = decrypt(queryParams.get("id"));

    useEffect(() => {
        if (data?.id) { // Check for course_id before dispatching
            const timer = setTimeout(() => {
                setIsDelayed(false);
                dispatch(enrollUser({ course_id: data?.id, page, limit }));
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [dispatch, page, limit, data?.id]);

    console.log(enrollUserList, "enroll");

    const columns = [
        {
            name: "ID",
            selector: (row) => row.user_id,
            sortable: true,
            minWidth: "50px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Name",
            selector: (row) => row.enroll_user.full_name,
            sortable: true,
            minWidth: "200px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Email",
            selector: (row) => row.enroll_user.email,
            sortable: true,
            minWidth: "200px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Phone Number",
            selector: (row) => row.enroll_user.country_code + row.enroll_user.phone_number,
            sortable: true,
            minWidth: "200px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Joining Date",
            selector: (row) => moment(row.enroll_user.created_at).format("DD-MMM-YYYY"),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Profile Image",
            selector: (row) =>
                row.enroll_user.image ? (
                    <img src={row.enroll_user.image} alt="user image" style={{ height: "6vh", padding: "5px" }} />
                ) : (
                    <img src={courseIcon} alt="course banner" style={{ height: "6vh", padding: "5px" }} />
                ),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Status",
            selector: (row) => <span className={row.enroll_user.is_active ? "text-success" : "text-danger"}>{row.enroll_user.is_active ? "Active" : "Inactive"}</span>,
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
    ];

    // Custom styles for DataTable
    const customStyles = {
        headCells: {
            style: {
                justifyContent: "center", // center the header cell
            },
        },
        cells: {
            style: {
                justifyContent: "center", // center the cell content
            },
        },
    };

    return (
        <>
            <Helmet>
                <title>LEA.TRAINING | Course</title>
            </Helmet>

            <div className="content-page">
                <div className="col-md-12 col-xl-12 mt-1">
                    <div className="widget-rounded-circle card">
                        <div className="card-body">
                            <div style={{ display: "flex", justifyContent: "start", alignItems: "center", marginBottom: "10px" }}>
                                <button className="btn btn-sm" onClick={() => navigate(-1)}>
                                    <i className="fe-arrow-left font-22 avatar-title text-secondary" />
                                </button>
                                <div>
                                    <h3 className="text-info text-center">{data?.name}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <DataTable
                                    title={<span className="d-flex justify-content-center">Enroll User</span>}
                                    columns={columns}
                                    data={enrollUserList?.data || []} // Ensure enrollUserList is handled properly
                                    pagination
                                    paginationServer
                                    paginationTotalRows={enrollUserList?.paging?.total || 0}
                                    paginationDefaultPage={page}
                                    paginationPerPage={limit}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                                    onChangeRowsPerPage={(newrow) => setLimit(newrow)}
                                    onChangePage={(newPage) => setPage(newPage)}
                                    responsive
                                    selectableRowsHighlight
                                    highlightOnHover
                                    striped
                                    subHeader
                                    fixedHeader
                                    fixedFooter
                                    persistTableHead
                                    subHeaderWrap
                                    subHeaderAlign="left"
                                    noDataComponent={<h5 className="p-3">No Data Found</h5>}
                                    customStyles={customStyles}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnrollUsers;
