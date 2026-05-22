/**
 * Jacky's Personal Website — JavaScript
 * Handles: mobile menu, smooth scroll, typed hero text, contact form, footer year.
 */

(function () {
  "use strict";

  // ----- Typed text: cycle through research interests -----
  const typedEl = document.getElementById("typed-text");
  const typedPhrases = [
    "sustainable agriculture",
    "crop production",
    "plant science",
    "applied field research",
    "soil health",
    "plant breeding",
    "organic farming",
    "seed systems",
  ];

  if (typedEl) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 70;
    const deleteSpeed = 40;
    const pauseAfterType = 2200;
    const pauseAfterDelete = 400;

    function tick() {
      const current = typedPhrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typedEl.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % typedPhrases.length;
          setTimeout(tick, pauseAfterDelete);
          return;
        }
        setTimeout(tick, deleteSpeed);
        return;
      }

      charIndex++;
      typedEl.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    }

    if (prefersReducedMotion) {
      typedEl.textContent = typedPhrases[0];
    } else {
      tick();
    }
  }

  // ----- Footer: current year -----
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ----- Mobile navigation toggle -----
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ----- Smooth scroll: account for sticky header height -----
  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 72;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  // ----- Contact form (placeholder — does not send email yet) -----
  const form = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  if (form && formNote) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = form.querySelector("#name").value.trim();
      const email = form.querySelector("#email").value.trim();
      const message = form.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        formNote.textContent = "Please fill in all fields.";
        formNote.classList.remove("success");
        return;
      }

      // Demo success message. To actually send email, use a service like
      // Formspree, Netlify Forms, or your own backend — then update this handler.
      formNote.textContent =
        "Thanks, " +
        name +
        "! Your message was recorded locally. Connect a form service to send real emails.";
      formNote.classList.add("success");
      form.reset();
    });
  }

  // ----- Sync project link aria-labels with card titles -----
  document.querySelectorAll(".project-card").forEach(function (card) {
    const title = card.querySelector("h3");
    const link = card.querySelector(".btn-small");
    if (title && link) {
      const name = title.textContent.trim();
      if (name && name.indexOf("[") === -1) {
        link.setAttribute("aria-label", "View details for " + name);
      }
    }
  });
})();
