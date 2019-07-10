import React from 'react';
import { connect } from 'react-redux';
import AllCampuses from './AllCampuses';
import { fetchCampuses } from '../redux/campuses';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import AllStudents from './AllStudents';

class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
    //first make this a connected component
    //call this.props.loadCampuses() here from thunk
    this.props.loadCampuses();
  }
  render() {
    console.log('PROPS in root render', this.props);
    return (
      <div>
        <nav>Welcome!</nav>
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
          <div>
            <Router>
              <Route path="/campuses" component={AllCampuses} />
            </Router>
          </div>
        </main>
      </div>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
