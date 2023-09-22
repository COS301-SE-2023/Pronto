import React from 'react';
import { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { useAdmin } from '../../ContextProviders/AdminContext';
import {API} from 'aws-amplify';
import { createLecturer,updateCourse,updateInstitution } from '../../Graphql/mutations';
import { listCourses,listLecturers } from '../../Graphql/queries';

const CsvFileReader = (props)=>{
    
    const[isDisabled ,setIsDisabled]=useState(false);
    const handleFile = async(data, fileInfo) => {
      setIsDisabled(true);
      await addLecturers(data);
      setIsDisabled(false)
        
  };

    const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(" ","")
        .replace("_","")

  }

  const addLecturers = async(lecturerList)=>{
    
    let emailList=props.emailList;
    if(lecturerList.length<=101){
      props.setAdding("Adding...This may take a while");
      for(let i=0;i<lecturerList.length;i++){
        try{
          
            let lecturer={
                institutionId:props.institutionId,
                firstname:lecturerList[i]['firstname'] ? lecturerList[i]['firstname']  : lecturerList[i]['name']?  lecturerList[i]['name'] :lecturerList[i]['givenname']? lecturerList[i]['givenname'] : undefined,
                lastname: lecturerList[i]['lastname']? lecturerList[i]['lastname']  : lecturerList[i]['surname']?  lecturerList[i]['surname'] : lecturerList[i]['familyname']? lecturerList[i]['familyname'] : undefined,
                email:lecturerList[i]['emailaddress'] ? lecturerList[i]['emailaddress'] : lecturerList[i]['email']? lecturerList[i]['email'] : undefined,
                userRole:"Lecturer"
            }
            if(lecturer.firstname===undefined || lecturer.lastname===undefined || lecturer.email===undefined){
                if(i>0){
                  
                  continue;
                }
                else{
                  props.setError("File contains unrecognised fields. Please use First Name,Last Name, Email Address and Courses as field names.");
                  break;
                }
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
                  let courses=lecturerList[i]['courses']? lecturerList[i]['courses'].split(',') : lecturerList[i]['course']?  lecturerList[i]['course'].split(',') : lecturerList[i]['modules']? lecturerList[i]['modules'].split(',') : lecturerList[i]['module'] ? lecturerList[i]['module'].split(',') : []
              
                  let filter = `{"filter" : { "or" : [`;
                  
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
                         
                    }
                  
                  }catch(e){
                    
                  }
                }
              
                 }
              }
          }
        }catch(error){
            console.log(error);
        }
        try{
        let ins=API.graphql({
          query:updateInstitution,
          variables:{input:{id:props.institutionId,lectureremails:emailList}}
        })
        }catch(error){

        }
      
    }
    
    props.setAdding("Add");
    }
    else{
      props.setError("Too many lines. Please note you are limited to adding 100 lecturers at a time.");
    }
  }

  const dispayError = ()=>{
    props.setError("File could not be read");
  }

    return (
      <div    style={{
          height: "100px",
          width: "100%",
          padding:"0px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          cursor: "pointer",
        }}>
         <CSVReader
          label="Click here"
          cssClass="form-control" 
          onFileLoaded={handleFile}
          inputStyle={{opacity:"0",width:"100%",height:"100%",border:"1px solid #ddd"}} 
          parserOptions={papaparseOptions}
          onError={dispayError}
          strict={true}
          disabled={isDisabled}

        />
      </div>
    );
}

export default CsvFileReader;
