let bootTimeout;

// Starte Timer beim Laden der Seite
window.addEventListener("DOMContentLoaded", () => {
  bootTimeout = setTimeout(() => {
    window.location.href = "../index.html";
  }, 5000); // Nach 5 Sekunden automatisch weiter
});

// Wenn Taste gedrückt → Abbruch und Weiterleitung zu UEFI
document.addEventListener("keydown", function () {
  clearTimeout(bootTimeout); // Automatische Weiterleitung abbrechen
  window.location.href = "../UEFI/uefi.html";
});