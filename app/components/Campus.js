//use later when refactoring
import React from 'react';
import { Link } from 'react-router-dom';

export default function Campus(props) {
  const campus = props.campus;
  return (
    <li className="campuses">
      <hr />
      <img className="campusLogos" src={campus.imageUrl} />
      <Link to={`/campuses/${props.campus.id}`}>
        <h1>{campus.name}</h1>
      </Link>
      <p>Address: {campus.address}</p>
      <p>{campus.description}</p>
    </li>
  );
}
