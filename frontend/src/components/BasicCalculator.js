import React, { useState } from "react";
import "./BasicCalculator.css";
import { evaluate } from "mathjs";

const BasicCalculator = () => {
  const [display, setDisplay] = useState("");
  const appendValue = (value) => setDisplay(display + value);
    const calculate = () => {
    try {
        setDisplay(evaluate(display).toString());
    } catch {
        setDisplay("Error");
    }
    };

  const clearDisplay = () => setDisplay("");

  return (
    <div className="calculator-container">
      <h1 className="main-title">Calculadora Básica</h1>
      <input type="text" className="input-box" value={display} readOnly />
      <div className="buttons">
        {[7, 8, 9, "/"].map((val) => (
          <button onClick={() => appendValue(val)} key={val}>{val}</button>
        ))}
        {[4, 5, 6, "*"].map((val) => (
          <button onClick={() => appendValue(val)} key={val}>{val}</button>
        ))}
        {[1, 2, 3, "-"].map((val) => (
          <button onClick={() => appendValue(val)} key={val}>{val}</button>
        ))}
        {[0, ".", "+", "="].map((val) => (
          <button
            onClick={val === "=" ? calculate : () => appendValue(val)}
            key={val}
          >
            {val}
          </button>
        ))}
      </div>
      <button className="btn-clear" onClick={clearDisplay}>C</button>
    </div>
  );
};

export default BasicCalculator;
