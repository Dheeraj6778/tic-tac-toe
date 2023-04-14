import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { states } from "./winningStates";
function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [gameover, setGameover] = useState(false);
  const [playerwon, setPlayerwon] = useState(null);
  const [count, setCount] = useState(0);
  let handleCell = (event) => {
    let temp = board;
    let id = parseInt(event.target.id);
    console.log(id);
    if (board[id - 1] !== "") {
      return;
    }
    if (gameover === true) return;
    if (player === "O") {
      setPlayer("X");
      temp[id - 1] = "O";
      setBoard(temp);
      setCount((cnt) => cnt + 1);
      console.log(board);
      event.target.innerHTML = "O";
    } else {
      setPlayer("O");
      temp[id - 1] = "X";
      setBoard(temp);
      setCount((cnt) => cnt + 1);
      event.target.innerHTML = "X";
    }
  };
  let handleReset = (event) => {
    setPlayer("O");
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setGameover(false);
    setPlayerwon(null);
    setCount(0);
    document.getElementById("status").innerText = "";
    let ids = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    ids.forEach((id) => (document.getElementById(id).innerHTML = ""));
  };
  //after every move check for winning state
  useEffect(() => {
    //now check for every winning state
    if (count === 9 && gameover === false) {
      document.getElementById("status").innerText = "It's a tie";
    }
    states.forEach((arr) => {
      let i1 = arr[0] - 1;
      let i2 = arr[1] - 1;
      let i3 = arr[2] - 1;
      if (
        board[i1] === board[i2] &&
        board[i2] === board[i3] &&
        board[i1] !== "" &&
        board[i2] !== "" &&
        board[i3] !== ""
      ) {
        setGameover(true);
        if (board[i1] === "X") {
          document.getElementById(
            "status"
          ).innerText = `player 1 won the match`;
        } else {
          document.getElementById(
            "status"
          ).innerText = `player 2 won the match`;
        }
      }
    });
  }, [player, board]);
  return (
    <div className="App">
      <h1 className="text-center">Tic Tac Toe</h1>
      <h3 className="text-center">
        {player === "X" ? "Player 1 turn" : "Player 2 turn"}
      </h3>
      <h2 className="text-center" id="status"></h2>

      <div className="board">
        <div className="cell" id="1" onClick={handleCell}></div>
        <div className="cell" id="2" onClick={handleCell}></div>
        <div className="cell" id="3" onClick={handleCell}></div>
        <div className="cell" id="4" onClick={handleCell}></div>
        <div className="cell" id="5" onClick={handleCell}></div>
        <div className="cell" id="6" onClick={handleCell}></div>
        <div className="cell" id="7" onClick={handleCell}></div>
        <div className="cell" id="8" onClick={handleCell}></div>
        <div className="cell" id="9" onClick={handleCell}></div>
      </div>
      <br />
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleReset}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default App;
