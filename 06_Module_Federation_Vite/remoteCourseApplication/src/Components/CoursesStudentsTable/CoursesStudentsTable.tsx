import { CoursesStudent } from "../../Data/Course";
import "./CoursesStudentsTable.css";

interface CoursesStudentsTableProps {
  students: CoursesStudent[] | undefined;
}

const CoursesStudentsTable = ({ students }: CoursesStudentsTableProps) => {
  const sliceStudentsValues = (value: string): string =>
    value.length >= 15 ? `${value.slice(0, 10)}...` : value;

  return (
    <div className="courses_student_table_container">
      <div className="courses_student_table_header">students</div>
      <div className="courses_student_table">
        {students ? (
          <>
            <div className="courses_student_table_header_row">
              <div
                className="courses_student_table_header_column"
                style={{
                  flex: 1.5,
                }}
              >
                student
              </div>
              <div className="courses_student_table_header_column">Grade</div>
              <div className="courses_student_table_header_column">
                Semester
              </div>
              <div className="courses_student_table_header_column">Grade</div>
              <div style={{ width: "11px" }}></div>
            </div>
            <div className="courses_student_table_body">
              {students.map((student, key) => (
                <div key={key} className="courses_student_table_row">
                  <div
                    className="courses_student_table_header_column"
                    style={{
                      flex: 1.5,
                    }}
                  >
                    {sliceStudentsValues(
                      `${student.firstName.slice(
                        0,
                        2
                      )}.,${student.lastName.slice(0, 2)}, (${
                        student.studentId
                      })`
                    )}
                  </div>
                  <div className="courses_student_table_header_column">
                    {student.grade ?? "NA"}
                  </div>
                  <div className="courses_student_table_header_column">
                    {student.semesterTaken}
                  </div>
                  <div className="courses_student_table_header_column">
                    {student.semester}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="courses_student_table_no_courses">
            No students for this course available
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesStudentsTable;
