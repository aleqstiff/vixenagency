import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES, BASE_URL, WA , smartTitle } from "@/lib/config";
import { getCountryData } from "@/lib/countryData";
import { GALLERY, IMGS } from "@/lib/images";
import { t } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";

export async function generateStaticParams() {
  const params: { locale: string; country: string }[] = [];
  LOCALES.forEach(l => (LOCALE_COUNTRIES[l as Locale]??[]).forEach(c => params.push({ locale:l, country:c })));
  return params;
}

const COUNTRY_META: Record<string, Record<string, { title:string; desc:string }>> = {
  es: {
    espana:    { title:"Agencia OnlyFans España — Madrid Barcelona | Only Sweety", desc:"Agencia de gestión OnlyFans en España. Chatters en español 24/7, marketing digital y anonimato total. Creadoras en Madrid, Barcelona, Valencia, Sevilla." },
    mexico:    { title:"Agencia OnlyFans México — CDMX | Only Sweety", desc:"Agencia OnlyFans en México. Chatters nativos 24/7, marketing en TikTok e Instagram. Creadoras en CDMX, Guadalajara, Monterrey. Cobramos solo si ganas." },
    argentina: { title:"Agencia OnlyFans Argentina — Buenos Aires | Only Sweety", desc:"Agencia OnlyFans en Argentina. Chatters nativos 24/7, posicionamiento en mercado USA. Creadoras en Buenos Aires, Córdoba, Rosario. Sin pago inicial." },
    colombia:  { title:"Agencia OnlyFans Colombia — Bogotá Medellín | Only Sweety", desc:"Agencia OnlyFans en Colombia. Chatters nativos 24/7, marketing y mercado USA. Creadoras en Bogotá, Medellín, Cali, Barranquilla. Sin permanencia." },
    chile:     { title:"Agencia OnlyFans Chile — Santiago | Only Sweety", desc:"Agencia OnlyFans en Chile. Chatters nativos 24/7, marketing y posicionamiento USA. Creadoras en Santiago, Valparaíso, Concepción." },
    peru:      { title:"Agencia OnlyFans Perú — Lima | Only Sweety", desc:"Agencia OnlyFans en Perú. Chatters nativos 24/7, marketing y anonimato total. Creadoras en Lima, Arequipa, Trujillo." },
    venezuela: { title:"Agencia OnlyFans Venezuela — Caracas | Only Sweety", desc:"Agencia OnlyFans en Venezuela. Chatters nativos 24/7, marketing y mercado USA. Creadoras en Caracas, Maracaibo, Valencia." },
    ecuador:   { title:"Agencia OnlyFans Ecuador — Guayaquil Quito | Only Sweety", desc:"Agencia OnlyFans en Ecuador. Chatters nativos 24/7, cobra en dólares, mercado USA. Creadoras en Guayaquil, Quito, Cuenca. Sin pago inicial." },
    bolivia:   { title:"Agencia OnlyFans Bolivia — Santa Cruz La Paz | Only Sweety", desc:"Agencia OnlyFans en Bolivia. Chatters nativos 24/7, cobra en dólares, mercado latino USA. Creadoras en Santa Cruz, La Paz, Cochabamba." },
    paraguay:  { title:"Agencia OnlyFans Paraguay — Asunción | Only Sweety", desc:"Agencia OnlyFans en Paraguay. Chatters nativos 24/7, ingresos en dólares, mercado USA. Creadoras en Asunción, Ciudad del Este." },
    uruguay:   { title:"Agencia OnlyFans Uruguay — Montevideo | Only Sweety", desc:"Agencia OnlyFans en Uruguay. Chatters nativos 24/7, cobra en dólares, mercado latino USA. Creadoras en Montevideo, Punta del Este." },
    guatemala: { title:"Agencia OnlyFans Guatemala — | Only Sweety", desc:"Agencia OnlyFans en Guatemala. Chatters nativos 24/7, ingresos en dólares, mercado USA. Creadoras en Ciudad de Guatemala." },
    costarica: { title:"Agencia OnlyFans Costa Rica — San José | Only Sweety", desc:"Agencia OnlyFans en Costa Rica. Chatters nativos 24/7, cobra en dólares, mercado latino USA. Creadoras en San José, Cartago." },
    panama:    { title:"Agencia OnlyFans Panamá — | Only Sweety", desc:"Agencia OnlyFans en Panamá. Chatters nativos 24/7, ingresos en dólares, mercado USA. Creadoras en Ciudad de Panamá." },
    republicadominicana: { title:"Agencia OnlyFans República Dominicana — Santo Domingo | Only Sweety", desc:"Agencia OnlyFans en República Dominicana. Chatters nativos 24/7, cobra en dólares, mercado USA. Creadoras en Santo Domingo, Santiago." },
    puertorico:{ title:"Agencia OnlyFans Puerto Rico — San Juan | Only Sweety", desc:"Agencia OnlyFans en Puerto Rico. Chatters nativos 24/7, mercado USA directo. Creadoras en San Juan, Bayamón, Ponce." },
    honduras:  { title:"Agencia OnlyFans Honduras — | Only Sweety", desc:"Agencia OnlyFans en Honduras. Chatters nativos 24/7, ingresos en dólares, mercado USA. Creadoras en Tegucigalpa, San Pedro Sula." },
    elsalvador:{ title:"Agencia OnlyFans El Salvador — | Only Sweety", desc:"Agencia OnlyFans en El Salvador. Chatters nativos 24/7, cobra en dólares, mercado latino USA. Creadoras en San Salvador." },
    nicaragua: { title:"Agencia OnlyFans Nicaragua — Managua | Only Sweety", desc:"Agencia OnlyFans en Nicaragua. Chatters nativos 24/7, ingresos en dólares, mercado USA. Creadoras en Managua, León." },
  },
  en: {
    eeuu:   { title:"OnlyFans Management Agency USA — New York Los Angeles Miami | Only Sweety", desc:"Top OnlyFans management agency in the USA. Native English chatters 24/7, social media marketing, full anonymity. Creators in New York, LA, Miami, Chicago." },
    canada: { title:"OnlyFans Management Agency Canada — Toronto Vancouver Montreal | Only Sweety", desc:"Top OnlyFans management agency in Canada. Native chatters 24/7, social media marketing, full anonymity. Creators in Toronto, Vancouver, Montreal, Calgary." },
  },
  fr: {
    france:   { title:"Agence OnlyFans France — Paris Lyon Marseille | Only Sweety", desc:"Agence OnlyFans & MYM en France. Chatteuses francophones 24/7, marketing digital, anonymat total. Créatrices à Paris, Lyon, Marseille, Toulouse." },
    belgique: { title:"Agence OnlyFans Belgique — Bruxelles Anvers | Only Sweety", desc:"Agence OnlyFans en Belgique. Chatteuses francophones 24/7, marketing digital, anonymat total. Créatrices à Bruxelles, Anvers, Gand, Liège." },
  },
  de: {
    deutschland:  { title:"OnlyFans Agentur Deutschland — Berlin München Hamburg | Only Sweety", desc:"OnlyFans Management Agentur in Deutschland. Deutschsprachige Chatter 24/7, Social-Media-Marketing, volle Anonymität. Creator in Berlin, München, Hamburg." },
    oesterreich:  { title:"OnlyFans Agentur Österreich — Wien Graz Salzburg | Only Sweety", desc:"OnlyFans Management Agentur in Österreich. Deutschsprachige Chatter 24/7, Social-Media-Marketing, volle Anonymität. Creator in Wien, Graz, Salzburg." },
  },
  it: {
    italia: { title:"Agenzia OnlyFans Italia — Milano Roma Napoli | Only Sweety", desc:"Agenzia OnlyFans in Italia. Chatter italiani 24/7, marketing digitale, anonimato totale. Creator a Milano, Roma, Napoli, Torino, Firenze." },
  },
  pt: {
    brasil: { title:"Agência OnlyFans Brasil — São Paulo Rio de Janeiro | Only Sweety", desc:"Agência OnlyFans no Brasil. Chatters brasileiros 24/7, marketing digital, anonimato total. Creators em São Paulo, Rio de Janeiro, BH, Brasília." },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; country: string }> }): Promise<Metadata> {
  const { locale, country } = await params;
  const l = locale as Locale;
  const meta = COUNTRY_META[l]?.[country];
  if (!meta) return {};
  return {
    title: smartTitle(meta.title, ""),
    description: meta.desc,
    alternates: { canonical: `${BASE_URL}/${l}/${country}/`, languages: { [l]: `${BASE_URL}/${l}/${country}/`, "x-default": `${BASE_URL}/${l}/${country}/` } },
    openGraph: { title: smartTitle(meta.title, ""), description: meta.desc, url: `${BASE_URL}/${l}/${country}/` },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country } = await params;
  const l = locale as Locale;
  const c = COUNTRIES[country as keyof typeof COUNTRIES];
  if (!c) return <div>Not found</div>;
  const meta = COUNTRY_META[l]?.[country];
  const data = getCountryData(country, c.name, c.city);
  const PINK = "#c4699a";

  const h1 = meta?.title.split("|")[0].trim() ?? `Agencia OnlyFans ${c.name}`;

  const schema = {
    "@context":"https://schema.org","@type":"LocalBusiness","name":`Only Sweety Agency — ${c.name}`,
    "description": meta?.desc ?? "",
    "url":`${BASE_URL}/${l}/${country}/`,
    "areaServed":{"@type":"Country","name":c.name},
    "telephone":`+${WA}`,
    "priceRange":"Comisión por resultados",
  };
  const faqSchema = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity": data.faqLocal.map(([q,a]) => ({ "@type":"Question", name:q, acceptedAnswer:{ "@type":"Answer", text:a } })),
  };

  // Services (localized, simple)
  const services = l === "es" ? [
    ["💬","Chatters 24/7 en español","Equipo nativo que responde y vende PPV a todas horas"],
    ["📈","Marketing en redes","Captación de tráfico en TikTok, Instagram, Reddit y X"],
    ["💰","Estrategia de precios","Optimización de suscripción, PPV y propinas"],
    ["🔒","Discreción total","Protegemos tu identidad y tus datos siempre"],
    ["🌎","Mercado USA","Te posicionamos donde más se paga del mundo"],
    ["📊","Informes claros","Sabes exactamente cuánto ganas y por qué"],
  ] : [
    ["💬","24/7 Chatters","Native team replying and selling PPV around the clock"],
    ["📈","Social marketing","Traffic from TikTok, Instagram, Reddit and X"],
    ["💰","Pricing strategy","Subscription, PPV and tips optimization"],
    ["🔒","Full discretion","We protect your identity and data always"],
    ["🌎","US market","We position you where the world pays most"],
    ["📊","Clear reports","You know exactly how much you earn and why"],
  ];

  const heroImg = GALLERY[Math.abs(country.charCodeAt(0) + country.charCodeAt(country.length-1)) % GALLERY.length];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MegaNav locale={l} />

      {/* ── HERO con imagen ── */}
      <section style={{ position:"relative", background:"var(--bg2)", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-20%", right:"-5%", width:400, height:400, borderRadius:"50%", background:"rgba(196,105,154,0.1)", filter:"blur(70px)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 20px 40px", display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:40, alignItems:"center", position:"relative" }} className="country-hero">
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:`1px solid ${PINK}25`, borderRadius:999, padding:"6px 14px", marginBottom:20, boxShadow:"0 2px 12px rgba(196,105,154,0.08)" }}>
              <span style={{ fontSize:20 }}>{c.flag}</span>
              <span style={{ fontSize:13, fontWeight:700, color:"var(--dark)" }}>{c.name}</span>
            </div>
            <h1 style={{ fontSize:"clamp(1.9rem,4.2vw,3rem)", fontWeight:900, color:"var(--dark)", lineHeight:1.12, letterSpacing:"-1px", marginBottom:16 }}>
              {h1}
            </h1>
            <p style={{ fontSize:16, color:"var(--muted)", lineHeight:1.7, marginBottom:28 }}>{meta?.desc}</p>
            <a href={`/${l}/#form`} className="btn btn-rose" style={{ padding:"16px 34px", fontSize:16 }}>
              {t(l,"cta_btn")}
            </a>
            <p style={{ fontSize:12, color:"var(--muted2)", marginTop:14 }}>
              {l==="es" ? "Sin cuota inicial · Solo cobramos si ganas · 100% confidencial" : "No upfront fee · We only earn if you earn · 100% confidential"}
            </p>
          </div>
          <div style={{ position:"relative" }}>
            <div style={{ borderRadius:24, overflow:"hidden", aspectRatio:"4/5", boxShadow:"0 24px 60px rgba(196,105,154,0.2)" }}>
              <img src={heroImg} alt={`Creadora OnlyFans en ${c.name}`} width={480} height={600}
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 25%", display:"block" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(26,16,24,0.4),transparent 55%)" }}/>
            </div>
            {/* Case study floating card */}
            <div style={{ position:"absolute", bottom:-16, left:16, right:16, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderRadius:14, padding:"12px 16px", boxShadow:"0 12px 32px rgba(26,16,24,0.15)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <p style={{ fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>{data.caseStudy.name} · {data.caseStudy.city}</p>
                <p style={{ fontWeight:800, fontSize:14, color:"var(--dark)" }}>{data.caseStudy.before} → <span style={{ color:PINK }}>{data.caseStudy.after}</span></p>
              </div>
              <span style={{ fontSize:10, color:"var(--muted2)", textAlign:"right" }}>{data.caseStudy.time}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS locales ── */}
      <section style={{ background:"#fff", padding:"48px 20px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }} className="stats-3">
          {data.stats.map(([v,lbl],i) => (
            <div key={i} style={{ textAlign:"center", padding:"24px 16px", background:"var(--bg2)", borderRadius:16, border:"1px solid var(--border)" }}>
              <p style={{ fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:900, color:PINK, letterSpacing:"-1px", lineHeight:1 }}>{v}</p>
              <p style={{ fontSize:12, color:"var(--muted)", marginTop:8, lineHeight:1.4 }}>{lbl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO local + ventaja ── */}
      <section style={{ background:"var(--bg2)", padding:"56px 20px" }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <p style={{ fontSize:11, fontWeight:700, color:PINK, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>
            {l==="es" ? `OnlyFans en ${c.name}` : `OnlyFans in ${c.name}`}
          </p>
          <p style={{ fontSize:17, color:"var(--dark)", lineHeight:1.75, marginBottom:24, fontWeight:500 }}>{data.intro}</p>
          <div style={{ background:"#fff", borderRadius:18, padding:"26px 28px", border:`1px solid ${PINK}20`, boxShadow:"0 4px 20px rgba(196,105,154,0.06)" }}>
            <p style={{ fontSize:11, fontWeight:700, color:PINK, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>
              {l==="es" ? "Tu ventaja" : "Your advantage"}
            </p>
            <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.7 }}>{data.advantage}</p>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section style={{ background:"#fff", padding:"56px 20px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:900, color:"var(--dark)", textAlign:"center", marginBottom:8, letterSpacing:"-0.5px" }}>
            {l==="es" ? `Qué hacemos por ti en ${c.name}` : `What we do for you in ${c.name}`}
          </h2>
          <p style={{ textAlign:"center", color:"var(--muted)", fontSize:15, marginBottom:36 }}>
            {l==="es" ? "Tú creas el contenido. Nosotras gestionamos todo lo demás." : "You create content. We manage everything else."}
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
            {services.map(([icon,title,desc],i) => (
              <div key={i} className="card" style={{ padding:"24px 26px" }}>
                <div style={{ fontSize:30, marginBottom:12 }}>{icon}</div>
                <h3 style={{ fontWeight:800, color:"var(--dark)", fontSize:16, marginBottom:8 }}>{title}</h3>
                <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ciudades (SEO local) ── */}
      <section style={{ background:"var(--bg2)", padding:"44px 20px" }}>
        <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
          <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.8 }}>
            {l==="es" ? "Trabajamos con creadoras en " : "We work with creators in "}
            {data.cities.map((city,i) => (
              <span key={i}>
                <strong style={{ color:"var(--dark)" }}>{city}</strong>{i < data.cities.length-1 ? ", " : ""}
              </span>
            ))}
            {l==="es" ? ` y en todo ${c.name}.` : ` and across ${c.name}.`}
          </p>
        </div>
      </section>

      {/* ── FAQ local ── */}
      <section style={{ background:"#fff", padding:"56px 20px" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <h2 style={{ fontSize:"clamp(1.3rem,2.8vw,1.8rem)", fontWeight:900, color:"var(--dark)", marginBottom:28, letterSpacing:"-0.5px" }}>
            {l==="es" ? `Preguntas frecuentes — ${c.name}` : `FAQ — ${c.name}`}
          </h2>
          <div style={{ display:"grid", gap:12 }}>
            {data.faqLocal.map(([q,a],i) => (
              <details key={i} style={{ background:"var(--bg2)", borderRadius:14, padding:"18px 22px", border:"1px solid var(--border)" }}>
                <summary style={{ fontWeight:700, color:"var(--dark)", fontSize:15, cursor:"pointer", listStyle:"none" }}>{q}</summary>
                <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.7, marginTop:12 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section style={{ background:"var(--bg2)", padding:"64px 20px" }}>
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center" }}>
          <div style={{ background:"linear-gradient(135deg,var(--dark),#2a1a26)", borderRadius:24, padding:"44px 36px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-30%", right:"-10%", width:240, height:240, borderRadius:"50%", background:"rgba(217,133,176,0.2)", filter:"blur(50px)", pointerEvents:"none" }}/>
            <h2 style={{ fontWeight:900, color:"#fff", fontSize:"clamp(1.4rem,3vw,2rem)", marginBottom:12, letterSpacing:"-0.5px", position:"relative" }}>
              {l==="es" ? `¿Lista para empezar en ${c.name}?` : `Ready to start in ${c.name}?`}
            </h2>
            <p style={{ color:"rgba(255,255,255,0.7)", marginBottom:28, fontSize:15, position:"relative" }}>
              {l==="es" ? "Análisis gratuito de tu cuenta en menos de 24h. Sin compromiso." : "Free account analysis in under 24h. No commitment."}
            </p>
            <a href={`/${l}/#form`} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"16px 36px", borderRadius:14, background:"linear-gradient(135deg,var(--pink),var(--pink2))", color:"#fff", fontWeight:800, fontSize:16, position:"relative", boxShadow:"0 8px 28px rgba(196,105,154,0.4)" }}>
              {t(l,"cta_btn")}
            </a>
          </div>
        </div>
      </section>

      <div style={{ textAlign:"center", padding:"24px 20px 40px", background:"var(--bg2)" }}>
        <Link href={`/${l}/`} style={{ color:"var(--pink)", fontSize:13, fontWeight:600 }}>← {l==="es"?"Volver al inicio":l==="en"?"Back home":"Retour"}</Link>
      </div>

      <footer style={{ padding:"24px", textAlign:"center", borderTop:"1px solid var(--border)", background:"#fff" }}>
        <p style={{ fontSize:12, color:"var(--muted2)" }}>© 2026 Only Sweety Agency · {t(l,"footer_rights")}</p>
      </footer>
    </>
  );
}
