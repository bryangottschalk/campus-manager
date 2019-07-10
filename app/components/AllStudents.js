import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';

export const AllStudents = props => {
  const { students } = props;
  return (
    <div>
      <h1>All Students</h1>
      <ul>
        {students.map(student => (
          <Student student={student} key={student.id} />
        ))}
      </ul>
    </div>
  );
};

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllStudents)
// export default AllStudents;

const mapStateToProps = state => {
  return {
    students: state.students,
  };
};
export default connect(mapStateToProps)(AllStudents); //now a connected component
