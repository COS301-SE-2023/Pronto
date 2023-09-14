import { useState, useEffect } from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import { createLecturer, deleteLecturer, updateCourse, updateInstitution } from "../../graphql/mutations";
import { lecturersByInstitutionId, searchLecturers, listAdmins, searchLecturerByCourses } from "../../graphql/queries";
import { API, Auth } from 'aws-amplify';
import AddModal from './addCourse';
import { ErrorModal } from "../../Error pages/ErrorModal";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ClearIcon from '@mui/icons-material/Clear';
import HelpButton from '../../HelpButton';
import UserManual from "../HelpFiles/AddLecturer.pdf";
import { useAdmin } from "../../ContextProviders/AdminContext";
import { useLecturerList } from "../../ContextProviders/LecturerListContext";

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

    const [adding, setAdding] = useState("Add")

    let limit = 7;

    const { admin, setAdmin } = useAdmin();
    const { lecturerList, setLecturerList, nextToken, setNextToken } = useLecturerList()

    const handleAdd = async (event) => {
        event.preventDefault()
        if (!isModalOpened) {
            setAdding("Adding...")
            let lecturer = {
                institutionId: admin.institutionId,
                firstname: firstName,
                lastname: lastName,
                userRole: "Lecturer",
                email: email,
            };

            try {
                let unique = admin.institution.lectureremails.filter((e) => e === email)
                if (unique.length === 0) {
                    let mutation = await API.graphql({
                        query: createLecturer,
                        variables: { input: lecturer },
                    });

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
                    let logoUrl = admin.institution.logoUrl;
                    let update = {
                        id: admin.institutionId,
                        lectureremails: emails
                    };

                    let u = await API.graphql({
                        query: updateInstitution,
                        variables: { input: update },
                    });
                    u = u.data.updateInstitution
                    u.logoUrl = logoUrl;
                    let ad = admin;
                    ad.institution = u;

                    setAdmin(ad);

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

            } catch (error) {
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
                };

                let update = await API.graphql({
                    query: updateCourse,
                    variables: { input: updatedCourseData },
                });
                lecturer.courses.items.splice(i, 1);

            } catch (error) {

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
                };

                let update = await API.graphql({
                    query: updateCourse,
                    variables: { input: updatedCourseData }
                });
                lecturer.courses.items.push(update.data.updateCourse);
            }

            setLecturerList(lecturerList);
        } catch (error) {
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
        let lec = {
            id: lecturer.id,
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

            let newEmails = admin.institution.lectureremails.filter(item => item !== removeMutation.data.deleteLecturer.email);

            let update = {
                id: admin.institutionId,
                lectureremails: newEmails
            };

            let u = await API.graphql({
                query: updateInstitution,
                variables: { input: update },
            });
            let a = admin;
            a.institution = u.data.updateInstitution;
            a.institution.logoUrl = admin.institution.logoUrl;
            const rows = [...lecturerList];
            rows.splice(index, 1);
            setAdmin(a);
            setLecturerList(rows);
        }
        catch (error) {
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

    const loadMore = async () => {
        try {

            if (searchIcon === true) {
                if (filterAttribute !== "coursecode") {
                    let filter = `{"filter": { "and" : [ { "${filterAttribute}" : {"matchPhrasePrefix":"${searchValue}"}}, {"institutionId":{"eq":"${admin.institutionId}"} }] },"limit":"${limit}","nextToken":"${nextToken}"}`;

                    let variables = JSON.parse(filter);


                    let lecturers = await API.graphql({
                        query: searchLecturers,
                        variables: variables
                    })
                    lecturers = lecturers.data.searchLecturers;
                    for (let i = 0; i < lecturers.items.length; i++) {
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
                else {
                    if (filterAttribute === "coursecode") {
                        let lecturers = await API.graphql({
                            query: searchLecturerByCourses,
                            variables: {
                                filter: {
                                    coursecode: { matchPhrasePrefix: searchValue },
                                    institutionId: { eq: admin.institutionId },

                                },
                                limit: limit
                            }
                        })
                        let token = lecturers.data.searchCourses.nextToken;
                        lecturers = lecturers.data.searchCourses.items;
                        lecturers.filter((c) => c !== null && c.institutionId === admin.institutionId);
                        lecturers = lecturers.filter((value, index, self) =>
                            index === self.findIndex((t) => (
                                t.id === value.id
                            ))
                        )
                        if (lecturers.length < limit) {
                            setNextToken(null);
                        }
                        else {
                            setNextToken(token);
                        }
                        for (let i = 0; i < lecturers.length; i++) {
                            lecturerList.push(lecturers[i].lecturer);
                        }
                        setLecturerList(lecturerList);
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

                setLecturerList(lecturers.items);
                if (lecturers.items.length < limit) {
                    setNextToken(null);
                }
                else {
                    setNextToken(lecturers.nextToken);
                }
                setNextToken(lecturers.data.lecturersByInstitutionId.nextToken);
                setOfferedCourses(offeredCourses);
                setLecturerList(lecturers.data.lecturersByInstitutionId.items);
                // }
            }
        }
        catch (error) {
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
            if (searchIcon === false) {
                if (searchValue !== "") {
                    if (filterAttribute === "coursecode") {
                        let lecturers = await API.graphql({
                            query: searchLecturerByCourses,
                            variables: {
                                filter: {
                                    coursecode: { matchPhrasePrefix: searchValue },
                                    institutionId: { eq: admin.institutionId },
                                },
                                limit: limit
                            }
                        })

                        let token = lecturers.data.searchCourses.nextToken;
                        lecturers = lecturers.data.searchCourses.items;
                        lecturers.filter((c) => c !== null && c.institutionId === admin.institutionId);
                        lecturers = lecturers.filter((value, index, self) =>
                            index === self.findIndex((t) => (
                                t.id === value.id
                            ))
                        )
                        if (lecturers.length < limit) {
                            setNextToken(null);
                        }
                        else {
                            setNextToken(token);
                        }
                        let l = [];
                        for (let i = 0; i < lecturers.length; i++) {
                            l.push(lecturers[i].lecturer);
                        }
                        setLecturerList(l);
                        setSearchIcon(!searchIcon);
                    }
                    else if (filterAttribute !== "default" && filterAttribute !== "") {

                        let filter = `{"filter": { "and" : [ { "${filterAttribute}" : {"matchPhrasePrefix":"${searchValue}"}}, {"institutionId":{"eq":"${admin.institutionId}"} }] },"limit":"${limit}"}`;
                        let variables = JSON.parse(filter);


                        let lecturers = await API.graphql({
                            query: searchLecturers,
                            variables: variables
                        })
                        lecturers = lecturers.data.searchLecturers;
                        setLecturerList(lecturers.items);
                        if (lecturers.items.length < limit) {
                            setNextToken(null);
                        }
                        else {
                            setNextToken(lecturers.nextToken);
                        }
                        setSearchIcon(!searchIcon);
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
                setLecturerList(lecturers.items);
                if (lecturers.items.length < limit) {
                    setNextToken(null);
                }
                else {
                    setNextToken(lecturers.nextToken);
                }
                setSearchIcon(!searchIcon)
            }

        } catch (error) {

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
                <h1 className="text-center" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Add a lecturer</h1>
                <h6 style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Use this to add lecturers to your institution and assign them to their courses. This will allow lecturers to sign up for an account.</h6>
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
                                data-testid="submitButton"
                            >
                                {adding}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Display content */}
                <h1 className="text-center" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Lecturers</h1>
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
                            type="button"
                            id="button-addon2"
                            data-testid="searchButton"
                        //style={{ backgroundColor: searchIcon ? "#e32f45" : "white" }}
                        >
                            <div className="input-group-append">
                                {searchIcon === false ? <SearchSharpIcon style={{ "color": "#e32f45" }} /> : <ClearIcon style={{ "color": "#e32f45" }} />}
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
                            <option value="coursecode">Course Code</option>
                        </select>
                    </div>
                </div>
                <div
                    className="card shadow w-100"
                    style={{ width: '500px', maxHeight: "100vh" }}
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
                                                <a href="mailto:" data-testid="lecturerEmail">
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
                                                <button onClick={() => { handleRemove(val, key) }}
                                                    type="button"
                                                    className="btn btn-danger w-100"
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
            </main>

        </div>
    );
};

export default AddLecturer;