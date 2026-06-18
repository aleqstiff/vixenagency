"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES, SERVICES, waLink, waMsg } from "@/lib/config";
import { t } from "@/lib/translations";

export default function MegaNav({ locale, recentSlugs = [] }: {
  locale: Locale;
  recentSlugs?: { slug: string; title: string; locale: Locale }[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const href = waLink(waMsg(locale));
  const countries = LOCALE_COUNTRIES[locale] ?? [];
  const services = SERVICES[locale] ?? [];

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); setMobileSection(null); }, []);

  const enter = (k: string) => { if (timer.current) clearTimeout(timer.current); setOpen(k); };
  const leave = () => { timer.current = setTimeout(() => setOpen(null), 150); };

  const navLabel: Record<string, Record<Locale, string>> = {
    services: { es:"Servicios", en:"Services", fr:"Services", de:"Leistungen", it:"Servizi", pt:"Serviços" },
    countries: { es:"Países", en:"Countries", fr:"Pays", de:"Länder", it:"Paesi", pt:"Países" },
    blog:     { es:"Blog", en:"Blog", fr:"Blog", de:"Blog", it:"Blog", pt:"Blog" },
    how:      { es:"Cómo funciona", en:"How it works", fr:"Comment ça marche", de:"So funktioniert's", it:"Come funziona", pt:"Como funciona" },
  };

  const MENU_BASE: React.CSSProperties = {
    position: "absolute", top: "calc(100% + 10px)",
    background: "rgba(4,10,22,0.98)", border: "1px solid rgba(0,229,212,0.15)",
    borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,0.75)",
    backdropFilter: "blur(24px)", zIndex: 100, padding: 24,
  };

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(3,7,16,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,229,212,0.07)"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 60, gap: 8 }}>

          {/* Logo */}
          <Link href={`/${locale}/`} style={{ fontWeight: 900, fontSize: 21, letterSpacing: "-0.6px", textDecoration: "none", color: "#fff", flexShrink: 0, marginRight: 12 }}>
            <span style={{ color: "var(--teal)" }}>Vixen</span><span>Agency</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }} onMouseLeave={leave}>

            {/* Services */}
            <div style={{ position: "relative" }} onMouseEnter={() => enter("sv")}>
              <button style={{ background:"none",border:"none",cursor:"pointer",padding:"8px 13px",borderRadius:8,color:"rgba(226,234,248,0.65)",fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:5 }}>
                {navLabel.services[locale]} <span style={{ fontSize:9,opacity:.5 }}>▾</span>
              </button>
              {open === "sv" && (
                <div style={{ ...MENU_BASE, left: 0, minWidth: 600 }}>
                  <p style={{ fontSize:11,color:"var(--teal)",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:16 }}>
                    {t(locale,"nav_mega_services_title")}
                  </p>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                    {services.map(s => (
                      <Link key={s.slug} href={`/${locale}/servicios/${s.slug}/`}
                        onClick={() => setOpen(null)}
                        style={{ display:"flex",gap:12,padding:"10px 14px",borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.1)",textDecoration:"none" }}>
                        <span style={{ fontSize:20,flexShrink:0 }}>{s.icon}</span>
                        <div>
                          <p style={{ fontWeight:700,color:"#fff",fontSize:13,marginBottom:2 }}>{s.title}</p>
                          <p style={{ color:"var(--muted)",fontSize:11 }}>{s.desc.slice(0,55)}…</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Countries */}
            {countries.length > 1 && (
              <div style={{ position:"relative" }} onMouseEnter={() => enter("co")}>
                <button style={{ background:"none",border:"none",cursor:"pointer",padding:"8px 13px",borderRadius:8,color:"rgba(226,234,248,0.65)",fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:5 }}>
                  {navLabel.countries[locale]} <span style={{ fontSize:9,opacity:.5 }}>▾</span>
                </button>
                {open === "co" && (
                  <div style={{ ...MENU_BASE, left: 0, minWidth: 340 }}>
                    <p style={{ fontSize:11,color:"var(--teal)",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:14 }}>
                      {t(locale,"nav_mega_countries_title")}
                    </p>
                    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
                      {countries.map(ck => {
                        const c = COUNTRIES[ck];
                        return (
                          <Link key={ck} href={`/${locale}/${ck}/`} onClick={() => setOpen(null)}
                            style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.1)",textDecoration:"none" }}>
                            <span style={{ fontSize:20 }}>{c.flag}</span>
                            <div>
                              <p style={{ fontWeight:700,color:"#fff",fontSize:13 }}>{c.name}</p>
                              <p style={{ color:"var(--muted)",fontSize:11 }}>{c.city}</p>
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
            <div style={{ position:"relative" }} onMouseEnter={() => enter("blog")}>
              <button style={{ background:"none",border:"none",cursor:"pointer",padding:"8px 13px",borderRadius:8,color:"rgba(226,234,248,0.65)",fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:5 }}>
                Blog <span style={{ fontSize:9,opacity:.5 }}>▾</span>
              </button>
              {open === "blog" && (
                <div style={{ ...MENU_BASE, left: 0, minWidth: 380 }}>
                  <p style={{ fontSize:11,color:"var(--teal)",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:14 }}>
                    {locale==="es"?"Últimos artículos":locale==="en"?"Latest articles":locale==="fr"?"Derniers articles":locale==="de"?"Neueste Artikel":"Ultimi articoli"}
                  </p>
                  <div style={{ display:"grid",gap:6,marginBottom:12 }}>
                    {recentSlugs.slice(0,4).map(p => (
                      <Link key={p.slug} href={`/${locale}/blog/${p.slug}/`} onClick={() => setOpen(null)}
                        style={{ display:"flex",gap:10,padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.1)",textDecoration:"none" }}>
                        <span style={{ fontSize:16,flexShrink:0 }}>📝</span>
                        <p style={{ fontWeight:600,color:"var(--text)",fontSize:13,lineHeight:1.35 }}>{p.title}</p>
                      </Link>
                    ))}
                  </div>
                  <Link href={`/${locale}/blog/`} onClick={() => setOpen(null)}
                    style={{ display:"block",textAlign:"center",padding:"10px",borderRadius:10,border:"1px solid rgba(0,229,212,0.22)",color:"var(--teal)",fontSize:13,fontWeight:700,textDecoration:"none" }}>
                    {locale==="es"?"Ver todos →":locale==="en"?"View all →":locale==="fr"?"Voir tout →":locale==="de"?"Alle ansehen →":"Vedi tutti →"}
                  </Link>
                </div>
              )}
            </div>

            <Link href={`/${locale}/#como`}
              style={{ padding:"8px 13px",borderRadius:8,color:"rgba(226,234,248,0.65)",fontSize:14,fontWeight:600,textDecoration:"none" }}>
              {navLabel.how[locale]}
            </Link>
          </div>

          {/* Right: lang switcher + CTA (desktop) */}
          <div className="desktop-right" style={{ display:"flex",alignItems:"center",gap:6,flexShrink:0 }}>
            <div style={{ display:"flex",gap:2,marginRight:4 }}>
              {LOCALES.map(loc => (
                <Link key={loc} href={`/${loc}/`}
                  style={{ fontSize:10,padding:"3px 6px",borderRadius:5,textDecoration:"none",fontFamily:"monospace",textTransform:"uppercase",fontWeight:800,
                    color: loc===locale?"var(--teal)":"rgba(226,234,248,0.25)",
                    background: loc===locale?"rgba(0,229,212,0.1)":"transparent",
                    border:`1px solid ${loc===locale?"rgba(0,229,212,0.3)":"transparent"}` }}>
                  {loc}
                </Link>
              ))}
            </div>
            <a href={href} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"9px 18px",borderRadius:10,background:"linear-gradient(135deg,var(--teal),#0284c7)",color:"#020b18",fontWeight:800,fontSize:13,textDecoration:"none",flexShrink:0 }}>
              <span style={{ fontSize:16 }}>💬</span> {t(locale,"nav_apply")}
            </a>
          </div>

          {/* HAMBURGER (mobile only) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hamburger"
            aria-label="Menu"
            style={{ display:"none",background:"none",border:"1px solid rgba(0,229,212,0.25)",borderRadius:8,padding:"7px 10px",cursor:"pointer",flexShrink:0,flexDirection:"column",gap:4,alignItems:"center",justifyContent:"center" }}>
            <span style={{ display:"block",width:20,height:2,background:mobileOpen?"var(--teal)":"rgba(226,234,248,0.7)",borderRadius:1,transition:"all .2s",transform:mobileOpen?"rotate(45deg) translate(3px,3px)":"none" }} />
            <span style={{ display:"block",width:20,height:2,background:mobileOpen?"transparent":"rgba(226,234,248,0.7)",borderRadius:1,transition:"all .2s" }} />
            <span style={{ display:"block",width:20,height:2,background:mobileOpen?"var(--teal)":"rgba(226,234,248,0.7)",borderRadius:1,transition:"all .2s",transform:mobileOpen?"rotate(-45deg) translate(3px,-3px)":"none" }} />
          </button>
        </div>

        {/* ── MOBILE DRAWER ──────────────────────────────────────────────── */}
        {mobileOpen && (
          <div style={{ position:"fixed",top:60,left:0,right:0,bottom:0,zIndex:49,overflow:"auto",
            background:"rgba(3,7,16,0.98)", backdropFilter:"blur(20px)",
            borderTop:"1px solid rgba(0,229,212,0.1)" }}>
            <div style={{ padding:"20px 20px 40px" }}>

              {/* WA CTA */}
              <a href={href} target="_blank" rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:"16px",borderRadius:14,background:"linear-gradient(135deg,var(--teal),#0284c7)",color:"#020b18",fontWeight:800,fontSize:16,textDecoration:"none",marginBottom:24 }}>
                <span style={{ fontSize:22 }}>💬</span> {t(locale,"nav_apply")}
              </a>

              {/* Section: Servicios */}
              <div style={{ marginBottom:6 }}>
                <button
                  onClick={() => setMobileSection(mobileSection==="sv" ? null : "sv")}
                  style={{ width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.1)",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:15 }}>
                  <span>🛠️ {navLabel.services[locale]}</span>
                  <span style={{ color:"var(--teal)",fontSize:20,transition:"transform .2s",transform:mobileSection==="sv"?"rotate(45deg)":"none" }}>+</span>
                </button>
                {mobileSection === "sv" && (
                  <div style={{ padding:"10px 0 0 8px",display:"grid",gap:6 }}>
                    {services.map(s => (
                      <Link key={s.slug} href={`/${locale}/servicios/${s.slug}/`}
                        onClick={() => setMobileOpen(false)}
                        style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.08)",textDecoration:"none" }}>
                        <span style={{ fontSize:20 }}>{s.icon}</span>
                        <div>
                          <p style={{ fontWeight:700,color:"#fff",fontSize:14 }}>{s.kw}</p>
                          <p style={{ color:"var(--muted)",fontSize:11,marginTop:2 }}>{s.headline.slice(0,48)}…</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Section: Países */}
              {countries.length > 1 && (
                <div style={{ marginBottom:6 }}>
                  <button
                    onClick={() => setMobileSection(mobileSection==="co" ? null : "co")}
                    style={{ width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.1)",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:15 }}>
                    <span>🌍 {navLabel.countries[locale]}</span>
                    <span style={{ color:"var(--teal)",fontSize:20,transition:"transform .2s",transform:mobileSection==="co"?"rotate(45deg)":"none" }}>+</span>
                  </button>
                  {mobileSection === "co" && (
                    <div style={{ padding:"10px 0 0 8px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
                      {countries.map(ck => {
                        const c = COUNTRIES[ck];
                        return (
                          <Link key={ck} href={`/${locale}/${ck}/`}
                            onClick={() => setMobileOpen(false)}
                            style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.08)",textDecoration:"none" }}>
                            <span style={{ fontSize:18 }}>{c.flag}</span>
                            <div>
                              <p style={{ fontWeight:700,color:"#fff",fontSize:13 }}>{c.name}</p>
                              <p style={{ color:"var(--muted)",fontSize:10 }}>{c.city}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Section: Blog */}
              <div style={{ marginBottom:6 }}>
                <button
                  onClick={() => setMobileSection(mobileSection==="blog" ? null : "blog")}
                  style={{ width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.1)",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:15 }}>
                  <span>📝 Blog</span>
                  <span style={{ color:"var(--teal)",fontSize:20,transition:"transform .2s",transform:mobileSection==="blog"?"rotate(45deg)":"none" }}>+</span>
                </button>
                {mobileSection === "blog" && (
                  <div style={{ padding:"10px 0 0 8px",display:"grid",gap:6 }}>
                    {recentSlugs.slice(0,5).map(p => (
                      <Link key={p.slug} href={`/${locale}/blog/${p.slug}/`}
                        onClick={() => setMobileOpen(false)}
                        style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.08)",textDecoration:"none" }}>
                        <span style={{ fontSize:16 }}>📝</span>
                        <p style={{ fontWeight:600,color:"var(--text)",fontSize:13,lineHeight:1.3 }}>{p.title}</p>
                      </Link>
                    ))}
                    <Link href={`/${locale}/blog/`} onClick={() => setMobileOpen(false)}
                      style={{ display:"block",textAlign:"center",padding:"12px",borderRadius:10,border:"1px solid rgba(0,229,212,0.22)",color:"var(--teal)",fontWeight:700,fontSize:14,textDecoration:"none" }}>
                      {locale==="es"?"Ver todos los artículos →":locale==="en"?"View all articles →":locale==="fr"?"Voir tous les articles →":locale==="de"?"Alle Artikel →":"Tutti gli articoli →"}
                    </Link>
                  </div>
                )}
              </div>

              {/* How it works link */}
              <Link href={`/${locale}/#como`} onClick={() => setMobileOpen(false)}
                style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,229,212,0.1)",textDecoration:"none",marginBottom:6 }}>
                <span style={{ fontSize:20 }}>⚡</span>
                <span style={{ fontWeight:700,color:"#fff",fontSize:15 }}>{navLabel.how[locale]}</span>
              </Link>

              {/* Language switcher */}
              <div style={{ marginTop:24,paddingTop:20,borderTop:"1px solid rgba(0,229,212,0.08)" }}>
                <p style={{ fontSize:11,color:"var(--muted2)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12 }}>
                  {locale==="es"?"Idiomas":locale==="en"?"Languages":locale==="fr"?"Langues":locale==="de"?"Sprachen":"Lingue"}
                </p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                  {LOCALES.map(loc => (
                    <Link key={loc} href={`/${loc}/`} onClick={() => setMobileOpen(false)}
                      style={{ padding:"8px 16px",borderRadius:8,textDecoration:"none",fontFamily:"monospace",textTransform:"uppercase",fontWeight:800,fontSize:12,
                        color: loc===locale?"var(--teal)":"rgba(226,234,248,0.4)",
                        background: loc===locale?"rgba(0,229,212,0.1)":"rgba(255,255,255,0.03)",
                        border:`1px solid ${loc===locale?"rgba(0,229,212,0.3)":"rgba(255,255,255,0.06)"}` }}>
                      {loc}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-right { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
