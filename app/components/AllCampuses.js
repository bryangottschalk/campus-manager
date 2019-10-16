import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';
import { fetchCampusesThunk, removeCampusThunk } from '../redux/campuses';

import AddCampusForm from './AddCampusForm';

export class AllCampuses extends React.Component {
  componentDidMount() {
    this.props.loadCampuses();
  }
  removeCampus = campusId => {
    this.props.deleteCampus(campusId);
  };

  render() {
    const { campuses } = this.props;

    return (
      <div>
        <h1>All Campuses</h1>
        <hr />
        <AddCampusForm />
        {campuses && (
          <div className="campusesContainer">
            {!campuses.length ? (
              <p>Loading campuses...</p>
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
        )}
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
  loadCampuses: () => dispatch(fetchCampusesThunk()),
  deleteCampus: campusId => dispatch(removeCampusThunk(campusId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses);
