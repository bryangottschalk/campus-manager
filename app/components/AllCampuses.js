import React from 'react';
import { connect } from 'react-redux';
import { fetchCampuses } from '../redux/campuses';
import { SingleCampus } from './SingleCampus';
// import { singleCampus } from './singleCampus';

export const AllCampuses = props => {
  console.log('CAMPUS PROPS', props); // logs PROPerly
  const { campuses } = props;

  /*
  CAMPUS PROPS { campuses:
   [ { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
     { id: 2,
       name: 'Jupiter Jumpstart',
       imageUrl: '/images/jupiter.jpeg' } ] }

      //attempt to render a singleCampus component for each element in the array
  */
  console.log('in campuses');
  return (
    <div>
      <ul>
        {campuses.map(campus => (
          <li key={campus.id}>
            <SingleCampus campus={campus} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllCampuses)
// export default AllCampuses;

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
  };
};

const mapDispatchToProps = dispatch => ({
  getCampuses: data => dispatch(fetchCampuses(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses); //now a connected component
