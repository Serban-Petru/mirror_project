

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_p1zpxqu", "template_rimljoe", this)
  .then(() => {
      document.getElementById("status-message").innerText = "Mesaj trimis cu succes!";
      document.getElementById("status-message").style.color = "var(--accent)";
      this.reset();
  }, (err) => {
      document.getElementById("status-message").innerText = "Eroare la trimitere.";
      document.getElementById("status-message").style.color = "red";
  });
});

// buton goleşte
document.getElementById("clear").addEventListener("click", () => {
  document.getElementById("contact-form").reset();
});