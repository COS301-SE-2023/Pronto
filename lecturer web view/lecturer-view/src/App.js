import React from "react";
import PostReminder from "./LectureView/PostReminder";
import LectureHomePage from "./LectureView/LectureHomePage";
import Login from "./Authentication/LecturerLogin/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstitutionHomePage from "./Institution VIew/InstitutionHomePage";



const Home = () => {
  return (

        <div>
            <Router >
                    <Routes>
                        <Route path="/" element={<InstitutionHomePage />} classname={"mt-5"}/>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/lecture-homepage" element={<LectureHomePage />} />
                    </Routes>
            </Router>

        </div>


  );
};

export default Home;
