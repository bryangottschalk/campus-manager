//use later when refactoring

import React from 'react';

export default function Student(props) {
  const student = props.student;
  return (
    <li className={'students'}>
      <h2>{`${student.firstName} ${student.lastName}`}</h2>
    </li>
  );
}
