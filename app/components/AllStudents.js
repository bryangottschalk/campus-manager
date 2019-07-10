import React from 'react';
import { connect } from 'react-redux';

export const AllStudents = props => {
  // console.log('STUDENT PROPS', props); //logs PROPerly
  const { students } = props;
  return (
    <div>
      <ul>
        <li>
          <h1>
            {students[0].firstName} {students[0].lastName}
          </h1>
        </li>
        <li>
          <h1>
            {students[1].firstName} {students[1].lastName}
          </h1>
        </li>
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
