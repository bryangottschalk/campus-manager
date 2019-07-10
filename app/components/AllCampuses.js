import React from 'react';
import { connect } from 'react-redux';
import { fetchCampuses } from '../redux/campuses';
import Campus from './Campus';

export const AllCampuses = props => {
  const { campuses } = props;

  return (
    <div>
      <h1>All Campuses</h1>
      <ul>
        {campuses.map(campus => (
          <Campus campus={campus} key={campus.id} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
  };
};

export default connect(mapStateToProps)(AllCampuses); //now a connected component
