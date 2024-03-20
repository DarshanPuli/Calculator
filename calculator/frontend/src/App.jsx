import { useState } from 'react'
import './styles.css'

function set(currentValue,oldValue,setOldValue,setCurrentValue,operator){
  if(oldValue==0){
    setOldValue(`${currentValue}${operator}`);
  }
  if(oldValue.substring(oldValue.length-1)=='+'){
    const result = parseInt(oldValue)+parseInt(currentValue);
    setOldValue(`${result}${operator}`);
  }
  if(oldValue.substring(oldValue.length-1)=='-'){
    const result = parseInt(oldValue)-parseInt(currentValue);
    setOldValue(`${result}${operator}`);
  }
  if(oldValue.substring(oldValue.length-1)=='*'){
    const result = parseInt(oldValue)*parseInt(currentValue);
    setOldValue(`${result}${operator}`);
  }
  setCurrentValue("");
}

function calculate(oldValue, currentValue, setCurrentValue, setOldValue, historyElement, setHistoryElement) {
  const operator = oldValue.substring(oldValue.length - 1);
  const operand = parseInt(oldValue.substring(0, oldValue.length - 1));
  let result;
  let history;

  switch (operator) {
    case '+':
      result = operand + parseInt(currentValue);
      break;
    case '-':
      result = operand - parseInt(currentValue);
      break;
    case '*':
      result = operand * parseInt(currentValue);
      break;
    case '/':
      result = operand / parseInt(currentValue);
      break;
    default:
      return;
  }

  history = `${oldValue}${currentValue}=${result}`;
  setHistoryElement([...historyElement, history]);
  setCurrentValue(result.toString());
  setOldValue("");
}


function MaintainHistory({historyElement}){
  return (
    <div>
      {historyElement.map((element)=>{
        return <div className="history-element">{element}</div>
      })}
    </div>
  )
}
function App() {
  const[currentValue,setCurrentValue] = useState("");
  const[oldValue,setOldValue] = useState("");
  const [historyElement,setHistoryElement] = useState([])

  return (
    <div className="flex-container">
      <div className='calculator-grid'>
        <div className="output">
          <div className="previous-operand">{oldValue}</div>
          <div className="current-operand">{currentValue}</div>
        </div>
        <button className='span-two' onClick={()=>{setCurrentValue("");setOldValue("")}}>AC</button>
        <button onClick={()=>{setCurrentValue(parseInt(currentValue/10))}}>DEL</button>
        <button onClick={()=>{set(currentValue,oldValue,setOldValue,setCurrentValue,'/')}}>÷</button>
        <button onClick={()=>{setCurrentValue(currentValue+"1")}}>1</button>
        <button onClick={()=>{setCurrentValue(currentValue+"2")}}>2</button>
        <button onClick={()=>{setCurrentValue(currentValue+"3")}}>3</button>
        <button onClick={()=>{set(currentValue,oldValue,setOldValue,setCurrentValue,'*')}}>*</button>
        <button onClick={()=>{setCurrentValue(currentValue+"4")}}>4</button>
        <button onClick={()=>{setCurrentValue(currentValue+"5")}}>5</button>
        <button onClick={()=>{setCurrentValue(currentValue+"6")}}>6</button>
        <button onClick={()=>{set(currentValue,oldValue,setOldValue,setCurrentValue,'+')}}>+</button>
        <button onClick={()=>{setCurrentValue(currentValue+"7")}}>7</button>
        <button onClick={()=>{setCurrentValue(currentValue+"8")}}>8</button>
        <button onClick={()=>{setCurrentValue(currentValue+"9")}}>9</button>
        <button onClick={()=>{set(currentValue,oldValue,setOldValue,setCurrentValue,'-')}}>-</button>
        <button onClick={()=>{setCurrentValue(currentValue+".")}}>.</button>
        <button onClick={()=>{setCurrentValue(currentValue+"0")}}>0</button>
        <button className='span-two' onClick={()=>{calculate(oldValue,currentValue,setCurrentValue,setOldValue,historyElement,setHistoryElement)}}>=</button>
      </div>
      <div className="history">
        <div className="heading">HISTORY</div>
        <MaintainHistory historyElement={historyElement}></MaintainHistory>
      </div>
    </div>
  )
}

export default App
