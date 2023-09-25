import * as React from "react";

import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import DragandDropSchedule from "./DragandDropSchedule";

const FileUploadPage = () => {
  return (
    <div style={{ display: "inline-flex" }}>
      <nav>
        {/* Navigation bar content */}
        <InstitutionNavigation />
      </nav>
      <main
        style={{ marginLeft: "25%", maxWidth: "1200px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: "0px" }}
        className={"text-center"}
      >
        <h1 style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>Upload Schedule</h1>
        <DragandDropSchedule />
      </main>
    </div>
  );
};

export default FileUploadPage;
