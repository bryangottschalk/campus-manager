//use later when refactoring

import React from 'react';

export default function Campus(props) {
  // console.log('TCL: SingleCampus -> props', props);
  const campus = props.campus;
  return (
    <li className={'campuses'}>
      <img className={'campusLogos'} src={campus.imageUrl} />
      <h1>{campus.name}</h1>
      <p>Address:{campus.address}</p>
      <p>{campus.description}</p>
    </li>
  );
}
