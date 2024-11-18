import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {

  return (
    <div className="content-page" style={{marginLeft:"0"}}>
      <div className="content">
        {/* Start Content */}
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-xl-4 mb-4">
              <div className="error-text-box">
                <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Symbol */}
                  <symbol id="s-text">
                    <text textAnchor="middle" x="50%" y="50%" dy=".35em">
                      404!
                    </text>
                  </symbol>
                  {/* Duplicate symbols */}
                  <use className="text" xlinkHref="#s-text"></use>
                  <use className="text" xlinkHref="#s-text"></use>
                  <use className="text" xlinkHref="#s-text"></use>
                  <use className="text" xlinkHref="#s-text"></use>
                  <use className="text" xlinkHref="#s-text"></use>
                </svg>
              </div>
              <div className="text-center">
                <h3 className="mt-0 mb-2">Whoops! Page not found</h3>
                <p className="text-muted mb-3">
                  It's looking like you may have taken a wrong turn. Don't worry...
                  it happens to the best of us. You might want to check your internet
                  connection. Here's a little tip that might help you get back on track.
                </p>
                <Link to="/" className="btn btn-success waves-effect waves-light">
                  Back to Dashboard
                </Link>
              </div>
              {/* end row */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end content */}
    </div>
  );
};

export default NotFoundPage;
