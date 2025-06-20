window.addEventListener('DOMContentLoaded', () => {
  loadComponent('components/cabecalho.html', 'header');
});

let sessionCounter = 1;

function addIngredienteInput(fonte) {
  const sessao = fonte.closest('.sessao');
  const ingredientesBox = sessao.querySelector('.ingredientes-box');

  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.name = 'ingrediente';
  
  ingredientesBox.appendChild(newInput);
}

// Função principal para adicionar AMBAS as sessões ingredientes e preparo
async function addNovaSessaoCompleta() {
  const containerIngredientes = document.getElementById('sessoes-ingredientes');
  const containerPreparo = document.getElementById('sessoes-preparo');

  const [ingredienteTemplate, preparoTemplate] = await Promise.all([
    fetch('/components/sessaoIngredientes.html').then(response => response.text()),
    fetch('/components/sessaoPreparo.html').then(response => response.text())
  ]);

  const inputId = `session-${sessionCounter}-title`;
  const preparoTitleId = `prep-title-${sessionCounter}`;

  // --- Processa a Sessão de Ingredientes ---
  const tempIngredienteDiv = document.createElement('div');
  tempIngredienteDiv.innerHTML = ingredienteTemplate.trim();
  const novaSessaoIngrediente = tempIngredienteDiv.firstChild;

  // Adiciona um ID único ao contêiner principal da sessão de ingrediente
  novaSessaoIngrediente.id = `ingrediente-sessao-${sessionCounter}`;

  const novoInput = novaSessaoIngrediente.querySelector('.session-title-input');
  novoInput.id = inputId;
  novoInput.name = `session_${sessionCounter}_title`;
  novoInput.setAttribute('oninput', `updateSessionTitle(this, '${preparoTitleId}')`);
  
  // Configura o botão de deletar
  const deleteBtn = novaSessaoIngrediente.querySelector('.delete-session-btn');
  if (deleteBtn) {
    deleteBtn.setAttribute('onclick', `deleteSessao(${sessionCounter})`);
    deleteBtn.setAttribute('onmouseover', 'showDelete(this)');
    deleteBtn.setAttribute('onmouseout', 'hideDelete(this)');
  }

  // --- Processa a Sessão de Preparo ---
  const tempPreparoDiv = document.createElement('div');
  tempPreparoDiv.innerHTML = preparoTemplate.trim();
  const novaSessaoPreparo = tempPreparoDiv.firstChild;

  novaSessaoPreparo.id = `preparo-sessao-${sessionCounter}`;

  const novoPreparoTitle = novaSessaoPreparo.querySelector('.prep-title');
  novoPreparoTitle.id = preparoTitleId;

  containerIngredientes.appendChild(novaSessaoIngrediente);
  containerPreparo.appendChild(novaSessaoPreparo);

  sessionCounter++;
}

// A função de atualização agora recebe o ID do alvo diretamente
function updateSessionTitle(inputElement, targetId) {
  const preparoTitle = document.getElementById(targetId);
  
  if (preparoTitle) {
    preparoTitle.textContent = inputElement.value;
  }
}

function deleteSessao(sessionIndex) {
  // Constrói os IDs únicos para ambas as sessões que devem ser removidas
  const ingredienteSessaoId = `ingrediente-sessao-${sessionIndex}`;
  const preparoSessaoId = `preparo-sessao-${sessionIndex}`;

  const sessaoIngrediente = document.getElementById(ingredienteSessaoId);
  const sessaoPreparo = document.getElementById(preparoSessaoId);

  if (sessaoIngrediente) {
    sessaoIngrediente.remove();
  }

  if (sessaoPreparo) {
    sessaoPreparo.remove();
  }
}

function showDelete(fonte) {
  fonte.src = 'img/delete.png';
}

function hideDelete(fonte) {
  fonte.src = 'img/list.png';
}

function previewImage(event) {
  const file = event.target.files[0];

  if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
          imagePreview.setAttribute('src', this.result);
          imagePreview.style.display = 'block'; // Mostra a imagem
      });

      reader.readAsDataURL(file);
  } else {
      imagePreview.setAttribute('src', '#');
      imagePreview.style.display = 'none'; // Esconde se não tiver imagem
  }
}

async function publicarReceita() {  
  try {
    const formData = montarPayloadReceita(); // Recebe o FormData

    // Opcional: verifique o conteúdo do FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    
    const response = await fetch('/api/publicar-receita', { 
      method: 'POST',
      body: formData, // Envia o objeto FormData diretamente
    });

    if (!response.ok) {
      throw new Error(`Erro do servidor: ${response.statusText}`);
    }

    const result = await response.json();
    alert('Receita publicada com sucesso!');
    window.location.href = 'feed.html';

  } catch (error) {
    console.error('Falha ao publicar a receita:', error);
    alert(`Erro ao publicar a receita: ${error.message}`);
  }
}

function montarPayloadReceita() {
  const form = document.getElementById('receitaForm');
  
  const formData = new FormData();

  // --- Coleta e anexa os campos de texto simples ---
  const titulo = form.querySelector('input[name="titulo"]').value;
  const descricao = form.querySelector('input[name="descricao"]').value;
  const data = new Date().toLocaleDateString('pt-BR');

  if (!titulo || !descricao) {
    throw new Error('Título e descrição são obrigatórios.');
  }

  formData.append('titulo', titulo);
  formData.append('descricao', descricao);
  formData.append('data', data);

  // --- Coleta e anexa o arquivo de IMAGEM ---
  const imageInput = document.getElementById('imageInput');
  if (imageInput.files.length > 0) {
    formData.append('imagem', imageInput.files[0]);
  } else {
    throw new Error('Por favor, selecione uma imagem para a receita.');
  }

  // --- Coleta, processa e anexa TAGS e CATEGORIAS ---
  const tagsTextarea = form.querySelector('textarea[name="tags"]');
  const tags = tagsTextarea ? tagsTextarea.value.split(',').map(tag => tag.trim()).filter(Boolean) : [];

  const categoriasPossiveis = ['veganas', 'doces', 'salgados'];
  const categorias = tags.filter(tag => categoriasPossiveis.includes(tag.toLowerCase()));

  // Arrays e objetos devem ser convertidos para uma string JSON para serem enviados via FormData.
  // O servidor tem q fazer o 'JSON.parse()' para reverter o processo.
  formData.append('tags', JSON.stringify(tags));
  formData.append('categoria', JSON.stringify(categorias));

  // --- Coleta as SESSÕES de ingredientes e preparo ---
  const ingredientesArray = [];
  const preparoArray = [];
  const todasSessoesIngredientes = document.querySelectorAll('#sessoes-ingredientes > .sessao');

  todasSessoesIngredientes.forEach(sessaoIngrediente => {
    const sessionIndex = sessaoIngrediente.id.split('-').pop();
    const tituloSessaoInput = sessaoIngrediente.querySelector('.session-title-input');
    const tituloSessao = tituloSessaoInput ? tituloSessaoInput.value : 'Sem Título';

    const inputsDeIngredientes = sessaoIngrediente.querySelectorAll('.ingredientes-box input[type="text"]:not(.session-title-input)');
    const listaDeItens = Array.from(inputsDeIngredientes).map(input => input.value).filter(Boolean);

    // Pula para a próxima iteração se não houver itens nesta sessão
    if (listaDeItens.length === 0) {
      return; 
    }

    ingredientesArray.push({
      session_title: tituloSessao,
      items: listaDeItens,
    });

    const sessaoPreparoCorrespondente = document.getElementById(`preparo-sessao-${sessionIndex}`);
    if (sessaoPreparoCorrespondente) {
      const modoPreparoTextarea = sessaoPreparoCorrespondente.querySelector('textarea');
      const modoPreparo = modoPreparoTextarea ? modoPreparoTextarea.value : '';

      preparoArray.push({
        session_title: tituloSessao,
        modo: modoPreparo,
      });
    }
  });

  // Validação das sessões
  if (ingredientesArray.length === 0) {
    throw new Error('É necessário adicionar pelo menos um ingrediente.');
  }
  if (preparoArray.length === 0 || !preparoArray[0].modo) {
      throw new Error('O modo de preparo da primeira sessão não pode estar vazio.');
  }

  // Anexa os arrays de sessões como strings JSON
  formData.append('ingredientes', JSON.stringify(ingredientesArray));
  formData.append('preparo', JSON.stringify(preparoArray));
  
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const username = userData.username;
  formData.append('usuario', username);

  return formData;
}