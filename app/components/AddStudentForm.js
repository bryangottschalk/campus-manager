import React from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../redux/students';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  gpa: undefined,
};

class AddStudentForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;
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
    this.setState(initialState);
  }
  render() {
    const { firstName, lastName, email, imageUrl, gpa } = this.state;
    return (
      <div>
        <h2>Add Student</h2>
        <div className="addStudentFormContainer">
          <form className="addStudentForm" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label htmlFor="firstName">First Name*</label>
                <input
                  onChange={this.handleChange}
                  name="firstName"
                  type="text"
                  value={firstName}
                />
              </li>
              <li>
                <label htmlFor="lastName">Last Name:*</label>
                <input
                  onChange={this.handleChange}
                  name="lastName"
                  type="text"
                  value={lastName}
                />
              </li>
              <li>
                <label htmlFor="email">Email:*</label>
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
                <button
                  disabled={!firstName || !lastName || !email}
                  type="submit"
                >
                  Submit
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadStudent: formSubmission => dispatch(postStudent(formSubmission)),
});

export default connect(
  null,
  mapDispatchToProps
)(AddStudentForm);
