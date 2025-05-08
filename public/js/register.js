const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário (enquanto não implementado o backend)

    const email = document.getElementById('email').value;
    const userNamename = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (email && userNamename && password === confirmPassword && password.length >= 6) {
        // Sucesso: Redireciona para dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Preencha os campos corretamente!');
    }
});