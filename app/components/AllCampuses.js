import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';
import { Link } from 'react-router-dom';
import AddCampusForm from './AddCampusForm';

// export const AllCampuses = props => {
// const { campuses } = props;
//   return (
//     <div>
//       <h1 className="allCampuses">All Campuses</h1>
//       <Link to="/campuses/addcampus" component={AddCampusForm}>
//         <h2 className="allCampuses">Add Campus</h2>
//       </Link>
//       <ul>
//         {!campuses.length ? (
//           <p>There are no campuses registered in the database. :(</p>
//         ) : (
//           campuses.map(campus => <Campus campus={campus} key={campus.id} />)
//         )}
//       </ul>
//     </div>
//   );
// };

//converted this component to a stateful component in attempts to capture form data here and trigger a re-render
export class AllCampuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campuses: [],
    };
  }
  componentShouldUpdate() {
    console.log(this.props, 'in componentshouldupdate');
    this.setState({
      campuses: this.props.campuses,
    });
  }

  addCampus(campus) {
    this.setState({
      campuses: [...this.state.campuses, campus],
    });
  }

  render() {
    console.log('campuses state', this.state);
    console.log('campuses props', this.props);
    const { campuses } = this.props;

    return (
      <div>
        <h1 className="heading">All Campuses</h1>
        <Link to="/campuses/addcampus" component={AddCampusForm}>
          <h2 className="heading">Add Campus</h2>
        </Link>
        <div className="campusesContainer">
          <ul>
            {!campuses.length ? (
              <p>There are no campuses registered in the database. :(</p>
            ) : (
              campuses.map(campus => <Campus campus={campus} key={campus.id} />)
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
  };
};

export default connect(mapStateToProps)(AllCampuses);
