"use client";

import { useEffect, useRef, useState } from "react";
import { DemoLine, SCENARIOS } from "./scenarios";

type ScenarioKey = keyof typeof SCENARIOS;
const TABS: { key: ScenarioKey; label: string }[] = [
  { key: "support", label: "Customer support" },
  { key: "finance", label: "Finance ops" },
  { key: "sales", label: "Sales research" },
];

/**
 * Ported near-verbatim from js/main.js's imperative DOM version rather
 * than rewritten as declarative React state — the original types
 * character-by-character on ~12ms ticks, which is exactly the kind of
 * effect that's easy to subtly break in translation. Keeping the same
 * imperative approach (refs instead of getElementById) preserves the
 * exact behavior and timing the live site already has.
 */
export function AgentDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(0);
  const [active, setActive] = useState<ScenarioKey>("support");

  function renderLine(line: DemoLine, instant: boolean, runId: number, cb?: () => void) {
    const body = bodyRef.current;
    if (!body) return;
    const [kind, html] = line;

    const row = document.createElement("div");
    row.className = "demo-line" + (kind === "done" ? " done" : "");
    const who = document.createElement("span");
    const whoKind = kind === "sys" ? "sys" : kind === "gate" ? "gate" : "agent";
    who.className = "who who--" + whoKind;
    who.textContent = kind === "sys" ? "event" : kind === "gate" ? "gate" : "agent";
    const txt = document.createElement("span");
    txt.className = "txt";
    row.appendChild(who);
    row.appendChild(txt);

    const ghost = body.querySelector(".demo-line.ghost");
    if (ghost) {
      body.insertBefore(row, ghost);
      ghost.remove();
    } else {
      body.appendChild(row);
    }

    if (instant) {
      txt.innerHTML = html;
      cb?.();
      return;
    }

    const caret = document.createElement("span");
    caret.className = "caret";
    row.appendChild(caret);

    const plain = html.replace(/<[^>]+>/g, "");
    let i = 0;
    const tick = () => {
      if (runId !== runningRef.current) return;
      if (i <= plain.length) {
        txt.textContent = plain.slice(0, i);
        i += 2;
        setTimeout(tick, 12);
      } else {
        txt.innerHTML = html;
        caret.remove();
        cb?.();
      }
    };
    tick();
  }

  function play(key: ScenarioKey) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    runningRef.current += 1;
    const runId = runningRef.current;
    const body = bodyRef.current;
    if (!body) return;
    body.innerHTML = "";
    const lines = SCENARIOS[key];

    for (let g = 0; g < lines.length; g++) {
      const gr = document.createElement("div");
      gr.className = "demo-line ghost";
      gr.innerHTML = '<span class="who">····</span><span class="txt"></span>';
      body.appendChild(gr);
    }

    if (reduced) {
      lines.forEach((l) => renderLine(l, true, runId));
      return;
    }

    let idx = 0;
    const next = () => {
      if (runId !== runningRef.current) return;
      if (idx < lines.length) {
        renderLine(lines[idx], false, runId, () => {
          idx++;
          setTimeout(next, 340);
        });
      }
    };
    next();
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;

    if ("IntersectionObserver" in window && !reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              play("support");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      io.observe(root);
      return () => io.disconnect();
    }
    play("support");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTabClick(key: ScenarioKey) {
    setActive(key);
    play(key);
  }

  function handleReplay() {
    play(active);
  }

  return (
    <div className="demo reveal" id="agent-demo" ref={rootRef} aria-label="Interactive demo: watch a simulated Foxtheta agent complete a task">
      <div className="demo-bar">
        <span className="dot" aria-hidden="true" />
        <b>Foxtheta agent · live simulation</b>
        <span>audited · gated · logged</span>
      </div>
      <div className="demo-tabs" role="tablist" aria-label="Demo scenarios">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            data-scenario={tab.key}
            aria-selected={active === tab.key}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="demo-body" ref={bodyRef} aria-live="off" />
      <p className="demo-replay">
        simulation ·{" "}
        <button type="button" onClick={handleReplay}>
          replay ↺
        </button>
      </p>
    </div>
  );
}
