"use client";
import { useState, useEffect, useRef } from "react";

// ── Unlock section with scroll reveal ──────────────────────────────────────
export function UnlockSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const texts = {
    es: ["MULTIPLICA", "TU", "POTENCIAL"],
    en: ["UNLOCK", "YOUR", "POTENTIAL"],
    fr: ["LIBÈRE", "TON", "POTENTIEL"],
    de: ["ENTFALTE", "DEIN", "POTENZIAL"],
    it: ["LIBERA", "IL TUO", "POTENZIALE"],
    pt: ["LIBERA", "SEU", "POTENCIAL"],
  } as Record<string, string[]>;

  const words = texts[locale] ?? texts.es;
  const imgs = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=face&q=80",
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=120&h=120&fit=crop&crop=top&q=80",
    "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=120&h=120&fit=crop&crop=face&q=80",
  ];

  return (
    <div ref={ref} style={{ padding:"80px 0", overflow:"hidden", userSelect:"none" }}>
      {words.map((word, i) => (
        <div key={i} className="unlock-row" style={{
          justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
          paddingLeft: i % 2 === 0 ? "4vw" : "0",
          paddingRight: i % 2 !== 0 ? "4vw" : "0",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: `opacity .7s ease ${i * 0.15}s, transform .7s ease ${i * 0.15}s`,
        }}>
          {i % 2 === 0 && (
            <img src={imgs[i % imgs.length]} alt="" className="unlock-img"
              style={{ opacity: visible ? 1 : 0, transition: `opacity .5s ease ${i * 0.2 + 0.3}s` }} />
          )}
          <span className="unlock-text g-white">{word}</span>
          {i % 2 !== 0 && (
            <img src={imgs[(i + 1) % imgs.length]} alt="" className="unlock-img"
              style={{ opacity: visible ? 1 : 0, transition: `opacity .5s ease ${i * 0.2 + 0.3}s` }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Application form with Netlify ──────────────────────────────────────────
export function ApplyForm({ locale, href }: { locale: string; href: string }) {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");
  const [data, setData] = useState({ name:"", instagram:"", monthly:"", goal:"", country:"", email:"" });

  const L = {
    es: { title:"¿Lista para multiplicar tus ingresos?", sub:"Cuéntanos sobre tu cuenta y te hacemos un análisis gratuito en 24 horas.", name:"Tu nombre", ig:"Instagram / TikTok", monthly:"Ingresos actuales en OnlyFans", goal:"¿Cuál es tu objetivo?", country:"País", email:"Email (opcional)", submit:"Solicitar análisis gratuito", ok:"¡Recibido! Te contactamos en menos de 24h 🎉", err:"Error al enviar. Escríbenos por WhatsApp.", goals:["Empezar desde cero","Aumentar ingresos actuales","Escalar a +5.000€/mes","Máximo anonimato"], note:"Sin compromiso · Sin cuota inicial · Respuesta en 24h" },
    en: { title:"Ready to multiply your income?", sub:"Tell us about your account and we'll give you a free analysis in 24 hours.", name:"Your name", ig:"Instagram / TikTok", monthly:"Current OnlyFans income", goal:"What's your goal?", country:"Country", email:"Email (optional)", submit:"Request free analysis", ok:"Received! We'll contact you within 24h 🎉", err:"Error. Please message us on WhatsApp.", goals:["Start from scratch","Increase current income","Scale to $5,000+/month","Full anonymity"], note:"No commitment · No upfront fee · Reply in 24h" },
    fr: { title:"Prête à multiplier tes revenus ?", sub:"Parle-nous de ton compte et nous te ferons une analyse gratuite en 24h.", name:"Ton prénom", ig:"Instagram / TikTok", monthly:"Revenus actuels sur OnlyFans", goal:"Quel est ton objectif ?", country:"Pays", email:"Email (optionnel)", submit:"Demander une analyse gratuite", ok:"Reçu ! On te contacte sous 24h 🎉", err:"Erreur. Écris-nous sur WhatsApp.", goals:["Commencer de zéro","Augmenter mes revenus","Scaler à +5.000€/mois","Anonymat total"], note:"Sans engagement · Sans frais initiaux · Réponse sous 24h" },
    de: { title:"Bereit dein Einkommen zu multiplizieren?", sub:"Erzähl uns von deinem Account und wir geben dir eine kostenlose Analyse in 24h.", name:"Dein Name", ig:"Instagram / TikTok", monthly:"Aktuelle OnlyFans-Einnahmen", goal:"Was ist dein Ziel?", country:"Land", email:"E-Mail (optional)", submit:"Kostenlose Analyse anfordern", ok:"Erhalten! Wir melden uns innerhalb von 24h 🎉", err:"Fehler. Schreib uns auf WhatsApp.", goals:["Von Null starten","Aktuelle Einnahmen steigern","Auf 5.000€+/Monat skalieren","Vollständige Anonymität"], note:"Unverbindlich · Keine Vorauszahlung · Antwort in 24h" },
    it: { title:"Pronta a moltiplicare i tuoi guadagni?", sub:"Raccontaci del tuo account e ti faremo un'analisi gratuita in 24 ore.", name:"Il tuo nome", ig:"Instagram / TikTok", monthly:"Guadagni attuali su OnlyFans", goal:"Qual è il tuo obiettivo?", country:"Paese", email:"Email (facoltativa)", submit:"Richiedi analisi gratuita", ok:"Ricevuto! Ti contatteremo entro 24h 🎉", err:"Errore. Scrivici su WhatsApp.", goals:["Iniziare da zero","Aumentare i guadagni","Scalare a 5.000€+/mese","Anonimato totale"], note:"Senza impegno · Senza costi iniziali · Risposta in 24h" },
    pt: { title:"Pronta para multiplicar seus ganhos?", sub:"Conta-nos sobre sua conta e faremos uma análise gratuita em 24 horas.", name:"Seu nome", ig:"Instagram / TikTok", monthly:"Ganhos atuais no OnlyFans", goal:"Qual é o seu objetivo?", country:"País", email:"Email (opcional)", submit:"Solicitar análise gratuita", ok:"Recebido! Entraremos em contato em 24h 🎉", err:"Erro. Escreva-nos pelo WhatsApp.", goals:["Começar do zero","Aumentar ganhos atuais","Escalar para +5.000€/mês","Anonimato total"], note:"Sem compromisso · Sem taxa inicial · Resposta em 24h" },
  } as Record<string, { title:string;sub:string;name:string;ig:string;monthly:string;goal:string;country:string;email:string;submit:string;ok:string;err:string;goals:string[];note:string }>;

  const tx = L[locale] ?? L.es;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new URLSearchParams({ "form-name":"aplicar", ...data });
      const res = await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body: body.toString() });
      setStatus(res.ok ? "ok" : "err");
    } catch { setStatus("err"); }
  }

  const inp: React.CSSProperties = { width:"100%", padding:"14px 18px", borderRadius:12, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", fontFamily:"inherit", fontSize:14, outline:"none", appearance:"none" };

  if (status === "ok") return (
    <div style={{ textAlign:"center", padding:"60px 24px" }}>
      <div style={{ fontSize:56, marginBottom:20 }}>🎉</div>
      <h3 style={{ fontSize:24, fontWeight:800, color:"#fff", marginBottom:10 }}>{tx.ok}</h3>
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:16, padding:"14px 28px", borderRadius:12, background:"#25D366", color:"#fff", fontWeight:700, fontSize:15 }}>
        💬 WhatsApp
      </a>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:900, color:"#fff", textAlign:"center", marginBottom:10, letterSpacing:"-1px" }}>{tx.title}</h2>
      <p style={{ color:"rgba(255,255,255,0.5)", textAlign:"center", marginBottom:40, fontSize:15 }}>{tx.sub}</p>

      <form name="aplicar" onSubmit={handleSubmit} data-netlify="true">
        <input type="hidden" name="form-name" value="aplicar" />
        <div className="form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
          <input required className="input" style={inp} placeholder={tx.name} value={data.name} onChange={e => setData({...data, name:e.target.value})} />
          <input required className="input" style={inp} placeholder={tx.ig} value={data.instagram} onChange={e => setData({...data, instagram:e.target.value})} />
          <input className="input" style={inp} placeholder={tx.monthly} value={data.monthly} onChange={e => setData({...data, monthly:e.target.value})} />
          <input className="input" style={inp} placeholder={tx.country} value={data.country} onChange={e => setData({...data, country:e.target.value})} />
        </div>

        <div style={{ marginBottom:14 }}>
          <select className="input" style={{ ...inp, cursor:"pointer" }} value={data.goal} onChange={e => setData({...data, goal:e.target.value})}>
            <option value="">{tx.goal}</option>
            {tx.goals.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:24 }}>
          <input className="input" style={inp} type="email" placeholder={tx.email} value={data.email} onChange={e => setData({...data, email:e.target.value})} />
        </div>

        <button type="submit" disabled={status==="sending"}
          style={{ width:"100%", padding:"18px", borderRadius:14, background: status==="sending"?"rgba(212,130,106,0.5)":"var(--rose)", color:"#fff", fontWeight:800, fontSize:16, cursor:status==="sending"?"wait":"pointer", border:"none", fontFamily:"inherit", transition:"all .2s", letterSpacing:"-.2px" }}>
          {status==="sending" ? "..." : tx.submit}
        </button>

        {status==="err" && (
          <p style={{ color:"#f87171", textAlign:"center", marginTop:14, fontSize:13 }}>{tx.err}</p>
        )}
        <p style={{ textAlign:"center", color:"rgba(255,255,255,0.25)", fontSize:12, marginTop:14 }}>{tx.note}</p>
      </form>
    </div>
  );
}

// ── Animated counter ───────────────────────────────────────────────────────
export function CounterStat({ value, label, color="#fff" }: { value:string; label:string; color?:string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign:"center", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(20px)", transition:"opacity .6s, transform .6s" }}>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(2.5rem,5vw,4.5rem)", fontWeight:900, color, letterSpacing:"-2px", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:8, fontWeight:500 }}>{label}</div>
    </div>
  );
}
