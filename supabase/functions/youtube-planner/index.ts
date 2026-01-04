import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { niche, goal } = await req.json();
    
    if (!niche || !goal) {
      return new Response(
        JSON.stringify({ error: "Niche and goal are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a YouTube growth strategist and automation expert. Your task is to create a complete YouTube content automation plan based on the user's niche and goal.

REQUIREMENTS:
- Ideas must be clickable and practical
- Titles must be SEO-friendly with keywords
- Descriptions must be simple and engaging
- Plan should work for beginners and small creators
- Content should be suitable for outsourcing or automation

OUTPUT FORMAT (STRICT JSON):
{
  "videoIdeas": [
    { "id": 1, "idea": "..." },
    ...
  ],
  "seoTitles": [
    { "id": 1, "title": "..." },
    ...
  ],
  "descriptions": [
    { "id": 1, "description": "..." },
    ...
  ],
  "weeklyPlan": [
    { "day": "Monday", "contentType": "Short", "focus": "..." },
    { "day": "Tuesday", "contentType": "Long", "focus": "..." },
    ...
  ]
}

Generate 15-20 video ideas, 10 SEO titles, 5 sample descriptions, and a full 7-day weekly upload plan.`;

    const userPrompt = `Channel Niche: ${niche}
Primary Goal: ${goal}

Create a complete YouTube content automation plan following the exact JSON format specified.`;

    console.log("Calling Lovable AI Gateway for niche:", niche, "goal:", goal);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("Successfully generated content plan");

    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch {
      console.error("Failed to parse AI response as JSON:", content);
      throw new Error("Invalid JSON response from AI");
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in youtube-planner function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
