import React from 'react';
import { connect } from 'react-redux';
import { fetchCampuses } from '../redux/campuses';
// import { singleCampus } from './singleCampus';

export const AllCampuses = props => {
  // props.campuses = props.loadCampuses();
  // console.log('props.campuses', props.campuses);
  const { campuses } = props;
  // console.log('campuses HERE', campuses);
  /*
  CAMPUS PROPS { campuses:
   [ { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
     { id: 2,
       name: 'Jupiter Jumpstart',
       imageUrl: '/images/jupiter.jpeg' } ] }

      //attempt to render a singleCampus component for each element in the array
  */
  return (
    // <div>
    //   <ul>
    //     {campuses.map(campus => (
    //       <SingleCampus campus={campus} key={campus.id} />
    //     ))}
    //   </ul>
    // </div>
    <div>
      <ul>
        <li>
          <h1>{campuses[0].name}</h1>
          <img src={campuses[0].imageUrl} />
        </li>
        <li>
          <h1>{campuses[1].name}</h1>
          <img src={campuses[1].imageUrl} />
        </li>
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

// const mapDispatchToProps = dispatch => ({
//   loadCampuses: data => dispatch(fetchCampuses(data)),
// });

export default connect(mapStateToProps)(AllCampuses); //now a connected component
