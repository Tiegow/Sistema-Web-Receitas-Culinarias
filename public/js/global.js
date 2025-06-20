function loadComponent(componentPath, renderTargetId, cssPath = null) {
    fetch(componentPath)
        .then(res => res.text())
        .then(data => {
            if (cssPath) {
                const cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.href = cssPath;
                document.head.appendChild(cssLink);
            }
            document.getElementById(renderTargetId).innerHTML = data;
        })
        .catch(err => console.error('Erro ao carregar o componente:', err));
}

async function likePost(id, span) {
    try {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const username = userData.username;
        const response = await fetch(`/api/posts/${id}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();

        span.textContent = data.likes;
        // span.closest('button').querySelector('img').classList.toggle('liked');

    } catch (error) {
        console.error('Erro ao curtir o post:', error);
        alert(error.message);
    }
}