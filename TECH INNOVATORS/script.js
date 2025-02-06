// JavaScript for toggling the menu
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerMenu.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
});