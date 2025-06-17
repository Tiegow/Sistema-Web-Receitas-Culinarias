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
    const btn = card.querySelector(".leia-mais-ingredientes");

    card.addEventListener("click", () => {
      window.location.href = '/detalhes?id=' + receita.id;
    });
    btn.addEventListener("click", () => {
      window.location.href = '/detalhes?id=' + receita.id;
    });

    container.appendChild(card);

    if (receita.ingredientes && receita.ingredientes[0].session_title) {
      receita.ingredientes.forEach(sessao => {
        const h6 = document.createElement("h6");
        h6.textContent = "Para " + sessao.session_title + ":";
        wrapper.appendChild(h6);

        const lista = document.createElement("ul");
        lista.classList.add("ingredientes-list");

        wrapper.appendChild(lista);
        
        sessao.items.forEach(ingrediente => {
          const li = document.createElement("li");
          li.textContent = ingrediente;
          lista.appendChild(li);
        });
      });
    } else if (receita.ingredientes) {
      const lista = document.createElement("ul");
      lista.classList.add("ingredientes-list");
      wrapper.appendChild(lista);

      receita.ingredientes.forEach(ingrediente => {
        const li = document.createElement("li");
        li.textContent = ingrediente;
        lista.appendChild(li);
      });
    }
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