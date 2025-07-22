// DARK MODE TOGGLE
const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

// CONTACT FORM HANDLER
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form && status) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
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
}

// FETCH PROFILE DATA
fetch("/api/profile")
  .then((res) => res.json())
  .then((data) => {
    console.log("API Profile:", data);

    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const skillsList = document.getElementById("skills");

    if (nameEl) nameEl.textContent = data.name;
    if (emailEl) emailEl.textContent = data.email;
    if (skillsList) {
      data.skills.forEach((skill) => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
      });
    }
  })
  .catch((err) => console.error("Failed to fetch profile:", err));

// SCROLL REVEAL ANIMATION
const faders = document.querySelectorAll(".fade-in");
if (faders.length > 0) {
  const appearOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
}
