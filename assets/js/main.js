const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/1EFWUCXj5z/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/almadinahacademy.ca",
  whatsapp: "https://wa.me/16138084866"
};

const CONTACT_PHONE = {
  display: "1(613) 808-4866",
  href: "tel:+16138084866"
};

const CONTACT_EMAIL = "almadinahacademy.ca@gmail.com";

// Add a Formspree, Basin, Netlify Forms, or custom endpoint here for production submissions.
// Leave blank to use the static mailto fallback. Use "urlencoded" for Netlify Forms.
const CONTACT_FORM_ENDPOINT = "";
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
      target.setAttribute("data-include-error", partialUrl);
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

  document.querySelectorAll("[data-email-display]").forEach((el) => {
    el.textContent = CONTACT_EMAIL;
  });

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${CONTACT_EMAIL}`;
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

const buildMailtoUrl = (data) => {
  const subject = encodeURIComponent("Enrollment request - Al-Madinah Academy");
  const body = encodeURIComponent([
    "Assalamu alaykum,",
    "",
    "I would like to ask about enrollment at Al-Madinah Quran and Sunnah Academy.",
    "",
    `Name: ${data.get("name") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Phone / WhatsApp: ${data.get("phone") || ""}`,
    `Student age: ${data.get("age") || ""}`,
    `Program interest: ${data.get("program") || ""}`,
    `Current level: ${data.get("level") || ""}`,
    `Schedule preference: ${data.get("preference") || ""}`,
    "",
    "Message:",
    data.get("message") || ""
  ].join("\n"));

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
};

const setSubmitLoading = (submitButton, isLoading) => {
  if (!submitButton) return;
  if (!submitButton.dataset.originalText) submitButton.dataset.originalText = submitButton.textContent;
  submitButton.disabled = isLoading;
  submitButton.setAttribute("aria-busy", String(isLoading));
  submitButton.textContent = isLoading ? "Sending..." : submitButton.dataset.originalText;
};

const submitToEndpoint = async (data) => {
  const isUrlEncoded = CONTACT_FORM_ENCODING === "urlencoded";
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: isUrlEncoded
      ? { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }
      : { Accept: "application/json" },
    body: isUrlEncoded ? new URLSearchParams(data).toString() : data
  });

  if (!response.ok) {
    let message = "Submission failed";
    try {
      const result = await response.json();
      message = result.error || result.message || message;
    } catch (error) {
      // Keep the generic message when the provider returns non-JSON errors.
    }
    throw new Error(message);
  }
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
      if (CONTACT_FORM_ENDPOINT) {
        await submitToEndpoint(data);
        setFormStatus(formStatus, "success", "Thank you. Your request has been sent and we will follow up soon, in shaa Allah.");
        enrollmentForm.reset();
        enrollmentForm.querySelectorAll("[aria-invalid]").forEach((field) => markField(field));
      } else {
        window.location.href = buildMailtoUrl(data);
        setFormStatus(formStatus, "success", `Your email app should open with the enrollment request prepared. If it does not open, please email ${CONTACT_EMAIL} directly.`);
      }
    } catch (error) {
      setFormStatus(formStatus, "error", `Something went wrong while sending. ${error.message || `Please email ${CONTACT_EMAIL} or try again shortly.`}`);
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
  initRevealAnimations();
  initEnrollmentForm();
  initScrollTopButton();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite, { once: true });
} else {
  initSite();
}
