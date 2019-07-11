import React from 'react';
import { connect } from 'react-redux';

const SingleStudent = props => {
  const studentId = Number(props.match.params.id);
  const { students } = props;

  return (
    <div>
      {students.length ? (
        <div>
          <h1>
            Hello! My name is:
            {
              students.find(student => {
                return student.id === studentId;
              }).firstName
            }
            {
              students.find(student => {
                return student.id === studentId;
              }).lastName
            }
          </h1>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    students: state.students,
  };
};

const mapDispatchToProps = dispatch => ({
  // loadSingleStudent: data => dispatch(fetchSingleStudent(data)),
  loadStudents: () => dispatch(fetchStudents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);
