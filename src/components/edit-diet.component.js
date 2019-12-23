import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditDiet extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFood = this.onChangeFood.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      food: '',
      calories: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/diet/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          food: response.data.food,
          calories: response.data.calories,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeFood(e) {
    this.setState({
      food: e.target.value
    });
  }

  onChangeCalories(e) {
    this.setState({
      calories: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const diet = {
      username: this.state.username,
      food: this.state.food,
      calories: this.state.calories,
      date: this.state.date,
    };

    console.log(diet);

    axios.post('http://localhost:5000/diet/update/'+this.props.match.params.id, diet)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Diet Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Food: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.food}
                onChange={this.onChangeFood}
                />
          </div>
          <div className="form-group">
            <label>Calories : </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.calories}
                onChange={this.onChangeCalories}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Diet Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}