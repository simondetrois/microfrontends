import { useState } from "react";
import "./App.css";
import StudentsCourseTable from "./Components/StudentsCourseTable/StudentsCourseTable";
import GradeOverviewStudent from "./Components/GradeOverviewStudent/GradeOverviewStudent";
import BaseDataStudent from "./Components/BaseDataStudent/BaseDataStudent";
import { Student } from "./Data/Student";

function App() {
  const [selectedStudent, setselectedStudent] = useState<Student | undefined>(
    undefined
  );

  const receiveMessage = (event: MessageEvent) => {
    if (`${event.data}` === "undefined") {
      setselectedStudent(undefined);
    } else if (!/^\[.*\]$/.test(`${event.data}`)) {
      const student: Student = JSON.parse(`${event.data}`);
      setselectedStudent(student);
    }
  };

  window.addEventListener("message", receiveMessage, { once: false });

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
            setselectedStudent(undefined);
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
}

export default App;
