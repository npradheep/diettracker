import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateDiet extends Component {
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
        axios.get('http://localhost:5000/users/')
  .then(response => {
    if (response.data.length > 0) {
      this.setState({ 
        users: response.data.map(user => user.username),
        username: response.data[0].username
      });
    }
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
        axios.post('http://localhost:5000/diet/add', diet)
  .then(res => console.log(res.data))
        window.location = '/';
      }
    
  render() {
    return (
            <div>
              <h3>Create New Diet Log</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                  <label>Username: </label>
                  <select ref="userInput"
                      required
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
                  <label>Calories: </label>
                  <input 
                      type="text" 
                      className="form-control"
                      value={this.state.calories}
                      onChange={this.onChangeCalories}
                      />
                </div>
                <div className="form-group">
                  <label>Date: </label>
                  <div>
                    <DatePicker
                      selected={this.state.date}
                      onChange={this.onChangeDate}
                    />
                  </div>
                </div>
      
                <div className="form-group">
                  <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
              </form>
            </div>
          )
        }
      }