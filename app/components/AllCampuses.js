import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';
import { removeCampus } from '../redux/campuses';
import AddCampusForm from './AddCampusForm';

export class AllCampuses extends React.Component {
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
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteCampus: campusId => dispatch(removeCampus(campusId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses);
