import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from "styled-components";
import LecturerNavigation from "../Navigation/LecturerNavigation";
import HelpButton from '../../Components/HelpButton';
import UserManual from "../HelpFiles/LecturerInstructions.pdf";
import EditNoteImage from '../Images/EditModuleInfo.png';
import AnnouncementImage from '../Images/Announcements.png';
import PersonalInfoImage from '../Images/Personalnfo.png';

const DashboardLecturer = () => {
    const navigate = useNavigate();
    return (<div>

        <LeftContainer>
            <LecturerNavigation />
        </LeftContainer>
        <RightContainer>


            <div className={"grid"} >
                <h1 style={{ position: "absolute", top: "15%", left: "42%" }}>Dashboard</h1>
                <div className={"row ml-3"} style={{ alignItems: "center", height: "90vh" }}>

                    <div className={"col-4"} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                    }}>


                        <HoverableIcon>  {/* Modules page */}
                            <img
                                src={EditNoteImage}
                                alt="Edit Module Info"
                                style={{ width: "250px", height: "250px", cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/lecturer/modules");
                                }}
                            />
                            <span style={{ fontSize: "30px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Edit Course Info</span>
                        </HoverableIcon>
                    </div>


                    <div className={"col-4"} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                    }}>
                        <HoverableIcon> {/* Announcements page */}
                            <img
                                src={AnnouncementImage}
                                alt="Announcements"
                                style={{ width: "250px", height: "250px", cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/lecturer/announcement");
                                }}
                            />
                            <span style={{ fontSize: "30px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Announcements</span>
                        </HoverableIcon>
                    </div>

                    <div className={"col-4"} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                    }}>
                        <HoverableIcon>   {/* Edit personal info page */}
                            <img
                                src={PersonalInfoImage}
                                alt="PersonalInfp"
                                style={{ width: "250px", height: "250px", cursor: "pointer" }}
                                onClick={() => {
                                    navigate("/lecturer/personal-info");
                                }}
                            />


                            <span style={{ fontSize: "30px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Edit Personal Info</span>
                        </HoverableIcon>
                    </div>


                </div>
            </div>


        </RightContainer >
        <div>
            <HelpButton pdfUrl={UserManual} />  {/* Help menu */}

        </div>
    </div >)
}
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


export default DashboardLecturer;

