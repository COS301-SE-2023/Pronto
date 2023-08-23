import * as React from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import DragandDropSchedule from "./DragandDropSchedule";

const FileUploadPage = () => {
  return (
    <div>
      <nav>
        {/* Navigation bar content */}
        <InstitutionNavigation />
      </nav>
      <main
        style={{ marginLeft: "25%", width: "70%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
        className={"text-center"}
      >
        <h1 style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginLeft: "5%", // Adjust this value to shift content to the right
        }}>Upload Schedule</h1>
        <DragandDropSchedule />
      </main>
    </div>
  );
};

export default FileUploadPage;
