import { useState } from "react";
import DetailsView from "../Components/DetailsView/DetailsView";
import ContentSelectionCenter from "../Components/ContentSelectionCenter/ContentSelectionCenter";
import { Student } from "../Data/Student";
import "./Home.css";
import { BaseCourse } from "../Data/Course";
import ContentSelectionLeft from "../Components/ContentSelectionLeft/ContentSelectionLeft";
import React from "react";

const Home = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );

  const [selectedCourse, setSelectedCourse] = useState<BaseCourse | undefined>(
    undefined
  );

  const [studentsSelected, setStudentsSelected] = useState<boolean>(true);

  return (
    <div className="home_container">
      <div className="home_outerContainer">
        <ContentSelectionLeft />
      </div>
      <div className="home_middleContainer">
        <ContentSelectionCenter
          setSelectedStudent={setSelectedStudent}
          setSelectedCourse={setSelectedCourse}
          studentsSelected={studentsSelected}
          setStudentsSelected={setStudentsSelected}
        />
      </div>
      <div className="home_outerContainer">
        <DetailsView
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          studentsSelected={studentsSelected}
        />
      </div>
    </div>
  );
};

export default Home;
