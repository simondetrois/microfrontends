import { Suspense, lazy, useEffect, useState } from "react";
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

  const ContentSelectionLeft = lazy(
    () => import("userRemote/ContentSelectionLeft") as any
  );

  const StudentDetails = lazy(
    () => import("studentRemote/StudentDetails") as any
  );

  const CourseDetails = lazy(() => import("courseRemote/CourseDetails") as any);

  return (
    <div className="home_container">
      <div className="home_outerContainer">
        <Suspense fallback={<div>Loading...</div>}>
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
          <Suspense fallback={<div>Loading...</div>}>
            <StudentDetails
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <CourseDetails
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Home;
