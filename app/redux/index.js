import { combineReducers } from 'redux';
import campusesReducer from './campuses';
import studentsReducer from './students';
import selectedStudentReducer from './selectedStudent';
import selectedCampusReducer from './selectedCampus';

const appReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  selectedStudent: selectedStudentReducer,
  selectedCampus: selectedCampusReducer,
});

export default appReducer;
