import React from 'react';

class Letter extends React.Component {

  render() {
    return (
      <div className="col-md-3">
        <h2 style={{color: this.props.color}}>{this.props.name}</h2>
      </div>
    );
  }
}

export default Letter;