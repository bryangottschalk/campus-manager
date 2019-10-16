import { combineReducers } from 'redux';
import campusesReducer from './campuses';
import studentsReducer from './students';
import selectedStudentReducer from './selectedStudent';

const appReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  selectedStudent: selectedStudentReducer,
});

export default appReducer;
