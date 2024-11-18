import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminDashboard } from "../../slices/dashboardSlice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../../components/loader";
import Swal from "sweetalert2";
import { getUserDataFromLocal, getUserPermissions, hasPermissionForModule, isAdmin } from "../../common/LocalStorageService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardInfo, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(adminDashboard({}));
  }, [dispatch]);

  const adminData = getUserDataFromLocal();
  console.log(adminData, "admin");

  const statCards = [
    {
      name: "user",
      color: "warning",
      icon: "fe-layers",
      count: 100,
      label: "Total Category",
      link: "/categor",
    },
  ];

  if (loading || !dashboardInfo) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>LEA.TRAINING | Dashboard</title>
      </Helmet>

      <div className="content-page">
        {adminData?.permission?.length > 0 || isAdmin() ? (
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <h4 className="page-title">Dashboard</h4>
                  </div>
                </div>
              </div>

              {error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="row">
                  {statCards.map((card) =>
                    ((hasPermissionForModule(card.name) && getUserPermissions(card.name).is_view) || isAdmin()) ? (
                      <StatCard
                        key={card.name}
                        color={card.color}
                        icon={card.icon}
                        count={card.count}
                        label={card.label}
                        link={card.link}
                      />
                    ) : null
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-center mt-5">No Content Available</h3>
          </div>
        )}
      </div>
    </>
  );
};

const StatCard = ({ color, icon, count, label, link }) => (
  <div className="col-md-6 col-xl-3">
    <Link to={link} className="widget-rounded-circle card">
      <div className={`widget-rounded-circle card`}>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className={`avatar-lg rounded-circle bg-soft-${color} border-${color} border`}>
                <i className={`${icon} font-22 avatar-title text-${color}`} />
              </div>
            </div>
            <div className="col-6">
              <div className="text-end">
                <h3 className="text-dark mt-1">
                  <span data-plugin="counterup">{count}</span>
                </h3>
                <p className="text-muted mb-1 text-truncate">{label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default Dashboard;
