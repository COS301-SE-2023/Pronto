import * as React from "react";
import "../Institution VIew/Navigation/Navigation.css";
import logo from "../images/logo.jpg";
import { Auth,API } from "aws-amplify";
import { useNavigate } from "react-router-dom";
export default function LecturerNavigation() {

  const[user,setUser]=React.useState("")
  const navigate = useNavigate();

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

  const userSet = async()=>{
    let u=await Auth.currentAuthenticatedUser()
    //console.log(u)
    u=u.attributes.name
    //console.log(u)
    setUser(u)
    //console.log(user)
  }

  React.useEffect(()=>{
    userSet()
  })
 
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
              data-testid={'UniversityImage'}
            />
            <div className="lecturer-name">{user}</div>
          </div>

          <ul className="navbar-nav">
            
            <li className="nav-item text-center"  data-testid={'EditModuleInfo'}>
              <a href="/lecture-homepage" className="nav-link"  data-testid={'EditModuleInfoLink'}>
                <b>Edit Module Information</b>
              </a>
            </li>
            <li className="nav-item text-center"  data-testid={'RecentAnnouncements'}>
              <a href="recent-announcement" className="nav-link"  data-testid={'RecentAnnouncementsLink'}>
                <b>Recent Announcements</b>
              </a>
            </li>
            <li className="nav-item text-center"  data-testid={'EditPersonalInfo'}>
              <a href="personal-info" className="nav-link"  data-testid={'EditPersonalInfoLink'}>
                <b>Edit Personal Information</b>
              </a>
            </li>
          </ul>
        </nav>

        <div className="logoutbtn fixed-bottom col-2 p-4 ml-4">
          <button className={"btn btn-danger btn-lg btn-block"} style={{borderRadius:"25px"}} data-testid={'LogoutButton'} onClick={onSignOut}>Log Out</button>
        </div>
      </div>
  );
}
