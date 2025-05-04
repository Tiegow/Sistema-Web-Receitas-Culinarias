const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário (enquanto não implementado o backend)

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password.length >= 6) {
        // Sucesso: Redireciona para a dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Preencha os campos corretamente!');
    }
});