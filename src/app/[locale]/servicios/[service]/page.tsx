import type { Metadata } from "next";
import Link from "next/link";
import {
  LOCALES, type Locale, SERVICES, LOCALE_COUNTRIES, COUNTRIES,
  BASE_URL, WA, waLink, waMsg, type ServicePage
, smartTitle } from "@/lib/config";
import { t, ta2 } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";
import { POSTS } from "@/lib/blog";

export async function generateStaticParams() {
  const p: { locale: string; service: string }[] = [];
  LOCALES.forEach(l =>
    (SERVICES[l as Locale] ?? []).forEach(s => p.push({ locale: l, service: s.slug }))
  );
  return p;
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; service: string }> }): Promise<Metadata> {
  const { locale, service } = await params;
  const l = locale as Locale;
  const s = SERVICES[l]?.find(x => x.slug === service);
  if (!s) return {};
  const desc = `${s.desc} Only Sweety Agency — agencia especializada con +200 creadoras gestionadas.`;
  return {
    title: `${s.title} | Only Sweety`,
    description: desc.slice(0, 160),
    keywords: [s.kw, "onlysweety", "onlyfans", "agencia onlyfans"].join(","),
    alternates: { canonical: `${BASE_URL}/${l}/servicios/${service}/`, languages: { [l]: `${BASE_URL}/${l}/servicios/${service}/`, "x-default": `${BASE_URL}/${l}/servicios/${service}/` } },
    openGraph: {
      title: s.title,
      description: s.desc,
      url: `${BASE_URL}/${l}/servicios/${service}/`,
      siteName: "Only Sweety Agency",
      type: "website",
    },
  };
}

// FAQ database per service slug
const SERVICE_FAQS: Record<string, [string, string][]> = {
  "chatters-onlyfans": [
    ["¿Qué hacen exactamente los chatters de OnlyFans?","Los chatters responden mensajes de fans, generan conversaciones que crean deseo antes de ofrecer PPV, identifican fans de alto valor y cierran ventas de contenido premium. Todo esto 24 horas al día, 7 días a la semana."],
    ["¿Mis fans sabrán que no soy yo?","No. Los chatters aprenden tu voz, tu estilo y tu personalidad. Mantienen coherencia total con tu personaje. Muchos fans llevan meses sin saber que hay un equipo detrás."],
    ["¿Cuánto aumentan los ingresos con chatters?","En promedio, las creadoras con chatters profesionales generan entre 3 y 5 veces más que sin ellos. El 70-80% de los ingresos de las creadoras top viene de mensajes, no de suscripciones."],
    ["¿Los chatters trabajan en mi idioma?","Sí. Todos nuestros chatters son nativos en el idioma de tu mercado objetivo (español, inglés, francés, etc.)."],
  ],
  "gestion-onlyfans": [
    ["¿Qué incluye la gestión completa de OnlyFans?","Incluye chatters 24/7, marketing en redes sociales, estrategia PPV, calendario de contenido, reportes semanales, protección de identidad y optimización continua."],
    ["¿Cuánto cobráis por la gestión?","Cobramos un porcentaje sobre los ingresos generados, nunca cuotas fijas. Sin resultados, no cobramos."],
    ["¿Tengo que darles acceso a mi cuenta?","Damos acceso limitado a las funciones necesarias para la gestión. Nunca necesitamos tu contraseña completa ni acceso a tus cuentas bancarias."],
    ["¿Cuándo se ven los primeros resultados?","Las primeras mejoras aparecen entre la semana 2 y 4. El crecimiento significativo ocurre entre el mes 2 y el 4."],
  ],
  "onlyfans-chatters": [
    ["What exactly do OnlyFans chatters do?","Chatters respond to fan messages, build conversations that create desire before offering PPV, identify high-value fans, and close premium content sales. All 24/7."],
    ["Will my fans know it's not me?","No. Chatters learn your voice, style and persona. They maintain complete consistency. Many fans go months without knowing there's a team behind the account."],
    ["How much can chatters increase my income?","On average, creators with professional chatters earn 3-5x more than without. 70-80% of top creator income comes from messages, not subscriptions."],
    ["What languages do your chatters speak?","All chatters are native speakers in your target market language (English, Spanish, French, etc.)."],
  ],
  "onlyfans-management-agency": [
    ["What does full OnlyFans management include?","It includes 24/7 chatters, social media marketing, PPV strategy, content calendar, weekly reports, identity protection and continuous optimization."],
    ["How much does OnlyFans management cost?","We charge a percentage of generated income, never fixed fees. If your income doesn't increase, we don't charge."],
    ["How quickly do results appear?","First improvements appear between week 2 and 4. Significant growth typically occurs between month 2 and 4."],
    ["Do you work with any type of creator?","We work with creators of all levels, from beginners to established accounts. We evaluate each case individually."],
  ],
};

const RELATED: Record<string, string[]> = {
  "chatters-onlyfans": ["ppv-onlyfans","gestion-onlyfans","anonimato-onlyfans"],
  "gestion-onlyfans": ["chatters-onlyfans","marketing-onlyfans","ppv-onlyfans"],
  "marketing-onlyfans": ["chatters-onlyfans","ppv-onlyfans","creadoras-latinas-onlyfans"],
  "ppv-onlyfans": ["chatters-onlyfans","monetizar-onlyfans","gestion-onlyfans"],
  "onlyfans-chatters": ["onlyfans-management-agency","onlyfans-ppv-strategy","hire-onlyfans-chatters"],
  "onlyfans-management-agency": ["onlyfans-chatters","onlyfans-ppv-strategy","best-onlyfans-agency-2026"],
};

export default async function ServicePage({
  params,
}: { params: Promise<{ locale: string; service: string }> }) {
  const { locale, service } = await params;
  const l = locale as Locale;
  const s = SERVICES[l]?.find(x => x.slug === service);
  if (!s) return <div style={{ color:"#fff",padding:40 }}>Not found</div>;

  const wa = waMsg(l);
  const href = waLink(wa);
  const navPosts = POSTS.filter(p => p.locale === l).slice(0, 6).map(p => ({ slug: p.slug, title: p.title }));
  const relatedSlugs = RELATED[service] ?? [];
  const relatedPages = relatedSlugs.map(rs => SERVICES[l]?.find(x => x.slug === rs)).filter(Boolean) as ServicePage[];
  const faqs = SERVICE_FAQS[service] ?? ta2(l,"faqs").slice(0,4);
  const allFaqs = faqs.length > 0 ? faqs : ta2(l,"faqs").slice(0,4);

  // Schema
  const faqSchema = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity": allFaqs.map(([q,a]) => ({
      "@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}
    })),
  };
  const serviceSchema = {
    "@context":"https://schema.org","@type":"Service",
    "name":s.title,"description":s.desc,
    "keywords":s.kw,
    "provider":{"@type":"Organization","name":"Only Sweety Agency","url":BASE_URL},
    "areaServed":"Worldwide",
    "hasOfferCatalog":{"@type":"OfferCatalog","name":s.title},
  };

  const intentLabel = {
    transactional: l==="es"?"Servicio activo":l==="en"?"Active service":l==="fr"?"Service actif":l==="de"?"Aktiver Service":"Servizio attivo",
    commercial: l==="es"?"Comparativa":l==="en"?"Compare":l==="fr"?"Comparatif":l==="de"?"Vergleich":"Confronto",
    info: l==="es"?"Guía completa":l==="en"?"Complete guide":l==="fr"?"Guide complet":l==="de"?"Vollständiger Leitfaden":"Guida completa",
  };
  const intentColor: Record<string,string> = { transactional:"#00e5cc", commercial:"#f59e0b", info:"#7c3aed" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <MegaNav locale={l} posts={navPosts} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <div style={{ background:"var(--bg2)", padding:"56px 20px 44px", borderBottom:"1px solid rgba(255,255,255,0.06)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 60% 70% at 50% 0%, ${s.color}10 0%, transparent 70%)`, pointerEvents:"none" }} />
        <div style={{ maxWidth:820, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, flexWrap:"wrap" }}>
            <Link href={`/${l}/`} style={{ fontSize:12, color:"var(--muted)", textDecoration:"none" }}>Home</Link>
            <span style={{ color:"var(--muted2)" }}>/</span>
            <Link href={`/${l}/#servicios`} style={{ fontSize:12, color:"var(--muted)", textDecoration:"none" }}>
              {l==="es"?"Servicios":l==="en"?"Services":l==="fr"?"Services":l==="de"?"Leistungen":"Servizi"}
            </Link>
            <span style={{ color:"var(--muted2)" }}>/</span>
            <span style={{ fontSize:12, color:"var(--muted2)" }}>{s.kw}</span>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, flexWrap:"wrap" }}>
            <span style={{
              fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em",
              color: intentColor[s.intent ?? "transactional"],
              background: `${intentColor[s.intent ?? "transactional"]}15`, border:`1px solid ${intentColor[s.intent ?? "transactional"]}30`,
              padding:"3px 10px", borderRadius:999,
            }}>
              {intentLabel[s.intent ?? "transactional"]}
            </span>
            <span style={{
              fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em",
              color:"var(--muted2)", padding:"3px 10px",
            }}>
              {s.kw}
            </span>
          </div>

          <h1 style={{ fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-1.5px", marginBottom:12 }}>
            {s.title}
          </h1>
          <p style={{ fontSize:18, fontWeight:700, color:s.color, marginBottom:14 }}>
            {s.headline}
          </p>
          <p style={{ fontSize:16, color:"var(--muted)", lineHeight:1.72, maxWidth:580, marginBottom:36 }}>
            {s.desc}
          </p>

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href="#form" className="btn btn-cta" style={{ fontSize:15, padding:"16px 36px" }}>
              {l==="es"?"Solicitar consulta gratuita":l==="en"?"Request free consultation":l==="fr"?"Demander une consultation":l==="de"?"Kostenlose Beratung":"Consulenza gratuita"}
            </a>
            <div style={{ display:"flex", alignItems:"center", gap:8, color:"var(--muted2)", fontSize:13 }}>
              <span>✓</span>
              {l==="es"?"Sin compromiso · Respuesta en 24h":l==="en"?"No commitment · Reply in 24h":l==="fr"?"Sans engagement · Réponse 24h":l==="de"?"Unverbindlich · Antwort in 24h":"Senza impegno · Risposta 24h"}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────────── */}
      <div style={{ background:"var(--bg3)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"20px", display:"flex", gap:0, flexWrap:"wrap" }}>
          {([
            ["+200", l==="es"?"creadoras activas":l==="en"?"active creators":"creator attivi"],
            ["+340%", l==="es"?"aumento medio":l==="en"?"avg income increase":"aumento medio"],
            ["30 días", l==="es"?"primeros resultados":l==="en"?"first results":"primi risultati"],
            ["24/7", l==="es"?"disponibilidad":l==="en"?"availability":"disponibilità"],
          ] as [string,string][]).map(([v,lbl]) => (
            <div key={v} style={{ flex:1, minWidth:120, padding:"8px 20px", textAlign:"center", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize:22, fontWeight:900, color:s.color, letterSpacing:"-1px", lineHeight:1 }}>{v}</div>
              <div style={{ fontSize:11, color:"var(--muted2)", marginTop:3 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────── */}
      <div style={{ padding:"60px 20px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"minmax(0,1fr)", gap:40 }}>

          {/* Content */}
          <div>
            <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, color:"#fff", marginBottom:20, letterSpacing:"-0.5px" }}>
              {l==="es"?"Qué incluye este servicio":l==="en"?"What this service includes":l==="fr"?"Ce que comprend ce service":l==="de"?"Was dieser Service beinhaltet":"Cosa include questo servizio"}
            </h2>
            <div style={{ display:"grid", gap:12, marginBottom:40 }}>
              {ta2(l,"sv").map(([icon,title,desc],i) => (
                <div key={i} className="card" style={{ padding:"18px 22px", display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:40, height:40, borderRadius:10, flexShrink:0, background:`${s.color}10`, border:`1px solid ${s.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontWeight:700, color:"#fff", fontSize:15, marginBottom:4 }}>{title}</p>
                    <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ section — key for SEO */}
            <h2 style={{ fontSize:"clamp(1.3rem,2.5vw,1.7rem)", fontWeight:900, color:"#fff", marginBottom:16, letterSpacing:"-0.5px" }}>
              {l==="es"?"Preguntas frecuentes":l==="en"?"Frequently asked questions":l==="fr"?"Questions fréquentes":l==="de"?"Häufige Fragen":"Domande frequenti"}
            </h2>
            <div style={{ display:"grid", gap:8, marginBottom:48 }}>
              {allFaqs.map(([q,a],i) => (
                <details key={i} className="card" style={{ padding:0 }}>
                  <summary style={{ padding:"16px 20px", fontWeight:700, color:"#fff", cursor:"pointer", fontSize:14, display:"flex", justifyContent:"space-between", alignItems:"center", userSelect:"none", listStyle:"none" }}>
                    <span style={{ flex:1, paddingRight:12 }}>{q}</span>
                    <span className="plus-icon" style={{ color:s.color, fontSize:22, fontWeight:300, lineHeight:1, flexShrink:0 }}>+</span>
                  </summary>
                  <div style={{ padding:"0 20px 16px", borderTop:"1px solid var(--border)" }}>
                    <p style={{ color:"var(--muted)", lineHeight:1.72, fontSize:13, paddingTop:14 }}>{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Sidebar CTA */}
          <div style={{ position:"relative" }}>
            <div className="card-glow" style={{ padding:28 }}>
              <div style={{ fontSize:10, fontWeight:700, color:s.color, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:14 }}>Only Sweety Agency</div>
              <h3 style={{ fontWeight:900, color:"#fff", fontSize:20, marginBottom:10, letterSpacing:"-0.5px", lineHeight:1.2 }}>
                {l==="es"?"¿Lista para empezar?":l==="en"?"Ready to start?":l==="fr"?"Prête à commencer ?":l==="de"?"Bereit loszulegen?":"Pronta per iniziare?"}
              </h3>
              <p style={{ color:"var(--muted)", fontSize:13, lineHeight:1.65, marginBottom:22 }}>
                {s.desc.slice(0, 100)}…
              </p>
              <a href="#form" className="btn btn-cta"
                style={{ display:"flex", justifyContent:"center", width:"100%", padding:"14px", fontSize:14, marginBottom:12 }}>
                {l==="es"?"Consulta gratuita — WhatsApp":l==="en"?"Free consultation — WhatsApp":l==="fr"?"Consultation gratuite":l==="de"?"Kostenlose Beratung":"Consulenza gratuita"}
              </a>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {[
                  l==="es"?"✓ Sin cuota inicial":l==="en"?"✓ No upfront fee":l==="fr"?"✓ Sans frais initiaux":l==="de"?"✓ Keine Vorauszahlung":"✓ Nessun pagamento iniziale",
                  l==="es"?"✓ Salida libre en 15 días":l==="en"?"✓ Exit in 15 days":l==="fr"?"✓ Sortie libre 15 jours":l==="de"?"✓ Ausstieg in 14 Tagen":"✓ Uscita libera 15 giorni",
                  l==="es"?"✓ Resultados medibles":l==="en"?"✓ Measurable results":l==="fr"?"✓ Résultats mesurables":l==="de"?"✓ Messbare Ergebnisse":"✓ Risultati misurabili",
                ].map(item => (
                  <div key={item} style={{ fontSize:12, color:"var(--muted)", display:"flex", alignItems:"center", gap:6 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Related pages */}
            {relatedPages.length > 0 && (
              <div style={{ marginTop:20 }}>
                <p style={{ fontSize:11, color:"var(--muted2)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>
                  {l==="es"?"Relacionado":l==="en"?"Related":"Verwandt"}
                </p>
                <div style={{ display:"grid", gap:8 }}>
                  {relatedPages.map(rp => (
                    <Link key={rp.slug} href={`/${l}/servicios/${rp.slug}/`}
                      className="card" style={{ padding:"10px 14px", display:"flex", gap:10, alignItems:"center", textDecoration:"none" }}>
                      <span style={{ fontSize:18 }}>{rp.icon}</span>
                      <div>
                        <p style={{ fontSize:12, fontWeight:700, color:"#fff", lineHeight:1.2 }}>{rp.kw}</p>
                        <p style={{ fontSize:11, color:rp.color }}>{rp.intent === "transactional" ? "Servicio" : rp.intent === "commercial" ? "Comparativa" : "Guía"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <div style={{ padding:"0 20px 64px" }}>
        <div style={{ maxWidth:680, margin:"0 auto", background:"linear-gradient(135deg,rgba(0,229,204,0.06),rgba(124,58,237,0.04))", border:"1px solid rgba(0,229,204,0.2)", borderRadius:20, padding:"36px", textAlign:"center" }}>
          <h2 style={{ fontWeight:900, color:"#fff", fontSize:22, marginBottom:10, letterSpacing:"-0.5px" }}>
            {t(l,"cta_title")}
          </h2>
          <p style={{ color:"var(--muted)", fontSize:14, marginBottom:24 }}>{t(l,"cta_sub")}</p>
          <a href="#form" className="btn btn-cta" style={{ fontSize:15, padding:"16px 36px" }}>
            {t(l,"cta_btn")}
          </a>
          <p style={{ fontSize:11, color:"var(--muted2)", marginTop:14 }}>{t(l,"cta_note")}</p>
        </div>
      </div>
    </>
  );
}
