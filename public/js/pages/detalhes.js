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

function adicionarComentarioNaTela(autor, texto) {
  const commentsList = document.getElementById("comments-list");

  // Cria os elementos do DOM para o novo comentário
  const autorDiv = document.createElement('div');
  autorDiv.classList.add('autor-div');
  const autorP = document.createElement('p');
  autorP.classList.add('comment-author', 'fw-semibold');
  autorP.textContent = autor;
  autorDiv.appendChild(autorP);

  const comentarioDiv = document.createElement('div');
  comentarioDiv.classList.add('comment-text');
  comentarioDiv.textContent = texto;

  // Adiciona os novos elementos no TOPO da lista de comentários para que apareçam primeiro
  commentsList.prepend(comentarioDiv);
  commentsList.prepend(autorDiv);
}

async function renderDetail(receita) {
  const container = document.querySelector('#recipe-detail-container');

  container.innerHTML = container.innerHTML
    .replace('{{usuario}}', receita.usuario)
    .replace('{{imagem}}', receita.imagem)
    .replace('{{titulo}}', receita.titulo)
    .replace('{{data}}', receita.data)
    .replace('{{descricao}}', receita.descricao)
    .replace('{{likes}}', receita.likedBy && receita.likedBy.length != null ? receita.likedBy.length : 320)
    .replace('{{comentarios}}', receita.comentarios && receita.comentarios.length != null ? receita.comentarios.length : 15);

  document.querySelector('#like-btn').addEventListener('click', (e) => {
    const likeSpan = e.currentTarget.querySelector('#likes');

    likePost(receita.id, likeSpan);
  });

  const ingrWrapper = container.querySelector('.ingredientes-wrapper');

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

    const prepText = document.createElement("p");
    sessao.modo = sessao.modo.replace(/\n/g, '<br>');
    prepText.innerHTML = sessao.modo;
    prepText.classList.add("preparo-text");


    prepRow.appendChild(prepText);
  });

  const commentsList = document.getElementById("comments-list");
  receita.comentarios.forEach(comentario => {
    const autorText = comentario.autor;
    const autorP = document.createElement('p');
    const autorDiv = document.createElement('div');

    autorDiv.classList.add('autor-div');
    autorP.classList.add('comment-author');
    autorP.classList.add('fw-semibold');
    autorP.textContent = autorText;

    autorDiv.appendChild(autorP);
    commentsList.appendChild(autorDiv);

    const comentarioDiv = document.createElement('div');
    comentarioDiv.classList.add('comment-text');
    comentarioDiv.textContent = comentario.comentario;

    commentsList.appendChild(comentarioDiv);
  });

  const commentBtn = document.getElementById("comment-btn");
  const commentInput = document.getElementById("comment-input")
  commentBtn.addEventListener('click', async () => {
    const commentText = commentInput.value.trim();
    if (!commentText) {
      alert('Por favor, escreva um comentário.');
      return;
    }

    // Pega os dados do usuário logado do sessionStorage
    const userDataString = sessionStorage.getItem('userData');
    if (!userDataString) {
      alert('Você precisa estar logado para comentar.');
      return;
    }
    const userData = JSON.parse(userDataString);
    const username = userData.username;

    adicionarComentarioNaTela(username, commentText);
    commentInput.value = '';

    try {
      // Envia a requisição para o servidor em segundo plano
      const response = await fetch(`/api/posts/${receita.id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Envia o corpo com as chaves corretas: 'username' e 'comText'
        body: JSON.stringify({ username: username, comText: commentText })
      });

      // Se a resposta do servidor não for OK, algo deu errado.
      if (!response.ok) {
        // Remove o comentário que foi adicionado "otimisticamente"
        const firstCommentAuthor = commentsList.querySelector('.autor-div');
        const firstCommentText = commentsList.querySelector('.comment-text');
        if (firstCommentAuthor) firstCommentAuthor.remove();
        if (firstCommentText) firstCommentText.remove();
        
        const errorData = await response.json();
        throw new Error(errorData.error || 'Não foi possível salvar o comentário.');
      }
      
      // Se deu tudo certo, a resposta do servidor pode ser logada, mas a tela já foi atualizada.
      const savedComment = await response.json();
      console.log('Comentário salvo com sucesso:', savedComment);

    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
      alert(error.message);
      // Restaura o texto no input para o usuário não perdê-lo em caso de erro
      commentInput.value = commentText;
    }
  });
}