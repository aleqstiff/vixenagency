import type { Metadata } from "next";
import Link from "next/link";
import {
  LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES,
  SERVICES, BASE_URL, WA, waLink, waMsg
} from "@/lib/config";
import { TR, t, ta, ta2 } from "@/lib/translations";
import { POSTS } from "@/lib/blog";
import { IMGS, FACES } from "@/lib/images";
import MegaNav from "@/components/MegaNav";

export async function generateStaticParams() { return LOCALES.map(l => ({ locale: l })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const l = locale as Locale;
  const tr = TR[l] as Record<string,string>;
  return { title: tr.meta_title, description: tr.meta_desc };
}

const Stars = ({ n=5 }: { n?:number }) => (
  <div style={{ display:"flex", gap:2 }}>
    {Array(n).fill(0).map((_,i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#d97b3a">
        <path d="M7 1l1.5 4.5H13L9.5 8.5l1 4.5L7 10.5l-3.5 2.5 1-4.5L1 5.5h4.5L7 1z"/>
      </svg>
    ))}
  </div>
);

const Arrow = ({ size=18, color="currentColor" }: {size?:number;color?:string}) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M3 9h12M10 4l5 5-5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" fill="rgba(200,112,90,0.1)" stroke="rgba(200,112,90,0.3)"/>
    <path d="M5 8l2.5 2.5L11 5.5" stroke="var(--rose)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Real results data — specific, credible
const RESULTS_DATA = [
  { name:"Sofía R.", country:"🇪🇸 Madrid", before:"320€/mes", after:"2.140€/mes", time:"8 semanas", percent:"+568%", quote:"\"Triipliqué sin mostrar la cara. Los chatters son increíbles, los fans ni lo notan.\"" },
  { name:"Valentina M.", country:"🇦🇷 Buenos Aires", before:"0€", after:"1.850€/mes", time:"6 semanas", percent:"De 0 a top", quote:"\"Empecé de cero. A las 6 semanas ganaba más que en mi trabajo. Ahora es mi única fuente.\"" },
  { name:"Camila R.", country:"🇨🇴 Medellín", before:"680€/mes", after:"4.200€/mes", time:"3 meses", percent:"+518%", quote:"\"El sistema PPV cambió todo. El 73% de mis ingresos viene de DMs ahora.\"" },
  { name:"Mariana S.", country:"🇧🇷 São Paulo", before:"R$1.2k/mes", after:"R$9.8k/mes", time:"3 meses", percent:"+717%", quote:"\"Me pusieron en el mercado USA. El 80% de mis fans son americanos. Era impensable.\"" },
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
    "@context":"https://schema.org","@type":"LocalBusiness",
    "name":"VixenAgency","url":BASE_URL,"@id":BASE_URL,
    "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"183","bestRating":"5"},
    "description":"Agencia de gestión OnlyFans #1 para creadoras hispanohablantes e internacionales.",
    "areaServed":["ES","MX","AR","CO","CL","PE","US","CA","FR","DE","IT","BR"],
  };

  const CTA_TEXT = { es:"Solicitar análisis gratuito", en:"Request free analysis", fr:"Demander une analyse", de:"Kostenlose Analyse", it:"Analisi gratuita", pt:"Análise gratuita" };
  const CTA2_TEXT = { es:"Ver resultados reales", en:"See real results", fr:"Voir les résultats", de:"Ergebnisse sehen", it:"Vedi risultati", pt:"Ver resultados" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <MegaNav locale={l} posts={navPosts} />

      {/* ═══════════════════════════════════════════════════════════
          HERO — editorial split, serif display
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ background:"var(--cream)", padding:"0 0 0 0", minHeight:"90vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
        {/* Subtle texture */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(26,22,18,0.03) 1px, transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }} />
        
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"80px 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center", width:"100%" }} className="hero-grid">
          
          {/* Text */}
          <div>
            <div className="badge" style={{ marginBottom:28 }}>
              <span className="dot-live" />
              {t(l,"badge")}
            </div>

            <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2.6rem,5vw,4.2rem)", fontWeight:800, color:"var(--dark)", lineHeight:1.1, letterSpacing:"-1px", marginBottom:6, fontStyle:"italic" }}>
              {t(l,"hero_h1")}
            </h1>
            <div className="g-rose" style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2.2rem,4.5vw,3.8rem)", fontWeight:800, lineHeight:1.1, letterSpacing:"-1px", marginBottom:24 }}>
              {t(l,"hero_h1_accent")}
            </div>

            <p style={{ fontSize:17, color:"var(--muted)", lineHeight:1.78, marginBottom:36, maxWidth:500 }}>
              {t(l,"hero_desc")}
            </p>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ fontSize:15, padding:"17px 40px" }}>
                {CTA_TEXT[l]} <Arrow color="#fff" />
              </a>
              <Link href={`/${l}/#resultados`} className="btn btn-outline-dark" style={{ fontSize:14 }}>
                {CTA2_TEXT[l]}
              </Link>
            </div>

            <p style={{ fontSize:13, color:"var(--muted2)", fontWeight:500 }}>{t(l,"hero_trust")}</p>

            {/* Real social proof */}
            <div style={{ marginTop:32, padding:"20px 24px", background:"#fff", borderRadius:16, border:"1px solid var(--border)", display:"flex", alignItems:"center", gap:16, maxWidth:440, boxShadow:"0 2px 12px rgba(26,22,18,0.06)" }}>
              <div style={{ display:"flex" }}>
                {FACES.map((src,i) => (
                  <div key={i} style={{ width:38, height:38, borderRadius:"50%", border:"2.5px solid var(--cream)", marginLeft:i>0?-12:0, overflow:"hidden", flexShrink:0 }}>
                    <img src={src} alt="" width={38} height={38} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                  <Stars />
                  <span style={{ fontWeight:800, color:"var(--dark)", fontSize:15 }}>4.9</span>
                </div>
                <p style={{ fontSize:12, color:"var(--muted)" }}>+200 {l==="es"?"creadoras ya confían en nosotras":l==="en"?"creators already trust us":l==="fr"?"créatrices nous font confiance":l==="de"?"Creator vertrauen uns bereits":"creator si fidano di noi"}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="hero-img" style={{ position:"relative" }}>
            {/* Warm background blob */}
            <div style={{ position:"absolute", width:480, height:480, borderRadius:"50%", background:"rgba(200,112,90,0.12)", filter:"blur(70px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
            
            <div style={{ position:"relative", borderRadius:28, overflow:"hidden", boxShadow:"0 30px 80px rgba(26,22,18,0.2)" }}>
              <img src={IMGS.hero} alt={l==="es"?"Creadora de OnlyFans gestionada por VixenAgency":l==="en"?"OnlyFans creator managed by VixenAgency":"Créatrice OnlyFans gérée par VixenAgency"}
                width={520} height={640} style={{ width:"100%", height:"auto", objectFit:"cover", display:"block" }} />
              
              {/* Bottom gradient */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"45%", background:"linear-gradient(to top, rgba(26,22,18,0.7), transparent)" }} />
              
              {/* Floating results card */}
              <div style={{ position:"absolute", bottom:24, left:20, right:20, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(20px)", borderRadius:16, padding:"16px 20px" }}>
                <p style={{ fontSize:11, color:"var(--muted)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600 }}>Resultado real · Camila R., Colombia</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ textAlign:"center" }}>
                    <p style={{ fontSize:11, color:"var(--muted2)" }}>{t(l,"before")}</p>
                    <p style={{ fontWeight:800, fontSize:18, color:"rgba(26,22,18,0.3)" }}>680€</p>
                  </div>
                  <div style={{ flex:1, margin:"0 12px" }}>
                    <div style={{ height:3, borderRadius:2, background:"linear-gradient(90deg, #f0c8c0, var(--rose))" }} />
                    <p style={{ fontSize:10, color:"var(--muted)", textAlign:"center", marginTop:3 }}>3 meses</p>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    <p style={{ fontSize:11, color:"var(--muted2)" }}>{t(l,"after")}</p>
                    <p style={{ fontWeight:900, fontSize:22, color:"var(--rose)" }}>4.200€</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side badge */}
            <div style={{ position:"absolute", top:32, right:-16, background:"var(--dark)", color:"#fff", borderRadius:14, padding:"12px 16px", boxShadow:"0 8px 24px rgba(26,22,18,0.2)", textAlign:"center" }}>
              <p style={{ fontSize:22, fontWeight:900, color:"var(--gold2)" }}>+340%</p>
              <p style={{ fontSize:10, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{l==="es"?"aumento medio":l==="en"?"avg. increase":"Ø Steigerung"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TICKER — subtle, warm
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"10px 0", background:"var(--cream2)" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...ta(l,"ticker"),...ta(l,"ticker"),...ta(l,"ticker")].map((item,i) => (
              <span key={i} style={{ fontSize:12, fontWeight:600, color:"var(--muted)", padding:"0 32px", display:"flex", alignItems:"center", gap:28, whiteSpace:"nowrap" }}>
                {item}
                <svg width="5" height="5" viewBox="0 0 5 5" fill="var(--rose2)"><circle cx="2.5" cy="2.5" r="2.5"/></svg>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STATS — 4 numeros, fondo crema
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding:"72px 24px", background:"#fff" }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div className="stats-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"var(--border)" }}>
            {([
              ["+340%", l==="es"?"aumento medio de ingresos":l==="en"?"average income increase":l==="fr"?"hausse moyenne des revenus":l==="de"?"Ø Einnahmensteigerung":"aumento medio guadagni"],
              ["+200", l==="es"?"creadoras gestionadas":l==="en"?"creators managed":l==="fr"?"créatrices gérées":l==="de"?"Creator betreut":"creator gestite"],
              ["30 días", l==="es"?"hasta primeros resultados":l==="en"?"to first results":l==="fr"?"premiers résultats":l==="de"?"bis erste Ergebnisse":"ai primi risultati"],
              ["24/7", l==="es"?"chatters activos":l==="en"?"active chatters":l==="fr"?"chatteuses actives":l==="de"?"aktive Chatter":"chatter attivi"],
            ] as [string,string][]).map(([v,lbl]) => (
              <div key={v} style={{ padding:"36px 24px", textAlign:"center", background:"#fff" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-1px", lineHeight:1, marginBottom:10 }}>{v}</div>
                <div style={{ fontSize:13, color:"var(--muted)", fontWeight:500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ABOUT — split editorial con imagen, chicha real
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 24px", background:"var(--cream2)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }} className="split-grid">
          
          {/* Mosaic */}
          <div className="mosaic" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"280px 260px", gap:14 }}>
            <div style={{ gridRow:"1/3", borderRadius:24, overflow:"hidden", boxShadow:"0 20px 50px rgba(26,22,18,0.15)" }}>
              <img src={IMGS.mosaic1} alt="Creadora de contenido exitosa" width={400} height={560} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
            </div>
            <div style={{ borderRadius:18, overflow:"hidden", boxShadow:"0 12px 32px rgba(26,22,18,0.1)" }}>
              <img src={IMGS.mosaic2} alt="Lifestyle creadora OnlyFans" width={300} height={280} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div style={{ borderRadius:18, overflow:"hidden", position:"relative", boxShadow:"0 12px 32px rgba(26,22,18,0.1)" }}>
              <img src={IMGS.mosaic3} alt="Resultados reales agencia OnlyFans" width={300} height={260} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              {/* Label */}
              <div style={{ position:"absolute", bottom:14, left:12, right:12, background:"rgba(255,255,255,0.93)", backdropFilter:"blur(12px)", borderRadius:10, padding:"8px 12px" }}>
                <p style={{ fontSize:10, color:"var(--muted)", fontWeight:600 }}>Sofía R. · Madrid 🇪🇸</p>
                <p style={{ fontWeight:800, color:"var(--dark)", fontSize:14 }}>320€ → <span style={{ color:"var(--rose)" }}>2.140€/mes</span></p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="lbl">{l==="es"?"Sobre VixenAgency":l==="en"?"About VixenAgency":l==="fr"?"À propos":l==="de"?"Über VixenAgency":"Chi siamo"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:800, color:"var(--dark)", lineHeight:1.15, letterSpacing:"-0.5px", marginBottom:18 }}>
              {l==="es"?"Más que una agencia — tu equipo detrás de todo":
               l==="en"?"More than an agency — your team behind everything":
               l==="fr"?"Plus qu'une agence — votre équipe derrière tout":
               l==="de"?"Mehr als eine Agentur — dein Team hinter allem":
               "Più di un'agenzia — il tuo team dietro a tutto"}
            </h2>
            <p style={{ fontSize:16, color:"var(--muted)", lineHeight:1.8, marginBottom:28 }}>
              {l==="es"?"Las creadoras con las que trabajamos no gestionan nada que no sea crear contenido. Nosotras nos encargamos de cada mensaje, cada PPV, cada post de redes, cada informe. Resultado: más ingresos, más libertad, menos estrés.":
               l==="en"?"The creators we work with don't manage anything other than creating content. We handle every message, every PPV, every social media post, every report. Result: more income, more freedom, less stress.":
               l==="fr"?"Les créatrices avec qui nous travaillons ne gèrent rien d'autre que la création de contenu. Nous nous occupons de chaque message, chaque PPV, chaque post sur les réseaux, chaque rapport.":
               l==="de"?"Die Creator mit denen wir arbeiten, verwalten nichts außer dem Erstellen von Content. Wir kümmern uns um jede Nachricht, jedes PPV, jeden Social-Media-Post, jeden Bericht.":
               "Le creator con cui lavoriamo non gestiscono nulla tranne la creazione di contenuto. Ci occupiamo di ogni messaggio, ogni PPV, ogni post social, ogni report."}
            </p>

            {/* Feature list with checks */}
            <div style={{ display:"grid", gap:12, marginBottom:36 }}>
              {[
                l==="es"?"Chatters nativos en tu idioma, 24 horas al día, 7 días a la semana":l==="en"?"Native chatters in your language, 24 hours a day, 7 days a week":l==="fr"?"Chatteuses natives dans votre langue, 24h/24, 7j/7":"Chatters in deiner Sprache, 24/7",
                l==="es"?"Estrategia PPV diseñada para convertir entre el 25% y el 40%":l==="en"?"PPV strategy designed to convert between 25% and 40%":l==="fr"?"Stratégie PPV conçue pour convertir entre 25% et 40%":"PPV-Strategie für 25-40% Konversion",
                l==="es"?"Marketing en TikTok, Instagram y Reddit — fans reales, no bots":l==="en"?"Marketing on TikTok, Instagram and Reddit — real fans, not bots":l==="fr"?"Marketing sur TikTok, Instagram et Reddit — vrais fans":"Marketing auf TikTok, Instagram und Reddit",
                l==="es"?"Anonimato total disponible — muchas de nuestras top creadoras son 100% anónimas":l==="en"?"Full anonymity available — many of our top creators are 100% anonymous":l==="fr"?"Anonymat total disponible":"Vollständige Anonymität möglich",
                l==="es"?"Sin cuotas fijas — solo cobramos cuando tú ganas":l==="en"?"No fixed fees — we only charge when you earn":l==="fr"?"Sans frais fixes — on ne gagne que si vous gagnez":"Keine Fixgebühren — nur Provision",
              ].map((item,i) => (
                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <Check />
                  <span style={{ fontSize:14, color:"var(--muted)", lineHeight:1.55 }}>{item}</span>
                </div>
              ))}
            </div>

            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ fontSize:14, padding:"16px 32px" }}>
              {CTA_TEXT[l]} <Arrow color="#fff" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          RESULTS REALES — con datos específicos y fotos
      ═══════════════════════════════════════════════════════════ */}
      <section id="resultados" style={{ padding:"88px 24px", background:"#fff" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <span className="lbl">{l==="es"?"Resultados reales":l==="en"?"Real results":l==="fr"?"Résultats réels":l==="de"?"Echte Ergebnisse":"Risultati reali"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-1px", marginBottom:12, lineHeight:1.15 }}>
              {t(l,"results_title")}
            </h2>
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginBottom:6 }}>
              <Stars />
              <span style={{ fontWeight:800, color:"var(--dark)", fontSize:18 }}>4.9</span>
              <span style={{ color:"var(--muted)", fontSize:14 }}>· 183 {l==="es"?"reseñas verificadas":l==="en"?"verified reviews":l==="fr"?"avis vérifiés":l==="de"?"Bewertungen":"recensioni"}</span>
            </div>
            <p style={{ color:"var(--muted2)", fontSize:13 }}>{t(l,"results_sub")}</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:20 }}>
            {RESULTS_DATA.map((r,i) => (
              <div key={i} className="card" style={{ overflow:"hidden", position:"relative" }}>
                {/* Top color bar */}
                <div style={{ height:4, background:["linear-gradient(90deg,var(--rose),var(--gold2))","linear-gradient(90deg,#7c6aad,#a88fd4)","linear-gradient(90deg,var(--gold),#e8b96a)","linear-gradient(90deg,#4a9b7a,#6dc4a0)"][i] }} />
                
                {/* Photo + gradient header */}
                <div style={{ height:160, overflow:"hidden", position:"relative" }}>
                  <img src={FACES[i % FACES.length]} alt={r.name} width={400} height={200}
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:"brightness(0.92)" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 30%, rgba(26,22,18,0.85))" }} />
                  {/* Name overlay */}
                  <div style={{ position:"absolute", bottom:14, left:18, right:18, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                    <div>
                      <p style={{ fontWeight:800, color:"#fff", fontSize:15, lineHeight:1 }}>{r.name}</p>
                      <p style={{ color:"rgba(255,255,255,0.65)", fontSize:12, marginTop:2 }}>{r.country}</p>
                    </div>
                    <div style={{ background:"rgba(255,255,255,0.15)", backdropFilter:"blur(10px)", borderRadius:10, padding:"4px 10px", border:"1px solid rgba(255,255,255,0.2)" }}>
                      <p style={{ fontWeight:900, color:"#fff", fontSize:14 }}>{r.percent}</p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding:"18px 20px" }}>
                  <Stars />
                  
                  {/* Before/after */}
                  <div style={{ display:"flex", alignItems:"center", gap:8, margin:"14px 0 12px" }}>
                    <div style={{ flex:1, textAlign:"center", padding:"10px", background:"var(--cream)", borderRadius:10 }}>
                      <p style={{ fontSize:10, color:"var(--muted2)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3 }}>{t(l,"before")}</p>
                      <p style={{ fontWeight:800, fontSize:16, color:"rgba(26,22,18,0.4)" }}>{r.before}</p>
                    </div>
                    <div style={{ color:"var(--rose)", fontSize:20 }}>→</div>
                    <div style={{ flex:1, textAlign:"center", padding:"10px", background:"rgba(200,112,90,0.07)", borderRadius:10, border:"1px solid rgba(200,112,90,0.2)" }}>
                      <p style={{ fontSize:10, color:"var(--muted2)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3 }}>{t(l,"after")}</p>
                      <p style={{ fontWeight:900, fontSize:18, color:"var(--rose)" }}>{r.after}</p>
                    </div>
                  </div>

                  <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.65, fontStyle:"italic", marginBottom:10 }}>
                    {l === "es" ? r.quote : r.quote}
                  </p>
                  <p style={{ fontSize:11, color:"var(--muted2)", fontWeight:600 }}>
                    {t(l,"in_t")} <strong style={{ color:"var(--dark)" }}>{r.time}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA después de resultados */}
          <div style={{ textAlign:"center", marginTop:48 }}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ fontSize:15, padding:"17px 40px" }}>
              {CTA_TEXT[l]} <Arrow color="#fff" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════════════ */}
      <section id="servicios" style={{ padding:"88px 24px", background:"var(--cream2)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ marginBottom:52, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16 }}>
            <div>
              <span className="lbl">{l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}</span>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-0.5px" }}>
                {t(l,"services_title")}
              </h2>
            </div>
            <p style={{ color:"var(--muted)", maxWidth:400, fontSize:14, lineHeight:1.65 }}>{t(l,"services_sub")}</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:16, marginBottom:20 }}>
            {ta2(l,"sv").map(([icon,title,desc],i) => (
              <div key={i} className="card" style={{ padding:28, position:"relative", overflow:"hidden" }}>
                <div style={{ width:50, height:50, borderRadius:14, background:"rgba(200,112,90,0.08)", border:"1px solid rgba(200,112,90,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:16 }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight:700, color:"var(--dark)", fontSize:17, marginBottom:8 }}>{title}</h3>
                <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.65, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical" }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Keyword chips */}
          {services.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {services.map(s => (
                <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                  style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, padding:"7px 16px", borderRadius:999, background:"#fff", border:"1px solid var(--border)", color:"var(--muted)", textDecoration:"none", fontWeight:600 }}>
                  {s.icon} {s.kw}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════════════════════════ */}
      <section id="como" style={{ padding:"88px 24px", background:"#fff" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="lbl">{l==="es"?"Proceso":l==="en"?"Process":l==="fr"?"Processus":l==="de"?"Prozess":"Processo"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-0.5px" }}>
              {t(l,"how_title")}
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 }}>
            {ta2(l,"how").map(([n,title,desc],i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"var(--dark)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',Georgia,serif", fontWeight:800, fontSize:22, margin:"0 auto 18px", boxShadow:"0 6px 20px rgba(26,22,18,0.2)" }}>
                  {i+1}
                </div>
                <h3 style={{ fontWeight:700, color:"var(--dark)", fontSize:16, marginBottom:8 }}>{title}</h3>
                <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:48 }}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ fontSize:15, padding:"17px 40px" }}>
              {CTA_TEXT[l]} <Arrow color="#fff" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          COUNTRIES
      ═══════════════════════════════════════════════════════════ */}
      {countryKeys.length > 1 && (
        <section style={{ padding:"64px 24px", background:"var(--cream2)" }}>
          <div style={{ maxWidth:1080, margin:"0 auto", textAlign:"center" }}>
            <span className="lbl">{l==="es"?"Cobertura":l==="en"?"Coverage":l==="fr"?"Couverture":"Länder"}</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:700, color:"var(--dark)", letterSpacing:"-0.5px", marginBottom:32 }}>
              {l==="es"?"España, toda América Latina y más":l==="en"?"USA, Canada and worldwide":l==="fr"?"France, Belgique et plus":l==="de"?"DACH und weltweit":"Italia e mercati internazionali"}
            </h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
              {countryKeys.map(ck => {
                const c = COUNTRIES[ck];
                return (
                  <Link key={ck} href={`/${l}/${ck}/`} className="card"
                    style={{ padding:"10px 18px", display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", background:"#fff" }}>
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

      {/* ═══════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding:"88px 24px", background:"#fff" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <span className="lbl">FAQ</span>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,3.5vw,2.4rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-0.5px" }}>
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

      {/* ═══════════════════════════════════════════════════════════
          BLOG
      ═══════════════════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section style={{ padding:"88px 24px", background:"var(--cream2)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:44, flexWrap:"wrap", gap:14 }}>
              <div>
                <span className="lbl">Blog</span>
                <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:800, color:"var(--dark)", letterSpacing:"-0.5px" }}>
                  {l==="es"?"Guías y estrategias":l==="en"?"Guides & strategies":l==="fr"?"Guides & stratégies":l==="de"?"Ratgeber":"Guide"}
                </h2>
              </div>
              <Link href={`/${l}/blog/`} className="btn btn-outline-dark" style={{ fontSize:13, padding:"10px 20px", borderRadius:10, flexShrink:0 }}>
                {l==="es"?"Ver todos":l==="en"?"View all":l==="fr"?"Voir tout":l==="de"?"Alle":"Vedi tutti"} <Arrow />
              </Link>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:16 }}>
              {posts.slice(0,3).map(p => (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration:"none" }}>
                  <article className="card" style={{ padding:26, height:"100%", display:"flex", flexDirection:"column", background:"#fff" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:"var(--rose)", textTransform:"uppercase", letterSpacing:"0.08em", background:"rgba(200,112,90,0.07)", border:"1px solid rgba(200,112,90,0.2)", padding:"2px 8px", borderRadius:999 }}>{p.kw[0]}</span>
                      <span style={{ fontSize:11, color:"var(--muted2)" }}>{p.date}</span>
                    </div>
                    <h3 style={{ fontWeight:700, color:"var(--dark)", fontSize:16, marginBottom:8, lineHeight:1.35, flex:1 }}>{p.title}</h3>
                    <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.6, marginBottom:16, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{p.excerpt}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:5, color:"var(--rose)", fontSize:13, fontWeight:700 }}>
                      {l==="es"?"Leer":l==="en"?"Read":l==="fr"?"Lire":l==="de"?"Lesen":"Leggi"} <Arrow size={14} color="var(--rose)" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          CTA FINAL — dark section
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding:"96px 24px", background:"var(--dark)", position:"relative", overflow:"hidden" }}>
        {/* Warm glow */}
        <div style={{ position:"absolute", width:600, height:400, borderRadius:"50%", background:"rgba(200,112,90,0.12)", filter:"blur(100px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center", position:"relative" }}>
          <span style={{ display:"block", fontSize:11, fontWeight:700, color:"var(--gold2)", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:14 }}>VixenAgency</span>
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:800, color:"#fff", letterSpacing:"-1px", marginBottom:16, lineHeight:1.15 }}>
            {t(l,"cta_title")}
          </h2>
          <p style={{ color:"rgba(255,255,255,0.6)", lineHeight:1.75, marginBottom:44, fontSize:16 }}>{t(l,"cta_sub")}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ fontSize:17, padding:"20px 52px" }}>
            {t(l,"cta_btn")} <Arrow color="#fff" size={20} />
          </a>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:20 }}>{t(l,"cta_note")}</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer style={{ padding:"64px 24px 32px", background:"var(--dark2)", color:"#fff" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="footer-4" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:48 }}>
            <div className="footer-brand">
              <div style={{ fontWeight:900, fontSize:26, marginBottom:16 }}>
                <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontStyle:"italic", color:"var(--rose2)" }}>Vixen</span>
                <span style={{ color:"#fff" }}>Agency</span>
              </div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.7, maxWidth:280, marginBottom:24 }}>{t(l,"footer_desc")}</p>
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#4ade80", textDecoration:"none", fontWeight:800, fontSize:14 }}>
                <span style={{ fontSize:20 }}>💬</span> +{WA.slice(0,2)} {WA.slice(2,4)} {WA.slice(4,7)} {WA.slice(7,10)} {WA.slice(10)}
              </a>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"rgba(255,255,255,0.4)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:18 }}>
                {l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}
              </p>
              <div style={{ display:"grid", gap:9 }}>
                {services.slice(0,5).map(s => (
                  <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                    style={{ fontSize:13, color:"rgba(255,255,255,0.45)", textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ opacity:.5, fontSize:12 }}>{s.icon}</span> {s.kw}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"rgba(255,255,255,0.4)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:18 }}>
                {l==="es"?"Países":l==="en"?"Countries":l==="fr"?"Pays":l==="de"?"Länder":"Paesi"}
              </p>
              <div style={{ display:"grid", gap:9 }}>
                {countryKeys.slice(0,7).map(ck => {
                  const c = COUNTRIES[ck];
                  return (
                    <Link key={ck} href={`/${l}/${ck}/`}
                      style={{ fontSize:13, color:"rgba(255,255,255,0.45)", textDecoration:"none", display:"flex", alignItems:"center", gap:7 }}>
                      <span>{c.flag}</span> {c.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <p style={{ fontWeight:700, color:"rgba(255,255,255,0.4)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:18 }}>Blog</p>
              <div style={{ display:"grid", gap:8, marginBottom:24 }}>
                {posts.slice(0,4).map(p => (
                  <Link key={p.slug} href={`/${l}/blog/${p.slug}/`}
                    style={{ fontSize:12, color:"rgba(255,255,255,0.4)", textDecoration:"none", lineHeight:1.35 }}>
                    → {p.title.slice(0,36)}…
                  </Link>
                ))}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {LOCALES.map(loc => (
                  <Link key={loc} href={`/${loc}/`}
                    style={{ fontSize:10, padding:"4px 8px", borderRadius:6, textDecoration:"none", fontFamily:"monospace", textTransform:"uppercase", fontWeight:800,
                      color: loc===l ? "var(--rose2)" : "rgba(255,255,255,0.3)",
                      background: loc===l ? "rgba(232,145,124,0.15)" : "rgba(255,255,255,0.05)",
                      border:`1px solid ${loc===l ? "rgba(232,145,124,0.4)" : "rgba(255,255,255,0.08)"}` }}>
                    {loc}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:24, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.2)" }}>© 2026 VixenAgency · {t(l,"footer_rights")}</p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.1)" }}>{t(l,"footer_disclaimer")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
