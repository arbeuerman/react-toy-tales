import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const toysUrl = 'http://localhost:3000/toys';
const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
}

class App extends React.Component{

  state = {
    display: true,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  //get all toys and render right after initial render
  //also set state for toys so toys can be passed around
  componentDidMount() {
    fetch(toysUrl)
    .then(res => res.json())
    .then(toys => this.setState({toys}))
  }

  createNewToy = (newToy) => {
    newToy.likes = 0;
    fetch(toysUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(toy => this.setState({toys: [...this.state.toys, toy]}))
    .catch(err => console.log(err));
  }

  deleteToy = (toyToDelete) => {
    fetch(`${toysUrl}/${toyToDelete.id}`, {
      method: 'DELETE',
      headers,
    })
    .then(this.setState({toys: this.state.toys.filter(toy => toy !== toyToDelete)}))
    .catch(err => console.log(err));
  }

  editToyLikes = (toyToEdit) => {
    fetch(`${toysUrl}/${toyToEdit.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({likes: toyToEdit.likes + 1})
    })
    .then(res => res.json())
    .then(editedToy => this.setState({toys: this.state.toys.map(toy => toy.id ===toyToEdit.id ? editedToy : toy)}))
    .catch(err => console.log(err));
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createNewToy={this.createNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} addLikes={this.editToyLikes}/>
      </>
    );
  }

}

export default App;
