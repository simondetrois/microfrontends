class StudentsCourseTableWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.courses = undefined;
    this.render();
  }

  connectedCallback() {
    this.sliceCourseValues = this.sliceCourseValues.bind(this);
    this.render();
  }

  sliceCourseValues(value) {
    return value.length >= 15 ? `${value.slice(0, 10)}...` : value;
  }

  setProps(props) {
    this.courses = props.courses;
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
        this.render();
      } else {
        this.grades = undefined
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${studentCourseTableStyles}
      </style>
      <div class="students_course_table_container">
        <div class="students_course_table_header">courses</div>
        <div class="students_course_table">
          ${this.courses ? `
            <div class="students_course_table_header_row">
              <div
                class="students_course_table_header_column"
                style="flex: 1.5;"
              >
                Course
              </div>
              <div class="students_course_table_header_column">ECTS</div>
              <div class="students_course_table_header_column">Semester</div>
              <div class="students_course_table_header_column">Grade</div>
              <div style="width: 11px;"></div>
            </div>
            <div class="students_course_table_body">
              ${this.courses.map((course, key) => `
                <div key="${key}" class="students_course_table_row">
                  <div
                    class="students_course_table_header_column"
                    style="flex: 1.5;"
                  >
                    ${this.sliceCourseValues(course.courseName)}
                  </div>
                  <div class="students_course_table_header_column">
                    ${course.ects}
                  </div>
                  <div class="students_course_table_header_column">
                    ${course.semesterTaken}
                  </div>
                  <div class="students_course_table_header_column">
                    ${course.grade}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="students_course_table_no_courses">
              No courses for this student available
            </div>
          `}
        </div>
      </div>
    `;
  }
}

customElements.define('students-course-table', StudentsCourseTableWebComponent);

const studentCourseTableStyles = `
  .students_course_table_container {
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

  .students_course_table_header {
    color: var(--fontLight);
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    padding: 0px 0px 10px 0px;
    font-size: 20px;
    width: 100%;
  }

  .students_course_table {
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

  .students_course_table_header_row {
    display: flex;
    border-radius: 0 0px 10px 10px;
    font-size: 15px;
    background-color: var(--elementBody50);
    border-radius: 10px;
    padding: 2px 0 2px 10px;
  }

  .students_course_table_header_column {
    flex: 1;
  }

  .students_course_table_body {
    display: flex;
    flex-wrap: wrap;
    overflow: overlay;
    flex: 1;
    padding-left: 10px;
    scrollbar-gutter: stable;
  }

  .students_course_table_row {
    display: flex;
    border-radius: 0 0px 10px 10px;
    font-size: 15px;
    background-color: var(--elementBody);
    border-radius: 10px;
    flex-basis: 100%;
    padding: 2px 0 2px 0;
  }

  .students_course_table_no_courses {
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
