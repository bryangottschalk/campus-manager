// campuses action creators, sub-reducer
import axios from 'axios';

// Action types
const SET_CAMPUSES = 'SET_CAMPUSES';

// Action creators
export const setCampuses = campuses => ({
  type: SET_CAMPUSES,
  campuses,
});

//Thunk creators
export const fetchCampuses = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/campuses');
      console.log('CAMPUS DATA', data);
      await dispatch(setCampuses(data));
    } catch (err) {
      console.log('ERROR fetching campuses:', err);
    }
  };
};

const campusesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    default:
      return state;
  }
};

export default campusesReducer;
