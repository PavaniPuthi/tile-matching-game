import React, { Component } from 'react';
import Welcome from './components/Welcome';
import GameBoard from './components/GameBoard';
import SuccessScreen from './components/SuccessScreen';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      gameStarted: false,
      gameFinished: false,
      score: 0,
      timeTaken: 0,
    };
  }

  startGame = (userName) => {
    this.setState({ userName, gameStarted: true });
  }

  finishGame = (score, timeTaken) => {
    this.setState({ gameFinished: true, score, timeTaken });
  }

  render() {
    const { userName, gameStarted, gameFinished, score, timeTaken } = this.state;

    
    return (
      <div className="App">
        {!gameStarted ? (
          <Welcome startGame={this.startGame} />
        ) : (
          <GameBoard userName={userName} finishGame={this.finishGame} />
        )}
        {gameFinished && <SuccessScreen score={score} timeTaken={timeTaken} /> }
      </div>
    );
  }
}

export default App;
