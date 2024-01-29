class BaseDataCourseWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.course = {
      courseId: "",
      professor: "",
      courseName: "",
      abbreviation: "",
      semesterOffered: [],
      period: [],
      ects: 0,
      subject: "",
    };
    this.render();
  }

  connectedCallback() {
    const courseDataAttribute = this.getAttribute('data-course');

    if (courseDataAttribute && courseDataAttribute !== "undefined") {
      this.course = JSON.parse(courseDataAttribute.replace(/\+/g, ' '));
    }

    this.render();
  }

  sliceCourseValues(value) {
    return value.length >= 25 ? `${value.slice(0, 25)}...` : value;
  }

  static get observedAttributes() {
    return ['data-course'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const replacedNewValue = newValue.replace(/\+/g, ' ');
    this.course = JSON.parse(replacedNewValue);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${baseDataCourseStyles}
      </style>
      <div class="base_data_course_container">
        <div class="base_data_course_header">course base data</div>
        <div class="base_data_course_element">
          <div class="base_data_course_key">Course ID</div>
          <div class="base_data_course_value">
            ${this.sliceCourseValues(String(this.course.courseId))}
          </div>
        </div>
        <div class="base_data_course_element">
          <div class="base_data_course_key">Professor </div>
          <div class="base_data_course_value">
            ${this.sliceCourseValues(this.course.professor)}
          </div>
        </div>
        <div class="base_data_course_element">
          <div class="base_data_course_key">Coursename</div>
          <div class="base_data_course_value">
            ${this.sliceCourseValues(this.course.courseName)}
          </div>
        </div>
        <div class="base_data_course_element">
          <div class="base_data_course_key">Abbreviation </div>
          <div class="base_data_course_value">
            ${this.sliceCourseValues(this.course.abbreviation)}
          </div>
        </div>
        <div class="base_data_course_element">
          <div class="base_data_course_key">Semester </div>
          <div class="base_data_course_value">
            ${this.course.semesterOffered.map((semester, key) => (
              `<div key=${key}>
                ${this.course.semesterOffered.indexOf(semester) === 0 ? '' : ' '}
                ${semester}
                ${this.course.semesterOffered.indexOf(semester) ===
                this.course.semesterOffered.length - 1
                  ? ''
                  : ','}
              </div>`
            )).join('')}
          </div>
        </div>
        <div class="base_data_course_element">
          <div class="base_data_course_key">Period </div>
          <div class="base_data_course_value">
            ${this.course.period.map((period, key) => (
              `<div key=${key}>
                ${this.course.period.indexOf(period) === 0 ? '' : ' '}
                ${period}
                ${this.course.period.indexOf(period) === this.course.period.length - 1
                  ? ''
                  : ','}
              </div>`
            )).join('')}
          </div>
        </div>
        <div class="base_data_course_element">
          <div class="base_data_course_key">ECTS </div>
          <div class="base_data_course_value">${this.course.ects}</div>
        </div>
        <div class="base_data_course_element">
          <div class="base_data_course_key">Subject </div>
          <div class="base_data_course_value">
            ${this.sliceCourseValues(this.course.subject)}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('base-data-course', BaseDataCourseWebComponent);

const baseDataCourseStyles = `
  .base_data_course_container {
    display: flex;
    margin: 10px;
    border-radius: 10px;
    background-color: var(--blueGrey);
    flex-wrap: wrap;
    padding: 0 10px 10px 10px;
  }

  .base_data_course_header {
    color: var(--fontLight);
    display: flex;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
    height: fit-content;
    padding: 0px 0px 10px 0px;
    font-size: 20px;
  }

  .base_data_course_element {
    display: flex;
    padding-top: 2px;
    flex-basis: 100%;
    height: 27px;
    align-items: center;
    flex-grow: 0;
  }

  .base_data_course_key {
    color: var(--fontLight);
    flex-basis: 30%;
    flex-shrink: 0;
  }

  .base_data_course_value {
    display: flex;
    flex-basis: 70%;
    height: 23px;
    border-radius: 10px;
    background-color: var(--lightBlue);
    padding-left: 10px;
    padding-right: 10px;
    color: var(--fontDark);
  }
`;
