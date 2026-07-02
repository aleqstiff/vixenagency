"use client";
import { useState, useEffect } from "react";
import { type Locale, waLink } from "@/lib/config";
import { t } from "@/lib/translations";

export default function Popup({ locale, href }: { locale: Locale; href: string }) {
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (gone) return;
    const timer = setTimeout(() => setShow(true), 9000);
    const onScroll = () => { if (window.scrollY > window.innerHeight * 0.6 && !gone) setShow(true); };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [gone]);

  const dismiss = () => { setShow(false); setGone(true); };

  return (
    <>
      {/* Sticky WA button always visible */}
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="pulse"
        style={{ position:"fixed",bottom:24,right:24,zIndex:49,width:56,height:56,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",textDecoration:"none",fontSize:26 }}>
        💬
      </a>

      {/* Popup overlay */}
      {show && !gone && (
        <div style={{ position:"fixed",inset:0,zIndex:60,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"0 16px 24px",background:"rgba(0,0,0,0.55)" }}
          onClick={dismiss}>
          <div className="fade-up" style={{ width:"100%",maxWidth:420,padding:28,position:"relative",background:"linear-gradient(135deg,var(--dark),#2a1a26)",borderRadius:22,border:"1px solid rgba(217,133,176,0.25)",boxShadow:"0 24px 70px rgba(0,0,0,0.45)" }}
            onClick={e => e.stopPropagation()}>
            <button onClick={dismiss} style={{ position:"absolute",top:12,right:16,background:"none",border:"none",color:"rgba(232,240,248,0.4)",fontSize:20,cursor:"pointer" }}>✕</button>
            <div style={{ fontSize:40,marginBottom:12 }}>💰</div>
            <h3 style={{ fontWeight:900,color:"#fff",fontSize:20,marginBottom:8 }}>{t(locale,"popup_title")}</h3>
            <p style={{ color:"var(--muted)",fontSize:14,marginBottom:20 }}>{t(locale,"popup_desc")}</p>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary"
              style={{ display:"flex",justifyContent:"center",padding:"14px",width:"100%",fontSize:15,marginBottom:10 }}>
              <span>💬</span> {t(locale,"popup_cta")}
            </a>
            <button onClick={dismiss} style={{ display:"block",width:"100%",background:"none",border:"none",cursor:"pointer",color:"rgba(232,240,248,0.25)",fontSize:12,paddingTop:4 }}>
              {t(locale,"popup_close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
