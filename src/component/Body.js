// App.js
import React, { useState } from "react";
import Button from "./Button";

function Body() {
  const [input, setInput] = useState("");
  const [displayString, setDisplayString] = useState("");
  const [firstNo, setFirstNo] = useState(0);
  const [opr, setOpr] = useState("");
  const [err, setErr] = useState("");
  const [evaluationFlag, setEvaluationFlag] = useState(false);

  // In case of error, display an appropriate message and reset everything to normal
  const setErrorMessage = (message) => {
    setErr(message);
    setDisplayString("");
    setInput("");
    setFirstNo(0);
    setOpr("");
  };

  // Evaluates the function and manages the state of variables
  // There are two case when you need to evaluate the expression
  //  1. When user input -> "x opr y" and then user click on "=" button
  //  2. When user input -> "x opr y" and user click on any operator to perform further operation
  // Operator will only be passed in case 2

  const evaluateResult = (operator) => {
    let result = 0;
    if (opr === "*") {
      result = Number(firstNo) * Number(input);
    } else if (opr === "/") {
      if (Number(input) === 0) {
        setErrorMessage("Hey!! You can't divide a number by 0");
        return;
      }
      result = Number(firstNo) / Number(input);
    } else if (opr === "+") {
      result = Number(firstNo) + Number(input);
    } else if (opr === "-") {
      result = Number(firstNo) - Number(input);
    }

    if (operator !== "") {
      setDisplayString(result + operator);
      setInput("");
      setOpr(operator);
      setEvaluationFlag(false);
    } else {
      setDisplayString(result);
      setInput(String(result));
      setOpr("");
      setEvaluationFlag(true);
    }
    setFirstNo(result);
  };

  // To check if the input is operator or not
  const isOpr = (label) => {
    return label === "*" || label === "+" || label === "/" || label === "-";
  };

  // Handle button clicks
  const handleButtonClick = (label) => {
    // To reset the error if caught previously
    setErr("");

    // Clear should reset everything(variables)
    if (label === "Clear") {
      // We are resetting using the sendErrorMessage function, we don't want to write any other function for the same thing
      setErrorMessage("");
      return;
    }

    // The below block is to handle the cases when user input decimal directly => .2 => 0.2
    if (input === "" && label === ".") {
      setDisplayString(displayString + "0" + label);
    } else if (input.includes(".") && label === ".") {
      // We will only show error message for warning but user can resume from here onwards
      setErr("Multiple decimal in one number in not allowed !!");
      return;
    } else {
      setDisplayString(displayString + label);
    }

    // The below block will handle the case when user has completed one evaluation and user has directly started giving input for another expression for evaluation
    if (evaluationFlag && !isOpr(label) && opr === "") {
      if (label === ".") {
        setDisplayString("0" + label);
      } else {
        setDisplayString(label);
      }
      setFirstNo(0);
      setInput(label);
      setEvaluationFlag(false);
      return;
    }

    // User is entering negative number in the start
    if (evaluationFlag === false && label === "-" && input === "") {
      setInput(input + label);
      return;
    }

    // Below block handles the case when user insert the operator or equal to or else
    if (isOpr(label)) {
      if (opr !== "") {
        if (input !== "") {
          // Opr and input has something and user input another operator that means evaluate and prepare for another expression

          // Evaluate the expression and get the result ready for next operation 12*2 then user directly clicked on operator for another expression
          evaluateResult(label);
          return;
        }
        setErrorMessage("Consecutive operator is invalid!!");
        return;
      }
      setOpr(label);
      if (firstNo === 0) {
        setFirstNo(input);
      }
      setInput("");
    } else if (label === "=") {
      if (firstNo === 0 && input === "") {
        setErrorMessage("Please enter a number before evaluating.");
        return;
      }
      if (opr === "") {
        setErrorMessage("Hey!! You have not chosen any operation.");
        return;
      }

      evaluateResult("");
    } else {
      setInput(input + label);
    }
  };

  // Button labels in a 4x4 grid format
  const buttonLabels = [
    ["7", "4", "1", "0"],
    ["8", "5", "2", "."],
    ["9", "6", "3", "="],
    ["/", "*", "-", "+"],
  ];

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={displayString || "0"} readOnly />
        <h1 className="error-message">{err}</h1>
      </div>

      <div className="clear-button">
        <Button label="Clear" onClick={handleButtonClick} />
      </div>

      <div className="button-grid">
        {buttonLabels.map((row, rowIndex) => (
          <div key={rowIndex} className="button-row">
            {row.map((btn, index) => (
              <Button key={index} label={btn} onClick={handleButtonClick} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
