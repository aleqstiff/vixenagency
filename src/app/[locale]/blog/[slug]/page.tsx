import type { Metadata } from "next";
import Link from "next/link";
import {
  LOCALES, type Locale, BASE_URL,
  LOCALE_COUNTRIES, COUNTRIES, waLink, waMsg
, smartTitle } from "@/lib/config";
import { POSTS, postImage } from "@/lib/blog";
import { t } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";

export async function generateStaticParams() {
  return POSTS.map(p => ({ locale: p.locale, slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = POSTS.find(p => p.locale === locale && p.slug === slug);
  if (!post) return {};
  return {
    title: smartTitle(post.title),
    description: post.excerpt,
    keywords: post.kw,
    alternates: { canonical: `${BASE_URL}/${locale}/blog/${slug}/`, languages: { [locale]: `${BASE_URL}/${locale}/blog/${slug}/`, "x-default": `${BASE_URL}/${locale}/blog/${slug}/` } },
    openGraph: {
      title: post.title, description: post.excerpt,
      url: `${BASE_URL}/${locale}/blog/${slug}/`, type: "article",
      images: [{ url: postImage(post) }],
    },
  };
}

const PINK = "#c4699a";

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: "var(--dark)", fontWeight: 800 }}>{part}</strong>
      : <span key={i}>{part}</span>
  );
}

function renderContent(content: string) {
  const blocks = content.split("\n\n").filter(Boolean);
  const nodes: React.ReactNode[] = [];

  blocks.forEach((block, i) => {
    // H2
    const h2 = block.match(/^\*\*(.+)\*\*$/);
    if (h2) {
      nodes.push(
        <h2 key={i} style={{
          fontSize: "clamp(1.3rem,2.6vw,1.8rem)", fontWeight: 900,
          color: "var(--dark)", letterSpacing: "-0.5px",
          margin: "44px 0 14px", lineHeight: 1.2,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ width: 4, height: 26, borderRadius: 2, background: `linear-gradient(${PINK},#d985b0)`, flexShrink: 0 }} />
          {h2[1]}
        </h2>
      );
      return;
    }
    // Numbered list
    if (/^\d+\.\s/.test(block)) {
      const items = block.split("\n").filter(l => /^\d+\.\s/.test(l));
      nodes.push(
        <ol key={i} style={{ margin: "22px 0", padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
          {items.map((item, j) => (
            <li key={j} style={{
              display: "flex", gap: 14, alignItems: "flex-start",
              padding: "16px 18px", borderRadius: 14,
              background: "var(--bg2)", border: "1px solid var(--border)",
            }}>
              <span style={{
                width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                background: `${PINK}18`, color: PINK,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 14,
              }}>{j + 1}</span>
              <span style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65, paddingTop: 3 }}>
                {renderInline(item.replace(/^\d+\.\s/, ""))}
              </span>
            </li>
          ))}
        </ol>
      );
      return;
    }
    // Bullet list
    if (/^-\s/.test(block)) {
      const items = block.split("\n").filter(l => /^-\s/.test(l));
      nodes.push(
        <ul key={i} style={{ margin: "20px 0", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
          {items.map((item, j) => (
            <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                background: `${PINK}15`, border: `1px solid ${PINK}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="9" height="9" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l2 2 3-3" stroke={PINK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65 }}>
                {renderInline(item.replace(/^-\s/, ""))}
              </span>
            </li>
          ))}
        </ul>
      );
      return;
    }
    // Pull stat
    if (/^[0-9+€$]/.test(block) && block.length < 120) {
      nodes.push(
        <div key={i} style={{
          margin: "28px 0", padding: "22px 26px", borderRadius: 16,
          background: `linear-gradient(135deg, ${PINK}0d, rgba(176,138,90,0.05))`,
          border: `1px solid ${PINK}22`,
        }}>
          <p style={{ fontSize: "clamp(1.05rem,2vw,1.2rem)", color: "var(--dark)", fontWeight: 700, lineHeight: 1.5 }}>
            {renderInline(block)}
          </p>
        </div>
      );
      return;
    }
    // Paragraph
    nodes.push(
      <p key={i} style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: 16, marginBottom: 18 }}>
        {renderInline(block)}
      </p>
    );
  });
  return nodes;
}

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const post = POSTS.find(p => p.locale === locale && p.slug === slug);
  if (!post) return <div style={{ padding: 40 }}>404</div>;

  const href = waLink(waMsg(l));
  const navPosts = POSTS.filter(p => p.locale === l).slice(0, 6).map(p => ({ slug: p.slug, title: p.title }));
  const related = POSTS.filter(p => p.locale === l && p.slug !== slug).slice(0, 3);
  const img = postImage(post);

  // Reading time estimate
  const words = post.content.split(/\s+/).length;
  const readMin = Math.max(2, Math.round(words / 200));
  const readLabel: Record<string,string> = { es:"min de lectura", en:"min read", fr:"min de lecture", de:"Min. Lesezeit", it:"min di lettura", pt:"min de leitura" };

  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${l}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/${l}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/${l}/blog/${slug}/` },
    ],
  };
  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: post.title, description: post.excerpt, datePublished: post.date,
    image: img, keywords: post.kw.join(", "),
    author: { "@type": "Organization", name: "Only Sweety Agency", url: BASE_URL },
    publisher: { "@type": "Organization", name: "Only Sweety Agency", url: BASE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <MegaNav locale={l} posts={navPosts} />

      {/* ── Hero with image ── */}
      <div style={{ background: "var(--bg2)", paddingTop: 32 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
            <Link href={`/${l}/blog/`} style={{ fontSize: 13, color: "var(--pink)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>← Blog</Link>
            <span style={{ color: "var(--muted2)", fontSize: 12 }}>·</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: PINK, textTransform: "uppercase", letterSpacing: "0.1em", background: `${PINK}12`, border: `1px solid ${PINK}28`, padding: "3px 10px", borderRadius: 999 }}>{post.kw[0]}</span>
            <span style={{ color: "var(--muted2)", fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: "var(--muted2)" }}>{post.date}</span>
            <span style={{ color: "var(--muted2)", fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: "var(--muted2)" }}>⏱ {readMin} {readLabel[l] ?? "min"}</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 900, color: "var(--dark)", lineHeight: 1.16, letterSpacing: "-1px", marginBottom: 16 }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65, marginBottom: 28 }}>
            {post.excerpt}
          </p>
        </div>
        {/* Header image */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 40px" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "21/9", boxShadow: "0 16px 48px rgba(196,105,154,0.15)", position: "relative" }}>
            <img src={img} alt={post.title} width={900} height={420}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,16,24,0.25), transparent 50%)" }}/>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <article style={{ padding: "44px 20px 72px", background: "#fff" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {renderContent(post.content)}

          {/* CTA */}
          <div style={{ margin: "52px 0 0", padding: "40px 36px", borderRadius: 24, background: "linear-gradient(135deg, var(--bg2), var(--bg3))", border: `1px solid ${PINK}22`, textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 240, height: 240, borderRadius: "50%", background: `${PINK}12`, filter: "blur(50px)", pointerEvents: "none" }}/>
            <p style={{ fontSize: 11, fontWeight: 700, color: PINK, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10, position: "relative" }}>Only Sweety Agency</p>
            <h3 style={{ fontWeight: 900, color: "var(--dark)", fontSize: "clamp(1.3rem,2.5vw,1.7rem)", marginBottom: 12, letterSpacing: "-0.5px", position: "relative" }}>
              {l === "es" ? "¿Lista para aplicar esto?" : l === "en" ? "Ready to apply this?" : l === "fr" ? "Prête à appliquer cela ?" : l === "de" ? "Bereit, das anzuwenden?" : l === "it" ? "Pronta ad applicarlo?" : "Pronta para aplicar isso?"}
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 26, position: "relative", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
              {l === "es" ? "Only Sweety Agency gestiona todo esto por ti. Análisis gratuito, sin compromiso." : l === "en" ? "Only Sweety Agency handles all of this for you. Free analysis, no commitment." : l === "fr" ? "Only Sweety Agency gère tout ça pour vous. Analyse gratuite, sans engagement." : l === "de" ? "Only Sweety Agency übernimmt das alles für dich. Kostenlos, unverbindlich." : l === "it" ? "Only Sweety Agency gestisce tutto per te. Analisi gratuita, senza impegno." : "Only Sweety Agency cuida de tudo por você. Análise gratuita, sem compromisso."}
            </p>
            <a href={`/${l}/#form`} className="btn btn-rose" style={{ fontSize: 15, padding: "15px 36px", position: "relative" }}>
              {t(l, "cta_btn")}
            </a>
          </div>
        </div>
      </article>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section style={{ padding: "52px 20px 72px", background: "var(--bg2)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: PINK, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 24 }}>
              {l === "es" ? "Sigue leyendo" : l === "en" ? "Keep reading" : l === "fr" ? "Continuer à lire" : l === "de" ? "Weiterlesen" : l === "it" ? "Continua a leggere" : "Continue lendo"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration: "none" }}>
                  <article className="card" style={{ overflow: "hidden", height: "100%" }}>
                    <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                      <img src={postImage(p)} alt={p.title} width={400} height={225} loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                    </div>
                    <div style={{ padding: "16px 18px" }}>
                      <p style={{ fontSize: 11, color: "var(--muted2)", marginBottom: 6 }}>{p.date}</p>
                      <h3 style={{ fontWeight: 700, color: "var(--dark)", fontSize: 15, lineHeight: 1.4 }}>{p.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
