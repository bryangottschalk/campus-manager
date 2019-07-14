import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';
import { postStudent, removeStudent } from '../redux/students';

export class AllStudents extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.loadStudent(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: '',
    });
  }

  removeStudent(studentId) {
    this.props.deleteStudent(studentId);
  }

  render() {
    const { students } = this.props;
    const { firstName, lastName, email, imageUrl, gpa } = this.state;
    return (
      <div>
        <h1>All Students</h1>
        <hr />
        <h2>Add Student</h2>
        <div className="addStudentFormContainer">
          <form className="addStudentForm" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label htmlFor="firstName">First Name</label>
                <input
                  onChange={this.handleChange}
                  name="firstName"
                  type="text"
                  value={firstName}
                />
              </li>
              <li>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  onChange={this.handleChange}
                  name="lastName"
                  type="text"
                  value={lastName}
                />
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                <input
                  onChange={this.handleChange}
                  name="email"
                  type="text"
                  value={email}
                />
              </li>
              <li>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                  onChange={this.handleChange}
                  name="imageUrl"
                  type="text"
                  value={imageUrl}
                />
              </li>
              <li>
                <label htmlFor="gpa">GPA:</label>
                <input
                  onChange={this.handleChange}
                  name="gpa"
                  type="text"
                  value={gpa}
                />
              </li>
              <li>
                <button type="submit">Submit</button>
              </li>
            </ul>
          </form>
        </div>
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
  loadStudent: formSubmission => dispatch(postStudent(formSubmission)),
  deleteStudent: studentId => dispatch(removeStudent(studentId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStudents);
