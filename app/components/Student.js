import React from 'react';
import { Link } from 'react-router-dom';
import { UpdateStudentForm } from './UpdateStudentForm';
export default function Student(props) {
  const student = props.student;
  const studentId = student.id;
  const removeStudent = props.removeStudent;

  return (
    <div className="students">
      <img src={student.imageUrl} />
      <Link to={`/students/${props.student.id}`}>
        <h3>{`${student.firstName} ${student.lastName}`}</h3>
      </Link>
      <Link
        to={`/students/${props.student.id}/edit`}
        component={UpdateStudentForm}
      >
        <button className="edit" type="button">
          edit
        </button>
      </Link>
      <button
        className="delete"
        onClick={() => removeStudent(studentId)}
        type="button"
      >
        delete
      </button>
    </div>
  );
}
