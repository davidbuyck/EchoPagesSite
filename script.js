const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const yearEls = document.querySelectorAll("#year");

yearEls.forEach((el) => {
  el.textContent = new Date().getFullYear();
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const contactForms = document.querySelectorAll(".contact-form");

contactForms.forEach((form) => {
  let statusEl = form.querySelector(".form-status");

  if (!statusEl) {
    statusEl = document.createElement("div");
    statusEl.className = "form-status";
    statusEl.setAttribute("aria-live", "polite");
    form.appendChild(statusEl);
  }

  const setStatus = (message, isSuccess) => {
    statusEl.textContent = message;
    statusEl.style.marginTop = "14px";
    statusEl.style.fontSize = "0.95rem";
    statusEl.style.lineHeight = "1.5";
    statusEl.style.color = isSuccess ? "#9ed0ff" : "#ffb3b3";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.", false);
      if (emailInput) emailInput.focus();
      return;
    }

    if (!message || message.length < 8) {
      setStatus("Please add a short message so we know what access you need.", false);
      if (messageInput) messageInput.focus();
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    setStatus("Sending...", true);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: new FormData(form)
      });

      if (response.ok) {
        setStatus("Request sent. We’ll reach out shortly.", true);
        form.reset();
      } else {
        setStatus("Send failed. Please email david@astrumarc.com.", false);
      }
    } catch (error) {
      setStatus("Send failed. Please email david@astrumarc.com.", false);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});