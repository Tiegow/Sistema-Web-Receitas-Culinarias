window.addEventListener('DOMContentLoaded', async () => {
  await getDetail();
  loadComponent('components/cabecalho.html', 'header');
});

async function getDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  if (!id) {
    console.error('ID da receita não fornecido.');
    return;
  }

  const response = await fetch('/api/detalhes?id=' + id);
  if (!response.ok) {
    console.error('Erro ao buscar detalhes da receita:', response.statusText);
    return;
  }

  const receita = await response.json();
  renderDetail(receita);
}

async function renderDetail(receita) {
  const container = document.querySelector('#recipe-detail-container');

  container.innerHTML = container.innerHTML
    .replace('{{usuario}}', receita.usuario)
    .replace('{{imagem}}', receita.imagem)
    .replace('{{titulo}}', receita.titulo)
    .replace('{{data}}', receita.data)
    .replace('{{descricao}}', receita.descricao);

  const ingrWrapper = container.querySelector('.ingredientes-wrapper');

  // Se ingredientes estão divididos em sessões (array de objetos com session_title)
  if (receita.ingredientes && receita.ingredientes[0].session_title) {
    receita.ingredientes.forEach(sessao => {
      ingrWrapper.appendChild(document.createElement("h6")).textContent = "Para " + sessao.session_title + ":";

      const lista = document.createElement("ul");
      lista.classList.add("ingredientes-list");
      
      ingrWrapper.appendChild(lista);

      sessao.items.forEach(ingrediente => {
        const li = document.createElement("li");
        li.textContent = ingrediente;
        lista.appendChild(li);
      });
    });
  } else if (receita.ingredientes) {
    // Caso ingredientes seja uma lista direta
    const lista = document.createElement("ul");
    lista.classList.add("ingredientes-list");
    ingrWrapper.appendChild(lista);

    receita.ingredientes.forEach(ingrediente => {
      const li = document.createElement("li");
      li.textContent = ingrediente;
      lista.appendChild(li);
    });
  }

  const prepRow = container.querySelector('.preparation-session');
  receita.preparo.forEach(sessao => {
    const h6 = document.createElement("h6");
    if (sessao.session_title) {
      h6.textContent = "Para " + sessao.session_title + ":";
    } else {
      h6.textContent = "Preparo:";
    }
    prepRow.appendChild(h6);

    const lista = document.createElement("ul");
    lista.classList.add("preparo-list");

    sessao.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      lista.appendChild(li);
    });

    prepRow.appendChild(lista);
  });
}