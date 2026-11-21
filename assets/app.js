(function () {
  "use strict";
  const content = window.PORTFOLIO_CONTENT;
  if (!content) return;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (value) =>
    String(value == null ? "" : value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  function artwork(p, detail = false, imagePath = p.image) {
    const imgAlt =
      imagePath === p.image
        ? p.alt
        : `${p.name}: accompanying campaign artwork`;
    return `<div class="art art-image" style="--art-matte:${esc(p.matte)}"><img src="${esc(imagePath)}" alt="${esc(imgAlt)}" loading="${detail ? "eager" : "lazy"}" decoding="async" width="${p.dimensions[0]}" height="${p.dimensions[1]}" /></div>`;
  }
  function projectCard(p) {
    const total = String(content.projects.length).padStart(2, "0");
    return `<a class="project-card" href="project.html?slug=${encodeURIComponent(p.id)}" data-category="${esc(p.filter)}" data-work-type="${esc(p.workType)}" aria-label="View the ${esc(p.name)} project">
      <div class="project-cover">${artwork(p)}<span class="work-type-badge">${esc(p.workType)}</span><span class="card-open" aria-hidden="true">↗</span></div>
      <div class="project-meta"><div><h3>${esc(p.name)}</h3><span>${esc(p.type)}${p.imageCount > 1 ? " · " + p.imageCount + " artworks" : ""}</span></div><span class="project-number">${esc(p.number)} / ${total}</span></div></a>`;
  }
  function setSiteContent() {
    $$("[data-site-name]").forEach((el) => (el.textContent = content.siteName));
    $$(".brand-mark").forEach(
      (el) =>
        (el.innerHTML = `${esc(content.initials)}<span class="dot">.</span>`),
    );
    $$("[data-year]").forEach(
      (el) => (el.textContent = new Date().getFullYear()),
    );
    if ($("[data-hero-description]"))
      $("[data-hero-description]").textContent = content.heroDescription;
    if ($("[data-about-lead]"))
      $("[data-about-lead]").textContent = content.aboutLead;
    if ($("[data-about-body]"))
      $("[data-about-body]").textContent = content.aboutBody;
    if ($("[data-about-philosophy]"))
      $("[data-about-philosophy]").textContent = content.aboutPhilosophy;
    $$("[data-designer-name]").forEach(
      (el) => (el.textContent = content.designerName),
    );
    $$("[data-experience]").forEach(
      (el) =>
        (el.textContent = String(content.yearsExperience).padStart(2, "0")),
    );
    $$("[data-email-link]").forEach((link) => {
      link.href = `mailto:${encodeURIComponent(content.email).replace("%40", "@")}?subject=${encodeURIComponent("Design project inquiry")}`;
      link.innerHTML = `${esc(content.email)} <span aria-hidden="true">↗</span>`;
    });
    // WhatsApp links have real URLs in HTML, too, so they work even if this script cannot run.
    const whatsappNumber = String(content.whatsapp || "").replace(/\D/g, "");
    const whatsappValid = /^[1-9]\d{7,14}$/.test(whatsappNumber);
    const whatsappUrl = whatsappValid
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(content.whatsappMessage || "Hello Fatdan!")}`
      : "";
    $$("[data-whatsapp-link]").forEach((link) => {
      if (whatsappValid) {
        link.href = whatsappUrl;
        link.hidden = false;
      } else {
        link.removeAttribute("href");
        link.hidden = true;
      }
    });
    [
      ["instagram", content.instagram],
      ["behance", content.behance],
      ["linkedin", content.linkedin],
      ["x", content.x],
    ].forEach(([key, url]) => {
      $$(`[data-${key}-link]`).forEach((link) => {
        if (url) {
          link.href = url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.removeAttribute("aria-disabled");
        } else {
          link.removeAttribute("href");
          link.setAttribute("aria-disabled", "true");
        }
      });
    });
    if (document.body.dataset.page === "home")
      document.title = `${content.siteName} — Graphic Design Portfolio`;
  }
  function initTheme() {
    const key = "fatdan-theme";
    let dark = false;
    try {
      dark = localStorage.getItem(key) === "dark";
    } catch (_) {}
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const update = () =>
      $$(".theme-icon").forEach(
        (el) =>
          (el.textContent =
            document.documentElement.dataset.theme === "dark" ? "☀" : "☾"),
      );
    update();
    $$(".theme-toggle").forEach((btn) =>
      btn.addEventListener("click", () => {
        const next =
          document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem(key, next);
        } catch (_) {}
        update();
      }),
    );
  }
  function initMenu() {
    const btn = $(".menu-toggle"),
      nav = $(".main-nav");
    if (!btn || !nav) return;
    const close = () => {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    };
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    $$("a", nav).forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }
  function initHome() {
    const grid = $("#work-grid");
    if (!grid) return;
    grid.innerHTML = content.projects.map(projectCard).join("");
    const count = $('[data-filter="All"] span');
    if (count)
      count.textContent = String(content.projects.length).padStart(2, "0");
    $$("[data-work-filter]").forEach((btn) => {
      const figure = $("span", btn);
      if (figure)
        figure.textContent = String(
          btn.dataset.workFilter === "All"
            ? content.projects.length
            : content.projects.filter(
                (p) => p.workType === btn.dataset.workFilter,
              ).length,
        ).padStart(2, "0");
    });
    const selected = { category: "All", workType: "All" };
    const applyFilters = () => {
      let visible = 0;
      $$(".project-card").forEach((card) => {
        const matchCategory =
          selected.category === "All" ||
          card.dataset.category === selected.category;
        const matchWork =
          selected.workType === "All" ||
          card.dataset.workType === selected.workType;
        card.hidden = !(matchCategory && matchWork);
        if (!card.hidden) visible++;
      });
      const status = $("#work-filter-status");
      if (status)
        status.textContent = `Showing ${visible} ${visible === 1 ? "project" : "projects"}${selected.workType === "All" ? "" : " · " + selected.workType.toLowerCase()}${selected.category === "All" ? "" : " · " + selected.category.toLowerCase()}`;
      const empty = $("#work-empty");
      if (empty) empty.hidden = visible !== 0;
    };
    $$(".filter-button").forEach((btn) =>
      btn.addEventListener("click", () => {
        const group = btn.hasAttribute("data-work-filter")
          ? "workType"
          : "category";
        selected[group] =
          group === "workType" ? btn.dataset.workFilter : btn.dataset.filter;
        const siblings = $$(".filter-button").filter(
          (other) =>
            other.hasAttribute("data-work-filter") === (group === "workType"),
        );
        siblings.forEach((other) => {
          other.classList.toggle("is-active", other === btn);
          other.setAttribute("aria-pressed", String(other === btn));
        });
        applyFilters();
      }),
    );
    applyFilters();
  }
  function initProject() {
    const mount = $("#case-study");
    if (!mount) return;
    const slug = new URLSearchParams(window.location.search).get("slug");
    const p = content.projects.find((item) => item.id === slug);
    if (!p) {
      mount.innerHTML =
        '<section class="case-not-found"><h1>Project not found.</h1><p>That project isn\'t in the current collection.</p><a class="pill primary" href="index.html#work">View all work ↗</a></section>';
      document.title = `Project not found — ${content.siteName}`;
      return;
    }
    const total = String(content.projects.length).padStart(2, "0");
    const next =
      content.projects[
        (content.projects.indexOf(p) + 1) % content.projects.length
      ];
    document.title = `${p.name} — ${content.siteName}`;
    const extra = p.gallery
      .slice(1)
      .map(
        (image, i) =>
          `<figure class="case-gallery-item"><a href="${esc(image)}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size additional ${esc(p.name)} artwork ${i + 2}">${artwork(p, false, image)}</a><figcaption>ARTWORK ${String(i + 2).padStart(2, "0")} / ${String(p.gallery.length).padStart(2, "0")} · OPEN FULL IMAGE ↗</figcaption></figure>`,
      )
      .join("");
    mount.innerHTML = `<section class="case-hero"><div class="case-eyebrow"><span class="kicker">PROJECT ${esc(p.number)} / ${total}</span><span class="sample-tag">${esc(p.workType.toUpperCase())} / FATDAN</span></div>
      <h1>${esc(p.name)}<span>.</span></h1><div class="case-intro"><p>${esc(p.strap)}</p><span>${esc(p.type)}${p.year ? "<br>" + esc(p.year) : ""}</span></div></section>
      <div class="case-art"><a href="${esc(p.image)}" target="_blank" rel="noopener noreferrer" class="case-art-link" aria-label="Open full-size ${esc(p.name)} artwork">${artwork(p, true)}</a><div class="image-instruction">VIEW FULL IMAGE ↗</div></div>
      <section class="case-overview"><div><span class="kicker">THE PROJECT</span><h2>A closer<br /><em>look.</em></h2></div><div><p class="case-summary">${esc(p.summary)}</p><dl class="case-spec"><div><dt>Project type</dt><dd>${esc(p.workType)}</dd></div><div><dt>Category</dt><dd>${esc(p.type)}</dd></div><div><dt>Format</dt><dd>${esc(p.format)}</dd></div><div><dt>Artwork</dt><dd>${p.gallery.length} ${p.gallery.length === 1 ? "piece" : "pieces"}</dd></div></dl></div></section>
      <section class="case-narrative"><article><span class="kicker">01 / THE VISUALS</span><h3>Design details</h3><p>${esc(p.visual)}</p></article><article><span class="kicker">02 / THE COMPOSITION</span><h3>What stands out</h3><p>${esc(p.detail)}</p></article></section>
      ${extra ? `<section class="case-more"><div class="case-more-head"><span class="kicker">MORE FROM THIS PROJECT</span><h2>In the <em>series.</em></h2></div><div class="case-gallery">${extra}</div></section>` : ""}
      <div class="next-project"><span class="kicker">UP NEXT</span><a href="project.html?slug=${encodeURIComponent(next.id)}"><strong>${esc(next.name)}</strong><span aria-hidden="true">↗</span></a></div>`;
  }
  setSiteContent();
  initTheme();
  initMenu();
  initHome();
  initProject();
})();
