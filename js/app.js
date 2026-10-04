/* ==========================================================
   Single Page Application (SPA) Simulation
   Handles: client-side routing, dynamic content injection,
   browser history/URL updates, and simple state management.
   ========================================================== */

const app = document.getElementById("app");
const navLinks = document.querySelectorAll(".nav-links a");

// ---- Simple in-memory app state ----
const state = {
  visits: {},          // tracks how many times each route was visited
  lastSubmission: null // stores last contact form submission
};

// ---- Route "pages" (content templates) ----
const routes = {
  home: () => `
    <section class="route-view">
      <h1>Hi, I'm Vaishnavi 👋</h1>
      <p>Welcome to my Single Page Application simulation, built with vanilla
      HTML, CSS and JavaScript. Use the navigation above — notice the page
      content updates instantly without a full reload.</p>
      <p><strong>You've visited "Home" ${state.visits.home || 0} time(s) this session.</strong></p>
    </section>
  `,

  about: () => `
    <section class="route-view">
      <h2>About This Project</h2>
      <p>This SPA demonstrates how JavaScript can dynamically swap page
      content, update the browser's URL/history, and preserve application
      state — all without requesting a new HTML document from the server.</p>
      <p>The routing is handled using the <code>hashchange</code> and
      <code>History</code> APIs, and content is injected into a single
      container element (<code>#app</code>).</p>
    </section>
  `,

  projects: () => `
    <section class="route-view">
      <h2>Projects</h2>
      <div class="card-grid">
        <div class="card">
          <h3>Weather Dashboard</h3>
          <p>Responsive weather app built with semantic HTML and CSS Grid.</p>
        </div>
        <div class="card">
          <h3>Recipe Finder</h3>
          <p>Accessible recipe search tool with full keyboard navigation.</p>
        </div>
        <div class="card">
          <h3>This SPA Simulation</h3>
          <p>A dynamic, client-side routed single-page application.</p>
        </div>
      </div>
    </section>
  `,

  contact: () => `
    <section class="route-view">
      <h2>Contact Me</h2>
      <form id="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" rows="4" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      <p id="form-status">${state.lastSubmission ? "Last message saved from: " + state.lastSubmission : ""}</p>
    </section>
  `,

  notfound: () => `
    <section class="route-view">
      <h2>404 — Page Not Found</h2>
      <p>The section you're looking for doesn't exist in this SPA.</p>
    </section>
  `
};

// ---- Core render function: loads content into the DOM dynamically ----
function render(routeName) {
  const route = routes[routeName] ? routeName : "notfound";

  // update state (simple visit counter)
  state.visits[route] = (state.visits[route] || 0) + 1;

  // inject content into the single main container
  app.innerHTML = routes[route]();

  // update active nav link
  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.route === route);
  });

  // update document title to reflect current "page"
  document.title = `Vaishnavi | ${route.charAt(0).toUpperCase() + route.slice(1)}`;

  // wire up the contact form each time it's rendered
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      state.lastSubmission = email;
      document.getElementById("form-status").textContent =
        "Thanks! Your message was received from: " + email;
    });
  }
}

// ---- Router: reads the URL hash and renders the matching route ----
function router() {
  const hash = window.location.hash.replace("#/", "") || "home";
  render(hash);
}

// ---- Listen for URL changes (back/forward buttons & link clicks) ----
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
