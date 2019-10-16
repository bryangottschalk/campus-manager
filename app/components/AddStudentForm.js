import React from 'react';
import { connect } from 'react-redux';
import { postStudentThunk } from '../redux/students';
import faker from 'faker';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  gpa: '',
};

class AddStudentForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  handleClick = () => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    this.setState({
      firstName: firstName,
      lastName: lastName,
      email: `${firstName}.${lastName}@example.org`,
      imageUrl: faker.image.avatar(),
      gpa: faker.random
        .number({
          min: 0,
          max: 4,
          precision: 0.1,
        })
        .toFixed(1),
    });
  };
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.loadStudent(this.state);
    this.setState(initialState);
  };
  render() {
    const { firstName, lastName, email, imageUrl, gpa } = this.state;
    return (
      <div>
        <h2>Add Student Form</h2>
        <button
          onClick={this.handleClick}
          className="generateRandomData"
          type="button"
        >
          Generate Random Data!
        </button>
        <div className="addStudentFormContainer">
          <form className="addStudentForm" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label htmlFor="firstName">First Name</label>
                {!firstName && (
                  <span className="warning"> (Field is required)</span>
                )}
                <input
                  onChange={this.handleChange}
                  name="firstName"
                  type="text"
                  value={firstName}
                />
              </li>
              <li>
                <label htmlFor="lastName">Last Name:</label>
                {!lastName && (
                  <span className="warning"> (Field is required)</span>
                )}
                <input
                  onChange={this.handleChange}
                  name="lastName"
                  type="text"
                  value={lastName}
                />
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                {!email && (
                  <span className="warning"> (Field is required)</span>
                )}
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
  loadStudent: formSubmission => dispatch(postStudentThunk(formSubmission)),
});

export default connect(
  null,
  mapDispatchToProps
)(AddStudentForm);
