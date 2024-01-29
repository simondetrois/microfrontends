import React, { Suspense, lazy, useState } from "react";
import ContentSelectionCenter from "../Components/ContentSelectionCenter/ContentSelectionCenter";
import { Student } from "../Data/Student";
import "./Home.css";
import { BaseCourse } from "../Data/Course";

const Home = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );

  const [selectedCourse, setSelectedCourse] = useState<BaseCourse | undefined>(
    undefined
  );

  const [studentsSelected, setStudentsSelected] = useState<boolean>(true);

  const ContentSelectionLeft = lazy(
    () => import("remoteUserApplication/ContentSelectionLeft")
  );

  const StudentDetails = lazy(
    () => import("remoteStudentApplication/StudentDetails")
  );

  const CourseDetails = lazy(() => import("remoteCourseApplication/CourseDetails"))

  return (
    <div className="home_container">
      <div className="home_outerContainer">
        <Suspense fallback={<div>loading</div>}>
          <ContentSelectionLeft />
        </Suspense>
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
        {studentsSelected ? (
          <Suspense fallback={<div>loading</div>}>
            <StudentDetails
              studentsSelected={studentsSelected}
              setSelectedStudent={setSelectedStudent}
              selectedStudent={selectedStudent}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<div>loading</div>}>>
          <CourseDetails
            studentsSelected={studentsSelected}
            setSelectedCourse={setSelectedCourse}
            selectedCourse={selectedCourse}
          />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Home;
