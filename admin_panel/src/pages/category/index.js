import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import moment from "moment";
import DataTable from "react-data-table-component";
import catgoryIcon from "../../assets/online-course_10180838.png";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../common/enc_dec";
import { category, changeCategoryStatus, deleteCategory } from "../../slices/categorySlice";
import CategoryModal from "./model";
import { useModuleSettings } from "../../components/moduleSettingsContext/ModuleSettingsContext";
import { showPromiseNotification } from "../../common/notification";
import Loader from "../../components/loader";
import { getUserPermissions, isAdmin } from "../../common/LocalStorageService";

const Category = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryList, deleteCategoryData, changeCategoryStatusData, addCategoryData, updateCategoryData, loading, error } = useSelector((state) => state.category);

    const [isDelayed, setIsDelayed] = useState(true);
    const { filter, setFilter, search, setSearch, page, setPage, limit, setLimit, resetSettings } = useModuleSettings();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [update, setUpdate] = useState({ status: false, data: {} });
    const [loader, setLoader] = useState(false);

    useEffect(() => {

        dispatch(category({ filter, search, page, limit }));

    }, [dispatch, filter, search, deleteCategoryData, changeCategoryStatusData, addCategoryData, updateCategoryData, page, limit]);

    const handleView = (row) => {
        navigate(`/category/view?id=${encrypt(`${row.id}`)}`, { state: { data: row } });
    };

    const handleEdit = (row) => {
        setUpdate({ status: true, data: row });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        const myPromise = new Promise((resolve, reject) => {
            dispatch(deleteCategory({ id }))
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
            dispatch(changeCategoryStatus({ id, is_active: status }))
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

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleAdd = () => {
        setUpdate({ status: false, data: {} });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setUpdate({ status: false, data: {} });
        setIsModalOpen(false);
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
            name: "Name",
            selector: (row) => <span className="text-capitalize">{row.name}</span>,
            sortable: true,
            minWidth: "200px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Created Date",
            selector: (row) => moment(row.createdAt).format("DD-MMM-YYYY"),
            minWidth: "150px",
            style: {
                fontSize: "14px",
            },
        },
        {
            name: "Category Image",
            selector: (row) =>
                row.image ? (
                    <img src={row.image} alt="Category image" style={{ height: "6vh", padding: "5px" }} />
                ) : (
                    <img src={catgoryIcon} alt="Category image" style={{ height: "6vh", padding: "5px" }} />
                ),
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
                            if (getUserPermissions("category").is_status || isAdmin()) {
                                handleChangeStatus(row.id, row.is_active)
                            }
                        }}
                    >
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
                    {(isAdmin() || getUserPermissions("category").is_edit) &&
                        <button className="btn" disabled={!row.is_active || row.is_deleted} onClick={() => handleEdit(row)}>
                            <i
                                className="fe-edit-1 font-22 avatar-title text-warning"
                                style={{ color: "orange" }}
                            />
                        </button>}
                    {(isAdmin() || getUserPermissions("category").is_delete) &&
                        <button className="btn" disabled={!row.is_active || row.is_deleted} onClick={() => handleDelete(row.id)}>
                            <i
                                className="fe-trash-2 font-22 avatar-title text-danger"
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

    if (!categoryList?.data) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Helmet>
                <title>LEA.TRAINING | User</title>
            </Helmet>

                <div className="content-page">
                    <div className="col-md-12 col-xl-12 mt-1">
                        <div className={`widget-rounded-circle card`}>
                            <div className="card-body">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    {/* <div>
                                    <h3 className="text-info">Category</h3>
                                </div> */}
                                </div>
                                <div className="row">
                                    <DataTable
                                        title={"Category"}
                                        columns={columns}
                                        data={categoryList?.data}
                                        pagination
                                        paginationServer
                                        paginationTotalRows={categoryList?.paging?.total}
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
                                        subHeaderComponent={
                                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "10px 0" }}>
                                                <div>
                                                    {(isAdmin() || getUserPermissions("category").is_add) &&
                                                        <button className="btn btn-primary" onClick={handleAdd} style={{ padding: "4px 20px" }}>Add</button>
                                                    }
                                                </div>

                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <select id="statusFilter" value={filter} onChange={handleFilterChange} style={{ padding: "5px 20px" }}>
                                                        <option value="all">All</option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                        <option value="deleted">Deleted</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <input
                                                        type="text"
                                                        value={search}
                                                        onChange={handleSearchChange}
                                                        placeholder="Search"
                                                        style={{ padding: "4px", borderRadius: "5px", border: "1px solid #ccc" }}
                                                    />
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
            
            <CategoryModal
                update={update}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Category;
