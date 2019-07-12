import axios from 'axios';

// Action types
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
// const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';

// Action creators
export const setStudents = students => ({
  type: SET_STUDENTS,
  students,
});

//not currently using this action creator since all data is loaded in the root componenet. should refactor if time allows.
// export const getSingleStudent = studentId => ({
//   type: GET_SINGLE_STUDENT,
//   studentId,
// });

export const addStudent = student => ({
  type: ADD_STUDENT,
  student,
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

export const postStudent = formSubmission => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/students', formSubmission); // form submission becomes req.body
      console.log('data from postStudent post req', data);
      dispatch(addStudent(data));
    } catch (err) {
      console.log('ERROR adding student', err);
    }
  };
};
//not currently using this thunk anywhere since all data is loaded in the root component. would be useful to implement if time allows!
// export const fetchSingleStudent = () => {
//   return async dispatch => {
//     try {
//       const { data } = await axios.get(`/api/students/:${studentId}`);
//       console.log('single student data', data);
//       await dispatch(getSingleStudent(data));
//     } catch (err) {
//       console.log('ERROR fetching single student:', err);
//     }
//   };
// };

//Students subreducer
const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    case ADD_STUDENT:
      return [...state, action.student];
    default:
      return state;
  }
};

export default studentsReducer;
