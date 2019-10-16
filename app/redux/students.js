import axios from 'axios';

const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UNREGISTER_STUDENT = 'UNREGISTER_STUDENT';

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

export const fetchStudentsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/students');
      await dispatch(setStudents(data));
    } catch (err) {
      console.log('ERROR fetching students:', err);
    }
  };
};

export const postStudentThunk = formSubmission => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/students', formSubmission);
      dispatch(addStudent(data));
    } catch (err) {
      console.log('ERROR adding student', err);
    }
  };
};

export const removeStudentThunk = studentId => {
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
      dispatch(updateStudent(data));
    } catch (err) {
      console.log('ERROR updating student', err);
    }
  };
};

export const buildUnregisterStudentThunk = student => {
  return async dispatch => {
    try {
      await axios.put(`/api/students/${student.id}`, student);
      dispatch(unregisterStudent(student));
    } catch (err) {
      console.log('ERROR unregistering student', err);
    }
  };
};

const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    case ADD_STUDENT:
      return [...state, action.student];

    case UPDATE_STUDENT:
      return state.map(student => {
        if (student.id === action.updatedStudent.id) {
          return action.updatedStudent;
        } else {
          return student;
        }
      });
    case UNREGISTER_STUDENT:
      return state
        .filter(student => {
          return student.id !== action.student.id;
        })
        .concat({ ...action.student, campusId: null });
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
