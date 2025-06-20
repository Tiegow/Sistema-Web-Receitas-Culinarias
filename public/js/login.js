const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        sessionStorage.setItem('userData', JSON.stringify(data.user));
        // alert(data.message);

        window.location.href = '/feed';
    } else {
        const { error } = await res.json()
        alert(error);
    }
});