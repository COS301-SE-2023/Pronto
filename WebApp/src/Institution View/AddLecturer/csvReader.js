import React from 'react';
import CSVReader from 'react-csv-reader';
import { useAdmin } from '../../ContextProviders/AdminContext';
import { API } from 'aws-amplify';
import { createLecturer, updateCourse, updateInstitution } from '../../Graphql/mutations';
import { listCourses, listLecturers } from '../../Graphql/queries';
import "./csvReader.css";
import UploadCSV from "../../Images/UploadCSV.png";


const CsvFileReader = (props) => {
  //console.log(props)
  const { admin, setAdmin } = useAdmin();
  const handleFile = async (data, fileInfo) => {
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
        .replace(" ", "")
        .replace("_", "")

  }

  const addLecturers = async (lecturerList) => {
    props.setAdding("Adding...This may take a while");
    let emailList = props.emailList;

    for (let i = 0; i < lecturerList.length - 2; i++) {
      try {

        let lecturer = {
          institutionId: props.institutionId,
          firstname: lecturerList[i]['firstname'] ? lecturerList[i]['firstname'] : lecturerList[i]['name'] ? lecturerList[i]['name'] : lecturerList[i]['givenname'] ? lecturerList[i]['givename'] : undefined,
          lastname: lecturerList[i]['lastname'] ? lecturerList[i]['lastname'] : lecturerList[i]['surname'] ? lecturerList[i]['surname'] : lecturerList[i]['familyname'] ? lecturerList[i]['familyname'] : undefined,
          email: lecturerList[i]['emailaddress'] ? lecturerList[i]['emailaddress'] : lecturerList[i]['email'] ? lecturerList[i]['email'] : lecturerList[i]['mailaddress'] ? lecturerList[i]['mailaddress'] : undefined,
          userRole: "Lecturer"
        }
        if (lecturer.firstname === undefined || lecturer.lastname === undefined || lecturer.email === undefined) {
          console.log("unrecognized field");
        } else {
          if (props.adminEmail !== lecturer.email) {
            let emails = await API.graphql({
              query: listLecturers,
              variables: { filter: { email: { eq: lecturer.email } } }
            })
            if (emails.data.listLecturers.items.length === 0) {
              let newLecturer = await API.graphql({
                query: createLecturer,
                variables: { input: lecturer }
              })

              newLecturer = newLecturer.data.createLecturer;
              emailList.push(lecturer.email);
              let courses = lecturerList[i]['courses'] ? lecturerList[i]['courses'].split(',') : lecturerList[i]['course'] ? lecturerList[i]['course'].split(',') : lecturerList[i]['module'] ? lecturerList[i]['module'].split(',') : lecturerList[i]['coursecode'] ? lecturerList[i]['coursecode'].split(',') : lecturerList[i]['modulecode'] ? lecturerList[i]['modulecode'].split(',') : lecturerList[i]['modulecodes'] ? lecturerList[i]['modulecodes'].split(',') : []
              let filter = `{"filter" : { "or" : [`;

              if (courses.length > 0) {
                for (let i = 0; i < courses.length; i++) {
                  if (courses[i] !== "" && courses[i] !== " ") {
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

                try {
                  let courseList = await API.graphql({
                    query: listCourses,
                    variables: variables
                  })
                  // let list=await API.graphql({
                  //   query:listCourses,
                  //   variables:{}
                  // })

                  courseList = courseList.data.listCourses.items;
                  for (let i = 0; i < courseList.length; i++) {
                    console.log("adding courses");
                    let a = await API.graphql({
                      query: updateCourse,
                      variables: { input: { id: courseList[i].id, lecturerId: newLecturer.id } }
                    })

                  }

                } catch (e) {
                  console.log(e)
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      let ins = API.graphql({
        query: updateInstitution,
        variables: { input: { id: props.institutionId, lectureremails: emailList } }
      })

    }
    props.setAdding("Add")
  }

  return (
    <div className='csv-container'>
      <p>...or alternatively, add lecturers with a CSV file:</p>
      <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
        <img src={UploadCSV} style={{ maxWidth: "300px", maxHeight: "200px" }} alt="AddLecturer" />
      </div>
      <div className='csv_component'>
        <label className="csv-reader-label">
          <p className="csv-reader-text">Click here to upload lecturers</p>

          <CSVReader
            label=""
            cssClass="form-control csv-reader-input"
            onFileLoaded={handleFile}
            parserOptions={papaparseOptions}
            strict={true}
          />

        </label>
      </div>
    </div >
  );
}

export default CsvFileReader;
