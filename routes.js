const express = require('express');
const path = require('path');
const router = express.Router();

// Simulação de login
const USERS = [
  { email: 'cookshare@gmail.com', password: '123456' },
];

// Rota principal - Redireciona para a página de login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/feed', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'feed.html'));
  console.log("entrou em feed");
})

router.get('/add-receita', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'addReceita.html'));
})

router.get('/detalhes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'detalhes.html'));
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);

  if (user) {
    res.sendStatus(200); 
  } else {
    res.status(404).json({ error: 'Usuário ou senha incorretos.'})
  }
})

router.post('/register', (req, res) => {
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

module.exports = router;