import React from 'react';
import { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { useAdmin } from '../../ContextProviders/AdminContext';
import {API} from 'aws-amplify';
import { deleteCourse, createCourse, createActivity } from '../../Graphql/mutations';
import { SuccessModal } from '../../Components/SuccessModal';

const CourseReader = (props)=>{
    
    const[isDisabled ,setIsDisabled]=useState(false);
    const[successMessage,setSuccessMessage]=useState("")
    const handleFile = async(data, fileInfo) => {
      setIsDisabled(true);
      if(data.length<100){
        props.setLoading(true);
        deleteCourses();
        await addCourses(data);
        props.setLoading(false);
      }
      setIsDisabled(false);
      
      //Display error message etc file too large/long
        
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

  const deleteCourses =async()=>{
    //props.setCourses([]);
    
    for(let i=0;i<props.course.length;i++){
       try{
            let del= await API.graphql({
                query:deleteCourse,
                variables:{input:{id:props.courses[i].id,_version:props.course[i]._version}}
            })
            console.log(del);
            
       }catch(error){
         console.log(error);
       }
    }
    props.setCourse([]);
  }

  const addCourses = async(courseList)=>{
    let courseMap=new Map();
    
    let entries=0;
    for(let i=0;i<courseList.length;i++){    
        try{
          
            let coursecode=courseList[i]['coursecode'] ? courseList[i]['coursecode']  : courseList[i]['course'] ? courseList[i]['course'] : courseList[i]['module']? courseList[i]['module']:
            courseList[i]['modulecode'] ? courseList[i]['modulecode'] : undefined;
            let activity={
                activityname:courseList[i]['activity']? courseList[i]['activity'] : courseList[i]['actvityname']? courseList[i]['activityname'] : undefined,
                day: courseList[i]['day']? courseList[i]['day']  : courseList[i]['dayofweek']?  courseList[i]['dayofweek'] : undefined,
                start:courseList[i]['start'] ? courseList[i]['start'] : courseList[i]['starttime']? courseList[i]['starttime'] : undefined,
                end:courseList[i]['end'] ? courseList[i]['end'] : courseList[i]['endtime']? courseList[i]['endtime'] : undefined,
                venue:courseList[i]['venue']? courseList[i]['venue'] :courseList[i]['lecturevenue']? courseList[i]['lecturevenue'] : courseList[i]['location']? courseList[i]['location'] : "TBA",
            }
            if(coursecode!==null || coursecode!==undefined || coursecode!==""){
                if(activity.start!==undefined && activity.end!==undefined && activity.activityname!==undefined){
                    if(courseMap.get(coursecode)===undefined || courseMap.get(coursecode)===null){
                        let activities=[]
                        activities.push(activity);
                        courseMap.set(coursecode,activities);
                    }
                    else{
                        let activities=courseMap.get(coursecode);
                        activities.push(activity);
                        courseMap.set(coursecode,activities);
                    }
                    entries+=1;
                }
            }

        }catch(error){
          
        }
    }
    let c=[];
    try{
    
      let count=0;
        courseMap.forEach(async(key,val)=>{
      
        let newCourse=await API.graphql({
            query:createCourse,
            variables:{input:{institutionId:props.institutionId,coursecode:val}}
        })
        newCourse=newCourse.data.createCourse;
        console.log(newCourse);
        for(let i=0;i<key.length;i++){
           key[i].courseId=newCourse.id
            let act= await API.graphql({
                query:createActivity,
                variables:{input:key[i]}
            })
        
            count+=1;  
           console.log(act);
        }
        if(count===entries)
          setSuccessMessage("Done");
        })  
    }catch(error){
        console.log(error);
    }
  }

  const dispayError = ()=>{
   // props.setError("File could not be read");
  }

    return (

      <div> 
       {successMessage && <SuccessModal successMessage={successMessage} setSuccessMessage={setSuccessMessage}> {successMessage} </SuccessModal>}
 
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
          //disabled={isDisabled}

        />
      </div>
      </div> 
    );
}

export default CourseReader;
