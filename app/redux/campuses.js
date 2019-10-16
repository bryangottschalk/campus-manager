import axios from 'axios';

const SET_CAMPUSES = 'SET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

export const setCampuses = campuses => ({
  type: SET_CAMPUSES,
  campuses,
});

export const addCampus = campus => ({
  type: ADD_CAMPUS,
  campus,
});

export const deleteCampus = campusId => ({
  type: DELETE_CAMPUS,
  campusId,
});

export const updateCampus = updatedCampus => ({
  type: UPDATE_CAMPUS,
  updatedCampus,
});

export const fetchCampusesThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/campuses');
      dispatch(setCampuses(data));
    } catch (err) {
      console.log('ERROR fetching campuses:', err);
    }
  };
};

export const postCampus = formSubmission => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/campuses', formSubmission);
      dispatch(addCampus(data));
    } catch (err) {
      console.log('ERROR adding campus', err);
    }
  };
};

export const removeCampus = campusId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/campuses/${campusId}`);
      dispatch(deleteCampus(campusId));
    } catch (err) {
      console.log('ERROR deleting campus', err);
    }
  };
};

export const buildUpdateCampusThunk = (campusId, formSubmission) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/api/campuses/${campusId}/edit`,
        formSubmission
      );
      dispatch(updateCampus(data));
    } catch (err) {
      console.log('ERROR updating campus', err);
    }
  };
};

const campusesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    case ADD_CAMPUS:
      return [...state, action.campus];
    case UPDATE_CAMPUS:
      return state.map(campus => {
        if (campus.id === action.updatedCampus.id) {
          return action.updatedCampus;
        } else {
          return campus;
        }
      });
    case DELETE_CAMPUS:
      return [
        ...state.filter(campus => {
          return campus.id !== action.campusId;
        }),
      ];
    default:
      return state;
  }
};

export default campusesReducer;
