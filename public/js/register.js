const registerForm = document.getElementById('registerForm');

const errorMsg = document.getElementById('passwordError');
errorMsg.style.display = 'none';

registerForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário (enquanto não implementado o backend)

    const email = document.getElementById('email').value;
    const username = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword) {
        const res = await fetch('/register', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ email, username, password})
        })

        if (res.ok) {
            window.location.href = '/';
        } else {
            const { error } = await res.json();
            alert(error);
        }
    } else {
        errorMsg.textContent = 'As senhas não coincidem.';
        errorMsg.style.display = 'block';
    }
});