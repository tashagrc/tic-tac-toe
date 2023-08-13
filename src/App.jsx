import { useState } from 'react'

function Square( {value, onSquareClick} ) {

  return <button className="square" onClick={onSquareClick}>
    {value}
  </button>;
}
export default function Board() {


  // lifting state, naikin kondisi 1 square ke board
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // bikin array baru yg sama dgn array yg lama
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
    console.log(nextSquares);
  }

  return (
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
  )
}
