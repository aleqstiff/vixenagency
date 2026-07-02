import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, type Locale, BASE_URL , langAlternates } from "@/lib/config";
import { POSTS, postImage } from "@/lib/blog";
import MegaNav from "@/components/MegaNav";

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const titles: Record<Locale, string> = {
    es: "Blog Agencia OnlyFans — Guías y Estrategias 2026 | Only Sweety",
    en: "OnlyFans Agency Blog — Guides & Strategies 2026 | Only Sweety",
    fr: "Blog Agence OnlyFans — Guides & Stratégies 2026 | Only Sweety",
    de: "OnlyFans Agentur Blog — Ratgeber 2026 | Only Sweety",
    it: "Blog Agenzia OnlyFans — Guide 2026 | Only Sweety",
    pt: "Blog Agência OnlyFans — Guias 2026 | Only Sweety",
  };
  const descs: Record<Locale,string> = {
    es: "Guías reales y estrategias probadas sobre OnlyFans: cuánto se gana, cómo empezar, marketing, PPV y más.",
    en: "Real guides and proven OnlyFans strategies: how much you earn, how to start, marketing, PPV and more.",
    fr: "Guides réels et stratégies OnlyFans : combien on gagne, comment commencer, marketing, PPV et plus.",
    de: "Echte Ratgeber und bewährte OnlyFans-Strategien: Einnahmen, Einstieg, Marketing, PPV und mehr.",
    it: "Guide reali e strategie OnlyFans: quanto si guadagna, come iniziare, marketing, PPV e altro.",
    pt: "Guias reais e estratégias OnlyFans: quanto se ganha, como começar, marketing, PPV e mais.",
  };
  return { title: titles[l], description: descs[l], alternates: { canonical: `${BASE_URL}/${l}/blog/`, languages: langAlternates(loc => `/${loc}/blog/`) } };
}

const PINK = "#c4699a";

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const posts = POSTS.filter(p => p.locale === l);
  const navPosts = posts.slice(0, 6).map(p => ({ slug: p.slug, title: p.title }));

  const HERO: Record<Locale,{h1:string;sub:string;count:string}> = {
    es: { h1: "Blog & Recursos", sub: "Guías reales, estrategias probadas y datos del sector para creadoras de OnlyFans", count: "artículos" },
    en: { h1: "Blog & Resources", sub: "Real guides, proven strategies and industry data for OnlyFans creators", count: "articles" },
    fr: { h1: "Blog & Ressources", sub: "Guides réels, stratégies prouvées et données du secteur pour créatrices OnlyFans", count: "articles" },
    de: { h1: "Blog & Ressourcen", sub: "Echte Ratgeber, bewährte Strategien und Branchendaten für OnlyFans-Creator", count: "Artikel" },
    it: { h1: "Blog & Risorse", sub: "Guide reali, strategie provate e dati del settore per creator OnlyFans", count: "articoli" },
    pt: { h1: "Blog & Recursos", sub: "Guias reais, estratégias comprovadas e dados do setor para creators OnlyFans", count: "artigos" },
  };
  const hero = HERO[l] ?? HERO.es;
  const read: Record<Locale,string> = { es:"Leer", en:"Read", fr:"Lire", de:"Lesen", it:"Leggi", pt:"Ler" };

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <MegaNav locale={l} posts={navPosts} />

      {/* Hero */}
      <div style={{ background: "var(--bg2)", padding: "44px 20px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(196,105,154,0.08)", filter: "blur(70px)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <Link href={`/${l}/`} style={{ fontSize: 13, color: "var(--pink)", fontWeight: 600 }}>← Home</Link>
          <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 900, color: "var(--dark)", letterSpacing: "-1.5px", margin: "16px 0 10px" }}>
            <span className="g-pink">{hero.h1}</span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 560, lineHeight: 1.65 }}>{hero.sub}</p>
          <p style={{ fontSize: 12, color: "var(--muted2)", marginTop: 14, fontWeight: 600 }}>{posts.length} {hero.count}</p>
        </div>
      </div>

      <div style={{ padding: "44px 20px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Featured */}
          {featured && (
            <Link href={`/${l}/blog/${featured.slug}/`} style={{ textDecoration: "none", display: "block", marginBottom: 36 }}>
              <article className="card" style={{ overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                <div style={{ minHeight: 280, overflow: "hidden", position: "relative" }}>
                  <img src={postImage(featured)} alt={featured.title} width={550} height={360}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}/>
                </div>
                <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", background: PINK, padding: "3px 12px", borderRadius: 999 }}>
                      {l==="es"?"Destacado":l==="en"?"Featured":l==="fr"?"À la une":l==="de"?"Empfohlen":l==="it"?"In evidenza":"Destaque"}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--muted2)" }}>{featured.date}</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", fontWeight: 900, color: "var(--dark)", letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: 12 }}>
                    {featured.title}
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, marginBottom: 18 }}>{featured.excerpt}</p>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: PINK, fontSize: 14, fontWeight: 700 }}>
                    {read[l]} →
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 20 }}>
            {rest.map(p => (
              <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration: "none" }}>
                <article className="card" style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                    <img src={postImage(p)} alt={p.title} width={400} height={225} loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                    <div style={{ position: "absolute", top: 12, left: 12 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", background: "rgba(26,16,24,0.7)", backdropFilter: "blur(8px)", padding: "3px 10px", borderRadius: 999 }}>
                        {p.kw[0]}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <p style={{ fontSize: 11, color: "var(--muted2)", marginBottom: 8 }}>{p.date}</p>
                    <h2 style={{ fontWeight: 800, color: "var(--dark)", fontSize: 16, lineHeight: 1.35, marginBottom: 10, flex: 1, letterSpacing: "-0.2px" }}>
                      {p.title}
                    </h2>
                    <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, marginBottom: 14, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {p.excerpt}
                    </p>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: PINK, fontSize: 13, fontWeight: 700 }}>
                      {read[l]} →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
