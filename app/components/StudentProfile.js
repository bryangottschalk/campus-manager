import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSelectedStudentThunk } from '../redux/selectedStudent';

class StudentProfile extends React.Component {
  componentDidMount() {
    const studentId = Number(this.props.match.params.id);
    this.props.selectedStudent(studentId);
  }

  render() {
    const student = this.props.currentStudent;
    return (
      <div>
        {student.firstName ? (
          <div>
            <h1>Student Profile</h1>
            <img className="studentProfilePic" src={student.imageUrl} />
            <h2>
              Hello! My name is:
              {` ${student.firstName} ${student.lastName}.`}
            </h2>
            <h3>
              Campus:{' '}
              {student.campusId ? (
                <Link to={`/campuses/${student.campusId}`}>
                  {`${student.campus.name}`}
                </Link>
              ) : (
                ` ${student.firstName} is not enrolled in school right now.`
              )}
            </h3>
            <h3>Email: {student.email}</h3>
            <h3>GPA: {student.gpa}</h3>
          </div>
        ) : (
          <div>Student doesn't exist</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    students: state.students,
    currentStudent: state.selectedStudent,
  };
};
const mapDispatchToProps = dispatch => ({
  selectedStudent: id => dispatch(fetchSelectedStudentThunk(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentProfile);
