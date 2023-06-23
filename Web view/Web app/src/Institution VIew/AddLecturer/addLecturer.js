import {React,useState,useEffect} from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import { createLecturer, deleteLecturer, updateLecturer, updateCourse} from "../../graphql/mutations"; 
import { lecturersByInstitutionId,listCourses} from "../../graphql/queries";
import  {API} from 'aws-amplify';
import { Auth } from "aws-amplify";
import AddModal from './addCourse'

const AddLecturer = () => {
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]= useState("")
    const [courses,setCourses]=useState([{coursename:"",coursecode:""}])  
    const [filterAttribute,setFilterAttribute]=useState("")
    const [searchValue,setSearchValue]=useState("")
    const [lecturers ,setLecturers]= useState([])
    const[isModalOpened,setIsModalOpened]=useState(false)
    
    const handleAdd=  async(event) => { 
        event.preventDefault()
        if(!isModalOpened){
            let user=await Auth.currentAuthenticatedUser() 
            let courseList=[]
            console.log(courses)
        
            //Search for courses
            for(let i=0;i<courses.length;i++){   
                if(courses[i].coursecode!==""){    
                    try{
                        let id=await API.graphql({
                            query:listCourses,
                                variables: { 
                                    filter: { 
                                        coursecode : { 
                                            eq:courses[i].coursecode
                                          }
                                    }
                            },
                            authMode:"AMAZON_COGNITO_USER_POOLS"
                        })
            
                    courseList.push(id.data.listCourses.items[0])
                    console.log(courseList) 
                    }
        
                    catch(e){
                        alert("Course not found!")
                        //console.log(e)
                     }
                }
            }

            let lecturer={
                institutionId:user.username, 
                firstname:firstName,
                lastname:lastName,
                userRole:"lecturer",
                email:"email",
            }

            try{   
                let mutation=await API.graphql({
                    query: createLecturer,
                    variables:{input:lecturer},
                    authMode:'AMAZON_COGNITO_USER_POOLS',
                    })
      
                //console.log(mutation)
                lecturer=mutation.data.createLecturer
                lecturer.courses=courseList
                lecturers.push(mutation.data.createLecturer)
                setLecturers(lecturers)  
                
                //Add lecturer to courses
                for(let i=0;i<courses.length;i++){
                    let updateCou={
                        id:courseList[i].id,   
                        institutionId:courseList[i].institutionId,
                        coursecode:courseList[i].coursecode,
                        coursename:courseList[i].coursename,
                        lecturerId:mutation.data.createLecturer.id 
                    }

                    let update=await API.graphql({
                        query:updateCourse,
                        variables:{input:updateCou},
                        authMode:"AMAZON_COGNITO_USER_POOLS"
                    })
                    console.log(update)
                }       

            }catch(e){    
                 alert("Something went wrong")
                // console.error(e)
             }    
            //Reset states
            setFirstName("")
            setLastName("")
            setEmail("")
            setCourses([{coursename:"",coursecode:""}])
      }
      console.log(isModalOpened)
    }

    const handleRemove= async(lecturer,index) =>{
        
        console.log(lecturer)
        let lec={ 
           id : lecturer.id,
           _version:lecturer._version
        }
         try{
            let mutation=await API.graphql({
                query:deleteLecturer,
                variables:{input : lec },
                authMode:"AMAZON_COGNITO_USER_POOLS"
            })
            let courses=lecturer.courses
            for(let i=0;i<courses.length;i++){
                try{
                   let updateCou={
                        id:courses[i].id,   
                        institutionId:courses[i].institutionId,
                        coursecode:courses[i].coursecode,
                        coursename:courses[i].coursename,
                        lecturerId:null
                    }

                    let update=await API.graphql({
                        query:updateCourse,
                        variables:{input:updateCou},
                        authMode:"AMAZON_COGNITO_USER_POOLS"
                    })
                }
                catch(e){
                    alert("Failed to remove lecturer from courses")
                }
            }
            
            const rows=[...lecturers]
            rows.splice(index,1)
            setLecturers(rows)

        }
        catch(e){
            console.error(e)
        }
    }

    const fetchLecturers = async()=>{
        try{
            //Get lecturers
            let institution= await Auth.currentAuthenticatedUser()
            let lecturerslist=await API.graphql(
                {
                query:lecturersByInstitutionId, 
                variables:{ 
                            institutionId:institution.username,
                            limit: 20
                    },
                authMode:'AMAZON_COGNITO_USER_POOLS',
                }
           ) 
           lecturerslist=lecturerslist.data.lecturersByInstitutionId.items
           lecturerslist=lecturerslist.filter(lecturer=>lecturer._deleted===null)
           
           //Get courses
           for(let i=0;i<lecturerslist.length;i++){
                
                let course=await API.graphql({
                    query:listCourses,
                    variables:{
                            filter:{
                                lecturerId:{
                                    eq:lecturerslist[i].id
                            }
                        }
                    },
                    authMode:"AMAZON_COGNITO_USER_POOLS"
                })
                
             //   console.log(course)
              lecturerslist[i].courses=course.data.listCourses.items
            }
            
            setLecturers(lecturerslist)
            console.log(lecturerslist)
        }
        catch(error){ 
            console.error(error)
        }
    }
    
    const handleSearch = async() => { 
        try{ 

            let institution=await Auth.currentAuthenticatedUser()
            console.log(filterAttribute)
         
            if(filterAttribute==="firstname"){
            let search= await API.graphql({
                query:lecturersByInstitutionId,
                variables:  { 
                           institutionId : institution.username,  
                            filter : { 
                                firstname: { 
                                     eq: searchValue 
                                } 

                           }
                        },
                authMode:"AMAZON_COGNITO_USER_POOLS"         
            })
            console.log(search)
            setLecturers(search.data.lecturersByInstitutionId.items.filter(item=>item._deleted===null))
        }
            else if(filterAttribute==="lastname"){ 
              let search= await API.graphql({
                query:lecturersByInstitutionId,
                variables:  { 
                           institutionId : institution.username,  
                            filter : { 
                                lastname: { 
                                     eq: searchValue 
                                } 

                           }
                        },
                authMode:"AMAZON_COGNITO_USER_POOLS"         
            })   
            console.log(search)
            setLecturers(search.data.lecturersByInstitutionId.items.filter(item=>item._deleted===null))
            }
            else if(filterAttribute==="email"){
              let search= await API.graphql({
                query:lecturersByInstitutionId,
                variables:  { 
                           institutionId : institution.username,  
                            filter : { 
                                email: { 
                                     eq: searchValue 
                                } 
                           }
                        },
                authMode:"AMAZON_COGNITO_USER_POOLS"         
            })
            console.log(search)  
               
            setLecturers(search.data.lecturersByInstitutionId.items.filter(item=>item._deleted===null))
            }
            else{ 
                await fetchLecturers()
            }
        }
        catch(e){
            console.error(e)
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

                                {/*Adding courses via Modal popup */}
                                <div className="form-group col-6">
                                    <label htmlFor="Course">Courses</label>
                                    <AddModal 
                                       courseData={courses} 
                                       setModal={setIsModalOpened}
                                       setCourses={setCourses}
                                    />
                                </div>
                            </div>

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
                    <input onChange={(e)=>setSearchValue(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Search for a lecturer"
                        aria-label="Search for a lecturer"
                        aria-describedby="button-addon2"
                        data-testid="searchInput"
                    />
                    <div className="input-group-append">
                        <button onClick={handleSearch}
                            className="btn btn-outline-primary"
                            type="button"
                            id="button-addon2"
                            data-testid="searchButton"
                        ></button>
                        {/* a dropdown filter for the search */}
                        <select onChange={(e)=>setFilterAttribute(e.target.value)}
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
                             {  lecturers.map((val, key)=>{    
                                   return (
                                    <tr key={key}>
                                        <td>{val.firstname}</td>
                                        <td>{val.lastname}</td>
                                        <td>
                                            <a href="mailto:" data-testid="lecturerEmail">
                                                {val.email}
                                            </a>
                                        </td> 
                                        {/* <td>{val.moduleCode}</td> */}
                                        <td><AddModal
                                            courseData={[...val.courses]}
                                            setModal={setIsModalOpened}
                                            setCourses={setCourses}
                                            /></td>
                                        <td>
                                            <button onClick={() => {handleRemove(val,key)}} 
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
