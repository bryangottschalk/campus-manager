import axios from 'axios';

// Action types
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UNREGISTER_STUDENT = 'UNREGISTER_STUDENT';

// const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';

// Action creators
export const setStudents = students => ({
  type: SET_STUDENTS,
  students,
});

export const addStudent = student => ({
  type: ADD_STUDENT,
  student,
});

export const deleteStudent = studentId => ({
  type: DELETE_STUDENT,
  studentId,
});

export const updateStudent = updatedStudent => ({
  type: UPDATE_STUDENT,
  updatedStudent,
});

export const unregisterStudent = student => ({
  type: UNREGISTER_STUDENT,
  student,
});
//not currently using this action creator since all data is loaded in the root componenet. should refactor if time allows.
// export const getSingleStudent = studentId => ({
//   type: GET_SINGLE_STUDENT,
//   studentId,
// });

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

export const removeStudent = studentId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/students/${studentId}`);
      dispatch(deleteStudent(studentId));
    } catch (err) {
      console.log('ERROR deleting student', err);
    }
  };
};

export const buildUpdateStudentThunk = (studentId, formSubmission) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/api/students/${studentId}/edit`,
        formSubmission
      );
      console.log('data from the thunk', data);
      dispatch(updateStudent(data));
    } catch (err) {
      console.log('ERROR updating student', err);
    }
  };
};

export const buildUnregisterStudentThunk = student => {
  console.log('TCL: student', student);
  return async dispatch => {
    try {
      console.log('in the thunk!');
      const { data } = await axios.put(`/api/students/${student.id}`, student);
      console.log('TCL: buildUnregisterStudentThunk -> data', data);
      dispatch(unregisterStudent(student));
    } catch (err) {
      console.log('ERROR unregistering student', err);
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
    case UPDATE_STUDENT:
      return state.map(student => {
        if (student.id === action.updatedStudent.id) {
          //update the edited student
          return action.updatedStudent;
        } else {
          return student;
        }
      });
    case UNREGISTER_STUDENT:
      return state.map(student => {
        if (student.campusId === action.student.id) {
          //update the edited student
          return action.student;
        } else {
          return student;
        }
      });
    case DELETE_STUDENT:
      return [
        ...state.filter(student => {
          return student.id !== action.studentId;
        }),
      ];
    default:
      return state;
  }
};

export default studentsReducer;
