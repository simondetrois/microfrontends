import { useEffect, useState } from "react";
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

  useEffect(() => {
    setSelectedCourse(undefined);
    setSelectedStudent(undefined);
  }, [studentsSelected]);

  useEffect(() => {
    const studentDetails = document.querySelector(
      "student-details"
    ) as StudentDetailsWebComponent | null;

    studentDetails?.setAttribute(
      "data-student",
      `${JSON.stringify(selectedStudent)}`
    );
  }, [selectedStudent]);

  useEffect(() => {
    const studentDetails = document.querySelector(
      "course-details"
    ) as CourseDetailsWebComponent | null;

    studentDetails?.setAttribute(
      "data-course",
      `${JSON.stringify(selectedCourse)}`
    );
  }, [selectedCourse]);

  return (
    <div className="home_container">
      <div className="home_outerContainer">
        <content-selection-left></content-selection-left>
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
          <student-details
            data-student={`${JSON.stringify(selectedStudent)}`}
          ></student-details>
        ) : (
          <course-details
            data-course={`${JSON.stringify(selectedCourse)}`}
          ></course-details>
        )}
      </div>
    </div>
  );
};

export default Home;
