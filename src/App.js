import "./App.css";
import styled from "@emotion/styled";
import { useState } from "react";

const Cell = styled.div`
  width: 100%;
  height: 80px;
  border: 3px solid black;
  background-color: gainsboro;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  cursor: pointer;
  &:hover {
    border: 3px solid white;
  }
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 240px;
  /* background-color: #; */
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  margin: auto;
  border-radius: 10px;
`;

const GameButton = styled.button`
  width: 230px;
  margin: auto;
  height: 32px;
  margin-top: 26px;
`;

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = (gameState) => {
  let winner;
  for (let i = 0; i < winStates.length; i++) {
    const state = winStates[i];
    if (
      gameState[state[0]] === gameState[state[1]] &&
      gameState[state[1]] === gameState[state[2]] &&
      Boolean(gameState[state[0]])
    ) {
      winner = gameState[state[0]];
    }
  }
  return winner;
};

function App() {
  const [gameState, setGameState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [player, setPlayer] = useState("X");
  const winner = checkWin(gameState);

  const onCellClick = (index) => {
    if (gameState[index] != "" || Boolean(winner)) {
      return;
    }
    const newGameState = [...gameState];
    newGameState[index] = player;
    setGameState(newGameState);
    if (player === "O") {
      setPlayer("X");
    } else {
      setPlayer("O");
    }
  };

  const resetGame = () => {
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  };

  const isDrawn =
    !winner && gameState.filter((state) => Boolean(state)).length === 9;

  return (
    <div
      className="App"
      style={{ backgroundColor: "#404040", height: "100vh", padding: 16 }}
    >
      <h1>Tic Tac Toe</h1>
      {winner ? (
        <h2>Congrats! {winner} is win.</h2>
      ) : isDrawn ? (
        <h2> The game is draw.</h2>
      ) : (
        <h2>Player {player}, It's your turn.</h2>
      )}
      <BoardContainer>
        {gameState.map((cellNumber, index) => {
          return <Cell onClick={() => onCellClick(index)}>{cellNumber}</Cell>;
        })}
      </BoardContainer>
      <GameButton onClick={() => resetGame()}>Reset</GameButton>
    </div>
  );
}

export default App;
