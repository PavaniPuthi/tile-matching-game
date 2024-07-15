import React from 'react';

const SuccessScreen = ({ score, timeTaken }) => {
  return (
    <div className="success-screen">
      <h1>Congratulations!</h1>
      <p>Your score: {score}</p>
      <p>Time taken: {timeTaken} seconds</p>
    </div>
  );
};

export default SuccessScreen;

