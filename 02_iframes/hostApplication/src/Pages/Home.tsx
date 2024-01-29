import "./Home.css";

import { BaseCourse } from "../Data/Course";
import ContentSelectionCenter from "../Components/ContentSelectionCenter/ContentSelectionCenter";
import { Student } from "../Data/Student";
import { useState } from "react";

const Home = () => {
  //@ts-ignore
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );

  //@ts-ignore
  const [selectedCourse, setSelectedCourse] = useState<BaseCourse | undefined>(
    undefined
  );

  const [studentsSelected, setStudentsSelected] = useState<boolean>(true);

  return (
    <div className="home_container">
      <div className="home_outerContainer">
        <iframe
          style={{ display: "flex", flexBasis: "100%" }}
          id="inlineFrameExample"
          title="Inline Frame Example"
          width="100%"
          height="100%"
          loading="lazy"
          frameBorder="0"
          src="http://localhost:3001"
        ></iframe>
      </div>
      <div className="home_middleContainer">
        <ContentSelectionCenter
          setSelectedStudent={setSelectedStudent}
          setSelectedCourse={setSelectedCourse}
          studentsSelected={studentsSelected}
          setStudentsSelected={setStudentsSelected}
        />
      </div>
      <div className="home_outerContainer">
        {studentsSelected ? (
          <iframe
            style={{ display: "flex", flexBasis: "100%" }}
            id="studentDetailsIframe"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            frameBorder="0"
            src="http://localhost:3004"
          ></iframe>
        ) : (
          <iframe
            style={{ display: "flex", flexBasis: "100%" }}
            id="courseDetailsIframe"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            frameBorder="0"
            src="http://localhost:3005"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Home;
