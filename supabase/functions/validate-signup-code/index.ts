import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const code = typeof body?.code === "string" ? body.code : "";

    if (!code || code.length > 200) {
      return new Response(JSON.stringify({ valid: false }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const expected = Deno.env.get("SIGNUP_CODE") ?? "";

    // Constant-time comparison
    const enc = new TextEncoder();
    const a = enc.encode(code);
    const b = enc.encode(expected);
    let valid = a.length === b.length && a.length > 0;
    const len = Math.max(a.length, b.length, 1);
    let diff = a.length ^ b.length;
    for (let i = 0; i < len; i++) {
      diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
    }
    valid = valid && diff === 0;

    return new Response(JSON.stringify({ valid }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ valid: false }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});