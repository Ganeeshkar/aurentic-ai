/* AURENTIC AI — interactions */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });

  /* ---------- reveals ---------- */
  var targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("is-visible"); });
  }

  /* ---------- counters ---------- */
  function animateCount(el) {
    var raw = el.getAttribute("data-count");
    var suffix = el.getAttribute("data-suffix") || "";
    var target = parseFloat(raw);
    var decimals = (raw.split(".")[1] || "").length;
    var dur = 1300, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) {
      c.textContent = c.getAttribute("data-count") + (c.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- header scrolled state ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScrollHeader = function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScrollHeader, { passive: true });
    onScrollHeader();
  }

  /* ---------- cinematic hero parallax ---------- */
  var heroBg = document.querySelector(".hero-bg img");
  if (heroBg && !reduced) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroBg.style.transform = "translateY(" + (y * 0.22).toFixed(1) + "px) scale(1.05)";
        }
        ticking = false;
      });
    }, { passive: true });
    heroBg.style.transform = "scale(1.05)";
  }

  /* ---------- word-split headline reveals ---------- */
  document.querySelectorAll("[data-split]").forEach(function (el) {
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.innerHTML = "";
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/\s+/).forEach(function (w) {
          if (!w) return;
          var line = document.createElement("span");
          line.className = "wline";
          var inner = document.createElement("span");
          inner.textContent = w;
          line.appendChild(inner);
          el.appendChild(line);
          el.appendChild(document.createTextNode(" "));
        });
      } else if (node.nodeType === 1) {
        var line = document.createElement("span");
        line.className = "wline";
        var inner = document.createElement("span");
        inner.appendChild(node);
        line.appendChild(inner);
        el.appendChild(line);
        el.appendChild(document.createTextNode(" "));
      }
    });
    var spans = el.querySelectorAll(".wline>span");
    spans.forEach(function (s, i) { s.style.transitionDelay = (i * 0.055) + "s"; });
    if (reduced) { el.classList.add("words-in"); return; }
    if ("IntersectionObserver" in window) {
      var wio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("words-in"); wio.unobserve(e.target); }
        });
      }, { threshold: 0.3 });
      wio.observe(el);
    } else { el.classList.add("words-in"); }
  });

  /* ---------- live agent demo ---------- */
  var demo = document.getElementById("agent-demo");
  if (demo) {
    var scenarios = {
      support: [
        ["sys", "New ticket #4821 — “Order arrived damaged, need replacement before Friday.”"],
        ["agent", "Reading order history… <b>repeat customer, 14 orders, high value.</b>"],
        ["agent", "Checking inventory — replacement in stock at nearest warehouse."],
        ["agent", "Drafted reply + expedited replacement order, <b>no charge.</b>"],
        ["gate", "Refund-or-replace above ₹4,000 → routed for one-click human approval."],
        ["done", "Resolved in 3m 41s · full action log saved · CSAT survey queued ✓"]
      ],
      finance: [
        ["sys", "Invoice INV-2207 received from vendor (PDF, 3 pages, 41 line items)."],
        ["agent", "Extracted all fields · matched against <b>PO-1188</b> and goods receipt."],
        ["agent", "39/41 items matched. 2 discrepancies found — price variance on line 12, 18."],
        ["agent", "Drafted discrepancy email to vendor with exact line references."],
        ["gate", "Payment run updated → held for controller sign-off, evidence attached."],
        ["done", "Processed in 1m 58s · zero manual data entry · audit trail complete ✓"]
      ],
      sales: [
        ["sys", "New lead: operations director, mid-size logistics company, webinar signup."],
        ["agent", "Researched company — 240 staff, 3 warehouses, hiring for manual data roles."],
        ["agent", "Scored <b>87/100</b> against your ICP · enriched CRM record with 14 fields."],
        ["agent", "Drafted personalised outreach referencing their warehouse expansion."],
        ["gate", "Outreach email → queued in your rep’s drafts for review, never auto-sent."],
        ["done", "Lead researched, scored & prepped in 2m 12s · rep starts warm ✓"]
      ]
    };
    var body = demo.querySelector(".demo-body");
    var tabs = demo.querySelectorAll(".demo-tabs button");
    var running = 0;

    function renderLine(line, instant, runId, cb) {
      var row = document.createElement("div");
      row.className = "demo-line" + (line[0] === "done" ? " done" : "");
      var who = document.createElement("span");
      var kind = line[0] === "sys" ? "sys" : line[0] === "gate" ? "gate" : "agent";
      who.className = "who who--" + kind;
      who.textContent = line[0] === "sys" ? "event" : line[0] === "gate" ? "gate" : line[0] === "done" ? "agent" : "agent";
      var txt = document.createElement("span");
      txt.className = "txt";
      row.appendChild(who); row.appendChild(txt);
      var gh = body.querySelector(".demo-line.ghost");
      if (gh) { body.insertBefore(row, gh); gh.remove(); }
      else { body.appendChild(row); }
      var html = line[1];
      if (instant) { txt.innerHTML = html; cb && cb(); return; }
      var caret = document.createElement("span"); caret.className = "caret";
      row.appendChild(caret);
      /* type by characters of plain text, then swap in html */
      var plain = html.replace(/<[^>]+>/g, "");
      var i = 0;
      (function tick() {
        if (runId !== running) { return; }
        if (i <= plain.length) {
          txt.textContent = plain.slice(0, i); i += 2;
          setTimeout(tick, 12);
        } else {
          txt.innerHTML = html; caret.remove(); cb && cb();
        }
      })();
    }

    function play(key) {
      running++;
      var runId = running;
      body.innerHTML = "";
      var lines = scenarios[key], idx = 0;
      for (var g = 0; g < lines.length; g++) {
        var gr = document.createElement("div");
        gr.className = "demo-line ghost";
        gr.innerHTML = '<span class="who">····</span><span class="txt"></span>';
        body.appendChild(gr);
      }
      if (reduced) {
        lines.forEach(function (l) { renderLine(l, true, runId); });
        return;
      }
      (function next() {
        if (runId !== running) return;
        if (idx < lines.length) {
          renderLine(lines[idx], false, runId, function () {
            idx++; setTimeout(next, 340);
          });
        }
      })();
    }
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        tabs.forEach(function (t) { t.setAttribute("aria-selected", t === b ? "true" : "false"); });
        play(b.getAttribute("data-scenario"));
      });
    });
    var replay = document.getElementById("demo-replay-btn");
    if (replay) replay.addEventListener("click", function () {
      var active = demo.querySelector('.demo-tabs button[aria-selected="true"]');
      play(active ? active.getAttribute("data-scenario") : "support");
    });
    if ("IntersectionObserver" in window && !reduced) {
      var dio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { play("support"); dio.unobserve(e.target); }
        });
      }, { threshold: 0.3 });
      dio.observe(demo);
    } else { play("support"); }
  }

  /* ---------- use-case explorer ---------- */
  var explorer = document.getElementById("explorer");
  if (explorer) {
    var state = { ind: "all", fn: "all" };
    var cards = explorer.querySelectorAll(".uc");
    var count = document.getElementById("uc-count");
    function apply() {
      var visible = 0;
      cards.forEach(function (c) {
        var inds = (c.getAttribute("data-ind") || "").split(" ");
        var fns = (c.getAttribute("data-fn") || "").split(" ");
        var ok = (state.ind === "all" || inds.indexOf(state.ind) > -1) &&
                 (state.fn === "all" || fns.indexOf(state.fn) > -1);
        c.classList.toggle("hidden", !ok);
        if (ok) visible++;
      });
      if (count) count.innerHTML = "Showing <b>" + visible + "</b> use case" + (visible === 1 ? "" : "s") +
        (state.ind !== "all" || state.fn !== "all" ? " — filtered" : " — all industries, all functions");
    }
    explorer.querySelectorAll("[data-filter-ind] button").forEach(function (b) {
      b.addEventListener("click", function () {
        state.ind = b.getAttribute("data-v");
        b.parentElement.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        apply();
      });
    });
    explorer.querySelectorAll("[data-filter-fn] button").forEach(function (b) {
      b.addEventListener("click", function () {
        state.fn = b.getAttribute("data-v");
        b.parentElement.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        apply();
      });
    });
    apply();
  }

  /* ---------- ROI calculator ---------- */
  var calc = document.getElementById("roi-calc");
  if (calc) {
    var team = document.getElementById("c-team");
    var hours = document.getElementById("c-hours");
    var cost = document.getElementById("c-cost");
    var oTeam = document.getElementById("o-team");
    var oHours = document.getElementById("o-hours");
    var oCost = document.getElementById("o-cost");
    var rHours = document.getElementById("r-hours");
    var rMoney = document.getElementById("r-money");
    var rFte = document.getElementById("r-fte");
    function fmtMoney(n) {
      if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + " Cr";
      if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + " L";
      return "₹" + Math.round(n).toLocaleString("en-IN");
    }
    function fill(el) {
      var p = (el.value - el.min) / (el.max - el.min) * 100;
      el.style.setProperty("--fill", p + "%");
    }
    function update() {
      var t = +team.value, h = +hours.value, c = +cost.value;
      oTeam.textContent = t + " people";
      oHours.textContent = h + " hrs/wk each";
      oCost.textContent = "₹" + c.toLocaleString("en-IN") + "/hr";
      var automatable = 0.65; /* conservative share of repetitive work agents take on */
      var weekly = t * h * automatable;
      var yearlyHours = weekly * 48;
      var yearlyMoney = yearlyHours * c;
      var fte = yearlyHours / 1920;
      rHours.textContent = Math.round(yearlyHours).toLocaleString("en-IN");
      rMoney.textContent = fmtMoney(yearlyMoney);
      rFte.textContent = fte.toFixed(1);
      [team, hours, cost].forEach(fill);
    }
    [team, hours, cost].forEach(function (el) { el.addEventListener("input", update); });
    update();
  }

  /* ---------- contact form → mailto ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var status = document.getElementById("form-status");
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var company = form.company.value.trim();
      var topic = form.topic.value;
      var msg = form.message.value.trim();
      if (!name || !email || !msg) {
        if (status) status.textContent = "Please fill in your name, email, and message.";
        return;
      }
      var bodyTxt = "Name: " + name + "\nEmail: " + email + "\nCompany: " + company + "\nInterest: " + topic + "\n\n" + msg;
      if (status) status.textContent = "Opening your email app… (demo site — nothing is stored)";
      window.location.href = "mailto:hello@aurenticai.com?subject=" +
        encodeURIComponent("Project inquiry — " + (company || name)) + "&body=" + encodeURIComponent(bodyTxt);
    });
  }

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
 = new Date().getFullYear();
})();
