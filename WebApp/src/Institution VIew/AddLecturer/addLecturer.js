import { React, useState, useEffect } from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import { createLecturer, deleteLecturer, updateCourse } from "../../graphql/mutations";
import { lecturersByInstitutionId, listInstitutions, listLecturers } from "../../graphql/queries";
import { API, Auth } from 'aws-amplify';
import AddModal from './addCourse';
import { ErrorModal } from "../../ErrorModal";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import HelpButton from '../../HelpButton';
import UserManual from "../HelpFiles/UserManual.pdf";

const AddLecturer = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [courses, setCourses] = useState([])
    const [filterAttribute, setFilterAttribute] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [lecturers, setLecturers] = useState([])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [searchIcon, setSearchIcon] = useState(false)
    const [institution, setInstitution] = useState("")
    const [offeredCourses, setOfferedCourses] = useState([])
    const [selectedCourses, setSelectedCourses] = useState([])
    const [error, setError] = useState("")

    const handleAdd = async (event) => {
        event.preventDefault()
        if (!isModalOpened) {
            //courseList=await findCourses(courses)

            let lecturer = {
                institutionId: institution.id,
                firstname: firstName,
                lastname: lastName,
                userRole: "Lecturer",
                email: email,
            }

            try {
                let mutation = await API.graphql({
                    query: createLecturer,
                    variables: { input: lecturer },
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                })

                lecturer = mutation.data.createLecturer
                lecturer.courses = []
                lecturers.push(mutation.data.createLecturer)

                //Add lecturer to courses
                await addCourses(lecturer, selectedCourses)
                if (lecturers.length < 19)
                    setLecturers(lecturers)

            } catch (error) {
                let e = error.errors[0].message
                if (e.search("Unathorized") !== -1) {
                    setError("You are not authorized to perform this action.Please log out and log in")
                }
                else if (e.search("Network") !== -1) {
                    setError("Request failed due to network issues")
                }
                else {
                    setError("Something went wrong.Please try again later")
                }
            }
            setFirstName("")
            setLastName("")
            setEmail("")
            setSelectedCourses([])
        }
    }

    const removeCourses = async (courseList, lecturer) => {
        if (courseList === undefined)
            return

        for (let i = 0; i < courseList.length; i++) {

            try {
                let updatedCourseData = {
                    id: courseList[i].id,
                    lecturerId: null,
                }

                let update = await API.graphql({
                    query: updateCourse,
                    variables: { input: updatedCourseData },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                })
                lecturer.courses.splice(i, 1)

            } catch (error) {
                let e = error.errors[0].message
                if (e.search("Unathorized") !== -1) {
                    setError("You are not authorized to perform this action.Please log out and log in")
                }
                else if (e.search("Network") !== -1) {
                    setError("Request failed due to network issues")
                }
                else {
                    setError("Something went wrong.Please try again later")
                }
            }
        }
    }

    const addCourses = async (lecturer, courseList) => {

        if (lecturer.courses === undefined)
            lecturer.courses = []
        if (courseList === undefined)
            return

        for (let i = 0; i < courseList.length; i++) {
            try {
                let updatedCourseData = {
                    id: courseList[i].id,
                    institutionId: institution.id,
                    coursecode: courseList[i].coursecode,
                    lecturerId: lecturer.id,
                }

                let update = await API.graphql({
                    query: updateCourse,
                    variables: { input: updatedCourseData },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                })
                lecturer.courses.items.push(update.data.updateCourse)
                setLecturers(lecturers)

            } catch (error) {
                let e = error.errors[0].message
                if (e.search("Unathorized") !== -1) {
                    setError("You are not authorized to perform this action.Please log out and log in")
                }
                else if (e.search("Network") !== -1) {
                    setError("Request failed due to network issues")
                }
                else {
                    setError("Something went wrong.Please try again later")
                }
            }
        }
    }

    const handleRemove = async (lecturer, index) => {
        let lec = {
            id: lecturer.id,
        }
        try {
            let removeMutation = await API.graphql({
                query: deleteLecturer,
                variables: { input: lec },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            })
            let courseList = lecturer.courses
            if (courseList !== undefined) {
                await removeCourses(courseList, lecturer)
                setOfferedCourses([...offeredCourses, courseList])

            }
            const rows = [...lecturers]
            rows.splice(index, 1)
            setLecturers(rows)
        }
        catch (error) {
            let e = error.errors[0].message
            if (e.search("Unathorized") !== -1) {
                setError("You are not authorized to perform this action.Please log out and log in")
            }
            else if (e.search("Network") !== -1) {
                setError("Request failed due to network issues")
            }
            else {
                setError("Something went wrong.Please try again later")
            }
        }
    }

    const fetchLecturers = async () => {
        try {
            let user = await Auth.currentAuthenticatedUser()
            if (user === undefined) {
                setError("You are not logged in! Please click on the logout button and log in to use    Pronto")
            }
            else {
                let domain = user.attributes.email.split("@")[1]
                let institution = await API.graphql({
                    query: listInstitutions,
                    variables: {
                        filter: {
                            domains: {
                                contains: domain
                            }
                        }
                    },
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                })
                if (institution.data.listInstitutions.items.length === 0) {
                    setError("Oops! We could not find your Institution.Please contact the developers for further assistance")
                }
                else {
                    institution = institution.data.listInstitutions.items[0]
                    setInstitution(institution)
                    setCourses(institution.courses.items)
                    let lecturerList = institution.lecturer.items
                    for (let i = 0; i < courses.length; i++) {
                        if (courses[i].lecturerId === null) {
                            offeredCourses.push(courses[i])
                        }

                        if (courses[i].lecturerId !== null) {
                            for (let j = 0; j < lecturerList.length; j++) {
                                if (lecturerList[j].id === courses[i].lecturerId) {
                                    lecturerList[j].courses.items.push(courses[i])
                                    break
                                }
                            }

                        }
                    }
                    setLecturers(lecturerList)
                }
            }
        }
        catch (error) {
            let e = error.errors[0].message
            if (e.search("Unathorized") !== -1) {
                setError("You are not authorized to perform this action.Please log out and log in")
            }
            else if (e.search("Network") !== -1) {
                setError("Request failed due to network issues")
            }
            else {
                setError("Something went wrong.Please try again later")
            }
        }
    }

    const handleSearch = async () => {
        try {

            if (searchIcon === false) {
                let institution = await Auth.currentAuthenticatedUser()
                if (filterAttribute === "firstname") {
                    let search = await API.graphql({
                        query: lecturersByInstitutionId,
                        variables: {
                            //institutionId : institution.username,  
                            institutionId: institution.id,
                            filter: {
                                firstname: {
                                    eq: searchValue
                                }
                            }
                        },
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    })
                    setLecturers(search.data.lecturersByInstitutionId.items)
                }
                else if (filterAttribute === "lastname") {
                    let search = await API.graphql({
                        query: lecturersByInstitutionId,
                        variables: {
                            //institutionId : institution.username,  
                            institutionId: institution.id,
                            filter: {
                                lastname: {
                                    eq: searchValue
                                }
                            }
                        },
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    })
                    setLecturers(search.data.lecturersByInstitutionId.items.filter(item => item._deleted === null))
                }
                else if (filterAttribute === "email") {
                    let search = await API.graphql({
                        query: lecturersByInstitutionId,
                        variables: {
                            //institutionId : institution.username,  
                            institutionId: institution.id,
                            filter: {
                                email: {
                                    eq: searchValue
                                }
                            }
                        },
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    })
                    setLecturers(search.data.lecturersByInstitutionId.items.filter(item => item._deleted === null))
                }
                setSearchIcon(!searchIcon)
            }
            else {

                fetchLecturers()
                setSearchIcon(!searchIcon)
            }
        } catch (error) {
            let e = error.errors[0].message
            if (e.search("Unathorized") !== -1) {
                setError("You are not authorized to perform this action.Please log out and log in")
            }
            else if (e.search("Network") !== -1) {
                setError("Request failed due to network issues")
            }
            else {
                setError("Something went wrong.Please try again later")
            }
        }
    }

    useEffect(() => {
        fetchLecturers();
    }, [])

    return (

        <div style={{ display: 'inline-flex' }}>
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
                                        //findCourses={findCourses}
                                        addCourses={addCourses}
                                        removeCourses={removeCourses}
                                        courseData={courses}
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
                                Add
                            </button>
                        </form>
                    </div>
                </div>

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
                            type="button"
                            id="button-addon2"
                            data-testid="searchButton"
                            style={{ backgroundColor: searchIcon ? "#e32f45" : "white" }}
                        >
                            <div className="input-group-append">
                                <SearchSharpIcon style={{ "color": "#e32f45" }} />
                            </div>
                        </button>
                        {/* a dropdown filter for the search */}
                        <select onChange={(e) => setFilterAttribute(e.target.value)}
                            value={filterAttribute}
                            className="custom-select"
                            id="inputGroupSelect01"
                            data-testid="filterSelect"
                        >
                            <option value={'default'}>Filter by</option>
                            <option value="firstname" >First Name</option>
                            <option value="lastname" >Last Name</option>
                            <option value="email" >Email</option>
                        </select>
                    </div>
                </div>
                <div
                    className="card shadow w-100"
                    style={{ width: '500px' }}
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
                                {lecturers.map((val, key) => {
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
                    </div>
                </div>
            </main>



        </div>
    );
};

export default AddLecturer;
