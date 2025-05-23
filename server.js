const express = require('express');
const path = require('path');
const app = express();  
const PORT = 3000;

// Simulação de login
const USERS = [
  { email: 'cookshare@gmail.com', password: '123456' },
];

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware JSON

// Rota principal - Redireciona para a página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/feed', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'feed.html'));
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);

  if (user) {
    res.sendStatus(200); 
  } else {
    res.status(404).json({ error: 'Usuário ou senha incorretos.'})
  }
})

app.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Sua senha deve ter 6 caracteres ou mais.' });
  }

  USERS.push({ email, username, password });
  res.sendStatus(200);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
