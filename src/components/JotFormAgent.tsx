import { useEffect } from "react";

const SCRIPT_SRC =
  "https://cdn.jotfor.ms/agent/embedjs/019b8a9ef4a2706a97010c77b5fad0244ed8/embed.js";

const JotFormAgent = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
};

export default JotFormAgent;
