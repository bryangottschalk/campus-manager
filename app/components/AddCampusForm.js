import React from 'react';
import axios from 'axios';

export default class AddCampusForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    console.log('in handle change');
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  async handleSubmit(evt) {
    console.log('in handle submit');
    evt.preventDefault();
    try {
      const res = await axios.post('/api/campuses', this.state);
      this.setState(res.data);
      console.log('state after setting', this.state);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log('HERE', this.props);
    const { name, address, imageUrl, description } = this.state;
    return (
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
    );
  }
}
