"use client";

import { useState } from "react";

type Player = "X" | "O" | null;
type Winner = Player | "tie";

export function Component() {
  const [board, setBoard] = useState<Array<Player>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Winner>(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const handleClick = (index: number) => {
    if (board[index] === null && winner === null) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      checkWinner(newBoard);
    }
  };

  const checkWinner = (board: Array<Player>) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        if (board[a] === "X") {
          setXWins(xWins + 1);
        } else {
          setOWins(oWins + 1);
        }
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner("tie");
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex items-center gap-4 text-2xl font-bold mb-4">
          <div className="flex items-center gap-1">
            <TrophyIcon className="w-6 h-6 text-red-500" />
            <span>X Wins: {xWins}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrophyIcon className="w-6 h-6 text-blue-500" />
            <span>O Wins: {oWins}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {board.map((cell, index) => (
              <div
                  key={index}
                  className={`w-20 h-20 bg-white border border-gray-300 flex items-center justify-center text-4xl font-bold cursor-pointer ${
                      cell === "X" ? "text-red-500" : cell === "O" ? "text-blue-500" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleClick(index)}
              >
                {cell}
              </div>
          ))}
        </div>
        <div className="mb-4 text-2xl font-bold">
          {winner === null ? `Current player: ${currentPlayer}` : winner === "tie" ? "It's a tie!" : `Winner: ${winner}`}
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleRestart}
        >
          Restart
        </button>
      </div>
  )
}

function TrophyIcon(props: any) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
  )
}
