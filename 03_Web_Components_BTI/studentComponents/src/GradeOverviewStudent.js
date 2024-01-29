class GradeOverviewStudentWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.courses = undefined;
    this.mean = 0;
    this.grades = undefined
    //new Map([
   //   [0, [0, 0]],
   //   [1, [0, 0]],
   //   [2, [0, 0]],
   //   [3, [0, 0]],
   //   [4, [0, 0]],
   // ]);
   this.barcolors = ["fontLight", "fontLight90", "fontLight80", "fontLight70", "fontLight60"]

    this.render();
  }

  connectedCallback() {
    this.getAbsoluteGradeSum = this.getAbsoluteGradeSum.bind(this);
    this.render();

  }

  getAbsoluteGradeSum() {
    const calculatedMean = this.mean;
    const calculatedGrades = this.grades;
    if (this.courses !== undefined && this.courses.length > 0) {
      this.mean =
        Math.trunc(
          (this.courses
            .filter((course) => course.grade)
            .map((course) => course.grade)
            .reduce((prev, curr) => (curr <= 4 ? prev + curr : prev)) ?? 0) /
            this.courses.length *
            100
        ) / 100;

      const occuranceArray = [0, 0, 0, 0, 0];
      this.courses
        .filter((course) => course.grade)
        .forEach((course) => {
          if (course.grade <= 1.5) {
            occuranceArray[0] += 1;
          } else if (1.5 < course.grade && course.grade <= 2.5) {
            occuranceArray[1] += 1;
          } else if (2.5 < course.grade && course.grade <= 3.5) {
            occuranceArray[2] += 1;
          } else if (3.5 < course.grade && course.grade <= 4) {
            occuranceArray[3] += 1;
          } else {
            occuranceArray[4] += 1;
          }
        });

      const highestOccurence = Math.max(...occuranceArray);

      this.grades = new Map([
        [0, [occuranceArray[0], (occuranceArray[0] / highestOccurence) * 100]],
        [1, [occuranceArray[1], (occuranceArray[1] / highestOccurence) * 100]],
        [2, [occuranceArray[2], (occuranceArray[2] / highestOccurence) * 100]],
        [3, [occuranceArray[3], (occuranceArray[3] / highestOccurence) * 100]],
        [4, [occuranceArray[4], (occuranceArray[4] / highestOccurence) * 100]],
      ]);
    } else {
      this.mean = 0;
      this.grades = undefined
    }
    this.render();
  }

  static get observedAttributes() {
    return ['data-courses'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-courses') {
      if (newValue !== "undefined"){
        const replacedNewValue = newValue.replace(/\+/g,' ')
        const newCoursesValue = JSON.parse(replacedNewValue)
        this.courses = newCoursesValue
        this.getAbsoluteGradeSum()
        this.render();
      } else {
        this.grades = undefined
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${gradeOverviewStudentStyles}
      </style>
      <div class="grade_overview_student_container">
        <div class="grade_overview_student_header">
          overall grade distribution
        </div>
        <div class="grade_overview_student_body">
          ${this.grades ? `
            <div class="grade_overview_student_chart_container">
              <div class="grade_overview_student_chart_y_axis"></div>
              <div class="grade_overview_student_chart_x_axis"></div>
              <div class="grade_overview_student_chart_labels grade_overview_student_chart_labels_vg">
                vg
              </div>
              <div class="grade_overview_student_chart_labels grade_overview_student_chart_labels_g">
                g
              </div>
              <div class="grade_overview_student_chart_labels grade_overview_student_chart_labels_av">
                av
              </div>
              <div class="grade_overview_student_chart_labels grade_overview_student_chart_labels_ba">
                ba
              </div>
              <div class="grade_overview_student_chart_labels grade_overview_student_chart_labels_f">
                f
              </div>
              ${[0, 1, 2, 3, 4].map(grade => `
                <div
                  class="bar"
                  style="
                    left: ${27 + 30 * grade}px;
                    background-color: var(--${this.barcolors[[0, 1, 2, 3, 4].indexOf(grade)]});
                    height: ${this.grades.get(grade)[1]}px;
                  "
                >
                  ${this.grades.get(grade)[0] === 0 ? '' : this.grades.get(grade)[0]}
                </div>
              `).join('')}
            </div>
            <div class="grade_overview_student_legend">
              <ul>
                <li>vg (1,0-1,5)</li>
                <li>g (1,6-2,5)</li>
                <li>av (3,6-3,5)</li>
                <li>ba (3,6-4)</li>
                <li>f (from 4,1)</li>
                <li><b> mean: ${this.mean} </b></li>
              </ul>
            </div>
          ` : `
            <div class="grade_overview_student_placeholder">
              No grades for this student so far
            </div>
          `}
        </div>
      </div>
    `;
  }
}

customElements.define('grade-overview-student', GradeOverviewStudentWebComponent);

const gradeOverviewStudentStyles = `
  .grade_overview_student_container {
    display: flex;
    margin: 0px 10px 10px 10px;
    border-radius: 10px;
    background-color: var(--blueGrey);
    min-height: 160px;
    max-height: 160px;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }

  .grade_overview_student_header {
    color: var(--fontLight);
    display: flex;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
    height: fit-content;
    padding: 0px 0px 10px 0px;
    font-size: 20px;
  }

  .grade_overview_student_body {
    display: flex;
    flex-basis: 100%;
    height: calc(100% - 40px);
  }

  .grade_overview_student_chart_container {
    display: flex;
    flex-basis: 60%;
    position: relative;
  }

  .grade_overview_student_chart_y_axis {
    position: absolute;
    left: 10px;
    bottom: 13px;
    border-radius: 10px 10px 0 10px;
    height: 110px;
    width: 7px;
    background-color: var(--fontDark);
    z-index: 1;
  }

  .grade_overview_student_chart_x_axis {
    position: absolute;
    left: 10px;
    bottom: 13px;
    border-radius: 0 10px 10px 10px;
    height: 7px;
    width: 170px;
    background-color: var(--fontDark);
    z-index: 1;
  }

  .grade_overview_student_chart_labels {
    color: var(--fontLight);
    position: absolute;
    bottom: -3px;
    font-size: 13px;
  }

  .grade_overview_student_chart_labels_vg {
    left: 30px;
  }

  .grade_overview_student_chart_labels_g {
    left: 63px;
  }

  .grade_overview_student_chart_labels_av {
    left: 90px;
  }

  .grade_overview_student_chart_labels_ba {
    left: 120px;
  }

  .grade_overview_student_chart_labels_f {
    left: 155px;
  }

  .bar {
    position: absolute;
    bottom: 13px;
    border-radius: 5px 5px 0 0;
    width: 20px;
    z-index: 0;
    box-shadow: -5px -2px 10px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fontDark);
  }

  .grade_overview_student_legend {
    display: flex;
    flex-basis: 40%;
    color: var(--fontLight);
    font-size: 13px;
  }

  .grade_overview_student_placeholder {
    display: flex;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
    color: var(--fontLight);
  }
`;
