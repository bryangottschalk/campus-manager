import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';
import { postCampus, removeCampus } from '../redux/campuses';
import AddCampusForm, { addCampusForm } from './AddCampusForm';

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
  loadCampus: formSubmission => dispatch(postCampus(formSubmission)),
  deleteCampus: campusId => dispatch(removeCampus(campusId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses);
