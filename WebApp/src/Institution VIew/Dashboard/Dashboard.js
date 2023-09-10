import React from 'react';
import styled from "styled-components";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import HelpButton from '../../HelpButton';
import UserManual from "../HelpFiles/InstitutionInstructions.pdf";
import { useNavigate } from 'react-router-dom';
import ScheduleUploadImage from "./ScheduleUploadImage.png";
import AddRemoveLecturerImage from "./AddRemoveLecturerImage.png";
import StudenFileUploadImage from "./StudentFileUploadImage.png";
import EditUniInfoImage from "./EditUniInfoImage.png";

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div>

            <LeftContainer>
                <InstitutionNavigation />

            </LeftContainer>
            <RightContainer>

                <div className={"grid"} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <h1 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Dashboard</h1>
                    <div className={"row ml-3"} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <div className={"col-6"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <HoverableIcon>
                                <img
                                    src={ScheduleUploadImage}
                                    alt="Upload Schedule"
                                    style={{ width: "250px", height: "250px", cursor: "pointer" }}
                                    onClick={() => {
                                        navigate("/institution/upload-schedule");
                                    }}
                                />
                                <span style={{ fontSize: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", marginBottom: 20 }}>Upload Schedule</span>
                            </HoverableIcon>
                        </div>
                        <div className={"col-6"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <HoverableIcon>
                                <img
                                    src={StudenFileUploadImage}
                                    alt="Upload Student Files"
                                    style={{ width: "250px", height: "250px", cursor: "pointer" }}
                                    onClick={() => {
                                        navigate("/institution/upload-student-files");
                                    }}
                                />
                                <span style={{ fontSize: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", marginBottom: 20 }}>Upload File</span>
                            </HoverableIcon>
                        </div>
                    </div>
                    <div className={"row ml-3"} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <div className={"col-6"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <HoverableIcon>
                                <img
                                    src={AddRemoveLecturerImage}
                                    alt="Add/Remove Lecturer"
                                    style={{ width: "250px", height: "250px", cursor: "pointer" }}
                                    onClick={() => {
                                        navigate("/institution/add-lecturer");
                                    }}
                                />
                                <span style={{ fontSize: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", marginBottom: 20 }}>Add/Remove Lecturer</span>
                            </HoverableIcon>
                        </div>
                        <div className={"col-6"} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <HoverableIcon>
                                <img
                                    src={EditUniInfoImage}
                                    alt="Edit Information"
                                    style={{ width: "250px", height: "250px", cursor: "pointer" }}
                                    onClick={() => {
                                        navigate("/institution/edit-info");
                                    }}
                                />
                                <span style={{ fontSize: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", marginBottom: 20 }}>Edit University Info</span>
                            </HoverableIcon>
                        </div>
                    </div>
                </div>
            </RightContainer>

            <div>
                <HelpButton pdfUrl={UserManual} />
            </div>
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
