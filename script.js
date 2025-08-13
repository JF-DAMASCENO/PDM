document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const drawerMenu = document.getElementById('drawer-menu');
    const mainContent = document.querySelector('.main-content');

    menuToggle.addEventListener('click', () => {
        drawerMenu.classList.toggle('open');
    });

    // Opcional: Fechar o menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.drawer-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            drawerMenu.classList.remove('open');
        });
    });

    // Opcional: Fechar o menu ao clicar fora dele
    document.body.addEventListener('click', (event) => {
        // Verifica se o clique não foi no menu ou no botão de toggle
        if (!drawerMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            drawerMenu.classList.remove('open');
        }
    });
});