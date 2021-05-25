import React, { Component } from 'react';

class ToyForm extends Component {

  //add state so form can be controlled
  state = {
    name: '',
    image: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createNewToy(this.state);
    this.setState({name: '', image: ''})
  }

  handleStateChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" value={this.state.name} onChange={this.handleStateChange}
          placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" value={this.state.image} onChange={this.handleStateChange}
          placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
