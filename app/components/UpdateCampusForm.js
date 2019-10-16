import React from 'react';
import { buildUpdateCampusThunk } from '../redux/campuses';
import { connect } from 'react-redux';

class UpdateCampusForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: '',
    };
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  componentDidMount() {
    const campus = this.getCampus(this.props.campuses);
    this.setState(campus);
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const campusId = Number(this.props.match.params.id);
    this.props.updateCampus(campusId, this.state);
    this.setState({
      name: '',
      address: '',
      imageUrl: '',
      description: '',
    });
  };

  getCampus(campuses) {
    const campusId = Number(this.props.match.params.id);
    return campuses.find(campus => {
      return campus.id === campusId;
    });
  }

  render() {
    const { name, address, imageUrl, description } = this.state;
    return (
      <div>
        <h1>Update Campus Form</h1>
        <form className="updateCampusForm" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Campus:</label>
          {!name && <span className="warning"> (Field is required)</span>}
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            value={name}
          />

          <label htmlFor="address">Address:</label>
          {!address && <span className="warning"> (Field is required)</span>}
          <input
            onChange={this.handleChange}
            name="address"
            type="text"
            value={address}
          />

          <label htmlFor="imageUrl">Image URL:</label>
          <input
            onChange={this.handleChange}
            name="imageUrl"
            type="text"
            value={imageUrl}
          />

          <label htmlFor="description">Description:</label>
          <input
            onChange={this.handleChange}
            name="description"
            type="text"
            value={description}
          />

          <button disabled={!name || !address} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatchToProps = dispatch => ({
  updateCampus: (campusId, formSubmission) =>
    dispatch(buildUpdateCampusThunk(campusId, formSubmission)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCampusForm);
