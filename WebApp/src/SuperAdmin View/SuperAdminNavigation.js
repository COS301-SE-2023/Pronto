
import {  Auth } from "aws-amplify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SuperAdminImage from "../Images/SuperAdmin.png";

import "../Institution View/Navigation/Navigation.css";

export default function SuperAdminNavigation() {
    const navigate = useNavigate();
    

    const location = useLocation();

    const onSignOut = async (event) => {
        event.preventDefault();
         try {
              await Auth.signOut();
              navigate("/");
          } catch (e) {
              console.log(e.message);
          } 
    };

    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 p-4" >
                <div className="top"> {/* top holds University image and name portion*/}
                    <img
                        src={SuperAdminImage}
                        alt="Logo"
                        className="logo offset-2 img-fluid mr-4.5"
                        style={{ width: "155px", height: "155px" }}
                        data-testid={'UniversityImage'}
                    />

                    <div className="institution-name" style={{ paddingTop: '5%' }}>
                        Pronto Administrator
                    </div>
                </div>
                <ul className="navbar-nav">
                    <li>
                        <Link
                            to={'/superadmin/admin-requests'}
                            className={`nav-link text-center ${location.pathname === '/superadmin/admin-requests' ? 'active' : ''}`}
                        >
                            <b>Application Requests</b>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={'/superadmin/view-institutions'}
                            className={`nav-link text-center ${location.pathname === '/superadmin/view-institutions' ? 'active' : ''}`}
                        >
                            <b>View Institutions</b>
                        </Link>
                    </li>



                </ul>

                <div className="logoutbtn">
                    <button
                        className="btn btn-danger btn-lg btn-block"
                        style={{ borderRadius: "25px" }}
                        data-testid={"LogoutButton"}
                        onClick={onSignOut}
                    >
                        Log Out
                    </button>
                </div>
            </nav >

        </div >

    );
}
