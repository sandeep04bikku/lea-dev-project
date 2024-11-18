import { Link } from "react-router-dom";

function Footer() {

    return (
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            © Owned by <Link to={""}>Lea.Training</Link>
                        </div>
                        {/* <div className="col-md-6">
                            <div className="text-md-end footer-links d-none d-sm-block">
                                <Link to={""}>About Us</Link>
                                <Link to={""}>Help</Link>
                                <Link to={""}>Contact Us</Link>
                            </div>
                        </div> */}
                    </div>
                </div>
            </footer>
        </>
    )
} 

export default Footer;
