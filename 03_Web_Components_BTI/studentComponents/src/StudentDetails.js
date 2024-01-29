class StudentDetailsWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.selectedStudent = "";
    this.selectedStudentCourses = ""
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['data-student'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-student') {
      const newlySelectedStudent = newValue && newValue !== 'undefined' ? JSON.parse(newValue) : undefined;
      this.selectedStudent = JSON.stringify(newlySelectedStudent)

      if (newlySelectedStudent?.courses){
        this.selectedStudentCourses = JSON.stringify(newlySelectedStudent?.courses)
      } else {
        this.selectedStudentCourses = undefined
      }
      this.render();
    }
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${studentDetailsStyles}
      </style>
      <div class="student_details_view_container">
        <div class="student_details_view_header">
          student details
          <div
            style="
              color: ${
                this.selectedStudent ? 'var(--fontLight)' : 'rgb(185, 185, 185)'
              };
              cursor: ${
                this.selectedStudent ? 'pointer' : 'auto'
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

        <div class="student_details_view_content">
          ${this.selectedStudent ? `
            <base-data-student
              data-student=${this.selectedStudent.replace(/\s+/g, '+')}
            ></base-data-student>
            <grade-overview-student
              data-courses=${this.selectedStudentCourses ? this.selectedStudentCourses.replace(/\s+/g, '+'): "undefined"}
            ></grade-overview-student>
            <students-course-table
              data-courses=${this.selectedStudentCourses ? this.selectedStudentCourses.replace(/\s+/g, '+'): "undefined"}
            ></students-course-table>
          ` : `
            <div class="student_details_view_content_non_selected_container">
              <div class="student_details_view_content_non_selected">
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
      clearButton.addEventListener("click", () => this.setAttribute("data-student", "undefined"))
    }
  }
}

customElements.define('student-details', StudentDetailsWebComponent);

const studentDetailsStyles = `
  .student_details_view_container {
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

  .student_details_view_header {
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

  .student_details_view_content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }

  .student_details_view_content_non_selected_container {
    display: flex;
    flex: 1;
    background-color: var(--elementBody);
    justify-content: center;
    align-items: center;
    padding: 0 10px 0 10px;
  }

  .student_details_view_content_non_selected {
    width: 40%;
    background-color: var(--blueGrey30);
    color: var(--fontDark);
    padding: 15px;
    border-radius: 10px;
  }
`;
