import axios from 'axios';

const SELECTED_STUDENT = 'SELECTED_STUDENT';

export const selectedStudent = student => ({
  type: SELECTED_STUDENT,
  student,
});

export const fetchSelectedStudentThunk = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/students/${id}`);
      await dispatch(selectedStudent(data));
    } catch (err) {
      console.log('ERROR fetching selected student', err);
    }
  };
};

const selectedStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECTED_STUDENT:
      return action.student;

    default:
      return state;
  }
};

export default selectedStudentReducer;
