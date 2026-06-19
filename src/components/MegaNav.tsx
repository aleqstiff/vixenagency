"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES, SERVICES, waLink, waMsg } from "@/lib/config";
import { t } from "@/lib/translations";
import { POSTS } from "@/lib/blog";

export default function MegaNav({ locale, posts = [] }: {
  locale: Locale;
  posts?: { slug: string; title: string }[];
}) {
  const [desktop, setDesktop] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mSection, setMSection] = useState<string | null>(null);
  const href = waLink(waMsg(locale));
  const countries = LOCALE_COUNTRIES[locale] ?? [];
  const services  = SERVICES[locale] ?? [];

  useEffect(() => { document.body.style.overflow = mobile ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobile]);

  const L: Record<string, Record<Locale, string>> = {
    sv: { es:"Servicios",en:"Services",fr:"Services",de:"Leistungen",it:"Servizi",pt:"Serviços" },
    co: { es:"Países",en:"Countries",fr:"Pays",de:"Länder",it:"Paesi",pt:"Países" },
    how:{ es:"Cómo funciona",en:"How it works",fr:"Comment ça marche",de:"So geht's",it:"Come funziona",pt:"Como funciona" },
  };

  const PILL: React.CSSProperties = {
    background:"none", border:"none", cursor:"pointer",
    padding:"8px 14px", borderRadius:8, fontSize:14, fontWeight:600,
    color:"rgba(26,18,16,0.55)", display:"flex", alignItems:"center", gap:5,
  };

  const MEGA: React.CSSProperties = {
    position:"absolute", top:"calc(100% + 8px)", left:0, zIndex:200, minWidth:520,
    background:"var(--bg2)", border:"1px solid rgba(26,22,18,0.1)",
    borderRadius:20, boxShadow:"0 20px 60px rgba(26,22,18,0.15)",
    padding:24,
  };

  return (
    <>
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.96)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(26,22,18,0.08)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>

          {/* Logo */}
          <Link href={`/${locale}/`} style={{ fontWeight:800, fontSize:20, letterSpacing:"-0.5px", textDecoration:"none", color:"var(--dark)", flexShrink:0 }}>
            <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontStyle:"italic" }}>Vixen</span>
            <span style={{ fontWeight:700 }}>Agency</span>
          </Link>

          {/* Desktop nav */}
          <div className="hide-mobile" style={{ flex:1, alignItems:"center", gap:2, marginLeft:24 }}
            onMouseLeave={() => setDesktop(null)}>

            {/* Services */}
            <div style={{ position:"relative" }} onMouseEnter={() => setDesktop("sv")}>
              <button style={PILL}>{L.sv[locale]} <span style={{ fontSize:9, opacity:.4 }}>▾</span></button>
              {desktop === "sv" && (
                <div style={{ ...MEGA, minWidth:600 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"var(--rose2)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>{t(locale,"nav_mega_services_title")}</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {services.map(s => (
                      <Link key={s.slug} href={`/${locale}/servicios/${s.slug}/`}
                        style={{ display:"flex", gap:12, padding:"10px 14px", borderRadius:12, background:"var(--bg2)", border:"1px solid var(--border-d)", textDecoration:"none", transition:"border-color .15s" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(212,130,106,0.4)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)")}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"var(--rose-bg)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                          {s.icon}
                        </div>
                        <div>
                          <p style={{ fontWeight:700, color:"var(--dark)", fontSize:13, marginBottom:2 }}>{s.title.split("—")[0].trim()}</p>
                          <p style={{ color:"var(--muted)", fontSize:11 }}>{s.desc.slice(0,52)}…</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Countries */}
            {countries.length > 1 && (
              <div style={{ position:"relative" }} onMouseEnter={() => setDesktop("co")}>
                <button style={PILL}>{L.co[locale]} <span style={{ fontSize:9, opacity:.4 }}>▾</span></button>
                {desktop === "co" && (
                  <div style={{ ...MEGA, minWidth:340 }}>
                    <p style={{ fontSize:10, fontWeight:700, color:"var(--rose2)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:14 }}>{t(locale,"nav_mega_countries_title")}</p>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                      {countries.map(ck => {
                        const c = COUNTRIES[ck];
                        return (
                          <Link key={ck} href={`/${locale}/${ck}/`}
                            style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, background:"var(--bg2)", border:"1px solid var(--border-d)", textDecoration:"none" }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(212,130,106,0.4)")}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)")}>
                            <span style={{ fontSize:20 }}>{c.flag}</span>
                            <div>
                              <p style={{ fontWeight:700, color:"var(--dark)", fontSize:13 }}>{c.name}</p>
                              <p style={{ color:"var(--muted)", fontSize:11 }}>{c.city}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Blog */}
            <div style={{ position:"relative" }} onMouseEnter={() => setDesktop("blog")}>
              <button style={PILL}>Blog <span style={{ fontSize:9, opacity:.4 }}>▾</span></button>
              {desktop === "blog" && (
                <div style={{ ...MEGA, minWidth:380 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"var(--rose2)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:14 }}>
                    {locale==="es"?"Últimos artículos":locale==="en"?"Latest articles":locale==="fr"?"Derniers articles":locale==="de"?"Neueste Artikel":"Ultimi articoli"}
                  </p>
                  <div style={{ display:"grid", gap:6, marginBottom:12 }}>
                    {posts.slice(0,4).map(p => (
                      <Link key={p.slug} href={`/${locale}/blog/${p.slug}/`}
                        style={{ display:"flex", gap:10, padding:"10px 12px", borderRadius:10, background:"var(--bg2)", border:"1px solid var(--border-d)", textDecoration:"none" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(212,130,106,0.4)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)")}>
                        <div style={{ width:30, height:30, borderRadius:8, background:"var(--rose-bg)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>✍</div>
                        <p style={{ fontWeight:600, color:"var(--dark)", fontSize:13, lineHeight:1.3 }}>{p.title}</p>
                      </Link>
                    ))}
                  </div>
                  <Link href={`/${locale}/blog/`}
                    style={{ display:"block", textAlign:"center", padding:"10px", borderRadius:10, border:"1px solid rgba(212,130,106,0.3)", color:"var(--rose2)", fontSize:13, fontWeight:700, textDecoration:"none" }}>
                    {locale==="es"?"Ver todos →":"View all →"}
                  </Link>
                </div>
              )}
            </div>

            <Link href={`/${locale}/#como`}
              style={{ ...PILL, textDecoration:"none" }}>{L.how[locale]}</Link>
          </div>

          {/* Right */}
          <div className="hide-mobile" style={{ alignItems:"center", gap:8, flexShrink:0 }}>
            <div style={{ display:"flex", gap:2, marginRight:6 }}>
              {LOCALES.map(loc => (
                <Link key={loc} href={`/${loc}/`}
                  style={{ fontSize:10, padding:"3px 6px", borderRadius:5, textDecoration:"none",
                    fontFamily:"monospace", textTransform:"uppercase", fontWeight:800,
                    color: loc===locale ? "var(--rose2)" : "rgba(255,255,255,0.25)",
                    background: loc===locale ? "rgba(212,130,106,0.08)" : "transparent",
                    border:`1px solid ${loc===locale ? "rgba(212,130,106,0.4)" : "transparent"}` }}>
                  {loc}
                </Link>
              ))}
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{ padding:"10px 22px", fontSize:13 }}>
              {locale==="es"?"Aplicar gratis":locale==="en"?"Apply free":locale==="fr"?"Postuler":locale==="de"?"Bewerben":"Candidati"}
            </a>
          </div>

          {/* Hamburger */}
          <button className="show-mobile" onClick={() => setMobile(!mobile)} aria-label="Menu"
            style={{ background:"rgba(255,255,255,0.06)", border:"1px solid var(--border-d)", borderRadius:10, padding:"10px 12px", cursor:"pointer", flexDirection:"column", gap:5, alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:22, height:2, background:"var(--bg2)", borderRadius:1, transition:"all .25s",
                transform:mobile?(i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"none"):"none",
                opacity:mobile&&i===1?0:1 }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{ position:"fixed", top:64, left:0, right:0, bottom:0,
        background:"var(--bg2)", zIndex:99, overflowY:"auto", padding:"20px 20px 40px",
        transform:mobile?"translateX(0)":"translateX(-100%)",
        transition:"transform .3s cubic-bezier(.4,0,.2,1)",
        borderTop:"1px solid rgba(255,255,255,0.08)" }}>

        <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => setMobile(false)}
          className="btn btn-rose" style={{ display:"flex", justifyContent:"center", width:"100%", padding:"16px", fontSize:16, marginBottom:20, borderRadius:14 }}>
          {locale==="es"?"Solicitar análisis gratuito":locale==="en"?"Request free analysis":locale==="fr"?"Analyse gratuite":locale==="de"?"Kostenlose Analyse":"Analisi gratuita"}
        </a>

        {/* Servicios */}
        <div style={{ marginBottom:6 }}>
          <button onClick={() => setMSection(mSection==="sv"?null:"sv")}
            style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", borderRadius:12, background:"var(--bg2)", border:"1px solid var(--border-d)", cursor:"pointer", color:"var(--dark)", fontWeight:700, fontSize:15 }}>
            <span>{L.sv[locale]}</span>
            <span style={{ color:"var(--rose2)", fontSize:22, fontWeight:300, transform:mSection==="sv"?"rotate(45deg)":"none", transition:"transform .2s", lineHeight:1 }}>+</span>
          </button>
          {mSection === "sv" && (
            <div style={{ padding:"10px 0 0 6px", display:"grid", gap:6 }}>
              {services.map(s => (
                <Link key={s.slug} href={`/${locale}/servicios/${s.slug}/`} onClick={() => setMobile(false)}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:10, background:"var(--bg2)", border:"1px solid var(--border-d)", textDecoration:"none" }}>
                  <span style={{ fontSize:20 }}>{s.icon}</span>
                  <div>
                    <p style={{ fontWeight:700, color:"var(--dark)", fontSize:14 }}>{s.kw}</p>
                    <p style={{ color:"var(--muted)", fontSize:11, marginTop:1 }}>{s.headline.slice(0,42)}…</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Countries */}
        {countries.length > 1 && (
          <div style={{ marginBottom:6 }}>
            <button onClick={() => setMSection(mSection==="co"?null:"co")}
              style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", borderRadius:12, background:"var(--bg2)", border:"1px solid var(--border-d)", cursor:"pointer", color:"var(--dark)", fontWeight:700, fontSize:15 }}>
              <span>{L.co[locale]}</span>
              <span style={{ color:"var(--rose2)", fontSize:22, fontWeight:300, transform:mSection==="co"?"rotate(45deg)":"none", transition:"transform .2s", lineHeight:1 }}>+</span>
            </button>
            {mSection === "co" && (
              <div style={{ padding:"10px 0 0 6px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                {countries.map(ck => {
                  const c = COUNTRIES[ck];
                  return (
                    <Link key={ck} href={`/${locale}/${ck}/`} onClick={() => setMobile(false)}
                      style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:10, background:"var(--bg2)", border:"1px solid var(--border-d)", textDecoration:"none" }}>
                      <span style={{ fontSize:20 }}>{c.flag}</span>
                      <div>
                        <p style={{ fontWeight:700, color:"var(--dark)", fontSize:13 }}>{c.name}</p>
                        <p style={{ color:"var(--muted)", fontSize:11 }}>{c.city}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Blog */}
        <div style={{ marginBottom:6 }}>
          <button onClick={() => setMSection(mSection==="blog"?null:"blog")}
            style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", borderRadius:12, background:"var(--bg2)", border:"1px solid var(--border-d)", cursor:"pointer", color:"var(--dark)", fontWeight:700, fontSize:15 }}>
            <span>Blog</span>
            <span style={{ color:"var(--rose2)", fontSize:22, fontWeight:300, transform:mSection==="blog"?"rotate(45deg)":"none", transition:"transform .2s", lineHeight:1 }}>+</span>
          </button>
          {mSection === "blog" && (
            <div style={{ padding:"10px 0 0 6px", display:"grid", gap:6 }}>
              {posts.slice(0,5).map(p => (
                <Link key={p.slug} href={`/${locale}/blog/${p.slug}/`} onClick={() => setMobile(false)}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:10, background:"var(--bg2)", border:"1px solid var(--border-d)", textDecoration:"none" }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:"var(--rose-bg)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>✍</div>
                  <p style={{ fontWeight:600, color:"var(--dark)", fontSize:13, lineHeight:1.3 }}>{p.title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href={`/${locale}/#como`} onClick={() => setMobile(false)}
          style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px", borderRadius:12, background:"var(--bg2)", border:"1px solid var(--border-d)", textDecoration:"none", marginBottom:6 }}>
          <span style={{ fontWeight:700, color:"var(--dark)", fontSize:15 }}>{L.how[locale]}</span>
        </Link>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:20, marginTop:16 }}>
          <p style={{ fontSize:11, color:"var(--muted)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>
            {locale==="es"?"Idioma":locale==="en"?"Language":"Langue"}
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {LOCALES.map(loc => (
              <Link key={loc} href={`/${loc}/`} onClick={() => setMobile(false)}
                style={{ padding:"8px 16px", borderRadius:10, textDecoration:"none", fontFamily:"monospace", textTransform:"uppercase", fontWeight:800, fontSize:13,
                  color:loc===locale?"var(--rose)":"var(--muted2)",
                  background:loc===locale?"rgba(212,130,106,0.08)":"rgba(26,22,18,0.04)",
                  border:`1px solid ${loc===locale?"rgba(200,112,90,0.3)":"rgba(255,255,255,0.08)"}` }}>
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
