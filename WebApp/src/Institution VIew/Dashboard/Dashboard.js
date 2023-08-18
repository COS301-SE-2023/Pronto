import React from 'react';
import styled from "styled-components";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import HelpButton from '../../HelpButton';

const Dashboard = () => {
    return (
        <div>
            
            <LeftContainer>
                <InstitutionNavigation />
                
            </LeftContainer>
            <RightContainer>

                <div className={"grid"} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <h1>Dashboard</h1>
                    <div className={"row ml-3"} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <div className={"col-6"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <HoverableIcon>
                                <DriveFolderUploadIcon style={{ fontSize: "200px", cursor: "pointer" }} onClick={() => { window.location.href = "/upload-schedule"; }} />
                                <span style={{ fontSize: "40px" }}>Upload Schedule</span>
                            </HoverableIcon>
                        </div>
                        <div className={"col-6"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <HoverableIcon>
                                <CloudUploadIcon style={{ fontSize: "200px", cursor: "pointer" }} onClick={() => { window.location.href = "/upload-student-files"; }} />
                                <span style={{ fontSize: "40px" }}>Upload File</span>
                            </HoverableIcon>
                        </div>
                    </div>
                    <div className={"row ml-3"} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <div className={"col-6"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <HoverableIcon>
                                <SchoolIcon style={{ fontSize: "200px", cursor: "pointer" }} onClick={() => { window.location.href = "/add-lecturer"; }} />
                                <span style={{ fontSize: "40px" }}>Add/Remove Lecturer</span>
                            </HoverableIcon>
                        </div>
                        <div className={"col-6"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <HoverableIcon>
                                <EditIcon style={{ fontSize: "200px", cursor: "pointer" }} onClick={() => { window.location.href = "/edit-university-info"; }} />
                                <span style={{ fontSize: "40px" }}>Edit University Info</span>
                            </HoverableIcon>
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

const HoverableIcon = styled.div`
  display: flex;
  color: #555;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    color: #e32f45;
  }
`;

export default Dashboard;
