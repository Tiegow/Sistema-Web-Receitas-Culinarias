window.addEventListener('DOMContentLoaded', () => {
  loadRecipes();
  loadComponent('components/cabecalho.html', 'header');
});

const posts = [
  {
    usuario: 'Ana_na_Cozinha',
    titulo: 'Bolo de Cenoura com Cobertura de Chocolate',
    imagem: 'https://conteudo.imguol.com.br/c/entretenimento/c8/2023/01/31/bolo-de-cenoura-low-carb-fit-1675176378739_v2_300x400.jpg',
    data: '05/05/2025',
    descricao: 'Um clássico bolo de cenoura fofinho com cobertura de chocolate. Abuvblws jadisjd aljduedjs fjsywofb wska se difena',
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

async function loadRecipes() {
  const response = await fetch('/components/cardReceita.html');
  const template = await response.text();
  const container = document.querySelector('#recipeList');
  container.innerHTML = '';

  posts.forEach(receita => {
    // Criar um elemento temporário com o template HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template;
    const card = tempDiv.firstElementChild;

    // Preencher campos básicos com replace
    card.innerHTML = card.innerHTML
      .replace('{{usuario}}', receita.usuario)
      .replace('{{imagem}}', receita.imagem)
      .replace('{{titulo}}', receita.titulo)
      .replace('{{data}}', receita.data)
      .replace('{{descricao}}', receita.descricao);

    // Inserir os ingredientes na lista dentro do card
    const wrapper = card.querySelector(".ingredientes-wrapper");
    const lista = wrapper.querySelector(".ingredientes-list");

    container.appendChild(card);

    const btn = wrapper.querySelector(".leia-mais-ingredientes");

    // Insere até o limite de altura do card
    receita.ingredientes.forEach(ingrediente => {
      if (lista.scrollHeight <= wrapper.clientHeight) {
        const li = document.createElement("li");
        li.textContent = ingrediente;
        lista.appendChild(li);
      } else { // Apresenta o botao "Leia mais"
        btn.classList.remove("d-none");

        btn.addEventListener("click", (e) => {
          e.preventDefault();

          window.location.href = '/detalhes';
        });

        return;
      }
    });
  });
}

function filterRecipes() {
    const searchQuery = document.getElementById('recipeSearch').value.toLowerCase(); // obtém o valor do campo de busca
    const recipeItems = document.querySelectorAll('#recipeList .recipe-card');
    
    recipeItems.forEach(item => {
        const titleElement = item.querySelector('h2'); // busca o <h2> dentro do card
        const recipeTitle = titleElement ? titleElement.textContent.toLowerCase() : '';

        if (recipeTitle.includes(searchQuery)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
    });
}