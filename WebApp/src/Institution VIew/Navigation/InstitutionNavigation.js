import {useState,useEffect} from "react";
import "./Navigation.css";
import logo from "../../images/university_logo.svg";
import { Auth,Storage,API } from "aws-amplify";
import { listInstitutions } from "../../graphql/queries";
import { useNavigate,Link, useLocation } from "react-router-dom";

export default function InstitutionNavigation({props}) {
  const navigate = useNavigate();
  const state=useLocation();
  const[institution,setInstitution]=useState(state.state)
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

        if(institution===undefined || institution===null){
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
            console.log("fectching")
            if(inst.logo!==null && inst.logo!==undefined ){
               inst.logoUrl=await Storage.get(inst.logo,{validateObjectExistence:true,expires:3600});
            }
            else{
                inst.logoUrl=logo
            }
            setInstitution(inst);
        }
        else{ 
            if(institution.logoUrl===undefined || institution.logoUrl===null){
                let inst=institution
                inst.logoUrl=await Storage.get(inst.logo,{validateObjectExistence:true,expires:3600});
                setInstitution(inst) 
            }
        }
    }catch(error){
        let i =institution;
        i.logoUrl=logo;
        setInstitution(i);
    }
  }


  useEffect(()=> { 
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
                    src={institution!==undefined? institution!==null? institution.logoUrl : " " : "  "}
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
