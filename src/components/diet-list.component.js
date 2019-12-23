import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Diet = props => (
    <tr>
      <td>{props.diet.username}</td>
      <td>{props.diet.food}</td>
      <td>{props.diet.calories}</td>
      <td>{props.diet.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.diet._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDiet(props.diet._id) }}>delete</a>
      </td>
    </tr>
  )

export default class DietList extends Component {
    constructor(props) {
        super(props);
        this.deleteDiet = this.deleteDiet.bind(this);
        this.state = {diet: []};
      }
      componentDidMount() {
        axios.get('http://localhost:5000/diet/')
         .then(response => {
           this.setState({ diet: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }
      deleteDiet(id) {
        axios.delete('http://localhost:5000/diet/'+id)
          .then(res => console.log(res.data));
        this.setState({
          diet: this.state.diet.filter(el => el._id !== id)
        })
      } 
      dietList() {
        return this.state.diet.map(currentdiet => {
          return <Diet diet={currentdiet} deleteDiet={this.deleteDiet} key={currentdiet._id}/>;
        })
      }
  render() {
    return (
        <div>
        <h3>Logged In</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Food</th>
              <th>Calories</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.dietList() }
          </tbody>
        </table>
      </div>
    )
  }
}