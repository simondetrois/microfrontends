import { Dispatch, SetStateAction, useEffect } from "react";
import { BaseCourse } from "../../Data/Course";
import { Student } from "../../Data/Student";
import GradeOverviewStudent from "../GradeOverviewStudent/GradeOverviewStudent";
import BaseDataStudent from "../BaseDataStudent/BaseDataStudent";
import StudentsCourseTable from "../StudentsCourseTable/StudentsCourseTable";
import "./DetailsView.css";
import BaseDataCourse from "../BaseDataCourse/BaseDataCourse";
import GradeOverviewCourse from "../GradeOverviewCourse/GradeOverviewCourse";
import CoursesStudentsTable from "../CoursesStudentsTable/CoursesStudentsTable";
import React from "react";
interface DetailsViewProps {
  selectedStudent: Student | undefined;
  setSelectedStudent: Dispatch<SetStateAction<Student | undefined>>;
  selectedCourse: BaseCourse | undefined;
  setSelectedCourse: Dispatch<SetStateAction<BaseCourse | undefined>>;
  studentsSelected: boolean;
}

const DetailsView = ({
  selectedStudent,
  setSelectedStudent,
  selectedCourse,
  setSelectedCourse,
  studentsSelected,
}: DetailsViewProps) => {
  useEffect(() => {
    setSelectedStudent(undefined);
    setSelectedCourse(undefined);
  }, [studentsSelected]);

  return (
    <div className="details_view_container">
      <div className="details_view_header">
        {studentsSelected ? "student" : "course"} details
        <div
          style={{
            color:
              selectedStudent || selectedCourse
                ? "var(--fontLight)"
                : "rgb(185, 185, 185)",
            cursor: selectedStudent || selectedCourse ? "pointer" : "auto",
            position: "absolute",
            right: 10,
            fontSize: 15,
          }}
          onClick={() => {
            if (selectedStudent) {
              setSelectedStudent(undefined);
            } else if (selectedCourse) {
              setSelectedCourse(undefined);
            }
          }}
        >
          clear
        </div>
      </div>
      {/*
      {selectedStudent && studentsSelected && (
        <div className="details_view_content">
          <BaseDataStudent student={selectedStudent} />
          <GradeOverviewStudent courses={selectedStudent.courses} />
          <StudentsCourseTable courses={selectedStudent.courses} />
        </div>
      )}

      {selectedCourse && !studentsSelected && (
        <div className="details_view_content">
          <BaseDataCourse course={selectedCourse} />
          <GradeOverviewCourse students={selectedCourse.students} />
          <CoursesStudentsTable students={selectedCourse.students} />
        </div>
      )}

      {!selectedCourse && !selectedStudent && (
        <div className="details_view_content_non_selected_container">
          <div className="details_view_content_non_selected">
            <center>
              Click on a {studentsSelected ? "student" : "course"} in the table
              to display details
            </center>
          </div>
        </div>
      )}
       */}
    </div>
  );
};

export default DetailsView;
