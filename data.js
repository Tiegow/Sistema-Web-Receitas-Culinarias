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
        modo: `1. Preaqueça o forno a 180°C.
          2. No liquidificador, bata as cenouras, ovos, açúcar e óleo até obter uma mistura homogênea.
          3. Em uma tigela, misture a farinha de trigo e o fermento.
          4. Despeje a mistura do liquidificador na tigela e mexa bem
        `
      },
      {
        session_title: 'Cobertura',
        modo: `1. Derreta o chocolate em banho-maria ou no micro-ondas.
          2. Misture o creme de leite e a manteiga até obter uma cobertura lisa.
          3. Despeje sobre o bolo já frio e sirva.
        `
      }
    ],
    comentarios: [
      { autor: 'Lucas', comentario: 'Legal' },
      { autor: 'Ana_na_Cozinha', comentario: '5 Estrelas' },
      { autor: 'Fulano', comentario: 'Perfeito' },
      { autor: 'Michael Jackson', comentario: 'Melhor do que bom' }
    ],
    likedBy: [
      'Lucas',
      'Ana_na_Cozinha'
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
      {
        session_title: 'Massa',
        items: [
          '500g de polvilho doce',
          '250ml de leite quente',
          '100ml de óleo',
          '2 ovos',
          '200g de queijo minas ralado',
          'Sal a gosto'
        ]
      }
    ],
    preparo: [
      {
        session_title: 'Massa',
        modo: `1. Em uma tigela, misture o polvilho doce com o leite quente.
          2. Adicione o óleo e misture bem.
          3. Incorpore os ovos, queijo minas ralado e sal a gosto.
          4. Modele pequenas bolinhas e coloque em uma assadeira untada.
          5. Asse em forno pré-aquecido a 180°C por cerca de 20 minutos ou até dourar.
        `
      }
    ],
    comentarios: [],
    likedBy: []
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
      {
        session_title: 'Recheio',
        items: [
          'Carne moída',
          'Molho de tomate',
          'Cebola',
          'Alho',
          'Sal',
          'Orégano'
        ]
      },
      {
        session_title: 'Montagem',
        items: [
          'Massa para lasanha',
          'Queijo mussarela',
          'Presunto'
        ]
      }
    ],
    preparo: [
      {
        session_title: 'Recheio',
        modo: `1. Refogue a carne moída com cebola e alho.
          2. Acrescente o molho de tomate, sal e orégano. Cozinhe até apurar.
        `
      },
      {
        session_title: 'Montagem',
        modo: `1. Em um refratário, alterne camadas de massa, carne, presunto e queijo.
          2. Finalize com queijo.
          3. Leve ao forno pré-aquecido a 180°C até gratinar.
        `
      }
    ],
    comentarios: [],
    likedBy: []
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
      {
        session_title: 'Massa',
        items: [
          'Cenoura',
          'Ovos',
          'Açúcar',
          'Óleo',
          'Farinha de trigo',
          'Fermento em pó'
        ]
      },
      {
        session_title: 'Cobertura',
        items: [
          'Chocolate em pó',
          'Leite',
          'Manteiga'
        ]
      }
    ],
    preparo: [],
    comentarios: [],
    likedBy: []
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
      {
        session_title: 'Massa',
        items: [
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
      }
    ],
    preparo: [],
    comentarios: [],
    likedBy: []
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
      {
        session_title: 'Recheio',
        items: [
          'Carne moída',
          'Molho de tomate',
          'Cebola',
          'Alho',
          'Sal',
          'Orégano'
        ]
      },
      {
        session_title: 'Montagem',
        items: [
          'Massa para lasanha',
          'Queijo mussarela',
          'Presunto'
        ]
      }
    ],
    preparo: [],
    comentarios: [],
    likedBy: []
  },
];

module.exports = posts;