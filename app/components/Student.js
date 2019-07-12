//use later when refactoring

import React from 'react';
import { Link } from 'react-router-dom';

export default function Student(props) {
  const student = props.student;
  const studentId = student.id;
  const removeStudent = props.removeStudent;

  return (
    <li className="students">
      <Link to={`/students/${props.student.id}`}>
        <h2>{`${student.firstName} ${student.lastName}`}</h2>
      </Link>
      <button
        className="edit"
        // onClick={() => editStudent(studentId)}
        type="button"
      >
        edit
      </button>
      <button
        className="delete"
        onClick={() => removeStudent(studentId)}
        type="button"
      >
        delete
      </button>
    </li>
  );
}
