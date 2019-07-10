import React from 'react';
import { connect } from 'react-redux';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import { fetchCampuses } from '../redux/campuses';
import { fetchStudents } from '../redux/students';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// import AllStudents from './AllStudents';

class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
    //first make this a connected component
    //call this.props.loadCampuses() here from thunk
    this.props.loadCampuses();
    this.props.loadStudents();
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            Welcome!
            <Link to="/campuses">Campuses</Link>
            <Link to="/students">Students</Link>
          </nav>
          <main>
            <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
            <p>This seems like a nice place to get started with some Routes!</p>
            <div>
              <Switch>
                <Route exact path="/campuses" component={AllCampuses} />
                <Route exact path="/students" component={AllStudents} />
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
