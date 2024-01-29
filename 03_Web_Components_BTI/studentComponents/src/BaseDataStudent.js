class BaseDataStudentWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.student =  {
      studentId: "",
      firstName: "",
      lastName: "",
      mail: "",
      semester: 0,
      address: {
        street: "",
        zip: "",
        city: ""
      },
      subject: "",
      courses: []
    },
    this.render();
  }

  connectedCallback() {
    this.sliceStudentValues = this.sliceStudentValues.bind(this);
    this.render();
  }

  sliceStudentValues(value) {
    return  value.length >= 25 ? `${value.slice(0, 25)}...` : value;
  }

  static get observedAttributes() {
    return ['data-student'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-student"){
    const replacedNewValue = newValue.replace(/\+/g,' ')
    const newStudentValue = JSON.parse(replacedNewValue)
    this.student = newStudentValue
    }

  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${baseDataStyles}
      </style>
      <div class="base_data_student_container">
        <div class="base_data_student_header">personal data</div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key">Student ID</div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(String(this.student.studentId ?? ""))}
          </div>
        </div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key">First Name</div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(this.student.firstName ?? "")}
          </div>
        </div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key">Last Name </div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(this.student.lastName ?? "")}
          </div>
        </div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key">Mail</div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(this.student.mail ?? "")}
          </div>
        </div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key">Subject</div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(this.student.subject ?? "")}
          </div>
        </div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key">Semester</div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(String(this.student.semester ?? ""))}
          </div>
        </div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key">address</div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(this.student.address.street ?? "")}
          </div>
        </div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key"></div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(this.student.address.zip ?? "")}
          </div>
        </div>
        <div class="base_data_student_element">
          <div class="base_data_student_element_key"></div>
          <div class="base_data_student_element_value">
            ${this.sliceStudentValues(this.student.address.city ?? "")}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('base-data-student', BaseDataStudentWebComponent);

const baseDataStyles = `
  .base_data_student_container {
    display: flex;
    margin: 10px;
    border-radius: 10px;
    background-color: var(--blueGrey);
    flex-wrap: wrap;
    padding: 0 10px 10px 10px;
  }

  .base_data_student_header {
    color: var(--fontLight);
    display: flex;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
    height: fit-content;
    padding: 0px 0px 10px 0px;
    font-size: 20px;
  }

  .base_data_student_element {
    display: flex;
    padding-top: 2px;
    flex-basis: 100%;
    height: 27px;
    align-items: center;
    flex-grow: 0;
  }

  .base_data_student_element_key {
    color: var(--fontLight);
    flex-basis: 30%;
    flex-shrink: 0;
  }

  .base_data_student_element_value {
    flex-basis: 70%;
    height: 23px;
    border-radius: 10px;
    background-color: var(--lightBlue);
    padding-left: 10px;
    padding-right: 10px;
    color: var(--fontDark);
  }
`;
