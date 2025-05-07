window.addEventListener('DOMContentLoaded', loadRecipes);

const posts = [
    {
      titulo: 'Bolo de Cenoura',
      imagem: 'https://conteudo.imguol.com.br/c/entretenimento/c8/2023/01/31/bolo-de-cenoura-low-carb-fit-1675176378739_v2_300x400.jpg',
      data: '05/05/2025',
      descricao: 'Um clássico bolo de cenoura fofinho com cobertura de chocolate.'
    },
    {
      titulo: 'Pão de Queijo',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBRLjSAIm48zNKn-zUKET-HjSRfAdTNehuQ&s',
      data: '03/05/2025',
      descricao: 'Receita mineira autêntica de pão de queijo crocante por fora, macio por dentro.'
    },
    {
        titulo: 'Lasanha de Carne',
        imagem: 'https://www.receiteria.com.br/wp-content/uploads/lasanha-de-carne-moida.jpeg',
        data: '12/05/2025',
        descricao: 'Receita de lasanha de carne com bastante queijo e sabor irresistível.'
    },
];

async function loadRecipes() {
    const response = await fetch('/components/cardReceita.html');
    const template = await response.text();
    const container = document.querySelector('#recipeList'); // onde os cards serão inseridos
    container.innerHTML = ''; // limpa antes de inserir
  
    posts.forEach(receita => {
      let cardHTML = template
        .replace('{{imagem}}', receita.imagem)
        .replace('{{titulo}}', receita.titulo)
        .replace('{{data}}', receita.data)
        .replace('{{descricao}}', receita.descricao);
  
      container.innerHTML += cardHTML;
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