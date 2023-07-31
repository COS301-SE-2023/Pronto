import React from 'react';
import styled from "styled-components";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';

const Dashboard = () => {
    return (<div>
            <LeftContainer>
                <InstitutionNavigation/>
            </LeftContainer>
            <RightContainer>
                <div className={"grid"}>

                    <div className={"row ml-3"}>
                        <div className={"col-6"} style={{
                            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                        }}>
                            <DriveFolderUploadIcon style={{fontSize: "250px", cursor: "pointer"}}
                                                   onClick={() => {
                                                       window.location.href = "/upload-schedule";
                                                   }}
                            />
                            <span style={{fontSize: "50px"}}>Upload Schedule</span>
                        </div>
                        <div className={"col-6"} style={{
                            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                        }}>
                            <CloudUploadIcon style={{fontSize: "250px", cursor: "pointer"}}
                                             onClick={() => {
                                                 window.location.href = "/upload-student-files";
                                             }}
                            />
                            <span style={{fontSize: "50px"}}>Upload File</span>
                        </div>
                    </div>

                    <div className={"row ml-3"}>
                        <div className={"col-6"} style={{
                            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                        }}>
                            <SchoolIcon style={{fontSize: "250px", "cursor": "pointer"}}
                                        onClick={() => {
                                            window.location.href = "/add-lecturer";
                                        }}
                            />
                            <span style={{fontSize: "50px"}}>Add/Remove Lecturer</span>
                        </div>
                        <div className={"col-6"} style={{
                            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                        }}>
                            <EditIcon style={{fontSize: "250px", cursor: "pointer"}}
                                      onClick={() => {
                                          window.location.href = "/edit-university-info";
                                      }}
                            />
                            <span style={{fontSize: "50px"}}>Upload File</span>
                        </div>
                    </div>
                </div>
            </RightContainer>
        </div>

    );

};

const LeftContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  width: 30%;
  z-index: 2;

`;

const RightContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  width: 80%;
  z-index: 2;

`;

export default Dashboard;
