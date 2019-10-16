import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { unregisterStudentThunk } from '../redux/students';
import {
  fetchSelectedCampusThunk,
  unregisterStudentFromSelectedCampusThunk,
} from '../redux/selectedCampus';

class SingleCampus extends React.Component {
  componentDidMount() {
    const campusId = Number(this.props.match.params.id);
    this.props.selectedCampus(campusId);
  }

  render() {
    const campus = this.props.currentCampus;

    return (
      <div>
        {campus ? (
          <div>
            <h1>Campus Profile</h1>
            <img className="campusImg" src={campus.imageUrl} />
            <h2>Campus Name: {campus.name}</h2>
            <h3>Address: {campus.address}</h3>
            <p>{campus.description}</p>
            <hr />
            <h2>Students on Campus:</h2>
            <ul>
              {campus.students ? (
                campus.students.map(student => {
                  return (
                    <div className="studentsOnCampusContainer" key={student.id}>
                      <li>
                        <img className="studentImages" src={student.imageUrl} />
                      </li>
                      <li className="studentProfileLinks">
                        <Link
                          className="studentProfileLinks"
                          to={`/students/${student.id}`}
                        >
                          {`${student.firstName} ${student.lastName}`}
                        </Link>
                      </li>

                      <button
                        className="unregister"
                        onClick={() => {
                          this.props.unregisterFromCampus(student);
                          this.props.unregiserFromSelectedCampus(student);
                        }}
                        type="button"
                      >
                        Remove From Campus
                      </button>
                    </div>
                  );
                })
              ) : (
                <div>No students are currently enrolled at this campus.</div>
              )}
            </ul>
          </div>
        ) : (
          <div>Campus doesn't exist</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCampus: state.selectedCampus,
  };
};

const mapDispatchToProps = dispatch => ({
  unregisterFromCampus: student => dispatch(unregisterStudentThunk(student)),
  unregiserFromSelectedCampus: student =>
    dispatch(unregisterStudentFromSelectedCampusThunk(student)),
  selectedCampus: id => dispatch(fetchSelectedCampusThunk(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampus);
