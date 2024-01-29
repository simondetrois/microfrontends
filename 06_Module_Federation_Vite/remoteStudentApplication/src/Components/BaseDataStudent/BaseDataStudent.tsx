import { Student } from "../../Data/Student";
import "./BaseDataStudent.css";

interface BaseDataStudentDataProps {
  student: Student;
}

const BaseDataStudent = ({ student }: BaseDataStudentDataProps) => {
  const sliceStudentValues = (value: string): string =>
    value.length >= 25 ? `${value.slice(0, 25)}...` : value;
  return (
    <div className="base_data_student_container">
      <div className="base_data_student_header">personal data</div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key">Student ID</div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(String(student.studentId))}
        </div>
      </div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key">First Name</div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(student.firstName)}
        </div>
      </div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key">Last Name </div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(student.lastName)}
        </div>
      </div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key">Mail</div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(student.mail)}
        </div>
      </div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key">Subject</div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(student.subject)}
        </div>
      </div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key">Semester</div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(String(student.semester))}
        </div>
      </div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key">address</div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(student.address.street)}
        </div>
      </div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key"></div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(student.address.zip)}
        </div>
      </div>
      <div className="base_data_student_element">
        <div className="base_data_student_element_key"></div>
        <div className="base_data_student_element_value">
          {sliceStudentValues(student.address.city)}
        </div>
      </div>
    </div>
  );
};

export default BaseDataStudent;
