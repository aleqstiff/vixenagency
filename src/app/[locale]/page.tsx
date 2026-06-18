import type { Metadata } from "next";
import Link from "next/link";
import {
  LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES,
  SERVICES, BASE_URL, WA, waLink, waMsg
} from "@/lib/config";
import { TR, t, ta, ta2 } from "@/lib/translations";
import { POSTS } from "@/lib/blog";
import MegaNav from "@/components/MegaNav";
import Popup from "@/components/Popup";

export async function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }));
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const l = locale as Locale;
  const tr = TR[l] as Record<string,string>;
  return { title: tr.meta_title, description: tr.meta_desc };
}

// Gradient palette per stat
const STAT_ACCENTS = ["#00e5cc","#7c3aed","#f59e0b","#10b981"] as const;

// Avatar colors for testimonials
const AV_COLORS = ["#7c3aed","#00e5cc","#f59e0b","#ec4899"] as const;

// Mini check icon (SVG, no emoji)
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0, marginTop:2 }}>
    <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#00e5cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Arrow right
const Arrow = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Star
const Stars = ({ n = 5 }: { n?: number }) => (
  <div style={{ display:"flex", gap:2 }}>
    {Array(n).fill(null).map((_,i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
        <path d="M7 1l1.5 4.5H13L9.5 8.5l1 4.5L7 10.5l-3.5 2.5 1-4.5L1 5.5h4.5L7 1z"/>
      </svg>
    ))}
  </div>
);

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const l = locale as Locale;
  const wa = waMsg(l);
  const href = waLink(wa);
  const countryKeys = LOCALE_COUNTRIES[l] ?? [];
  const services = SERVICES[l] ?? [];
  const posts = POSTS.filter(p => p.locale === l);
  const navPosts = posts.slice(0, 6).map(p => ({ slug: p.slug, title: p.title }));

  const reviewSchema = {
    "@context":"https://schema.org","@type":"Product","name":"VixenAgency — OnlyFans Management",
    "aggregateRating":{ "@type":"AggregateRating","ratingValue":"4.9","reviewCount":"183","bestRating":"5" },
    "review": ta2(l,"results").map(r => ({
      "@type":"Review","reviewBody":r[5]?.replace(/\\\\"/g,'"'),
      "author":{"@type":"Person","name":r[0]},
      "reviewRating":{"@type":"Rating","ratingValue":"5","bestRating":"5"}
    })),
  };
  const faqSchema = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity": ta2(l,"faqs").map(([q,a]) => ({
      "@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}
    })),
  };

  // Trust ticker items — clean, no emoji
  const ticker = ta(l,"ticker");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MegaNav locale={l} posts={navPosts} />
      <Popup locale={l} href={href} />

      {/* ════════════════════════════════════════════════════════════
          HERO — Big numbers, minimal copy, dual CTA
      ════════════════════════════════════════════════════════════ */}
      <section style={{ position:"relative", overflow:"hidden", padding:"96px 20px 80px" }}>
        {/* Background blobs */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div className="blob" style={{ position:"absolute", width:600, height:600, top:"-15%", left:"-10%",
            background:"radial-gradient(circle, rgba(0,229,204,0.07) 0%, transparent 70%)", filter:"blur(40px)" }} />
          <div className="blob" style={{ position:"absolute", width:500, height:500, top:"5%", right:"-8%",
            background:"radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter:"blur(40px)",
            animationDelay:"-4s" }} />
          <div style={{ position:"absolute", inset:0,
            backgroundImage:"radial-gradient(rgba(0,229,204,0.04) 1px, transparent 1px)",
            backgroundSize:"48px 48px" }} />
        </div>

        <div style={{ maxWidth:960, margin:"0 auto", position:"relative", textAlign:"center" }}>
          <div className="badge" style={{ marginBottom:28 }}>
            <span className="dot-live" />
            {t(l,"badge")}
          </div>

          <p style={{ fontSize:15, color:"var(--muted)", fontWeight:500, marginBottom:14 }}>{t(l,"hero_eyebrow")}</p>

          <h1 className="hero-h1" style={{
            fontSize:"clamp(2.8rem,6.5vw,5rem)", fontWeight:900, color:"#fff",
            lineHeight:1.04, letterSpacing:"-3px", marginBottom:6
          }}>
            {t(l,"hero_h1")}
          </h1>
          <div className="g-teal hero-h2" style={{
            fontSize:"clamp(2.4rem,5.5vw,4.4rem)", fontWeight:900,
            lineHeight:1.06, letterSpacing:"-2.5px", marginBottom:28
          }}>
            {t(l,"hero_h1_accent")}
          </div>

          <p style={{
            fontSize:"clamp(1rem,2vw,1.18rem)", color:"var(--muted)", lineHeight:1.75,
            maxWidth:580, margin:"0 auto 44px", fontWeight:400
          }}>
            {t(l,"hero_desc")}
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:30 }}>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-cta" style={{ fontSize:16, padding:"18px 44px" }}>
              {t(l,"hero_cta")} <Arrow />
            </a>
            <Link href={`/${l}/#resultados`} className="btn btn-outline" style={{ fontSize:15 }}>
              {t(l,"hero_cta2")}
            </Link>
          </div>

          <p style={{ fontSize:13, color:"var(--muted2)", fontWeight:500 }}>{t(l,"hero_trust")}</p>

          {/* Mini social proof */}
          <div style={{
            display:"flex", justifyContent:"center", gap:24, marginTop:36, flexWrap:"wrap",
            borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:28
          }}>
            {([
              ["4.9/5", l==="es"?"reseñas verificadas":l==="en"?"verified reviews":l==="fr"?"avis vérifiés":l==="de"?"Bewertungen":"recensioni"],
              ["+€2.8M", l==="es"?"generado para creadoras":l==="en"?"generated for creators":l==="fr"?"généré pour créatrices":l==="de"?"für Creator generiert":"generato per creator"],
              ["200+", l==="es"?"creadoras activas":l==="en"?"active creators":l==="fr"?"créatrices actives":l==="de"?"aktive Creator":"creator attive"],
              [l==="es"?"3 años":l==="en"?"3 years":l==="fr"?"3 ans":l==="de"?"3 Jahre":"3 anni", l==="es"?"de experiencia":l==="en"?"of experience":l==="fr"?"d'expérience":l==="de"?"Erfahrung":"di esperienza"],
            ] as [string,string][]).map(([val,lbl]) => (
              <div key={val} style={{ textAlign:"center" }}>
                <div style={{ fontSize:22, fontWeight:900, color:"#fff", letterSpacing:"-0.5px", lineHeight:1 }}>{val}</div>
                <div style={{ fontSize:12, color:"var(--muted)", marginTop:4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TICKER
      ════════════════════════════════════════════════════════════ */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"13px 0" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...ticker,...ticker,...ticker].map((item,i) => (
              <span key={i} style={{ fontSize:12, fontWeight:600, color:"var(--muted2)", padding:"0 36px",
                display:"flex", alignItems:"center", gap:36, whiteSpace:"nowrap" }}>
                {item}
                <svg width="5" height="5" viewBox="0 0 5 5" fill="rgba(0,229,204,0.3)"><circle cx="2.5" cy="2.5" r="2.5"/></svg>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          BENTO STATS
      ════════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding:"72px 20px" }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {(["stat1","stat2","stat3","stat4"] as const).map((k,i) => (
              <div key={k} className="card-stat" style={{ padding:"32px 24px", textAlign:"center" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                  background:`linear-gradient(90deg,transparent,${STAT_ACCENTS[i]},transparent)` }} />
                <div style={{ fontSize:"clamp(2.4rem,4.5vw,3.6rem)", fontWeight:900, letterSpacing:"-2px",
                  lineHeight:1, marginBottom:10, color:STAT_ACCENTS[i] }}>
                  {t(l,`${k}_v`)}
                </div>
                <div style={{ fontSize:13, color:"var(--muted)", fontWeight:500 }}>{t(l,`${k}_l`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SERVICES — Bento grid layout
      ════════════════════════════════════════════════════════════ */}
      <section id="servicios" className="section-pad" style={{ padding:"80px 20px", background:"var(--bg2)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ marginBottom:56 }}>
            <span className="lbl">{l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}</span>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, color:"#fff", letterSpacing:"-1px", marginBottom:12 }}>
              {t(l,"services_title")}
            </h2>
            <p style={{ color:"var(--muted)", maxWidth:520, lineHeight:1.65 }}>{t(l,"services_sub")}</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:16 }}>
            {ta2(l,"sv").map(([icon,title,desc],i) => (
              <div key={i} className="card" style={{ padding:"28px", position:"relative", overflow:"hidden",
                transition:"border-color .2s, transform .2s" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
                  background:`linear-gradient(90deg,transparent,rgba(0,229,204,${0.15+i*0.04}),transparent)` }} />
                <div style={{ width:52, height:52, borderRadius:14, marginBottom:18,
                  background:"rgba(0,229,204,0.07)", border:"1px solid rgba(0,229,204,0.12)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight:800, color:"#fff", fontSize:18, marginBottom:10, letterSpacing:"-0.3px" }}>{title}</h3>
                <p style={{ color:"var(--muted)", lineHeight:1.68, fontSize:14 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Keyword chips */}
          {services.length > 0 && (
            <div style={{ marginTop:28, display:"flex", flexWrap:"wrap", gap:8 }}>
              {services.map(s => (
                <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                  style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, padding:"7px 16px",
                    borderRadius:999, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
                    color:"var(--muted)", textDecoration:"none", fontWeight:600, transition:"all .2s" }}>
                  <span style={{ fontSize:13 }}>{s.icon}</span> {s.kw}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PROCESS — Timeline visual
      ════════════════════════════════════════════════════════════ */}
      <section id="como" className="section-pad" style={{ padding:"88px 20px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <span className="lbl">{l==="es"?"Proceso":l==="en"?"Process":l==="fr"?"Processus":l==="de"?"Prozess":"Processo"}</span>
          <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"#fff",
            letterSpacing:"-1px", marginBottom:52 }}>{t(l,"how_title")}</h2>

          <div style={{ position:"relative" }}>
            {/* Vertical line */}
            <div style={{ position:"absolute", left:24, top:48, bottom:48, width:1,
              background:"linear-gradient(to bottom, var(--teal), rgba(124,58,237,0.3), transparent)",
              zIndex:0 }} />

            {ta2(l,"how").map(([n,title,desc],i) => (
              <div key={i} style={{ display:"flex", gap:0, alignItems:"flex-start",
                marginBottom: i<3 ? 24 : 0, position:"relative", zIndex:1 }}>
                {/* Circle */}
                <div style={{ width:48, flexShrink:0, display:"flex", justifyContent:"center", paddingTop:2 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%",
                    background:"linear-gradient(135deg,var(--teal),#0ea5e9)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontWeight:900, fontSize:14, color:"#020b18",
                    boxShadow:"0 0 0 4px rgba(0,229,204,0.12)" }}>
                    {i+1}
                  </div>
                </div>
                <div className="card" style={{ flex:1, padding:"22px 26px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                    <div>
                      <h3 style={{ fontWeight:800, color:"#fff", fontSize:18, marginBottom:8, letterSpacing:"-0.3px" }}>{title}</h3>
                      <p style={{ color:"var(--muted)", lineHeight:1.68, fontSize:14 }}>{desc}</p>
                    </div>
                    <div style={{ width:40, height:40, borderRadius:10, background:"rgba(0,229,204,0.06)",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {["🔍","📋","🚀","📈"][i]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center", marginTop:48 }}>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-cta" style={{ fontSize:16, padding:"18px 44px" }}>
              {t(l,"hero_cta")} <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          RESULTS — Real testimonial cards with avatars
      ════════════════════════════════════════════════════════════ */}
      <section id="resultados" className="section-pad" style={{ padding:"88px 20px", background:"var(--bg2)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <span className="lbl">{l==="es"?"Casos reales":l==="en"?"Real cases":l==="fr"?"Cas réels":l==="de"?"Echte Fälle":"Casi reali"}</span>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:12, flexWrap:"wrap", gap:12 }}>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"#fff", letterSpacing:"-1px" }}>
              {t(l,"results_title")}
            </h2>
            {/* Aggregate stars */}
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Stars n={5} />
              <span style={{ fontWeight:900, fontSize:20, color:"#fff" }}>4.9</span>
              <span style={{ color:"var(--muted)", fontSize:13 }}>/ 183 {l==="es"?"reseñas":l==="en"?"reviews":l==="fr"?"avis":l==="de"?"Bewertungen":"recensioni"}</span>
            </div>
          </div>
          <p style={{ color:"var(--muted2)", fontSize:13, marginBottom:48 }}>{t(l,"results_sub")}</p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            {ta2(l,"results").map(([name,loc,before,after,time,quote,color],i) => (
              <div key={i} className="card" style={{ padding:28, position:"relative", overflow:"hidden" }}>
                {/* Top accent */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                  background:`linear-gradient(90deg,transparent,${color},transparent)` }} />

                {/* Header: avatar + name + stars */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                  <div className="avatar" style={{ background:`${color}20`, color, fontSize:16 }}>
                    {name.split(" ").map((w:string) => w[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <p style={{ fontWeight:800, color:"#fff", fontSize:15, lineHeight:1 }}>{name}</p>
                    <p style={{ color:"var(--muted)", fontSize:12, marginTop:3 }}>{loc}</p>
                  </div>
                  <div style={{ marginLeft:"auto" }}>
                    <Stars n={5} />
                  </div>
                </div>

                {/* Income card */}
                <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:12, padding:"14px 18px",
                  marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ flex:1, textAlign:"center" }}>
                    <p style={{ fontSize:10, color:"var(--muted2)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>
                      {t(l,"before")}
                    </p>
                    <p style={{ fontWeight:800, fontSize:17, color:"rgba(255,255,255,0.3)" }}>{before}</p>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                    <div style={{ width:28, height:1, background:"rgba(255,255,255,0.1)" }} />
                    <Arrow size={16} />
                    <div style={{ fontSize:10, color:"var(--muted2)", whiteSpace:"nowrap" }}>{t(l,"in_t")} {time}</div>
                  </div>
                  <div style={{ flex:1, textAlign:"center" }}>
                    <p style={{ fontSize:10, color:"var(--muted2)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>
                      {t(l,"after")}
                    </p>
                    <p style={{ fontWeight:900, fontSize:22, color }}>{after}</p>
                  </div>
                </div>

                <blockquote style={{ borderLeft:`2px solid ${color}`, paddingLeft:14 }}>
                  <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.65, fontStyle:"italic" }}>
                    {quote?.replace(/\\\\"/g,'"')}
                  </p>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TRUST — Why us checklist
      ════════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding:"72px 20px" }}>
        <div style={{ maxWidth:1060, margin:"0 auto", display:"grid",
          gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center" }}>
          {/* Left: headline */}
          <div>
            <span className="lbl">{l==="es"?"Por qué nosotras":l==="en"?"Why us":l==="fr"?"Pourquoi nous":l==="de"?"Warum wir":"Perché noi"}</span>
            <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, color:"#fff",
              letterSpacing:"-1px", marginBottom:20 }}>{t(l,"why_title")}</h2>
            <p style={{ color:"var(--muted)", lineHeight:1.75, marginBottom:32 }}>
              {l==="es"?"Somos la agencia de gestión OnlyFans con mejores resultados medibles en el mercado hispanohablante e internacional.":
               l==="en"?"We are the OnlyFans management agency with the best measurable results in the Spanish-speaking and international market.":
               l==="fr"?"Nous sommes l'agence de gestion OnlyFans avec les meilleurs résultats mesurables sur les marchés francophones et internationaux.":
               l==="de"?"Wir sind die OnlyFans-Managementagentur mit den besten messbaren Ergebnissen auf dem DACH- und internationalen Markt.":
               "Siamo l'agenzia di gestione OnlyFans con i migliori risultati misurabili sui mercati italiani e internazionali."}
            </p>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-cta" style={{ fontSize:15, padding:"16px 36px" }}>
              {t(l,"hero_cta")} <Arrow />
            </a>
          </div>
          {/* Right: checklist */}
          <div style={{ display:"grid", gap:12 }}>
            {ta2(l,"sv").slice(0,6).map(([,title,desc],i) => (
              <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start",
                padding:"16px 20px", borderRadius:14, background:"var(--glass)", border:"1px solid var(--border)" }}>
                <div style={{ width:32, height:32, borderRadius:9, background:"rgba(0,229,204,0.08)",
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Check />
                </div>
                <div>
                  <p style={{ fontWeight:700, color:"#fff", fontSize:14, marginBottom:2 }}>{title}</p>
                  <p style={{ color:"var(--muted)", fontSize:12, lineHeight:1.5 }}>{desc.slice(0,60)}…</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          COUNTRIES
      ════════════════════════════════════════════════════════════ */}
      {countryKeys.length > 1 && (
        <section className="section-pad" style={{ padding:"64px 20px", background:"var(--bg2)" }}>
          <div style={{ maxWidth:1040, margin:"0 auto", textAlign:"center" }}>
            <span className="lbl">{l==="es"?"Cobertura global":l==="en"?"Global coverage":l==="fr"?"Couverture mondiale":l==="de"?"Globale Abdeckung":"Copertura globale"}</span>
            <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:900, color:"#fff",
              letterSpacing:"-0.5px", marginBottom:32 }}>
              {l==="es"?"Operamos en toda América Latina y más allá":
               l==="en"?"We operate across North America and beyond":
               l==="fr"?"Nous opérons dans toute la francophonie":
               l==="de"?"DACH und weltweit":"Italia e mercati internazionali"}
            </h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
              {countryKeys.map(ck => {
                const c = COUNTRIES[ck];
                return (
                  <Link key={ck} href={`/${l}/${ck}/`} className="card"
                    style={{ padding:"12px 20px", display:"inline-flex", alignItems:"center",
                      gap:10, textDecoration:"none", transition:"border-color .2s" }}>
                    <span style={{ fontSize:22 }}>{c.flag}</span>
                    <div style={{ textAlign:"left" }}>
                      <p style={{ fontWeight:700, color:"#fff", fontSize:13, lineHeight:1 }}>{c.name}</p>
                      <p style={{ color:"var(--muted)", fontSize:11, marginTop:2 }}>{c.city}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding:"88px 20px" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <span className="lbl">FAQ</span>
          <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.4rem)", fontWeight:900, color:"#fff",
            letterSpacing:"-1px", marginBottom:48 }}>{t(l,"faq_title")}</h2>
          <div style={{ display:"grid", gap:10 }}>
            {ta2(l,"faqs").map(([q,a],i) => (
              <details key={i} className="card" style={{ padding:0 }}>
                <summary style={{ padding:"20px 24px", fontWeight:700, color:"#fff", cursor:"pointer",
                  fontSize:15, display:"flex", justifyContent:"space-between", alignItems:"center",
                  userSelect:"none", listStyle:"none" }}>
                  <span style={{ flex:1, paddingRight:16 }}>{q}</span>
                  <span className="plus-icon" style={{ color:"var(--teal)", fontSize:24, fontWeight:300, lineHeight:1, flexShrink:0 }}>+</span>
                </summary>
                <div style={{ padding:"0 24px 20px", borderTop:"1px solid var(--border)" }}>
                  <p style={{ color:"var(--muted)", lineHeight:1.75, fontSize:14, paddingTop:16 }}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BLOG
      ════════════════════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section className="section-pad" style={{ padding:"88px 20px", background:"var(--bg2)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end",
              marginBottom:48, flexWrap:"wrap", gap:14 }}>
              <div>
                <span className="lbl">Blog</span>
                <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.5px" }}>
                  {l==="es"?"Guías y estrategias":l==="en"?"Guides & strategies":
                   l==="fr"?"Guides & stratégies":l==="de"?"Ratgeber & Strategien":"Guide e strategie"}
                </h2>
              </div>
              <Link href={`/${l}/blog/`} className="btn btn-outline btn-sm"
                style={{ fontSize:13, padding:"10px 20px", borderRadius:10, flexShrink:0 }}>
                {l==="es"?"Ver todos":l==="en"?"View all":l==="fr"?"Voir tout":l==="de"?"Alle ansehen":"Vedi tutti"} <Arrow size={14} />
              </Link>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:18 }}>
              {posts.slice(0,3).map((p,i) => (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration:"none" }}>
                  <article className="card" style={{ padding:28, height:"100%", display:"flex",
                    flexDirection:"column", position:"relative", overflow:"hidden", transition:"border-color .2s" }}>
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
                      background:`linear-gradient(90deg,transparent,rgba(0,229,204,${0.15+i*0.07}),transparent)` }} />
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"var(--teal)",
                        textTransform:"uppercase", letterSpacing:"0.1em" }}>{p.date}</span>
                      <div style={{ width:3, height:3, borderRadius:"50%", background:"var(--border)" }} />
                      <span style={{ fontSize:10, color:"var(--muted2)", fontWeight:600 }}>{p.kw[0]}</span>
                    </div>
                    <h3 style={{ fontWeight:800, color:"#fff", fontSize:17, marginBottom:10,
                      lineHeight:1.3, flex:1, letterSpacing:"-0.3px" }}>{p.title}</h3>
                    <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.6, marginBottom:18 }}>{p.excerpt}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--teal)", fontSize:13, fontWeight:700 }}>
                      {l==="es"?"Leer":l==="en"?"Read":l==="fr"?"Lire":l==="de"?"Lesen":"Leggi"} <Arrow size={14} />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding:"96px 20px" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div className="card-glow" style={{ padding:"64px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
            {/* Background glow */}
            <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%",
              background:"rgba(0,229,204,0.04)", filter:"blur(80px)",
              top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
            <div className="float" style={{ fontSize:56, marginBottom:24, position:"relative", display:"block" }}>
              {l==="es"?"💎":l==="en"?"💎":l==="fr"?"💎":l==="de"?"💎":"💎"}
            </div>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:900, color:"#fff",
              letterSpacing:"-1px", marginBottom:14, position:"relative" }}>
              {t(l,"cta_title")}
            </h2>
            <p style={{ color:"var(--muted)", lineHeight:1.75, marginBottom:40,
              fontSize:16, maxWidth:480, margin:"0 auto 40px", position:"relative" }}>
              {t(l,"cta_sub")}
            </p>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-cta" style={{ fontSize:17, padding:"20px 52px", position:"relative" }}>
              {t(l,"cta_btn")} <Arrow size={20} />
            </a>
            <p style={{ fontSize:12, color:"var(--muted2)", marginTop:20, position:"relative" }}>{t(l,"cta_note")}</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════ */}
      <footer style={{ padding:"64px 20px 32px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:48 }}>

            {/* Brand */}
            <div>
              <div style={{ fontWeight:900, fontSize:26, marginBottom:16, letterSpacing:"-0.5px" }}>
                <span style={{ color:"var(--teal)" }}>Vixen</span><span style={{ color:"#fff" }}>Agency</span>
                <sup style={{ fontSize:10, color:"var(--teal)", opacity:.6, fontWeight:700, marginLeft:3 }}>PRO</sup>
              </div>
              <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.7, maxWidth:280, marginBottom:24 }}>
                {t(l,"footer_desc")}
              </p>
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#22c55e",
                  textDecoration:"none", fontWeight:800, fontSize:15 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"rgba(34,197,94,0.15)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>💬</div>
                +{WA.slice(0,2)} {WA.slice(2,4)} {WA.slice(4,7)} {WA.slice(7,10)} {WA.slice(10)}
              </a>
            </div>

            {/* Services */}
            <div>
              <p style={{ fontWeight:700, color:"#fff", fontSize:11, textTransform:"uppercase",
                letterSpacing:"0.1em", marginBottom:18 }}>
                {l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}
              </p>
              <div style={{ display:"grid", gap:9 }}>
                {services.slice(0,5).map(s => (
                  <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                    style={{ fontSize:13, color:"var(--muted)", textDecoration:"none",
                      display:"flex", alignItems:"center", gap:7, fontWeight:500 }}>
                    <span style={{ fontSize:13, opacity:.6 }}>{s.icon}</span> {s.kw}
                  </Link>
                ))}
              </div>
            </div>

            {/* Countries */}
            <div>
              <p style={{ fontWeight:700, color:"#fff", fontSize:11, textTransform:"uppercase",
                letterSpacing:"0.1em", marginBottom:18 }}>
                {l==="es"?"Países":l==="en"?"Countries":l==="fr"?"Pays":l==="de"?"Länder":"Paesi"}
              </p>
              <div style={{ display:"grid", gap:9 }}>
                {countryKeys.slice(0,7).map(ck => {
                  const c = COUNTRIES[ck];
                  return (
                    <Link key={ck} href={`/${l}/${ck}/`}
                      style={{ fontSize:13, color:"var(--muted)", textDecoration:"none",
                        display:"flex", alignItems:"center", gap:7, fontWeight:500 }}>
                      <span>{c.flag}</span> {c.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Blog + Languages */}
            <div>
              <p style={{ fontWeight:700, color:"#fff", fontSize:11, textTransform:"uppercase",
                letterSpacing:"0.1em", marginBottom:18 }}>Blog</p>
              <div style={{ display:"grid", gap:9, marginBottom:28 }}>
                {posts.slice(0,4).map(p => (
                  <Link key={p.slug} href={`/${l}/blog/${p.slug}/`}
                    style={{ fontSize:12, color:"var(--muted)", textDecoration:"none", lineHeight:1.35, fontWeight:500 }}>
                    → {p.title.slice(0,36)}…
                  </Link>
                ))}
              </div>
              <p style={{ fontWeight:700, color:"#fff", fontSize:11, textTransform:"uppercase",
                letterSpacing:"0.1em", marginBottom:12 }}>
                {l==="es"?"Idiomas":l==="en"?"Languages":l==="fr"?"Langues":l==="de"?"Sprachen":"Lingue"}
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {LOCALES.map(loc => (
                  <Link key={loc} href={`/${loc}/`}
                    style={{ fontSize:10, padding:"4px 8px", borderRadius:6, textDecoration:"none",
                      fontFamily:"monospace", textTransform:"uppercase", fontWeight:800,
                      color: loc===l ? "var(--teal)" : "var(--muted2)",
                      background: loc===l ? "rgba(0,229,204,0.1)" : "rgba(255,255,255,0.03)",
                      border:`1px solid ${loc===l ? "rgba(0,229,204,0.3)" : "rgba(255,255,255,0.07)"}` }}>
                    {loc}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:24,
            display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <p style={{ fontSize:12, color:"var(--muted2)", fontWeight:500 }}>© 2026 VixenAgency · {t(l,"footer_rights")}</p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.1)" }}>{t(l,"footer_disclaimer")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
