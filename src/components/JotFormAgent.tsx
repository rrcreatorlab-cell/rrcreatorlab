import { useEffect } from 'react';

const JotFormAgent = () => {
  useEffect(() => {
    // Create the window object for JotForm config
    (window as any).AgentInitializer = (window as any).AgentInitializer || {};
    (window as any).AgentInitializer.init = (window as any).AgentInitializer.init || function(t: any) {
      const e = !1, n = document.createElement("script");
      n.id = t.id, n.async = e, n.type = "module", n.src = "https://agent.jotform.com/019b8a9ef4a2706a97010c77b5fad0244ed8/embed.min.js", 
      n.onload = function() { (window as any).JotFormAgent && (window as any).JotFormAgent.init(t); },
      document.body.appendChild(n);
    };

    // Initialize the agent
    (window as any).AgentInitializer.init({
      id: "019b8a9ef4a2706a97010c77b5fad0244ed8",
      formID: "019b8a9ef4a2706a97010c77b5fad0244ed8",
    });

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.getElementById('019b8a9ef4a2706a97010c77b5fad0244ed8');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      // Remove any JotForm elements
      const jotformElements = document.querySelectorAll('[class*="jotform"], [id*="jotform"]');
      jotformElements.forEach(el => el.remove());
    };
  }, []);

  return null;
};

export default JotFormAgent;
