import "./App.css";
import { useEffect, useState } from "react";
import { Student } from "./Data/Student";
import axios from "axios";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedPaginationSize, setSelectedPaginationSize] =
    useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedStudent, setSelectedStudent] = useState<Student>(
    {} as Student
  );
  const onFirstPage = (): boolean => currentPage === 1;

  const onLastPage = (): boolean =>
    currentPage === Math.floor(students.length / selectedPaginationSize);

  const changePageSize = (
    slectedPaginationSize: number,
    currentPage: number
  ) => {
    setSelectedPaginationSize(slectedPaginationSize);
    setCurrentPage(currentPage);
    resetScrollbarToTopPosition();
  };

  const resetScrollbarToTopPosition = () => {
    const el = document.getElementById("content");
    el!.scrollTop = 0;
  };

  const stringExceedsMaxLength = (value: string): boolean => value.length >= 20;

  const sliceStudentValues = (value: string): string =>
    stringExceedsMaxLength(value) ? `${value.slice(0, 18)}...` : value;

  useEffect(() => {
    axios
      .get("http://localhost:8080/student-api/students")
      .then((response) => setStudents(response.data));
  }, []);

  const [messageReadyToSend, setMessageReadyToSend] = useState<boolean>(false);

  useEffect(() => {
    if (messageReadyToSend) {
      window.parent.postMessage(
        `${JSON.stringify(selectedStudent)}`,
        "http://localhost:3000"
      );
      setMessageReadyToSend(false);
    }
  }, [messageReadyToSend]);

  return (
    <div className="student_table_container">
      <div className="student_table_header_row">
        <div className="student_table_header_column">Student ID</div>
        <div className="student_table_header_column">First name </div>
        <div className="student_table_header_column">Last name</div>
        <div className="student_table_header_column">Mail</div>
        <div className="student_table_header_column">Subject</div>
        <div style={{ width: "12px" }}></div>
      </div>

      <div className="student_table_content" id="content">
        {students
          .slice(
            (currentPage - 1) * selectedPaginationSize,
            (currentPage - 1) * selectedPaginationSize + selectedPaginationSize
          )
          .map((student, key) => (
            <div
              className="student_table_row"
              key={key}
              onClick={() => {
                setSelectedStudent(student);
                setMessageReadyToSend(true);
              }}
            >
              <div className="student_table_column">{student.studentId}</div>
              <div className="student_table_column">
                <div
                  title={
                    stringExceedsMaxLength(student.firstName)
                      ? student.firstName
                      : undefined
                  }
                >
                  {sliceStudentValues(student.firstName)}
                </div>
              </div>
              <div className="student_table_column">
                <div
                  title={
                    stringExceedsMaxLength(student.lastName)
                      ? student.lastName
                      : undefined
                  }
                >
                  {sliceStudentValues(student.lastName)}
                </div>
              </div>
              <div className="student_table_column">
                <div
                  title={
                    stringExceedsMaxLength(student.mail)
                      ? student.mail
                      : undefined
                  }
                >
                  {sliceStudentValues(student.mail)}
                </div>
              </div>
              <div className="student_table_column">
                <div
                  title={
                    stringExceedsMaxLength(student.subject)
                      ? student.subject
                      : undefined
                  }
                >
                  {sliceStudentValues(student.subject)}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="student_table_footer">
        <div className="student_table_pagination_container">
          <div
            className="student_table_pagination_element"
            style={{ fontWeight: selectedPaginationSize === 20 ? 700 : 100 }}
            onClick={() => changePageSize(20, 1)}
          >
            20
          </div>
          <div
            className="student_table_pagination_element"
            style={{ fontWeight: selectedPaginationSize === 50 ? 700 : 100 }}
            onClick={() => changePageSize(50, 1)}
          >
            50
          </div>
          <div
            className="student_table_pagination_element"
            style={{ fontWeight: selectedPaginationSize === 100 ? 700 : 100 }}
            onClick={() => changePageSize(100, 1)}
          >
            100
          </div>
        </div>
        <div className="student_table_pagination_container">
          {currentPage}/
          {Math.floor(students.length / selectedPaginationSize) === 0
            ? 1
            : Math.floor(students.length / selectedPaginationSize)}
          &nbsp;
          <div
            className="student_table_page_switcher"
            style={{
              color: onFirstPage() ? "#C0C0C0" : "#F1F6F9",
            }}
            onClick={() => {
              if (!onFirstPage()) {
                setCurrentPage((currentPage) => currentPage - 1);
                resetScrollbarToTopPosition();
              }
            }}
          >
            {" "}
            &lt;{" "}
          </div>
          &nbsp;
          <div
            className="student_table_page_switcher"
            style={{
              color: onLastPage() ? "#C0C0C0" : "#F1F6F9",
            }}
            onClick={() => {
              if (!onLastPage()) {
                setCurrentPage((currentPage) => currentPage + 1);
                resetScrollbarToTopPosition();
              }
            }}
          >
            {" "}
            {">"}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
