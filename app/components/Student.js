//use later when refactoring

import React from 'react';
import { Link } from 'react-router-dom';

export default function Student(props) {
  const student = props.student;
  return (
    <li className="students">
      <Link to={`/students/${props.student.id}`}>
        <h2>{`${student.firstName} ${student.lastName}`}</h2>
      </Link>
    </li>
  );
}
