import React, { Component } from 'react';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  handleChange = (event) => {
    this.setState({ userName: event.target.value });
  }

  handleSubmit = () => {
    const { userName } = this.state;
    if (userName) {
      localStorage.setItem('userName', userName);
      this.props.startGame(userName);
    }
  }

  render() {
    return (
      <div className="welcome">
        <h2>React Chess Tiles</h2>
        <div>
          <label>Enter Your Name</label>
          <input type="text" value={this.state.userName} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Play</button>
        </div>
      </div>
    );
  }
}

export default Welcome;
