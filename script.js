// ===================== MENIU MOBIL =====================
// Deschide / închide meniul când se apasă pe icon-ul "☰"
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
