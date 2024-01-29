import { useEffect, useState } from "react";
import "./GradeOverviewStudent.css";
import { StudentsCourse } from "../../Data/Student";

interface GradeOverviewStudentProps {
  courses: StudentsCourse[] | undefined;
}

enum Grades {
  veryGood,
  good,
  average,
  belowAverage,
  failed,
}

const GradeOverviewStudent = ({ courses }: GradeOverviewStudentProps) => {
  const [mean, setMean] = useState<number>(0);
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

  const getAbsoluteGradeSum = (studentCourses: StudentsCourse[]) => {
    setMean(
      () =>
        Math.trunc(
          ((studentCourses
            .filter((course) => course.grade)
            .map((course) => course.grade)
            .reduce((prev, curr) => (curr! <= 4 ? prev! + curr! : prev)) ?? 0) /
            studentCourses.length) *
            100
        ) / 100
    );
    const occuranceArray = [0, 0, 0, 0, 0];
    studentCourses
      .filter((course) => course.grade)
      .forEach((course) => {
        if (course.grade! <= 1.5) {
          occuranceArray![0] += 1;
        } else if (1.5 < course.grade! && course.grade! <= 2.5) {
          occuranceArray![1] += 1;
        } else if (2.5 < course.grade! && course.grade! <= 3.5) {
          occuranceArray[2] += 1;
        } else if (3.5 < course.grade! && course.grade! <= 4) {
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
    if (courses && courses.length > 0) {
      getAbsoluteGradeSum(courses);
    } else {
      setGrades(undefined);
    }
  }, [courses]);

  return (
    <div className="grade_overview_student_container">
      <div className="grade_overview_student_header">
        overall grade distribution
      </div>
      <div className="grade_overview_student_body">
        {grades ? (
          <>
            <div className="grade_overview_student_chart_container">
              <div className="grade_overview_student_chart_y_axis"></div>
              <div className="grade_overview_student_chart_x_axis"></div>
              <div className="grade_overview_student_chart_labels grade_overview_student_chart_labels_vg">
                vg
              </div>
              <div className="grade_overview_student_chart_labels grade_overview_student_chart_labels_g">
                g
              </div>
              <div className="grade_overview_student_chart_labels grade_overview_student_chart_labels_av">
                av
              </div>
              <div className="grade_overview_student_chart_labels grade_overview_student_chart_labels_ba">
                ba
              </div>
              <div className="grade_overview_student_chart_labels grade_overview_student_chart_labels_f">
                f
              </div>
              <div
                className="bar"
                style={{
                  left: "27px",
                  backgroundColor: "var(--fontLight)",
                  height: `${grades?.get(Grades.veryGood)![1]}px`,
                }}
              >
                {grades.get(Grades.veryGood)![0] === 0
                  ? undefined
                  : grades?.get(Grades.veryGood)![0]}
              </div>
              <div
                className="bar"
                style={{
                  left: "57px",
                  backgroundColor: "var(--fontLight90)",
                  height: `${grades?.get(Grades.good)![1]}px`,
                }}
              >
                {grades?.get(Grades.good)![0] === 0
                  ? undefined
                  : grades?.get(Grades.good)![0]}
              </div>
              <div
                className="bar"
                style={{
                  left: "87px",
                  backgroundColor: "var(--fontLight80)",
                  height: `${grades?.get(Grades.average)![1]}px`,
                }}
              >
                {grades?.get(Grades.average)![0] === 0
                  ? undefined
                  : grades?.get(Grades.average)![0]}
              </div>
              <div
                className="bar"
                style={{
                  left: "117px",
                  backgroundColor: "var(--fontLight70)",
                  height: `${grades?.get(Grades.belowAverage)![1]}px`,
                }}
              >
                {grades?.get(Grades.belowAverage)![0] === 0
                  ? undefined
                  : grades?.get(Grades.belowAverage)![0]}
              </div>
              <div
                className="bar"
                style={{
                  left: "147px",
                  backgroundColor: "var(--fontLight60)",
                  height: `${grades?.get(Grades.failed)![1]}px`,
                }}
              >
                {grades?.get(Grades.failed)![0] === 0
                  ? undefined
                  : grades?.get(Grades.failed)![0]}
              </div>
            </div>
            <div className="grade_overview_student_legend">
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
          <div className="grade_overview_student_placeholder">
            No grades for this student so far
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeOverviewStudent;
