import { getStore } from "@netlify/blobs";

const ADMIN_TOKEN = "va_admin_stiff200";

export default async (req) => {
  // Auth check
  const auth = req.headers.get("x-admin-token");
  if (auth !== ADMIN_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const store = getStore("aplicaciones");
    const { blobs } = await store.list();

    const submissions = await Promise.all(
      blobs.map(async (b) => {
        const val = await store.get(b.key);
        try { return JSON.parse(val); } catch { return null; }
      })
    );

    const valid = submissions
      .filter(Boolean)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return new Response(JSON.stringify(valid), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const config = { path: "/api/submissions" };
