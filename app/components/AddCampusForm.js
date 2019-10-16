import React from 'react';
import { connect } from 'react-redux';
import { postCampusThunk } from '../redux/campuses';
import faker from 'faker';

const initialState = {
  name: '',
  address: '',
  imageUrl: '',
  description: '',
};

class AddCampusForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.loadCampus(this.state);
    this.setState(initialState);
  };

  handleClick = () => {
    this.setState({
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      imageUrl: faker.random.image(),
      description: faker.lorem.sentence(),
    });
  };

  render() {
    const { name, address, imageUrl, description } = this.state;
    return (
      <div>
        <h2>Add Campus Form</h2>
        <button
          onClick={this.handleClick}
          className="generateRandomData"
          type="button"
        >
          Generate Random Data!
        </button>
        <div className="addCampusFormContainer">
          <form className="addCampusForm" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label htmlFor="name">Campus:</label>
                {!name && <span className="warning"> (Field is required)</span>}
                <input
                  onChange={this.handleChange}
                  name="name"
                  type="text"
                  value={name}
                />
              </li>

              <li>
                <label htmlFor="address">Address:</label>
                {!address && (
                  <span className="warning"> (Field is required)</span>
                )}
                <input
                  onChange={this.handleChange}
                  name="address"
                  type="text"
                  value={address}
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
              <label htmlFor="description">Description:</label>
              <input
                onChange={this.handleChange}
                name="description"
                type="text"
                value={description}
              />
              <li>
                <button disabled={!name || !address} type="submit">
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
  loadCampus: formSubmission => dispatch(postCampusThunk(formSubmission)),
});

export default connect(
  null,
  mapDispatchToProps
)(AddCampusForm);
