import React, { Component } from 'react';
import { FaChessKing, FaChessQueen, FaChessRook, FaChessKnight, FaChessBishop, FaChessPawn } from 'react-icons/fa';


const tileImages = [
  <FaChessKing size={50} />,
  <FaChessQueen size={50} />,
  <FaChessRook size={50} />,
  <FaChessKnight size={50} />,
  <FaChessBishop size={50} />,
  <FaChessPawn size={50} />
];

const tiles = [
  { id: 1, image: tileImages[0], matched: false, flipped: false },
  { id: 2, image: tileImages[0], matched: false, flipped: false },
  { id: 3, image: tileImages[1], matched: false, flipped: false },
  { id: 4, image: tileImages[1], matched: false, flipped: false },
  { id: 5, image: tileImages[2], matched: false, flipped: false },
  { id: 6, image: tileImages[2], matched: false, flipped: false },
  { id: 7, image: tileImages[3], matched: false, flipped: false },
  { id: 8, image: tileImages[3], matched: false, flipped: false },
  { id: 9, image: tileImages[4], matched: false, flipped: false },
  { id: 10, image: tileImages[4], matched: false, flipped: false },
  { id: 11, image: tileImages[5], matched: false, flipped: false },
  { id: 12, image: tileImages[5], matched: false, flipped: false }
];

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: this.shuffleTiles([...tiles]),
      score: 0,
      firstTile: null,
      secondTile: null,
      time: 0,
      timer: null
    };
  }

  componentDidMount() {
    this.startTime = Date.now(); // Start time for calculating time taken
    this.startTimer(); // Start the timer
  }

  componentWillUnmount() {
    clearInterval(this.state.timer); // Stop the timer
  }

  startTimer = () => {
    const timer = setInterval(() => {
      this.setState(prevState => ({ time: prevState.time + 1 }));
    }, 1000);
    this.setState({ timer });
  }

  shuffleTiles = (tiles) => {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    return tiles;
  }

  handleTileClick = (index) => {
    const { firstTile, secondTile, tiles, score } = this.state;
    if (firstTile && secondTile) return;

    const newTiles = [...tiles];
    if (!firstTile) {
      newTiles[index].flipped = true;
      this.setState({ firstTile: newTiles[index] });
    } else if (!secondTile && firstTile.id !== newTiles[index].id) {
      newTiles[index].flipped = true;
      this.setState({ secondTile: newTiles[index] });

      if (firstTile.image === newTiles[index].image) {
        this.setState({
          tiles: newTiles.map(tile => (tile.id === firstTile.id || tile.id === newTiles[index].id ? { ...tile, matched: true } : tile)),
          score: score + 1,
          firstTile: null,
          secondTile: null,
        });
      } else {
        setTimeout(() => {
          this.setState({
            tiles: newTiles.map(tile => (tile.id === firstTile.id || tile.id === newTiles[index].id ? { ...tile, flipped: false } : tile)),
            score: score - 1,
            firstTile: null,
            secondTile: null,
          });
        }, 1000);
      }
    }

    this.setState({ tiles: newTiles });
  }

  render() {
    const { userName } = this.props;
    const { tiles, score, time } = this.state;

    // Check if all tiles are matched to finish the game
    if (tiles.every(tile => tile.matched)) {
      clearInterval(this.state.timer); // Stop the timer
      const timeTaken = Math.round((Date.now() - this.startTime) / 1000);
      this.props.finishGame(score, timeTaken);
    }

    return (
      <div className="game-board">
        <h2>Chess Tiles Matching Game</h2>
        <div>Welcome, {userName}</div>
        <div>Score: {score}</div>
        <div>Time: {time} seconds</div>
        <div className="tiles">
          {tiles.map((tile, index) => (
            <div key={tile.id} className={`tile ${tile.flipped ? 'flipped' : ''}`} onClick={() => this.handleTileClick(index)}>
              {tile.flipped && tile.image}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default GameBoard;
