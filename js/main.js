const WHATSAPP_NUMBER = "51937011574";

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      siteNav.classList.remove("is-open");
    });
  });
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const dateInput = document.querySelector("#reservation-date");
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localDate;
}

const reservationForm = document.querySelector("#reservation-form");
const formStatus = document.querySelector("#form-status");

if (reservationForm) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!reservationForm.reportValidity()) return;

    const formData = new FormData(reservationForm);
    const name = String(formData.get("name") || "").trim();
    const date = String(formData.get("date") || "");
    const time = String(formData.get("time") || "");
    const guests = String(formData.get("guests") || "");
    const notes = String(formData.get("notes") || "").trim();

    if (!name || !date || !time || !guests) {
      if (formStatus) formStatus.textContent = "Completa los campos obligatorios.";
      return;
    }

    const message = [
      "Hola, Café Aroma. Quisiera solicitar una reserva:",
      `Nombre: ${name}`,
      `Fecha: ${date}`,
      `Hora: ${time}`,
      `Personas: ${guests}`,
      notes ? `Mensaje: ${notes}` : "",
      "",
      "Entiendo que la reserva queda pendiente de confirmación."
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if (formStatus) {
      formStatus.textContent = "Se abrirá WhatsApp para enviar tu solicitud. Recuerda esperar la confirmación.";
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
