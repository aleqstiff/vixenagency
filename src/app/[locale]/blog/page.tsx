import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, type Locale, BASE_URL, LOCALE_COUNTRIES, COUNTRIES, waLink, waMsg } from "@/lib/config";
import { POSTS } from "@/lib/blog";
import { t } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";
import Popup from "@/components/Popup";

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const titles: Record<Locale,string> = {
    es:"Blog Agencia OnlyFans — Guías y Estrategias 2026 | VixenAgency",
    en:"OnlyFans Agency Blog — Guides & Strategies 2026 | VixenAgency",
    fr:"Blog Agence OnlyFans — Guides & Stratégies 2026 | VixenAgency",
    de:"OnlyFans Agentur Blog — Ratgeber & Strategien 2026 | VixenAgency",
    it:"Blog Agenzia OnlyFans — Guide & Strategie 2026 | VixenAgency",
    pt:"Blog Agência OnlyFans — Guias & Estratégias 2026 | VixenAgency",
  };
  return { title: titles[l], alternates:{ canonical:`${BASE_URL}/${l}/blog/` } };
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const posts = POSTS.filter(p => p.locale === l);
  const ck = (LOCALE_COUNTRIES[l]??[])[0];
  const waHref = ck ? waLink(waMsg(l)) : waLink("VixenAgency");

  const headlines: Record<Locale,string[]> = {
    es:["Guías y estrategias para creadoras de OnlyFans","Todo lo que necesitas para crecer y maximizar ingresos"],
    en:["Guides and strategies for OnlyFans creators","Everything you need to grow and maximize income"],
    fr:["Guides et stratégies pour créatrices OnlyFans","Tout ce qu\'il faut pour croître et maximiser vos revenus"],
    de:["Ratgeber und Strategien für OnlyFans-Creator","Alles, was du brauchst, um zu wachsen und Einnahmen zu maximieren"],
    it:["Guide e strategie per creator OnlyFans","Tutto ciò che ti serve per crescere e massimizzare i guadagni"],
    pt:["Guias e estratégias para creators do OnlyFans","Tudo que você precisa para crescer e maximizar ganhos"],
  };

  return (
    <>
      <MegaNav locale={l} />
      <Popup locale={l} href={waHref} />
      <section style={{ padding:"64px 20px 48px",background:"var(--bg2)" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <Link href={`/${l}/`} style={{ fontSize:13,color:"var(--muted)",textDecoration:"none" }}>← {l==="es"?"Inicio":l==="en"?"Home":l==="fr"?"Accueil":l==="de"?"Startseite":"Home"}</Link>
          <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:900,color:"#fff",margin:"20px 0 8px" }}>{headlines[l][0]}</h1>
          <p style={{ color:"var(--muted)",marginBottom:48 }}>{headlines[l][1]}</p>
          <div style={{ display:"grid",gap:16 }}>
            {posts.map(p => (
              <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration:"none" }}>
                <article className="card" style={{ padding:28,display:"flex",gap:20,alignItems:"flex-start",transition:"border-color 0.2s" }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:11,color:"var(--teal)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8 }}>{p.date} · {p.kw[0]}</p>
                    <h2 style={{ fontWeight:800,color:"#fff",fontSize:18,marginBottom:8,lineHeight:1.3 }}>{p.title}</h2>
                    <p style={{ color:"var(--muted)",fontSize:14,lineHeight:1.6 }}>{p.excerpt}</p>
                  </div>
                  <span style={{ color:"var(--teal)",fontSize:22,flexShrink:0,marginTop:4 }}>→</span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
