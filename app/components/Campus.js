//use later when refactoring
import React from 'react';
import { Link } from 'react-router-dom';
import UpdateCampusForm from './UpdateCampusForm';

export default function Campus(props) {
  const campus = props.campus;
  const campusId = campus.id;
  const removeCampus = props.removeCampus;
  return (
    <li className="campuses">
      <hr />
      <img className="campusLogos" src={campus.imageUrl} />
      <Link
        to={`/campuses/${props.campus.id}/edit`}
        component={UpdateCampusForm}
      >
        <button
          className="edit"
          // onClick={() => editStudent(studentId)}
          type="button"
        >
          edit
        </button>
      </Link>
      <button
        className="delete"
        onClick={() => removeCampus(campusId)}
        type="button"
      >
        delete
      </button>
      <Link to={`/campuses/${props.campus.id}`}>
        <h1>{campus.name}</h1>
      </Link>
      <p>Address: {campus.address}</p>
      <p>{campus.description}</p>
    </li>
  );
}
