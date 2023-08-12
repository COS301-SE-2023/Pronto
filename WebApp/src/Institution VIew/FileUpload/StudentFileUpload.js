import * as React from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import DragandDrop from "./DragandDrop";

const StudentFileUploadPage = () => {
  return (
    <div style={{ display: "inline-flex" }}>
      <nav style={{ width: "20%" }}>
        {/* Navigation bar content */}
        <InstitutionNavigation />
      </nav>
      <main
        style={{ width: "900px", marginTop: "250px" }}
        className={"text-center"}
      >
        <h1 style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginLeft: "10%", // Adjust this value to shift content to the right
        }}>Upload Student Files</h1>
        <DragandDrop />
      </main>
    </div>
  );
};

export default StudentFileUploadPage;
