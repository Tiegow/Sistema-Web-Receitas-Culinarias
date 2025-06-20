const posts = require('./data.js');
const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

// --- CONFIGURAÇÃO DO MULTER ---
const storage = multer.diskStorage({
  // Define a pasta de destino para os uploads
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  // Define o nome do arquivo, adicionando um timestamp para torná-lo único
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

// Simulação de login
const USERS = [
  { email: 'cookshare@gmail.com', password: '123456', username: 'CookShare' },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);

  if (user) {
    // Remove a senha antes de enviar
    const { password, ...userData } = user;

    res.status(200).json({
      message: 'Login bem-sucedido!',
      user: userData 
    });
  } else {
    res.status(404).json({ error: 'Usuário ou senha incorretos.'})
  }
});

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

// A rota agora usa o middleware 'upload.single()' antes de executar a lógica principal
router.post('/api/publicar-receita', upload.single('imagem'), (req, res) => {
  try {
    // IMPORTANTE: Os dados complexos (arrays) vêm como strings, precisamos convertê-los de volta
    const ingredientes = JSON.parse(req.body.ingredientes);
    const preparo = JSON.parse(req.body.preparo);
    const categoria = JSON.parse(req.body.categoria);
    const tags = JSON.parse(req.body.tags);

    // Os dados de texto simples vêm normalmente
    const { titulo, descricao, data, usuario } = req.body;
    
    // Validação
    if (!titulo || !descricao || !ingredientes || ingredientes.length === 0) {
      return res.status(400).json({ error: 'Dados incompletos.' });
    }

    // Pega o caminho do arquivo salvo pelo multer para construir a URL
    // req.file pode ser undefined se nenhum arquivo for enviado
    const imagemUrl = req.file ? `/uploads/${req.file.filename}` : '/img/logo.png';

    // Gera um novo ID único
    const maxId = posts.reduce((max, post) => (post.id > max ? post.id : max), 0);
    const newId = maxId + 1;

    const novaReceita = {
      id: newId,
      titulo,
      descricao,
      imagem: imagemUrl, // <-- Usa a URL da imagem salva
      data,
      ingredientes,
      preparo,
      categoria, 
      tags,
      usuario,
      comentarios: [],
      likedBy: []
    };

    posts.push(novaReceita);
    console.log('Nova receita adicionada com imagem:', novaReceita);
    res.status(201).json(novaReceita);

  } catch (error) {
    console.error('Erro ao processar a receita:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno ao salvar a receita.' });
  }
});

router.post('/api/posts/:postId/like', (req, res) => {
  try {
    const { postId } = req.params;
    const username = req.body.username;

    if (!username) {
      return res.status(400).json({ error: 'Usuário não informado.' });
    }

    const post = posts.find(p => p.id === parseInt(postId));

    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }

    // Lógica de "toggle":
    const hasLiked = post.likedBy.includes(username);

    if (hasLiked) {
      post.likedBy = post.likedBy.filter(id => id !== username);
    } else {
      post.likedBy.push(username);
    }

    res.status(200).json({
      likes: post.likedBy.length,
      likedByUser: !hasLiked
    });

  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
  }
});

router.post('/api/posts/:postId/comment', (req, res) => {
  try {
    const { postId } = req.params;
    const { username, comText } = req.body; // Mantém os nomes que o servidor espera

    if (!username || !comText) {
      return res.status(400).json({ error: 'Usuário e comentário são obrigatórios.' });
    }

    const post = posts.find(p => p.id === parseInt(postId));

    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }

    // Cria o novo objeto de comentário
    const newComment = { autor: username, comentario: comText };

    // Adiciona o novo comentário ao array
    // Usar unshift() em vez de push() faz o novo comentário aparecer no topo da lista
    post.comentarios.unshift(newComment); 

    // --- MUDANÇA PRINCIPAL ---
    // Responde com o status 201 (Created) e envia o comentário recém-criado de volta
    res.status(201).json(newComment);

  } catch (error) {
    console.error('ERRO AO COMENTAR:', error);
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
  }
});

module.exports = router;