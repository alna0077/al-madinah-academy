const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/almadinahacademy.ca/",
  instagram: "https://www.instagram.com/almadinahacademy.ca",
  whatsapp: "https://wa.me/16138084866",
  tiktok: "https://www.tiktok.com/@almadinah.quranacademy"
};

const CONTACT_PHONE = {
  display: "1(613) 808-4866",
  href: "tel:+16138084866"
};

// Keeps the global footer available when a browser blocks local-file fetches or
// the shared partial cannot be retrieved. The server-rendered partial remains
// the primary source; this fallback mirrors its required navigation exactly.
const FOOTER_FALLBACK_HTML = `
<footer class="site-footer" data-footer-source="fallback">
  <div class="container footer-main footer-grid">
    <section class="footer-brand" aria-label="Al-Madinah Quran and Sunnah Academy">
      <a class="footer-logo" href="index.html" aria-label="Al-Madinah Academy home">
        <img src="assets/logos/logo-header.png" alt="" width="1448" height="409" loading="lazy" decoding="async">
      </a>
      <p>Structured Qur’an, Arabic, and Islamic Studies education for students and families in Ottawa and online.</p>
      <div class="social-links footer-social-row" aria-label="Social media links">
        <a href="https://www.facebook.com/almadinahacademy.ca/" data-social="facebook" aria-label="Al-Madinah Academy on Facebook" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14 21v-8h2.8l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.6-.1-1.3-.2-2-.2-2.8 0-4.6 1.7-4.6 4.7V10H8v3h2.4v8H14Z"/></svg></a>
        <a href="https://www.instagram.com/almadinahacademy.ca" data-social="instagram" aria-label="Al-Madinah Academy on Instagram" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="12" cy="12" r="4"/><path d="M17.6 6.4h.01"/></svg></a>
        <a href="https://wa.me/16138084866" data-social="whatsapp" aria-label="Message Al-Madinah Academy on WhatsApp" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.6 11.6a8.6 8.6 0 0 1-12.7 7.5L3 20.6l1.6-4.7A8.6 8.6 0 1 1 20.6 11.6Z"/><path d="M8.5 7.6c.3-.4.6-.4.9-.1l1.1 2.2c.1.3 0 .5-.2.8l-.7.8c.8 1.6 2 2.8 3.6 3.5l.8-.9c.2-.2.5-.3.8-.2l2.1 1c.3.2.4.4.3.8-.2 1.1-1.2 1.8-2.3 1.8-3.9-.2-7.8-3.8-8.1-7.8 0-.8.7-1.6 1.7-1.9Z"/></svg></a>
        <a href="https://www.tiktok.com/@almadinah.quranacademy" data-social="tiktok" aria-label="Al-Madinah Academy on TikTok" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.5 4v10.4a4.1 4.1 0 1 1-3.2-4V14a1.7 1.7 0 1 0 .9 1.5V4h2.3c.4 2.1 1.8 3.5 3.8 3.9v2.4A7.2 7.2 0 0 1 14.5 8"/></svg></a>
      </div>
    </section>
    <nav class="footer-column" aria-labelledby="footer-academy-title">
      <h2 id="footer-academy-title">Academy</h2>
      <a href="about.html">About the Academy</a>
      <a href="about.html#teachers">Educators</a>
      <a href="student-life.html">Student Life</a>
      <a href="news.html">News</a>
      <a href="contact.html">Contact</a>
    </nav>
    <nav class="footer-column" aria-labelledby="footer-programs-title">
      <h2 id="footer-programs-title">Programs</h2>
      <a href="programs.html#recitation">Qur’an Recitation</a>
      <a href="programs.html#arabic">Arabic Language</a>
      <a href="programs.html#kids">Little Qur’an Learners</a>
      <a href="programs.html#islamic-studies">Islamic Studies</a>
    </nav>
    <section class="footer-column footer-contact" aria-labelledby="footer-contact-title">
      <h2 id="footer-contact-title">Contact</h2>
      <div class="footer-contact-links">
        <a href="tel:+16138084866" data-phone-link aria-label="Call Al-Madinah Academy at 1 613 808 4866"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6.6 3.8 9 8.9 6.9 11c1.1 2.6 3.2 4.7 5.8 5.8l2.1-2.1 5.1 2.4v2.4c0 .8-.7 1.5-1.5 1.5C9.9 21 3 14.1 3 5.6c0-.8.7-1.5 1.5-1.5h2.1Z"/></svg><span data-phone-display>1(613) 808-4866</span></a>
        <a href="https://wa.me/16138084866" data-social="whatsapp" aria-label="Message Al-Madinah Academy on WhatsApp" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.6 11.6a8.6 8.6 0 0 1-12.7 7.5L3 20.6l1.6-4.7A8.6 8.6 0 1 1 20.6 11.6Z"/><path d="M8.5 7.6c.3-.4.6-.4.9-.1l1.1 2.2c.1.3 0 .5-.2.8l-.7.8c.8 1.6 2 2.8 3.6 3.5l.8-.9c.2-.2.5-.3.8-.2l2.1 1c.3.2.4.4.3.8-.2 1.1-1.2 1.8-2.3 1.8-3.9-.2-7.8-3.8-8.1-7.8 0-.8.7-1.6 1.7-1.9Z"/></svg><span>WhatsApp</span></a>
      </div>
    </section>
  </div>
  <div class="footer-bottom"><div class="container footer-bottom-inner"><p>&copy; 2026 Al-Madinah Quran &amp; Sunnah Academy. All rights reserved.</p></div></div>
</footer>`;

// Hostinger PHP endpoint for production form submissions.
const CONTACT_FORM_ENDPOINT = "contact.php";
const CONTACT_FORM_ENCODING = "form-data"; // "form-data" or "urlencoded"

const stripLiveServerInjection = (html) => (
  html.replace(/<!-- Code injected by live-server -->\s*<script>[\s\S]*?<\/script>/g, "")
);

const loadPartials = async () => {
  const includeTargets = [...document.querySelectorAll("[data-include]")];
  await Promise.all(includeTargets.map(async (target) => {
    const partialUrl = target.getAttribute("data-include");
    if (!partialUrl) return;

    try {
      const response = await fetch(partialUrl, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Unable to load ${partialUrl}`);
      target.outerHTML = stripLiveServerInjection(await response.text());
    } catch (error) {
      console.error(error);
      if (partialUrl === "partials/footer.html") {
        target.outerHTML = FOOTER_FALLBACK_HTML;
      } else {
        target.setAttribute("data-include-error", partialUrl);
      }
    }
  }));
};

const applySocialLinks = () => {
  document.querySelectorAll("[data-social]").forEach((link) => {
    const key = link.getAttribute("data-social");
    const url = SOCIAL_LINKS[key];
    if (url && url !== "#") {
      link.href = url;
    }
  });
};

const applyContactDetails = () => {
  document.querySelectorAll("[data-phone-display]").forEach((el) => {
    el.textContent = CONTACT_PHONE.display;
  });

  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    link.href = CONTACT_PHONE.href;
  });
};

const setActiveNavigation = () => {
  const currentPage = document.body.getAttribute("data-page") || "home";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const isCurrent = link.getAttribute("data-nav-page") === currentPage;
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const initNavigation = () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".main-nav a, .header-actions a");

  if (!header || !toggle) return;

  const closeMenu = () => {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
};

const initThemeToggle = () => {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const applyTheme = (theme, preference = theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.style.colorScheme = theme;
    const next = theme === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", `Switch to ${next} colour theme`);
    toggle.removeAttribute("title");
  };

  applyTheme(document.documentElement.dataset.theme || (media.matches ? "dark" : "light"), document.documentElement.dataset.themePreference || "system");
  toggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("almadinah-theme", nextTheme); } catch (error) { /* Apply for this page even if storage is unavailable. */ }
    applyTheme(nextTheme);
  });
  media.addEventListener("change", (event) => {
    if (document.documentElement.dataset.themePreference === "system") applyTheme(event.matches ? "dark" : "light", "system");
  });
};

const initMotionAwareMedia = () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("video[autoplay]").forEach((video) => {
    if (reducedMotion.matches) {
      video.pause();
      video.removeAttribute("autoplay");
    } else {
      video.play().catch(() => {});
    }
  });
};

const initRevealAnimations = () => {
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }
};

const setFormStatus = (formStatus, type, message) => {
  if (!formStatus) return;
  formStatus.hidden = false;
  formStatus.className = `form-status ${type}`.trim();
  formStatus.setAttribute("role", type === "error" ? "alert" : "status");
  formStatus.textContent = message;
};

const clearFormStatus = (formStatus) => {
  if (!formStatus) return;
  formStatus.hidden = true;
  formStatus.className = "form-status";
  formStatus.setAttribute("role", "status");
  formStatus.textContent = "";
};

const getFieldLabel = (field) => {
  const label = field.id ? document.querySelector(`label[for="${field.id}"]`) : null;
  return label?.textContent?.replace("*", "").trim() || field.name || "This field";
};

const getFieldErrorMessage = (field) => {
  const value = field.value.trim();
  if (field.required && !value) return field.dataset.requiredMessage || `${getFieldLabel(field)} is required.`;
  if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
  if (field.name === "message" && value.length > 0 && value.length < 10) return "Please include at least 10 characters in your message.";
  return "";
};

const getFieldErrorElement = (field) => {
  const wrapper = field.closest(".form-field");
  if (!wrapper) return null;

  const fallbackId = `${field.name || "field"}-error`;
  const errorId = field.id ? `${field.id}-error` : fallbackId;
  let error = wrapper.querySelector(".field-error");
  if (!error) {
    error = document.createElement("p");
    error.className = "field-error";
    wrapper.append(error);
  }
  error.id = errorId;
  return error;
};

const setFieldDescription = (field, errorId, isInvalid) => {
  if (!field.dataset.baseDescribedby) field.dataset.baseDescribedby = field.getAttribute("aria-describedby") || "";
  const baseIds = field.dataset.baseDescribedby.split(/\s+/).filter(Boolean);
  const ids = isInvalid ? [...baseIds, errorId] : baseIds;

  if (ids.length) {
    field.setAttribute("aria-describedby", [...new Set(ids)].join(" "));
  } else {
    field.removeAttribute("aria-describedby");
  }
};

const markField = (field, errorMessage = "") => {
  const wrapper = field.closest(".form-field");
  const isInvalid = Boolean(errorMessage);
  if (wrapper) wrapper.classList.toggle("is-invalid", isInvalid);
  field.setAttribute("aria-invalid", String(isInvalid));

  const error = getFieldErrorElement(field);
  if (!error) return;

  error.textContent = errorMessage;
  error.hidden = !isInvalid;
  setFieldDescription(field, error.id, isInvalid);
};

const validateField = (field) => {
  const errorMessage = getFieldErrorMessage(field);
  markField(field, errorMessage);
  return !errorMessage;
};

const validateEnrollmentForm = (form) => {
  const fields = [...form.querySelectorAll("input, select, textarea")].filter((field) => field.type !== "hidden" && field.name !== "bot-field");
  let firstInvalid = null;

  fields.forEach((field) => {
    const isValid = validateField(field);
    if (!isValid && !firstInvalid) firstInvalid = field;
  });

  return { isValid: !firstInvalid, firstInvalid };
};

const setSubmitLoading = (submitButton, isLoading) => {
  if (!submitButton) return;
  if (!submitButton.dataset.originalText) submitButton.dataset.originalText = submitButton.textContent;
  submitButton.disabled = isLoading;
  submitButton.setAttribute("aria-busy", String(isLoading));
  submitButton.textContent = isLoading ? "Sending..." : submitButton.dataset.originalText;
};

const submitToEndpoint = async (data, endpoint = CONTACT_FORM_ENDPOINT) => {
  const isUrlEncoded = CONTACT_FORM_ENCODING === "urlencoded";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: isUrlEncoded
      ? { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }
      : { Accept: "application/json" },
    body: isUrlEncoded ? new URLSearchParams(data).toString() : data
  });

  let result = null;
  try {
    result = await response.json();
  } catch (error) {
    result = null;
  }

  if (!response.ok) {
    throw new Error(result?.error || result?.message || "Submission failed");
  }

  if (result?.success !== true) {
    throw new Error(result?.error || result?.message || "Submission failed");
  }

  return result;
};

const initEnrollmentForm = () => {
  const enrollmentForm = document.querySelector("[data-enrollment-form]");
  const formStatus = document.querySelector("[data-form-status]");
  if (!enrollmentForm) return;

  if (CONTACT_FORM_ENDPOINT) enrollmentForm.action = CONTACT_FORM_ENDPOINT;

  enrollmentForm.addEventListener("input", (event) => {
    if (event.target.matches("input, select, textarea")) {
      if (event.target.getAttribute("aria-invalid") === "true") validateField(event.target);
      clearFormStatus(formStatus);
    }
  });

  enrollmentForm.addEventListener("blur", (event) => {
    if (event.target.matches("input[required], textarea[required]")) validateField(event.target);
  }, true);

  enrollmentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearFormStatus(formStatus);

    const data = new FormData(enrollmentForm);
    if (data.get("bot-field")) {
      enrollmentForm.reset();
      setFormStatus(formStatus, "success", "Thank you. Your request has been received.");
      return;
    }

    const { isValid, firstInvalid } = validateEnrollmentForm(enrollmentForm);
    if (!isValid) {
      setFormStatus(formStatus, "error", "Please correct the highlighted fields before sending your request.");
      firstInvalid?.focus();
      return;
    }

    const submitButton = enrollmentForm.querySelector('button[type="submit"]');
    setSubmitLoading(submitButton, true);

    try {
      await submitToEndpoint(data, enrollmentForm.getAttribute("action") || CONTACT_FORM_ENDPOINT);
      setFormStatus(formStatus, "success", "Thank you. Your request has been sent and we will follow up soon, in shaa Allah.");
      enrollmentForm.reset();
      enrollmentForm.querySelectorAll("[aria-invalid]").forEach((field) => markField(field));
    } catch (error) {
      setFormStatus(formStatus, "error", `Something went wrong while sending. ${error.message || "Please try again shortly."}`);
    } finally {
      setSubmitLoading(submitButton, false);
    }
  });
};


const createScrollTopButton = () => {
  const existingButton = document.querySelector(".scroll-top");
  if (existingButton) return existingButton;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "scroll-top";
  button.setAttribute("aria-label", "Scroll back to top");
  button.setAttribute("aria-hidden", "true");
  button.tabIndex = -1;
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 19V5"></path><path d="M5 12l7-7 7 7"></path></svg>';
  document.body.append(button);
  return button;
};

const initScrollTopButton = () => {
  const button = createScrollTopButton();
  if (!button || button.dataset.scrollTopReady === "true") return;

  button.dataset.scrollTopReady = "true";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const footer = document.querySelector(".site-footer");
  let ticking = false;

  const updateVisibility = () => {
    const isVisible = window.scrollY > 420;
    const isNearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight - 16 : false;
    button.classList.toggle("is-visible", isVisible);
    button.classList.toggle("is-near-footer", isVisible && isNearFooter);
    button.setAttribute("aria-hidden", String(!isVisible));
    button.tabIndex = isVisible ? 0 : -1;
    ticking = false;
  };

  const requestVisibilityUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateVisibility);
  };

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  });

  window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });
  window.addEventListener("resize", requestVisibilityUpdate);
  updateVisibility();
};

const initSite = async () => {
  await loadPartials();
  applySocialLinks();
  applyContactDetails();
  setActiveNavigation();
  initNavigation();
  initThemeToggle();
  initMotionAwareMedia();
  initRevealAnimations();
  initEnrollmentForm();
  initScrollTopButton();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite, { once: true });
} else {
  initSite();
}
