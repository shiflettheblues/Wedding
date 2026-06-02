/* ============================================================
   Alex & Jordan — interactions
   ============================================================ */
(function () {
  "use strict";

  var cfg = window.WEDDING_CONFIG || {};

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // Close the menu after tapping a link
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("nav--scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Countdown ---------- */
  var target = cfg.weddingDate ? new Date(cfg.weddingDate).getTime() : null;
  var elDays = document.querySelector("[data-days]");
  var elHours = document.querySelector("[data-hours]");
  var elMinutes = document.querySelector("[data-minutes]");
  var elSeconds = document.querySelector("[data-seconds]");

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function tick() {
    if (!target || !elDays) return;
    var diff = target - Date.now();
    if (diff <= 0) {
      var cd = document.getElementById("countdown");
      if (cd) cd.innerHTML = '<p style="font-family:var(--serif);font-size:1.6rem;margin:0">Today is the day! 🥂</p>';
      clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    elDays.textContent = Math.floor(s / 86400);
    elHours.textContent = pad(Math.floor((s % 86400) / 3600));
    elMinutes.textContent = pad(Math.floor((s % 3600) / 60));
    elSeconds.textContent = pad(s % 60);
  }
  var timer = setInterval(tick, 1000);
  tick();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(
    ".section__head, .timeline__item, .card, .registry__item, .venue__info, .venue__map, .faq__item, .rsvp-form"
  );
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll(".gallery__item img").forEach(function (img) {
    img.addEventListener("click", function () {
      if (!lightbox) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });

  /* ---------- RSVP form (AJAX submit to Formspree) ---------- */
  var form = document.getElementById("rsvpForm");
  var status = document.getElementById("rsvpStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        setStatus(
          "⚠️ RSVP isn't connected yet. Create a free form at formspree.io and paste your form ID into index.html.",
          "is-error"
        );
        return;
      }

      var btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setStatus("", "");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("Thank you! Your RSVP has been received. 💌", "is-success");
          } else {
            return res.json().then(function (data) {
              throw new Error(
                data && data.errors ? data.errors.map(function (er) { return er.message; }).join(", ") : "Submission failed"
              );
            });
          }
        })
        .catch(function () {
          setStatus("Something went wrong. Please try again or email us directly.", "is-error");
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = "Send RSVP"; }
        });
    });
  }
  function setStatus(msg, cls) {
    if (!status) return;
    status.textContent = msg;
    status.className = "rsvp-form__status " + (cls || "");
  }

  /* ---------- Year-aware footer date dot already static ---------- */
})();
