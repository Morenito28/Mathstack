import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./AdvancedCalculator.css";

const AdvancedCalculator = () => {
  const [input, setInput] = useState(""); // Entrada del usuario
  const [data, setData] = useState({}); // Datos para la gráfica

  // Maneja la entrada de botones del teclado
  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Calcula el resultado y actualiza la gráfica
  const calculate = () => {
    try {
      const result = eval(input.replace("^", "**")); // Reemplazar ^ con ** para exponentes
      setInput(result.toString());

      // Generar puntos para la gráfica
      const xValues = Array.from({ length: 100 }, (_, i) => i - 50); // x de -50 a 49
      const yValues = xValues.map((x) => {
        const parsedInput = input.replace(/x/g, `(${x})`);
        return eval(parsedInput.replace("^", "**"));
      });

      setData({
        labels: xValues,
        datasets: [
          {
            label: "Gráfica de la función",
            data: yValues,
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      });
    } catch (error) {
      setInput("Error");
      console.error(error);
    }
  };

  // Reinicia la gráfica a su estado vacío
  const clearInput = () => {
    setInput("");
    setData({});
  };

  return (
    <div className="advanced-calculator">
      <div className="input-display">{input || "0"}</div>
      <div className="keyboard">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "+",
          "(",
          ")",
          "^",
          "log",
          "sin",
          "cos",
          "tan",
          "x",
          "y",
          "<",
          ">",
          "=",
          "sqrt",
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn === "sqrt" ? "Math.sqrt(" : btn)}
          >
            {btn}
          </button>
        ))}
        <button onClick={calculate}>=</button>
        <button onClick={clearInput}>C</button>
      </div>

      {/* Muestra la gráfica o un mensaje vacío */}
      <div className="graph-container">
        {Object.keys(data).length > 0 ? (
          <Line data={data} />
        ) : (
          <p>Ingresa una función para mostrar la gráfica</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedCalculator;
