import * as React from "react";
import "./Navigation.css";
import logo from "../../images/university_logo.svg";
import { Auth,Storage,API } from "aws-amplify";
import { listInstitutions } from "../../graphql/queries";
import { useNavigate } from "react-router-dom";

export default function InstitutionNavigation() {
  const navigate = useNavigate();
  
  const onSignOut = async (event) => {
    event.preventDefault();
    try {
      await Auth.signOut();
      //navigate to lecturer login
      navigate("/institution-login");
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchLogo = async()=>{
    console.log("fectching")
    try{
        let user=await Auth.currentAuthenticatedUser();
        let name=user.attributes.name;
        const universityName = name.split(/\s+/); 
      name = universityName
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join("");
        // let l=await Storage.get(name+'/logo/logo.png',{validateObjectExistence:true,expires:3600})
        // console.log(l)
        // setLogo(l)
        console.log(logo)
    }catch(error){
        console.log(error)
    }
  }

  React.useEffect(()=> { 
        fetchLogo()
    },[]);

    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 p-4" >
                <div className="top"
                      style={{  width: "calc(12vw)",
                                height: "calc(25vh)" ,   
                                justifyContent:"center",
                                justifyItems:"center",
                                maxWidth:"100%",
                                maxHeight:"100%"}}
                    >
                <img
                    src={logo}
                    alt="Logo"
                    className="logo offset-2 img-fluid mr-1"
                    width={"175px"}
                    height={"155px"}
                    style={{maxWidth:"100%",maxHeight:"100%",border:"2px solid black",padding:"2px"}}
                    data-testid={'UniversityImage'}
                    />
                </div>
                <ul className="navbar-nav">
        
                    <li className="nav-item text-center" data-testid={'Dashboard'}>
                        <a href="/dashboard" className="nav-link" data-testid={'dashboardLink'}>
                            <b>Dashboard</b>
                        </a>
                    </li>
                    <li className="nav-item text-center" data-testid={'UploadSchedule'}>
                        <a href="/upload-schedule" className="nav-link" data-testid={'UploadScheduleLink'}>
                           <b>Upload Schedule</b>
                        </a>
                    </li>
                    <li className="nav-item text-center" data-testid={'UploadStudentFiles'}>
                        <a href="/upload-student-files" className="nav-link p-2" data-testid={'UploadStudentFilesLink'}>
                            <b>Upload Student Files</b>

                        </a>
                    </li>
                    <li className="nav-item text-center" data-testid={'AddLecturer'}>
                        <a href="/add-lecturer" className="nav-link" data-testid={'AddLecturerLink'}>
                            <b>Add/Remove Lecturer</b>
                        </a>
                    </li>
                    <li className="nav-item text-center" data-testid={'EditUniversityInfo'}>
                        <a href="/edit-university-info" className="nav-link" data-testid={'EditUniversityInfoLink'}>
                            <b>Edit University Info</b>
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
