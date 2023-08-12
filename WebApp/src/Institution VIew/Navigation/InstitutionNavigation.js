import * as React from "react";
import "./Navigation.css";
import logo from "../../images/university_logo.svg";
import { Auth,Storage,API } from "aws-amplify";
import { listInstitutions } from "../../graphql/queries";
import { useNavigate,Link } from "react-router-dom";

export default function InstitutionNavigation() {
  const navigate = useNavigate();
  const[institution,setInstitution]=React.useState(null)
  const[instituitionLogo,setInstitutionLogo]=React.useState(null)
  let log=logo
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
    try{
        let user=await Auth.currentAuthenticatedUser();
        let name=user.attributes.name;
        let domain=user.attributes.email.split('@')[1]
        const universityName = name.split(/\s+/); 
      name = universityName
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join("");
        let inst=await API.graphql({
            query:listInstitutions,
            variables: { 
                filter : {
                        domains :{
                            contains : domain
                        }
                    }
                },
            authMode:"AMAZON_COGNITO_USER_POOLS"
        })
        inst=inst.data.listInstitutions.items[0];
        if(inst.logo!==null && inst.logo!==undefined){
           let l=await Storage.get(inst.logo,{validateObjectExistence:true,expires:3600});
            setInstitutionLogo(l);
        }
        else{
            console.log("Sticking to default")
            setInstitutionLogo(logo)
        }
        setInstitution(inst);
    }catch(error){
        console.log(error)
        setInstitutionLogo(logo)
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
                                height: "calc(19vh)" ,   
                                justifyContent:"center",
                                justifyItems:"center",
                                maxWidth:"100%",
                                maxHeight:"100%"}}
                    >
                <img
                    src={instituitionLogo}
                    alt="Logo"
                    className="logo offset-2 img-fluid mr-1"
                    // width={"175px"}
                    // height={"155px"}
                    style={{width:"100%",height:"100%",border:"2px solid black",padding:"2px"}}
                    data-testid={'UniversityImage'}
                    />
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item text-center" data-testid={'Dashboard'}>
                        <Link 
                            to={'/dashboard'}  
                                state={institution}
                                className="nav-link"   
                                >     
                            <b>Dashboard</b>
                        </Link>
                    </li>
                    <li className="nav-item text-center" data-testid={'UploadSchedule'}>
                        <Link 
                            to={'/upload-schedule'}  
                                state={institution}
                                className="nav-link"   
                                >     
                            <b>Upload Schedule</b>
                        </Link>
                    </li>
                    <li className="nav-item text-center" data-testid={'UploadStudentFiles'}>
                        <Link 
                            to={'/upload-student-files'}  
                                state={institution}
                                className="nav-link"   
                                >     
                            <b>Upload Student Files</b>
                        </Link>
                    </li>
                    <li className="nav-item text-center" data-testid={'AddLecturer'}>
                        <Link 
                            to={'/add-lecturer'}  
                                state={institution}
                                className="nav-link"   
                                >     
                            <b>Add/Remove Lecturer</b>
                        </Link>
                    </li>
                    <li className="nav-item text-center">
                        <Link 
                            to={'/edit-university-info'}  
                                state={institution}
                                className="nav-link"   
                                >     
                            <b>Edit University Info</b>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="logoutbtn fixed-bottom col-2 p-4 ml-4">
                <button className={"btn btn-danger btn-lg btn-block"} style={{borderRadius:"25px"}} data-testid={'LogoutButton'} onClick={onSignOut}>Log Out</button>
            </div>
        </div>

            );
}
