import './App.css'
import React,{useState} from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import {WINNING_COMBINATIONS} from './winning-combinations.js'
import GameOver from './components/GameOver.jsx';

export const initialGameBoard = [
  [null,null,null],           /* every single row , row is represented by "li" */
  [null,null,null],
  [null,null,null],
];

function deriveActivePlayer (gameTurns) {
  
  let currentPlayer = "X";
      if(gameTurns.length > 0 && gameTurns[0].player === "X"){
        currentPlayer = "O"
      }
    
  return currentPlayer
}
function App() {
  
  const [gameTurns,setGameTurns] = useState([])

  // the gameTurns state helps us to decide what is the activeplayer
  const activePlayer = deriveActivePlayer(gameTurns)


  // the gameturns state helps us to draw the gameboard
  let gameBoard  = initialGameBoard ;
  for (const turn of gameTurns){

    const {square,player} = turn;
    const {row,col} = square;
    gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]


      console.log(firstSquareSymbol)

      if(firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol && 
        secondSquareSymbol === thirdSquareSymbol){
          winner = firstSquareSymbol;
      }                                                           
  }

  const hasDraw = gameTurns.length === 9 && !winner ;

  function handleSelectSquare (rowIndex,colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
              { square: {row:rowIndex,col:colIndex} ,
                player: currentPlayer
              },
              ...prevTurns];
      return updatedTurns
    })
}
  return(
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player 
              name="Player 1" 
              symbol='X' 
              isActive={activePlayer==="X"}
          />
          <Player 
              name="Player 2" 
              symbol='O' 
              isActive={activePlayer==="O"}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} />}
      <GameBoard board={gameBoard} handleSelectSquare={handleSelectSquare}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
