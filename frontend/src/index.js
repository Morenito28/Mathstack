import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Busca el elemento raíz del DOM
const rootElement = document.getElementById("root");

// Crea el root de React
const root = ReactDOM.createRoot(rootElement);

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
