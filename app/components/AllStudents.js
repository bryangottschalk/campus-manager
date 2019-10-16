import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';
import { fetchStudentsThunk, removeStudentThunk } from '../redux/students';
import AddStudentForm from './AddStudentForm';

export class AllStudents extends React.Component {
  componentDidMount() {
    this.props.loadStudents();
  }
  removeStudent = studentId => {
    this.props.deleteStudent(studentId);
  };

  render() {
    const { students } = this.props;
    return (
      <div>
        <h1>All Students</h1>
        <hr />
        <AddStudentForm />
        <div className="studentsContainer">
          {!students.length ? (
            <p>Loading students...</p>
          ) : (
            students.map(student => (
              <Student
                student={student}
                key={student.id}
                removeStudent={this.removeStudent}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
  };
};

const mapDispatchToProps = dispatch => ({
  loadStudents: () => dispatch(fetchStudentsThunk()),
  deleteStudent: studentId => dispatch(removeStudentThunk(studentId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStudents);
