import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES, SERVICES, BASE_URL, WA, waLink, waMsg } from "@/lib/config";
import { TR, t, ta, ta2 } from "@/lib/translations";
import { POSTS } from "@/lib/blog";
import MegaNav from "@/components/MegaNav";
import Popup from "@/components/Popup";

export async function generateStaticParams() { return LOCALES.map(l => ({ locale:l })); }

export async function generateMetadata({ params }: { params: Promise<{locale:string}> }): Promise<Metadata> {
  const { locale } = await params; const l = locale as Locale;
  const tr = TR[l] as Record<string,string>;
  return { title:tr.meta_title, description:tr.meta_desc };
}

// Design tokens
const C = {
  teal: "var(--teal)", violet: "var(--violet)", gold: "var(--gold)",
  bg2: "var(--bg2)", bg3: "var(--bg3)", glass: "var(--glass)", glass2: "var(--glass2)",
  border: "var(--border)", border2: "var(--border2)", text: "var(--text)", muted: "var(--muted)", muted2: "var(--muted2)",
};

const SL = (text: string) => (
  <p className="section-label">{text}</p>
);

export default async function Page({ params }: { params: Promise<{locale:string}> }) {
  const { locale } = await params; const l = locale as Locale;
  const wa = waMsg(l); const href = waLink(wa);
  const countryKeys = LOCALE_COUNTRIES[l] ?? [];
  const services = SERVICES[l] ?? [];
  const posts = POSTS.filter(p => p.locale === l).slice(0,3);
  const recentSlugs = POSTS.filter(p => p.locale === l).map(p => ({ slug:p.slug, title:p.title, locale:p.locale }));

  const reviewSchema = {
    "@context":"https://schema.org","@type":"Product","name":"VixenAgency OnlyFans Management",
    "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"183","bestRating":"5"},
    "review": ta2(l,"results").map(r => ({ "@type":"Review","reviewBody":r[5]?.replace(/\\/g,""),"author":{"@type":"Person","name":r[0]},"reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"} })),
  };
  const faqSchema = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity": ta2(l,"faqs").map(([q,a]) => ({ "@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a} })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MegaNav locale={l} recentSlugs={recentSlugs} />
      <Popup locale={l} href={href} />

      {/* ═══════════ HERO ════════════════════════════════════════════════════ */}
      <section style={{ position:"relative",overflow:"hidden",padding:"100px 24px 88px",textAlign:"center" }}>
        {/* Background layers */}
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 90% 70% at 50% -5%, rgba(0,229,212,0.09) 0%,rgba(139,92,246,0.05) 50%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,229,212,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,212,0.025) 1px,transparent 1px)",backgroundSize:"72px 72px",pointerEvents:"none" }} />
        <div style={{ position:"absolute",width:600,height:600,borderRadius:"50%",background:"rgba(139,92,246,0.04)",filter:"blur(100px)",top:"20%",left:"-10%",pointerEvents:"none" }} />
        <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",background:"rgba(0,229,212,0.04)",filter:"blur(80px)",top:"10%",right:"-8%",pointerEvents:"none" }} />

        <div style={{ maxWidth:900,margin:"0 auto",position:"relative" }}>
          {/* Live badge */}
          <div className="badge" style={{ marginBottom:28 }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block",animation:"pulseRing 2s infinite" }} />
            {t(l,"badge")}
          </div>

          <p style={{ fontSize:15,color:C.muted,marginBottom:14,fontWeight:500,letterSpacing:"-0.01em" }}>
            {t(l,"hero_eyebrow")}
          </p>

          <h1 style={{ fontSize:"clamp(2.8rem,6.5vw,4.8rem)",fontWeight:900,color:"#fff",lineHeight:1.04,letterSpacing:"-2.5px",marginBottom:6 }}>
            {t(l,"hero_h1")}
          </h1>
          <div className="grad-teal" style={{ fontSize:"clamp(2.4rem,5.5vw,4.2rem)",fontWeight:900,lineHeight:1.07,letterSpacing:"-2px",marginBottom:30 }}>
            {t(l,"hero_h1_accent")}
          </div>

          <p style={{ fontSize:"clamp(1rem,2vw,1.18rem)",color:C.muted,lineHeight:1.72,maxWidth:640,margin:"0 auto 44px",fontWeight:400 }}>
            {t(l,"hero_desc")}
          </p>

          <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:32 }}>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ fontSize:16,padding:"18px 44px" }}>
              <span style={{ fontSize:22 }}>💬</span> {t(l,"hero_cta")}
            </a>
            <Link href={`/${l}/#resultados`} className="btn btn-ghost" style={{ fontSize:15 }}>
              {t(l,"hero_cta2")} ↓
            </Link>
          </div>

          <p style={{ fontSize:13,color:C.muted2,fontWeight:500 }}>{t(l,"hero_trust")}</p>

          {/* Social proof bar */}
          <div style={{ display:"flex",justifyContent:"center",gap:28,marginTop:36,flexWrap:"wrap" }}>
            {[["⭐⭐⭐⭐⭐","4.9/5 en Google"],["🏆","Top Agencia 2025-2026"],["🔒","ISO 27001 Privacy"],["💬","24/7 Soporte"]].map(([icon,text]) => (
              <div key={text} style={{ display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.muted2,fontWeight:600 }}>
                <span>{icon}</span> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TICKER ══════════════════════════════════════════════════ */}
      <div style={{ borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"12px 0" }}>
        <div className="marquee-track">
          <div className="marquee-inner">
            {[...ta(l,"ticker"),...ta(l,"ticker"),...ta(l,"ticker")].map((item,i) => (
              <span key={i} style={{ fontSize:12,fontWeight:700,color:C.muted,padding:"0 32px",display:"flex",alignItems:"center",gap:28,whiteSpace:"nowrap" }}>
                {item}
                <span style={{ color:"rgba(0,229,212,0.25)",fontSize:7 }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ STATS ═══════════════════════════════════════════════════ */}
      <section style={{ padding:"72px 24px" }}>
        <div style={{ maxWidth:1040,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18 }}>
          {(["stat1","stat2","stat3","stat4"] as const).map((k,i) => (
            <div key={k} className="card-glow" style={{ padding:"32px 24px",textAlign:"center",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${["#00e5d4","#8b5cf6","#f59e0b","#10b981"][i]},transparent)` }} />
              <div className="grad-teal" style={{ fontSize:"clamp(2.2rem,4vw,3.4rem)",fontWeight:900,lineHeight:1,marginBottom:10 }}>
                {t(l,`${k}_v`)}
              </div>
              <div style={{ fontSize:13,color:C.muted,fontWeight:500 }}>{t(l,`${k}_l`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ SERVICES ════════════════════════════════════════════════ */}
      <section id="servicios" style={{ padding:"80px 24px",background:C.bg2 }}>
        <div style={{ maxWidth:1240,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64 }}>
            {SL(l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi")}
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"#fff",marginBottom:14 }}>{t(l,"services_title")}</h2>
            <p style={{ color:C.muted,maxWidth:560,margin:"0 auto",lineHeight:1.65 }}>{t(l,"services_sub")}</p>
          </div>

          {/* Main services grid */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:18,marginBottom:24 }}>
            {ta2(l,"sv").map(([icon,title,desc],i) => (
              <div key={i} className="card" style={{ padding:"28px 30px",position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,rgba(0,229,212,0.3),transparent)` }} />
                <div style={{ display:"flex",alignItems:"flex-start",gap:18 }}>
                  <div style={{ width:52,height:52,borderRadius:14,background:"rgba(0,229,212,0.07)",border:"1px solid rgba(0,229,212,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0 }}>
                    {icon}
                  </div>
                  <div>
                    <h3 style={{ fontWeight:800,color:"#fff",fontSize:18,marginBottom:8,letterSpacing:"-0.3px" }}>{title}</h3>
                    <p style={{ color:C.muted,lineHeight:1.65,fontSize:14 }}>{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Keyword pages chips */}
          {services.length > 0 && (
            <div style={{ textAlign:"center" }}>
              <p style={{ color:C.muted2,fontSize:12,fontWeight:600,marginBottom:14,textTransform:"uppercase",letterSpacing:"0.08em" }}>
                {l==="es"?"Páginas especializadas":l==="en"?"Specialized pages":l==="fr"?"Pages spécialisées":l==="de"?"Spezialisierte Seiten":"Pagine specializzate"}
              </p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center" }}>
                {services.map(s => (
                  <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                    style={{ display:"flex",alignItems:"center",gap:6,fontSize:13,padding:"8px 18px",borderRadius:999,background:C.glass,border:`1px solid ${C.border}`,color:C.muted,textDecoration:"none",fontWeight:600,transition:"all .2s" }}>
                    <span style={{ fontSize:15 }}>{s.icon}</span> {s.kw}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ HOW ═════════════════════════════════════════════════════ */}
      <section id="como" style={{ padding:"88px 24px" }}>
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64 }}>
            {SL(l==="es"?"Proceso":l==="en"?"Process":l==="fr"?"Processus":l==="de"?"Prozess":"Processo")}
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:900,color:"#fff" }}>{t(l,"how_title")}</h2>
          </div>
          {/* Timeline layout */}
          <div style={{ display:"grid",gap:0,position:"relative" }}>
            {/* Vertical line */}
            <div style={{ position:"absolute",left:38,top:52,bottom:52,width:1,background:"linear-gradient(to bottom,rgba(0,229,212,0.3),rgba(139,92,246,0.2),transparent)",zIndex:0 }} />

            {ta2(l,"how").map(([n,title,desc],i) => (
              <div key={i} style={{ display:"flex",gap:0,alignItems:"flex-start",marginBottom:i<3?28:0,position:"relative",zIndex:1 }}>
                {/* Step number circle */}
                <div style={{ width:76,flexShrink:0,display:"flex",justifyContent:"center",paddingTop:4 }}>
                  <div style={{ width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,var(--teal),#0284c7)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:15,color:"#020b18",boxShadow:"0 0 20px rgba(0,229,212,0.3)" }}>
                    {i+1}
                  </div>
                </div>
                <div className="card" style={{ flex:1,padding:"22px 26px" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12 }}>
                    <div>
                      <h3 style={{ fontWeight:800,color:"#fff",fontSize:18,marginBottom:8,letterSpacing:"-0.3px" }}>{title}</h3>
                      <p style={{ color:C.muted,lineHeight:1.65,fontSize:14 }}>{desc}</p>
                    </div>
                    <span style={{ fontSize:28,flexShrink:0 }}>{["🔍","📋","🚀","📈"][i]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center",marginTop:52 }}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize:16,padding:"18px 44px" }}>
              <span style={{ fontSize:22 }}>💬</span> {t(l,"hero_cta")}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ RESULTS ═════════════════════════════════════════════════ */}
      <section id="resultados" style={{ padding:"88px 24px",background:C.bg2 }}>
        <div style={{ maxWidth:1240,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:16 }}>
            {SL(l==="es"?"Casos reales":l==="en"?"Real cases":l==="fr"?"Cas réels":l==="de"?"Echte Fälle":"Casi reali")}
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:900,color:"#fff",marginBottom:10 }}>{t(l,"results_title")}</h2>
            <p style={{ color:C.muted2,fontSize:13 }}>{t(l,"results_sub")}</p>
          </div>

          {/* Star rating summary */}
          <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:16,margin:"28px 0 52px",flexWrap:"wrap" }}>
            <div style={{ display:"flex",gap:3 }}>
              {Array(5).fill("⭐").map((s,i) => <span key={i} style={{ fontSize:22 }}>{s}</span>)}
            </div>
            <div>
              <span style={{ fontWeight:900,fontSize:28,color:"#fff" }}>4.9</span>
              <span style={{ color:C.muted,fontSize:14,marginLeft:6 }}>/ 5.0 · 183 reseñas verificadas</span>
            </div>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20 }}>
            {ta2(l,"results").map(([name,loc,before,after,time,quote,color],i) => (
              <div key={i} className="card" style={{ padding:"28px 28px",position:"relative",overflow:"hidden" }}>
                {/* Color accent top */}
                <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${color},transparent)` }} />

                {/* Stars */}
                <div style={{ display:"flex",gap:2,marginBottom:14 }}>
                  {Array(5).fill(0).map((_,si) => <span key={si} style={{ fontSize:13,color:C.gold }}>★</span>)}
                </div>

                {/* Income card */}
                <div style={{ background:"rgba(0,0,0,0.25)",borderRadius:12,padding:"14px 18px",marginBottom:18,display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
                  <div style={{ textAlign:"center",flex:1 }}>
                    <p style={{ fontSize:10,color:C.muted2,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3 }}>{t(l,"before")}</p>
                    <p style={{ fontWeight:800,fontSize:18,color:"rgba(255,255,255,0.3)" }}>{before}</p>
                  </div>
                  <div style={{ color:color,fontSize:20,fontWeight:900 }}>→</div>
                  <div style={{ textAlign:"center",flex:1 }}>
                    <p style={{ fontSize:10,color:C.muted2,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3 }}>{t(l,"after")}</p>
                    <p style={{ fontWeight:900,fontSize:22,color }}>{after}</p>
                  </div>
                </div>

                <p style={{ fontSize:12,color:C.muted2,marginBottom:12,fontWeight:600 }}>
                  {t(l,"in_t")} <strong style={{ color:"rgba(255,255,255,0.6)" }}>{time}</strong> · {name} · {loc}
                </p>

                <blockquote style={{ borderLeft:`3px solid ${color}`,paddingLeft:14 }}>
                  <p style={{ fontSize:13,color:C.muted,lineHeight:1.62,fontStyle:"italic" }}>{quote?.replace(/\\/g,"")}</p>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COUNTRIES ═══════════════════════════════════════════════ */}
      {countryKeys.length > 1 && (
        <section style={{ padding:"72px 24px" }}>
          <div style={{ maxWidth:1040,margin:"0 auto" }}>
            <div style={{ textAlign:"center",marginBottom:40 }}>
              {SL(l==="es"?"Cobertura global":l==="en"?"Global coverage":l==="fr"?"Couverture mondiale":l==="de"?"Globale Abdeckung":"Copertura globale")}
              <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:900,color:"#fff",marginBottom:0 }}>
                {l==="es"?"Operamos en toda América Latina y más":l==="en"?"We operate across North America and beyond":l==="fr"?"Nous opérons dans toute la francophonie":l==="de"?"DACH und weltweit":"Italia e mercati internazionali"}
              </h2>
            </div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center" }}>
              {countryKeys.map(ck => {
                const c = COUNTRIES[ck];
                return (
                  <Link key={ck} href={`/${l}/${ck}/`} className="card"
                    style={{ padding:"12px 20px",display:"inline-flex",alignItems:"center",gap:10,fontSize:14,fontWeight:700,color:C.text,textDecoration:"none" }}>
                    <span style={{ fontSize:22 }}>{c.flag}</span>
                    <div>
                      <p style={{ color:"#fff",fontWeight:700,fontSize:13,lineHeight:1 }}>{c.name}</p>
                      <p style={{ color:C.muted,fontSize:11,marginTop:2 }}>{c.city}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ FAQ ═════════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 24px",background:C.bg2 }}>
        <div style={{ maxWidth:780,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:60 }}>
            {SL("FAQ")}
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:900,color:"#fff" }}>{t(l,"faq_title")}</h2>
          </div>
          <div style={{ display:"grid",gap:10 }}>
            {ta2(l,"faqs").map(([q,a],i) => (
              <details key={i} className="card" style={{ padding:"0" }}>
                <summary style={{ padding:"20px 24px",fontWeight:700,color:"#fff",cursor:"pointer",fontSize:15,display:"flex",justifyContent:"space-between",alignItems:"center",userSelect:"none" }}>
                  <span style={{ flex:1,paddingRight:16 }}>{q}</span>
                  <span style={{ color:C.teal,fontSize:22,fontWeight:300,lineHeight:1,flexShrink:0 }}>+</span>
                </summary>
                <div style={{ padding:"0 24px 20px",borderTop:`1px solid ${C.border}`,marginTop:0 }}>
                  <p style={{ color:C.muted,lineHeight:1.72,fontSize:14,paddingTop:16 }}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BLOG PREVIEW ════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section style={{ padding:"88px 24px" }}>
          <div style={{ maxWidth:1200,margin:"0 auto" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:48,flexWrap:"wrap",gap:16 }}>
              <div>
                {SL("Blog")}
                <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:900,color:"#fff" }}>
                  {l==="es"?"Guías y estrategias":l==="en"?"Guides & strategies":l==="fr"?"Guides & stratégies":l==="de"?"Ratgeber & Strategien":"Guide e strategie"}
                </h2>
              </div>
              <Link href={`/${l}/blog/`} className="btn btn-ghost btn-sm">
                {l==="es"?"Ver todos los artículos":l==="en"?"View all articles":l==="fr"?"Voir tous les articles":l==="de"?"Alle Artikel":"Tutti gli articoli"} →
              </Link>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:20 }}>
              {posts.map((p,i) => (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration:"none",display:"block" }}>
                  <article className="card" style={{ padding:"28px 28px",height:"100%",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden" }}>
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,rgba(0,229,212,${0.2+i*0.08}),transparent)` }} />
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
                      <span style={{ fontSize:10,fontWeight:700,color:C.teal,textTransform:"uppercase",letterSpacing:"0.1em" }}>{p.date}</span>
                      <span style={{ width:3,height:3,borderRadius:"50%",background:C.border2,display:"inline-block" }} />
                      <span style={{ fontSize:10,color:C.muted2,fontWeight:600 }}>{p.kw[0]}</span>
                    </div>
                    <h3 style={{ fontWeight:800,color:"#fff",fontSize:17,marginBottom:10,lineHeight:1.3,flex:1,letterSpacing:"-0.3px" }}>{p.title}</h3>
                    <p style={{ color:C.muted,fontSize:13,lineHeight:1.6,marginBottom:18 }}>{p.excerpt}</p>
                    <div style={{ display:"flex",alignItems:"center",gap:6,color:C.teal,fontSize:13,fontWeight:700 }}>
                      {l==="es"?"Leer artículo":l==="en"?"Read article":l==="fr"?"Lire l'article":l==="de"?"Artikel lesen":"Leggi articolo"} →
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ CTA ═════════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 24px",background:C.bg2 }}>
        <div style={{ maxWidth:720,margin:"0 auto",textAlign:"center" }}>
          <div className="card-glow" style={{ padding:"64px 48px",position:"relative",overflow:"hidden" }}>
            {/* Decorative glow */}
            <div style={{ position:"absolute",width:300,height:300,borderRadius:"50%",background:"rgba(0,229,212,0.05)",filter:"blur(60px)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none" }} />
            <div className="float" style={{ fontSize:56,marginBottom:24,position:"relative" }}>💎</div>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:900,color:"#fff",marginBottom:14,position:"relative",letterSpacing:"-0.5px" }}>
              {t(l,"cta_title")}
            </h2>
            <p style={{ color:C.muted,lineHeight:1.75,marginBottom:40,fontSize:16,maxWidth:480,margin:"0 auto 40px",position:"relative" }}>
              {t(l,"cta_sub")}
            </p>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ fontSize:17,padding:"20px 52px",display:"inline-flex",position:"relative" }}>
              <span style={{ fontSize:24 }}>💬</span> {t(l,"cta_btn")}
            </a>
            <p style={{ fontSize:12,color:C.muted2,marginTop:20,position:"relative" }}>{t(l,"cta_note")}</p>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ══════════════════════════════════════════════════ */}
      <footer style={{ padding:"64px 24px 32px",borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1280,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:48,marginBottom:52 }}>
            {/* Brand col */}
            <div>
              <div style={{ fontWeight:900,fontSize:26,marginBottom:16,letterSpacing:"-0.5px" }}>
                <span style={{ color:C.teal }}>Vixen</span><span style={{ color:"#fff" }}>Agency</span>
                <span style={{ fontSize:9,fontWeight:700,color:C.teal,verticalAlign:"super",marginLeft:3,opacity:.7 }}>PRO</span>
              </div>
              <p style={{ fontSize:13,color:C.muted,lineHeight:1.7,maxWidth:280,marginBottom:24 }}>{t(l,"footer_desc")}</p>
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex",alignItems:"center",gap:8,color:"#22c55e",textDecoration:"none",fontWeight:800,fontSize:15 }}>
                <span style={{ fontSize:22 }}>💬</span> +{WA.slice(0,2)} {WA.slice(2,4)} {WA.slice(4,7)} {WA.slice(7,10)} {WA.slice(10)}
              </a>
              <p style={{ fontSize:11,color:C.muted2,marginTop:6 }}>24/7 · {t(l,"cta_note").split("·")[0].trim()}</p>
            </div>

            {/* Services */}
            <div>
              <p style={{ fontWeight:700,color:"#fff",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:18 }}>
                {l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}
              </p>
              <div style={{ display:"grid",gap:9 }}>
                {services.slice(0,5).map(s => (
                  <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                    style={{ fontSize:13,color:C.muted,textDecoration:"none",display:"flex",alignItems:"center",gap:7,fontWeight:500 }}>
                    <span style={{ fontSize:13 }}>{s.icon}</span> {s.kw}
                  </Link>
                ))}
              </div>
            </div>

            {/* Countries */}
            <div>
              <p style={{ fontWeight:700,color:"#fff",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:18 }}>
                {t(l,"nav_countries")}
              </p>
              <div style={{ display:"grid",gap:9 }}>
                {countryKeys.slice(0,6).map(ck => {
                  const c = COUNTRIES[ck];
                  return (
                    <Link key={ck} href={`/${l}/${ck}/`}
                      style={{ fontSize:13,color:C.muted,textDecoration:"none",display:"flex",alignItems:"center",gap:7,fontWeight:500 }}>
                      <span>{c.flag}</span> {c.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Blog + Lang */}
            <div>
              <p style={{ fontWeight:700,color:"#fff",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:18 }}>Blog</p>
              <div style={{ display:"grid",gap:9,marginBottom:24 }}>
                {POSTS.filter(p=>p.locale===l).slice(0,4).map(p => (
                  <Link key={p.slug} href={`/${l}/blog/${p.slug}/`}
                    style={{ fontSize:12,color:C.muted,textDecoration:"none",lineHeight:1.3,fontWeight:500 }}>
                    → {p.title.slice(0,38)}…
                  </Link>
                ))}
              </div>
              <p style={{ fontWeight:700,color:"#fff",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12 }}>
                {l==="es"?"Idiomas":l==="en"?"Languages":l==="fr"?"Langues":l==="de"?"Sprachen":"Lingue"}
              </p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                {LOCALES.map(loc => (
                  <Link key={loc} href={`/${loc}/`}
                    style={{ fontSize:10,padding:"4px 8px",borderRadius:6,textDecoration:"none",fontFamily:"monospace",textTransform:"uppercase",fontWeight:800,
                      color: loc===l ? C.teal : C.muted2,
                      background: loc===l ? "rgba(0,229,212,0.1)" : "transparent",
                      border: `1px solid ${loc===l ? "rgba(0,229,212,0.3)" : C.border}` }}>
                    {loc}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop:`1px solid rgba(255,255,255,0.05)`,paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
            <p style={{ fontSize:12,color:C.muted2,fontWeight:500 }}>© 2026 VixenAgency · {t(l,"footer_rights")}</p>
            <p style={{ fontSize:11,color:"rgba(255,255,255,0.12)" }}>{t(l,"footer_disclaimer")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
