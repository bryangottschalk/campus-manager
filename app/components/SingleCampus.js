import React from 'react';
import { connect } from 'react-redux';

class SingleCampus extends React.Component {
  getCampus(campuses) {
    const campusId = Number(this.props.match.params.id);
    return campuses.find(campus => {
      return campus.id === campusId;
    });
  }
  render() {
    const campus = this.getCampus(this.props.campuses);
    return (
      <div>
        {this.props.campuses.length ? (
          <div>
            <h1>Campus Profile</h1>
            <img className={'campusLogos'} src={campus.imageUrl} />
            <h2>Campus Name: {campus.name}</h2>
            <h3>Address: {campus.address}</h3>
            <h3>{campus.description}</h3>
          </div>
        ) : (
          ''
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

export default connect(mapStateToProps)(SingleCampus);
