import { serve } from "https://deno.land/std/http/server.ts";

const API_KEY = "AIzaSyBMafCsJzHbG8aDGKiTRwW5WGanDGczw00";

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    const prompt =
      "Answer only Real or Fake for this news: " + text;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Unknown";

    return new Response(
      JSON.stringify({ result }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: corsHeaders }
    );
  }
});