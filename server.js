const express = require('express');
const path = require('path');
const app = express();  
const PORT = 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware JSON

const routes = require('./routes');
app.use('/', routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});