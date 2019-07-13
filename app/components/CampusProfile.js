import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { buildUnregisterStudentThunk } from '../redux/students';

class SingleCampus extends React.Component {
  getCampus(campuses) {
    const campusId = Number(this.props.match.params.id);
    return campuses.find(campus => {
      return campus.id === campusId;
    });
  }
  getStudentsAtCampus(students) {
    const campusId = Number(this.props.match.params.id);
    return students.filter(student => {
      return student.campusId === campusId;
    });
  }
  render() {
    const campus = this.getCampus(this.props.campuses);
    const studentsAtCampus = this.getStudentsAtCampus(this.props.students);
    console.log(this.props.campuses);
    console.log('campus', campus);
    return (
      <div>
        {this.props.campuses.length && campus && (
          <div>
            <h1>Campus Profile</h1>
            <img className="campusLogos" src={campus.imageUrl} />
            <h2>Campus Name: {campus.name}</h2>
            <h3>Address: {campus.address}</h3>
            <p>{campus.description}</p>
            <hr />
            <h2>Students on Campus:</h2>
          </div>
        )}
        <ul>
          {studentsAtCampus.length ? (
            studentsAtCampus.map(student => {
              return (
                <div key={student.id}>
                  <li>
                    <Link to={`/students/${student.id}`}>
                      {`${student.firstName} ${student.lastName}`}
                    </Link>
                  </li>

                  <button
                    className="delete"
                    onClick={() => this.props.unregisterFromCampus(student)}
                    type="button"
                  >
                    Remove From Campus
                  </button>
                </div>
              );
            })
          ) : (
            <p>There are no students enrolled at this campus.</p>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};

const mapDispatchToProps = dispatch => ({
  unregisterFromCampus: student =>
    dispatch(buildUnregisterStudentThunk(student)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampus);
