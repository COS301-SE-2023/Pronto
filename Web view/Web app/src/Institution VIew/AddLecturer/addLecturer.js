import {React,useState,useEffect} from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import { createLecturer,createAdmin,createInstitution} from "../../graphql/mutations"; 
import { listAdmins,listLecturers,getInstitution,getAdmin } from "../../graphql/queries";
import  {API} from 'aws-amplify';
import { Auth } from "aws-amplify";
const AddLecturer = () => {

    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]= useState("")
    const [moduleCode,setModuleCode]=useState("")  

    const [lecturers ,setLecturers]= useState([])
    // let lecturers=[ 
    //     {firstname:"",lastname:"",email:"",moduleCode:""}
    // ]

    const handleAdd=  async(event) => { 
        event.preventDefault()
        // console.log("Add lecturer mutation")
        let user=await Auth.currentAuthenticatedUser() 
        
        let lecturer={
            institutionId:user.username, 
            firstname:firstName,
            lastname:lastName,
            userRole:"Lecturer",
            email:email,
        }

        try{   
            let mutation=await API.graphql(
                {
               query: createLecturer,
               variables:{input:lecturer},
               authMode:'AMAZON_COGNITO_USER_POOLS',
             }
         )
        console.log(mutation)
          
        }catch(e){    
            console.error(e)
        }    
        try{
           let l ={ 
              firstname:lecturer.firstname,
              lastname:lecturer.lastname,
              email:email,
              moduleCode:moduleCode
           }
           lecturers.push(l)
           setLecturers(lecturers)
        }
        catch(error){ 
            console.error(error)
        }
        
        setFirstName("")
        setLastName("")
        setEmail("")
        setModuleCode("")
    }

    const handleRemove= async(lecturer) =>{
        
    }

    const fetchLecturers = async()=>{
        try{
            let lecturerslist=await API.graphql(
                {
                query:listLecturers, 
                variables:{},
                authMode:'AMAZON_COGNITO_USER_POOLS',
                }
           ) 
            lecturerslist=lecturerslist.data.listLecturers.items
            setLecturers(lecturerslist)
            console.log(lecturerslist)
        }
       
        catch(error){ 
            console.error(error)
        }
    }
    
    
    useEffect(() => {
        fetchLecturers();
    }, [])
    return (  
        <div style={{ display: 'inline-flex' }}>
            <nav style={{ width: '20%' }} data-testid="InstitutionNavigation">
                {/* Navigation bar content */}
                <InstitutionNavigation />
            </nav>
            <main style={{ width: '900px', marginTop: '30px' }}>
                {/* Input forms content */}
                <h1 className="text-center">Add a lecturer</h1>

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
                                        onChange={(e)=>setFirstName(e.target.value)}
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
                                        onChange={(e)=>setLastName(e.target.value)}
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
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Module Code e.g. COS132 */}
                                <div className="form-group col-6">
                                    <label htmlFor="moduleCode">Module Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="moduleCode"
                                        placeholder="COS132"
                                        required
                                        value={moduleCode}
                                        onChange={(e)=>setModuleCode(e.target.value)}
                                    />
                                </div>
                            </div>

                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                data-testid="submitButton"
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>

                {/* Display content */}
                <h1 className="text-center">Lecturers</h1>
                {/* Search bar with search material ui icon and border radius of 20px */}
                <div className="input-group mb-3 p-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a lecturer"
                        aria-label="Search for a lecturer"
                        aria-describedby="button-addon2"
                        data-testid="searchInput"
                    />
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-primary"
                            type="button"
                            id="button-addon2"
                            data-testid="searchButton"
                        ></button>
                        {/* a dropdown filter for the search */}
                        <select
                            className="custom-select"
                            id="inputGroupSelect01"
                            data-testid="filterSelect"
                            defaultValue='default'
                        >
                            <option value={'default'}>Filter by</option>
                            <option value="1">First Name</option>
                            <option value="2">Last Name</option>
                            <option value="3">Email</option>
                            <option value="4">Module Code</option>
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
                                <th scope="col">Module Code</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>
                                    <a href="mailto:" data-testid="lecturerEmail">
                                        john.doe@up.ac.za
                                    </a>
                                </td>
                                <td>COS132</td>
                                <td>
                                    <button onClick={handleRemove}
                                        type="button"
                                        className="btn btn-danger w-100"
                                        data-testid="deleteButton"
                                    >
                                        Remove
                                    </button>
                                </td>   
                            </tr>
                             {  lecturers.map((val, key)=>{
                                console.log("Adding rows")    
                                   return (
                                    <tr key={key}>
                                        <td>{val.firstname}</td>
                                        <td>{val.lastname}</td>
                                        <td>
                                            <a href="mailto:" data-testid="lecturerEmail">
                                                {val.email}
                                            </a>
                                        </td> 
                                        <td>{val.moduleCode}</td>
                                        <td>
                                            <button onClick={() => handleRemove("Goal!")} 
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
