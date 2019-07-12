import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';
import { Link } from 'react-router-dom';
import AddCampusForm from './AddCampusForm';
import axios from 'axios';

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
    console.log('props in super', props);
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: '',
      campuses: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     campuses: [...this.props.campuses],
  //   });
  // }

  handleChange(evt) {
    // console.log('in handle change');
    this.setState({
      [evt.target.name]: evt.target.value,
      campuses: this.props.campuses,
    });
  }
  async handleSubmit(evt) {
    console.log('in handle submit');
    evt.preventDefault();
    try {
      const res = await axios.post('/api/campuses', this.state);
      this.setState({
        name: '',
        address: '',
        imageUrl: '',
        description: '',
        campuses: [...this.props.campuses, res.data],
      });
      console.log('state after setting', this.state);
    } catch (err) {
      console.log(err);
    }
  }
  // componentShouldUpdate() {
  //   console.log(this.props, 'in componentshouldupdate');
  //   this.setState({
  //     campuses: this.props.campuses,
  //   });
  // }

  // addCampus(campus) {
  //   this.setState({
  //     campuses: [...this.state.campuses, campus],
  //   });
  // }

  render() {
    let { campuses } = this.props;
    if (this.state.campuses.length) {
      campuses = this.state.campuses;
    }
    const { name, address, imageUrl, description } = this.state;
    return (
      <div>
        <h1 className="heading">All Campuses</h1>
        <h2 className="heading">Add Campus</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Campus:</label>
          <input
            onChange={this.handleChange}
            name="name"
            type="text"
            value={name}
          />

          <label htmlFor="address">Address:</label>
          <input
            onChange={this.handleChange}
            name="address"
            type="text"
            value={address}
          />

          <label htmlFor="imageUrl">Image URL:</label>
          <input
            onChange={this.handleChange}
            name="imageUrl"
            type="text"
            value={imageUrl}
          />

          <label htmlFor="description">Description:</label>
          <input
            onChange={this.handleChange}
            name="description"
            type="text"
            value={description}
          />

          <button type="submit">Submit</button>
        </form>
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
