// campuses action creators, sub-reducer
import axios from 'axios';

// Action types
const SET_CAMPUSES = 'SET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';

// Action creators
export const setCampuses = campuses => ({
  type: SET_CAMPUSES,
  campuses,
});

export const addCampus = campus => ({
  type: ADD_CAMPUS,
  campus,
});

//Thunk creators
export const fetchCampuses = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/campuses');
      dispatch(setCampuses(data));
    } catch (err) {
      console.log('ERROR fetching campuses:', err);
    }
  };
};

export const postCampus = () => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/campuses');
      console.log('data from post req', data);
      dispatch(addCampus(data));
    } catch (err) {
      console.log('ERROR adding campus', err);
    }
  };
};

//Campuser subreducer
const campusesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    default:
      return state;
  }
};

export default campusesReducer;
