import React from 'react';
import { connect } from 'react-redux';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleStudent from './SingleStudent';
import { fetchCampuses } from '../redux/campuses';
import { fetchStudents, fetchSingleStudent } from '../redux/students';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// import AllStudents from './AllStudents';

class Root extends React.Component {
  componentDidMount() {
    this.props.loadCampuses();
    this.props.loadStudents();
  }
  render() {
    console.log('root props', this.props);
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
              <Route exact path="/campuses" component={AllCampuses} />
              <Route exact path="/students" component={AllStudents} />
              <Route path="/students/:id" component={SingleStudent} />
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
  loadSingleStudent: () => dispatch(fetchSingleStudent()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
