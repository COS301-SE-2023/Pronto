import * as React from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import DragandDropSchedule from "./DragandDropSchedule";

const FileUploadPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: "20%" }}>
        {/* Navigation bar content */}
        <InstitutionNavigation />
      </nav>
      <main
        style={{ width: "900px", marginTop: "250px" }}
        className={"text-center"}
      >
        <h1>Upload Schedule</h1>
        <DragandDropSchedule />
      </main>
    </div>
  );
};

export default FileUploadPage;
