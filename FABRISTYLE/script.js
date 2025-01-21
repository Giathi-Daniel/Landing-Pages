const hamburgerIcon = document.getElementById('menuToggle')
const mobileMenu = document.getElementById('mobileMenu')

// Toggle menu visibility
hamburgerIcon.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
})

// close when a link is clicked
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", ()=> {
        mobileMenu.classList.add('hidden')
    })
})

// Close menu when clicking outside the menu
document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburgerIcon.contains(e.target)) {
        mobileMenu.classList.add('hidden')
    }
});
