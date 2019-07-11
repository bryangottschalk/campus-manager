import React from 'react';
import { connect } from 'react-redux';

class SingleStudent extends React.Component {
  getStudent(students) {
    console.log('getStudent props', this.props);
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
  render() {
    const student = this.getStudent(this.props.students);

    return (
      <div>
        {this.props.students.length && (
          <div>
            <h1>Student Profile</h1>
            <img src={student.imageUrl} />
            <h2>
              Hello! My name is:
              {` ${student.firstName} ${student.lastName}.`}
            </h2>
            <h3>
              Campus:
              {student.campusId
                ? ` ${this.getCampus(student.campusId).name}`
                : ` ${student.firstName} is not enrolled in school right now.`}
            </h3>
            <h3>Email: {student.email}</h3>
            <h3>GPA: {student.gpa}</h3>
          </div>
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

export default connect(mapStateToProps)(SingleStudent);
