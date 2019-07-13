import React from 'react';
import { connect } from 'react-redux';
import Homepage from './Homepage';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleStudent from './StudentProfile';
import SingleCampus from './CampusProfile';
import UpdateCampusForm from './UpdateCampusForm';
import UpdateStudentForm from './UpdateStudentForm';
import { fetchCampuses } from '../redux/campuses';
import { fetchStudents, fetchSingleStudent } from '../redux/students';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from 'react-router-dom';
import AddCampusForm from './AddCampusForm';

class Root extends React.Component {
  componentDidMount() {
    //this should be refactored if i have time. this forces every user to load the entire database even if they only want to view a nested page such as /students or /campuses
    //ideally loadCampuses woul dbe called on /campuses and loadStudents on /students
    this.props.loadCampuses();
    this.props.loadStudents();
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavLink activeClassName="active" className="navLink" to="/">
              Home
            </NavLink>

            <ul>
              <NavLink to="/campuses" className="navLink">
                Campuses
              </NavLink>
              <NavLink to="/students" className="navLink">
                Students
              </NavLink>{' '}
            </ul>
          </nav>
          <main>
            <div>
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/campuses" component={AllCampuses} />
                <Route exact path="/students" component={AllStudents} />
                <Route exact path="/students/:id" component={SingleStudent} />
                <Route
                  exact
                  path="/students/:id/edit"
                  component={UpdateStudentForm}
                />
                <Route
                  exact
                  path="/campuses/addcampus"
                  component={AddCampusForm}
                />
                <Route
                  exact
                  path="/campuses/:id/edit"
                  component={UpdateCampusForm}
                />
                <Route exact path="/campuses/:id" component={SingleCampus} />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadCampuses: () => dispatch(fetchCampuses()),
  loadStudents: () => dispatch(fetchStudents()),
});

export default connect(
  null,
  mapDispatchToProps
)(Root);
