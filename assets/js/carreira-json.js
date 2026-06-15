/**
 * carreira-json.js
 * Lê assets/data/carreira.json e monta o conteúdo da página dinamicamente.
 */

(function () {
  "use strict";

  fetch("assets/data/carreira.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Não foi possível carregar carreira.json");
      return res.json();
    })
    .then(function (data) {
      applySEO(data.seo);
      applyProfile(data.profile);
      applyContacts(data.contacts);
      applyCareerSteps(data.careerSteps);
      applySkillGroups(data.skillGroups);
      applyOtherSkills(data.otherSkills);
      applyLanguages(data.languages);
    })
    .catch(function (err) {
      console.error("Erro ao carregar dados:", err);
    });

  /* ── SEO ─────────────────────────────────────────────── */
  function applySEO(seo) {
    if (!seo) return;
    if (seo.title) document.title = seo.title;

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && seo.description) metaDesc.setAttribute("content", seo.description);

    var metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor && seo.author) metaAuthor.setAttribute("content", seo.author);

    var canonical = document.getElementById("canonical-url");
    if (canonical && seo.canonicalUrl) canonical.setAttribute("href", seo.canonicalUrl);
  }

  /* ── PERFIL ──────────────────────────────────────────── */
  function applyProfile(profile) {
    if (!profile) return;

    setText("profile-name", profile.name);
    setText("profile-tagline", profile.tagline);
    setText("profile-summary", profile.summary);

    var photo = document.getElementById("profile-photo");
    if (photo) {
      photo.src = profile.photo || "";
      photo.alt = profile.photoAlt || profile.name || "";
    }

    var cvBtn = document.getElementById("cv-download");
    if (cvBtn) {
      cvBtn.href = profile.cvUrl || "#";
      cvBtn.target = "_blank";
      cvBtn.rel = "noopener";
      cvBtn.style.display = profile.cvUrl ? "" : "none";
    }
  }

  /* ── CONTATOS ────────────────────────────────────────── */
  function applyContacts(contacts) {
    if (!contacts) return;

    var emailList = document.getElementById("contact-email-list");
    var socialList = document.getElementById("contact-social-list");
    if (!emailList || !socialList) return;

    emailList.innerHTML = "";
    socialList.innerHTML = "";

    contacts.forEach(function (c) {
      var isEmail = c.icon && c.icon.indexOf("envelope") !== -1;
      var li = document.createElement("li");
      li.className = "mb-2";
      li.innerHTML =
        '<a class="text-link" href="' + (c.href || "#") + '">' +
        '<i class="' + c.icon + ' fa-fw me-2" data-fa-transform="grow-3"></i>' +
        escHtml(c.label) +
        "</a>";

      if (isEmail) {
        emailList.appendChild(li);
      } else {
        var spanLi = document.createElement("li");
        spanLi.className = "mb-3";
        spanLi.innerHTML =
          '<a class="text-link" href="' + (c.href || "#") + '" target="_blank" rel="noopener">' +
          '<span class="fa-container text-center me-2"><i class="' + c.icon + ' fa-fw"></i></span>' +
          escHtml(c.label) +
          "</a>";
        socialList.appendChild(spanLi);
      }
    });
  }

  /* ── ETAPAS DA CARREIRA ──────────────────────────────── */
  function applyCareerSteps(steps) {
    if (!steps) return;
    var container = document.getElementById("career-timeline");
    if (!container) return;

    container.innerHTML = "";

    steps.forEach(function (step, idx) {
      var isLast = idx === steps.length - 1;
      var article = document.createElement("article");
      article.className =
        "resume-timeline-item position-relative" + (isLast ? "" : " pb-5");

      var softSkillsHtml = "";
      if (step.softSkills && step.softSkills.length) {
        var items = step.softSkills
          .map(function (s) { return "<li>" + escHtml(s) + "</li>"; })
          .join("");
        softSkillsHtml =
          '<h4 class="resume-timeline-item-desc-heading font-weight-bold mt-3">Soft Skills para essa etapa:</h4>' +
          "<ul>" + items + "</ul>";
      }

      var roadmapHtml = "";
      if (step.roadmap && step.roadmap.length) {
        var badges = step.roadmap
          .map(function (r) {
            return '<li class="list-inline-item"><span class="badge bg-secondary badge-pill">' + escHtml(r) + "</span></li>";
          })
          .join("");
        roadmapHtml =
          '<h4 class="resume-timeline-item-desc-heading font-weight-bold mt-3">Roadmap de Aprendizado:</h4>' +
          '<ul class="list-inline">' + badges + "</ul>";
      }

      article.innerHTML =
        '<div class="resume-timeline-item-header mb-2">' +
        '<div class="d-flex flex-column flex-md-row">' +
        '<h3 class="resume-position-title font-weight-bold mb-1">' + escHtml(step.title) + "</h3>" +
        "</div>" +
        '<div class="resume-timeline-item-period text-muted small">' + escHtml(step.period || "") + "</div>" +
        "</div>" +
        '<div class="resume-timeline-item-desc">' +
        "<p>" + escHtml(step.description) + "</p>" +
        softSkillsHtml +
        roadmapHtml +
        "</div>";

      container.appendChild(article);
    });
  }

  /* ── GRUPOS DE HABILIDADES ───────────────────────────── */
  function applySkillGroups(groups) {
    if (!groups) return;
    var container = document.getElementById("skill-groups");
    if (!container) return;

    container.innerHTML = "";

    groups.forEach(function (group) {
      var skillItems = (group.skills || [])
        .map(function (s) {
          return (
            '<li class="mb-2">' +
            '<div class="resume-skill-name">' + escHtml(s.name) + "</div>" +
            '<div class="progress resume-progress">' +
            '<div class="progress-bar theme-progress-bar-dark" role="progressbar" ' +
            'style="width: ' + (s.level || 0) + '%" ' +
            'aria-valuenow="' + (s.level || 0) + '" aria-valuemin="0" aria-valuemax="100"></div>' +
            "</div>" +
            "</li>"
          );
        })
        .join("");

      var div = document.createElement("div");
      div.className = "resume-skill-item";
      div.innerHTML =
        '<h4 class="resume-skills-cat font-weight-bold">' + escHtml(group.category) + "</h4>" +
        '<ul class="list-unstyled mb-4">' + skillItems + "</ul>";

      container.appendChild(div);
    });
  }

  /* ── OUTRAS COMPETÊNCIAS ─────────────────────────────── */
  function applyOtherSkills(skills) {
    if (!skills) return;
    var container = document.getElementById("other-skills");
    if (!container) return;

    container.innerHTML = skills
      .map(function (s) {
        return '<li class="list-inline-item"><span class="badge badge-light">' + escHtml(s) + "</span></li>";
      })
      .join("");
  }

  /* ── IDIOMAS ─────────────────────────────────────────── */
  function applyLanguages(languages) {
    if (!languages) return;
    var container = document.getElementById("languages-list");
    if (!container) return;

    container.innerHTML = languages
      .map(function (l) {
        return (
          '<li class="mb-2">' +
          '<span class="resume-lang-name font-weight-bold">' + escHtml(l.name) + "</span> " +
          '<small class="text-muted font-weight-normal">(' + escHtml(l.level) + ")</small>" +
          "</li>"
        );
      })
      .join("");
  }

  /* ── UTILITÁRIOS ─────────────────────────────────────── */
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
  }

  function escHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
