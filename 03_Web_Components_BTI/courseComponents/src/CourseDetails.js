class CourseDetailsWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.selectedCourse = "";
    this.selectedCourseStudents = ""
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['data-course'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-course') {
      const newlySelectedCourse = newValue && newValue !== 'undefined' ? JSON.parse(newValue) : undefined;
      this.selectedCourse = JSON.stringify(newlySelectedCourse)
      if (newlySelectedCourse?.students){
        this.selectedCourseStudents = JSON.stringify(newlySelectedCourse?.students)
      } else {
        this.selectedCourseStudents = undefined
      }
      this.render();
    }
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${courseDetailsStyles}
      </style>
      <div class="course_details_view_container">
        <div class="course_details_view_header">
          course details
          <div
            style="
              color: ${
                this.selectedCourse ? 'var(--fontLight)' : 'rgb(185, 185, 185)'
              };
              cursor: ${
                this.selectedCourse ? 'pointer' : 'auto'
              };
              position: absolute;
              right: 10px;
              font-size: 15px;
            "
            id="clearButton"
          >
            clear
          </div>
        </div>

        <div class="course_details_view_content">
          ${this.selectedCourse ? `
          <base-data-course
          data-course=${this.selectedCourse.replace(/\s+/g, "+")}
        ></base-data-course>
        <grade-overview-course
          data-students=${
            this.selectedCourseStudents
              ? this.selectedCourseStudents.replace(/\s+/g, "+")
              : "undefined"
          }
        ></grade-overview-course>
        <courses-student-table
          data-students=${
            this.selectedCourseStudents
              ? this.selectedCourseStudents.replace(/\s+/g, "+")
              : "undefined"
          }
        ></courses-student-table>
          ` : `
            <div class="course_details_view_content_non_selected_container">
              <div class="course_details_view_content_non_selected">
                <center>
                  Click on a student in the table to display details
                </center>
              </div>
            </div>
          `}
        </div>
      </div>
    `;

    const clearButton = this.shadowRoot.getElementById("clearButton")
    if (clearButton){
      clearButton.addEventListener("click", () => this.setAttribute("data-course", "undefined"))
    }
  }
}

customElements.define('course-details', CourseDetailsWebComponent);

const courseDetailsStyles = `
  .course_details_view_container {
    display: flex;
    width: inherit;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    background-color: var(--elementBody);
    flex-basis: 100%;
    height: 99vh;
  }

  .course_details_view_header {
    display: flex;
    padding: 7px;
    background-color: var(--elementHeaderAndFooter);
    color: var(--fontLight);
    flex-shrink: 0;
    flex-grow: 0;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    position: relative;
    font-size: 20px;
  }

  .course_details_view_content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }

  .course_details_view_content_non_selected_container {
    display: flex;
    flex: 1;
    background-color: var(--elementBody);
    justify-content: center;
    align-items: center;
    padding: 0 10px 0 10px;
  }

  .course_details_view_content_non_selected {
    width: 40%;
    background-color: var(--blueGrey30);
    color: var(--fontDark);
    padding: 15px;
    border-radius: 10px;
  }
`;
