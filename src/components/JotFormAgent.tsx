import { useEffect } from 'react';

const JotFormAgent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019b8a9ef4a2706a97010c77b5fad0244ed8/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

export default JotFormAgent;
