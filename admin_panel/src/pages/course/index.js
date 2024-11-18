import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import moment from "moment";
import DataTable from "react-data-table-component";
import courseIcon from "../../assets/online-course_10180838.png";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../common/enc_dec";
import { changeCourseStatus, course, deleteCourse } from "../../slices/courseSlice";
import { showPromiseNotification } from "../../common/notification";
import { useModuleSettings } from "../../components/moduleSettingsContext/ModuleSettingsContext";
import { getUserPermissions, isAdmin } from "../../common/LocalStorageService";
import Loader from "../../components/loader";

const Course = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseList, deleteCourseData, changeCourseStatusData, loading, error } = useSelector((state) => state.course);

    const [isDelayed, setIsDelayed] = useState(true);
    // const [filter, setFilter] = useState(getLocalStorageItem("filter", "all"));
    // const [search, setSearch] = useState(getLocalStorageItem("search", ""));
    // const [page, setPage] = useState(getLocalStorageItem("page", 1));
    // const [limit, setLimit] = useState(getLocalStorageItem("limit", 10));
    // const [language, setLanguage] = useState(getLocalStorageItem("language", "english"));
    const { filter, setFilter, search, setSearch, page, setPage, limit, setLimit, lang, setLang, resetSettings } = useModuleSettings();
    const  languageList  = []


    useEffect(() => {

        // dispatch(language({ limit: 1000 }));
    }, [dispatch]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDelayed(false);
            dispatch(course({ filter, search, page, limit, language: lang }));
        }, 100);

        return () => clearTimeout(timer);
    }, [dispatch, filter, search, deleteCourseData, changeCourseStatusData, page, limit, lang]);

    const handleView = (row) => {
        navigate(`/course/view?id=${encrypt(`${row.id}`)}`, { state: { id: row.id } });
    };

    const handleEdit = (row) => {
        navigate(`/course/edit?id=${encrypt(`${row.id}`)}`, { state: { data: row } });
    };

    const handleDelete = (id) => {
        const myPromise = new Promise((resolve, reject) => {
            dispatch(deleteCourse({ id }))
                .then((response) => {
                    if (response.payload.code === 200) {
                        resolve(response.payload);
                    } else {
                        reject(response.payload);
                    }
                });
        });

        showPromiseNotification(myPromise);
    };

    const handleChangeStatus = (id, is_active) => {
        const myPromise = new Promise((resolve, reject) => {
            const status = is_active ? false : true;
            dispatch(changeCourseStatus({ id, is_active: status }))
                .then((response) => {
                    if (response.payload.code === 200) {
                        resolve(response.payload);
                    } else {
                        reject(response.payload);
                    }
                });
        });

        showPromiseNotification(myPromise);
    };

    const handleLanguageChange = (event) => {
        console.log(event.target.value,"event");
        
        const newLanguage = event.target.value;
        console.log(newLanguage,"event");
        setLang(newLanguage);
    };



    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        // setLocalStorageItem("filter", newFilter);
    };

    const handleSearchChange = (event) => {
        const newSearch = event.target.value;
        setSearch(newSearch);
        // setLocalStorageItem("search", newSearch);
    };

    const handleAdd = () => {
        navigate("/course/add");
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        // setLocalStorageItem("page", newPage);
    };

    const handleRowsPerPageChange = (newLimit) => {
        setLimit(newLimit);
        // setLocalStorageItem("limit", newLimit);
    };

    const columns = [
        {
            name: "ID",
            selector: (row, index) => row.id,
            sortable: true,
            minWidth: "50px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Category",
            selector: (row, index) => row?.course_category?.name,
            sortable: true,
            minWidth: "300px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Name",
            selector: (row, index) => row.name,
            sortable: true,
            minWidth: "200px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Language",
            selector: (row) => row.language,
            sortable: true,
            minWidth: "300px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Duration",
            selector: (row) => {
                const duration = moment.duration(row.duration, 'milliseconds');
                const hours = Math.floor(duration.asHours());
                const minutes = duration.minutes();
                return `${hours}h ${minutes}m`;
            },
            sortable: true,
            minWidth: "150px",
            grow: 2,
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
            minWidth: "200px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Price",
            selector: (row) => ('$' + row.price),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Created Date",
            selector: (row) => moment(row.created_at).format("DD-MMM-YYYY"),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "File",
            selector: (row) => (row.file),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Course Banner",
            selector: (row) =>
                row.image ? (
                    <img src={row.image} alt="course banner" style={{ height: "6vh", padding: "5px" }} />
                ) : (
                    <img src={courseIcon} alt="course banner" style={{ height: "6vh", padding: "5px" }} />
                ),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Total Lession",
            selector: (row) => (row.total_lession),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Total Review",
            selector: (row) => (row.total_review),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Total Purchage",
            selector: (row) => ('$' + row.total_purchage),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Status",
            selector: (row) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn" disabled={row.is_deleted}
                        onClick={() => {
                            if (getUserPermissions("course").is_status || isAdmin()) {
                                handleChangeStatus(row.id, row.is_active)
                            }
                        }}>
                        <i
                            className={row.is_active && !row.is_deleted ? "fe-toggle-right font-22 avatar-title text-success" : "fe-toggle-left font-22 avatar-title text-danger"}
                        />
                    </button>
                </div>
            ),
            minWidth: "80px",
            style: {
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
            },
        },
        {
            name: "Action",
            selector: (row) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn" onClick={() => handleView(row)}>
                        <i
                            className="fe-eye font-22 avatar-title text-primary"
                            style={{ color: "blue" }}
                        />
                    </button>
                    {(isAdmin() || getUserPermissions("course").is_edit) &&
                        <button className="btn" disabled={!row.is_active || row.is_deleted} onClick={() => handleEdit(row)}>
                            <i
                                className="fe-edit-1 font-22 avatar-title text-warning"
                                style={{ color: "orange" }}
                            />
                        </button>
                    }
                    {(isAdmin() || getUserPermissions("course").is_delete) &&
                        <button className="btn" disabled={!row.is_active || row.is_deleted} onClick={() => handleDelete(row.id)}>
                            <i
                                className="fe-trash-2 font-22 avatar-title text-danger"
                            // style={{ color: "red" }}
                            />
                        </button>}
                </div>
            ),
            minWidth: "250px",
            style: {
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
            },
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                justifyContent: "center",
            },
        },
        cells: {
            style: {
                justifyContent: "center",
            },
        },
    };

    if (!courseList?.data) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Helmet>
                <title>LEA.TRAINING | Course</title>
            </Helmet>

            <div className="content-page">
                {/* <button className="btn btn-sm" onClick={() => navigate(-1)}>
                    <i className="fe-arrow-left font-22 avatar-title text-secondary" />
                </button> */}
                <div className="col-md-12 col-xl-12 mt-1">
                    <div className={`widget-rounded-circle card`}>
                        <div className="card-body">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                <div>
                                    <h3 className="text-info">Course</h3>
                                </div>
                            </div>
                            <div className="row">
                                <DataTable
                                    title={null}
                                    columns={columns}
                                    data={courseList.data}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={courseList?.paging?.total}
                                    paginationDefaultPage={page}
                                    paginationPerPage={limit}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
                                    onChangeRowsPerPage={handleRowsPerPageChange}
                                    onChangePage={handlePageChange}
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
                                    subHeaderComponent={
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                {(isAdmin() || getUserPermissions("course").is_add) &&
                                                    <button className="btn btn-primary" onClick={handleAdd} style={{ padding: "4px 20px" }}>Add</button>}
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <select id="statusFilter" value={filter} onChange={handleFilterChange} style={{ padding: "5px 20px" }}>
                                                        <option value="all">All</option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                        <option value="deleted">Deleted</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={search}
                                                        onChange={handleSearchChange}
                                                        placeholder="Search"
                                                        style={{ padding: "4px", borderRadius: "5px", border: "1px solid #ccc" }}
                                                    />
                                                </div>
                                                <div>
                                                    <select value={lang} onChange={handleLanguageChange} style={{ padding: "5px 20px" }}>
                                                        {languageList?.data?.map((langItem) => (
                                                            <option key={langItem.id} value={langItem.name}>
                                                                {langItem.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    }
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

export default Course;
