import React from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../redux/campuses';

class AddCampusForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: '',
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
    this.props.loadCampus(this.state);
    this.setState({
      name: '',
      address: '',
      imageUrl: '',
      description: '',
    });
  }

  render() {
    const { name, address, imageUrl, description } = this.state;
    return (
      <div>
        <h2>Add Campus</h2>
        <div className="addCampusFormContainer">
          <form className="addCampusForm" onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label htmlFor="name">Campus:</label>
                <input
                  onChange={this.handleChange}
                  name="name"
                  type="text"
                  value={name}
                />
              </li>

              <li>
                <label htmlFor="address">Address:</label>
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
                <button type="submit">Submit</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadCampus: formSubmission => dispatch(postCampus(formSubmission)),
});

export default connect(
  null,
  mapDispatchToProps
)(AddCampusForm);
