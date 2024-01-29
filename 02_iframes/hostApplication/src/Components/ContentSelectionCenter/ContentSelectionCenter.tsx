import "./ContentSelectionCenter.css";

import { BaseCourse } from "../../Data/Course";
import { SetStateAction } from "react";
import { Student } from "../../Data/Student";

interface ContentSelectionCenterProps {
  setSelectedStudent: React.Dispatch<SetStateAction<Student | undefined>>;
  setSelectedCourse: React.Dispatch<SetStateAction<BaseCourse | undefined>>;
  studentsSelected: boolean;
  setStudentsSelected: React.Dispatch<SetStateAction<boolean>>;
}

const ContentSelectionCenter = ({
  studentsSelected,
  setStudentsSelected,
}: ContentSelectionCenterProps) => {
  const receiveMessage = (event: MessageEvent) => {
    if (event.origin === "http://localhost:3002") {
      if (!/^\[.*\]$/.test(`${event.data}`)) {
        const studentDetailsView = document.getElementById(
          "studentDetailsIframe"
        ) as HTMLIFrameElement;
        studentDetailsView.contentWindow?.postMessage(
          `${event.data}`,
          "http://localhost:3004"
        );
      }
    } else if (event.origin === "http://localhost:3003") {
      console.log(event.data);
      if (!/^\[.*\]$/.test(`${event.data}`)) {
        const courseDetailsView = document.getElementById(
          "courseDetailsIframe"
        ) as HTMLIFrameElement;
        courseDetailsView.contentWindow?.postMessage(
          `${event.data}`,
          "http://localhost:3005"
        );
      }
    }
    //window.removeEventListener("message", receiveMessage);
  };

  window.addEventListener("message", receiveMessage, { once: false });

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
          onClick={() => {
            setStudentsSelected(true);
          }}
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
        <iframe
          id="studentTable_id"
          style={{ display: "flex", flexBasis: "100%" }}
          title="Inline Frame Example"
          width="100%"
          height="100%"
          frameBorder="0"
          src="http://localhost:3002"
        ></iframe>
      ) : (
        <iframe
          style={{ display: "flex", flexBasis: "100%" }}
          title="Inline Frame Example"
          width="100%"
          height="100%"
          frameBorder="0"
          src="http://localhost:3003"
        ></iframe>
      )}
    </div>
  );
};

export default ContentSelectionCenter;
