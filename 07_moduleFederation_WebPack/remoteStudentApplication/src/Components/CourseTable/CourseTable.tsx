import { useEffect, useState } from "react";
import "./CourseTable.css";
import axios from "axios";
import { BaseCourse } from "../../Data/Course";

interface CourseTableProps {
  setSelectedCourse: React.Dispatch<
    React.SetStateAction<BaseCourse | undefined>
  >;
}

const CourseTable = ({ setSelectedCourse }: CourseTableProps) => {
  const [courses, setCourses] = useState<BaseCourse[]>([]);
  const [selectedPaginationSize, setSelectedPaginationSize] =
    useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onFirstPage = (): boolean => currentPage === 1;

  const onLastPage = (): boolean =>
    currentPage === Math.floor(courses.length / selectedPaginationSize);

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

  const sliceCourseValues = (value: string): string =>
    stringExceedsMaxLength(value) ? `${value.slice(0, 18)}...` : value;

  useEffect(() => {
    axios
      .get("http://localhost:8080/course-api/courses")
      .then((response) => setCourses(response.data));
  }, []);
  return (
    <div className="course_table_container">
      <div className="course_table_header_row">
        <div className="course_table_header_column">Course ID</div>
        <div className="course_table_header_column">Course name </div>
        <div className="course_table_header_column">Professor</div>

        <div style={{ width: "12px" }}></div>
      </div>

      <div className="course_table_content" id="content">
        {courses
          .slice(
            (currentPage - 1) * selectedPaginationSize,
            (currentPage - 1) * selectedPaginationSize + selectedPaginationSize
          )
          .map((course, key) => (
            <div
              className="course_table_row"
              key={key}
              onClick={() => setSelectedCourse(course)}
            >
              <div className="course_table_column">
                <div>{course.courseId}</div>
              </div>
              <div className="course_table_column">
                <div
                  title={
                    stringExceedsMaxLength(course.courseName)
                      ? course.courseName
                      : undefined
                  }
                >
                  {sliceCourseValues(course.courseName)}
                </div>
              </div>
              <div className="course_table_column">
                <div
                  title={
                    stringExceedsMaxLength(course.professor)
                      ? course.professor
                      : undefined
                  }
                >
                  {sliceCourseValues(course.professor)}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="course_table_footer">
        <div className="course_table_pagination_container">
          <div
            className="course_table_pagination_element"
            style={{ fontWeight: selectedPaginationSize === 20 ? 700 : 100 }}
            onClick={() => changePageSize(20, 1)}
          >
            20
          </div>
          <div
            className="course_table_pagination_element"
            style={{ fontWeight: selectedPaginationSize === 50 ? 700 : 100 }}
            onClick={() => changePageSize(50, 1)}
          >
            50
          </div>
          <div
            className="course_table_pagination_element"
            style={{ fontWeight: selectedPaginationSize === 100 ? 700 : 100 }}
            onClick={() => changePageSize(100, 1)}
          >
            100
          </div>
        </div>
        <div className="course_table_pagination_container">
          {currentPage}/
          {Math.floor(courses.length / selectedPaginationSize) === 0
            ? 1
            : Math.floor(courses.length / selectedPaginationSize)}
          &nbsp;
          <div
            className="course_table_page_switcher"
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
            className="course_table_page_switcher"
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
};

export default CourseTable;
