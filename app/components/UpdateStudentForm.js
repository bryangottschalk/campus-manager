import React from 'react';
import { buildUpdateStudentThunk } from '../redux/students';
import { connect } from 'react-redux';

class UpdateStudentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  componentDidMount() {
    const student = this.getStudent(this.props.students);
    this.setState(student);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const studentId = Number(this.props.match.params.id);
    this.props.updateStudent(studentId, this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: undefined,
    });
  }

  getStudent(students) {
    const studentId = Number(this.props.match.params.id);
    return students.find(student => {
      return student.id === studentId;
    });
  }

  render() {
    const { firstName, lastName, email, imageUrl, gpa } = this.state;

    return (
      <div>
        <h1>Update Student Form</h1>
        <form className="updateStudentForm" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          {!firstName && <span className="warning"> (Field is required)</span>}
          <input
            onChange={this.handleChange}
            name="firstName"
            type="text"
            value={firstName}
          />

          <label htmlFor="lastName">Last Name:</label>
          {!lastName && <span className="warning"> (Field is required)</span>}
          <input
            onChange={this.handleChange}
            name="lastName"
            type="text"
            value={lastName}
          />

          <label htmlFor="email">Email:</label>
          {!email && <span className="warning"> (Field is required)</span>}
          <input
            onChange={this.handleChange}
            name="email"
            type="text"
            value={email}
          />

          <label htmlFor="imageUrl">Image URL:</label>
          <input
            onChange={this.handleChange}
            name="imageUrl"
            type="text"
            value={imageUrl}
          />

          <label htmlFor="gpa">GPA:</label>
          <input
            onChange={this.handleChange}
            name="gpa"
            type="text"
            value={gpa}
          />

          <button disabled={!firstName || !lastName || !email} type="submit">
            Submit
          </button>
        </form>
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
  updateStudent: (studentId, formSubmission) =>
    dispatch(buildUpdateStudentThunk(studentId, formSubmission)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateStudentForm);
