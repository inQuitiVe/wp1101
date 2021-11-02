/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        var buffer3 = createBoard( boardSize, mineNum)
        setBoard(buffer3.board);
        setMineLocations(buffer3.mineLocations);
        setNonMineCount(boardSize*boardSize- mineNum)
        setRemainFlagNum(0);
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        freshBoard();
        setWin(false);
        setGameOver(false);
        setRemainFlagNum(0);

        
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        if (win === false && gameOver === false){
                var a = board;
                if (a[x][y].revealed === false){
                    if(board[x][y].flagged ===true )
                        setRemainFlagNum(remainFlagNum-1)
                    else setRemainFlagNum(remainFlagNum+1)
                    a[x][y].flagged = !a[x][y].flagged;
                    setBoard(a);
                }
                
                console.log(remainFlagNum);
        }

        
        
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        
        if (win === false && gameOver === false){
            if (board[x][y].value === '💣'){
            
            var buffer =board;
            for(let i=0;i<mineLocations.length;i++){
                buffer[mineLocations[i][0]][mineLocations[i][1]].revealed=true;  
            }
            setBoard(buffer);
            setGameOver(true);
        }
        else {
            var buffer2 =board;
            buffer2[x][y].revealed=true; 
            if (buffer2[x][y].flagged===true){
                buffer2[x][y].flagged=false;
                setRemainFlagNum(remainFlagNum-1);

            }
            setBoard(buffer2);
            let count=0;
            for(let i=0;i<board.length;i++){
                for(let j=0;j<board[i].length;j++){
                    if (board[x][y].revealed) count += 1;
                }
            }
            if (count === nonMineCount) setWin(true)
        }
    }
    console.log(remainFlagNum);
    };

    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >
            
            <h1>This is the board Page!</h1>  {/* This line of code is just for testing. Please delete it if you finish this function. */}
            {/* {console.log(createBoard(10, 5))} */}
            {/* -- TODO 3-1 -- */}
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
            <div className='boardContainer'>
                <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                {board.map((item,index_x)=>
                    <div id = {'row'+index_x} style = {{display:'flex'}}>
                        {item.map((cell,index_y) => 
                        <Cell key = {index_x + '_' +index_y} rowIdx={index_x} colIdx={index_y} detail={cell} updateFlag={(e)=>updateFlag(e,index_x,index_y)} revealCell={(e) => revealCell(index_x,index_y)}/>     
                        )}
                    </div>
                    
)}
            </div>
            </div>
        </div>
    ); 

    

}

export default Board