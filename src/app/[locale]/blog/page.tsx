import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, type Locale, BASE_URL, LOCALE_COUNTRIES, COUNTRIES, waLink, waMsg } from "@/lib/config";
import { POSTS } from "@/lib/blog";
import { t } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const titles: Record<Locale, string> = {
    es: "Blog Agencia OnlyFans — Guías y Estrategias 2026 | VixenAgency",
    en: "OnlyFans Agency Blog — Guides & Strategies 2026 | VixenAgency",
    fr: "Blog Agence OnlyFans — Guides & Stratégies 2026 | VixenAgency",
    de: "OnlyFans Agentur Blog — Ratgeber 2026 | VixenAgency",
    it: "Blog Agenzia OnlyFans — Guide 2026 | VixenAgency",
    pt: "Blog Agência OnlyFans — Guias 2026 | VixenAgency",
  };
  return { title: titles[l], alternates: { canonical: `${BASE_URL}/${l}/blog/` } };
}

const CAT_COLORS: Record<string, string> = {
  "Ingresos": "#00e5cc", "Income": "#00e5cc", "Revenus": "#00e5cc", "Einkommen": "#00e5cc",
  "Estrategia": "#7c3aed", "Strategy": "#7c3aed", "Stratégie": "#7c3aed", "Strategie": "#7c3aed",
  "Agencias": "#f59e0b", "Agencies": "#f59e0b", "Agences": "#f59e0b", "Agenturen": "#f59e0b",
  "Servicios": "#10b981", "Services": "#10b981",
};

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const posts = POSTS.filter(p => p.locale === l);
  const ck = (LOCALE_COUNTRIES[l] ?? [])[0];
  const waHref = waLink(waMsg(l));
  const navPosts = posts.slice(0, 6).map(p => ({ slug: p.slug, title: p.title }));

  const HERO = {
    es: { h1: "Blog & Recursos", sub: "Guías reales, estrategias probadas y datos del sector para creadoras de OnlyFans" },
    en: { h1: "Blog & Resources", sub: "Real guides, proven strategies and industry data for OnlyFans creators" },
    fr: { h1: "Blog & Ressources", sub: "Guides réels, stratégies prouvées et données du secteur pour créatrices OnlyFans" },
    de: { h1: "Blog & Ressourcen", sub: "Echte Ratgeber, bewährte Strategien und Branchendaten für OnlyFans-Creator" },
    it: { h1: "Blog & Risorse", sub: "Guide reali, strategie provate e dati del settore per creator OnlyFans" },
    pt: { h1: "Blog & Recursos", sub: "Guias reais, estratégias comprovadas e dados do setor para creators OnlyFans" },
  };

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <MegaNav locale={l} posts={navPosts} />
{/* ── Blog hero ───────────────────────────────── */}
      <div style={{ background: "var(--bg2)", padding: "52px 20px 44px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href={`/${l}/`} style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none" }}>← Home</Link>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", margin: "16px 0 10px" }}>
            {HERO[l].h1}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 540, lineHeight: 1.65 }}>
            {HERO[l].sub}
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
            {["#00e5cc","#7c3aed","#f59e0b","#10b981"].map((c,i) => (
              <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" }} />
            ))}
            <span style={{ fontSize: 12, color: "var(--muted2)", marginLeft: 4 }}>{posts.length} artículos</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "48px 20px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* ── Featured post ─────────────────────────── */}
          {featured && (
            <Link href={`/${l}/blog/${featured.slug}/`} style={{ textDecoration: "none", display: "block", marginBottom: 32 }}>
              <article style={{
                borderRadius: 20, overflow: "hidden",
                background: "linear-gradient(135deg, rgba(0,229,204,0.06), rgba(124,58,237,0.04))",
                border: "1px solid rgba(0,229,204,0.2)",
                padding: "32px 36px",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--teal),#7c3aed)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: "var(--teal)", textTransform: "uppercase",
                    letterSpacing: "0.1em", background: "rgba(0,229,204,0.1)",
                    border: "1px solid rgba(0,229,204,0.25)", padding: "3px 10px", borderRadius: 999,
                  }}>
                    Destacado
                  </span>
                  <span style={{ fontSize: 12, color: "var(--muted2)" }}>{featured.date}</span>
                </div>
                <h2 style={{
                  fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, color: "#fff",
                  letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 12,
                }}>
                  {featured.title}
                </h2>
                <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65, maxWidth: 560 }}>
                  {featured.excerpt}
                </p>
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: "var(--teal)", fontSize: 13, fontWeight: 700 }}>
                  {l==="es"?"Leer artículo":l==="en"?"Read article":l==="fr"?"Lire l'article":l==="de"?"Artikel lesen":"Leggi articolo"}
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </article>
            </Link>
          )}

          {/* ── Rest of posts grid ─────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
            {rest.map(p => {
              const catColor = CAT_COLORS[p.kw[0]] ?? "var(--teal)";
              return (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration: "none" }}>
                  <article className="card" style={{
                    padding: "22px 24px", height: "100%",
                    display: "flex", flexDirection: "column",
                    position: "relative", overflow: "hidden",
                    transition: "border-color .2s, transform .2s",
                  }}
>
                    {/* Accent top bar */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${catColor},transparent)` }} />

                    {/* Meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{
                        fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                        color: catColor, background: `${catColor}15`,
                        border: `1px solid ${catColor}30`, padding: "2px 8px", borderRadius: 999,
                      }}>
                        {p.kw[0]}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--muted2)" }}>{p.date}</span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontWeight: 800, color: "#fff", fontSize: "clamp(14px,1.5vw,16px)",
                      lineHeight: 1.35, marginBottom: 10, flex: 1, letterSpacing: "-0.2px",
                    }}>
                      {p.title}
                    </h2>

                    {/* Excerpt — max 2 lines */}
                    <p style={{
                      color: "var(--muted)", fontSize: 13, lineHeight: 1.55, marginBottom: 14,
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}>
                      {p.excerpt}
                    </p>

                    {/* Read link */}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, color: catColor, fontSize: 12, fontWeight: 700 }}>
                      {l==="es"?"Leer":l==="en"?"Read":l==="fr"?"Lire":l==="de"?"Lesen":"Leggi"}
                      <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
