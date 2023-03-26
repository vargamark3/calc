import { useState } from "react";
import { postNumber, getNumber } from "./services/apiService";

import "./App.css";

function App() {
  const [result, setResult] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [isSecondOperand, setIsSecondOperand] = useState(false);
  const [operation, setOperation] = useState(null);

  const handleSaveClick = async () => {
    const response = await postNumber(result);
  };
  const handleLoadClick = async () => {
    const response = await getNumber();
    setResult(response.number);
  };

  function handleDigitClick(digit) {
    if (result === "0" || isSecondOperand) {
      setResult(digit.toString());
      setIsSecondOperand(false);
    } else {
      setResult(result + digit.toString());
    }
  }

  function handleDecimalClick() {
    if (!result.includes(".")) {
      setResult(result + ".");
    }
  }

  function handleOperatorClick(nextOperator) {
    const inputValue = parseFloat(result);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      const currentValue = firstOperand || 0;
      const newValue = operate(currentValue, inputValue, operation);
      setFirstOperand(newValue);
      setResult(newValue.toString());
    }

    setIsSecondOperand(true);
    setOperation(nextOperator);
  }

  function handleEqualsClick() {
    const inputValue = parseFloat(result);

    if (operation && firstOperand !== null) {
      const currentValue = firstOperand || 0;
      const newValue = operate(currentValue, inputValue, operation);
      setResult(newValue.toString());
      setFirstOperand(newValue);
      setIsSecondOperand(true);
      setOperation(null);
    }
  }

  function operate(a, b, operation) {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  }

  function handleClearClick() {
    setResult("0");
    setFirstOperand(null);
    setOperation(null);
    setIsSecondOperand(false);
  }
  const renderDigits = () => {
    const digits = [];
    for (let index = 9; index >= 0; index--) {
      digits.push(
        <button key={index} onClick={() => handleDigitClick(index)}>
          {index}
        </button>
      );
    }
    return digits;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="output">
          {/*   <div className="output-operands">{history}</div> */}
          <div className="output-result">{result}</div>
        </div>

        <div className="action-container">
          <div className="memoryOperations">
            <button onClick={() => handleLoadClick()}>Load</button>
            <button onClick={() => handleSaveClick()}>Store</button>
          </div>

          <div className="operations">
            <button onClick={() => handleOperatorClick("+")}>+</button>
            <button onClick={() => handleOperatorClick("-")}>-</button>
            <button onClick={() => handleOperatorClick("/")}>/</button>
            <button onClick={() => handleOperatorClick("*")}>*</button>
            <button onClick={handleClearClick}>Clear</button>
          </div>

          <div className="digits">
            {renderDigits()}
            <button onClick={handleDecimalClick}>.</button>
            <button className="equal" onClick={handleEqualsClick}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
