import { combineReducers } from 'redux';
import campusesReducer from './campuses';
import studentsReducer from './students';

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...
const appReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
});

export default appReducer;
