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
    props.setAdding("Adding...This may take a while");
    let emailList=props.emailList;
    console.log(lecturerList);
    for(let i=0;i<lecturerList.length;i++){
        try{
          
            let lecturer={
                institutionId:props.institutionId,
                firstname:lecturerList[i]['firstname'] ? lecturerList[i]['firstname']  : lecturerList[i]['name']?  lecturerList[i]['name'] : undefined,
                lastname: lecturerList[i]['lastname']? lecturerList[i]['lastname']  : lecturerList[i]['surname']?  lecturerList[i]['surname'] : undefined,
                email:lecturerList[i]['emailaddress'] ? lecturerList[i]['emailaddress'] : lecturerList[i]['email']? lecturerList[i]['email'] : undefined,
                userRole:"Lecturer"
            }
            if(lecturer.firstname===undefined || lecturer.lastname===undefined || lecturer.email===undefined){
                if(i>0){
                  console.log(lecturer);
                  continue;
                }
                else{
                  console.log(lecturer);
                  props.setError("File contains unrecognised fields.Please use First Name,Last Name, Email Address and Courses");
                  break;
                }
            }else{
              // if(props.adminEmail!==lecturer.email){
              //   let emails = await API.graphql({
              //           query: listLecturers,
              //           variables: { filter: { email: { eq: lecturer.email } } }
              //       })
              //   if(emails.data.listLecturers.items.length===0){
              //     let newLecturer=await API.graphql({
              //           query:createLecturer,
              //           variables:{input:lecturer}
              //         })
                  
              //     newLecturer=newLecturer.data.createLecturer;
              //     emailList.push(lecturer.email);
              //     let courses=lecturerList[i]['courses']? lecturerList[i]['courses'].split(',') : lecturerList[i]['course']?  lecturerList[i]['course'].split(',') : []
              //     let filter = `{"filter" : { "or" : [`;
              //     console.log("courses here");
              //     console.log(courses);
              //     if(courses.length>0){
              //         for (let i = 0; i < courses.length; i++) {
              //           if(courses[i]!=="" && courses[i]!==" " ){
              //             if (i === courses.length - 1) {
              //               filter += `{"coursecode":{"eq":"${courses[i]}" } }`;
              //             }
              //           else {
              //             filter += `{"coursecode":{"eq":"${courses[i]}" } },`;
              //           } 
              //         }
              //       }
              //       filter += `] }}`;
                 
              //       let variables = JSON.parse(filter);
              //       console.log(variables);
                    
              //       try{
              //         let courseList=await API.graphql({
              //         query:listCourses,
              //         variables:variables
              //       })
              //       // let list=await API.graphql({
              //       //   query:listCourses,
              //       //   variables:{}
              //       // })
              //       console.log(courseList);
              //       courseList=courseList.data.listCourses.items;
              //       for(let i=0;i<courseList.length;i++){
              //         console.log("adding courses");  
              //         let a=await API.graphql({
              //             query:updateCourse,
              //             variables:{input:{id:courseList[i].id,lecturerId:newLecturer.id}}
              //           })
              //            console.log(a);
              //       }
                  
                //   }catch(e){
                //     console.log(e) 
                //   }
                // }
                console.log("ok");
                 }
            //  }
          //}
        }catch(error){
            console.log(error);
        }
        // let ins=API.graphql({
        //   query:updateInstitution,
        //   variables:{input:{id:props.institutionId,lectureremails:emailList}}
        // })
      
    }
    props.setAdding("Add")
  }

    return (
      <div>
        <CSVReader
          onFileLoaded={handleFile}
          inputStyle={{ color: "#e32f45" }} 
          parserOptions={papaparseOptions}
        />
      </div>
    );
}

export default CsvFileReader;
