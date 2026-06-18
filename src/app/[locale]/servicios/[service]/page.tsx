import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, type Locale, SERVICES, LOCALE_COUNTRIES, COUNTRIES, BASE_URL, waLink, waMsg } from "@/lib/config";
import { t, ta2 } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";
import Popup from "@/components/Popup";
import { POSTS } from "@/lib/blog";

export async function generateStaticParams() {
  const p: { locale:string; service:string }[] = [];
  LOCALES.forEach(l => (SERVICES[l as Locale]??[]).forEach(s => p.push({ locale:l, service:s.slug })));
  return p;
}

export async function generateMetadata({ params }: { params: Promise<{locale:string;service:string}> }): Promise<Metadata> {
  const { locale, service } = await params; const l = locale as Locale;
  const s = SERVICES[l]?.find(x => x.slug===service);
  if (!s) return {};
  return {
    title: `${s.title} | VixenAgency`,
    description: s.desc,
    keywords: s.kw,
    alternates: { canonical:`${BASE_URL}/${l}/servicios/${service}/` },
    openGraph: { title:s.title, description:s.desc, url:`${BASE_URL}/${l}/servicios/${service}/`, type:"website" },
  };
}

export default async function ServicePage({ params }: { params: Promise<{locale:string;service:string}> }) {
  const { locale, service } = await params; const l = locale as Locale;
  const s = SERVICES[l]?.find(x => x.slug===service);
  if (!s) return <div>Not found</div>;
  const wa = waMsg(l); const href = waLink(wa);
  const recentSlugs = POSTS.filter(p => p.locale===l).map(p => ({ slug:p.slug, title:p.title, locale:p.locale }));
  const related = (SERVICES[l]??[]).filter(x => x.slug!==service).slice(0,4);
  const schema = {
    "@context":"https://schema.org","@type":"Service","name":s.title,"description":s.desc,
    "provider":{"@type":"Organization","name":"VixenAgency","url":BASE_URL},
    "areaServed":"Worldwide",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MegaNav locale={l} recentSlugs={recentSlugs} />
      <Popup locale={l} href={href} />

      {/* HERO */}
      <section style={{ position:"relative",padding:"88px 24px 72px",textAlign:"center",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 60% at 50% 0%,${s.color}12 0%,transparent 65%)`,pointerEvents:"none" }} />
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,229,212,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,212,0.025) 1px,transparent 1px)",backgroundSize:"72px 72px",pointerEvents:"none" }} />
        <div style={{ maxWidth:820,margin:"0 auto",position:"relative" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,marginBottom:22,padding:"5px 16px",borderRadius:999,background:"rgba(0,229,212,0.07)",border:"1px solid rgba(0,229,212,0.2)",color:"var(--teal)",fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" }}>
            <span style={{ fontSize:18 }}>{s.icon}</span> {s.kw}
          </div>
          <h1 style={{ fontSize:"clamp(2rem,5vw,3.6rem)",fontWeight:900,color:"#fff",lineHeight:1.1,letterSpacing:"-1.5px",marginBottom:12 }}>{s.title}</h1>
          <p style={{ fontSize:18,fontWeight:700,color:s.color,marginBottom:18 }}>{s.headline}</p>
          <p style={{ fontSize:16,color:"var(--muted)",lineHeight:1.72,maxWidth:580,margin:"0 auto 40px" }}>{s.desc}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize:16,padding:"18px 44px" }}>
            <span style={{ fontSize:22 }}>💬</span> {t(l,"hero_cta")}
          </a>
          <p style={{ fontSize:12,color:"var(--muted2)",marginTop:16 }}>{t(l,"hero_trust")}</p>
        </div>
      </section>

      {/* WHY THIS SERVICE */}
      <section style={{ padding:"72px 24px",background:"var(--bg2)" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18 }}>
            {ta2(l,"sv").slice(0,6).map(([icon,title,desc],i) => (
              <div key={i} className="card" style={{ padding:26 }}>
                <span style={{ fontSize:28,display:"block",marginBottom:14 }}>{icon}</span>
                <h3 style={{ fontWeight:800,color:"#fff",fontSize:17,marginBottom:8 }}>{title}</h3>
                <p style={{ color:"var(--muted)",fontSize:13,lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:"72px 24px" }}>
        <div style={{ maxWidth:800,margin:"0 auto" }}>
          <h2 style={{ fontWeight:900,color:"#fff",fontSize:"clamp(1.6rem,3vw,2.2rem)",textAlign:"center",marginBottom:48 }}>{t(l,"how_title")}</h2>
          <div style={{ display:"grid",gap:14 }}>
            {ta2(l,"how").map(([n,title,desc],i) => (
              <div key={i} className="card" style={{ display:"flex",gap:20,padding:"22px 26px",alignItems:"flex-start" }}>
                <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--teal),#0284c7)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,color:"#020b18",flexShrink:0,marginTop:2 }}>
                  {i+1}
                </div>
                <div>
                  <h3 style={{ fontWeight:800,color:"#fff",fontSize:17,marginBottom:6 }}>{title}</h3>
                  <p style={{ color:"var(--muted)",fontSize:13,lineHeight:1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"72px 24px",background:"var(--bg2)" }}>
        <div style={{ maxWidth:640,margin:"0 auto",textAlign:"center" }}>
          <div className="card-glow" style={{ padding:"52px 40px" }}>
            <h2 style={{ fontWeight:900,color:"#fff",fontSize:24,marginBottom:12 }}>{t(l,"cta_title")}</h2>
            <p style={{ color:"var(--muted)",marginBottom:32,lineHeight:1.7 }}>{t(l,"cta_sub")}</p>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize:16,padding:"18px 44px" }}>
              <span>💬</span> {t(l,"cta_btn")}
            </a>
            <p style={{ fontSize:12,color:"var(--muted2)",marginTop:16 }}>{t(l,"cta_note")}</p>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section style={{ padding:"56px 24px 72px" }}>
          <div style={{ maxWidth:960,margin:"0 auto" }}>
            <h2 style={{ fontWeight:800,color:"#fff",fontSize:18,marginBottom:24 }}>
              {l==="es"?"Servicios relacionados":l==="en"?"Related services":l==="fr"?"Services liés":l==="de"?"Ähnliche Leistungen":"Servizi correlati"}
            </h2>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12 }}>
              {related.map(rs => (
                <Link key={rs.slug} href={`/${l}/servicios/${rs.slug}/`} className="card"
                  style={{ padding:"16px 20px",display:"flex",alignItems:"center",gap:12,textDecoration:"none" }}>
                  <span style={{ fontSize:22 }}>{rs.icon}</span>
                  <div>
                    <p style={{ fontWeight:700,color:"#fff",fontSize:13 }}>{rs.kw}</p>
                    <p style={{ color:"var(--muted)",fontSize:11,marginTop:2 }}>{rs.headline.slice(0,40)}…</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ textAlign:"center",padding:"0 24px 48px" }}>
        <Link href={`/${l}/`} style={{ color:"var(--muted)",fontSize:13,textDecoration:"none" }}>
          ← {l==="es"?"Inicio":l==="en"?"Home":l==="fr"?"Accueil":l==="de"?"Startseite":"Home"}
        </Link>
      </div>
    </>
  );
}
