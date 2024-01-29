class CoursesStudentTableWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.students = undefined;
    this.render();
  }

  connectedCallback() {
    this.sliceCourseValues = this.sliceStudentsValues.bind(this);
    this.render();
  }

  sliceStudentsValues(value) {
    return value.length >= 15 ? `${value.slice(0, 10)}...` : value;
  }

  setProps(props) {
    this.students = props.courses;
    this.render();
  }

  static get observedAttributes() {
    return ['data-students'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-students') {
      if (newValue !== "undefined"){
        const replacedNewValue = newValue.replace(/\+/g,' ')
        const newCoursesValue = JSON.parse(replacedNewValue)
        this.students = newCoursesValue
      } else {
        this.students = undefined
      }
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${coursesStudentTableStyles}
      </style>
      <div class="courses_student_table_container">
        <div class="courses_student_table_header">courses</div>
        <div class="courses_student_table">
          ${this.students ? `
            <div class="courses_student_table_header_row">
              <div
                class="courses_student_table_header_column"
                style="flex: 1.5;"
              >
                Student
              </div>
              <div class="courses_student_table_header_column">Grade</div>
              <div class="courses_student_table_header_column">Semester</div>
              <div class="courses_student_table_header_column">Grade</div>
              <div style="width: 11px;"></div>
            </div>
            <div class="courses_student_table_body">
              ${this.students.map((student, key) => `
                <div key="${key}" class="courses_student_table_row">
                  <div
                    class="courses_student_table_header_column"
                    style="flex: 1.5;"
                  >
                    ${this.sliceStudentsValues(
                      `${student.firstName.slice(
                        0,
                        2
                      )}.,${student.lastName.slice(0, 2)}, (${
                        student.studentId
                      })`
                    )}
                  </div>
                  <div class="courses_student_table_header_column">
                    ${student.grade ?? "NA"}
                  </div>
                  <div class="courses_student_table_header_column">
                    ${student.semesterTaken}
                  </div>
                  <div class="courses_student_table_header_column">
                    ${student.semester}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="courses_student_table_no_courses">
              No courses for this student available
            </div>
          `}
        </div>
      </div>
    `;
  }
}

customElements.define('courses-student-table', CoursesStudentTableWebComponent);

const coursesStudentTableStyles = `
.courses_student_table_container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 200px;
  max-height: 200px;
  margin: 0 10px 10px 10px;
  background-color: var(--blueGrey);
  border-radius: 10px;
  flex-wrap: wrap;
  padding: 0 10px 10px 10px;
}

.courses_student_table_header {
  color: var(--fontLight);
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding: 0px 0px 10px 0px;
  font-size: 20px;
  width: 100%;
}

.courses_student_table {
  display: flex;
  flex: 1;
  background-color: var(--elementBody);
  height: calc(100% - 40px);
  border-radius: 10px;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 160px;
  overflow: visible;
}

.courses_student_table_header_row {
  display: flex;
  border-radius: 0 0px 10px 10px;
  font-size: 15px;
  background-color: var(--elementBody50);
  border-radius: 10px;
  padding: 2px 0 2px 10px;
}

.courses_student_table_header_column {
  flex: 1;
}

.courses_student_table_body {
  display: flex;
  flex-wrap: wrap;
  overflow: overlay;
  flex: 1;
  padding-left: 10px;
  scrollbar-gutter: stable;
}

.courses_student_table_row {
  display: flex;
  border-radius: 0 0px 10px 10px;
  font-size: 15px;
  background-color: var(--elementBody);
  border-radius: 10px;
  flex-basis: 100%;
  padding: 2px 0 2px 0;
}

.courses_student_table_no_courses {
  display: flex;
  flex: 1;
  flex-basis: 100%;
  align-items: center;
  justify-content: center;
}


::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: var(--elementBody);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--headerAndFooter);
  border-radius: 12px;
  height: 12px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--headerAndFooter);
}
`;
