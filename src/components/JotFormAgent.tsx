import { useEffect } from 'react';

const JotFormAgent = () => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="cdn.jotfor.ms/agent/embedjs/019b8a9ef4a2706a97010c77b5fad0244ed8"]');
    if (existingScript) return;

    // Add custom styles to ensure proper positioning
    const style = document.createElement('style');
    style.id = 'jotform-agent-styles';
    style.textContent = `
      [class*="JotFormAgent"], 
      [id*="jotform-agent"],
      .jfAgent-wrapper {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 9999 !important;
      }
    `;
    document.head.appendChild(style);

    // Create and append the JotForm agent script
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019b8a9ef4a2706a97010c77b5fad0244ed8/embed.js';
    script.async = false; // Load synchronously for immediate display
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[src*="cdn.jotfor.ms/agent/embedjs/019b8a9ef4a2706a97010c77b5fad0244ed8"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      const styleToRemove = document.getElementById('jotform-agent-styles');
      if (styleToRemove) {
        styleToRemove.remove();
      }
      // Remove any JotForm elements
      const jotformElements = document.querySelectorAll('[class*="jotform"], [id*="jotform"], [class*="JotForm"], .jfAgent-wrapper');
      jotformElements.forEach(el => el.remove());
    };
  }, []);

  return null;
};

export default JotFormAgent;
