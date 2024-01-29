import { BaseCourse } from "../../Data/Course";
import BaseDataCourse from "../BaseDataCourse/BaseDataCourse";
import CoursesStudentsTable from "../CoursesStudentsTable/CoursesStudentsTable";
import GradeOverviewCourse from "../GradeOverviewCourse/GradeOverviewCourse";
import "./CourseDetails.css";

interface CourseDetailsProps {
  selectedCourse: BaseCourse | undefined;
  setSelectedCourse: React.Dispatch<
    React.SetStateAction<BaseCourse | undefined>
  >;
}

const CourseDetails = ({
  selectedCourse,
  setSelectedCourse,
}: CourseDetailsProps) => {
  return (
    <div className="course_details_view_container">
      <div className="course_details_view_header">
        course details
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

      <div className="course_details_view_content">
        {selectedCourse ? (
          <>
            <BaseDataCourse course={selectedCourse} />
            <GradeOverviewCourse students={selectedCourse.students} />
            <CoursesStudentsTable students={selectedCourse.students} />
          </>
        ) : (
          <div className="course_details_view_content_non_selected_container">
            <div className="course_details_view_content_non_selected">
              <center>Click on a course in the table to display details</center>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
