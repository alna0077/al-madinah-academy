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
        <a href="https://www.facebook.com/almadinahacademy.ca/" data-social="facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg class="brand-icon brand-icon-facebook" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg></a>
        <a href="https://www.instagram.com/almadinahacademy.ca" data-social="instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg class="brand-icon brand-icon-instagram" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.445-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0H8zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.318.92.598.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.598.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zM8 3.892a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334A2.667 2.667 0 0 1 8 5.333"/></svg></a>
        <a href="https://wa.me/16138084866" data-social="whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><svg class="brand-icon brand-icon-whatsapp" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.473.205.842.326 1.13.418.475.152.904.13 1.246.079.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg></a>
        <a href="https://www.tiktok.com/@almadinah.quranacademy" data-social="tiktok" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><svg class="brand-icon brand-icon-tiktok" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.72-.03-.5-.04-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.45 3.98-2.14 6.15-1.74.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.08-.14 1.62.24 1.64 1.82 3.02 3.5 2.87 1.11-.01 2.18-.66 2.76-1.6.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
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
        <a href="https://wa.me/16138084866" data-social="whatsapp" aria-label="Message Al-Madinah Academy on WhatsApp" target="_blank" rel="noopener noreferrer"><svg class="brand-icon brand-icon-whatsapp" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.473.205.842.326 1.13.418.475.152.904.13 1.246.079.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg><span>WhatsApp</span></a>
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
