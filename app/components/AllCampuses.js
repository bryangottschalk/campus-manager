import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';
import { postCampus } from '../redux/campuses';

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
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.loadCampus(this.state);
  }

  render() {
    const { campuses } = this.props;

    const { name, address, imageUrl, description } = this.state;
    return (
      <div>
        <h1 className="heading">All Campuses</h1>
        <h2 className="heading">Add Campus</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Campus:</label>
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            value={name}
          />

          <label htmlFor="address">Address:</label>
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

          <button type="submit">Submit</button>
        </form>
        <div className="campusesContainer">
          <ul>
            {!campuses.length ? (
              <p>There are no campuses registered in the database. :(</p>
            ) : (
              campuses.map(campus => <Campus campus={campus} key={campus.id} />)
            )}
          </ul>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses);
