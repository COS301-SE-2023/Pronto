import {useEffect,useState} from "react";
import "../Institution VIew/Navigation/Navigation.css";
import logo from "../images/logo.jpg";
import { Auth, API } from "aws-amplify";
import { useNavigate,useLocation,Link } from "react-router-dom";
import { listLecturers } from "../graphql/queries";

export default function LecturerNavigation() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const state = useLocation();
  const[lecturer,setLecturer] = useState(state.state);

  const onSignOut = async (event) => {
    event.preventDefault();
    try {
      await Auth.signOut();
      //navigate to lecturer login
      navigate("/lecturer-login");
    } catch (e) {
      console.log(e.message);
    }
  };

  const userSet = async () => {
    let u = await Auth.currentAuthenticatedUser();
    u = u.attributes.name + u.attributes.family_name;
    setUser(u);
  };

  const fetchLecturer = async() =>{ 
    let u = await Auth.currentAuthenticatedUser();
    let lecturer_email=u.attributes.email;
    if(lecturer===null || lecturer===undefined ){
      const lec=await API.graphql({ 
                query:listLecturers,
                    variables:{ 
                        filter: { 
                           email: { 
                            eq : lecturer_email
                        }
                     }
                  },
                authMode:"AMAZON_COGNITO_USER_POOLS",
                });
        if(lec.data.listLecturers.items.length>0){
          setLecturer(lec.data.listLecturers.items[0]);
        }        
    }
  }

  useEffect(() => {
    userSet();
    fetchLecturer();
  });

  return (
    <div className={"grid"}>
      <nav className="vertical-navbar col-4 p-4">
        <div className="top">
          <img
            src={logo}
            alt="Logo"
            className="logo offset-2 img-fluid mr-1"
            width={"175px"}
            height={"155px"}
            data-testid={"UniversityImage"}
          />
          <div className="lecturer-name">{user}</div>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item text-center" data-testid={"EditModuleInfo"}>
            {/* <a
              href="/lecture-homepage"
              className="nav-link"
              data-testid={"EditModuleInfoLink"}
            >
              <b>Edit Module Information</b>
            </a> */}
            <Link 
              to={'/lecture-homepage'}  
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
            {/* <a
              href="recent-announcement"
              className="nav-link"
              data-testid={"RecentAnnouncementsLink"}
            >
              <b>Recent Announcements</b>
            </a> */}
            <Link 
              to={'/recent-announcement'}  
              state={lecturer}
              className="nav-link"
                >       
                <b>Recent Announcements</b>
            </Link>

          </li>
          <li className="nav-item text-center" data-testid={"EditPersonalInfo"}>
            {/* <a
              href="personal-info"
              className="nav-link"
              data-testid={"EditPersonalInfoLink"}
            >
              <b>Edit Personal Information</b>
            </a> */}

            <Link 
              to={'/personal-info'}  
              state={lecturer}
              className="nav-link"
                >       
                <b>Edit Personal Information</b>
            </Link>

          </li>
        </ul>
      </nav>

      <div className="logoutbtn fixed-bottom col-2 p-4 ml-4">
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
    </div>
  );
}
