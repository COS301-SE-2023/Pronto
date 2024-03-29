import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import "../../Institution View/Navigation/Navigation.css";
import { listLecturers } from "../../Graphql/queries";
import { useLecturer } from "../../ContextProviders/LecturerContext";

import { Auth, API, Storage } from "aws-amplify";

export default function LecturerNavigation() {

  const navigate = useNavigate();
  const location = useLocation();
  const { lecturer, setLecturer } = useLecturer();
  const [signOut, setSignOut] = useState(false);

  const onSignOut = async (event) => {
    event.preventDefault();
    setSignOut(true);
    try {
      await Auth.signOut();
      //navigate to homepage
      navigate("/");
      setSignOut(false);
    } catch (e) {
      navigate("/");
      setSignOut(false);
    }
  };

  const fetchLecturer = async () => {
    let u = await Auth.currentAuthenticatedUser();
    let lecturer_email = u.attributes.email;
    let lec = lecturer;
    try {
      if (lecturer === null || lecturer === undefined) {
        lec = await API.graphql({
          query: listLecturers,
          variables: {
            filter: {
              email: {
                eq: lecturer_email
              }
            }
          },
        });

        if (lec.data.listLecturers.items.length === 0 || lec.data.listLecturers.items[0]._deleted===true) {
          throw Error()
        }
        lec = lec.data.listLecturers.items[0];
        if (lec.institution.logo === null) {
          lec.institution.logoUrl = "";
        }
        else {
          lec.institution.logoUrl = await Storage.get(lec.institution.logo, { validateObjectExistence: true, expires: 3600 });

        }
        setLecturer(lec);
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchLecturer();
  }, []);

  return (
    <div className={"grid"} >
      <nav className="vertical-navbar col-4 p-4">
        <div className="top"> {/* Top holds the university image and lecturer name */}
          <img
            src={lecturer !== undefined ? lecturer !== null ? lecturer.institution.logoUrl : " " : "  "}
            alt=""
            className="logo offset-2 img-fluid mr-1"
            style={{ width: "155px", height: "155px" }}
            data-testid={'UniversityImage'}
          />
          <div className="lecturer-name" style={{ paddingTop: '5%' }}>
            <b>
              {lecturer && (lecturer.firstname + " " + lecturer.lastname)}
            </b>
          </div>
        </div>

        <ul className="navbar-nav">
          <li data-testid={"LecturerDashboard"}>
            <Link
              to={'/lecturer/dashboard'}
              className={`nav-link text-center ${location.pathname === '/lecturer/dashboard' ? 'active' : ''}`}
            >
              <b>Dashboard</b>
            </Link>
          </li>

          <li data-testid={"EditModuleInfo"}>
            <Link
              to={'/lecturer/modules'}
              className={`nav-link text-center ${location.pathname === '/lecturer/edit-module' ? 'active' : location.pathname === '/lecturer/modules' ? 'active' : ''}`}
            >
              <b>Edit Course Information</b>
            </Link>

          </li>
          <li

            data-testid={"RecentAnnouncements"}
          >

            <Link
              to={'/lecturer/announcement'}
              className={`nav-link text-center ${location.pathname === '/lecturer/announcement' ? 'active' : ''}`}
            >
              <b>Recent Announcements</b>
            </Link>

          </li>
          <li data-testid={"EditPersonalInfo"}>

            <Link
              to={'/lecturer/personal-info'}
              className={`nav-link text-center ${location.pathname === '/lecturer/personal-info' ? 'active' : ''}`}
            >
              <b>Edit Personal Information</b>
            </Link>

          </li>
        </ul>
        <div className="logoutbtn">
          <button
            type="submit"
            className={"btn btn-danger btn-lg btn-block"}
            style={{ borderRadius: "25px" }}
            data-testid={"LogoutButton"}
            onClick={onSignOut}
          >
            {signOut ? "Logging Out..." : "Log Out"}
          </button>
        </div>
      </nav>

    </div>
  );
}
