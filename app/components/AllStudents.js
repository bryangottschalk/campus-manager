import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';
import { postStudent } from '../redux/students';

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
    });
    //call thunk
  }
  render() {
    console.log('this.state', this.state);
    const { students } = this.props;
    const { firstName, lastName, email, imageUrl, gpa } = this.state;
    return (
      <div>
        <h1>All Students</h1>
        <h2>Add Student</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={this.handleChange}
            name="firstName"
            type="text"
            value={firstName}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            onChange={this.handleChange}
            name="lastName"
            type="text"
            value={lastName}
          />

          <label htmlFor="email">Email:</label>
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
          <button type="submit">Submit</button>
        </form>
        <hr />
        <ul className="allStudents">
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
  }
}

const mapStateToProps = state => {
  return {
    students: state.students,
  };
};

const mapDispatchToProps = dispatch => ({
  loadStudent: formSubmission => dispatch(postStudent(formSubmission)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStudents);
