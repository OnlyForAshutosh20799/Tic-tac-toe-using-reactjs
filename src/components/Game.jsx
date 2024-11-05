import React, { useState } from "react";

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turnO, setTurnO] = useState(true);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  const handleBoxClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = turnO ? "O" : "X";
    setBoard(newBoard);
    setTurnO(!turnO);

    if (checkWinner(newBoard)) {
      setWinner(turnO ? "O" : "X");
    } else if (!newBoard.includes(null)) {
      setDraw(true);
    }
  };

  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurnO(true);
    setWinner(null);
    setDraw(false);
  };

  return (
    <div className="flex flex-col items-center bg-[#548687] min-h-screen text-center">
      <h1 className="text-4xl font-bold text-white my-6">Tic Tac Toe</h1>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="grid grid-cols-3 gap-3 ">
          {board.map((value, index) => (
          <button
          key={index}
          className="box w-[13vmin] h-[13vmin] flex justify-center items-center text-4xl text-[#b0413e] bg-[#ffffff] rounded-lg select-none"
          onClick={() => handleBoxClick(index)}
          disabled={value || winner}
        >
          {value}
        </button>
        
          ))}
        </div>
      </div>
      {(winner || draw) && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          <p className="text-4xl text-[#ffffc7]">
            {winner ? `Congratulations Winner is ${winner}` : `Game was a Draw`}
          </p>
          <button
            className="px-6 py-2 bg-[#191913] text-white rounded-lg text-lg hover:bg-gray-800 transition duration-200"
            onClick={resetGame}
          >
            New Game
          </button>
        </div>
      )}
      <button
        className="px-6 py-2 mt-4 bg-[#191913] text-white rounded-lg text-lg hover:bg-gray-800 transition duration-200"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default App;
