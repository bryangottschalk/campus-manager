import React from 'react';
import { connect } from 'react-redux';
import Homepage from './Homepage';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleStudent from './StudentProfile';
import SingleCampus from './CampusProfile';
import UpdateCampusForm from './UpdateCampusForm';
import UpdateStudentForm from './UpdateStudentForm';
import NotFound from './NotFound';
import { fetchCampuses } from '../redux/campuses';
import { fetchStudents } from '../redux/students';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import AddCampusForm from './AddCampusForm';

class Root extends React.Component {
  componentDidMount() {
    //I understand this was a poor structural choice to load all campuses and students in the root component, but I didn't think I would have the time to refactor it. I would love to discuss approaches to do so!
    this.props.loadCampuses();
    this.props.loadStudents();
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavLink className="navLink" to="/" exact>
              Home
            </NavLink>
            <ul>
              <NavLink to="/campuses" className="navLink">
                Campuses
              </NavLink>
              <NavLink to="/students" className="navLink">
                Students
              </NavLink>
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
                <Route component={NotFound} />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};

const mapDispatchToProps = dispatch => ({
  loadCampuses: () => dispatch(fetchCampuses()),
  loadStudents: () => dispatch(fetchStudents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
