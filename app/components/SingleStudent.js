import React from 'react';
import { connect } from 'react-redux';

class SingleStudent extends React.Component {
  getStudent(students) {
    console.log(this.props);
    const studentId = Number(this.props.match.params.id);
    return students.find(student => {
      return student.id === studentId;
    });
  }
  getCampus(campuses) {
    const campusId = Number(this.props.match.params.id);
    return campuses.find(campus => {
      return campus.id === campusId;
    });
  }
  render() {
    const student = this.getStudent(this.props.students);
    const campus = this.getCampus(this.props.campuses);
    console.log('TCL: SingleStudent -> render -> campus', campus);
    console.log('TCL: SingleStudent -> render -> student ', student);
    return (
      <div>
        {this.props.students.length ? (
          <div>
            <h1>Student Profile</h1>
            <img src={student.imageUrl} />
            <h2>
              Hello! My name is:
              {` ${student.firstName} ${student.lastName}.`}
            </h2>
            <h2>
              Campus:{' '}
              {student.campusId
                ? campus.name
                : `${student.firstName} is not enrolled in school right now.`}
            </h2>
            <h3>Email: {student.email}</h3>
            <h3>GPA: {student.gpa}</h3>
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
    students: state.students,
  };
};

export default connect(mapStateToProps)(SingleStudent);
