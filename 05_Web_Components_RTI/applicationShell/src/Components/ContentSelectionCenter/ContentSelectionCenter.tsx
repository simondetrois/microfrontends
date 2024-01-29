import "./ContentSelectionCenter.css";
import { Student } from "../../Data/Student";
import { SetStateAction, useEffect, useRef } from "react";
import { BaseCourse } from "../../Data/Course";

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
  const studentTableRef = useRef<HTMLElement | null>(null);
  const courseTableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    studentTableRef.current?.addEventListener("click", (event) => {
      //@ts-ignore
      setSelectedStudent(event.target!.selectedStudent as Student);
    });
  }, [studentsSelected]);

  useEffect(() => {
    courseTableRef.current?.addEventListener("click", (event) => {
      //@ts-ignore
      setSelectedCourse(event.target!.selectedCourse as BaseCourse);
    });
  }, [studentsSelected]);

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
        <student-table ref={studentTableRef} data-student=""></student-table>
      ) : (
        <course-table ref={courseTableRef}></course-table>
      )}
    </div>
  );
};

export default ContentSelectionCenter;
