import { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('red');
  const [colorText, setColorText] = useState('Change to blue');
  const [disabled, setDisabled] = useState(false);

  const onCheckBoxHandler = (checkboxValue) => {
    setDisabled(checkboxValue);
  }

  return (
    <div className="App">
      <button disabled={disabled} style={{ backgroundColor: disabled ? "gray" : color }} onClick={() => {
        let newColor = color === 'blue' ? 'red' : 'blue';
        setColorText('Change to ' + color);
        setColor(newColor);
      }}>{colorText}</button>
      <input type="checkbox" onChange={(e) => onCheckBoxHandler(e.target.checked)} defaultChecked={disabled} aira-checked={disabled.toString()} />
    </div >
  );
}

export default App;
