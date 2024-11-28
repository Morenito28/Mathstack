const express = require('express');
const math = require('mathjs');
const app = express();
const port = 3000;

app.use(express.json()); // Para manejar solicitudes JSON

// Ruta para realizar cálculos
app.post('/calcular', (req, res) => {
  const { expression } = req.body; // Expresión matemática enviada en el cuerpo de la solicitud

  try {
    // Realizar cálculo usando Math.js
    const result = math.evaluate(expression);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Error en la expresión matemática' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
