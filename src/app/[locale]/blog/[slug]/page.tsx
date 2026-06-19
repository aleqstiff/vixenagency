import type { Metadata } from "next";
import Link from "next/link";
import {
  LOCALES, type Locale, BASE_URL,
  LOCALE_COUNTRIES, COUNTRIES, waLink, waMsg
} from "@/lib/config";
import { POSTS } from "@/lib/blog";
import { t } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";
import Popup from "@/components/Popup";

export async function generateStaticParams() {
  return POSTS.map(p => ({ locale: p.locale, slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = POSTS.find(p => p.locale === locale && p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | VixenAgency`,
    description: post.excerpt,
    keywords: post.kw,
    alternates: { canonical: `${BASE_URL}/${locale}/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/${locale}/blog/${slug}/`,
      type: "article",
    },
  };
}

// ── Visual markdown renderer ───────────────────────────────────
function renderContent(content: string, color = "#00e5cc") {
  const blocks = content.split("\n\n").filter(Boolean);
  const nodes: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    // H2: **Title Only** on its own line
    const h2Match = block.match(/^\*\*(.+)\*\*$/);
    if (h2Match) {
      nodes.push(
        <h2 key={i} style={{
          fontSize: "clamp(1.3rem,2.5vw,1.7rem)", fontWeight: 900,
          color: "#fff", letterSpacing: "-0.5px",
          margin: "40px 0 12px", lineHeight: 1.2,
          borderLeft: `3px solid ${color}`, paddingLeft: 16,
        }}>
          {h2Match[1]}
        </h2>
      );
      return;
    }

    // Numbered list: lines starting with 1. 2. etc
    if (/^\d+\.\s/.test(block)) {
      const items = block.split("\n").filter(l => /^\d+\.\s/.test(l));
      nodes.push(
        <ol key={i} style={{ margin: "20px 0", paddingLeft: 0, listStyle: "none", display: "grid", gap: 10 }}>
          {items.map((item, j) => {
            const text = item.replace(/^\d+\.\s/, "");
            return (
              <li key={j} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "12px 16px", borderRadius: 12,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: `${color}20`, color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: 13,
                }}>
                  {j + 1}
                </span>
                <span style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, paddingTop: 2 }}>
                  {renderInline(text, color)}
                </span>
              </li>
            );
          })}
        </ol>
      );
      return;
    }

    // Bullet list: lines starting with -
    if (/^-\s/.test(block)) {
      const items = block.split("\n").filter(l => /^-\s/.test(l));
      nodes.push(
        <ul key={i} style={{ margin: "20px 0", paddingLeft: 0, listStyle: "none", display: "grid", gap: 8 }}>
          {items.map((item, j) => {
            const text = item.replace(/^-\s/, "");
            return (
              <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 3,
                  background: `${color}20`, border: `1px solid ${color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65 }}>
                  {renderInline(text, color)}
                </span>
              </li>
            );
          })}
        </ul>
      );
      return;
    }

    // Short stat/pull quote: starts with a number + % or € (like "95% de...")
    if (/^[0-9+€$]/.test(block) && block.length < 120) {
      nodes.push(
        <div key={i} style={{
          margin: "24px 0",
          padding: "20px 24px",
          borderRadius: 16,
          background: `linear-gradient(135deg, ${color}08, rgba(124,58,237,0.06))`,
          border: `1px solid ${color}25`,
        }}>
          <p style={{
            fontSize: "clamp(1rem,2vw,1.15rem)", color: "#fff",
            fontWeight: 700, lineHeight: 1.5,
          }}>
            {renderInline(block, color)}
          </p>
        </div>
      );
      return;
    }

    // Normal paragraph with inline formatting
    nodes.push(
      <p key={i} style={{
        color: "var(--muted)", lineHeight: 1.8, fontSize: 15,
        marginBottom: 16,
      }}>
        {renderInline(block, color)}
      </p>
    );
  });

  return nodes;
}

function renderInline(text: string, color: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: "#fff", fontWeight: 700 }}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const post = POSTS.find(p => p.locale === locale && p.slug === slug);
  if (!post) return <div style={{ color: "#fff", padding: 40 }}>404</div>;

  const ck = (LOCALE_COUNTRIES[l] ?? [])[0];
  const c = ck ? COUNTRIES[ck] : COUNTRIES.espana;
  const wa = waMsg(l);
  const href = waLink(wa);
  const navPosts = POSTS.filter(p => p.locale === l).slice(0, 6).map(p => ({ slug: p.slug, title: p.title }));
  const related = POSTS.filter(p => p.locale === l && p.slug !== slug).slice(0, 3);

  const accentColor = "#00e5cc";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.kw.join(", "),
    author: { "@type": "Organization", name: "VixenAgency", url: BASE_URL },
    publisher: { "@type": "Organization", name: "VixenAgency", url: BASE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MegaNav locale={l} posts={navPosts} />
      <Popup locale={l} href={href} />

      {/* ── Article hero ───────────────────────────────── */}
      <div style={{ background: "var(--bg2)", padding: "52px 20px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <Link href={`/${l}/blog/`}
              style={{ fontSize: 12, color: "var(--muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              ← Blog
            </Link>
            <span style={{ color: "var(--muted2)", fontSize: 12 }}>·</span>
            <span style={{
              fontSize: 10, fontWeight: 700, color: accentColor,
              textTransform: "uppercase", letterSpacing: "0.1em",
              background: `${accentColor}15`, border: `1px solid ${accentColor}30`,
              padding: "3px 10px", borderRadius: 999,
            }}>
              {post.kw[0]}
            </span>
            <span style={{ color: "var(--muted2)", fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: "var(--muted2)" }}>{post.date}</span>
          </div>

          <h1 style={{
            fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900,
            color: "#fff", lineHeight: 1.18, letterSpacing: "-1px", marginBottom: 16,
          }}>
            {post.title}
          </h1>

          <p style={{
            fontSize: 17, color: "var(--muted)", lineHeight: 1.7,
            fontStyle: "italic", borderLeft: `3px solid ${accentColor}`,
            paddingLeft: 16,
          }}>
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* ── Article body ───────────────────────────────── */}
      <article style={{ padding: "52px 20px 80px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {renderContent(post.content, accentColor)}

          {/* In-article CTA */}
          <div style={{
            margin: "52px 0 0",
            padding: "36px",
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(0,229,204,0.06), rgba(124,58,237,0.04))",
            border: "1px solid rgba(0,229,204,0.2)",
            textAlign: "center",
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
              VixenAgency
            </p>
            <h3 style={{ fontWeight: 900, color: "#fff", fontSize: "clamp(1.2rem,2.5vw,1.6rem)", marginBottom: 10, letterSpacing: "-0.5px" }}>
              {l === "es" ? "¿Lista para aplicar esto?" :
               l === "en" ? "Ready to apply this?" :
               l === "fr" ? "Prête à appliquer cela ?" :
               l === "de" ? "Bereit, das anzuwenden?" :
               l === "it" ? "Pronta ad applicarlo?" :
               "Pronta para aplicar isso?"}
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
              {l === "es" ? "VixenAgency gestiona todo esto por ti. Consulta gratuita, sin compromiso." :
               l === "en" ? "VixenAgency handles all of this for you. Free consultation, no commitment." :
               l === "fr" ? "VixenAgency gère tout ça pour vous. Consultation gratuite, sans engagement." :
               l === "de" ? "VixenAgency übernimmt das alles für dich. Kostenlos, unverbindlich." :
               l === "it" ? "VixenAgency gestisce tutto per te. Consulenza gratuita, senza impegno." :
               "VixenAgency cuida de tudo por você. Consulta gratuita, sem compromisso."}
            </p>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-cta" style={{ fontSize: 15, padding: "14px 32px" }}>
              {t(l, "cta_btn")}
            </a>
          </div>
        </div>
      </article>

      {/* ── Related posts ─────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ padding: "48px 20px 64px", background: "var(--bg2)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
              {l === "es" ? "Sigue leyendo" : l === "en" ? "Keep reading" : l === "fr" ? "Continuer à lire" : l === "de" ? "Weiterlesen" : "Continua a leggere"}
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{
                    padding: "18px 22px", display: "flex",
                    alignItems: "center", gap: 16, transition: "border-color .2s",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: "rgba(0,229,204,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h12M9 4l4 4-4 4" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 11, color: "var(--muted2)", marginBottom: 4 }}>{p.date}</p>
                      <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 14, lineHeight: 1.35 }}>{p.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
