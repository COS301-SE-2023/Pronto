import React from 'react';
import CSVReader from 'react-csv-reader';
import { useAdmin } from '../../ContextProviders/AdminContext';
import {API} from 'aws-amplify';
import { createLecturer,updateCourse,updateInstitution } from '../../Graphql/mutations';
import { listCourses,listLecturers } from '../../Graphql/queries';

const CsvFileReader = (props)=>{
    //console.log(props)
    const {admin,setAdmin}=useAdmin();
    const handleFile = async(data, fileInfo) => {
        //console.log(props);
        //console.log('Parsed CSV data:', data);
        //console.log(data[0]['First Name']);
        addLecturers(data);
        //console.log('File info:', fileInfo);
        
        
  };

  const addLecturers = async(lecturerList)=>{
    props.setAdding("Adding...This may take a while");
    let emailList=props.emailList;

    for(let i=0;i<lecturerList.length;i++){
        try{
          
            let lecturer={
                institutionId:props.institutionId,
                firstname:lecturerList[i]['First Name'] ? lecturerList[i]['First Name'] : lecturerList[i]['FirstName']? lecturerList[i]['FirstName'] : lecturerList[i]['Firstname'] ?lecturerList[i]['Firstname']:lecturerList[i]['First name']? lecturerList[i]['First name'] : lecturerList[i]['Name']? lecturerList[i]['Name'] : lecturerList[i]['name']?  lecturerList[i]['name'] : undefined,
                lastname:lecturerList[i]['Last Name'] ? lecturerList[i]['Last Name'] : lecturerList[i]['LastName']? lecturerList[i]['LastName'] : lecturerList[i]['Lastname'] ?lecturerList[i]['Lastname']:lecturerList[i]['Last name']? lecturerList[i]['Last name'] : lecturerList[i]['Surname']? lecturerList[i]['Surname'] : lecturerList[i]['surname']?  lecturerList[i]['surname'] : undefined,
                email:lecturerList[i]['Email Address'] ? lecturerList[i]['Email Address'] : lecturerList[i]['Email']? lecturerList[i]['Email'] : lecturerList[i]['email address']? lecturerList[i]['email address'] : lecturerList[i]['email']? lecturerList[i]['email'] : undefined,
                userRole:"Lecturer"
            }
            if(lecturer.firstname===undefined || lecturer.lastname===undefined || lecturer.email===undefined){
                console.log("unrecognized field");
                continue;
            }else{
              if(props.adminEmail!==lecturer.email){
                let emails = await API.graphql({
                        query: listLecturers,
                        variables: { filter: { email: { eq: lecturer.email } } }
                    })
                if(emails.data.listLecturers.items.length===0){
                  let newLecturer=await API.graphql({
                        query:createLecturer,
                        variables:{input:lecturer}
                      })
                  
                  newLecturer=newLecturer.data.createLecturer;
                  emailList.push(lecturer.email);
                  let courses=lecturerList[i]['Courses']? lecturerList[i]['Courses'].split(',') : lecturerList[i]['courses']? lecturerList[i]['courses'].split(',') : lecturerList[i]['Course']?  lecturerList[i]['Course'].split(',') : lecturerList[i]['course']? lecturerList[i]['course'].split(',') : []
                  let filter = `{"filter" : { "or" : [`;
                  console.log("courses here");
                  console.log(courses);
                  if(courses.length>0){
                      for (let i = 0; i < courses.length; i++) {
                        if(courses[i]!=="" && courses[i]!==" " ){
                          if (i === courses.length - 1) {
                            filter += `{"coursecode":{"eq":"${courses[i]}" } }`;
                          }
                        else {
                          filter += `{"coursecode":{"eq":"${courses[i]}" } },`;
                        } 
                      }
                    }
                    filter += `] }}`;
                 
                    let variables = JSON.parse(filter);
                    console.log(variables);
                    
                    try{
                      let courseList=await API.graphql({
                      query:listCourses,
                      variables:variables
                    })
                    // let list=await API.graphql({
                    //   query:listCourses,
                    //   variables:{}
                    // })
                    console.log(courseList);
                    courseList=courseList.data.listCourses.items;
                    for(let i=0;i<courseList.length;i++){
                      console.log("adding courses");  
                      let a=await API.graphql({
                          query:updateCourse,
                          variables:{input:{id:courseList[i].id,lecturerId:newLecturer.id}}
                        })
                         console.log(a);
                    }
                  
                  }catch(e){
                    console.log(e) 
                  }
                }
                }
              }
          }
        }catch(error){
            console.log(error);
        }
        let ins=API.graphql({
          query:updateInstitution,
          variables:{input:{id:props.institutionId,lectureremails:emailList}}
        })
      
    }
    props.setAdding("Add")
  }

    return (
      <div>
        <h1>Add via CSV</h1>
        <CSVReader
          onFileLoaded={handleFile}
          inputStyle={{ color: 'red' }} 
          parserOptions={{ header: true, dynamicTyping: true }}
        />
      </div>
    );
}

export default CsvFileReader;
