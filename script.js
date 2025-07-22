// Dark mode toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Form submission handler
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      status.innerText = "✅ Thank you! Your message has been sent.";
      status.style.color = "green";
      form.reset();
    } else {
      status.innerText = "❌ Oops! Something went wrong.";
      status.style.color = "red";
    }
  } catch (error) {
    status.innerText = "❌ Error sending message.";
    status.style.color = "red";
  }
});

// Scroll reveal
const faders = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.1 }
);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
