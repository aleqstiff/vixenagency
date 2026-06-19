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

export async function generateStaticParams() { return LOCALES.map(l => ({ locale: l })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const l = locale as Locale;
  const tr = TR[l] as Record<string,string>;
  return { title: tr.meta_title, description: tr.meta_desc };
}

// ── SVG components ────────────────────────────────────────────────────────
const Stars = () => (
  <span style={{ display:"flex", gap:2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#d97b3a">
        <path d="M7 1l1.5 4.5H13L9.5 8.5l1 4.5L7 10.5l-3.5 2.5 1-4.5L1 5.5h4.5L7 1z"/>
      </svg>
    ))}
  </span>
);

const Arr = ({ c="currentColor", s=18 }: { c?:string; s?:number }) => (
  <svg width={s} height={s} viewBox="0 0 18 18" fill="none" style={{ flexShrink:0 }}>
    <path d="M3 9h12M10 4l5 5-5 5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0, marginTop:1 }}>
    <circle cx="10" cy="10" r="9.5" fill="rgba(200,112,90,0.1)" stroke="rgba(200,112,90,0.35)"/>
    <path d="M6 10l3 3 5-6" stroke="var(--rose)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Monogram avatar — looks real, not stock ───────────────────────────────
const Avatar = ({ name, country, size=48 }: { name:string; country:string; size?:number }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  const colors = ["#c8705a","#8b6cb0","#b8975a","#4a9b7a","#c8705a","#7a8eb0"];
  const idx = name.charCodeAt(0) % colors.length;
  const bg = colors[idx];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`${bg}18`, border:`2px solid ${bg}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:800, fontSize:size*0.36, color:bg, letterSpacing:"-0.5px" }}>
        {initials}
      </span>
    </div>
  );
};

// ── Results — specific, credible ──────────────────────────────────────────
const CASES = [
  { name:"Sofía R.", country:"Madrid 🇪🇸", before:"320€", after:"2.140€/mes", time:"8 semanas", pct:"+568%", q:"Triipliqué sin mostrar la cara. Los chatters lo hacen de forma tan natural que los fans ni lo notan.", color:"#c8705a" },
  { name:"Valentina M.", country:"Buenos Aires 🇦🇷", before:"0€", after:"1.850€/mes", time:"6 semanas", pct:"De 0 a top", q:"Empecé completamente de cero. En 6 semanas ganaba más que en mi trabajo anterior.", color:"#8b6cb0" },
  { name:"Camila R.", country:"Medellín 🇨🇴", before:"680€", after:"4.200€/mes", time:"3 meses", pct:"+518%", q:"El sistema PPV cambió todo. El 73% de mis ingresos ahora viene de mensajes directos, no de suscripciones.", color:"#b8975a" },
  { name:"Mariana S.", country:"São Paulo 🇧🇷", before:"R$1.200", after:"R$9.800/mes", time:"3 meses", pct:"+717%", q:"Me posicionaron en el mercado USA. El 80% de mis fans son americanos. Era algo que nunca hubiera conseguido sola.", color:"#4a9b7a" },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const l = locale as Locale;
  const href = waLink(waMsg(l));
  const countryKeys = LOCALE_COUNTRIES[l] ?? [];
  const services = SERVICES[l] ?? [];
  const posts = POSTS.filter(p => p.locale === l);
  const navPosts = posts.slice(0,6).map(p => ({ slug:p.slug, title:p.title }));

  const faqSchema = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":ta2(l,"faqs").map(([q,a])=>({ "@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a} })),
  };
  const orgSchema = {
    "@context":"https://schema.org","@type":"LocalBusiness","name":"VixenAgency","url":BASE_URL,"@id":BASE_URL,
    "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"183","bestRating":"5"},
    "areaServed":["ES","MX","AR","CO","CL","PE","US","CA","FR","DE","IT","BR"],
  };

  const CTA: Record<Locale,string> = { es:"Solicitar análisis gratuito",en:"Request free analysis",fr:"Demander une analyse",de:"Kostenlose Analyse",it:"Analisi gratuita",pt:"Análise gratuita" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <MegaNav locale={l} posts={navPosts} />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section style={{ background:"var(--cream)", padding:"80px 20px", minHeight:"88vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(26,22,18,0.03) 1px,transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"-20%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"rgba(200,112,90,0.08)", filter:"blur(80px)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }} className="hero-grid">
          
          {/* Copy */}
          <div>
            <div className="badge" style={{ marginBottom:24 }}>
              <span className="dot-live" />{t(l,"badge")}
            </div>

            <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:800, color:"var(--dark)", lineHeight:1.1, letterSpacing:"-1px", marginBottom:6, fontStyle:"italic" }}>
              {t(l,"hero_h1")}
            </h1>
            <div className="g-rose" style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2rem,4.5vw,3.6rem)", fontWeight:800, lineHeight:1.1, letterSpacing:"-1px", marginBottom:22 }}>
              {t(l,"hero_h1_accent")}
            </div>
            <p style={{ fontSize:16, color:"var(--muted)", lineHeight:1.8, marginBottom:32, maxWidth:500 }}>
              {t(l,"hero_desc")}
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ fontSize:15, padding:"17px 36px" }}>
                {CTA[l]} <Arr c="#fff" />
              </a>
              <Link href={`/${l}/#resultados`} className="btn btn-outline-dark" style={{ fontSize:14 }}>
                {l==="es"?"Ver resultados":l==="en"?"See results":l==="fr"?"Voir résultats":l==="de"?"Ergebnisse":"Vedi risultati"}
              </Link>
            </div>

            <p style={{ fontSize:12, color:"var(--muted2)" }}>{t(l,"hero_trust")}</p>

            {/* Social proof — sin fotos stock, solo initials + rating */}
            <div style={{ marginTop:28, padding:"18px 22px", background:"#fff", borderRadius:16, border:"1px solid var(--border)", display:"flex", alignItems:"center", gap:14, maxWidth:420, boxShadow:"0 2px 16px rgba(26,22,18,0.07)" }}>
              {/* Stacked initials */}
              <div style={{ display:"flex" }}>
                {["SR","VM","CR","MS"].map((init,i) => (
                  <div key={i} style={{ width:36, height:36, borderRadius:"50%", marginLeft:i>0?-10:0, border:"2px solid var(--cream)", background:["#c8705a","#8b6cb0","#b8975a","#4a9b7a"][i]+"20", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:12, color:["#c8705a","#8b6cb0","#b8975a","#4a9b7a"][i] }}>{init}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                  <Stars />
                  <span style={{ fontWeight:800, color:"var(--dark)", fontSize:15 }}>4.9</span>
                </div>
                <p style={{ fontSize:12, color:"var(--muted)" }}>+200 {l==="es"?"creadoras activas":l==="en"?"active creators":l==="fr"?"créatrices actives":l==="de"?"aktive Creator":"creator"}</p>
              </div>
            </div>
          </div>

          {/* Image — solo 1 foto limpia, bien montada */}
          <div className="hero-img" style={{ position:"relative" }}>
            <div style={{ position:"absolute", width:420, height:420, borderRadius:"50%", background:"rgba(200,112,90,0.1)", filter:"blur(70px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
            <div style={{ position:"relative", borderRadius:28, overflow:"hidden", boxShadow:"0 32px 80px rgba(26,22,18,0.2)", aspectRatio:"4/5" }}>
              <img
                src={IMGS.hero}
                alt={l==="es"?"Creadora de OnlyFans":l==="en"?"OnlyFans creator":l==="fr"?"Créatrice OnlyFans":"OnlyFans Creator"}
                width={520} height={650}
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }}
              />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", background:"linear-gradient(to top, rgba(26,22,18,0.75), transparent)" }} />
              {/* Result card */}
              <div style={{ position:"absolute", bottom:22, left:18, right:18, background:"rgba(255,255,255,0.96)", backdropFilter:"blur(16px)", borderRadius:14, padding:"14px 18px" }}>
                <p style={{ fontSize:10, color:"var(--muted)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600 }}>Camila R. · Medellín 🇨🇴</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <p style={{ fontSize:11, color:"var(--muted2)" }}>{t(l,"before")}</p>
                    <p style={{ fontWeight:800, fontSize:16, color:"rgba(26,22,18,0.25)" }}>680€</p>
                  </div>
                  <div style={{ flex:1, margin:"0 10px" }}>
                    <div style={{ height:3, borderRadius:2, background:"linear-gradient(90deg,rgba(200,112,90,0.2),var(--rose))" }} />
                    <p style={{ fontSize:10, color:"var(--muted2)", textAlign:"center", marginTop:2 }}>3 meses</p>
                  </div>
                  <div>
                    <p style={{ fontSize:11, color:"var(--muted2)" }}>{t(l,"after")}</p>
                    <p style={{ fontWeight:900, fontSize:20, color:"var(--rose)" }}>4.200€</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div style={{ position:"absolute", top:28, right:-12, background:"var(--dark)", color:"#fff", borderRadius:12, padding:"10px 14px", boxShadow:"0 6px 20px rgba(26,22,18,0.2)", textAlign:"center" }}>
              <p style={{ fontSize:20, fontWeight:900, color:"var(--gold2)", fontFamily:"'Playfair Display',serif", lineHeight:1 }}>+340%</p>
              <p style={{ fontSize:10, color:"rgba(255,255,255,0.5)", marginTop:2 }}>{l==="es"?"media":l==="en"?"average":"Ø"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════════════ */}
      <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"10px 0", background:"var(--cream2)" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...ta(l,"ticker"),...ta(l,"ticker"),...ta(l,"ticker")].map((item,i) => (
              <span key={i} style={{ fontSize:12, fontWeight:600, color:"var(--muted)", padding:"0 28px", display:"flex", alignItems:"center", gap:24, whiteSpace:"nowrap" }}>
                {item}
                <svg width="5" height="5" viewBox="0 0 5 5" fill="var(--rose2)"><circle cx="2.5" cy="2.5" r="2.5"/></svg>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          STATS — clean numbers
      ══════════════════════════════════════════════════ */}
      <section style={{ padding:"56px 20px", background:"#fff" }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div className="stats-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderRadius:20, overflow:"hidden", border:"1px solid var(--border)", boxShadow:"0 2px 20px rgba(26,22,18,0.05)" }}>
            {([
              ["+340%", l==="es"?"aumento medio de ingresos":l==="en"?"average income increase":l==="fr"?"hausse moyenne des revenus":l==="de"?"Ø Einnahmensteigerung":"aumento medio guadagni"],
              ["+200", l==="es"?"creadoras gestionadas":l==="en"?"creators managed":l==="fr"?"créatrices gérées":l==="de"?"betreute Creator":"creator gestite"],
              ["30d", l==="es"?"primeros resultados":l==="en"?"to first results":l==="fr"?"premiers résultats":l==="de"?"erste Ergebnisse":"ai primi risultati"],
              ["24/7", l==="es"?"chatters activos":l==="en"?"active chatters":l==="fr"?"chatteuses actives":l==="de"?"aktive Chatter":"chatter attivi"],
            ] as [string,string][]).map(([v,lbl],i) => (
              <div key={v} style={{ padding:"32px 20px", textAlign:"center", background:"#fff", borderRight:i<3?"1px solid var(--border)":"none" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, color:"var(--dark)", lineHeight:1, marginBottom:8 }}>{v}</div>
                <div style={{ fontSize:12, color:"var(--muted)", fontWeight:500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SOBRE — split con imagen, sin mosaico en móvil
      ══════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 20px", background:"var(--cream2)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }} className="split-grid">
          
          {/* Imagen + overlay — solo 1 foto, bien tratada */}
          <div className="mosaic" style={{ position:"relative" }}>
            <div style={{ borderRadius:24, overflow:"hidden", boxShadow:"0 24px 60px rgba(26,22,18,0.15)", aspectRatio:"3/4" }}>
              <img src={IMGS.mosaic1} alt={l==="es"?"Creadora de contenido":"Content creator"} width={500} height={660}
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 50%, rgba(26,22,18,0.6))" }} />
              {/* Overlay label */}
              <div style={{ position:"absolute", bottom:24, left:20, right:20, background:"rgba(255,255,255,0.95)", borderRadius:14, padding:"14px 18px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <p style={{ fontWeight:800, color:"var(--dark)", fontSize:15 }}>Sofía R.</p>
                    <p style={{ color:"var(--muted)", fontSize:12 }}>Madrid 🇪🇸 · 8 semanas</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontSize:10, color:"var(--muted2)", textTransform:"uppercase" }}>ingresos</p>
                    <p style={{ fontWeight:900, color:"var(--rose)", fontSize:18 }}>×6.6</p>
                  </div>
                </div>
                <div style={{ marginTop:10, height:4, borderRadius:2, background:"var(--cream2)", overflow:"hidden" }}>
                  <div style={{ width:"85%", height:"100%", background:"linear-gradient(90deg,var(--rose),var(--gold2))", borderRadius:2 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="lbl">{l==="es"?"Por qué VixenAgency":l==="en"?"Why VixenAgency":l==="fr"?"Pourquoi nous":l==="de"?"Warum VixenAgency":"Perché noi"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.7rem,3.5vw,2.6rem)", fontWeight:800, color:"var(--dark)", lineHeight:1.15, letterSpacing:"-0.5px", marginBottom:16 }}>
              {l==="es"?"Tu equipo detrás de todo — tú solo creas":
               l==="en"?"Your team behind everything — you only create":
               l==="fr"?"Notre équipe derrière tout — vous créez seulement":
               l==="de"?"Dein Team hinter allem — du erstellst nur":"Il tuo team dietro tutto — tu crei solo"}
            </h2>
            <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.8, marginBottom:28 }}>
              {l==="es"?"Las creadoras que trabajan con nosotras no gestionan fans, no planifican marketing, no hacen seguimiento de PPVs ni mandan informes. Nosotras lo hacemos todo. Resultado: más ingresos, más tiempo libre, menos estrés.":
               l==="en"?"The creators who work with us don't manage fans, plan marketing, track PPVs or send reports. We do it all. Result: more income, more free time, less stress.":
               l==="fr"?"Les créatrices qui travaillent avec nous ne gèrent pas les fans, ne planifient pas le marketing, ne suivent pas les PPV. Nous faisons tout. Résultat : plus de revenus, plus de liberté.":
               l==="de"?"Die Creator die mit uns arbeiten, verwalten keine Fans, planen kein Marketing, verfolgen keine PPVs. Wir machen alles. Ergebnis: mehr Einnahmen, mehr Freizeit.":
               "Le creator che lavorano con noi non gestiscono fan, non pianificano marketing, non tracciano PPV. Facciamo tutto noi."}
            </p>
            <div style={{ display:"grid", gap:14, marginBottom:36 }}>
              {[
                l==="es"?"Chatters humanos 24/7 en tu idioma — no bots":l==="en"?"Human chatters 24/7 in your language — not bots":l==="fr"?"Chatteuses humaines 24/7 dans votre langue":"Menschliche Chatter 24/7 in deiner Sprache",
                l==="es"?"PPV con secuencia de calentamiento — hasta 40% conversión":l==="en"?"PPV with warm-up sequence — up to 40% conversion":"PPV mit Aufwärmsequenz — bis 40% Konversion",
                l==="es"?"Marketing real en TikTok, Instagram y Reddit":l==="en"?"Real marketing on TikTok, Instagram and Reddit":"Echtes Marketing auf TikTok, Instagram und Reddit",
                l==="es"?"Anonimato total disponible si lo necesitas":l==="en"?"Full anonymity available if you need it":"Vollständige Anonymität verfügbar wenn du sie brauchst",
                l==="es"?"Sin cuota fija — solo % sobre lo que generamos":l==="en"?"No fixed fee — only % on what we generate":"Keine Fixgebühr — nur % auf Generiertes",
              ].map((item,i) => (
                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <Check />
                  <span style={{ fontSize:14, color:"var(--muted)", lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ fontSize:14, padding:"15px 32px" }}>
              {CTA[l]} <Arr c="#fff" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          RESULTADOS — monogram avatars + datos exactos
      ══════════════════════════════════════════════════ */}
      <section id="resultados" style={{ padding:"88px 20px", background:"#fff" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="lbl">{l==="es"?"Casos reales":l==="en"?"Real cases":l==="fr"?"Cas réels":l==="de"?"Echte Fälle":"Casi reali"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-1px", marginBottom:10, lineHeight:1.15 }}>
              {t(l,"results_title")}
            </h2>
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginBottom:4 }}>
              <Stars />
              <span style={{ fontWeight:800, color:"var(--dark)", fontSize:17 }}>4.9</span>
              <span style={{ color:"var(--muted)", fontSize:14 }}>· 183 {l==="es"?"reseñas verificadas":l==="en"?"verified reviews":l==="fr"?"avis vérifiés":l==="de"?"verifizierte Bewertungen":"recensioni verificate"}</span>
            </div>
            <p style={{ color:"var(--muted2)", fontSize:13 }}>{t(l,"results_sub")}</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
            {CASES.map((c,i) => (
              <div key={i} className="card" style={{ overflow:"hidden" }}>
                {/* Accent top */}
                <div style={{ height:4, background:c.color }} />
                <div style={{ padding:"24px 22px" }}>
                  {/* Header: monogram + info */}
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
                    <Avatar name={c.name} country={c.country} size={48} />
                    <div>
                      <p style={{ fontWeight:800, color:"var(--dark)", fontSize:16, lineHeight:1 }}>{c.name}</p>
                      <p style={{ color:"var(--muted)", fontSize:12, marginTop:3 }}>{c.country}</p>
                    </div>
                    <div style={{ marginLeft:"auto", textAlign:"right" }}>
                      <p style={{ fontSize:10, color:"var(--muted2)", textTransform:"uppercase", letterSpacing:"0.06em" }}>crecimiento</p>
                      <p style={{ fontWeight:900, fontSize:18, color:c.color, fontFamily:"'Playfair Display',serif" }}>{c.pct}</p>
                    </div>
                  </div>

                  <Stars />

                  {/* Before → After */}
                  <div style={{ display:"flex", alignItems:"center", gap:8, margin:"14px 0 14px" }}>
                    <div style={{ flex:1, padding:"10px 12px", background:"var(--cream2)", borderRadius:10, textAlign:"center" }}>
                      <p style={{ fontSize:10, color:"var(--muted2)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{t(l,"before")}</p>
                      <p style={{ fontWeight:800, fontSize:16, color:"rgba(26,22,18,0.3)" }}>{c.before}</p>
                    </div>
                    <div style={{ color:c.color, fontSize:18, fontWeight:700 }}>→</div>
                    <div style={{ flex:1, padding:"10px 12px", background:`${c.color}10`, border:`1px solid ${c.color}25`, borderRadius:10, textAlign:"center" }}>
                      <p style={{ fontSize:10, color:"var(--muted2)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{t(l,"after")}</p>
                      <p style={{ fontWeight:900, fontSize:17, color:c.color }}>{c.after}</p>
                    </div>
                  </div>

                  <p style={{ fontSize:12, color:"var(--muted2)", marginBottom:10, fontWeight:600 }}>
                    {t(l,"in_t")} <strong style={{ color:"var(--dark)" }}>{c.time}</strong>
                  </p>
                  <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.65, fontStyle:"italic", borderLeft:`2px solid ${c.color}`, paddingLeft:12 }}>
                    «{l==="es"?c.q:c.q}»
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center", marginTop:44 }}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ fontSize:15, padding:"17px 40px" }}>
              {CTA[l]} <Arr c="#fff" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════ */}
      <section id="servicios" style={{ padding:"88px 20px", background:"var(--cream2)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ marginBottom:48 }}>
            <span className="lbl">{l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-0.5px", marginBottom:8 }}>
              {t(l,"services_title")}
            </h2>
            <p style={{ color:"var(--muted)", maxWidth:500, fontSize:14, lineHeight:1.65 }}>{t(l,"services_sub")}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14, marginBottom:20 }}>
            {ta2(l,"sv").map(([icon,title,desc],i) => (
              <div key={i} className="card" style={{ padding:"26px", background:"#fff" }}>
                <div style={{ width:48, height:48, borderRadius:13, background:"rgba(200,112,90,0.08)", border:"1px solid rgba(200,112,90,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:14 }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight:700, color:"var(--dark)", fontSize:16, marginBottom:8 }}>{title}</h3>
                <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.65, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical" }}>{desc}</p>
              </div>
            ))}
          </div>
          {services.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {services.map(s => (
                <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                  style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, padding:"6px 14px", borderRadius:999, background:"#fff", border:"1px solid var(--border)", color:"var(--muted)", textDecoration:"none", fontWeight:600 }}>
                  {s.icon} {s.kw}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════ */}
      <section id="como" style={{ padding:"88px 20px", background:"#fff" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <span className="lbl">{l==="es"?"Proceso":l==="en"?"Process":l==="fr"?"Processus":l==="de"?"Prozess":"Processo"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-0.5px" }}>
              {t(l,"how_title")}
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:24 }}>
            {ta2(l,"how").map(([n,title,desc],i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"var(--dark)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:22, margin:"0 auto 18px", boxShadow:"0 6px 20px rgba(26,22,18,0.15)" }}>
                  {i+1}
                </div>
                <h3 style={{ fontWeight:700, color:"var(--dark)", fontSize:16, marginBottom:8 }}>{title}</h3>
                <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:44 }}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ fontSize:15, padding:"17px 40px" }}>
              {CTA[l]} <Arr c="#fff" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COUNTRIES
      ══════════════════════════════════════════════════ */}
      {countryKeys.length > 1 && (
        <section style={{ padding:"64px 20px", background:"var(--cream2)" }}>
          <div style={{ maxWidth:1080, margin:"0 auto", textAlign:"center" }}>
            <span className="lbl">{l==="es"?"Cobertura":l==="en"?"Coverage":l==="fr"?"Couverture":"Länder"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:700, color:"var(--dark)", letterSpacing:"-0.3px", marginBottom:28 }}>
              {l==="es"?"España, toda América Latina y mercados internacionales":l==="en"?"USA, Canada and worldwide":l==="fr"?"France, Belgique et plus":"DACH und weltweit"}
            </h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
              {countryKeys.map(ck => {
                const c = COUNTRIES[ck];
                return (
                  <Link key={ck} href={`/${l}/${ck}/`} className="card"
                    style={{ padding:"10px 16px", display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", background:"#fff" }}>
                    <span style={{ fontSize:20 }}>{c.flag}</span>
                    <div style={{ textAlign:"left" }}>
                      <p style={{ fontWeight:700, color:"var(--dark)", fontSize:13 }}>{c.name}</p>
                      <p style={{ color:"var(--muted)", fontSize:11 }}>{c.city}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 20px", background:"#fff" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="lbl">FAQ</span>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3.5vw,2.4rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-0.5px" }}>
              {t(l,"faq_title")}
            </h2>
          </div>
          <div style={{ display:"grid", gap:8 }}>
            {ta2(l,"faqs").map(([q,a],i) => (
              <details key={i} className="card" style={{ padding:0 }}>
                <summary style={{ padding:"18px 22px", fontWeight:700, color:"var(--dark)", cursor:"pointer", fontSize:15, display:"flex", justifyContent:"space-between", alignItems:"center", userSelect:"none", listStyle:"none" }}>
                  <span style={{ flex:1, paddingRight:16 }}>{q}</span>
                  <span className="plus-icon" style={{ color:"var(--rose)", fontSize:24, fontWeight:300, lineHeight:1, flexShrink:0 }}>+</span>
                </summary>
                <div style={{ padding:"0 22px 18px", borderTop:"1px solid var(--border)" }}>
                  <p style={{ color:"var(--muted)", lineHeight:1.75, fontSize:14, paddingTop:14 }}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BLOG
      ══════════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section style={{ padding:"88px 20px", background:"var(--cream2)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40, flexWrap:"wrap", gap:14 }}>
              <div>
                <span className="lbl">Blog</span>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-0.5px" }}>
                  {l==="es"?"Guías y estrategias":l==="en"?"Guides & strategies":l==="fr"?"Guides & stratégies":l==="de"?"Ratgeber":"Guide"}
                </h2>
              </div>
              <Link href={`/${l}/blog/`} className="btn btn-outline-dark" style={{ fontSize:13, padding:"9px 18px", borderRadius:10, flexShrink:0 }}>
                {l==="es"?"Ver todos":l==="en"?"View all":l==="fr"?"Voir tout":l==="de"?"Alle":"Vedi tutti"} <Arr s={14} />
              </Link>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
              {posts.slice(0,3).map(p => (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration:"none" }}>
                  <article className="card" style={{ padding:24, height:"100%", display:"flex", flexDirection:"column", background:"#fff" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"var(--rose)", textTransform:"uppercase", letterSpacing:"0.08em", background:"rgba(200,112,90,0.07)", border:"1px solid rgba(200,112,90,0.2)", padding:"2px 8px", borderRadius:999 }}>{p.kw[0]}</span>
                      <span style={{ fontSize:11, color:"var(--muted2)" }}>{p.date}</span>
                    </div>
                    <h3 style={{ fontWeight:700, color:"var(--dark)", fontSize:15, marginBottom:8, lineHeight:1.35, flex:1 }}>{p.title}</h3>
                    <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.6, marginBottom:14, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{p.excerpt}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:5, color:"var(--rose)", fontSize:13, fontWeight:700 }}>
                      {l==="es"?"Leer":l==="en"?"Read":l==="fr"?"Lire":l==="de"?"Lesen":"Leggi"} <Arr s={14} c="var(--rose)" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          CTA FINAL — dark
      ══════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 20px", background:"var(--dark)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:500, height:400, borderRadius:"50%", background:"rgba(200,112,90,0.1)", filter:"blur(90px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center", position:"relative" }}>
          <span style={{ display:"block", fontSize:11, fontWeight:700, color:"var(--gold2)", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:12 }}>VixenAgency</span>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, color:"#fff", letterSpacing:"-1px", marginBottom:14, lineHeight:1.15 }}>
            {t(l,"cta_title")}
          </h2>
          <p style={{ color:"rgba(255,255,255,0.55)", lineHeight:1.75, marginBottom:40, fontSize:15 }}>{t(l,"cta_sub")}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ fontSize:16, padding:"18px 48px" }}>
            {t(l,"cta_btn")} <Arr c="#fff" s={20} />
          </a>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.25)", marginTop:18 }}>{t(l,"cta_note")}</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer style={{ padding:"56px 20px 28px", background:"var(--dark2)", color:"#fff" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="footer-4" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36, marginBottom:44 }}>
            <div className="footer-brand">
              <div style={{ fontSize:24, fontWeight:900, marginBottom:14 }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", color:"var(--rose2)" }}>Vixen</span>
                <span>Agency</span>
              </div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.7, maxWidth:260, marginBottom:20 }}>{t(l,"footer_desc")}</p>
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#4ade80", textDecoration:"none", fontWeight:700, fontSize:14 }}>
                <span>💬</span> +{WA.slice(0,2)} {WA.slice(2,4)} {WA.slice(4,7)} {WA.slice(7,10)} {WA.slice(10)}
              </a>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"rgba(255,255,255,0.35)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:16 }}>
                {l==="es"?"Servicios":l==="en"?"Services":"Services"}
              </p>
              <div style={{ display:"grid", gap:8 }}>
                {services.slice(0,5).map(s => (
                  <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                    style={{ fontSize:13, color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>
                    {s.kw}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"rgba(255,255,255,0.35)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:16 }}>
                {l==="es"?"Países":l==="en"?"Countries":"Pays"}
              </p>
              <div style={{ display:"grid", gap:8 }}>
                {countryKeys.slice(0,7).map(ck => {
                  const c = COUNTRIES[ck];
                  return (
                    <Link key={ck} href={`/${l}/${ck}/`}
                      style={{ fontSize:13, color:"rgba(255,255,255,0.4)", textDecoration:"none", display:"flex", gap:6, alignItems:"center" }}>
                      <span style={{ fontSize:14 }}>{c.flag}</span>{c.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"rgba(255,255,255,0.35)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:16 }}>Blog</p>
              <div style={{ display:"grid", gap:8, marginBottom:20 }}>
                {posts.slice(0,4).map(p => (
                  <Link key={p.slug} href={`/${l}/blog/${p.slug}/`}
                    style={{ fontSize:12, color:"rgba(255,255,255,0.35)", textDecoration:"none", lineHeight:1.35 }}>
                    {p.title.slice(0,34)}…
                  </Link>
                ))}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {LOCALES.map(loc => (
                  <Link key={loc} href={`/${loc}/`}
                    style={{ fontSize:10, padding:"3px 7px", borderRadius:5, textDecoration:"none", fontFamily:"monospace", textTransform:"uppercase", fontWeight:800,
                      color:loc===l?"var(--rose2)":"rgba(255,255,255,0.3)",
                      background:loc===l?"rgba(232,145,124,0.12)":"rgba(255,255,255,0.05)",
                      border:`1px solid ${loc===l?"rgba(232,145,124,0.35)":"rgba(255,255,255,0.08)"}` }}>
                    {loc}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.18)" }}>© 2026 VixenAgency · {t(l,"footer_rights")}</p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.1)" }}>{t(l,"footer_disclaimer")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
