import React from 'react';
import Homepage from './Homepage';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleStudent from './StudentProfile';
import SingleCampus from './CampusProfile';
import UpdateCampusForm from './UpdateCampusForm';
import UpdateStudentForm from './UpdateStudentForm';
import NotFound from './NotFound';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import AddCampusForm from './AddCampusForm';

class Root extends React.Component {
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

export default Root;
