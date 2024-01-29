import React from "react";
import { BaseCourse } from "../../Data/Course";
import "./BaseDataCourse.css";

interface BaseDataCourseProps {
  course: BaseCourse;
}

const BaseDataCourse = ({ course }: BaseDataCourseProps) => {
  const sliceCourseValues = (value: string): string =>
    value.length >= 25 ? `${value.slice(0, 25)}...` : value;
  return (
    <div className="base_data_course_container">
      <div className="base_data_course_header">course base data</div>
      <div className="base_data_course_element">
        <div className="base_data_course_key">Course ID</div>
        <div className="base_data_course_value">
          {sliceCourseValues(String(course.courseId))}
        </div>
      </div>
      <div className="base_data_course_element">
        <div className="base_data_course_key">Professor </div>
        <div className="base_data_course_value">
          {sliceCourseValues(course.professor)}
        </div>
      </div>
      <div className="base_data_course_element">
        <div className="base_data_course_key">Coursename</div>
        <div className="base_data_course_value">
          {sliceCourseValues(course.courseName)}
        </div>
      </div>
      <div className="base_data_course_element">
        <div className="base_data_course_key">Abbreviation </div>
        <div className="base_data_course_value">
          {sliceCourseValues(course.abbreviation)}
        </div>
      </div>
      <div className="base_data_course_element">
        <div className="base_data_course_key">Semester </div>
        <div className="base_data_course_value">
          {course.semesterOffered.map((semester, key) => (
            <div key={key}>
              {course.semesterOffered.indexOf(semester) === 0 ? undefined : " "}
              {semester}
              {course.semesterOffered.indexOf(semester) ===
              course.semesterOffered.length - 1
                ? undefined
                : ","}
            </div>
          ))}
        </div>
      </div>
      <div className="base_data_course_element">
        <div className="base_data_course_key">Period </div>
        <div className="base_data_course_value">
          {course.period.map((period, key) => (
            <div key={key}>
              {course.period.indexOf(period) === 0 ? undefined : " "}
              {period}
              {course.period.indexOf(period) === course.period.length - 1
                ? undefined
                : ","}
            </div>
          ))}
        </div>
      </div>
      <div className="base_data_course_element">
        <div className="base_data_course_key">ECTS </div>
        <div className="base_data_course_value">{course.ects}</div>
      </div>
      <div className="base_data_course_element">
        <div className="base_data_course_key">Subject </div>
        <div className="base_data_course_value">
          {sliceCourseValues(course.subject)}
        </div>
      </div>
    </div>
  );
};

export default BaseDataCourse;
