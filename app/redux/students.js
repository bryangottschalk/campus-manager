import axios from 'axios';

// Action types
const SET_STUDENTS = 'SET_STUDENTS';

// Action creators
export const setStudents = students => ({
  type: SET_STUDENTS,
  students,
});

//Thunk creators
export const fetchStudents = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/students');
      console.log('STUDENT DATA', data);
      await dispatch(setStudents(data));
    } catch (err) {
      console.log('ERROR fetching students:', err);
    }
  };
};

//Students subreducer
const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    default:
      return state;
  }
};

export default studentsReducer;
