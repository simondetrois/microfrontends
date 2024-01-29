

class StudentTableWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.students = [];
    this.selectedPaginationSize = 20;
    this.currentPage = 1;
    this.render();
    this.selectedStudent = undefined;
  }

  onFirstPage() {
    return this.currentPage === 1;
  }

  onLastPage() {
    return this.currentPage === Math.floor(this.students.length / this.selectedPaginationSize);
  }

  navigatePage( direction) {
   if (direction === 'prev' && !this.onFirstPage()) {
     this.currentPage -= 1
   } else if (direction === 'next' && !this.onLastPage()) {
      this.currentPage += 1
   }
   this.resetScrollbarToTopPosition();
   this.render()
  };

  changePageSize(selectedPaginationSize) {
    this.selectedPaginationSize = selectedPaginationSize;
    this.currentPage = 1;
    this.resetScrollbarToTopPosition();
    this.render();
  }

  resetScrollbarToTopPosition() {
    const el = this.shadowRoot.getElementById("content");
    el.scrollTop = 0;
  }

  stringExceedsMaxLength(value) {
    return value.length >= 20;
  }

  sliceStudentValues(value) {
    return this.stringExceedsMaxLength(value) ? `${value.slice(0, 18)}...` : value;
  }

  connectedCallback() {
    this.fetchStudents();
    this.navigatePage = this.navigatePage.bind(this);
    const updateStateFunction = this.getAttribute('setSelectedStudent');
  }

  fetchStudents() {
    fetch("http://localhost:8080/student-api/students")
      .then((response) => response.json())
      .then((data) => {
        this.students = data;
        this.render();
      })
      .catch((error) => console.error("Error fetching students:", error));
  }

  setCurrentlySelectedStudent(index){
   this.selectedStudent = this.students[Number(index) + Number(this.selectedPaginationSize) * (Number(this.currentPage) - 1)]
  this.setAttribute('selected-student', JSON.stringify(this.selectedStudent));

  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${studentTableStyles}
      </style>
      <div class="student_table_container">
        <div class="student_table_header_row">
          <div class="student_table_header_column">Student ID</div>
          <div class="student_table_header_column">First name </div>
          <div class="student_table_header_column">Last name</div>
          <div class="student_table_header_column">Mail</div>
          <div class="student_table_header_column">Subject</div>
          <div style="width: 12px;"></div>
        </div>

        <div class="student_table_content" id="content">
          ${this.students
            .slice(
              (this.currentPage - 1) * this.selectedPaginationSize,
              (this.currentPage - 1) * this.selectedPaginationSize + this.selectedPaginationSize
            )
            .map(
              (student, key) => `
                <div class="student_table_row" key=${key} >
                  <div class="student_table_column">${student.studentId}</div>
                  <div class="student_table_column">
                    <div title="${this.stringExceedsMaxLength(student.firstName) ? student.firstName : ''}">
                      ${this.sliceStudentValues(student.firstName)}
                    </div>
                  </div>
                  <div class="student_table_column">
                    <div title="${this.stringExceedsMaxLength(student.lastName) ? student.lastName : ''}">
                      ${this.sliceStudentValues(student.lastName)}
                    </div>
                  </div>
                  <div class="student_table_column">
                    <div title="${this.stringExceedsMaxLength(student.mail) ? student.mail : ''}">
                      ${this.sliceStudentValues(student.mail)}
                    </div>
                  </div>
                  <div class="student_table_column">
                    <div title="${this.stringExceedsMaxLength(student.subject) ? student.subject : ''}">
                      ${this.sliceStudentValues(student.subject)}
                    </div>
                  </div>
                </div>
              `
            )
            .join('')}
        </div>

        <div class="student_table_footer">
          <div class="student_table_pagination_container">
            <div
              class="student_table_pagination_element"
              style="font-weight: ${this.selectedPaginationSize === 20 ? 700 : 100}"
              onclick="this.changePageSize(20, 1)"
              id="pagination_20"
            >
              20
            </div>
            <div
              class="student_table_pagination_element"
              style="font-weight: ${this.selectedPaginationSize === 50 ? 700 : 100}"
              onclick=this.changePageSize(50, 1)"
              id="pagination_50"
            >
              50
            </div>
            <div
              class="student_table_pagination_element"
              style="font-weight: ${this.selectedPaginationSize === 100 ? 700 : 100}"
              id="pagination_100"
              >
              100
            </div>
          </div>
          <div class="student_table_pagination_container">
            ${this.currentPage}/${
              Math.floor(this.students.length / this.selectedPaginationSize) === 0
                ? 1
                : Math.floor(this.students.length / this.selectedPaginationSize)
            }&nbsp;
            <div
              class="student_table_page_switcher"
              style="color: ${this.onFirstPage() ? '#C0C0C0' : '#F1F6F9'}"
              id="prevButton"
            >
              &lt;
            </div>
            &nbsp;
            <div
              class="student_table_page_switcher"
              style="color: ${this.onLastPage() ? '#C0C0C0' : '#F1F6F9'}"
              id="nextButton"
            >
              >
            </div>
          </div>
        </div>
      </div>
    `;


    const nextButton = this.shadowRoot.getElementById('nextButton');
    const prevButton = this.shadowRoot.getElementById('prevButton');
    const pagination_20 = this.shadowRoot.getElementById('pagination_20');
    const pagination_50 = this.shadowRoot.getElementById('pagination_50');
    const pagination_100 = this.shadowRoot.getElementById('pagination_100');
    const tableRows = this.shadowRoot.getElementById('content').childNodes;
    if (nextButton && prevButton && pagination_20 && pagination_50 && pagination_100 && tableRows) {
      nextButton.addEventListener('click', () => this.navigatePage('next'));
      prevButton.addEventListener('click', () => this.navigatePage('prev'));
      pagination_20.addEventListener('click', () => this.changePageSize(20));
      pagination_50.addEventListener('click', () => this.changePageSize(50));
      pagination_100.addEventListener('click', () => this.changePageSize(100));
      tableRows.forEach((childNode) => {
        if (childNode.nodeType === Node.ELEMENT_NODE){
          childNode.addEventListener("click", () => this.setCurrentlySelectedStudent(childNode.attributes.key.value))
        }
      })
    }

  }
}

customElements.define('student-table', StudentTableWebComponent);

const studentTableStyles = `
  .student_table_container {
    display: flex;
    flex-direction: column;
    overflow: overlay;
    height: 720px;
    border-radius: 0 0px 10px 10px;
  }

  .student_table_header_row {
    display: flex;
    padding: 5px;
    background-color: var(--elementHeaderAndFooter);
    flex-shrink: 0;
    flex-grow: 0;

  }

  .student_table_header_column {
    flex: 1;
    color: var(--fontLight);
  }

  .student_table_content {
    flex: 1;
    overflow: overlay;
    background-color: var(--elementBody);
    scrollbar-gutter: stable;
  }

  .student_table_row {
    display: flex;
    padding: 5px;
    background-color: var(--elementBody);
    border-bottom: 1px solid var(--tableLine);
  }

  .student_table_row:hover {
    background-color: var(--tableHover);
  }

  .student_table_column {
    flex-basis: 20%;
    flex-shrink: 0;
    flex-grow: 0;
    overflow: hidden;
  }

  .student_table_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    background-color: var(--elementHeaderAndFooter);
    min-height: 21px;
    flex-shrink: 0;
    flex-grow: 0;
    color: var(--fontLight);
  }

  .student_table_pagination_container {
    display: flex;
    align-items: center;
  }

  .student_table_pagination_element {
    padding-right: 5px;
    cursor: pointer;
  }

  .student_table_pagination_element:hover {
    font-weight: 700;
  }

  .student_table_page_switcher {
    font-size: 1.2em;
    cursor: pointer;
  }

  .student_table_page_switcher:hover {
    font-weight: 700;
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


