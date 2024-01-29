import { StudentsCourse } from "../../Data/Student";
import "./StudentsCourseTable.css";

interface StudentsCourseTableProps {
  courses: StudentsCourse[] | undefined;
}

const StudentsCourseTable = ({ courses }: StudentsCourseTableProps) => {
  const sliceCourseValues = (value: string): string =>
    value.length >= 15 ? `${value.slice(0, 10)}...` : value;

  return (
    <div className="students_course_table_container">
      <div className="students_course_table_header">courses</div>
      <div className="students_course_table">
        {courses ? (
          <>
            <div className="students_course_table_header_row">
              <div
                className="students_course_table_header_column"
                style={{
                  flex: 1.5,
                }}
              >
                Course
              </div>
              <div className="students_course_table_header_column">ECTS</div>
              <div className="students_course_table_header_column">
                Semester
              </div>
              <div className="students_course_table_header_column">Grade</div>
              <div style={{ width: "11px" }}></div>
            </div>
            <div className="students_course_table_body">
              {courses.map((course, key) => (
                <div key={key} className="students_course_table_row">
                  <div
                    className="students_course_table_header_column"
                    style={{
                      flex: 1.5,
                    }}
                  >
                    {sliceCourseValues(course.courseName)}
                  </div>
                  <div className="students_course_table_header_column">
                    {course.ects}
                  </div>
                  <div className="students_course_table_header_column">
                    {course.semesterTaken}
                  </div>
                  <div className="students_course_table_header_column">
                    {course.grade}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="students_course_table_no_courses">
            No courses for this student available
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsCourseTable;
