import React from 'react';
import { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { useAdmin } from '../../ContextProviders/AdminContext';
import { API } from 'aws-amplify';
import { deleteCourse, createCourse, createActivity } from '../../Graphql/mutations';
import { coursesByInstitutionId } from '../../Graphql/queries';
import { SuccessModal } from '../../Components/SuccessModal';
import "./CourseReader.css";

const CourseReader = (props) => {

  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("")
  const handleFile = async (data, fileInfo) => {
    
    if (data.length < 500) {
      
      setMessage("Processing...");
      await deleteCourses();
      await addCourses(data);
    
    }
    else{
      setMessage("File too large to be processed");
    }
    
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(" ", "")
        .replace("_", "")

  }

  const deleteCourses = async () => {
    
    let courseList = await API.graphql({
      query: coursesByInstitutionId,
      variables: {
        institutionId: props.institutionId,
      }
    })
    courseList = courseList.data.coursesByInstitutionId.items;

    for (let i = 0; i < courseList.length; i++) {
      try {
        let del = await API.graphql({
          query: deleteCourse,
          variables: { input: { id: courseList[i].id, _version: courseList[i]._version } }
        })
        

      } catch (error) {
        
      }
    }
  }

  const addCourses = async (courseList) => {
    let courseMap = new Map();

    let entries = 0;
    for (let i = 0; i < courseList.length; i++) {
      try {

        let coursecode = courseList[i]['coursecode'] ? courseList[i]['coursecode'].toUpperCase() : courseList[i]['course'] ? courseList[i]['course'].toUpperCase() : courseList[i]['module'] ? courseList[i]['module'].toUpperCase() :
          courseList[i]['modulecode'] ? courseList[i]['modulecode'].toUpperCase() : courseList[i]['code'] ? courseList[i]['code'].toUpperCase() : undefined;
        let activity = {
          activityname: courseList[i]['activity'] ? courseList[i]['activity'] : courseList[i]['actvityname'] ? courseList[i]['activityname'] : undefined,
          day: courseList[i]['day'] ? courseList[i]['day'] : courseList[i]['dayofweek'] ? courseList[i]['dayofweek'] : undefined,
          start: courseList[i]['start'] ? courseList[i]['start'] : courseList[i]['starttime'] ? courseList[i]['starttime'] : undefined,
          end: courseList[i]['end'] ? courseList[i]['end'] : courseList[i]['endtime'] ? courseList[i]['endtime'] : undefined,
          venue: courseList[i]['venue'] ? courseList[i]['venue'] : courseList[i]['lecturevenue'] ? courseList[i]['lecturevenue'] : courseList[i]['location'] ? courseList[i]['location'] : "TBA",
          frequency: 1,
          group: " ",
          description: "  "
        }
        if (coursecode !== null || coursecode !== undefined || coursecode !== "") {
          if (activity.start !== undefined && activity.end !== undefined && activity.activityname !== undefined && activity.day !== undefined) {
            if (courseMap.get(coursecode) === undefined || courseMap.get(coursecode) === null) {
              let activities = []
              activities.push(activity);
              courseMap.set(coursecode, activities);
            }
            else {
              let activities = courseMap.get(coursecode);
              activities.push(activity);
              courseMap.set(coursecode, activities);
            }
            entries += 1;
          }
        }

      } catch (error) {

      }
    }
    let c = [];
    try {

      let count = 0;
      courseMap.forEach(async (key, val) => {

        try {
          let newCourse = await API.graphql({
            query: createCourse,
            variables: { input: { institutionId: props.institutionId, coursecode: val } }
          })
          
          newCourse = newCourse.data.createCourse;
          
          for (let i = 0; i < key.length; i++) {
            key[i].courseId = newCourse.id
            let act = await API.graphql({
              query: createActivity,
              variables: { input: key[i] }
            })
            count += 1;
            
          }
        } catch (error) {
         
        }
        if (count === entries){
          setMessage("");
          setSuccessMessage("Done");
          }
      })

    } catch (error) {
      setMessage("");
     
    }
  }

  const dispayError = () => {
    setMessage("File could not be processed");
  }

  return (

    <div>
    
      {successMessage && <SuccessModal successMessage={successMessage} setSuccessMessage={setSuccessMessage}> {successMessage} </SuccessModal>}
      
      <div className='csv-container'>
        <p>Note that uploading a schedule will delete your previous schedule</p>
        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>

        </div>
        <div className='csv_component'>
          <label className="csv-reader-label">
            <p className="csv-reader-text">Click here to upload</p>

            <CSVReader
              label=""
              cssClass="form-control csv-reader-input"
              onFileLoaded={handleFile}
              parserOptions={papaparseOptions}
              onError={dispayError}
              strict={true}
            />

          </label>
        </div>
      </div >
        {message && (
        <div style={{ marginTop: "5%", color: "green" }}>{message}</div>
      )}
    </div>
  );
}

export default CourseReader;
