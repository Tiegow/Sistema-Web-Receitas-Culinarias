window.addEventListener('DOMContentLoaded', async () => {
  await filterBy(null);
  loadComponent('components/cabecalho.html', 'header');
});

async function filterBy(categoria) {
  let response = null;
  let receitas = null;

  if (categoria) {
    response = await fetch('/api/feed?categoria=' + categoria);
  } else {
    response = await fetch('/api/feed');
  }
  
  receitas = await response.json();
  renderReceitas(receitas);
}

async function renderReceitas(receitas) {
  const response = await fetch('/components/cardReceita.html');
  const template = await response.text();
  const container = document.querySelector('#recipeList');
  container.innerHTML = '';

  receitas.forEach(receita => {
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

function searchRecipes() {
    const searchQuery = document.getElementById('recipeSearch').value.toLowerCase(); // obtém o valor do campo de busca
    const recipeItems = document.querySelectorAll('#recipeList .recipe-post');
    
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