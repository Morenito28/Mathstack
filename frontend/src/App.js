import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, FormControl } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/calcular', { expression });
      setResult(response.data.result);
      setError('');

      // Generar datos de prueba para graficar
      const xValues = Array.from({ length: 100 }, (_, i) => i - 50); // Valores X de -50 a 50
      const yValues = xValues.map((x) => eval(response.data.result.replace(/x/g, `(${x})`))); // Evaluar Y con X

      setChartData({
        labels: xValues,
        datasets: [
          {
            label: 'Gráfico de la función',
            data: yValues,
            borderColor: '#3498db',
            fill: false,
            tension: 0.1,
          },
        ],
      });
    } catch (err) {
      setError('Error en el cálculo o en la graficación.');
      setResult(null);
      setChartData(null);
    }
  };

  const addToExpression = (value) => {
    setExpression(expression + value);
  };

  return (
    <Container className="mt-5 d-flex">
      <div className="calculator-container">
        <h1 className="title">MATHSTACK</h1>
        <FormControl
          className="mb-3 input-box"
          placeholder="Ingresa la operación"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        <Button variant="success" className="mb-3 calculate-btn" onClick={handleCalculate}>
          Calcular
        </Button>
        {result !== null && <h3 className="result">Resultado: {result}</h3>}
        {error && <h3 className="error">{error}</h3>}

        <div className="calculator-grid">
          <Row>
            <Col><Button className="calc-btn" onClick={() => addToExpression('sin(')}>sin</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('cos(')}>cos</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('tan(')}>tan</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('^')}>^</Button></Col>
          </Row>
          <Row>
            <Col><Button className="calc-btn" onClick={() => addToExpression('(')}>(</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression(')')}>)</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('*')}>*</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('/')}>/</Button></Col>
          </Row>
          <Row>
            <Col><Button className="calc-btn" onClick={() => addToExpression('x')}>x</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('y')}>y</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('+')}>+</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('-')}>-</Button></Col>
          </Row>
          <Row>
            <Col><Button className="calc-btn" onClick={() => addToExpression('sqrt(')}>√</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('1')}>1</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('2')}>2</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('3')}>3</Button></Col>
          </Row>
          <Row>
            <Col><Button className="calc-btn" onClick={() => addToExpression('4')}>4</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('5')}>5</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('6')}>6</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('7')}>7</Button></Col>
          </Row>
          <Row>
            <Col><Button className="calc-btn" onClick={() => addToExpression('8')}>8</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('9')}>9</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('0')}>0</Button></Col>
            <Col><Button className="calc-btn" onClick={() => addToExpression('.')}>.</Button></Col>
          </Row>
        </div>
      </div>

      <div className="chart-container">
        <h2>Gráfico</h2>
        {chartData ? (
          <Line data={chartData} />
        ) : (
          <p>Ingresa una función para graficar</p>
        )}
      </div>
    </Container>
  );
}

export default App;
