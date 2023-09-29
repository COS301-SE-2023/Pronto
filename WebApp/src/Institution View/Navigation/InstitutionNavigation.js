import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import { listAdmins } from "../../Graphql/queries";
import { useAdmin } from "../../ContextProviders/AdminContext";
import { DataStore } from "aws-amplify";
import { Admin } from "../../Graphql/models";

import { Auth, Storage, API } from "aws-amplify";

export default function InstitutionNavigation() {
    const navigate = useNavigate();
    const { admin, setAdmin } = useAdmin();
    const [institution,setInstitution]=useState("")
    const location = useLocation();
    const [signOut, setSignOut] = useState(false);

    const onSignOut = async (event) => {
        event.preventDefault();
        setSignOut(true);
        try {
            await Auth.signOut();
            //navigate to homepage
            setSignOut(false);
            navigate("/");
        } catch (e) {
            setSignOut(false);
            navigate("/");
        }
    };


    const fetchAdmin = async () => {

        try {
        
            if (admin === null || admin === undefined) {
                 let user = await Auth.currentAuthenticatedUser();
                 let adminEmail = user.attributes.email

            //console.log(admin)
            let adminData= await DataStore.query(Admin,(a)=>a.email.eq(adminEmail))
            // const institution= adminData[0].institution.then((inst)=>{
            //         if (inst.logo!== null) {
            //     inst.logoUrl = Storage.get(adminData.institution.logo, { validateObjectExistence: true, expires: 3600 }).th;
            // }
            // });
            
            // let h=adminData;
            // h.institution=institution;
            console.log(institution)
            setAdmin(adminData[0]);

            setInstitution(institution);
                
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {

        fetchAdmin()
    }, []);

    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 p-4" >
                <div className="top"> {/* top holds University image and name portion*/}

                    <img
                        src={institution !== undefined ? institution !== null ? institution?.logoUrl : " " : "  "}
                        alt=""
                        className="logo offset-2 img-fluid mr-4.5"
                        style={{ width: "155px", height: "155px" }}
                        data-testid={'UniversityImage'}
                    />

                    <div className="institution-name" style={{ paddingTop: '5%' }}>
                        <b>
                            {institution?.name}
                        </b>
                    </div>
                </div>

                <ul className="navbar-nav">
                    <li data-testid={'Dashboard'}>
                        <Link
                            to={'/institution/dashboard'}
                            state={admin}
                            className={`nav-link text-center ${location.pathname === '/institution/dashboard' ? 'active' : ''}`}
                        >
                            <b>Dashboard</b>
                        </Link>
                    </li>
                    <li data-testid={'UploadSchedule'}>
                        <Link
                            to={'/institution/upload-schedule'}
                            state={admin}
                            className={`nav-link text-center ${location.pathname === '/institution/upload-schedule' ? 'active' : ''}`}
                        >
                            <b>Upload Schedule</b>
                        </Link>
                    </li>
                    <li data-testid={'UploadStudentFiles'}>
                        <Link
                            to={'/institution/upload-student-files'}
                            state={admin}
                            className={`nav-link text-center ${location.pathname === '/institution/upload-student-files' ? 'active' : ''}`}
                        >
                            <b>Upload Student Files</b>
                        </Link>
                    </li>
                    <li data-testid={'AddLecturer'}>
                        <Link
                            to={'/institution/add-lecturer'}
                            state={admin}
                            className={`nav-link text-center ${location.pathname === '/institution/add-lecturer' ? 'active' : ''}`}
                        >
                            <b>Add/Remove Lecturer</b>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={'/institution/edit-info'}
                            state={admin}
                            className={`nav-link text-center ${location.pathname === '/institution/edit-info' ? 'active' : ''}`}
                        >
                            <b>Edit University Info</b>
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
                        {signOut ? "Logging Out..." : "Log Out"}
                    </button>
                </div>
            </nav >

        </div >

    );
}
