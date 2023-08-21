import * as React from 'react';
import styled from "styled-components";
import LecturerNavigation from "../LecturerNavigation";
import EditNoteIcon from '@mui/icons-material/EditNote';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import HelpButton from '../../HelpButton';
import UserManual from "../HelpFiles/LecturerInstructions.pdf";

const DashboardLecturer = () => {
    return (<div>
        <LeftContainer>
            <LecturerNavigation />
        </LeftContainer>
        <RightContainer>

            <div className={"grid"}>
                <div className={"row ml-3"} style={{ alignItems: "center", height: "90vh" }}>
                    <div className={"col-4"} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                    }}>
                        <HoverableIcon>
                        <EditNoteIcon style={{ fontSize: "250px", cursor: "pointer" }}
                            onClick={() => {
                                window.location.href = "/lecturer/modules";
                            }}
                        />

                        <span style={{ fontSize: "30px" }}>Edit Module Info</span>
                        </HoverableIcon>
                    </div>

                    <div className={"col-4"} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                    }}>
                        <HoverableIcon>
                        <CampaignIcon style={{ fontSize: "250px", cursor: "pointer" }}
                            onClick={() => {
                                window.location.href = "/lecturer/announcement";
                            }}
                        />

                        <span style={{ fontSize: "30px" }}>Annoucements</span>
                        </HoverableIcon>
                    </div>

                    <div className={"col-4"} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                    }}>
                        <HoverableIcon>
                        <SettingsAccessibilityIcon style={{ fontSize: "250px", cursor: "pointer" }}
                            onClick={() => {
                                window.location.href = "/lecturer/personal-info";
                            }}
                        />
                        <span style={{ fontSize: "30px" }}>Edit Personal Info</span>
                        </HoverableIcon>
                    </div>


                </div>
            </div>


        </RightContainer>
        <div>
            <HelpButton pdfUrl={UserManual} />
        </div>
    </div>)
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

