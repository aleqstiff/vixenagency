const KEY = "91183137523ad1eb29e6f6bef8e8a75a";
const HOST = "onlysweety.com";

export default async () => {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const smRes = await fetch(`https://${HOST}/sitemap.xml`, { signal: ctrl.signal });
    const xml = await smRes.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      signal: ctrl.signal,
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: urls,
      }),
    });

    clearTimeout(timer);
    return new Response(JSON.stringify({
      ok: res.ok, status: res.status, submitted: urls.length,
      note: "200/202 = aceptado por IndexNow (Bing, Yandex, Seznam, Naver)",
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500 });
  }
};

export const config = { path: "/api/indexnow" };
