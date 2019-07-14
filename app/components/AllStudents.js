import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';
import { removeStudent } from '../redux/students';
import AddStudentForm from './AddStudentForm';

export class AllStudents extends React.Component {
  constructor() {
    super();
    this.removeStudent = this.removeStudent.bind(this);
  }

  removeStudent(studentId) {
    this.props.deleteStudent(studentId);
  }

  render() {
    const { students } = this.props;
    return (
      <div>
        <h1>All Students</h1>
        <hr />
        <AddStudentForm />
        <div className="studentsContainer">
          {!students.length ? (
            <p>There are no students registered in the database. :(</p>
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
  deleteStudent: studentId => dispatch(removeStudent(studentId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStudents);
