import React from "react";
import "./CourseDetails.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import { BaseCourse } from "../../Data/Course";
import { Student } from "../../Data/Student";
import BaseDataCourse from "../BaseDataCourse/BaseDataCourse";
import GradeOverviewCourse from "../GradeOverviewCourse/GradeOverviewCourse";
import CoursesStudentsTable from "../CoursesStudentsTable/CoursesStudentsTable";

interface DetailsViewProps {
  selectedStudent: Student | undefined;
  setSelectedStudent: Dispatch<SetStateAction<Student | undefined>>;
  selectedCourse: BaseCourse | undefined;
  setSelectedCourse: Dispatch<SetStateAction<BaseCourse | undefined>>;
  studentsSelected: boolean;
}

const DetailsView = ({
  selectedCourse,
  setSelectedCourse,
  studentsSelected,
}: DetailsViewProps) => {
  useEffect(() => {
    setSelectedCourse(undefined);
  }, [studentsSelected]);

  return (
    <div className="course_details_view_container">
      <div className="course_details_view_header">
        {studentsSelected ? "student" : "course"} details
        <div
          style={{
            color: selectedCourse ? "var(--fontLight)" : "rgb(185, 185, 185)",
            cursor: selectedCourse ? "pointer" : "auto",
            position: "absolute",
            right: 10,
            fontSize: 15,
          }}
          onClick={() => {
            setSelectedCourse(undefined);
          }}
        >
          clear
        </div>
      </div>

      {selectedCourse ? (
        <div className="course_details_view_content">
          <BaseDataCourse course={selectedCourse} />
          <GradeOverviewCourse students={selectedCourse.students} />
          <CoursesStudentsTable students={selectedCourse.students} />
        </div>
      ) : (
        <div className="course_details_view_content_non_selected_container">
          <div className="course_details_view_content_non_selected">
            <center>
              Click on a {studentsSelected ? "student" : "course"} in the table
              to display details
            </center>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsView;
