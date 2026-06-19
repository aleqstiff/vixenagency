"use client";
import { useState, useEffect, useRef } from "react";

// ── Unlock animation ────────────────────────────────────────────────────────
export function UnlockSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: .1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const words = ({ es:["MULTIPLICA","TU","POTENCIAL"], en:["UNLOCK","YOUR","POTENTIAL"], fr:["LIBÈRE","TON","POTENTIEL"], de:["ENTFALTE","DEIN","POTENZIAL"], it:["LIBERA","IL TUO","POTENZIALE"], pt:["LIBERA","SEU","POTENCIAL"] } as Record<string,string[]>)[locale] ?? ["MULTIPLICA","TU","POTENCIAL"];
  const imgs = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=face&q=80",
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=120&h=120&fit=crop&crop=top&q=80",
    "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=120&h=120&fit=crop&crop=face&q=80",
  ];
  return (
    <div ref={ref} style={{ padding:"72px 0", overflow:"hidden", userSelect:"none", background:"var(--bg2)" }}>
      {words.map((word, i) => (
        <div key={i} className="unlock-row" style={{ justifyContent:i%2===0?"flex-start":"flex-end", paddingLeft:i%2===0?"5vw":"0", paddingRight:i%2!==0?"5vw":"0", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)", transition:`opacity .7s ease ${i*.15}s,transform .7s ease ${i*.15}s` }}>
          {i%2===0 && <img src={imgs[i%imgs.length]} alt="" className="unlock-img" style={{ opacity:vis?1:0, transition:`opacity .5s ease ${i*.2+.3}s` }}/>}
          <span className="unlock-text g-rose">{word}</span>
          {i%2!==0 && <img src={imgs[(i+1)%imgs.length]} alt="" className="unlock-img" style={{ opacity:vis?1:0, transition:`opacity .5s ease ${i*.2+.3}s` }}/>}
        </div>
      ))}
    </div>
  );
}

// ── Phone formatter ─────────────────────────────────────────────────────────
function formatPhone(raw: string): string {
  // Keep only digits and leading +
  const clean = raw.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
  if (!clean) return "";
  // If starts with +, international format
  if (clean.startsWith("+")) {
    // +XX XXX XXX XXX
    const digits = clean.slice(1);
    if (digits.length <= 2) return "+" + digits;
    if (digits.length <= 5) return "+" + digits.slice(0,2) + " " + digits.slice(2);
    if (digits.length <= 8) return "+" + digits.slice(0,2) + " " + digits.slice(2,5) + " " + digits.slice(5);
    return "+" + digits.slice(0,2) + " " + digits.slice(2,5) + " " + digits.slice(5,8) + " " + digits.slice(8,12);
  }
  // Spanish-style: 6XX XXX XXX
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return clean.slice(0,3) + " " + clean.slice(3);
  return clean.slice(0,3) + " " + clean.slice(3,6) + " " + clean.slice(6,9);
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ── Apply Form ──────────────────────────────────────────────────────────────
export function ApplyForm({ locale, href }: { locale: string; href: string }) {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");
  const [d, setD] = useState({ name:"", instagram:"", phone:"", email:"", monthly:"", goal:"", country:"", notes:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});

  const tx = ({
    es: { title:"¿Lista para multiplicar tus ingresos?", sub:"Cuéntanos sobre tu cuenta. Análisis gratuito en menos de 24h.", name:"Tu nombre completo", ig:"Instagram / TikTok (usuario)", phone:"Teléfono (WhatsApp)", email:"Email", monthly:"Ingresos actuales en OnlyFans", goal:"¿Cuál es tu objetivo?", country:"País", notes:"Cuéntanos más sobre tu caso (opcional)", notesPlaceholder:"Ej: Llevo 3 meses en OnlyFans, gano 400€/mes, quiero llegar a 2.000€. Mi contenido es fitness sin mostrar cara...", submit:"Solicitar análisis gratuito →", ok:"¡Perfecto! 🎉 Te contactamos en menos de 24 horas por WhatsApp o email.", err:"Error al enviar. Escríbenos directamente por WhatsApp.", goals:["Empezar desde cero","Aumentar lo que ya gano","Llegar a +5.000€/mes","Máximo anonimato","Otro objetivo"], note:"Sin compromiso · Sin cuota inicial · 100% confidencial", errPhone:"Introduce un teléfono válido (mín. 8 dígitos)", errEmail:"Introduce un email válido", errRequired:"Campo obligatorio" },
    en: { title:"Ready to multiply your income?", sub:"Tell us about your account. Free analysis within 24 hours.", name:"Your full name", ig:"Instagram / TikTok (username)", phone:"Phone (WhatsApp)", email:"Email", monthly:"Current OnlyFans income", goal:"What's your goal?", country:"Country", notes:"Tell us more about your case (optional)", notesPlaceholder:"E.g: I've been on OnlyFans for 3 months, earning $400/mo, want to reach $2,000. My content is fitness without showing face...", submit:"Request free analysis →", ok:"Perfect! 🎉 We'll contact you within 24 hours via WhatsApp or email.", err:"Error. Message us on WhatsApp.", goals:["Start from scratch","Increase my current income","Reach $5,000+/month","Full anonymity","Other goal"], note:"No commitment · No upfront fee · 100% confidential", errPhone:"Enter a valid phone number (min. 8 digits)", errEmail:"Enter a valid email", errRequired:"Required field" },
    fr: { title:"Prête à multiplier tes revenus ?", sub:"Parle-nous de ton compte. Analyse gratuite en moins de 24h.", name:"Ton prénom et nom", ig:"Instagram / TikTok (nom d'utilisateur)", phone:"Téléphone (WhatsApp)", email:"Email", monthly:"Revenus actuels sur OnlyFans", goal:"Quel est ton objectif ?", country:"Pays", notes:"Dis-nous en plus sur ton cas (optionnel)", notesPlaceholder:"Ex: Je suis sur OnlyFans depuis 3 mois, je gagne 400€/mois, je veux atteindre 2.000€...", submit:"Demander une analyse gratuite →", ok:"Parfait ! 🎉 On te contacte dans moins de 24h par WhatsApp ou email.", err:"Erreur. Écris-nous sur WhatsApp.", goals:["Commencer de zéro","Augmenter mes revenus","Atteindre 5.000€+/mois","Anonymat total","Autre"], note:"Sans engagement · Sans frais · 100% confidentiel", errPhone:"Entre un numéro valide (min. 8 chiffres)", errEmail:"Entre un email valide", errRequired:"Champ obligatoire" },
    de: { title:"Bereit dein Einkommen zu multiplizieren?", sub:"Erzähl uns von deinem Account. Kostenlose Analyse in 24h.", name:"Dein vollständiger Name", ig:"Instagram / TikTok (Nutzername)", phone:"Telefon (WhatsApp)", email:"E-Mail", monthly:"Aktuelle OnlyFans-Einnahmen", goal:"Was ist dein Ziel?", country:"Land", notes:"Erzähl uns mehr über deinen Fall (optional)", notesPlaceholder:"z.B: Ich bin seit 3 Monaten auf OnlyFans, verdiene 400€/Monat, möchte 2.000€ erreichen...", submit:"Kostenlose Analyse anfordern →", ok:"Super! 🎉 Wir melden uns innerhalb von 24h per WhatsApp oder E-Mail.", err:"Fehler. Schreib uns auf WhatsApp.", goals:["Von Null starten","Einnahmen steigern","5.000€+/Monat erreichen","Anonymität","Anderes"], note:"Unverbindlich · Keine Vorauszahlung · 100% vertraulich", errPhone:"Gültige Telefonnummer eingeben (min. 8 Ziffern)", errEmail:"Gültige E-Mail eingeben", errRequired:"Pflichtfeld" },
    it: { title:"Pronta a moltiplicare i tuoi guadagni?", sub:"Raccontaci del tuo account. Analisi gratuita entro 24 ore.", name:"Il tuo nome completo", ig:"Instagram / TikTok (nome utente)", phone:"Telefono (WhatsApp)", email:"Email", monthly:"Guadagni attuali su OnlyFans", goal:"Qual è il tuo obiettivo?", country:"Paese", notes:"Raccontaci di più del tuo caso (opzionale)", notesPlaceholder:"Es: Sono su OnlyFans da 3 mesi, guadagno 400€/mese, voglio arrivare a 2.000€...", submit:"Richiedi analisi gratuita →", ok:"Perfetto! 🎉 Ti contatteremo entro 24 ore via WhatsApp o email.", err:"Errore. Scrivici su WhatsApp.", goals:["Iniziare da zero","Aumentare i guadagni","Raggiungere 5.000€+/mese","Anonimato totale","Altro"], note:"Senza impegno · Senza costi · 100% riservato", errPhone:"Inserisci un numero valido (min. 8 cifre)", errEmail:"Inserisci un'email valida", errRequired:"Campo obbligatorio" },
    pt: { title:"Pronta para multiplicar seus ganhos?", sub:"Fale-nos sobre sua conta. Análise gratuita em menos de 24h.", name:"Seu nome completo", ig:"Instagram / TikTok (usuário)", phone:"Telefone (WhatsApp)", email:"Email", monthly:"Ganhos atuais no OnlyFans", goal:"Qual é o seu objetivo?", country:"País", notes:"Conte-nos mais sobre o seu caso (opcional)", notesPlaceholder:"Ex: Estou no OnlyFans há 3 meses, ganho R$2.000/mês, quero chegar a R$10.000...", submit:"Solicitar análise gratuita →", ok:"Perfeito! 🎉 Entraremos em contato em menos de 24h por WhatsApp ou email.", err:"Erro. Escreva-nos pelo WhatsApp.", goals:["Começar do zero","Aumentar meus ganhos","Chegar a 5.000€+/mês","Anonimato total","Outro objetivo"], note:"Sem compromisso · Sem taxa · 100% confidencial", errPhone:"Digite um número válido (mín. 8 dígitos)", errEmail:"Digite um email válido", errRequired:"Campo obrigatório" },
  } as Record<string, { title:string;sub:string;name:string;ig:string;phone:string;email:string;monthly:string;goal:string;country:string;notes:string;notesPlaceholder:string;submit:string;ok:string;err:string;goals:string[];note:string;errPhone:string;errEmail:string;errRequired:string }>);
  const tx_l = tx[locale] ?? tx.es;

  function validate() {
    const e: Record<string,string> = {};
    if (!d.name.trim()) e.name = tx_l.errRequired;
    if (!d.instagram.trim()) e.instagram = tx_l.errRequired;
    if (!d.phone.trim()) e.phone = tx_l.errRequired;
    else if (!validatePhone(d.phone)) e.phone = tx_l.errPhone;
    if (!d.email.trim()) e.email = tx_l.errRequired;
    else if (!validateEmail(d.email)) e.email = tx_l.errEmail;
    if (!d.goal) e.goal = tx_l.errRequired;
    return e;
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const body = new URLSearchParams({ "form-name":"aplicar", ...d });
      const r = await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:body.toString() });
      setStatus(r.ok ? "ok" : "err");
    } catch { setStatus("err"); }
  }

  const inp = (hasError: boolean): React.CSSProperties => ({
    width:"100%", padding:"14px 18px", borderRadius:12,
    background:"#fff", border:`1.5px solid ${hasError?"#e05252":"rgba(26,18,16,0.1)"}`,
    color:"var(--dark)", fontFamily:"inherit", fontSize:14,
    outline:"none", transition:"border-color .2s",
    boxShadow: hasError ? "0 0 0 3px rgba(224,82,82,0.1)" : "0 1px 4px rgba(26,18,16,0.04)",
  });

  const Err = ({ k }: { k: string }) => errors[k] ? (
    <p style={{ color:"#e05252", fontSize:11, marginTop:4, fontWeight:600 }}>{errors[k]}</p>
  ) : null;

  if (status === "ok") return (
    <div style={{ textAlign:"center", padding:"48px 16px" }}>
      <div style={{ fontSize:56, marginBottom:20 }}>🎉</div>
      <h3 style={{ fontSize:22, fontWeight:800, color:"var(--dark)", marginBottom:10 }}>{tx_l.ok}</h3>
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:20, padding:"14px 28px", borderRadius:14, background:"#25D366", color:"#fff", fontWeight:700, fontSize:15 }}>
        💬 WhatsApp
      </a>
    </div>
  );

  return (
    <form name="aplicar" onSubmit={send} data-netlify="true" netlify-honeypot="bot-field" autoComplete="on">
      <input type="hidden" name="form-name" value="aplicar"/>
      <input type="hidden" name="bot-field" style={{ display:"none" }}/>

      <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:900, color:"var(--dark)", textAlign:"center", marginBottom:8, letterSpacing:"-.5px" }}>{tx_l.title}</h2>
      <p style={{ color:"var(--muted)", textAlign:"center", marginBottom:32, fontSize:15 }}>{tx_l.sub}</p>

      {/* Row 1: Nombre + Instagram */}
      <div className="form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div>
          <input
            required name="name" autoComplete="name"
            style={inp(!!errors.name)} placeholder={tx_l.name}
            value={d.name} onChange={e => setD({...d, name:e.target.value})}
            onBlur={() => { if (!d.name.trim()) setErrors(p => ({...p, name:tx_l.errRequired})); else setErrors(p => ({...p, name:""})); }}
          />
          <Err k="name"/>
        </div>
        <div>
          <input
            required name="instagram" autoComplete="username"
            style={inp(!!errors.instagram)} placeholder={tx_l.ig}
            value={d.instagram} onChange={e => setD({...d, instagram:e.target.value})}
            onBlur={() => { if (!d.instagram.trim()) setErrors(p => ({...p, instagram:tx_l.errRequired})); else setErrors(p => ({...p, instagram:""})); }}
          />
          <Err k="instagram"/>
        </div>
      </div>

      {/* Row 2: Teléfono + Email */}
      <div className="form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div>
          <input
            required name="phone" type="tel" autoComplete="tel"
            style={inp(!!errors.phone)} placeholder={tx_l.phone + " (+34 600 000 000)"}
            value={d.phone}
            onChange={e => {
              const formatted = formatPhone(e.target.value);
              setD({...d, phone:formatted});
              if (errors.phone && validatePhone(formatted)) setErrors(p => ({...p, phone:""}));
            }}
            onBlur={() => {
              if (!d.phone.trim()) setErrors(p => ({...p, phone:tx_l.errRequired}));
              else if (!validatePhone(d.phone)) setErrors(p => ({...p, phone:tx_l.errPhone}));
              else setErrors(p => ({...p, phone:""}));
            }}
          />
          <Err k="phone"/>
        </div>
        <div>
          <input
            required name="email" type="email" autoComplete="email"
            style={inp(!!errors.email)} placeholder={tx_l.email}
            value={d.email}
            onChange={e => {
              setD({...d, email:e.target.value});
              if (errors.email && validateEmail(e.target.value)) setErrors(p => ({...p, email:""}));
            }}
            onBlur={() => {
              if (!d.email.trim()) setErrors(p => ({...p, email:tx_l.errRequired}));
              else if (!validateEmail(d.email)) setErrors(p => ({...p, email:tx_l.errEmail}));
              else setErrors(p => ({...p, email:""}));
            }}
          />
          <Err k="email"/>
        </div>
      </div>

      {/* Row 3: Ingresos + País */}
      <div className="form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
        <div>
          <input
            name="monthly" autoComplete="off"
            style={inp(false)} placeholder={tx_l.monthly + " (ej: 500€/mes)"}
            value={d.monthly} onChange={e => setD({...d, monthly:e.target.value})}
          />
        </div>
        <div>
          <input
            name="country" autoComplete="country-name"
            style={inp(false)} placeholder={tx_l.country}
            value={d.country} onChange={e => setD({...d, country:e.target.value})}
          />
        </div>
      </div>

      {/* Objetivo */}
      <div style={{ marginBottom:12 }}>
        <select
          required name="goal" autoComplete="off"
          style={{ ...inp(!!errors.goal), cursor:"pointer", appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c8705a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center", paddingRight:"40px" }}
          value={d.goal} onChange={e => { setD({...d, goal:e.target.value}); setErrors(p => ({...p, goal:""})); }}>
          <option value="">{tx_l.goal}</option>
          {tx_l.goals?.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <Err k="goal"/>
      </div>

      {/* Textarea — cuenta tu caso */}
      <div style={{ marginBottom:20 }}>
        <label style={{ display:"block", fontSize:13, fontWeight:600, color:"var(--muted)", marginBottom:6 }}>
          {tx_l.notes}
          <span style={{ fontSize:11, color:"var(--muted2)", fontWeight:400, marginLeft:6 }}>
            {locale==="es"?"(cuanto más detalle, mejor análisis)":locale==="en"?"(more detail = better analysis)":"(plus de détail = meilleure analyse)"}
          </span>
        </label>
        <textarea
          name="notes" autoComplete="off" rows={4}
          style={{ ...inp(false), resize:"vertical", minHeight:100, maxHeight:240, lineHeight:1.6 }}
          placeholder={tx_l.notesPlaceholder}
          value={d.notes} onChange={e => setD({...d, notes:e.target.value})}
        />
      </div>

      <button type="submit" disabled={status==="sending"}
        style={{ width:"100%", padding:"17px", borderRadius:14, background:status==="sending"?"rgba(200,112,90,0.5)":"var(--rose)", color:"#fff", fontWeight:800, fontSize:16, cursor:status==="sending"?"wait":"pointer", border:"none", fontFamily:"inherit", transition:"all .2s", letterSpacing:"-.2px", boxShadow:"0 4px 20px rgba(200,112,90,0.3)" }}>
        {status==="sending" ? (locale==="es"?"Enviando…":"Sending…") : tx_l.submit}
      </button>

      {status==="err" && <p style={{ color:"#e05252", textAlign:"center", marginTop:12, fontSize:13 }}>{tx_l.err}</p>}
      <p style={{ textAlign:"center", color:"var(--muted2)", fontSize:12, marginTop:12 }}>{tx_l.note}</p>
    </form>
  );
}

export function CounterStat({ value, label, color="var(--rose)" }: { value:string;label:string;color?:string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ textAlign:"center", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:"opacity .6s,transform .6s" }}>
      <div style={{ fontSize:"clamp(2.2rem,4.5vw,3.8rem)", fontWeight:900, color, letterSpacing:"-2px", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:13, color:"var(--muted)", marginTop:8, fontWeight:500 }}>{label}</div>
    </div>
  );
}
