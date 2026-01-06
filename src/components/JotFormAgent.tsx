import { useEffect } from 'react';

const JotFormAgent = () => {
  useEffect(() => {
    // Add custom styles for positioning
    const style = document.createElement('style');
    style.id = 'jotform-agent-styles';
    style.textContent = `
      [class*="JotFormAgent"],
      [id*="jotform-agent"],
      .jfAgent-wrapper,
      [class*="jfAgent"] {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 9999 !important;
      }
    `;
    document.head.appendChild(style);

    // Load the JotForm script
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019b8a9ef4a2706a97010c77b5fad0244ed8/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Auto-pop out every 4 minutes (240000ms)
    const popOutInterval = setInterval(() => {
      // Try to find and click the JotForm agent button to open it
      const agentButton = document.querySelector('[class*="jfAgent"][class*="button"], [class*="JotFormAgent"] button, [id*="jotform-agent"] button, .jfAgent-wrapper button');
      if (agentButton && agentButton instanceof HTMLElement) {
        agentButton.click();
      }
    }, 240000); // 4 minutes

    return () => {
      script.remove();
      const styleEl = document.getElementById('jotform-agent-styles');
      if (styleEl) styleEl.remove();
      clearInterval(popOutInterval);
      // Clean up JotForm elements
      const jotformElements = document.querySelectorAll('[class*="jotform"], [id*="jotform"], [class*="JotForm"], .jfAgent-wrapper, [class*="jfAgent"]');
      jotformElements.forEach(el => el.remove());
    };
  }, []);

  return null;
};

export default JotFormAgent;
