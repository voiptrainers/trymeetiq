/* Try Meet IQ — static site behaviour (no dependencies) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* Lucide icons ------------------------------------------------------- */
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

    /* Current year ------------------------------------------------------- */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    /* Mobile navigation -------------------------------------------------- */
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");

    if (header && toggle) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });

      header.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
          header.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* Sticky header shadow ----------------------------------------------- */
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* Scroll reveal ------------------------------------------------------ */
    var revealables = document.querySelectorAll(".reveal");
    if (revealables.length) {
      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -60px 0px", threshold: 0.05 }
        );
        revealables.forEach(function (el) { observer.observe(el); });
      } else {
        revealables.forEach(function (el) { el.classList.add("is-visible"); });
      }
    }

    /* Booking demo (date + slot selection) -------------------------------- */
    var group = function (selector, activeClass) {
      var items = document.querySelectorAll(selector);
      items.forEach(function (item) {
        item.addEventListener("click", function () {
          items.forEach(function (other) { other.classList.remove(activeClass); });
          item.classList.add(activeClass);
        });
      });
    };
    group(".cal-grid button", "is-active");
    group(".slot", "is-active");

    /* Table of contents highlight ----------------------------------------- */
    var tocLinks = document.querySelectorAll(".legal-toc a");
    if (tocLinks.length && "IntersectionObserver" in window) {
      var headings = [];
      tocLinks.forEach(function (link) {
        var target = document.getElementById(link.getAttribute("href").slice(1));
        if (target) { headings.push(target); }
      });

      var tocObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) { return; }
            tocLinks.forEach(function (link) {
              var active = link.getAttribute("href") === "#" + entry.target.id;
              link.style.color = active ? "var(--purple-700)" : "";
              link.style.fontWeight = active ? "700" : "";
            });
          });
        },
        { rootMargin: "-90px 0px -70% 0px" }
      );
      headings.forEach(function (heading) { tocObserver.observe(heading); });
    }
    /* Feature tabs ---------------------------------------------------------- */
    var tabsGroups = document.querySelectorAll("[data-tabs]");
    tabsGroups.forEach(function (group) {
      var buttons = group.querySelectorAll(".tab-btn");
      var panels = group.querySelectorAll(".tab-panel");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var targetId = btn.getAttribute("aria-controls");
          buttons.forEach(function (b) {
            b.classList.remove("is-active");
            b.setAttribute("aria-selected", "false");
          });
          panels.forEach(function (p) {
            var isTarget = p.id === targetId;
            p.classList.toggle("is-active", isTarget);
            p.hidden = !isTarget;
          });
          btn.classList.add("is-active");
          btn.setAttribute("aria-selected", "true");
          if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
          }
        });
      });
    });
  });
})();
