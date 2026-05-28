const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const toTop = document.querySelector("[data-to-top]");
const hero = document.querySelector(".hero");

navToggle?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("is-open"));
});

const toggleToTop = () => {
  toTop?.classList.toggle("is-visible", window.scrollY > 520);
};

window.addEventListener("scroll", toggleToTop, { passive: true });
toTop?.addEventListener("click", (event) => {
  event.preventDefault();
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#top`);
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});
toggleToTop();

if (hero && !reduceMotion) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    hero.style.setProperty("--hero-x", (x - 0.5).toFixed(3));
    hero.style.setProperty("--hero-y", (y - 0.5).toFixed(3));
    hero.style.setProperty("--spot-x", `${(x * 100).toFixed(1)}%`);
    hero.style.setProperty("--spot-y", `${(y * 100).toFixed(1)}%`);
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-x", "0");
    hero.style.setProperty("--hero-y", "0");
    hero.style.setProperty("--spot-x", "72%");
    hero.style.setProperty("--spot-y", "38%");
  });
}

const directionText = {
  "Общая хореография": "База для пластики, координации, чувства ритма и первых уверенных движений.",
  "Эстрадные танцы": "Яркие постановки, сценический образ, артистичность и работа с эмоцией.",
  "Hip-Hop и Jazz-Funk": "Энергия, музыкальность, свобода движения и уверенная подача на сцене.",
  "Contemporary и Modern": "Пластика, выразительность, работа с телом и глубокая сценическая история.",
  "Акробатические уроки": "Развиваем силу, гибкость, координацию и безопасную технику элементов для сцены.",
};

const directionNote = document.querySelector("[data-direction-note]");
document.querySelectorAll("[data-direction]").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll("[data-direction]").forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    const title = card.dataset.direction;

    if (directionNote && title) {
      directionNote.innerHTML = `<strong>${title}</strong><span>${directionText[title]}</span>`;
    }
  });
});

const galleryMain = document.querySelector("[data-gallery-main]");
document.querySelectorAll("[data-src]").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    document.querySelectorAll("[data-src]").forEach((item) => item.classList.remove("is-active"));
    thumb.classList.add("is-active");
    const source = thumb.dataset.src;

    if (galleryMain && source) {
      galleryMain.src = source;
    }
  });
});

const accordion = document.querySelector("[data-accordion]");
accordion?.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.querySelector("b").textContent = isExpanded ? "+" : "-";
  });
});

const form = document.querySelector("[data-form]");
const formNote = document.querySelector("[data-form-note]");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Спасибо! Заявка подготовлена. Подключите отправку формы к CRM или мессенджеру.";
  formNote.classList.add("is-success");
  form.reset();
});

document.querySelectorAll("[data-reveal]").forEach((element) => {
  if (reduceMotion) {
    element.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  observer.observe(element);
});

if (!reduceMotion) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
