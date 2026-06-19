import { getStore } from "@netlify/blobs";

export default async (req) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const text = await req.text();
    const params = new URLSearchParams(text);
    const data = {};
    for (const [k, v] of params.entries()) {
      data[k] = v;
    }

    // Honeypot check
    if (data["bot-field"]) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
    }

    // Save to Netlify Blobs
    const store = getStore("aplicaciones");
    const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const submission = {
      id,
      created_at: new Date().toISOString(),
      data: {
        name: data.name || "",
        instagram: data.instagram || "",
        phone: (data.prefix || "") + " " + (data.phone || ""),
        email: data.email || "",
        monthly: data.monthly || "",
        goal: data.goal || "",
        country: data.country || "",
        availability: data.availability || "",
        notes: data.notes || "",
      },
    };

    await store.set(id, JSON.stringify(submission));

    return new Response(JSON.stringify({ ok: true, id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Form error:", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
};

export const config = { path: "/api/submit" };
