const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário (enquanto não implementado o backend)

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (email && name && password == confirmPassword && password.length >= 6) {
        // Sucesso: Redireciona para index
        window.location.href = 'index.html';
    } else {
        alert('Preencha os campos corretamente!');
    }
});