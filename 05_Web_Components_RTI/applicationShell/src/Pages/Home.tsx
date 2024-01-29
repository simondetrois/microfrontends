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

  const [userComponentsFetched, setUserComponentsFetched] =
    useState<boolean>(false);
  const [studentComponentsFetched, setStudentComponentsFetched] =
    useState<boolean>(false);
  const [courseComponentsFetched, setCourseComponentsFetched] =
    useState<boolean>(false);

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

  useEffect(() => {
    //@ts-ignore
    import("http://localhost:8081/crmusercomponents.js").then(() =>
      setUserComponentsFetched(true)
    );
    //@ts-ignore
    import("http://localhost:8082/crmstudentcomponents.js").then(() =>
      setStudentComponentsFetched(true)
    );
    //@ts-ignore
    import("http://localhost:8083/crmcoursecomponents.js").then(() =>
      setCourseComponentsFetched(true)
    );
  }, []);

  return (
    <div className="home_container">
      <div className="home_outerContainer">
        {userComponentsFetched && (
          <content-selection-left></content-selection-left>
        )}
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
        {studentsSelected
          ? studentComponentsFetched && (
              <student-details
                data-student={`${JSON.stringify(selectedStudent)}`}
              ></student-details>
            )
          : courseComponentsFetched && (
              <course-details
                data-course={`${JSON.stringify(selectedCourse)}`}
              ></course-details>
            )}
      </div>
    </div>
  );
};

export default Home;
