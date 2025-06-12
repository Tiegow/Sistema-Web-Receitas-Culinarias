const express = require('express');
const path = require('path');
const router = express.Router();

// PAGINAS
// Rota principal - Redireciona para a página de login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/feed', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'feed.html'));
})

router.get('/add-receita', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'addReceita.html'));
})

router.get('/detalhes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'detalhes.html'));
})

// REST
// Simulação de BD
const posts = [
  {
    usuario: 'Ana_na_Cozinha',
    titulo: 'Bolo de Cenoura com Cobertura de Chocolate',
    imagem: 'https://conteudo.imguol.com.br/c/entretenimento/c8/2023/01/31/bolo-de-cenoura-low-carb-fit-1675176378739_v2_300x400.jpg',
    data: '05/05/2025',
    descricao: 'Um clássico bolo de cenoura fofinho com cobertura de chocolate.',
    categoria: ['Doces', 'Veganas'],
    ingredientes: [
      '1. Cenoura',
      '2. Ovos',
      '3. Açúcar',
      '4. Óleo',
      '5. Farinha de trigo',
      '6. Fermento em pó',
      '7. Chocolate em pó',
      '8. Leite',
      '9. Manteiga'
    ]
  },
  {
    usuario: 'Ana_na_Cozinha',
    titulo: 'Pão de Queijo',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBRLjSAIm48zNKn-zUKET-HjSRfAdTNehuQ&s',
    data: '03/05/2025',
    descricao: 'Receita mineira autêntica de pão de queijo crocante por fora, macio por dentro.',
    categoria: ['Salgados'],
    ingredientes: [
      '1. Polvilho doce',
      '2. Queijo minas ralado',
    ]
  },
  {
    usuario: 'Ana_na_Cozinha',
    titulo: 'Lasanha de Carne',
    imagem: 'https://www.receiteria.com.br/wp-content/uploads/lasanha-de-carne-moida.jpeg',
    data: '12/05/2025',
    descricao: 'Receita de lasanha de carne com bastante queijo e sabor irresistível.',
    categoria: ['Salgados'],
    ingredientes: [
      '1. Massa para lasanha',
      '2. Carne moída',
      '3. Molho de tomate',
      '4. Cebola',
      '5. Alho',
      '6. Queijo mussarela',
      '7. Presunto',
      '8. Sal',
      '9. Orégano'
    ]
  },
  {
    usuario: 'Ana_na_Cozinha',
    titulo: 'Bolo de Cenoura',
    imagem: 'https://conteudo.imguol.com.br/c/entretenimento/c8/2023/01/31/bolo-de-cenoura-low-carb-fit-1675176378739_v2_300x400.jpg',
    data: '05/05/2025',
    descricao: 'Um clássico bolo de cenoura fofinho com cobertura de chocolate.',
    categoria: ['Doces'],
    ingredientes: [
      '1. Cenoura',
      '2. Ovos',
      '3. Açúcar',
      '4. Óleo',
      '5. Farinha de trigo',
      '6. Fermento em pó',
      '7. Chocolate em pó',
      '8. Leite',
      '9. Manteiga'
    ]
  },
  {
    usuario: 'Ana_na_Cozinha',
    titulo: 'Pão de Queijo',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBRLjSAIm48zNKn-zUKET-HjSRfAdTNehuQ&s',
    data: '03/05/2025',
    descricao: 'Receita mineira autêntica de pão de queijo crocante por fora, macio por dentro.',
    categoria: ['Salgados'],
    ingredientes: [
      '1. Polvilho doce',
      '2. Queijo minas ralado',
      '3. Leite',
      '4. Óleo',
      '5. Ovos',
      '6. Sal',
      '7. Fermento em pó',
      '8. Manteiga',
      '9. Queijo parmesão'
    ]
  },
  {
    usuario: 'Ana_na_Cozinha',
    titulo: 'Lasanha de Carne',
    imagem: 'https://www.receiteria.com.br/wp-content/uploads/lasanha-de-carne-moida.jpeg',
    data: '12/05/2025',
    descricao: 'Receita de lasanha de carne com bastante queijo e sabor irresistível.',
    categoria: ['Salgados'],
    ingredientes: [
      '1. Massa para lasanha',
      '2. Carne moída',
      '3. Molho de tomate',
      '4. Cebola',
      '5. Alho',
      '6. Queijo mussarela',
      '7. Presunto',
      '8. Sal',
      '9. Orégano'
    ]
  },
];

// Simulação de login
const USERS = [
  { email: 'cookshare@gmail.com', password: '123456' },
];
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

router.get('/api/feed', (req, res) => {
  const { categoria } = req.query;
  if (categoria) {
    const filtered = posts.filter(post =>
      post.categoria.map(c => c.toLowerCase()).includes(categoria.toLowerCase())
    );
    res.json(filtered);
  } else {
    res.json(posts);
  }
});

module.exports = router;