import * as React from 'react';
import styled from "styled-components";
import LecturerNavigation from "../LecturerNavigation";

const DashboardLecturer = () => {
    return (
        <div>
            <LeftContainer>
                <LecturerNavigation/>
            </LeftContainer>
            <RightContainer>
                <div>
                    <div className={"row ml-3"}>
                        <h1>Dashboard Lecturer</h1>
                    </div>
                </div>
            </RightContainer>
        </div>
    )
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