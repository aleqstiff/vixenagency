"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { LOCALES, LANG, type Locale, COUNTRIES, LOCALE_COUNTRIES, SERVICES, waLink, waMsg } from "@/lib/config";
import { t } from "@/lib/translations";

interface NavProps { locale: Locale; recentSlugs?: {slug:string;title:string;locale:Locale}[] }

export default function MegaNav({ locale, recentSlugs = [] }: NavProps) {
  const [open, setOpen] = useState<string|null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const href = waLink(waMsg(locale));
  const countries = LOCALE_COUNTRIES[locale] ?? [];
  const services = SERVICES[locale] ?? [];

  const enter = (k: string) => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(k); };
  const leave = () => { timerRef.current = setTimeout(() => setOpen(null), 120); };

  const COL: React.CSSProperties = { position:"relative" };
  const MENU: React.CSSProperties = {
    position:"absolute", top:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)",
    background:"rgba(6,13,28,0.98)", border:"1px solid rgba(0,229,212,0.15)",
    borderRadius:20, boxShadow:"0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,212,0.05)",
    backdropFilter:"blur(24px)", zIndex:100, padding:24,
    animation:"fadeUp .15s ease forwards",
  };
  const NAV_LINK: React.CSSProperties = {
    background:"none", border:"none", cursor:"pointer",
    padding:"8px 14px", borderRadius:8, color:"var(--muted)",
    fontSize:14, fontWeight:600, display:"flex", alignItems:"center",
    gap:5, whiteSpace:"nowrap", transition:"color .15s",
  };

  return (
    <nav style={{ position:"sticky",top:0,zIndex:50,background:"rgba(3,7,16,0.94)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,229,212,0.07)" }}>
      {/* Top bar */}
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",height:64,gap:8 }}>

        {/* Logo */}
        <Link href={`/${locale}/`} style={{ fontWeight:900,fontSize:22,letterSpacing:"-0.6px",textDecoration:"none",color:"#fff",flexShrink:0,marginRight:16 }}>
          <span style={{ color:"var(--teal)" }}>Vixen</span><span style={{ opacity:.85 }}>Agency</span>
          <span style={{ fontSize:9,fontWeight:700,color:"var(--teal)",verticalAlign:"super",marginLeft:3,opacity:.7,letterSpacing:"0.06em" }}>PRO</span>
        </Link>

        {/* Nav items */}
        <div style={{ display:"flex",alignItems:"center",flex:1,gap:2 }} onMouseLeave={leave}>

          {/* ── SERVICIOS ── */}
          <div style={COL} onMouseEnter={() => enter("sv")}>
            <button style={NAV_LINK} className={open==="sv"?"active-nav":""}>
              {t(locale,"nav_services")} <span style={{ fontSize:9,opacity:.6 }}>▾</span>
            </button>
            {open==="sv" && (
              <div style={{ ...MENU, left:0, transform:"none", minWidth:640 }}>
                <p className="section-label" style={{ marginBottom:16 }}>{t(locale,"nav_mega_services_title")}</p>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  {services.map(s => (
                    <Link key={s.slug} href={`/${locale}/servicios/${s.slug}/`}
                      style={{ display:"flex",gap:12,padding:"10px 14px",borderRadius:12,background:"var(--glass)",border:"1px solid var(--border)",textDecoration:"none",transition:"border-color .15s,background .15s" }}
                      onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor="var(--border2)"; (e.currentTarget as HTMLElement).style.background="var(--glass2)"; }}
                      onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.background="var(--glass)"; }}>
                      <span style={{ fontSize:20,flexShrink:0,marginTop:1 }}>{s.icon}</span>
                      <div>
                        <p style={{ fontWeight:700,color:"#fff",fontSize:13,lineHeight:1.3,marginBottom:2 }}>{s.title}</p>
                        <p style={{ color:"var(--muted)",fontSize:11,lineHeight:1.35 }}>{s.desc.slice(0,55)}…</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── PAÍSES ── */}
          {countries.length > 1 && (
            <div style={COL} onMouseEnter={() => enter("countries")}>
              <button style={NAV_LINK}>{t(locale,"nav_countries")} <span style={{ fontSize:9,opacity:.6 }}>▾</span></button>
              {open==="countries" && (
                <div style={{ ...MENU, left:0, transform:"none", minWidth:360 }}>
                  <p className="section-label" style={{ marginBottom:16 }}>{t(locale,"nav_mega_countries_title")}</p>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
                    {countries.map(ck => {
                      const c = COUNTRIES[ck];
                      return (
                        <Link key={ck} href={`/${locale}/${ck}/`}
                          style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:"var(--glass)",border:"1px solid var(--border)",textDecoration:"none",transition:"border-color .15s" }}
                          onMouseEnter={e=>((e.currentTarget as HTMLElement).style.borderColor="var(--border2)")}
                          onMouseLeave={e=>((e.currentTarget as HTMLElement).style.borderColor="var(--border)")}>
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

          {/* ── BLOG ── */}
          <div style={COL} onMouseEnter={() => enter("blog")}>
            <button style={NAV_LINK}>{t(locale,"nav_blog")} <span style={{ fontSize:9,opacity:.6 }}>▾</span></button>
            {open==="blog" && (
              <div style={{ ...MENU, left:0, transform:"none", minWidth:420 }}>
                <p className="section-label" style={{ marginBottom:16 }}>Últimos artículos</p>
                <div style={{ display:"grid",gap:8,marginBottom:14 }}>
                  {recentSlugs.slice(0,4).map(p => (
                    <Link key={p.slug} href={`/${locale}/blog/${p.slug}/`}
                      style={{ display:"flex",gap:10,padding:"10px 14px",borderRadius:10,background:"var(--glass)",border:"1px solid var(--border)",textDecoration:"none",transition:"border-color .15s" }}
                      onMouseEnter={e=>((e.currentTarget as HTMLElement).style.borderColor="var(--border2)")}
                      onMouseLeave={e=>((e.currentTarget as HTMLElement).style.borderColor="var(--border)")}>
                      <span style={{ fontSize:18,flexShrink:0 }}>📝</span>
                      <p style={{ fontWeight:600,color:"var(--text)",fontSize:13,lineHeight:1.35 }}>{p.title}</p>
                    </Link>
                  ))}
                </div>
                <Link href={`/${locale}/blog/`}
                  style={{ display:"block",textAlign:"center",padding:"10px",borderRadius:10,border:"1px solid var(--border2)",color:"var(--teal)",fontSize:13,fontWeight:700,textDecoration:"none" }}>
                  Ver todos los artículos →
                </Link>
              </div>
            )}
          </div>

          {/* ── SOBRE NOSOTRAS ── */}
          <Link href={`/${locale}/#como`}
            style={{ ...NAV_LINK, textDecoration:"none" }}>
            {locale==="es"?"Cómo funciona":locale==="en"?"How it works":locale==="fr"?"Comment ça marche":locale==="de"?"So funktioniert's":locale==="it"?"Come funziona":"Como funciona"}
          </Link>
        </div>

        {/* Right: lang + CTA */}
        <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
          <div style={{ display:"flex",gap:2,marginRight:4 }}>
            {LOCALES.map(loc => (
              <Link key={loc} href={`/${loc}/`}
                style={{ fontSize:10,padding:"4px 7px",borderRadius:6,textDecoration:"none",fontFamily:"monospace",textTransform:"uppercase",fontWeight:800,letterSpacing:"0.05em",
                  color: loc===locale ? "var(--teal)" : "var(--muted2)",
                  background: loc===locale ? "rgba(0,229,212,0.1)" : "transparent",
                  border: `1px solid ${loc===locale ? "rgba(0,229,212,0.3)" : "transparent"}` }}>
                {loc}
              </Link>
            ))}
          </div>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            <span style={{ fontSize:16 }}>💬</span> {t(locale,"nav_apply")}
          </a>
        </div>
      </div>
    </nav>
  );
}
