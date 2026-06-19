import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES, BASE_URL, WA, waLink, waMsg } from "@/lib/config";
import { t, ta2 } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";

export async function generateStaticParams() {
  const params: { locale: string; country: string }[] = [];
  LOCALES.forEach(l => (LOCALE_COUNTRIES[l as Locale]??[]).forEach(c => params.push({ locale:l, country:c })));
  return params;
}

const COUNTRY_META: Record<string, Record<string, { title:string; desc:string }>> = {
  es: {
    espana:    { title:"Agencia OnlyFans España — Gestión Profesional Madrid Barcelona | VixenAgency", desc:"Agencia de gestión OnlyFans en España. Chatters en español 24/7, marketing digital y anonimato total. Creadoras en Madrid, Barcelona, Valencia, Sevilla. Aplicación gratuita." },
    mexico:    { title:"Agencia OnlyFans México — Gestión Profesional CDMX | VixenAgency", desc:"Agencia OnlyFans en México. Chatters nativos 24/7, marketing en TikTok e Instagram. Creadoras en CDMX, Guadalajara, Monterrey. Cobramos solo si ganas." },
    argentina: { title:"Agencia OnlyFans Argentina — Gestión Profesional Buenos Aires | VixenAgency", desc:"Agencia OnlyFans en Argentina. Chatters nativos 24/7, posicionamiento en mercado USA. Creadoras en Buenos Aires, Córdoba, Rosario. Sin pago inicial." },
    colombia:  { title:"Agencia OnlyFans Colombia — Gestión Profesional Bogotá Medellín | VixenAgency", desc:"Agencia OnlyFans en Colombia. Chatters nativos 24/7, marketing y mercado USA. Creadoras en Bogotá, Medellín, Cali, Barranquilla. Sin permanencia." },
    chile:     { title:"Agencia OnlyFans Chile — Gestión Profesional Santiago | VixenAgency", desc:"Agencia OnlyFans en Chile. Chatters nativos 24/7, marketing y posicionamiento USA. Creadoras en Santiago, Valparaíso, Concepción." },
    peru:      { title:"Agencia OnlyFans Perú — Gestión Profesional Lima | VixenAgency", desc:"Agencia OnlyFans en Perú. Chatters nativos 24/7, marketing y anonimato total. Creadoras en Lima, Arequipa, Trujillo." },
    venezuela: { title:"Agencia OnlyFans Venezuela — Gestión Profesional Caracas | VixenAgency", desc:"Agencia OnlyFans en Venezuela. Chatters nativos 24/7, marketing y mercado USA. Creadoras en Caracas, Maracaibo, Valencia." },
  },
  en: {
    eeuu:   { title:"OnlyFans Management Agency USA — New York Los Angeles Miami | VixenAgency", desc:"Top OnlyFans management agency in the USA. Native English chatters 24/7, social media marketing, full anonymity. Creators in New York, LA, Miami, Chicago." },
    canada: { title:"OnlyFans Management Agency Canada — Toronto Vancouver Montreal | VixenAgency", desc:"Top OnlyFans management agency in Canada. Native chatters 24/7, social media marketing, full anonymity. Creators in Toronto, Vancouver, Montreal, Calgary." },
  },
  fr: {
    france:   { title:"Agence OnlyFans France — Paris Lyon Marseille | VixenAgency", desc:"Agence OnlyFans & MYM en France. Chatteuses francophones 24/7, marketing digital, anonymat total. Créatrices à Paris, Lyon, Marseille, Toulouse." },
    belgique: { title:"Agence OnlyFans Belgique — Bruxelles Anvers | VixenAgency", desc:"Agence OnlyFans en Belgique. Chatteuses francophones 24/7, marketing digital, anonymat total. Créatrices à Bruxelles, Anvers, Gand, Liège." },
  },
  de: {
    deutschland:  { title:"OnlyFans Agentur Deutschland — Berlin München Hamburg | VixenAgency", desc:"OnlyFans Management Agentur in Deutschland. Deutschsprachige Chatter 24/7, Social-Media-Marketing, volle Anonymität. Creator in Berlin, München, Hamburg." },
    oesterreich:  { title:"OnlyFans Agentur Österreich — Wien Graz Salzburg | VixenAgency", desc:"OnlyFans Management Agentur in Österreich. Deutschsprachige Chatter 24/7, Social-Media-Marketing, volle Anonymität. Creator in Wien, Graz, Salzburg." },
  },
  it: {
    italia: { title:"Agenzia OnlyFans Italia — Milano Roma Napoli | VixenAgency", desc:"Agenzia OnlyFans in Italia. Chatter italiani 24/7, marketing digitale, anonimato totale. Creator a Milano, Roma, Napoli, Torino, Firenze." },
  },
  pt: {
    brasil: { title:"Agência OnlyFans Brasil — São Paulo Rio de Janeiro | VixenAgency", desc:"Agência OnlyFans no Brasil. Chatters brasileiros 24/7, marketing digital, anonimato total. Creators em São Paulo, Rio de Janeiro, BH, Brasília." },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; country: string }> }): Promise<Metadata> {
  const { locale, country } = await params;
  const l = locale as Locale;
  const meta = COUNTRY_META[l]?.[country];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.desc,
    alternates: { canonical: `${BASE_URL}/${l}/${country}/` },
    openGraph: { title: meta.title, description: meta.desc, url: `${BASE_URL}/${l}/${country}/` },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country } = await params;
  const l = locale as Locale;
  const c = COUNTRIES[country as keyof typeof COUNTRIES];
  if (!c) return <div>Not found</div>;
  const href = waLink(waMsg(l));
  const meta = COUNTRY_META[l]?.[country];

  const schema = {
    "@context":"https://schema.org","@type":"LocalBusiness","name":`VixenAgency — ${c.name}`,
    "description": meta?.desc ?? "",
    "url":`${BASE_URL}/${l}/${country}/`,
    "areaServed":{"@type":"Country","name":c.name},
    "telephone":`+${WA}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MegaNav locale={l} />
<section style={{ position:"relative",padding:"80px 20px 60px",textAlign:"center",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 60% at 50% 0%,rgba(0,229,212,0.1) 0%,transparent 65%)",pointerEvents:"none" }} />
        <div style={{ maxWidth:800,margin:"0 auto",position:"relative" }}>
          <div style={{ fontSize:56,marginBottom:16 }}>{c.flag}</div>
          <h1 style={{ fontSize:"clamp(2rem,5vw,3.4rem)",fontWeight:900,color:"var(--dark)",lineHeight:1.1,letterSpacing:"-1px",marginBottom:16 }}>
            {meta?.title.split("|")[0].trim() ?? `VixenAgency — ${c.name}`}
          </h1>
          <p style={{ fontSize:16,color:"var(--muted)",lineHeight:1.7,maxWidth:580,margin:"0 auto 40px" }}>{meta?.desc}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:"18px 40px",fontSize:16 }}>
            <span style={{ fontSize:22 }}>💬</span> {t(l,"hero_cta")}
          </a>
        </div>
      </section>

      <section style={{ padding:"60px 20px",background:"var(--cream2)" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16 }}>
            {ta2(l,"sv").slice(0,6).map(([icon,title,desc],i) => (
              <div key={i} className="card" style={{ padding:24 }}>
                <div style={{ fontSize:28,marginBottom:12 }}>{icon}</div>
                <h3 style={{ fontWeight:700,color:"var(--dark)",fontSize:16,marginBottom:8 }}>{title}</h3>
                <p style={{ color:"var(--muted)",fontSize:13,lineHeight:1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"60px 20px" }}>
        <div style={{ maxWidth:640,margin:"0 auto",textAlign:"center" }}>
          <div className="card-glow" style={{ padding:40 }}>
            <h2 style={{ fontWeight:900,color:"var(--dark)",fontSize:22,marginBottom:12 }}>{t(l,"cta_title")}</h2>
            <p style={{ color:"var(--muted)",marginBottom:28 }}>{t(l,"cta_sub")}</p>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:"16px 36px",fontSize:15 }}>
              <span>💬</span> {t(l,"cta_btn")}
            </a>
          </div>
        </div>
      </section>

      <div style={{ textAlign:"center",padding:"24px 20px 40px" }}>
        <Link href={`/${l}/`} style={{ color:"var(--muted)",fontSize:13 }}>← {l==="es"?"Volver":l==="en"?"Back":l==="fr"?"Retour":l==="de"?"Zurück":"Indietro"}</Link>
      </div>

      <footer style={{ padding:"20px",textAlign:"center",borderTop:"1px solid rgba(0,229,212,0.06)" }}>
        <p style={{ fontSize:12,color:"var(--muted2)" }}>© 2026 VixenAgency · {t(l,"footer_rights")}</p>
      </footer>
    </>
  );
}
