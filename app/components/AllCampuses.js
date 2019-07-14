import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';
import { postCampus, removeCampus } from '../redux/campuses';

export class AllCampuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeCampus = this.removeCampus.bind(this);
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

  removeCampus(campusId) {
    this.props.deleteCampus(campusId);
  }

  render() {
    const { campuses } = this.props;

    const { name, address, imageUrl, description } = this.state;
    return (
      <div>
        <h1>All Campuses</h1>
        <hr />
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
        <div>
          <div className="campusesContainer">
            {!campuses.length ? (
              <p>There are no campuses registered in the database. :(</p>
            ) : (
              campuses.map(campus => (
                <Campus
                  campus={campus}
                  key={campus.id}
                  removeCampus={this.removeCampus}
                />
              ))
            )}
          </div>
        </div>
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
  loadCampus: formSubmission => dispatch(postCampus(formSubmission)),
  deleteCampus: campusId => dispatch(removeCampus(campusId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses);
