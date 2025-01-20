// Toggle the mobile menu visibility
const hamburgerIcon = document.getElementById("hamburger-icon");
const mobileMenu = document.getElementById("mobile-menu");

// Function to close the menu
function closeMenu() {
    mobileMenu.classList.add("hidden");
}

// Toggle menu on hamburger icon click
hamburgerIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click from bubbling to the document
    mobileMenu.classList.toggle("hidden");
});

// Close menu when clicking outside or on a link
document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburgerIcon.contains(e.target)) {
        closeMenu();
    }
});

// Close menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});
