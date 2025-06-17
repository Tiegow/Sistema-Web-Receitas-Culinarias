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
    id: 1,
    usuario: 'Ana_na_Cozinha',
    titulo: 'Bolo de Cenoura com Cobertura de Chocolate',
    imagem: 'https://conteudo.imguol.com.br/c/entretenimento/c8/2023/01/31/bolo-de-cenoura-low-carb-fit-1675176378739_v2_300x400.jpg',
    data: '05/05/2025',
    descricao: 'Um clássico bolo de cenoura fofinho com cobertura de chocolate.',
    categoria: ['Doces', 'Veganas'],
    ingredientes: [
      {
        session_title: 'Massa',
        items: [
          '3 cenouras médias descascadas e picadas',
          '3 ovos',
          '2 xícaras de açúcar',
          '1 xícara de óleo',
          '2 xícaras de farinha de trigo',
          '1 colher de sopa de fermento em pó',
        ]
      },
      {
        session_title: 'Cobertura',
        items: [
          '200g de chocolate meio amargo',
          '1 caixinha de creme de leite',
          '2 colheres de sopa de manteiga',
        ]
      },
    ],
    preparo: [
      {
        session_title: 'Massa',
        items: [
          'Preaqueça o forno a 180°C.',
          'No liquidificador, bata as cenouras, ovos, açúcar e óleo até obter uma mistura homogênea.',
          'Em uma tigela, misture a farinha de trigo e o fermento.',
          'Despeje a mistura do liquidificador na tigela e mexa bem até incorporar.',
          'Coloque em uma forma untada e enfarinhada e asse por cerca de 40 minutos ou até dourar.'
        ]
      },
      {
        session_title: 'Cobertura',
        items: [
          'Derreta o chocolate em banho-maria ou no micro-ondas.',
          'Misture o creme de leite e a manteiga até obter uma cobertura lisa.',
          'Despeje sobre o bolo já frio e sirva.'
        ]
      }
    ]
  },
  {
    id: 2,
    usuario: 'Ana_na_Cozinha',
    titulo: 'Pão de Queijo',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBRLjSAIm48zNKn-zUKET-HjSRfAdTNehuQ&s',
    data: '03/05/2025',
    descricao: 'Receita mineira autêntica de pão de queijo crocante por fora, macio por dentro.',
    categoria: ['Salgados'],
    ingredientes: [
      'Polvilho doce',
      'Queijo minas ralado',
    ],
    preparo: [
      { session_title: 'Massa',
        items: [
          'Em uma tigela, misture 500g de polvilho doce com 250ml de leite quente.',
          'Adicione 100ml de óleo e misture bem.',
          'Incorpore 2 ovos, 200g de queijo minas ralado e sal a gosto.',
          'Modele pequenas bolinhas e coloque em uma assadeira untada.',
          'Asse em forno pré-aquecido a 180°C por cerca de 20 minutos ou até dourar.'
        ]
      },
    ]
  },
  {
    id: 3,
    usuario: 'Ana_na_Cozinha',
    titulo: 'Lasanha de Carne',
    imagem: 'https://www.receiteria.com.br/wp-content/uploads/lasanha-de-carne-moida.jpeg',
    data: '12/05/2025',
    descricao: 'Receita de lasanha de carne com bastante queijo e sabor irresistível.',
    categoria: ['Salgados'],
    ingredientes: [
      'Massa para lasanha',
      'Carne moída',
      'Molho de tomate',
      'Cebola',
      'Alho',
      'Queijo mussarela',
      'Presunto',
      'Sal',
      'Orégano'
    ]
  },
  {
    id: 4,
    usuario: 'Ana_na_Cozinha',
    titulo: 'Bolo de Cenoura',
    imagem: 'https://conteudo.imguol.com.br/c/entretenimento/c8/2023/01/31/bolo-de-cenoura-low-carb-fit-1675176378739_v2_300x400.jpg',
    data: '05/05/2025',
    descricao: 'Um clássico bolo de cenoura fofinho com cobertura de chocolate.',
    categoria: ['Doces'],
    ingredientes: [
      'Cenoura',
      'Ovos',
      'Açúcar',
      'Óleo',
      'Farinha de trigo',
      'Fermento em pó',
      'Chocolate em pó',
      'Leite',
      'Manteiga'
    ]
  },
  {
    id: 5,
    usuario: 'Ana_na_Cozinha',
    titulo: 'Pão de Queijo',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBRLjSAIm48zNKn-zUKET-HjSRfAdTNehuQ&s',
    data: '03/05/2025',
    descricao: 'Receita mineira autêntica de pão de queijo crocante por fora, macio por dentro.',
    categoria: ['Salgados'],
    ingredientes: [
      'Polvilho doce',
      'Queijo minas ralado',
      'Leite',
      'Óleo',
      'Ovos',
      'Sal',
      'Fermento em pó',
      'Manteiga',
      'Queijo parmesão'
    ]
  },
  {
    id: 6,
    usuario: 'Ana_na_Cozinha',
    titulo: 'Lasanha de Carne',
    imagem: 'https://www.receiteria.com.br/wp-content/uploads/lasanha-de-carne-moida.jpeg',
    data: '12/05/2025',
    descricao: 'Receita de lasanha de carne com bastante queijo e sabor irresistível.',
    categoria: ['Salgados'],
    ingredientes: [
      'Massa para lasanha',
      'Carne moída',
      'Molho de tomate',
      'Cebola',
      'Alho',
      'Queijo mussarela',
      'Presunto',
      'Sal',
      'Orégano'
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

router.get('/api/detalhes', (req, res) => {
  const { id } = req.query;
  const post = posts.find(p => p.id === parseInt(id));
  
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Receita não encontrada.' });
  }
});

module.exports = router;