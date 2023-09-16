import * as React from "react";
import InstitutionNavigation from "../Navigation/InstitutionNavigation";
import DragandDrop from "./DragandDrop";

const StudentFileUploadPage = () => {
  return (
    <div style={{ display: "inline-flex" }}>
      <nav>
        {/* Navigation bar content */}
        <InstitutionNavigation />
      </nav>
      <main
        style={{ marginLeft: "25%", maxWidth: "1200px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
        className={"text-center"}
      >
        <h1 style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"

        }}>Upload Student Files</h1>

        <DragandDrop />
      </main>
    </div>
  );
};

export default StudentFileUploadPage;
