import { useEffect } from 'react';

const JotFormAgent = () => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="cdn.jotfor.ms/agent/embedjs"]');
    if (existingScript) return;

    // Create and append the JotForm agent script
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019b8a9ef4a2706a97010c77b5fad0244ed8/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[src*="cdn.jotfor.ms/agent/embedjs"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      // Remove any JotForm elements
      const jotformElements = document.querySelectorAll('[class*="jotform"], [id*="jotform"], [class*="JotForm"]');
      jotformElements.forEach(el => el.remove());
    };
  }, []);

  return null;
};

export default JotFormAgent;
