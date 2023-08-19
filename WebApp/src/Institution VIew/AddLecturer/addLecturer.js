import {React,useState,useEffect} from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import { createLecturer, deleteLecturer,updateCourse, updateInstitution} from "../../graphql/mutations"; 
import { lecturersByInstitutionId,searchLecturers,listAdmins} from "../../graphql/queries";
import {useLocation} from 'react-router-dom';
import  {API,Auth} from 'aws-amplify';
import AddModal from './addCourse';
import { ErrorModal } from "../../ErrorModal";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const AddLecturer = () => {
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]= useState("");
    const [courses,setCourses]=useState([]);  
    const [filterAttribute,setFilterAttribute]=useState("");
    const [searchValue,setSearchValue]=useState("");
    const [lecturers ,setLecturers]= useState([]);
    const[isModalOpened,setIsModalOpened]=useState(false);
    const[searchIcon,setSearchIcon]=useState(false);
    const[offeredCourses,setOfferedCourses]=useState([]);
    const[selectedCourses,setSelectedCourses]=useState([]);
    const[error,setError]=useState("");
    const state=useLocation();
    const[admin,setAdmin]=useState(state.state);

    let nextToken="1234";

    const handleAdd=  async(event) => { 
        event.preventDefault()
        if(!isModalOpened){
            
            let lecturer={
                institutionId:admin.institution.id,
                firstname:firstName,
                lastname:lastName,
                userRole:"Lecturer",
                email:email,
            }
            
             try{       
                let mutation=await API.graphql({
                    query: createLecturer,
                    variables:{input:lecturer},
                    authMode:'AMAZON_COGNITO_USER_POOLS',
                    })
      
                 lecturer=mutation.data.createLecturer
                 lecturer.courses={
                    items :[]
                 }
                 lecturers.push(mutation.data.createLecturer)
                
                let emails
                if(admin.institution.lectureremails===null){
                    emails=[]
                    emails.push(email)
                }
                else{
                    emails=admin.institution.lectureremails
                    emails.push(email)
                }
                 let update={
                     id:admin.institutionId,
                     lectureremails:emails
                  }

                  let u=await API.graphql({
                    query:updateInstitution,
                    variables:{input:update},
                    authMode:"AMAZON_COGNITO_USER_POOLS"
                  })

                 //Add lecturer to courses
                 await addCourses(lecturer,selectedCourses)
                 if(lecturers.length<=10)
                        setLecturers(lecturers)
               // setInstitution(institution)

             }catch(error){    
                if(error.errors!==undefined){
                    let e=error.errors[0].message
                    if(e.search("Unathorized")!==-1){ 
                        setError("You are not authorized to perform this action.Please log out and log in")
                    }
                    else if(e.search("Network")!==-1){
                        setError("Request failed due to network issues")
                    }
                    else{ 
                        setError("Something went wrong.Please try again later")
                    }     
                }
                else{ 
                    setError("Your request could not be processed")
                }
            }    
            setFirstName("")
            setLastName("")
            setEmail("")
            setSelectedCourses([])
      }
    }

    const removeCourses=async(courseList,lecturer)=>{
        if(courseList===undefined)
            return

        for(let i=0;i<courseList.length;i++){
            
            try{ 
                let updatedCourseData={
                    id:courseList[i].id,   
                    lecturerId:null, 
                }
        
                let update=await API.graphql({
                    query:updateCourse,
                    variables:{input:updatedCourseData},
                    authMode:"AMAZON_COGNITO_USER_POOLS"
                }) 
                lecturer.courses.splice(i,1)
            
            }catch(error){ 
                if(error.errors!==undefined){ 
                    let e=error.errors[0].message
                    if(e.search("Unathorized")!==-1){ 
                        setError("You are not authorized to perform this action.Please log out and log in")
                    }
                    else if(e.search("Network")!==-1){
                        setError("Request failed due to network issues")
                    }
                    else{ 
                        setError("Something went wrong.Please try again later")
                    }
                }
                else{ 
                    setError("Your request could not be processed")
                }
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
                    institutionId:admin.institution.id,
                    coursecode:courseList[i].coursecode,
                    lecturerId:lecturer.id, 
                }
        
            let update=await API.graphql({
                query:updateCourse,
                variables:{input:updatedCourseData},
                authMode:"AMAZON_COGNITO_USER_POOLS"
            }) 
            lecturer.courses.items.push(update.data.updateCourse)
            setLecturers(lecturers)

    }catch(error){ 
        if(error.errors!==undefined){
            let e=error.errors[0].message
            if(e.search("Unathorized")!==-1){ 
                setError("You are not authorized to perform this action.Please log out and log in")
            }
            else if(e.search("Network")!==-1){
                setError("Request failed due to network issues")
            } 
            else{ 
                setError("Something went wrong.Please try again later")
            }
        }
        else {
            setError("Your request could not be processed")
        }
    }
    
    }
}

    const handleRemove= async(lecturer,index) =>{
        let lec={ 
           id : lecturer.id,
        }
         try{
            let removeMutation=await API.graphql({
                query:deleteLecturer,
                variables:{input : lec },
                authMode:"AMAZON_COGNITO_USER_POOLS"
            })
            let courseList=lecturer.courses
            if(courseList!==undefined){
                await removeCourses(courseList,lecturer)
                setOfferedCourses([...offeredCourses,courseList])
                
        }
            const rows=[...lecturers]
            rows.splice(index,1)
            setLecturers(rows)
        }
        catch(error){
            if(error.errors!==undefined){
                let e=error.errors[0].message
                if(e.search("Unathorized")!==-1){ 
                    setError("You are not authorized to perform this action.Please log out and log in")
                }
                else if(e.search("Network")!==-1){
                    setError("Request failed due to network issues")
                }
                else{ 
                    setError("Something went wrong.Please try again later")
                } 
            }
            else{
                setError("Your request could not be processed")
            }
        }
    }

    const loadMore = async()=>{
        try{

            //let nextSet=[];
            if(searchIcon===true){
                // nextSet=await API.graphql({
                //     query:lecturersByInstitutionId,
                //     variables:{
                //         institutionId:admin.institutionId,
                //         limit:10,
                //         nextToken:nextToken
                //     },
                //     authMode:"AMAZON_COGNITO_USER_POOLS"
                // });
                // lecturers.push(nextSet.data.lecturersByInstitutionId.items);
                // nextToken=nextSet.data.lecturersByInstitutionId.nextToken;
                // setLecturers(lecturers);
                // console.log(nextSet);
                fetchLecturers()
            }
            else{
                
                // nextSet=await API.graphql({
                //     query:searchLecturers,
                //     variables:{
                //         limit:10,
                //         nextToken:nextToken
                //     },
                //     authMode:"AMAZON_COGNITO_USER_POOLS"
                // });
                // console.log(nextSet);
                // lecturers.push(nextSet.data.lecturersByInstitutionId.items);
                // nextToken=nextSet.data.lecturersByInstitutionId.nextToken;
                // setLecturers(lecturers);
                handleSearch();
            }

        }catch(error){
           console.log(error);
        }
    }

    const fetchLecturers = async()=>{
        try{
            console.log("fetching")
            if(admin===null || admin===undefined){
                let user=await Auth.currentAuthenticatedUser();
                let adminEmail=user.attributes.email;
                let adminData=await API.graphql({
                    query:listAdmins,
                    variables:{
                        filter:{
                            email:{
                                email:adminEmail
                            }
                        }
                    },
                    authMode:'AMAZON_COGNITO_USER_POOLS',
                })
                if(admin.data.listAdmins.items.length===0){
                    setError("Oops! We could not find your Institution.Please contact the developers for further assistance");
                } 
        
                adminData=adminData.data.listAdmins.items[0];
 
                let lecturerList=await API.graphql({
                    query:lecturersByInstitutionId,
                    variables:{
                        institutionId:admin.institutionId,
                        limit:10
                    },
                    authMode:"AMAZON_COGNITO_USER_POOLS"
                });

                console.log(lecturerList);
                nextToken=lecturerList.data.lecturersByInstitutionId.nextToken;
                let courses=adminData.institution.courses.items;
                for(let i=0;i<courses.length;i++){
                    if(courses[i].lecturerId===null){
                        offeredCourses.push(courses[i]);
                    }
                }   
                    setAdmin(adminData);
                    setOfferedCourses(offeredCourses);
                    setLecturers(lecturerList.data.listLecturers.items);
                }

                else if(lecturers.length<=10){
                    console.log("fetch lecturers");
                    let lecturerList=await API.graphql({
                        query:lecturersByInstitutionId,
                        variables:{
                            institutionId:admin.institutionId,
                            limit:10,
                        },
                        authMode:"AMAZON_COGNITO_USER_POOLS"
                    });
                    console.log(lecturerList);
                    nextToken=lecturerList.data.lecturersByInstitutionId.nextToken;
                    setLecturers(lecturerList.data.lecturersByInstitutionId.items);
                }
                else if(nextToken!==null){
                    let lecturerList=await API.graphql({
                        query:lecturersByInstitutionId,
                        variables:{
                            institutionId:admin.institutionId,
                            limit:10,
                            nextToken:nextToken
                        },
                        authMode:"AMAZON_COGNITO_USER_POOLS"
                    });
                    console.log(lecturerList);
                    lecturers.push(lecturerList.data.lecturersByInstitutionId.items);
                    nextToken=lecturerList.data.lecturersByInstitutionId.nextToken;
                    setLecturers(lecturerList.data.lecturersByInstitutionId.items);
                }
            }
        catch(error){   
            console.log(error);
            if(error.errors!==undefined){
                let e=error.errors[0].message
                if(e.search("Unathorized")!==-1){ 
                    setError("You are not authorized to perform this action.Please log out and log in")
                }
                else if(e.search("Network")!==-1){
                    setError("Request failed due to network issues")
                }
                else{ 
                    setError("Something went wrong.Please try again later")
                }
            }
            else{
               setError("Your request could not be processed")
            }
        }
    }
    
    const handleSearch = async() => { 
        try{ 
            if(searchIcon===false){
               
                if(filterAttribute==="firstname"){
                    let search= await API.graphql({
                        query:searchLecturers,
                        variables:  {  
                                filter : {
                                    and : [
                                        {firstname : {matchPhrasePrefix:searchValue}},
                                        {institutionId:{eq:admin.institutionId}}
                                    ]
                                },
                                limit:10,
                                nextToken:nextToken
                        },
                        authMode:"AMAZON_COGNITO_USER_POOLS"         
                    });
                   if(nextToken===null){ 
                        setLecturers(search.data.searchLecturers.items);
                   }
                   else{
                      lecturers.push(search.data.searchLecturers.items);
                      setLecturers(lecturers);
                   }
                   nextToken=search.data.searchLecturers.nextToken;
                   console.log(search)
                }
                else if(filterAttribute==="lastname"){ 
                    let search= await API.graphql({
                        query:searchLecturers,
                        variables:  {    
                                filter : {
                                    and : [
                                        {lastname : {matchPhrasePrefix:searchValue}},
                                        {institutionId:{eq:admin.institutionId}}
                                    ]
                                },
                                limit:10,
                                nextToken:nextToken
                            },
                    authMode:"AMAZON_COGNITO_USER_POOLS"         
                    })   
                    if(nextToken===null){ 
                        setLecturers(search.data.searchLecturers.items);
                   }
                   else{
                      lecturers.push(search.data.searchLecturers.items);
                      setLecturers(lecturers);
                   }
                   nextToken=search.data.searchLecturers.nextToken;
                    
                }
                else if(filterAttribute==="email"){
                    let search= await API.graphql({
                    query:searchLecturers,
                    variables:{ 
                                filter : {
                                    and : [
                                        {email : {matchPhrasePrefix:searchValue}},
                                        {institutionId:{eq:admin.institutionId}}
                                    ]
                                },
                                limit:10,
                                nextToken:nextToken
                            },
                    authMode:"AMAZON_COGNITO_USER_POOLS"         
                    })
                    if(nextToken===null){ 
                        setLecturers(search.data.searchLecturers.items);
                   }
                   else{
                      lecturers.push(search.data.searchLecturers.items);
                      setLecturers(lecturers);
                   }
                nextToken=search.data.searchLecturers.nextToken;

            }
            setSearchIcon(!searchIcon)
        }
        else{
    
            fetchLecturers()
            setSearchIcon(!searchIcon)
        }
       }catch(error){
           console.log(error)
            if(error.errors!==undefined){
                let e=error.errors[0].message
                if(e.search("Unathorized")!==-1){ 
                    setError("You are not authorized to perform this action.Please log out and log in")
                }
                else if(e.search("Network")!==-1){
                    setError("Request failed due to network issues")
                }
                else{ 
                    setError("Something went wrong.Please try again later")
                }
            } 
            else {
                   setError("Your request could not be processed")
            } 
        }
    } 
    
    // useEffect(() => {
    //     fetchLecturers();
    // }, [])
    
    return (  
        <div style={{ display: 'inline-flex' }}>
             {error && <ErrorModal className="error" errorMessage={error} setError={setError}> {error} </ErrorModal>}
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
                            className="btn btn-outline-danger"
                            type="button"
                            id="button-addon2"
                            data-testid="searchButton"
                            style={{ backgroundColor: searchIcon ? "#e32f45" : "white" }} 
                        >
                            <div className="input-group-append">
                               <SearchSharpIcon style={{"color":"#e32f45"}}/>
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
                          <div>
                            <div style={{paddingLeft:"42.5%",paddingRight:"42.5%"}}>
                              {nextToken && <button className="btn btn-danger w-100" type="button" onClick={loadMore}> Load More </button>}
                              </div>
                          </div> 
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddLecturer;
