import { useState, useEffect } from "react";

import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import { createLecturer, deleteLecturer, updateCourse, updateInstitution, } from "../../Graphql/mutations";
import { getInstitution, lecturersByInstitutionId, listAdmins, listLecturers } from "../../Graphql/queries";
import AddModal from './addCourse';
import { ErrorModal } from "../../Components/ErrorModal";
import HelpButton from '../../Components/HelpButton';
import UserManual from "../HelpFiles/AddLecturer.pdf";
import { useAdmin } from "../../ContextProviders/AdminContext";
import { useLecturerList } from "../../ContextProviders/LecturerListContext";
import CsvFileReader from "./csvReader";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ClearIcon from '@mui/icons-material/SearchSharp';

import { API, Auth } from 'aws-amplify';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import AddLecturerImage from "../../Images/AddLecturer.png";


const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        minWidth: '400px',
        borderRadius: '8px',
        padding: theme.spacing(2),
        boxShadow: '2', // Remove the shadow
        backdropFilter: "blur(5px)",
    },
}));



const AddLecturer = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [courses, setCourses] = useState([]);
    const [filterAttribute, setFilterAttribute] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [searchIcon, setSearchIcon] = useState(false);
    const [offeredCourses, setOfferedCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [lecturerToRemove, setLecturerToRemove] = useState(null);
    const [lecturerToRemoveIndex, setLecturerToRemoveIndex] = useState(null);
    const [isRemoving, setisRemoving] = useState(false);


    const [adding, setAdding] = useState("Add")

    let limit = 7;

    const { admin, setAdmin } = useAdmin();
    const { lecturerList, setLecturerList, nextToken, setNextToken } = useLecturerList()

    const handleChange = () => {
        setExpanded(!expanded)
    }

    const handleAdd = async (event) => {
        event.preventDefault()
        if (!isModalOpened && adding === "Add") {
            setAdding("Adding...")
            let lecturer = {
                institutionId: admin.institutionId,
                firstname: firstName,
                lastname: lastName,
                userRole: "Lecturer",
                email: email,
            };

            try {

                
                if (email !== admin.email) {
                    //let unique = admin.institution.lectureremails.filter((e) => e === email)
                    let emails = await API.graphql({
                        query: listLecturers,
                        variables: { filter: { email: { eq: lecturer.email } } }
                    })

                    if (emails.data.listLecturers.items.length === 0) {
                        let mutation = await API.graphql({
                            query: createLecturer,
                            variables: { input: lecturer },
                        });
                        //console.log(mutation);

                        lecturer = mutation.data.createLecturer
                        lecturer.courses = {
                            items: []
                        };

                        let emails;
                        if (admin.institution.lectureremails === null) {
                            emails = [];
                            emails.push(email);
                        }
                        else {
                            emails = admin.institution.lectureremails;
                            emails.push(email);
                        }

                        // let inst=await API.graphql({
                        //     query:getInstitution,
                        //     variables:{id:admin.institutionId}
                        // })

                        // console.log(inst);
                        // inst=inst.data.getInstitution;
                        // inst.lectureremails=emails;
                        let update = {
                            id: admin.institutionId,
                            lectureremails: emails,
                            _version:admin.institution._version
                        };

                        let ins=await API.graphql({
                            query: updateInstitution,
                            variables: { input: update },
                        });
                        console.log(ins);
                        // u = u.data.updateInstitution
                        // u.logoUrl = logoUrl;
                        // let ad = admin;
                        // ad.institution = u;
                        admin.institution.lectureremails = emails;
                        admin.institution._version=ins.data.updateInstitution._version;
                        setAdmin(admin);

                        //Add lecturer to courses
                        await addCourses(lecturer, selectedCourses)
                        if (lecturerList.length <= 10) {
                            lecturerList.push(lecturer);
                            setLecturerList(lecturerList);
                        }
                    }
                    else {
                        setError("A lecturer with this email already exists");
                    }
                } else {
                    setError("You cannot use the same account for Lecturer and Admin activities");
                }

            } catch (error) {
               console.log(error);
                if (error.errors !== undefined) {
                    let e = error.errors[0].message
                    if (e.search("Network") !== -1) {
                        setError("Request failed due to network issues");
                    }
                }
                else {
                    setError("Something went wrong.Please try again later");
                }
            }
            setAdding("Add")
            setFirstName("");
            setLastName("");
            setEmail("");
            setSelectedCourses([]);
        }
    }

    const removeCourses = async (courseList, lecturer) => {
        if (courseList === undefined)
            return;

        for (let i = 0; i < courseList.length; i++) {

            try {
                let updatedCourseData = {
                    id: courseList[i].id,
                    lecturerId: null,
                    _version:courseList[i]._version
                };

                let update = await API.graphql({
                    query: updateCourse,
                    variables: { input: updatedCourseData },
                });
                lecturer.courses.items.splice(i, 1);

            } catch (error) {
                console.log(error);
                if (error.errors !== undefined) {
                    let e = error.errors[0].message;
                    if (e.search("Network") !== -1) {
                        setError("Request failed due to network issues");
                    }
                }
                else {

                    setError("Something went wrong. Please try again later");
                }
            }

        }
    }

    const addCourses = async (lecturer, courseList) => {

        try {
            if (lecturer.courses === undefined) {
                lecturer.courses = {
                    items: []
                };
            }

            if (courseList === undefined)
                return;

            for (let i = 0; i < courseList.length; i++) {

                let updatedCourseData = {
                    id: courseList[i].id,
                    lecturerId: lecturer.id,
                    _version:courseList[i]._version
                };

                let update = await API.graphql({
                    query: updateCourse,
                    variables: { input: updatedCourseData }
                });
                lecturer.courses.items.push(update.data.updateCourse);
            }

            setLecturerList(lecturerList);
        } catch (error) {
            console.log(error);
            if (error.errors !== undefined) {
                let e = error.errors[0].message;
                if (e.search("Network") !== -1) {
                    setError("Request failed due to network issues");
                }
            }
            else {
                setError("Something went wrong. Please try again later");
            }
        }
    }

    const handleRemove = async (lecturer, index) => {
        setLecturerToRemove(lecturer);
        setLecturerToRemoveIndex(index);
        setOpenDialog(true);
    }

    const handleConfirmation = async (lecturer, index) => {
        setisRemoving(true);

        if (lecturerToRemove && lecturerToRemoveIndex !== null) {
            const lecturer = lecturerToRemove;
            const index = lecturerToRemoveIndex;
            let lec = {
                id: lecturer.id,
                _version:lecturer._version
            };
            try {
                let removeMutation = await API.graphql({
                    query: deleteLecturer,
                    variables: { input: lec },
                });
                let courseList = lecturer.courses.items;
                if (courseList !== undefined) {
                    await removeCourses(courseList, lecturer);
                    setOfferedCourses([...offeredCourses, courseList]);

                }

                let newEmails = admin.institution.lectureremails.filter(item => item !== lecturer.email);

                let update = {
                    id: admin.institutionId,
                    _version:admin.institution._version,
                    lectureremails: newEmails
                };
                // let inst=await API.graphql({
                //             query:getInstitution,
                //             variables:{id:admin.institutionId}
                //         })

                // console.log(inst);
                // inst=inst.data.getInstitution;
                // inst.lectureremails=newEmails;


                let u = await API.graphql({
                    query: updateInstitution,
                    variables: { input: update },
                });
                // let a = admin;
                // a.institution = u.data.updateInstitution;
                // a.institution.logoUrl = admin.institution.logoUrl;

                console.log(u);
                admin.institution.lectureremails = newEmails;
                admin.institution._version=u.data.updateInstitution._version;
                const rows = [...lecturerList];
                rows.splice(index, 1);
                setAdmin(admin);
                setLecturerList(rows);
                setOpenDialog(false);
                setisRemoving(false);
            }
            catch (error) {
                console.log(error);
                if (error.errors !== undefined) {
                    let e = error.errors[0].message;
                    if (e.search("Network") !== -1) {
                        setError("Request failed due to network issues");
                    }
                }
                else {
                    setError("Something went wrong. Please try again later");
                }
                setOpenDialog(false);
                setisRemoving(false);
            }
            finally {
                setOpenDialog(false);
                setisRemoving(false);
            }
        }
    };

    const loadMore = async () => {
        try {

            if (searchIcon === true) {
                if (filterAttribute !== "coursecode") {
                    let filter = `{"filter": { "and" : [ { "${filterAttribute}" : {"beginsWith":"${searchValue}"}}, {"institutionId":{"eq":"${admin.institutionId}"} }] },"limit":"${limit}","nextToken":"${nextToken}"}`;

                    let variables = JSON.parse(filter);


                    let lecturers = await API.graphql({
                        query: listLecturers,
                        variables: variables
                    })
                    lecturers = lecturers.data.listLecturers;
                    for (let i = 0; i < lecturers.items.length; i++) {
                        if(lecturers.items[i]._deleted===null)
                        lecturerList.push(lecturers.items[i]);
                    }
                    setLecturerList(lecturerList);
                    if (lecturers.items.length < limit) {
                        setNextToken(null);
                    }
                    else {
                        setNextToken(lecturers.nextToken);
                    }
                }
                                
            }
            else {
                let lecturers = await API.graphql({
                    query: lecturersByInstitutionId,
                    variables: {
                        institutionId: admin.institutionId,
                        limit: limit,
                        nextToken: nextToken
                    }
                });
                lecturers = lecturers.data.lecturersByInstitutionId;
                for (let i = 0; i < lecturers.items.length; i++) {
                    if(lecturers.items[i]._deleted===null)
                    lecturerList.push(lecturers.items[i]);
                }
                setLecturerList(lecturerList);
                if (lecturers.items.length < limit) {
                    setNextToken(null);
                }
                else {
                    setNextToken(lecturers.nextToken);
                }
            }

        } catch (error) {
            console.log(error);
            setError("Something went wrong. Try again later");
        }
    }

    const fetchLecturers = async () => {
        try {
            let adminInfo = admin;
            if (lecturerList.length < 4) {
                if (adminInfo === null) {
                    let user = await Auth.currentAuthenticatedUser();
                    let adminEmail = user.attributes.email;
                    adminInfo = await API.graphql({
                        query: listAdmins,
                        variables: {
                            filter: {
                                email: {
                                    eq: adminEmail
                                }
                            }
                        }
                    })
                    adminInfo = adminInfo.data.listAdmins.items[0];
                    setAdmin(adminInfo);
                }
                let lecturers = await API.graphql({
                    query: lecturersByInstitutionId,
                    variables: {
                        institutionId: adminInfo.institutionId,
                        limit: limit
                    },
                });

                lecturers = lecturers.data.lecturersByInstitutionId;

                setLecturerList(lecturers.items.filter((item)=>item._deleted===null));
                if (lecturers.items.length < limit) {
                    setNextToken(null);
                }
                else {
                    setNextToken(lecturers.nextToken);
                }
                //setNextToken(lecturers.nextToken);
                //setOfferedCourses(offeredCourses);
                //setLecturerList(lecturers.items);
                // }
            }
        }
        catch (error) {
           console.log(error);
            if (error.errors !== undefined) {
                let e = error.errors[0].message;
                if (e.search("Network") !== -1) {
                    setError("Request failed due to network issues");
                }
            }
            else {
                setError("Something went wrong. Please try again later");
            }
        }
    }

    const handleSearch = async () => {
        try {
            console.log(searchIcon);
            if (searchIcon === false) {
                console.log(searchValue)
                if (searchValue !== "") {
                    console.log(filterAttribute);
                    if (filterAttribute !== "default") {

                        let filter = `{"filter": { "and" : [ { "${filterAttribute}" : {"beginsWith":"${searchValue}"}}, {"institutionId":{"eq":"${admin.institutionId}"} }] },"limit":"${limit}"}`;
                        let variables = JSON.parse(filter);


                        console.log(variables);
                        let lecturers = await API.graphql({
                            query: listLecturers,
                            variables: variables
                        })
                        console.log(lecturers);
                        setSearchIcon(!searchIcon);
                        lecturers = lecturers.data.listLecturers;
                        
                        setLecturerList(lecturers.items.filter((item)=>item._deleted===null));
                        if (lecturers.items.length < limit) {
                            setNextToken(null);
                        }
                        else {
                            setNextToken(lecturers.nextToken);
                        }
                       
                    }
                }
            }
            else {
                let lecturers = await API.graphql({
                    query: lecturersByInstitutionId,
                    variables: {
                        institutionId: admin.institutionId,
                        limit: limit
                    }
                });
                lecturers = lecturers.data.lecturersByInstitutionId;
                console.log(lecturers);
                setSearchIcon(!searchIcon);
                setLecturerList(lecturers.items.filter((item)=>item._deleted===null));
                if (lecturers.items.length < limit) {
                    setNextToken(null);
                }
                else {
                    setNextToken(lecturers.nextToken);
                }
                
            }
            //}
        } catch (error) {
            console.log(error);
            if (error.errors !== undefined) {
                let e = error.errors[0].message;
                if (e.search("Network") !== -1) {
                    setError("Request failed due to network issues");
                }
                else {
                    setError("Something went wrong. Please try again later");
                }
            }
        }
    }

    useEffect(() => {
        fetchLecturers();
    }, [])

    return (

        <div style={{ display: 'inline-flex', maxHeight: "100vh" }}>
            <div>
                <HelpButton pdfUrl={UserManual} />
            </div>

            {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
            <nav style={{ width: '20%' }} data-testid="InstitutionNavigation">
                {/* Navigation bar content */}

                <InstitutionNavigation />
            </nav>

            <main style={{ width: '900px', marginTop: '10%' }}>
                {/* Input forms content */}
                <h1 className="text-center">Add a lecturer</h1>
                <h6 style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Use this to add lecturers to your institution and assign them to their courses. This will allow lecturers to sign up for an account.</h6>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                    <img src={AddLecturerImage} style={{ maxWidth: "300px", maxHeight: "200px" }} alt="AddLecturer" />
                </div>
                <div className="card shadow">
                    <div className="card-body">
                        <form onSubmit={handleAdd}>
                            <div className="form-row">
                                {/* First name */}
                                <div className="form-group col-6">
                                    <label htmlFor="name">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="John"
                                        data-testid="firstName"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                {/* Last name */}
                                <div className="form-group col-6">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastname"
                                        placeholder="Doe"
                                        data-testid="lastName"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                {/* Email */}
                                <div className="form-group col-6">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="john.doe@up.ac.za"
                                        data-testid="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/*Adding courses via Modal popup */}
                                <div className="form-group col-6" >
                                    <label htmlFor="Course">Courses</label>
                                    <AddModal
                                        updateFlag={(false)}
                                        lecturerData={(null)}
                                        addCourses={addCourses}
                                        removeCourses={removeCourses}
                                        courseData={offeredCourses}
                                        setModal={setIsModalOpened}
                                        setCourses={setCourses}
                                        selectedCourses={selectedCourses}
                                        offeredCourses={offeredCourses}
                                        setSelectedCourses={setSelectedCourses}
                                        setOfferedCourses={setOfferedCourses}
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-danger w-100"
                                style={{ backgroundColor: '#e32f45', borderRadius: "30px", color: "white", width: "90px" }}
                                data-testid="submitButton"
                            >
                                {adding}
                            </button>
                        </form>
                    </div>
                </div>
                {/* <div>



                    <CsvFileReader
                        adding={adding}
                        setAdding={setAdding}
                        adminEmail={admin?.email}
                        institutionId={admin?.institutionId}
                    />

                </div> */}

                {/* Display content */}
                <h1 className="text-center">Lecturers</h1>
                <h6 style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Use this to search, edit, view and delete lecturers from your institution. Note that removing a lecturer prevents them from creating an account.</h6>
                {/* Search bar with search material ui icon and border radius of 20px */}
                <div className="input-group mb-3 p-1">
                    <input onChange={(e) => setSearchValue(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Search for a lecturer"
                        aria-label="Search for a lecturer"
                        aria-describedby="button-addon2"
                        data-testid="searchInput"
                    />
                    <div className="input-group-append">
                        <button onClick={handleSearch}
                            className="btn btn-outline-danger"
                            style={{
                                cursor: 'pointer',
                                transition: 'color 0.3s', // Add a smooth transition for the color change
                                color: searchIcon ? '#FFFFFF' : '#e32f45',
                            }}
                            type="button"
                            id="button-addon2"
                            data-testid="searchButton"
                            // onMouseEnter={() => setSearchIcon(true)}
                            // onMouseLeave={() => setSearchIcon(false)}
                        //style={{ backgroundColor: searchIcon ? "#e32f45" : "white" }}
                        >

                            <div className="input-group-append">
                                {searchIcon === true? <SearchSharpIcon style={{ "color": "#e32f45" }} /> : <ClearIcon style={{ "color": "#e32f45" }} />}
                            </div>
                        </button>
                        {/* a dropdown filter for the search */}
                        <select onChange={(e) => setFilterAttribute(e.target.value)}
                            value={filterAttribute}
                            className="custom-select"
                            id="inputGroupSelect01"
                            data-testid="filterSelect"
                        >
                            <option value="default">Filter by</option>
                            <option value="firstname" >First Name</option>
                            <option value="lastname" >Last Name</option>
                            <option value="email" >Email</option>
                        </select>
                    </div>
                </div>
                <div
                    className="card shadow w-100"
                    style={{ width: '500px'}}
                >
                    <div className="card-body">
                        <table
                            className="table table-hover"
                            style={{ alignItems: 'center' }}
                            data-testid="lecturersTable"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Courses</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lecturerList.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.firstname}</td>
                                            <td>{val.lastname}</td>
                                            <td>
                                                <a href={`mailto:${val.email}?subject=${encodeURIComponent("Pronto Lecturers")}&body=${encodeURIComponent("Hello " + val.firstname + " " + val.lastname + ". You have been (added to Pronto/removed from Pronto)")}`} data-testid="lecturerEmail">
                                                    {val.email}
                                                </a>
                                            </td>
                                            <td>
                                                <AddModal
                                                    updateFlag={(true)}
                                                    lecturerData={val}
                                                    addCourses={addCourses}
                                                    removeCourses={removeCourses}
                                                    courseData={courses}
                                                    setModal={setIsModalOpened}
                                                    setCourses={setCourses}
                                                    selectedCourses={val.courses.items}
                                                    offeredCourses={offeredCourses}
                                                    setSelectedCourses={setSelectedCourses}
                                                    setOfferedCourses={setOfferedCourses}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleRemove(val, key)}
                                                    type="button"
                                                    className="btn btn-danger w-100"
                                                    style={{ backgroundColor: '#e32f45', borderRadius: "30px", color: "white", width: "90px" }}
                                                    data-testid="deleteButton"
                                                >
                                                    Remove
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}

                            </tbody>

                        </table>
                        <div>
                            <div style={{ paddingLeft: "42.5%", paddingRight: "42.5%" }}>
                                {nextToken && <button className="btn btn-danger w-100" type="button" onClick={loadMore}> Load More </button>}
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </main >
            <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle
                    style={{ fontWeight: "500", textAlign: "center" }}
                >Deletion Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove this lecturer? They will not be able to access their account permanently.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleConfirmation}
                        color="primary"
                        style={{ backgroundColor: '#e32f45', borderRadius: "30px", color: "white", width: "100px" }} // Add your custom styling here
                    >
                        {isRemoving ? "Deleting..." : "Delete"}
                    </Button>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </StyledDialog>
        </div >
    );
};

export default AddLecturer;