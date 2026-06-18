"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES, SERVICES, waLink, waMsg } from "@/lib/config";
import { t } from "@/lib/translations";

const L: Record<string, Record<Locale, string>> = {
  services: { es:"Servicios",en:"Services",fr:"Services",de:"Leistungen",it:"Servizi",pt:"Serviços" },
  countries:{ es:"Países",en:"Countries",fr:"Pays",de:"Länder",it:"Paesi",pt:"Países" },
  how:      { es:"Cómo funciona",en:"How it works",fr:"Comment ça marche",de:"Wie's funktioniert",it:"Come funziona",pt:"Como funciona" },
};

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

  // close mobile on navigate
  useEffect(() => { setMobile(false); setMSection(null); }, [locale]);
  // lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

  const PILL: React.CSSProperties = {
    background:"none", border:"none", cursor:"pointer",
    padding:"8px 14px", borderRadius:8, fontSize:14, fontWeight:600,
    color:"rgba(232,234,246,0.6)", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap",
  };

  const MEGA: React.CSSProperties = {
    position:"absolute", top:"calc(100%+12px)", left:0, zIndex:200,
    background:"rgba(5,7,18,0.97)", border:"1px solid rgba(0,229,204,0.15)",
    borderRadius:20, boxShadow:"0 32px 80px rgba(0,0,0,0.8)",
    backdropFilter:"blur(24px)", padding:24,
  };

  const DRAWER_SECTION = (key: string, label: string, children: React.ReactNode) => (
    <div style={{ marginBottom:6 }}>
      <button onClick={() => setMSection(mSection===key ? null : key)}
        style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"14px 16px", borderRadius:12, background:"rgba(255,255,255,0.04)",
          border:"1px solid rgba(255,255,255,0.07)", cursor:"pointer", color:"#fff", fontWeight:700, fontSize:15 }}>
        <span>{label}</span>
        <span style={{ color:"var(--teal)", fontSize:20, fontWeight:300,
          transform: mSection===key ? "rotate(45deg)" : "none", transition:"transform .2s", lineHeight:1 }}>+</span>
      </button>
      {mSection === key && (
        <div style={{ padding:"10px 0 6px 6px" }}>{children}</div>
      )}
    </div>
  );

  return (
    <>
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(4,6,15,0.96)",
        backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px", height:62,
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>

          {/* LOGO */}
          <Link href={`/${locale}/`} style={{ fontWeight:900, fontSize:20, letterSpacing:"-0.5px",
            textDecoration:"none", color:"#fff", flexShrink:0 }}>
            <span style={{ color:"var(--teal)" }}>Vixen</span>Agency
            <sup style={{ fontSize:8, color:"var(--teal)", opacity:.6, fontWeight:700, marginLeft:2 }}>PRO</sup>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hide-mobile" style={{ flex:1, alignItems:"center", gap:2, marginLeft:16 }}
            onMouseLeave={() => setDesktop(null)}>

            {/* Services */}
            <div style={{ position:"relative" }} onMouseEnter={() => setDesktop("sv")}>
              <button style={PILL}>{L.services[locale]} <span style={{ fontSize:9, opacity:.5 }}>▾</span></button>
              {desktop==="sv" && (
                <div style={{ ...MEGA, minWidth:620 }}>
                  <p className="lbl" style={{ marginBottom:16 }}>{t(locale,"nav_mega_services_title")}</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {services.map(s => (
                      <Link key={s.slug} href={`/${locale}/servicios/${s.slug}/`}
                        style={{ display:"flex", gap:12, padding:"12px 14px", borderRadius:12,
                          background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
                          textDecoration:"none", transition:"border-color .15s" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(0,229,204,0.3)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)")}>
                        <div style={{ width:38, height:38, borderRadius:10, background:"rgba(0,229,204,0.08)",
                          display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                          {s.icon}
                        </div>
                        <div>
                          <p style={{ fontWeight:700, color:"#fff", fontSize:13, marginBottom:2, lineHeight:1.3 }}>{s.title}</p>
                          <p style={{ color:"var(--muted)", fontSize:11, lineHeight:1.35 }}>{s.desc.slice(0,52)}…</p>
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
                <button style={PILL}>{L.countries[locale]} <span style={{ fontSize:9, opacity:.5 }}>▾</span></button>
                {desktop==="co" && (
                  <div style={{ ...MEGA, minWidth:340 }}>
                    <p className="lbl" style={{ marginBottom:14 }}>{t(locale,"nav_mega_countries_title")}</p>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                      {countries.map(ck => {
                        const c = COUNTRIES[ck];
                        return (
                          <Link key={ck} href={`/${locale}/${ck}/`}
                            style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10,
                              background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
                              textDecoration:"none", transition:"border-color .15s" }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(0,229,204,0.3)")}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)")}>
                            <span style={{ fontSize:22 }}>{c.flag}</span>
                            <div>
                              <p style={{ fontWeight:700, color:"#fff", fontSize:13 }}>{c.name}</p>
                              <p style={{ color:"var(--muted)", fontSize:11, marginTop:1 }}>{c.city}</p>
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
              <button style={PILL}>Blog <span style={{ fontSize:9, opacity:.5 }}>▾</span></button>
              {desktop==="blog" && (
                <div style={{ ...MEGA, minWidth:360 }}>
                  <p className="lbl" style={{ marginBottom:14 }}>
                    {locale==="es"?"Últimos artículos":locale==="en"?"Latest articles":locale==="fr"?"Derniers articles":locale==="de"?"Neueste Artikel":"Ultimi articoli"}
                  </p>
                  <div style={{ display:"grid", gap:6, marginBottom:12 }}>
                    {posts.slice(0,4).map(p => (
                      <Link key={p.slug} href={`/${locale}/blog/${p.slug}/`}
                        style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                          borderRadius:10, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
                          textDecoration:"none", transition:"border-color .15s" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(0,229,204,0.3)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)")}>
                        <div style={{ width:32, height:32, borderRadius:8, background:"rgba(0,229,204,0.08)",
                          display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>
                          ✍
                        </div>
                        <p style={{ fontWeight:600, color:"var(--text)", fontSize:13, lineHeight:1.3 }}>{p.title}</p>
                      </Link>
                    ))}
                  </div>
                  <Link href={`/${locale}/blog/`}
                    style={{ display:"block", textAlign:"center", padding:"10px", borderRadius:10,
                      border:"1px solid rgba(0,229,204,0.25)", color:"var(--teal)", fontSize:13, fontWeight:700,
                      textDecoration:"none" }}>
                    {locale==="es"?"Ver todos los artículos →":locale==="en"?"View all →":locale==="fr"?"Voir tout →":locale==="de"?"Alle →":"Vedi tutti →"}
                  </Link>
                </div>
              )}
            </div>

            <Link href={`/${locale}/#como`}
              style={{ ...PILL, textDecoration:"none" }}>{L.how[locale]}</Link>
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hide-mobile" style={{ alignItems:"center", gap:6, flexShrink:0 }}>
            <div style={{ display:"flex", gap:2, marginRight:6 }}>
              {LOCALES.map(loc => (
                <Link key={loc} href={`/${loc}/`}
                  style={{ fontSize:10, padding:"3px 7px", borderRadius:6, textDecoration:"none",
                    fontFamily:"monospace", textTransform:"uppercase", fontWeight:800,
                    color: loc===locale ? "var(--teal)" : "rgba(232,234,246,0.25)",
                    background: loc===locale ? "rgba(0,229,204,0.1)" : "transparent",
                    border:`1px solid ${loc===locale ? "rgba(0,229,204,0.3)" : "transparent"}` }}>
                  {loc}
                </Link>
              ))}
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="btn btn-cta" style={{ padding:"10px 22px", fontSize:13 }}>
              {locale==="es"?"Aplicar gratis":locale==="en"?"Apply free":locale==="fr"?"Postuler":locale==="de"?"Bewerben":"Candidati"}
            </a>
          </div>

          {/* HAMBURGER */}
          <button className="show-mobile" onClick={() => setMobile(!mobile)}
            aria-label="Menu" aria-expanded={mobile}
            style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:10, padding:"10px 12px", cursor:"pointer", flexDirection:"column",
              gap:5, alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:22, height:2, background:"var(--text)", borderRadius:1,
                transition:"all .25s cubic-bezier(.4,0,.2,1)",
                transform: mobile ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"none") : "none",
                opacity: mobile && i===1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ─────────────────────────────────────── */}
      <div style={{ position:"fixed", top:62, left:0, right:0, bottom:0,
        background:"rgba(4,6,15,0.99)", backdropFilter:"blur(20px)",
        zIndex:99, overflowY:"auto", padding:"20px 20px 40px",
        transform: mobile ? "translateX(0)" : "translateX(-100%)",
        transition:"transform .3s cubic-bezier(.4,0,.2,1)",
        borderTop:"1px solid rgba(255,255,255,0.06)" }}>

        {/* Apply CTA */}
        <a href={href} target="_blank" rel="noopener noreferrer"
          onClick={() => setMobile(false)}
          className="btn btn-cta"
          style={{ display:"flex", justifyContent:"center", width:"100%", padding:"16px", fontSize:16, marginBottom:20, borderRadius:14 }}>
          {locale==="es"?"Solicitar análisis gratuito":locale==="en"?"Request free analysis":locale==="fr"?"Analyse gratuite":locale==="de"?"Kostenlose Analyse":"Analisi gratuita"}
        </a>

        {/* Services accordion */}
        {DRAWER_SECTION("sv", `${L.services[locale]}`,
          <div style={{ display:"grid", gap:6 }}>
            {services.map(s => (
              <Link key={s.slug} href={`/${locale}/servicios/${s.slug}/`}
                onClick={() => setMobile(false)}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:12,
                  background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", textDecoration:"none" }}>
                <div style={{ width:36, height:36, borderRadius:9, background:"rgba(0,229,204,0.08)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>
                  {s.icon}
                </div>
                <div>
                  <p style={{ fontWeight:700, color:"#fff", fontSize:14 }}>{s.kw}</p>
                  <p style={{ color:"var(--muted)", fontSize:12, marginTop:2 }}>{s.headline.slice(0,42)}…</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Countries accordion */}
        {countries.length > 1 && DRAWER_SECTION("co", L.countries[locale],
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
            {countries.map(ck => {
              const c = COUNTRIES[ck];
              return (
                <Link key={ck} href={`/${locale}/${ck}/`}
                  onClick={() => setMobile(false)}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:10,
                    background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", textDecoration:"none" }}>
                  <span style={{ fontSize:20 }}>{c.flag}</span>
                  <div>
                    <p style={{ fontWeight:700, color:"#fff", fontSize:13 }}>{c.name}</p>
                    <p style={{ color:"var(--muted)", fontSize:11 }}>{c.city}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Blog accordion */}
        {DRAWER_SECTION("blog", "Blog",
          <div style={{ display:"grid", gap:6 }}>
            {posts.slice(0,5).map(p => (
              <Link key={p.slug} href={`/${locale}/blog/${p.slug}/`}
                onClick={() => setMobile(false)}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:10,
                  background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", textDecoration:"none" }}>
                <div style={{ width:32, height:32, borderRadius:8, background:"rgba(0,229,204,0.08)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>✍</div>
                <p style={{ fontWeight:600, color:"var(--text)", fontSize:13, lineHeight:1.35 }}>{p.title}</p>
              </Link>
            ))}
            <Link href={`/${locale}/blog/`} onClick={() => setMobile(false)}
              style={{ display:"block", textAlign:"center", padding:"12px", borderRadius:10,
                border:"1px solid rgba(0,229,204,0.2)", color:"var(--teal)", fontSize:14, fontWeight:700, textDecoration:"none" }}>
              {locale==="es"?"Ver todos →":locale==="en"?"View all →":locale==="fr"?"Voir tout →":locale==="de"?"Alle →":"Vedi tutti →"}
            </Link>
          </div>
        )}

        {/* How link */}
        <Link href={`/${locale}/#como`} onClick={() => setMobile(false)}
          style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px", borderRadius:12,
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", textDecoration:"none", marginBottom:6 }}>
          <span style={{ fontSize:18 }}>⚡</span>
          <span style={{ fontWeight:700, color:"#fff", fontSize:15 }}>{L.how[locale]}</span>
        </Link>

        {/* Language */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:20, marginTop:20 }}>
          <p className="lbl">{locale==="es"?"Idioma":locale==="en"?"Language":locale==="fr"?"Langue":locale==="de"?"Sprache":"Lingua"}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:10 }}>
            {LOCALES.map(loc => (
              <Link key={loc} href={`/${loc}/`} onClick={() => setMobile(false)}
                style={{ padding:"9px 18px", borderRadius:10, textDecoration:"none",
                  fontFamily:"monospace", textTransform:"uppercase", fontWeight:800, fontSize:13,
                  color: loc===locale ? "var(--teal)" : "rgba(232,234,246,0.4)",
                  background: loc===locale ? "rgba(0,229,204,0.1)" : "rgba(255,255,255,0.04)",
                  border:`1px solid ${loc===locale ? "rgba(0,229,204,0.3)" : "rgba(255,255,255,0.07)"}` }}>
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
