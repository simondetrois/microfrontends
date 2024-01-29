import { useState } from "react";
import "./App.css";
import BaseDataCourse from "./Components/BaseDataCourse/BaseDataCourse";
import GradeOverviewCourse from "./Components/GradeOverviewCourse/GradeOverviewCourse";
import CoursesStudentsTable from "./Components/CoursesStudentsTable/CoursesStudentsTable";
import { BaseCourse } from "./Data/Course";

function App() {
  const [selectedCourse, setselectedCourse] = useState<BaseCourse | undefined>(
    undefined
  );

  const receiveMessage = (event: MessageEvent) => {
    if (`${event.data}` === "undefined") {
      setselectedCourse(undefined);
    } else if (!/^\[.*\]$/.test(`${event.data}`)) {
      const course: BaseCourse = JSON.parse(`${event.data}`);
      setselectedCourse(course);
    }
  };

  window.addEventListener("message", receiveMessage, { once: false });

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
            setselectedCourse(undefined);
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
}

export default App;
