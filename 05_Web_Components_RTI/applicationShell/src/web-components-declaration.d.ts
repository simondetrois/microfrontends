import { Student, StudentsCourse } from "../src/Data/Student";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "grade-overview-student": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "students-course-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "base-data-student": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "student-details": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "base-data-course": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "grade-overview-course": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "courses-student-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "course-details": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "user-profile": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "user-settings": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "content-selection-left": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "student-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }

    interface IntrinsicElements {
      "course-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }

  interface GradeOverviewStudentWebComponent extends HTMLElement {
    setProps(props: { courses: StudentsCourse[] | undefined }): void;
  }

  interface StudentsCourseTableWebComponent extends HTMLElement {
    setProps(props: { courses: StudentsCourse[] | undefined }): void;
  }

  interface BaseDataStudentWebComponent extends HTMLElement {
    setProps(props: { student: Student | undefined }): void;
  }

  interface StudentDetailsWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }

  interface BaseDataCourseWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }

  interface GradeOverviewCourseWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }

  interface CoursesStudentTableWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }

  interface CourseDetailsWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }

  interface UserProfileWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }

  interface UserSettingsWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }

  interface ContentSelectionLeftWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }

  interface StudentTableWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }
  interface CourseTableWebComponent extends HTMLElement {
    setProps(props: { selectedStudent: Student | undefined }): void;
  }
}
