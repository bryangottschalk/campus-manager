import axios from 'axios';

const SELECTED_CAMPUS = 'SELECTED_CAMPUS';
const UNREGISTER_STUDENT_FROM_SELECTED_CAMPUS =
  'UNREGISTER_STUDENT_FROM_SELECTED_CAMPUS';

export const selectedCampus = campus => ({
  type: SELECTED_CAMPUS,
  campus,
});

export const unregisterStudent = student => ({
  type: UNREGISTER_STUDENT_FROM_SELECTED_CAMPUS,
  student,
});

export const unregisterStudentFromSelectedCampusThunk = student => {
  return async dispatch => {
    try {
      await dispatch(unregisterStudent(student));
    } catch (err) {
      console.log('ERROR unregistering student', err);
    }
  };
};

export const fetchSelectedCampusThunk = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/campuses/${id}`);
      await dispatch(selectedCampus(data));
    } catch (err) {
      console.log('ERROR fetching selected campus', err);
    }
  };
};

const selectedCampusReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECTED_CAMPUS:
      return action.campus;
    case UNREGISTER_STUDENT_FROM_SELECTED_CAMPUS:
      return {
        ...state,
        students: state.students.filter(student => {
          return student.id !== action.student.id;
        }),
      };
    default:
      return state;
  }
};

export default selectedCampusReducer;
