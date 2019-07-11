import axios from 'axios';

// Action types
const SET_STUDENTS = 'SET_STUDENTS';
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';

// Action creators
export const setStudents = students => ({
  type: SET_STUDENTS,
  students,
});

export const getSingleStudent = studentId => ({
  type: GET_SINGLE_STUDENT,
  studentId,
});

//Thunk creators
export const fetchStudents = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/students');
      await dispatch(setStudents(data));
    } catch (err) {
      console.log('ERROR fetching students:', err);
    }
  };
};

export const fetchSingleStudent = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/students/:${studentId}`);
      console.log('single student data', data);
      await dispatch(getSingleStudent(data));
    } catch (err) {
      console.log('ERROR fetching single student:', err);
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
