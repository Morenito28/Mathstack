// import axios from 'axios';
// import { Button, Container, Row, Col, FormControl } from 'react-bootstrap';
// import { Line } from 'react-chartjs-2';
import React from "react";
import BasicCalculator from "./components/BasicCalculator";
import AdvancedCalculator from "./components/AdvancedCalculator";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="calculator-container">
        <div className="basic-calculator">
          <h2>Calculadora Básica</h2>
          <BasicCalculator />
        </div>
        <div className="advanced-calculator">
          <h2>Calculadora Avanzada</h2>
          <AdvancedCalculator />
        </div>
      </div>
    </div>
  );
};

export default App;
