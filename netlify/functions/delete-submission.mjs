import { getStore } from "@netlify/blobs";

const ADMIN_TOKEN = "va_admin_stiff200";

export default async (req) => {
  const auth = req.headers.get("x-admin-token");
  if (auth !== ADMIN_TOKEN) return new Response("Unauthorized", { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  try {
    const store = getStore("aplicaciones");
    await store.delete(id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const config = { path: "/api/delete-submission" };
