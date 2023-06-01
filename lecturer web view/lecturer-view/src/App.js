import React from "react";
import PostReminder from "./LectureView/PostReminder";
import LectureHomePage from "./LectureView/LectureHomePage";
import Login from "./Authentication/LecturerLogin/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstitutionHomePage from "./Institution VIew/InstitutionHomePage";
import AddLecturer from "./Institution VIew/AddLecturer/addLecturer";



const Home = () => {
  return (

        <div>
            <Router >
                    <Routes>
                        <Route path="/" element={<InstitutionHomePage />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/lecture-homepage" element={<LectureHomePage />} />
                        <Route path="/add-lecturer" element={<AddLecturer />} />
                    </Routes>
            </Router>
        </div>


  );
};

export default Home;
