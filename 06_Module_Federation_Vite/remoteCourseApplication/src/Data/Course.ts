export interface CoursesStudent {
  firstName: string;
  lastName: string;
  mail: string;
  studentId: string;
  subject: string;
  grade: number | undefined;
  semesterTaken: number;
  semester: number;
}

export interface BaseCourse {
  courseId: string;
  courseName: string;
  abbreviation: string;
  professor: string;
  semesterOffered: number[];
  period: string[];
  ects: number;
  subject: string;
  students: CoursesStudent[];
}

export interface FullCourse extends BaseCourse {
  grade: number;
}
