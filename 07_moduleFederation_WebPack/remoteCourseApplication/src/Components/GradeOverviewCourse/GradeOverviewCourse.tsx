import React from "react";
import { useEffect, useState } from "react";
import "./GradeOverviewCourse.css";
import axios from "axios";
import { CoursesStudent, FullCourse } from "../../Data/Course";

interface GradeOverviewCourseProps {
  students: CoursesStudent[] | undefined;
}

enum Grades {
  veryGood,
  good,
  average,
  belowAverage,
  failed,
}

const GradeOverviewCourse = ({ students }: GradeOverviewCourseProps) => {
  const [grades, setGrades] = useState<
    Map<Grades, [number, number]> | undefined
  >(
    new Map<Grades, [number, number]>([
      [Grades.veryGood, [0, 0]],
      [Grades.good, [0, 0]],
      [Grades.average, [0, 0]],
      [Grades.belowAverage, [0, 0]],
      [Grades.failed, [0, 0]],
    ])
  );

  const [mean, setMean] = useState<number>(0);

  const getAbsoluteGradeSum = (coursesStudents: CoursesStudent[]) => {
    setMean(
      () =>
        Math.trunc(
          ((coursesStudents
            .filter((student) => student.grade)
            .map((student) => student.grade)
            .reduce((prev, curr) => (curr! <= 4 ? prev! + curr! : prev!)) ??
            0) /
            coursesStudents.length) *
            100
        ) / 100
    );
    const occuranceArray = [0, 0, 0, 0, 0];

    coursesStudents
      .filter((student) => student.grade)
      .forEach((student) => {
        if (student.grade! <= 1.5) {
          occuranceArray![0] += 1;
        } else if (1.5 < student.grade! && student.grade! <= 2.5) {
          occuranceArray![1] += 1;
        } else if (2.5 < student.grade! && student.grade! <= 3.5) {
          occuranceArray[2] += 1;
        } else if (3.5 < student.grade! && student.grade! <= 4) {
          occuranceArray[3] += 1;
        } else {
          occuranceArray[4] += 1;
        }
      });

    var highestOccurence = 0;
    occuranceArray.forEach((gradeOccurence) => {
      if (gradeOccurence > highestOccurence) {
        highestOccurence = gradeOccurence;
      }
    });

    setGrades(
      new Map<Grades, [number, number]>([
        [
          Grades.veryGood,
          [occuranceArray![0], (occuranceArray![0] / highestOccurence) * 100],
        ],
        [
          Grades.good,
          [occuranceArray![1], (occuranceArray![1] / highestOccurence) * 100],
        ],
        [
          Grades.average,
          [occuranceArray[2], (occuranceArray[2] / highestOccurence) * 100],
        ],
        [
          Grades.belowAverage,
          [occuranceArray[3], (occuranceArray[3] / highestOccurence) * 100],
        ],
        [
          Grades.failed,
          [occuranceArray[4], (occuranceArray[4] / highestOccurence) * 100],
        ],
      ])
    );
  };

  useEffect(() => {
    if (students && students.length > 0) {
      getAbsoluteGradeSum(students);
    } else {
      setGrades(undefined);
    }
  }, [students]);

  return (
    <div className="grade_overview_course_container">
      <div className="grade_overview_course_header">
        course grade distribution
      </div>
      <div className="grade_overview_course_body">
        {grades ? (
          <>
            <div className="grade_overview_course_chart_container">
              <div className="grade_overview_course_chart_y_axis"></div>
              <div className="grade_overview_course_chart_x_axis"></div>
              <div className="grade_overview_course_chart_labels grade_overview_course_chart_labels_vg">
                vg
              </div>
              <div className="grade_overview_course_chart_labels grade_overview_course_chart_labels_g">
                g
              </div>
              <div className="grade_overview_course_chart_labels grade_overview_course_chart_labels_av">
                av
              </div>
              <div className="grade_overview_course_chart_labels grade_overview_course_chart_labels_ba">
                ba
              </div>
              <div className="grade_overview_course_chart_labels grade_overview_course_chart_labels_f">
                f
              </div>
              <div
                className="bar"
                style={{
                  left: "27px",
                  backgroundColor: "var(--fontLight)",
                  height: `${grades.get(Grades.veryGood)![1]}px`,
                }}
              >
                {grades.get(Grades.veryGood)![0] === 0
                  ? undefined
                  : grades.get(Grades.veryGood)![0]}
              </div>
              <div
                className="bar"
                style={{
                  left: "57px",
                  backgroundColor: "var(--fontLight90)",
                  height: `${grades.get(Grades.good)![1]}px`,
                }}
              >
                {grades.get(Grades.good)![0] === 0
                  ? undefined
                  : grades.get(Grades.good)![0]}
              </div>
              <div
                className="bar"
                style={{
                  left: "87px",
                  backgroundColor: "var(--fontLight80)",
                  height: `${grades.get(Grades.average)![1]}px`,
                }}
              >
                {grades.get(Grades.average)![0] === 0
                  ? undefined
                  : grades.get(Grades.average)![0]}
              </div>
              <div
                className="bar"
                style={{
                  left: "117px",
                  backgroundColor: "var(--fontLight70)",
                  height: `${grades.get(Grades.belowAverage)![1]}px`,
                }}
              >
                {grades.get(Grades.belowAverage)![0] === 0
                  ? undefined
                  : grades.get(Grades.belowAverage)![0]}
              </div>
              <div
                className="bar"
                style={{
                  left: "147px",
                  backgroundColor: "var(--fontLight60)",
                  height: `${grades.get(Grades.failed)![1]}px`,
                }}
              >
                {grades.get(Grades.failed)![0] === 0
                  ? undefined
                  : grades.get(Grades.failed)![0]}
              </div>
            </div>
            <div className="grade_overview_course_legend">
              <ul>
                <li>vg (1,0-1,5)</li>
                <li>g (1,6-2,5)</li>
                <li>av (3,6-3,5)</li>
                <li>ba (3,6-4)</li>
                <li>f (from 4,1)</li>
                <li>
                  <b> mean: {mean} </b>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="grade_overview_course_placeholder">
            No grades for this student so far
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeOverviewCourse;
