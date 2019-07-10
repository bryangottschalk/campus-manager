import React from 'react';
import { connect } from 'react-redux';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';

class Root extends React.Component {
  componentDidMount() {
    console.log('PROPS', this.props);
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
  }
  render() {
    console.log('are you running????');
    return (
      <div>
        <nav>Welcome!</nav>
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
          <div>
            <AllCampuses />
          </div>
        </main>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     students: state.students,
//   };
// };
// export default connect(null, mapDispatchToProps)(AllStudents); //now a connected component

export default Root;
