
import './App.css';
import React, {useState} from 'react';

function calculate(result,operater,buffer){
  console.log(result,operater,buffer);
  if (operater === '+')
    return result + buffer
  if (operater === '-')
    return result - buffer
  if (operater === '*')
    return result * buffer
  if (operater === '/'){
    return result / buffer
  }
    
  if (operater === 'mod')
    return result % buffer
  return result
}

function EQCALC(cell){
  var result = 0;
  for(let i = 0; i<cell.length;i++){
    result += cell[i][0];
      if(cell[i].length !== 1) {
        for(let j = 1; j<cell[i].length;j+=2){
          if(cell[i][j]==='/' && cell[i][j+1]===0 ){
            return 'Divided by 0';
          }
          result = calculate(result,cell[i][j],cell[i][j+1]);
      }
    }
  }
  if(result>1000000000000000) return 'overflow';
  return result;
}



function App() {
  const [display, Setdisplay] = useState('0')
  const [operater, Setoperator] = useState('=')
  //const [buffer, Setbuffer] = useState(0)
  const [float, Setfloat] = useState(0)       // 小數點
  const [Cell, SetCell] = useState(  [ [0] ]  )
  const [PM, SetPM] = useState(1)    // 0 plus  1 minus
  const [PMPosition, SetPMPos] = useState(0)  
  const [MDPosition, SetMDPos] = useState(0)  


  const Num = (content) => 
          { 
            var BufferNum;
            if(float === 0){
              BufferNum = [...Cell];
              BufferNum[PMPosition][MDPosition] = BufferNum[PMPosition][MDPosition]*10+content*PM;
              SetCell(BufferNum);
            }
            else{
              BufferNum = [...Cell];
              BufferNum[PMPosition][MDPosition] = BufferNum[PMPosition][MDPosition]+content/(10**float)*PM;
              SetCell(BufferNum);
              Setfloat(float+1);
            }
            if (operater === '='){
              BufferNum = [[content]];
              Setdisplay(String(content));
              SetCell(BufferNum);
              SetPMPos(0);
              SetMDPos(0);
              Setoperator('');
            }
            else {
              Setdisplay(display+content);
            }

            console.log(BufferNum);
            }

  const Plus = (content) => 
          { 
            Setdisplay(display+content);
            var BufferNum = [...Cell];
            BufferNum = [...BufferNum,...[[0]]];
            SetCell(BufferNum);
            SetPMPos(PMPosition+1);
            SetMDPos(0);
            Setfloat(0);
            Setoperator('');
            SetPM(1);
            console.log(BufferNum);
            console.log(PMPosition+1);
          }

  const Minus = (content) => 
            { 
              Setdisplay(display+content);
              var BufferNum = [...Cell];
              BufferNum = [...BufferNum,...[[0]]];
              SetCell(BufferNum);
              SetPMPos(PMPosition+1);
              SetMDPos(0);
              Setfloat(0);
              Setoperator('');
              SetPM(-1);
              console.log(BufferNum);
              console.log(PMPosition+1);
            }

  const Operation = (content) => 
            { 
              Setdisplay(display+content);
              
              var BufferNum = [...Cell];
              BufferNum[PMPosition] = [...BufferNum[PMPosition],...[content],...[0]];
              SetCell(BufferNum);
              
              SetPM(1);
              SetMDPos(MDPosition+2);

              Setfloat(0);
              Setoperator('');
            }

  const Equal = (content) => 
            { 
              var result = EQCALC(Cell);
              SetCell([[result]]);
              Setdisplay(result);
              SetPM(1);
              SetPMPos(0);
              SetMDPos(0);
              console.log(Cell);
              console.log(result);

              Setfloat(0);
              Setoperator(content);
            }

  const Dot = (content) => 
            { 
              if(float === 0 ){
              Setfloat(float+1);
              Setdisplay(display+content);
              }
            }
  
  const pa  = (content) =>
            {
              Setdisplay(display+content);

              var BufferNum = [...Cell];
              BufferNum[PMPosition] = [...BufferNum[PMPosition],...['/'],...[100]];
              SetCell(BufferNum);
              
              SetPM(1);
              SetMDPos(MDPosition+3);

              Setfloat(0);
              Setoperator('');

            }

  const C  = () =>
            { SetCell([[0]]);
              Setdisplay(0);
              SetPM(0);
              SetPMPos(0);
              SetMDPos(0);
              Setfloat(0);
              Setoperator('=');
            }

  const Del  = () =>
            { var length = display.length;
              
              if(Cell.length===1 && Cell[0][0]===0){
              }
              else{
                
                if(display[length-2]==='+'){
                  var BufferNum = [...Cell];
                  BufferNum = BufferNum.splice(Cell.length-1,1);
                  SetCell(BufferNum);
                  Setdisplay(display.slice(0,length-1));               
                }
                else if(display[length-2]==='-'){
                  var BufferNum = [...Cell];
                  BufferNum = BufferNum.splice(Cell.length-1,1);
                  SetCell(BufferNum);
                  Setdisplay(display.slice(0,length-1));               
                }
              }
              
              
            }


  // const input = (content) => 
  //         { if(float === 0){
  //             Setbuffer(buffer*10+content);
  //           }
  //           else{
  //             Setbuffer(buffer+content/(10**float));
  //             Setfloat(float+1);
  //           }
            
  //           if (operater === '='){
  //             Setdisplay(String(content));
  //             Setresult(0);
  //             Setoperator('+');
  //           }
  //           else {
  //             Setdisplay(display+content);
  //           }

  //           }
  // const inputop = (content) => 
  //         { Setdisplay(display+content);
  //           Setresult(calculate(result,operater,buffer));
  //           console.log(result);
  //           Setbuffer(0);
  //           Setfloat(0);
  //           Setoperator(content);}

  // const inputeq = (content) => 
  //           { Setdisplay(calculate(result,operater,buffer));
  //             Setresult(calculate(result,operater,buffer));
  //             console.log(result);
  //             Setfloat(0);
  //             Setbuffer(0);
  //             Setoperator(content);}

  // const inputdot = (content) => 
  //           { if(float === 0 ){
  //             Setfloat(float+1);
  //             Setdisplay(display+content);
  //             }
  //           }
  

  

  return (

    <div class="container">
      <div class="header">Calculator</div>
      <input type="text" class="result" value={display} disabled="disabled" ></input>
      <div class="first-row">
      <input type="button" value="%" class=" global" onClick={() => pa('%')}></input>
        <input type="button" value="MR" class="global" ></input>
        <input type="button" value="MC" class="global" ></input>
        <input type="button" value="mod" class="global" onClick={() => Operation("mod")}></input>
      </div>
      <div class="second-row">
        <input type="button" value="7" class="global" onClick={() => Num(7)}></input>
        <input type="button" value="8" class="global" onClick={() => Num(8)}></input>
        <input type="button" value="9" class="global" onClick={() => Num(9)}></input>
        <input type="button" value="/" class="global" onClick={() => Operation("/")}></input>
      </div>
      <div class="third-row">
        <input type="button" value="4" class="global" onClick={() => Num(4)}></input>
        <input type="button" value="5" class="global" onClick={() => Num(5)}></input>
        <input type="button" value="6" class="global" onClick={() => Num(6)}></input>
        <input type="button" value="*" class="global" onClick={() => Operation("*")}></input>
      </div>
      <div class="fourth-row">
        <input type="button" value="1" class="global" onClick={() => Num(1)}></input>
        <input type="button" value="2" class="global" onClick={() => Num(2)}></input>
        <input type="button" value="3" class="global" onClick={() => Num(3)}></input>
        <input type="button" value="-" class="global" onClick={() => Minus("-")}></input>
      </div>
      <div class="conflict">
        <div class="left">
          <input type="button" value="0" class=" big" onClick={() => Num(0)}></input>
          <input type="button" value="." class=" small" onClick={() => Dot(".")}></input>
          <input type="button" value="C" class=" red small white-text top-margin" onClick={() => C()}></input>
          
          <input type="button" value="=" class="  green white-text big top-margin"onClick={() =>  Equal("=")}></input>
        </div>
        <div class="right">
          <input type="button" value="+" class="global grey plus"onClick={() => Plus("+")}></input>
        </div>
      </div>
    </div>
  );
}

export default App;
