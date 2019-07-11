import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';

export const AllStudents = props => {
  const { students } = props;
  return (
    <div>
      <h1>All Students</h1>
      <hr />
      <ul>
        {!students.length ? (
          <p>There are no students registered in the database. :(</p>
        ) : (
          students.map(student => (
            <Student student={student} key={student.id} />
          ))
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    students: state.students,
  };
};

export default connect(mapStateToProps)(AllStudents);
