import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StudentProfile extends React.Component {
  getStudent(students) {
    const studentId = Number(this.props.match.params.id);
    return students.find(student => {
      return student.id === studentId;
    });
  }
  getCampus(studentCampusId) {
    const campuses = this.props.campuses;
    return campuses.find(campus => {
      return campus.id === studentCampusId;
    });
  }
  studentExists(requestedId, numStudents) {
    return requestedId <= numStudents;
  }

  render() {
    const student = this.getStudent(this.props.students);
    const numStudents = this.props.students.length;
    const idRequested = Number(this.props.match.params.id);
    return (
      <div>
        {this.props.students.length && student && (
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
                <Link to={`/campuses/${this.getCampus(student.campusId).id}`}>
                  {`${this.getCampus(student.campusId).name}`}
                </Link>
              ) : (
                ` ${student.firstName} is not enrolled in school right now.`
              )}
            </h3>
            <h3>Email: {student.email}</h3>
            <h3>GPA: {student.gpa}</h3>
          </div>
        )}
        {!this.studentExists(idRequested, numStudents) && (
          <p>
            This student doesn't exist! See the list of students in the
            navigation bar for links to existing ones.
          </p>
        )}
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

export default connect(mapStateToProps)(StudentProfile);
