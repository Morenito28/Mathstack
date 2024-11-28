import React, { useState } from 'react';
import axios from 'axios';
import { Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Función para enviar la expresión al backend y obtener el resultado
  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/calcular', { expression });
      setResult(response.data.result);
      setError('');
    } catch (err) {
      setError('Error en el cálculo');
      setResult(null);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Calculadora</h1>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Ingresa la operación"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
            />
          </InputGroup>
          <Button variant="primary" onClick={handleCalculate}>Calcular</Button>

          {result !== null && <h3>Resultado: {result}</h3>}
          {error && <h3 style={{ color: 'red' }}>{error}</h3>}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
