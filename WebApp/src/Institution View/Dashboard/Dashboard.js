import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from "styled-components";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import HelpButton from '../../Components/HelpButton';
import UserManual from "../HelpFiles/InstitutionInstructions.pdf";
import ScheduleUploadImage from "../Images/ScheduleUploadImage.png";
import AddRemoveLecturerImage from "../Images/AddRemoveLecturerImage.png";
import StudenFileUploadImage from "../Images/StudentFileUploadImage.png";
import EditUniInfoImage from "../Images/EditUniInfoImage.png";

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div style={{ maxHeight: "100vh" }}>

            <LeftContainer>
                <InstitutionNavigation />

            </LeftContainer>
            <RightContainer>
                <br />
                <div className={"grid"} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", maxHeight: "100vh" }}>
                    <h1>Dashboard</h1>
                    <div className={"row ml-3"} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                        {/* upload schedule link */}
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

                        {/* Upload student files link */}
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
                        {/* add lecturer link */}
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
                        {/* edit info link */}
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
                <HelpButton pdfUrl={UserManual} />  {/* help menu */}
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
