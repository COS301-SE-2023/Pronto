import {React,useState,useEffect} from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import { createLecturer, deleteLecturer, updateCourse} from "../../graphql/mutations"; 
import { lecturersByInstitutionId,listCourses} from "../../graphql/queries";
import  {API} from 'aws-amplify';
import { Auth } from "aws-amplify";
import AddModal from './addCourse'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const AddLecturer = () => {
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]= useState("")
    const [courses,setCourses]=useState([{coursename:"",coursecode:""}])  
    const [filterAttribute,setFilterAttribute]=useState("")
    const [searchValue,setSearchValue]=useState("")
    const [lecturers ,setLecturers]= useState([])
    const[isModalOpened,setIsModalOpened]=useState(false)
    const[searchIcon,setSearchIcon]=useState(false)

    const handleAdd=  async(event) => { 
        event.preventDefault()
        if(!isModalOpened){
            let user=await Auth.currentAuthenticatedUser() 
            let courseList=[]
            courseList=await findCourses(courses)
            
            let lecturer={
                institutionId:user.username, 
                firstname:firstName,
                lastname:lastName,
                userRole:"lecturer",
                email:email,
            }

            try{   
                let mutation=await API.graphql({
                    query: createLecturer,
                    variables:{input:lecturer},
                    authMode:'AMAZON_COGNITO_USER_POOLS',
                    })
      
                lecturer=mutation.data.createLecturer
                lecturer.courses=[]
                lecturers.push(mutation.data.createLecturer)
                  
                //Add lecturer to courses
                await addCourses(lecturer,courseList)
                if(lecturers.length<19)
                    setLecturers(lecturers)       
                  
             }catch(e){    
                  alert("Something went wrong")
              }    

            //Reset state
            setFirstName("")
            setLastName("")
            setEmail("")
            setCourses([{coursename:"",coursecode:""}])    
      }
    }

    const removeCourses=async(courseList,lecturer)=>{
        if(courseList===undefined)
            return
        for(let i=0;i<courseList.length;i++){
            
            try{ 
                let updatedCourseData={
                id:courseList[i].id,   
                institutionId:courseList[i].institutionId,
                coursecode:courseList[i].coursecode,
                coursename:courseList[i].coursename,
                lecturerId:null, 
                 _version:courseList[i]._version
                }
        
            let update=await API.graphql({
                query:updateCourse,
                variables:{input:updatedCourseData},
                authMode:"AMAZON_COGNITO_USER_POOLS"
            }) 
            lecturer.courses.splice(i,1)
            console.log(update) 
    }catch(e){ 
        console.error(e)
    }
    }
}

    const addCourses=async(lecturer,courseList)=>{ 
        
        if(lecturer.courses===undefined)
          lecturer.courses=[]
        if(courseList===undefined)
            return
        for(let i=0;i<courseList.length;i++){
        
            try{ 
                let updatedCourseData={
                id:courseList[i].id,   
                institutionId:courseList[i].institutionId,
                coursecode:courseList[i].coursecode,
                coursename:courseList[i].coursename,
                lecturerId:lecturer.id, 
                 _version:courseList[i]._version
                }
        
            let update=await API.graphql({
                query:updateCourse,
                variables:{input:updatedCourseData},
                authMode:"AMAZON_COGNITO_USER_POOLS"
            }) 
            console.log(update)
            lecturer.courses.push(update.data.updateCourse) 
            setLecturers(lecturers)
    }catch(e){ 
        console.error(e)
    }
    }
}

    const findCourses= async(courses)=>{
        let courseList=[]
            
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
                }
                catch(e){
                    alert("Course not found!")
                }
        }
    } 
    return courseList.filter(element=>element!==undefined)
    }

    const handleRemove= async(lecturer,index) =>{
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
            let courseList=lecturer.courses
            console.log(courseList)
            console.log(lecturer)
            if(courseList!==undefined){
                await removeCourses(courseList,lecturer)
                
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
                            _deleted:null,
                            limit: 50
                    },
                authMode:'AMAZON_COGNITO_USER_POOLS',
                }
           ) 
           lecturerslist=lecturerslist.data.lecturersByInstitutionId.items
           //lecturerslist=lecturerslist.filter(lecturer=>lecturer._deleted===null)
           
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
               lecturerslist[i].courses=course.data.listCourses.items
            }        
            setLecturers(lecturerslist)
        }
        catch(error){ 
            console.error(error)
        }
    }
    
    const handleSearch = async() => { 
        try{ 
            //console.log(searchIcon)
            if(searchIcon===false){
                let institution=await Auth.currentAuthenticatedUser()
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
                    setLecturers(search.data.lecturersByInstitutionId.items.filter(item=>item._deleted===null))
            }
            setSearchIcon(!searchIcon)
        }
        else{
            console.log("fetching")
            fetchLecturers()
            console.log(searchIcon)
            setSearchIcon(!searchIcon)
            console.log(searchIcon)
        }
       }catch(e){
        alert("Search failed")
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
                                       updateFlag={(false)}
                                       lecturerData={(null)}
                                       findCourses={findCourses}
                                       addCourses={addCourses}
                                       removeCourses={removeCourses}
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
                            style={{ backgroundColor: searchIcon ? "#C21F39" : "white" }}
                        >
                            <div className="input-group-append">
                               <SearchSharpIcon/>
                            </div>
                        </button>
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
                                        <AddModal
                                            updateFlag={(true)}
                                            lecturerData={val}
                                            findCourses={findCourses}
                                            removeCourses={removeCourses}
                                            addCourses={addCourses}
                                            courseData={val.courses}
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
