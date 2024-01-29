import { useEffect, useState } from "react";
import ContentSelectionCenter from "../Components/ContentSelectionCenter/ContentSelectionCenter";
import { Student } from "../Data/Student";
import "./Home.css";
import { BaseCourse } from "../Data/Course";
import ContentSelectionLeft from "../Components/ContentSelectionLeft/ContentSelectionLeft";
import StudentDetails from "../Components/StudentDetails/StudentDetails";
import CourseDetails from "../Components/CourseDetails/CourseDetails";

const Home = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );

  const [selectedCourse, setSelectedCourse] = useState<BaseCourse | undefined>(
    undefined
  );

  const [studentsSelected, setStudentsSelected] = useState<boolean>(true);

  useEffect(() => {
    setSelectedCourse(undefined);
    setSelectedStudent(undefined);
  }, [studentsSelected]);

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
        {studentsSelected ? (
          <StudentDetails
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        ) : (
          <CourseDetails
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
