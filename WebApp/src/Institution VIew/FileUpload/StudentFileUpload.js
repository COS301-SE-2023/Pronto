import * as React from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import DragandDrop from "./DragandDrop";

const StudentFileUploadPage = () => {
  return (
    <div>
      <nav>
        {/* Navigation bar content */}
        <InstitutionNavigation />
      </nav>
      <main
        style={{ marginTop: "2%", marginLeft: "21%", width: "85%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
        className={"text-center"}
      >
        <h1 style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginLeft: "8%", // Adjust this value to shift content to the right
        }}>Upload Student Files</h1>
        
        <DragandDrop />
      </main>
    </div>
  );
};

export default StudentFileUploadPage;
