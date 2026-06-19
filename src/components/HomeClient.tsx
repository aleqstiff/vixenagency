"use client";
import { useState, useEffect, useRef } from "react";
// ── Scroll reveal hook ──────────────────────────────────────────────────────
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}



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
          <span className="unlock-text g-pink">{word}</span>
          {i%2!==0 && <img src={imgs[(i+1)%imgs.length]} alt="" className="unlock-img" style={{ opacity:vis?1:0, transition:`opacity .5s ease ${i*.2+.3}s` }}/>}
        </div>
      ))}
    </div>
  );
}

// ── Phone formatter ─────────────────────────────────────────────────────────
function formatPhone(raw: string): string {
  // Strip everything except digits and a leading +
  let clean = raw.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
  if (!clean) return "";
  if (clean.startsWith("+")) {
    const d = clean.slice(1).slice(0, 12);
    if (d.length <= 2)  return "+" + d;
    if (d.length <= 5)  return "+" + d.slice(0,2) + " " + d.slice(2);
    if (d.length <= 8)  return "+" + d.slice(0,2) + " " + d.slice(2,5) + " " + d.slice(5);
    return "+" + d.slice(0,2) + " " + d.slice(2,5) + " " + d.slice(5,8) + " " + d.slice(8,12);
  }
  const d = clean.slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 6) return d.slice(0,3) + " " + d.slice(3);
  return d.slice(0,3) + " " + d.slice(3,6) + " " + d.slice(6,9);
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
  const [d, setD] = useState({
    name:"", instagram:"", prefix:"+34", phone:"",
    email:"", monthly:"", goal:"", country:"", availability:"", notes:""
  });
  const [errors, setErrors] = useState<Record<string,string>>({});

  // Country list for prefix + country selector
  const PREFIXES = [
    {code:"+34",flag:"🇪🇸",name:"España"},
    {code:"+52",flag:"🇲🇽",name:"México"},
    {code:"+54",flag:"🇦🇷",name:"Argentina"},
    {code:"+57",flag:"🇨🇴",name:"Colombia"},
    {code:"+56",flag:"🇨🇱",name:"Chile"},
    {code:"+51",flag:"🇵🇪",name:"Perú"},
    {code:"+58",flag:"🇻🇪",name:"Venezuela"},
    {code:"+1",flag:"🇺🇸",name:"USA / Canadá"},
    {code:"+55",flag:"🇧🇷",name:"Brasil"},
    {code:"+33",flag:"🇫🇷",name:"France"},
    {code:"+49",flag:"🇩🇪",name:"Deutschland"},
    {code:"+39",flag:"🇮🇹",name:"Italia"},
    {code:"+44",flag:"🇬🇧",name:"UK"},
    {code:"+31",flag:"🇳🇱",name:"Nederland"},
    {code:"+32",flag:"🇧🇪",name:"Belgique"},
    {code:"+41",flag:"🇨🇭",name:"Suiza"},
    {code:"+351",flag:"🇵🇹",name:"Portugal"},
    {code:"+598",flag:"🇺🇾",name:"Uruguay"},
    {code:"+593",flag:"🇪🇨",name:"Ecuador"},
    {code:"+502",flag:"🇬🇹",name:"Guatemala"},
    {code:"+507",flag:"🇵🇦",name:"Panamá"},
  ] as const;

  const COUNTRIES_ES = ["España","México","Argentina","Colombia","Chile","Perú","Venezuela","Estados Unidos","Canadá","Brasil","Francia","Alemania","Italia","Reino Unido","Portugal","Uruguay","Ecuador","Guatemala","Panamá","Bolivia","Paraguay","Costa Rica","Honduras","El Salvador","Nicaragua","Cuba","República Dominicana","Puerto Rico","Otro"];
  const COUNTRIES_EN = ["Spain","Mexico","Argentina","Colombia","Chile","Peru","Venezuela","United States","Canada","Brazil","France","Germany","Italy","United Kingdom","Portugal","Uruguay","Ecuador","Other"];
  const COUNTRIES_FR = ["France","Belgique","Suisse","Espagne","Mexique","Argentine","Colombie","États-Unis","Canada","Brésil","Italie","Allemagne","Portugal","Autre"];
  const COUNTRIES_DE = ["Deutschland","Österreich","Schweiz","Spanien","Mexiko","Argentinien","Kolumbien","USA","Kanada","Brasilien","Frankreich","Italien","Vereinigtes Königreich","Andere"];
  const COUNTRIES_IT = ["Italia","Spagna","Messico","Argentina","Colombia","Stati Uniti","Canadá","Brasile","Francia","Germania","Svizzera","Altro"];
  const COUNTRIES_PT = ["Brasil","Portugal","Espanha","México","Argentina","Colômbia","Chile","Peru","Venezuela","Estados Unidos","Canadá","França","Alemanha","Itália","Outro"];

  const COUNTRY_LIST: Record<string,string[]> = {es:COUNTRIES_ES,en:COUNTRIES_EN,fr:COUNTRIES_FR,de:COUNTRIES_DE,it:COUNTRIES_IT,pt:COUNTRIES_PT};

  const tx = ({
    es:{title:"¿Lista para empezar?",sub:"Cuéntanos sobre tu cuenta. Análisis gratuito en menos de 24h.",name:"Tu nombre completo",ig:"Instagram o TikTok",prefix:"Prefijo",phone:"Número de teléfono (WhatsApp)",email:"Email",monthly:"Ingresos actuales (ej: 500€/mes)",goal:"¿Cuál es tu objetivo?",country:"País",availability:"Disponibilidad diaria",notes:"Cuéntanos tu caso (opcional)",notesPlaceholder:"Ej: Llevo 3 meses, gano 400€/mes, quiero llegar a 2.000€...",submit:"Solicitar análisis gratuito →",ok:"¡Recibido! 🎉 Te contactamos en menos de 24h.",err:"Error al enviar. Escríbenos por WhatsApp.",goals:["Empezar desde cero","Aumentar lo que ya gano","Llegar a +5.000€/mes","Otro objetivo"],availOptions:["1 hora al día","Hasta 5 horas al día","Hasta 8 horas al día","Todo el día disponible"],note:"Sin compromiso · Sin cuota inicial · 100% confidencial",errPhone:"Introduce un número válido",errEmail:"Introduce un email válido",errRequired:"Campo obligatorio"},
    en:{title:"Ready to start?",sub:"Tell us about your account. Free analysis within 24 hours.",name:"Your full name",ig:"Instagram or TikTok",prefix:"Prefix",phone:"Phone number (WhatsApp)",email:"Email",monthly:"Current income (e.g. $500/mo)",goal:"What's your goal?",country:"Country",availability:"Daily availability",notes:"Tell us your case (optional)",notesPlaceholder:"E.g: I've been 3 months, earning $400/mo, want to reach $2,000...",submit:"Request free analysis →",ok:"Received! 🎉 We'll contact you within 24h.",err:"Error. Message us on WhatsApp.",goals:["Start from scratch","Increase my current income","Reach $5,000+/month","Other goal"],availOptions:["1 hour a day","Up to 5 hours a day","Up to 8 hours a day","All day available"],note:"No commitment · No upfront fee · 100% confidential",errPhone:"Enter a valid number",errEmail:"Enter a valid email",errRequired:"Required"},
    fr:{title:"Prête à commencer ?",sub:"Parle-nous de ton compte. Analyse gratuite en moins de 24h.",name:"Ton prénom et nom",ig:"Instagram ou TikTok",prefix:"Préfixe",phone:"Numéro de téléphone (WhatsApp)",email:"Email",monthly:"Revenus actuels (ex: 500€/mois)",goal:"Quel est ton objectif ?",country:"Pays",availability:"Disponibilité quotidienne",notes:"Parle-nous de ton cas (optionnel)",notesPlaceholder:"Ex: Je suis sur la plateforme depuis 3 mois, je gagne 400€/mois...",submit:"Demander une analyse gratuite →",ok:"Reçu ! 🎉 On te contacte dans moins de 24h.",err:"Erreur. Écris-nous sur WhatsApp.",goals:["Commencer de zéro","Augmenter mes revenus","Atteindre 5.000€+/mois","Autre"],availOptions:["1 heure par jour","Jusqu'à 5 heures par jour","Jusqu'à 8 heures par jour","Toute la journée"],note:"Sans engagement · Sans frais · 100% confidentiel",errPhone:"Numéro invalide",errEmail:"Email invalide",errRequired:"Champ obligatoire"},
    de:{title:"Bereit loszulegen?",sub:"Erzähl uns von deinem Account. Kostenlose Analyse in 24h.",name:"Dein vollständiger Name",ig:"Instagram oder TikTok",prefix:"Vorwahl",phone:"Telefonnummer (WhatsApp)",email:"E-Mail",monthly:"Aktuelle Einnahmen (z.B. 500€/Monat)",goal:"Was ist dein Ziel?",country:"Land",availability:"Tägliche Verfügbarkeit",notes:"Erzähl uns deinen Fall (optional)",notesPlaceholder:"z.B: Ich bin seit 3 Monaten aktiv, verdiene 400€/Monat...",submit:"Kostenlose Analyse anfordern →",ok:"Erhalten! 🎉 Wir melden uns innerhalb von 24h.",err:"Fehler. Schreib uns auf WhatsApp.",goals:["Von Null starten","Einnahmen steigern","5.000€+/Monat erreichen","Anderes Ziel"],availOptions:["1 Stunde täglich","Bis zu 5 Stunden täglich","Bis zu 8 Stunden täglich","Den ganzen Tag"],note:"Unverbindlich · Keine Vorauszahlung · 100% vertraulich",errPhone:"Ungültige Nummer",errEmail:"Ungültige E-Mail",errRequired:"Pflichtfeld"},
    it:{title:"Pronta a iniziare?",sub:"Raccontaci del tuo account. Analisi gratuita entro 24 ore.",name:"Il tuo nome completo",ig:"Instagram o TikTok",prefix:"Prefisso",phone:"Numero di telefono (WhatsApp)",email:"Email",monthly:"Guadagni attuali (es. 500€/mese)",goal:"Qual è il tuo obiettivo?",country:"Paese",availability:"Disponibilità giornaliera",notes:"Raccontaci il tuo caso (opzionale)",notesPlaceholder:"Es: Sono attiva da 3 mesi, guadagno 400€/mese...",submit:"Richiedi analisi gratuita →",ok:"Ricevuto! 🎉 Ti contatteremo entro 24 ore.",err:"Errore. Scrivici su WhatsApp.",goals:["Iniziare da zero","Aumentare i guadagni","Raggiungere 5.000€+/mese","Altro"],availOptions:["1 ora al giorno","Fino a 5 ore al giorno","Fino a 8 ore al giorno","Tutto il giorno"],note:"Senza impegno · Senza costi · 100% riservato",errPhone:"Numero non valido",errEmail:"Email non valida",errRequired:"Campo obbligatorio"},
    pt:{title:"Pronta para começar?",sub:"Fale-nos sobre sua conta. Análise gratuita em menos de 24h.",name:"Seu nome completo",ig:"Instagram ou TikTok",prefix:"Prefixo",phone:"Número de telefone (WhatsApp)",email:"Email",monthly:"Ganhos atuais (ex: R$500/mês)",goal:"Qual é o seu objetivo?",country:"País",availability:"Disponibilidade diária",notes:"Conte-nos seu caso (opcional)",notesPlaceholder:"Ex: Estou ativa há 3 meses, ganho R$2.000/mês...",submit:"Solicitar análise gratuita →",ok:"Recebido! 🎉 Entraremos em contato em menos de 24h.",err:"Erro. Escreva-nos pelo WhatsApp.",goals:["Começar do zero","Aumentar meus ganhos","Chegar a 5.000€+/mês","Outro objetivo"],availOptions:["1 hora por dia","Até 5 horas por dia","Até 8 horas por dia","Dia todo disponível"],note:"Sem compromisso · Sem taxa · 100% confidencial",errPhone:"Número inválido",errEmail:"Email inválido",errRequired:"Campo obrigatório"},
  } as Record<string,{title:string;sub:string;name:string;ig:string;prefix:string;phone:string;email:string;monthly:string;goal:string;country:string;availability:string;notes:string;notesPlaceholder:string;submit:string;ok:string;err:string;goals:string[];availOptions:string[];note:string;errPhone:string;errEmail:string;errRequired:string}>);
  const T = tx[locale] ?? tx.es;
  const countryList = COUNTRY_LIST[locale] ?? COUNTRIES_ES;

  function validatePhone(p: string) { return p.replace(/\D/g,"").length >= 6; }
  function validateEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }

  function validate() {
    const e: Record<string,string> = {};
    if (!d.name.trim()) e.name = T.errRequired;
    if (!d.instagram.trim()) e.instagram = T.errRequired;
    if (!d.phone.trim()) e.phone = T.errRequired;
    else if (!validatePhone(d.phone)) e.phone = T.errPhone;
    if (!d.email.trim()) e.email = T.errRequired;
    else if (!validateEmail(d.email)) e.email = T.errEmail;
    if (!d.goal) e.goal = T.errRequired;
    return e;
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setStatus("sending");
    try {
      const fullPhone = d.prefix + " " + d.phone;
      const body = new URLSearchParams({
        "form-name":"aplicar",
        name:d.name, instagram:d.instagram,
        phone:fullPhone, email:d.email,
        monthly:d.monthly, goal:d.goal,
        country:d.country, availability:d.availability, notes:d.notes
      });
      const r = await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:body.toString() });
      setStatus(r.ok ? "ok" : "err");
    } catch { setStatus("err"); }
  }

  const inp = (hasError: boolean): React.CSSProperties => ({
    width:"100%", padding:"14px 18px", borderRadius:12,
    background:"#fff", border:`1.5px solid ${hasError?"#e05252":"rgba(26,16,24,0.1)"}`,
    color:"var(--dark)", fontFamily:"inherit", fontSize:16, outline:"none",
    transition:"border-color .2s,box-shadow .2s",
    boxShadow:hasError?"0 0 0 3px rgba(224,82,82,0.1)":"0 1px 4px rgba(26,16,24,0.04)",
    appearance:"none" as const,
  });

  const Err = ({k}:{k:string}) => errors[k]
    ? <p style={{color:"#e05252",fontSize:11,marginTop:4,fontWeight:600}}>{errors[k]}</p>
    : null;

  const selArrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c4699a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`;

  if (status === "ok") return (
    <div style={{textAlign:"center",padding:"48px 16px"}}>
      <div style={{fontSize:52,marginBottom:16}}>🎉</div>
      <h3 style={{fontSize:22,fontWeight:800,color:"var(--dark)",marginBottom:10}}>{T.ok}</h3>
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:16,padding:"14px 28px",borderRadius:14,background:"#25D366",color:"#fff",fontWeight:700,fontSize:15}}>
        💬 WhatsApp
      </a>
    </div>
  );

  return (
    <form name="aplicar" onSubmit={send} data-netlify="true" netlify-honeypot="bot-field"
      autoComplete="on" style={{position:"relative",zIndex:1}}>
      <input type="hidden" name="form-name" value="aplicar"/>
      <input type="hidden" name="bot-field" style={{display:"none"}}/>

      <h2 style={{fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:900,color:"var(--dark)",textAlign:"center",marginBottom:8,letterSpacing:"-.5px"}}>{T.title}</h2>
      <p style={{color:"var(--muted)",textAlign:"center",marginBottom:32,fontSize:15}}>{T.sub}</p>

      {/* Nombre + Instagram */}
      <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div>
          <input required name="name" autoComplete="name" placeholder={T.name} style={inp(!!errors.name)}
            value={d.name} onChange={e=>setD({...d,name:e.target.value})}
            onBlur={()=>{if(!d.name.trim())setErrors(p=>({...p,name:T.errRequired}));else setErrors(p=>({...p,name:""}))}}/>
          <Err k="name"/>
        </div>
        <div>
          <input required name="instagram" autoComplete="username" placeholder={T.ig} style={inp(!!errors.instagram)}
            value={d.instagram} onChange={e=>setD({...d,instagram:e.target.value})}
            onBlur={()=>{if(!d.instagram.trim())setErrors(p=>({...p,instagram:T.errRequired}));else setErrors(p=>({...p,instagram:""}))}}/>
          <Err k="instagram"/>
        </div>
      </div>

      {/* Teléfono — prefijo + número */}
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
          {/* Prefix selector */}
          <div style={{flexShrink:0,width:140}}>
            <select name="prefix" autoComplete="tel-country-code"
              style={{...inp(false),paddingRight:32,backgroundImage:selArrow,backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",cursor:"pointer",width:140}}
              value={d.prefix} onChange={e=>setD({...d,prefix:e.target.value})}>
              {PREFIXES.map(p=>(
                <option key={p.code} value={p.code}>{p.flag} {p.code}</option>
              ))}
            </select>
          </div>
          {/* Number */}
          <div style={{flex:1}}>
            <input required name="phone" type="tel" autoComplete="tel-national"
              placeholder={T.phone} style={inp(!!errors.phone)}
              value={d.phone}
              onChange={e=>{
                const v=e.target.value.replace(/[^\d\s\-]/g,"");
                setD({...d,phone:v});
                if(errors.phone&&validatePhone(v))setErrors(p=>({...p,phone:""}));
              }}
              onBlur={()=>{
                if(!d.phone.trim())setErrors(p=>({...p,phone:T.errRequired}));
                else if(!validatePhone(d.phone))setErrors(p=>({...p,phone:T.errPhone}));
                else setErrors(p=>({...p,phone:""}));
              }}/>
          </div>
        </div>
        <Err k="phone"/>
      </div>

      {/* Email */}
      <div style={{marginBottom:12}}>
        <input required name="email" type="email" autoComplete="email"
          placeholder={T.email} style={inp(!!errors.email)}
          value={d.email}
          onChange={e=>{setD({...d,email:e.target.value});if(errors.email&&validateEmail(e.target.value))setErrors(p=>({...p,email:""}))}}
          onBlur={()=>{if(!d.email.trim())setErrors(p=>({...p,email:T.errRequired}));else if(!validateEmail(d.email))setErrors(p=>({...p,email:T.errEmail}));else setErrors(p=>({...p,email:""}))}}/>
        <Err k="email"/>
      </div>

      {/* Ingresos + País (dropdown) */}
      <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div>
          <input name="monthly" autoComplete="off" placeholder={T.monthly}
            style={inp(false)} value={d.monthly} onChange={e=>setD({...d,monthly:e.target.value})}/>
        </div>
        <div>
          <select name="country" autoComplete="country-name"
            style={{...inp(false),backgroundImage:selArrow,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center",cursor:"pointer",paddingRight:40}}
            value={d.country} onChange={e=>setD({...d,country:e.target.value})}>
            <option value="">{T.country}</option>
            {countryList.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Objetivo + Disponibilidad */}
      <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div>
          <select required name="goal"
            style={{...inp(!!errors.goal),backgroundImage:selArrow,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center",cursor:"pointer",paddingRight:40}}
            value={d.goal} onChange={e=>{setD({...d,goal:e.target.value});setErrors(p=>({...p,goal:""}))}}>
            <option value="">{T.goal}</option>
            {T.goals.map(g=><option key={g} value={g}>{g}</option>)}
          </select>
          <Err k="goal"/>
        </div>
        <div>
          <select name="availability"
            style={{...inp(false),backgroundImage:selArrow,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center",cursor:"pointer",paddingRight:40}}
            value={d.availability} onChange={e=>setD({...d,availability:e.target.value})}>
            <option value="">{T.availability}</option>
            {T.availOptions.map(a=><option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Textarea caso */}
      <div style={{marginBottom:20}}>
        <label style={{display:"block",fontSize:13,fontWeight:600,color:"var(--muted)",marginBottom:6}}>
          {T.notes}
          <span style={{fontSize:11,color:"var(--muted2)",fontWeight:400,marginLeft:6}}>
            {locale==="es"?"(cuanto más detalle, mejor)":locale==="en"?"(more detail = better)":"(plus de détail = mieux)"}
          </span>
        </label>
        <textarea name="notes" rows={4} placeholder={T.notesPlaceholder} autoComplete="off"
          style={{...inp(false),resize:"vertical",minHeight:90,maxHeight:220,lineHeight:1.6}}
          value={d.notes} onChange={e=>setD({...d,notes:e.target.value})}/>
      </div>

      <button type="submit" disabled={status==="sending"}
        style={{width:"100%",padding:"17px",borderRadius:14,background:status==="sending"?"rgba(196,105,154,0.5)":"var(--pink)",backgroundImage:status==="sending"?"none":"linear-gradient(135deg,var(--pink),var(--pink2))",color:"#fff",fontWeight:800,fontSize:16,cursor:status==="sending"?"wait":"pointer",border:"none",fontFamily:"inherit",transition:"all .2s",letterSpacing:"-.2px",boxShadow:"0 4px 20px rgba(196,105,154,0.3)"}}>
        {status==="sending"?(locale==="es"?"Enviando…":"Sending…"):T.submit}
      </button>

      {status==="err"&&<p style={{color:"#e05252",textAlign:"center",marginTop:12,fontSize:13}}>{T.err}</p>}
      <p style={{textAlign:"center",color:"var(--muted2)",fontSize:12,marginTop:12}}>{T.note}</p>
    </form>
  );
}


export function CounterStat({ value, label, color="var(--pink)" }: { value:string;label:string;color?:string }) {
  const { ref, vis } = useReveal(0.3);
  return (
    <div ref={ref} style={{ textAlign:"center", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:"opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1)" }}>
      <div style={{ fontSize:"clamp(2.2rem,4.5vw,3.8rem)", fontWeight:900, color, letterSpacing:"-2px", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:13, color:"var(--muted)", marginTop:8, fontWeight:500 }}>{label}</div>
    </div>
  );
}
