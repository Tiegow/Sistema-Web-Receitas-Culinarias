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
