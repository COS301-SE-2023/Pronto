import * as React from 'react';
import styled from "styled-components";
import LecturerNavigation from "../LecturerNavigation";
import EditNoteIcon from '@mui/icons-material/EditNote';
import CampaignIcon from '@mui/icons-material/Campaign';

const DashboardLecturer = () => {
    return (<div>
        <LeftContainer>
            <LecturerNavigation/>
        </LeftContainer>
        <RightContainer>

            <div className={"grid"}>
                <div className={"row ml-3"} style={{alignItems: "center", height: "90vh"}}>
                    <div className={"col-4"} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                    }}>
                            <EditNoteIcon style={{fontSize: "250px", cursor: "pointer"}}/>

                        <span style={{fontSize: "30px"}}>Edit Module Info</span>
                    </div>

                    <div className={"col-4"} style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                    }}>
                        <CampaignIcon style={{fontSize: "250px", cursor: "pointer"}}/>

                        <span style={{fontSize: "30px"}}>Annoucements</span>
                    </div>
                </div>
            </div>


        </RightContainer>
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


export default DashboardLecturer;

