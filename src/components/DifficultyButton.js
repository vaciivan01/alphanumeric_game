import React from 'react';

class DifficultyButton extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <input type="radio" name="difficulty" defaultChecked/>
        <label>{this.props.name}</label>
      </div>
    );
  }
}

export default DifficultyButton;