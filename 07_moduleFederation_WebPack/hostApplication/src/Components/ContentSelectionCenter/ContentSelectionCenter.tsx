import "./ContentSelectionCenter.css";
import { Student } from "../../Data/Student";
import { SetStateAction, Suspense, lazy } from "react";
import { BaseCourse } from "../../Data/Course";
import React from "react";

interface ContentSelectionCenterProps {
  setSelectedStudent: React.Dispatch<SetStateAction<Student | undefined>>;
  setSelectedCourse: React.Dispatch<SetStateAction<BaseCourse | undefined>>;
  studentsSelected: boolean;
  setStudentsSelected: React.Dispatch<SetStateAction<boolean>>;
}

const ContentSelectionCenter = ({
  setSelectedStudent,
  setSelectedCourse,
  studentsSelected,
  setStudentsSelected,
}: ContentSelectionCenterProps) => {
  const StudentTable = lazy(
    () => import("remoteStudentApplication/StudentTable")
  );

  const CourseTable = lazy(() => import("remoteCourseApplication/CourseTable"));

  return (
    <div className="center_content_selection_container">
      <div className="center_content_selection_header">
        <div
          className="center_selection_item"
          style={{
            background: studentsSelected ? "#C0C0C080" : undefined,
            borderRadius: "10px 0 0 0px",
            borderRight: studentsSelected ? "2px solid #f1f6f9" : undefined,
          }}
          onClick={() => setStudentsSelected(true)}
        >
          students
        </div>

        <div
          className="center_selection_item"
          style={{
            background: studentsSelected ? undefined : "#C0C0C080",
            borderRadius: "0 10px 10px 0",
            borderLeft: studentsSelected ? undefined : "2px solid #f1f6f9",
          }}
          onClick={() => setStudentsSelected(false)}
        >
          courses
        </div>
      </div>

      {studentsSelected ? (
        <Suspense fallback={<div>loading</div>}>
          <StudentTable setSelectedStudent={setSelectedStudent} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>loading</div>}>
          <CourseTable setSelectedCourse={setSelectedCourse} />
        </Suspense>
      )}
    </div>
  );
};

export default ContentSelectionCenter;
