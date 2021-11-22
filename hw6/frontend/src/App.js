import { useState } from 'react'
import './App.css'
import { startGame, Card, Result1, Result2,restart} from './axios'


function App() {

    var flower = ['♠️','♥','♦','♣']
    var num = ['','A','2','3','4','5','6','7','8','9','10','J','Q','K']

    const [hasStarted, setHasStarted] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [ClientCard, setCC] = useState([])
    const [HostCard, setHC] = useState([])
    const [WL, setWL] = useState('')
  
    const GetCard = async () => {
        const response = await Card()

        console.log(response);
        if (response===undefined)
        return
        for(var a=0;a<response.length;a++){
          response[a] = flower[Math.floor(response[a]/13)] +num[response[a]%13+1]+'  '
        }
        setCC(response);  
      }


    const GetInit = async () => {
        const response = await startGame()
        if (response===undefined)
        return
        console.log(response);
        for(var a=0;a<response.length;a++){
          response[a] = flower[Math.floor(response[a]/13)] +num[response[a]%13+1]+'  '
        }
        setHC(response);  
      }

    const GetResult1 = async () => {
      const response = await Result1()
      if (response===undefined)
      return
      for(var a=0;a<response.length;a++){
        response[a] = flower[Math.floor(response[a]/13)] +num[response[a]%13+1]+'  '
      }
      setHC(response); 

    }

    const GetResult2 = async () => {
      const response = await Result2()
      if (response===undefined)
      return

      setWL(response); 
    }

  const gameMode = 
      <div>
        <h1>21 點</h1>
        <button 
          onClick = {(e)=>{GetCard()}}
          disabled={ClientCard.length>11}
        >加牌
        </button>
        <button 
          onClick = {(e)=>{GetResult1();GetResult2();setHasWon(true);}}
        >停止加牌
        </button>
        <h3>your cards: {ClientCard}</h3>
        <h3>host cards: {HostCard}</h3>


      </div>


  const winningMode = 
    <div>
      <h2>You {WL}!</h2>
      {/* <button 
        onClick = {()=>{setHasWon(false);restart();setWL('');setCC('');setHC('');GetInit()}}
      >next
      </button> */}
      <button 
        onClick = {()=>{setHasWon(false);restart();setWL('');setCC('');setHC('');GetInit()}}
      >restart
      </button>
      <h3>Your cards:{ClientCard}</h3>
      <h3>Computer's cards:{HostCard}</h3>
    </div>


      
  const game =
    <div>{hasWon ? winningMode : gameMode}</div>


  const startMenu = 
    <button 
      onClick = {()=>{setHasStarted(true);restart();GetInit()}}
    >start game
    </button>
  

  return (
    <div className="App">
        {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
