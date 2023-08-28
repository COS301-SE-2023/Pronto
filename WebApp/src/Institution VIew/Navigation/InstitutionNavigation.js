import { useState, useEffect } from "react";
import "./Navigation.css";
import logo from "../../images/university_logo.svg";
import { Auth, Storage, API } from "aws-amplify";
import { listAdmins, listInstitutions, lecturersByInstitutionId } from "../../graphql/queries";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function InstitutionNavigation({ props }) {
    const navigate = useNavigate();
    const state = useLocation();
    //const[institution,setInstitution]=useState(state.state)
    const [admin, setAdmin] = useState(state.state);


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

    const fetchLogo = async () => {
        try {

            if (admin === null || admin === undefined) {
                let user = await Auth.currentAuthenticatedUser();
                let email = user.attributes.email

                let adminData = await API.graphql({
                    query: listAdmins,
                    variables: {
                        filter: {
                            email: {
                                eq: email
                            }
                        },
                    },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });

                adminData = adminData.data.listAdmins.items[0];

                if (adminData.institution.logo !== null && adminData.institution.logo !== undefined) {
                    adminData.institution.logoUrl = await Storage.get(adminData.institution.logo, { validateObjectExistence: true, expires: 3600 });
                }
                else {
                    adminData.institution.logoUrl = logo;
                }
                setAdmin(adminData);
            }
            else {
                if (admin.institution.logoUrl === undefined || admin.institution.logoUrl === null) {
                    let adminData = admin;
                    adminData.institution.logoUrl = logo;
                    admin.institution.logoUrl = await Storage.get(admin.institution.logo, { validateObjectExistence: true, expires: 3600 });
                    setAdmin(adminData);
                }
            }
        } catch (error) {

            let a = admin;
            a.institution.logoUrl = logo;
            setAdmin(a);
        }
    }


    useEffect(() => {
        fetchLogo()
    }, []);

    return (
        <div className={'grid'}>
            <nav className="vertical-navbar col-4 p-4" >
                <div className="top">

                    <img
                        src={admin !== undefined ? admin !== null ? admin.institution.logoUrl : " " : "  "}
                        alt="Logo"
                        className="logo offset-2 img-fluid mr-1"
                        width={"175px"}
                        height={"155px"}
                        data-testid={'UniversityImage'}
                    />

                    <div className="institution-name">
                        <b>
                            {admin && admin.institution && admin.institution.name}
                        </b>
                    </div>
                </div>

                <div className="nav-links-container">
                    <ul className="navbar-nav">
                        <li className="nav-item text-center" data-testid={'Dashboard'}>
                            <Link
                                to={'/institution/dashboard'}
                                state={admin}
                                className="nav-link"
                            >
                                <b>Dashboard</b>
                            </Link>
                        </li>
                        <li className="nav-item text-center" data-testid={'UploadSchedule'}>
                            <Link
                                to={'/institution/upload-schedule'}
                                state={admin}
                                className="nav-link"
                            >
                                <b>Upload Schedule</b>
                            </Link>
                        </li>
                        <li className="nav-item text-center" data-testid={'UploadStudentFiles'}>
                            <Link
                                to={'/institution/upload-student-files'}
                                state={admin}
                                className="nav-link"
                            >
                                <b>Upload Student Files</b>
                            </Link>
                        </li>
                        <li className="nav-item text-center" data-testid={'AddLecturer'}>
                            <Link
                                to={'/institution/add-lecturer'}
                                state={admin}
                                className="nav-link"
                            >
                                <b>Add/Remove Lecturer</b>
                            </Link>
                        </li>
                        <li className="nav-item text-center">
                            <Link
                                to={'/institution/edit-info'}
                                state={admin}
                                className="nav-link"
                            >
                                <b>Edit University Info</b>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="logoutbtn">
                    <button
                        className="btn btn-danger btn-lg btn-block"
                        style={{ borderRadius: "25px" }}
                        data-testid="LogoutButton"
                        onClick={onSignOut}
                    >
                        Log Out
                    </button>
                </div>
            </nav >


        </div >

    );
}
