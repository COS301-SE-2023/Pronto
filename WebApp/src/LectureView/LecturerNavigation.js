import { useEffect, useState } from "react";
import "../Institution VIew/Navigation/Navigation.css";
import logo from "../images/university_logo.svg";
import { Auth, API, Storage } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import { listLecturers } from "../graphql/queries";


export default function LecturerNavigation(lecturerData) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [lecturer, setLecturer] = useState(lecturerData.props);

  const onSignOut = async (event) => {
    event.preventDefault();
    try {
      await Auth.signOut();
      //navigate to homepage
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const userSet = async () => {
    let u = await Auth.currentAuthenticatedUser();
    u = u.attributes.name + u.attributes.family_name;
    setUser(u);
  };

  const fetchLecturer = async () => {
    let u = await Auth.currentAuthenticatedUser();
    let lecturer_email = u.attributes.email;
    let lec = lecturer;
    try {
      if (lecturer === null || lecturer === undefined || lecturer.courses === undefined) {
        lec = await API.graphql({
          query: listLecturers,
          variables: {
            filter: {
              email: {
                eq: lecturer_email
              }
            }
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        if (lec.data.listLecturers.items.length === 0) {
          throw Error()
        }
        lec = lec.data.listLecturers.items[0];
        setLecturer(lec)
      }

      if (lec.institution.logo === null) {
        lec.institution.logoUrl = logo;
      }

      else if (lec.institution.logoUrl === undefined) {
        lec.institution.logoUrl = await Storage.get(lec.institution.logo, { validateObjectExistence: true, expires: 3600 });
        setLecturer(lec);
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    // userSet();
    fetchLecturer();
  });

  return (
    <div className={"grid"}>
      <nav className="vertical-navbar col-4 p-4">
        <div className="top"
          style={{
            
            width: "calc(12vw)",
            height: "calc(19vh)",
            alignItems:'center',
            justifyContent: "center",
            justifyItems: "center",
            textAlign: "center",
            maxWidth: "100%",
            padding: "2px",
            maxHeight: "100%"
          }}
        >
          <img
            src={lecturer !== undefined ? lecturer !== null ? lecturer.institution.logoUrl : " " : "  "}
            alt="Logo"
            className="logo offset-2 img-fluid mr-1"
            style={{ width: "175px", height: "155px" }}
            data-testid={'UniversityImage'}
          />
          
          <div className="institution-name" style={{paddingTop:'5%'}}>
            <b>
              {lecturer && (lecturer.firstname + " " + lecturer.lastname)}
            </b>
          </div>
        </div>


        <ul className="navbar-nav">
          <li className="nav-item text-center" data-testid={"LecturerDashboard"}>
            <a
              href="/lecturer/dashboard"
              className="nav-link"
              data-testid={"LecturerDashboardLink"}
            >
              <b>Dashboard</b>
            </a>
          </li>

          <li className="nav-item text-center" data-testid={"EditModuleInfo"}>
            <Link
              to={'/lecturer/modules'}
              state={lecturer}
              className="nav-link"
            >
              <b>Edit Module Information</b>
            </Link>
           

          </li>
          <li
            className="nav-item text-center"
            data-testid={"RecentAnnouncements"}
          >

            <Link
              to={'/lecturer/announcement'}
              state={lecturer}
              className="nav-link"
            >
              <b>Recent Announcements</b>
            </Link>

          </li>
          <li className="nav-item text-center" data-testid={"EditPersonalInfo"}>

            <Link
              to={'/lecturer/personal-info'}
              state={lecturer}
              className="nav-link"
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
            Log Out
          </button>
        </div>
      </nav>


    </div>
  );
}
