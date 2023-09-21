import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import "../Institution View/Navigation/Navigation.css";

export default function SuperAdminNavigation({ props }) {
    const navigate = useNavigate();
    const state = useLocation();

    const location = useLocation();

    const onSignOut = async (event) => {
        event.preventDefault();
        /*  try {
              await Auth.signOut();
              //navigate to homepage
              navigate("/");
          } catch (e) {
              console.log(e.message);
          } */
    };


    /*  const fetchAdmin = async () => {
  
          try {
              if (admin === null || admin === undefined) {
                  let user = await Auth.currentAuthenticatedUser();
                  let adminEmail = user.attributes.email
                  let adminData = await API.graphql({
                      query: listAdmins,
                      variables: {
                          filter: {
                              email: {
                                  eq: adminEmail
                              }
                          },
                      },
                  });
                  if (adminData.data.listAdmins.items.length > 0) {
                      adminData = adminData.data.listAdmins.items[0];
                      if (adminData.institution.logo !== null) {
                          adminData.institution.logoUrl = await Storage.get(adminData.institution.logo, { validateObjectExistence: true, expires: 3600 });
                      }
                      setAdmin(adminData);
                  }
              }
  
          } catch (error) {
  
          }
      }
  
      useEffect(() => {
  
          fetchAdmin()
      }, []);  */

    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 p-4" >
                <div className="top"> {/* top holds University image and name portion*/}
                    <div className="institution-name" style={{ paddingTop: '5%' }}>
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
