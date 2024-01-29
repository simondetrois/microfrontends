import { Student } from "../../Data/Student";
import BaseDataStudent from "../BaseDataStudent/BaseDataStudent";
import GradeOverviewStudent from "../GradeOverviewStudent/GradeOverviewStudent";
import StudentsCourseTable from "../StudentsCourseTable/StudentsCourseTable";
import "./studentDetails.css";

interface StudentDetailsProps {
  selectedStudent: Student | undefined;
  setSelectedStudent: React.Dispatch<React.SetStateAction<Student | undefined>>;
}

const StudentDetails = ({
  selectedStudent,
  setSelectedStudent,
}: StudentDetailsProps) => {
  return (
    <div className="student_details_view_container">
      <div className="student_details_view_header">
        student details
        <div
          style={{
            color: selectedStudent ? "var(--fontLight)" : "rgb(185, 185, 185)",
            cursor: selectedStudent ? "pointer" : "auto",
            position: "absolute",
            right: 10,
            fontSize: 15,
          }}
          onClick={() => {
            setSelectedStudent(undefined);
          }}
        >
          clear
        </div>
      </div>

      <div className="student_details_view_content">
        {selectedStudent ? (
          <>
            <BaseDataStudent student={selectedStudent} />
            <GradeOverviewStudent courses={selectedStudent.courses} />
            <StudentsCourseTable courses={selectedStudent.courses} />
          </>
        ) : (
          <div className="student_details_view_content_non_selected_container">
            <div className="student_details_view_content_non_selected">
              <center>
                Click on a student in the table to display details
              </center>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
