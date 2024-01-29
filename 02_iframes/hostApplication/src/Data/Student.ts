export interface StudentsCourse {
  courseId: string;
  courseName: string;
  professor: string;
  ects: number;
  subject: string;
  semesterOffered: number;
  grade: number | undefined;
  semesterTaken: number;
}

interface Address {
  street: string;
  zip: string;
  city: string;
}

export interface Student {
  firstName: string;
  lastName: string;
  mail: string;
  studentId: string;
  subject: string;
  address: Address;
  semester: number;
  courses: StudentsCourse[] | undefined;
}
