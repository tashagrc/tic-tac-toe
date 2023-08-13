import { useState } from 'react'

function Square( {value, onSquareClick} ) {

  return <button className="square" onClick={onSquareClick}>
    {value}
  </button>;
}

function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    // gaboleh isi ulang
    if(squares[i] || calcWinner(squares)) {
      return;
    }

    // bikin array baru yg sama dgn array yg lama
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = 'X';
    }
    else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  const winner = calcWinner(squares);
  let status = '';
  if(winner) {
    status = 'Winner ' + winner;
  }
  else {
    status = 'Next player ' + (xIsNext ? 'X' : 'O');
  }
  console.log(winner);

  return (
    <>
      <div className='status'>
        {status}
      </div>
      <div className="board">
      {/* {squares.map((squareValue, index) => (
        <Square key={index} value={squareValue} onSquareClick={handleClick(0)}/>
      ))} */}


{/* kasih () => biar fungsi ga langsung dijalanin, tapi nunggu diklik dulu */}


      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    </>
    
  )
}

export default function Game() {

  // array 2 dimensi
  // lifting state, naikin kondisi 1 board ke game
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // buat jump to
  const [currentMove, setCurrentMove] = useState(0);


  // ngatur giliran
  const xIsNext = currentMove % 2 === 0;

  // current adalah history yg terakhir
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // move ganjil - o
    // move genap - x
  }


  function handlePlay(nextSquares) {
    // ambil history yg diklik yg mana
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // ... spread operator utk iterasi array
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // button
  // move adalah index map
  const moves = history.map((squares, move) => {
    let description = '';
    if(move > 0) {
      description = 'Go to move # ' + move;
    } else {
      description = 'Go to game start';
    }

    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}


function calcWinner(squares) {
  
  // kondisi yg menang
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
  
}
