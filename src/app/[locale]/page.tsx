import type { Metadata } from "next";
import Link from "next/link";
import {
  LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES,
  SERVICES, BASE_URL, WA, waLink, waMsg
} from "@/lib/config";
import { TR, t, ta, ta2 } from "@/lib/translations";
import { POSTS } from "@/lib/blog";
import { IMGS } from "@/lib/images";
import MegaNav from "@/components/MegaNav";

export async function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }));
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const l = locale as Locale;
  const tr = TR[l] as Record<string,string>;
  return { title: tr.meta_title, description: tr.meta_desc };
}

const Stars = () => (
  <div style={{ display:"flex", gap:3 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
        <path d="M7 1l1.5 4.5H13L9.5 8.5l1 4.5L7 10.5l-3.5 2.5 1-4.5L1 5.5h4.5L7 1z"/>
      </svg>
    ))}
  </div>
);

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Avatar photos — real Unsplash faces
const AVATARS = [IMGS.woman1, IMGS.woman2, IMGS.woman3, IMGS.woman4, IMGS.woman5, IMGS.woman6];
const AV_COLORS = ["#00e5cc","#7c3aed","#f59e0b","#ec4899"];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const l = locale as Locale;
  const href = waLink(waMsg(l));
  const countryKeys = LOCALE_COUNTRIES[l] ?? [];
  const services = SERVICES[l] ?? [];
  const posts = POSTS.filter(p => p.locale === l);
  const navPosts = posts.slice(0,6).map(p => ({ slug:p.slug, title:p.title }));

  const reviewSchema = {
    "@context":"https://schema.org","@type":"Product","name":"VixenAgency — Agencia OnlyFans",
    "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"183","bestRating":"5"},
  };
  const faqSchema = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":ta2(l,"faqs").map(([q,a])=>({ "@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a} })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MegaNav locale={l} posts={navPosts} />

      {/* ═══ HERO — split layout con imagen real ════════════════════════ */}
      <section style={{ position:"relative", overflow:"hidden", minHeight:"92vh", display:"flex", alignItems:"center" }}>
        {/* BG */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 80% at 0% 50%, rgba(0,229,204,0.08) 0%, transparent 60%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize:"44px 44px", pointerEvents:"none" }} />

        <div style={{ maxWidth:1280, margin:"0 auto", padding:"80px 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center", position:"relative", width:"100%" }}>
          
          {/* Left: copy */}
          <div>
            <div className="badge" style={{ marginBottom:28 }}>
              <span className="dot-live" />
              {t(l,"badge")}
            </div>

            <h1 style={{ fontSize:"clamp(2.6rem,5vw,4.4rem)", fontWeight:900, color:"#fff", lineHeight:1.06, letterSpacing:"-2.5px", marginBottom:8 }}>
              {t(l,"hero_h1")}
            </h1>
            <div className="g-teal" style={{ fontSize:"clamp(2.2rem,4.5vw,3.8rem)", fontWeight:900, lineHeight:1.06, letterSpacing:"-2px", marginBottom:24 }}>
              {t(l,"hero_h1_accent")}
            </div>
            <p style={{ fontSize:17, color:"var(--muted)", lineHeight:1.75, marginBottom:40, maxWidth:520 }}>
              {t(l,"hero_desc")}
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:32 }}>
              <a href={href} target="_blank" rel="noopener noreferrer"
                className="btn btn-cta" style={{ fontSize:16, padding:"18px 40px" }}>
                {t(l,"hero_cta")} <Arrow />
              </a>
              <Link href={`/${l}/#resultados`} className="btn btn-outline" style={{ fontSize:14 }}>
                {t(l,"hero_cta2")}
              </Link>
            </div>

            <p style={{ fontSize:13, color:"var(--muted2)" }}>{t(l,"hero_trust")}</p>

            {/* Social proof avatars */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:32, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display:"flex" }}>
                {AVATARS.slice(0,5).map((src,i) => (
                  <div key={i} style={{ width:36, height:36, borderRadius:"50%", border:"2px solid var(--bg)", marginLeft:i>0?-10:0, overflow:"hidden", position:"relative", zIndex:5-i }}>
                    <img src={src} alt="Creadora VixenAgency" width={36} height={36} style={{ objectFit:"cover", width:"100%", height:"100%" }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <Stars />
                  <span style={{ fontWeight:800, color:"#fff", fontSize:14 }}>4.9/5</span>
                </div>
                <p style={{ fontSize:12, color:"var(--muted2)" }}>+200 {l==="es"?"creadoras activas":l==="en"?"active creators":l==="fr"?"créatrices actives":l==="de"?"aktive Creator":"creator attive"}</p>
              </div>
            </div>
          </div>

          {/* Right: hero image */}
          <div style={{ position:"relative" }}>
            {/* Glow behind image */}
            <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"rgba(0,229,204,0.12)", filter:"blur(80px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
            
            {/* Main image */}
            <div style={{ position:"relative", borderRadius:28, overflow:"hidden", boxShadow:"0 40px 120px rgba(0,0,0,0.6)" }}>
              <img src={IMGS.hero} alt="Creadora de contenido gestionada por VixenAgency" width={520} height={640}
                style={{ width:"100%", height:"auto", display:"block", objectFit:"cover" }} />
              
              {/* Overlay gradient at bottom */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"40%", background:"linear-gradient(to top, rgba(4,6,15,0.8), transparent)" }} />

              {/* Floating stat card */}
              <div style={{ position:"absolute", bottom:28, left:24, right:24, background:"rgba(4,6,15,0.85)", backdropFilter:"blur(20px)", borderRadius:16, padding:"16px 20px", border:"1px solid rgba(0,229,204,0.2)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontWeight:900, fontSize:22, color:"var(--teal)", letterSpacing:"-1px" }}>+340%</p>
                  <p style={{ fontSize:11, color:"var(--muted2)", marginTop:2 }}>{l==="es"?"aumento ingresos":l==="en"?"income increase":l==="fr"?"hausse revenus":l==="de"?"Einnahmensteigerung":"aumento guadagni"}</p>
                </div>
                <div style={{ width:1, height:36, background:"rgba(255,255,255,0.1)" }} />
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontWeight:900, fontSize:22, color:"#7c3aed", letterSpacing:"-1px" }}>30d</p>
                  <p style={{ fontSize:11, color:"var(--muted2)", marginTop:2 }}>{l==="es"?"primeros resultados":l==="en"?"first results":l==="fr"?"premiers résultats":l==="de"?"erste Ergebnisse":"primi risultati"}</p>
                </div>
                <div style={{ width:1, height:36, background:"rgba(255,255,255,0.1)" }} />
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontWeight:900, fontSize:22, color:"#f59e0b", letterSpacing:"-1px" }}>200+</p>
                  <p style={{ fontSize:11, color:"var(--muted2)", marginTop:2 }}>{l==="es"?"creadoras":l==="en"?"creators":l==="fr"?"créatrices":l==="de"?"Creator":"creator"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TICKER ═════════════════════════════════════════════════════════ */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"12px 0" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...ta(l,"ticker"),...ta(l,"ticker"),...ta(l,"ticker")].map((item,i) => (
              <span key={i} style={{ fontSize:12, fontWeight:600, color:"var(--muted2)", padding:"0 32px", display:"flex", alignItems:"center", gap:28, whiteSpace:"nowrap" }}>
                {item}
                <svg width="5" height="5" viewBox="0 0 5 5" fill="rgba(0,229,204,0.35)"><circle cx="2.5" cy="2.5" r="2.5"/></svg>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ LIFESTYLE GRID — 3 imágenes + copy ════════════════════════════ */}
      <section style={{ padding:"88px 24px", background:"var(--bg2)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          
          {/* Left: image mosaic */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"280px 280px", gap:16 }}>
            <div style={{ gridRow:"1/3", borderRadius:24, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.4)" }}>
              <img src={IMGS.woman2} alt="Creadora de OnlyFans gestionada profesionalmente" width={400} height={580} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
            <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 16px 40px rgba(0,0,0,0.4)" }}>
              <img src={IMGS.luxury1} alt="Lifestyle de creadora exitosa de OnlyFans" width={300} height={280} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
            <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 16px 40px rgba(0,0,0,0.4)", position:"relative" }}>
              <img src={IMGS.woman3} alt="Modelo gestionada por agencia OnlyFans" width={300} height={280} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              {/* Label overlay */}
              <div style={{ position:"absolute", bottom:14, left:14, right:14, background:"rgba(4,6,15,0.85)", backdropFilter:"blur(10px)", borderRadius:12, padding:"10px 14px", border:"1px solid rgba(0,229,204,0.2)" }}>
                <p style={{ fontSize:11, fontWeight:700, color:"var(--teal)" }}>Camila R. · Colombia</p>
                <p style={{ fontSize:13, fontWeight:800, color:"#fff" }}>680€ → 4.200€/mes</p>
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <span className="lbl">{l==="es"?"Por qué VixenAgency":l==="en"?"Why VixenAgency":l==="fr"?"Pourquoi VixenAgency":l==="de"?"Warum VixenAgency":"Perché VixenAgency"}</span>
            <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.1, marginBottom:20 }}>
              {l==="es"?"Somos más que una agencia — somos tu socio estratégico":
               l==="en"?"We are more than an agency — we are your strategic partner":
               l==="fr"?"Nous sommes plus qu'une agence — votre partenaire stratégique":
               l==="de"?"Mehr als eine Agentur — dein strategischer Partner":
               "Più di un'agenzia — il tuo partner strategico"}
            </h2>
            <p style={{ color:"var(--muted)", lineHeight:1.8, fontSize:16, marginBottom:32 }}>
              {l==="es"?"Las creadoras que trabajan con VixenAgency no solo ganan más — viven mejor. Menos horas gestionando fans, más libertad para crear. Nuestro equipo se encarga de absolutamente todo lo que no es grabar.":
               l==="en"?"Creators who work with VixenAgency don't just earn more — they live better. Fewer hours managing fans, more freedom to create. Our team handles absolutely everything that isn't filming.":
               l==="fr"?"Les créatrices qui travaillent avec VixenAgency ne gagnent pas seulement plus — elles vivent mieux. Moins d'heures à gérer les fans, plus de liberté pour créer.":
               l==="de"?"Creator die mit VixenAgency arbeiten, verdienen nicht nur mehr — sie leben besser. Weniger Stunden mit Fan-Management, mehr Freiheit zum Erstellen.":
               "Le creator che lavorano con VixenAgency non guadagnano solo di più — vivono meglio. Meno ore a gestire i fan, più libertà per creare."}
            </p>
            <div style={{ display:"grid", gap:12, marginBottom:36 }}>
              {ta2(l,"sv").slice(0,4).map(([icon,title,desc],i) => (
                <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:"rgba(0,229,204,0.08)", border:"1px solid rgba(0,229,204,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontWeight:700, color:"#fff", fontSize:14, marginBottom:2 }}>{title}</p>
                    <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.55 }}>{desc.split(".")[0]}.</p>
                  </div>
                </div>
              ))}
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-cta" style={{ fontSize:15, padding:"16px 36px" }}>
              {t(l,"hero_cta")} <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ RESULTS — testimonials con fotos reales ════════════════════════ */}
      <section id="resultados" style={{ padding:"88px 24px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="lbl">{l==="es"?"Casos reales":l==="en"?"Real cases":l==="fr"?"Cas réels":l==="de"?"Echte Fälle":"Casi reali"}</span>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, color:"#fff", letterSpacing:"-1px", marginBottom:10 }}>
              {t(l,"results_title")}
            </h2>
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:10 }}>
              <Stars />
              <span style={{ fontWeight:900, color:"#fff", fontSize:18 }}>4.9</span>
              <span style={{ color:"var(--muted)", fontSize:13 }}>/ 183 {l==="es"?"reseñas":l==="en"?"reviews":l==="fr"?"avis":l==="de"?"Bewertungen":"recensioni"}</span>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {ta2(l,"results").map(([name,loc,before,after,time,quote,color],i) => (
              <div key={i} className="card" style={{ overflow:"hidden", position:"relative" }}>
                {/* Top accent */}
                <div style={{ height:3, background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
                
                {/* Photo header */}
                <div style={{ height:160, overflow:"hidden", position:"relative" }}>
                  <img src={AVATARS[i % AVATARS.length]} alt={`Creadora ${name}`} width={400} height={200}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom, transparent 40%, rgba(4,6,15,0.95))` }} />
                  {/* Income pill */}
                  <div style={{ position:"absolute", bottom:14, left:16, right:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <p style={{ fontWeight:900, color:"#fff", fontSize:13 }}>{name}</p>
                      <p style={{ color:"rgba(255,255,255,0.6)", fontSize:11 }}>{loc}</p>
                    </div>
                    <div style={{ background:`${color}20`, border:`1px solid ${color}40`, borderRadius:10, padding:"4px 12px", textAlign:"center" }}>
                      <p style={{ fontSize:10, color:"rgba(255,255,255,0.5)", marginBottom:1 }}>{t(l,"after")}</p>
                      <p style={{ fontWeight:900, color, fontSize:15 }}>{after}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding:"20px 22px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                    <Stars />
                    <span style={{ fontSize:11, color:"var(--muted2)" }}>{t(l,"in_t")} {time}</span>
                  </div>
                  <blockquote style={{ borderLeft:`2px solid ${color}`, paddingLeft:12 }}>
                    <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.65, fontStyle:"italic" }}>
                      {(quote as string)?.replace(/\\\\"/g,'"')}
                    </p>
                  </blockquote>
                  <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1, height:4, borderRadius:2, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
                      <div style={{ height:"100%", background:`linear-gradient(90deg,${color},transparent)`, width:"80%" }} />
                    </div>
                    <span style={{ fontSize:11, color:"var(--muted2)", whiteSpace:"nowrap" }}>
                      {before} → <strong style={{ color }}>{after}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ════════════════════════════════════════════════════════ */}
      <section id="como" style={{ padding:"88px 24px", background:"var(--bg2)" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <span className="lbl">{l==="es"?"Proceso":l==="en"?"Process":l==="fr"?"Processus":l==="de"?"Prozess":"Processo"}</span>
            <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, color:"#fff", letterSpacing:"-1px" }}>{t(l,"how_title")}</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
            {ta2(l,"how").map(([n,title,desc],i) => (
              <div key={i} className="card" style={{ padding:"28px 24px", textAlign:"center", position:"relative" }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:`linear-gradient(135deg,var(--teal),#0ea5e9)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:22, color:"#020b18", margin:"0 auto 18px", boxShadow:"0 8px 24px rgba(0,229,204,0.25)" }}>
                  {i+1}
                </div>
                <h3 style={{ fontWeight:800, color:"#fff", fontSize:17, marginBottom:10, letterSpacing:"-0.3px" }}>{title}</h3>
                <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:48 }}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-cta" style={{ fontSize:16, padding:"18px 44px" }}>
              {t(l,"hero_cta")} <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══════════════════════════════════════════════════════ */}
      <section id="servicios" style={{ padding:"88px 24px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ marginBottom:56 }}>
            <span className="lbl">{l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}</span>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:12 }}>
              <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#fff", letterSpacing:"-1px" }}>
                {t(l,"services_title")}
              </h2>
              <p style={{ color:"var(--muted)", maxWidth:460 }}>{t(l,"services_sub")}</p>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:16, marginBottom:24 }}>
            {ta2(l,"sv").map(([icon,title,desc],i) => (
              <div key={i} className="card" style={{ padding:"28px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,rgba(0,229,204,${0.15+i*0.04}),transparent)` }} />
                <div style={{ width:52, height:52, borderRadius:14, marginBottom:18, background:"rgba(0,229,204,0.07)", border:"1px solid rgba(0,229,204,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight:800, color:"#fff", fontSize:18, marginBottom:8, letterSpacing:"-0.3px" }}>{title}</h3>
                <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.65, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical" }}>{desc}</p>
              </div>
            ))}
          </div>
          {services.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {services.map(s => (
                <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                  style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, padding:"7px 16px", borderRadius:999, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"var(--muted)", textDecoration:"none", fontWeight:600 }}>
                  {s.icon} {s.kw}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ COUNTRIES ══════════════════════════════════════════════════════ */}
      {countryKeys.length > 1 && (
        <section style={{ padding:"64px 24px", background:"var(--bg2)" }}>
          <div style={{ maxWidth:1080, margin:"0 auto", textAlign:"center" }}>
            <span className="lbl">{l==="es"?"Cobertura global":l==="en"?"Global coverage":l==="fr"?"Couverture":"Länder"}</span>
            <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.1rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.5px", marginBottom:32 }}>
              {l==="es"?"Operamos en toda América Latina y más":l==="en"?"We operate across the Americas and beyond":l==="fr"?"Nous opérons dans toute la francophonie":"DACH und weltweit"}
            </h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
              {countryKeys.map(ck => {
                const c = COUNTRIES[ck];
                return (
                  <Link key={ck} href={`/${l}/${ck}/`} className="card"
                    style={{ padding:"12px 20px", display:"inline-flex", alignItems:"center", gap:10, textDecoration:"none" }}>
                    <span style={{ fontSize:22 }}>{c.flag}</span>
                    <div style={{ textAlign:"left" }}>
                      <p style={{ fontWeight:700, color:"#fff", fontSize:13 }}>{c.name}</p>
                      <p style={{ color:"var(--muted)", fontSize:11 }}>{c.city}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ════════════════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 24px" }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="lbl">FAQ</span>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.4rem)", fontWeight:900, color:"#fff", letterSpacing:"-1px" }}>{t(l,"faq_title")}</h2>
          </div>
          <div style={{ display:"grid", gap:10 }}>
            {ta2(l,"faqs").map(([q,a],i) => (
              <details key={i} className="card" style={{ padding:0 }}>
                <summary style={{ padding:"20px 24px", fontWeight:700, color:"#fff", cursor:"pointer", fontSize:15, display:"flex", justifyContent:"space-between", alignItems:"center", userSelect:"none", listStyle:"none" }}>
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

      {/* ═══ BLOG ═══════════════════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section style={{ padding:"88px 24px", background:"var(--bg2)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:14 }}>
              <div>
                <span className="lbl">Blog</span>
                <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.5px" }}>
                  {l==="es"?"Guías y estrategias":l==="en"?"Guides & strategies":l==="fr"?"Guides & stratégies":l==="de"?"Ratgeber":"Guide"}
                </h2>
              </div>
              <Link href={`/${l}/blog/`} className="btn btn-outline" style={{ fontSize:13, padding:"10px 20px", borderRadius:10, flexShrink:0 }}>
                {l==="es"?"Ver todos":l==="en"?"View all":l==="fr"?"Voir tout":l==="de"?"Alle":"Vedi tutti"} <Arrow />
              </Link>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:18 }}>
              {posts.slice(0,3).map((p,i) => (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration:"none" }}>
                  <article className="card" style={{ padding:28, height:"100%", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,rgba(0,229,204,${0.15+i*0.08}),transparent)` }} />
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"var(--teal)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{p.date}</span>
                      <div style={{ width:3, height:3, borderRadius:"50%", background:"var(--border)" }} />
                      <span style={{ fontSize:10, color:"var(--muted2)", fontWeight:600 }}>{p.kw[0]}</span>
                    </div>
                    <h3 style={{ fontWeight:800, color:"#fff", fontSize:17, marginBottom:10, lineHeight:1.3, flex:1, letterSpacing:"-0.3px" }}>{p.title}</h3>
                    <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.6, marginBottom:18, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{p.excerpt}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:6, color:"var(--teal)", fontSize:13, fontWeight:700 }}>
                      {l==="es"?"Leer":l==="en"?"Read":l==="fr"?"Lire":l==="de"?"Lesen":"Leggi"} <Arrow />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA FINAL ══════════════════════════════════════════════════════ */}
      <section style={{ padding:"96px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 80% at 50% 100%, rgba(0,229,204,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center", position:"relative" }}>
          <div className="card-glow" style={{ padding:"64px 48px" }}>
            <span className="lbl"style={{ justifyContent:"center", display:"block" }}>VixenAgency</span>
            <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, color:"#fff", letterSpacing:"-1.5px", marginBottom:14 }}>
              {t(l,"cta_title")}
            </h2>
            <p style={{ color:"var(--muted)", lineHeight:1.75, marginBottom:40, fontSize:16, maxWidth:480, margin:"0 auto 40px" }}>
              {t(l,"cta_sub")}
            </p>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-cta" style={{ fontSize:17, padding:"20px 52px" }}>
              {t(l,"cta_btn")} <Arrow />
            </a>
            <p style={{ fontSize:12, color:"var(--muted2)", marginTop:20 }}>{t(l,"cta_note")}</p>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════════════════════════ */}
      <footer style={{ padding:"64px 24px 32px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:48 }}>
            <div>
              <div style={{ fontWeight:900, fontSize:26, marginBottom:16, letterSpacing:"-0.5px" }}>
                <span style={{ color:"var(--teal)" }}>Vixen</span><span style={{ color:"#fff" }}>Agency</span>
              </div>
              <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.7, maxWidth:280, marginBottom:24 }}>{t(l,"footer_desc")}</p>
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#22c55e", textDecoration:"none", fontWeight:800, fontSize:15 }}>
                <span style={{ fontSize:20 }}>💬</span> +{WA.slice(0,2)} {WA.slice(2,4)} {WA.slice(4,7)} {WA.slice(7,10)} {WA.slice(10)}
              </a>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"#fff", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:18 }}>
                {l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}
              </p>
              <div style={{ display:"grid", gap:9 }}>
                {services.slice(0,5).map(s => (
                  <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                    style={{ fontSize:13, color:"var(--muted)", textDecoration:"none", display:"flex", alignItems:"center", gap:6, fontWeight:500 }}>
                    <span style={{ fontSize:13, opacity:.6 }}>{s.icon}</span> {s.kw}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"#fff", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:18 }}>
                {l==="es"?"Países":l==="en"?"Countries":l==="fr"?"Pays":l==="de"?"Länder":"Paesi"}
              </p>
              <div style={{ display:"grid", gap:9 }}>
                {countryKeys.slice(0,7).map(ck => {
                  const c = COUNTRIES[ck];
                  return (
                    <Link key={ck} href={`/${l}/${ck}/`}
                      style={{ fontSize:13, color:"var(--muted)", textDecoration:"none", display:"flex", alignItems:"center", gap:7, fontWeight:500 }}>
                      <span>{c.flag}</span> {c.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"#fff", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:18 }}>Blog</p>
              <div style={{ display:"grid", gap:9, marginBottom:24 }}>
                {posts.slice(0,4).map(p => (
                  <Link key={p.slug} href={`/${l}/blog/${p.slug}/`}
                    style={{ fontSize:12, color:"var(--muted)", textDecoration:"none", lineHeight:1.35, fontWeight:500 }}>
                    → {p.title.slice(0,36)}…
                  </Link>
                ))}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {LOCALES.map(loc => (
                  <Link key={loc} href={`/${loc}/`}
                    style={{ fontSize:10, padding:"4px 8px", borderRadius:6, textDecoration:"none", fontFamily:"monospace", textTransform:"uppercase", fontWeight:800,
                      color:loc===l?"var(--teal)":"var(--muted2)",
                      background:loc===l?"rgba(0,229,204,0.1)":"rgba(255,255,255,0.03)",
                      border:`1px solid ${loc===l?"rgba(0,229,204,0.3)":"rgba(255,255,255,0.07)"}` }}>
                    {loc}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <p style={{ fontSize:12, color:"var(--muted2)" }}>© 2026 VixenAgency · {t(l,"footer_rights")}</p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.1)" }}>{t(l,"footer_disclaimer")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
