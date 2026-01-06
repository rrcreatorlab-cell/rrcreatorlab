import { useEffect } from "react";

const SCRIPT_SRC =
  "https://cdn.jotfor.ms/agent/embedjs/019b8a9ef4a2706a97010c77b5fad0244ed8/embed.js";

const STYLE_ID = "jotform-agent-styles";
const SCRIPT_MARKER_ATTR = "data-jotform-agent";
const POP_INTERVAL_MS = 120_000; // 2 minutes

function ensureAgentStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    /* Try to cover JotForm Agent wrapper + any iframe-based widget */
    .jfAgent-wrapper,
    [class*="jfAgent"],
    [class*="JotFormAgent"],
    [id*="jotform-agent"] {
      position: fixed !important;
      bottom: 0 !important;
      right: 0 !important;
      z-index: 2147483647 !important;
    }

    iframe[src*="jotfor.ms/agent"],
    iframe[src*="jotform"],
    iframe[id*="jotform"],
    iframe[class*="jotform"] {
      position: fixed !important;
      bottom: 0 !important;
      right: 0 !important;
      z-index: 2147483647 !important;
    }
  `;

  document.head.appendChild(style);
}

function ensureAgentScript() {
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${SCRIPT_SRC}"], script[${SCRIPT_MARKER_ATTR}="true"]`
  );
  if (existing) return;

  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  // Keep this synchronous so the widget shows ASAP.
  script.async = false;
  script.setAttribute(SCRIPT_MARKER_ATTR, "true");
  document.head.appendChild(script);
}

function forceBottomRight() {
  const apply = (el: HTMLElement) => {
    el.style.position = "fixed";
    el.style.bottom = "0";
    el.style.right = "0";
    el.style.zIndex = "2147483647";
  };

  document
    .querySelectorAll<HTMLElement>(
      ".jfAgent-wrapper, [class*='jfAgent'], [class*='JotFormAgent'], [id*='jotform-agent']"
    )
    .forEach(apply);

  document
    .querySelectorAll<HTMLIFrameElement>(
      "iframe[src*='jotfor.ms/agent'], iframe[src*='jotform'], iframe[id*='jotform'], iframe[class*='jotform']"
    )
    .forEach((frame) => apply(frame));
}

function tryOpenAgent() {
  const selectors = [
    ".jfAgent-wrapper button",
    "[class*='jfAgent'] button",
    "[class*='JotFormAgent'] button",
    "[id*='jotform-agent'] button",
    "button[aria-label*='chat' i]",
    "button[aria-label*='agent' i]",
  ];

  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el instanceof HTMLElement) {
      el.click();
      return true;
    }
  }

  return false;
}

const JotFormAgent = () => {
  useEffect(() => {
    ensureAgentStyles();
    ensureAgentScript();

    // Keep forcing position as the widget mounts/mutates.
    forceBottomRight();
    const observer = new MutationObserver(() => forceBottomRight());
    observer.observe(document.body, { childList: true, subtree: true });

    // Auto pop-out every 2 minutes (icon should still be visible from the start).
    const intervalId = window.setInterval(() => {
      forceBottomRight();
      tryOpenAgent();
    }, POP_INTERVAL_MS);

    return () => {
      // IMPORTANT: do not remove the script in dev (React StrictMode mounts/unmounts effects),
      // otherwise the widget may never finish loading.
      window.clearInterval(intervalId);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default JotFormAgent;
