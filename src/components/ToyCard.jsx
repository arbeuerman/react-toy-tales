import React, { Component } from 'react';

class ToyCard extends Component {

  render() {

    const {name, image, likes} = this.props.toy;
    const {deleteToy, toy, addLikes} = this.props;

    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={() => addLikes(toy)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => deleteToy(toy)} >Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
