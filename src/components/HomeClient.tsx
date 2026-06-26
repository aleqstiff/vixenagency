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
  const { ref, vis } = useReveal(0.1);
  const words = ({ es:["MULTIPLICA","TU","POTENCIAL"], en:["UNLOCK","YOUR","POTENTIAL"], fr:["LIBÈRE","TON","POTENTIEL"], de:["ENTFALTE","DEIN","POTENZIAL"], it:["LIBERA","IL TUO","POTENZIALE"], pt:["LIBERA","SEU","POTENCIAL"] } as Record<string,string[]>)[locale] ?? ["MULTIPLICA","TU","POTENCIAL"];
  // 3 distinct model photos — no duplicates
  const imgs = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=160&h=160&fit=crop&crop=faces&q=82",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&h=160&fit=crop&crop=faces&q=82",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces&q=82",
  ];
  return (
    <div ref={ref} style={{ padding:"64px 0", overflow:"hidden", userSelect:"none", background:"var(--bg2)" }}>
      {words.map((word, i) => (
        <div key={i} className="unlock-row" style={{
          justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
          paddingLeft: i % 2 === 0 ? "5vw" : "0",
          paddingRight: i % 2 !== 0 ? "5vw" : "0",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(40px)",
          transition: `opacity .7s ease ${i*.15}s,transform .7s ease ${i*.15}s`,
        }}>
          {i % 2 === 0 && <img src={imgs[i]} alt="" className="unlock-img" style={{ opacity: vis ? 1 : 0, transition:`opacity .5s ease ${i*.2+.3}s` }} />}
          <span className="unlock-text g-pink">{word}</span>
          {i % 2 !== 0 && <img src={imgs[i]} alt="" className="unlock-img" style={{ opacity: vis ? 1 : 0, transition:`opacity .5s ease ${i*.2+.3}s` }} />}
        </div>
      ))}
    </div>
  );
}

export function ApplyForm({ locale, href }: { locale: string; href: string }) {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");
  const [d, setD] = useState({
    name:"", prefix:"+34", phone:"",
    ig1:"", social2:"", social3:"",
    email:"", monthly:"", goal:"", country:"", availability:"", notes:""
  });
  const [showSocial2, setShowSocial2] = useState(false);
  const [showSocial3, setShowSocial3] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  const PREFIXES = [
    {code:"+34",flag:"🇪🇸",name:"España"},{code:"+52",flag:"🇲🇽",name:"México"},
    {code:"+54",flag:"🇦🇷",name:"Argentina"},{code:"+57",flag:"🇨🇴",name:"Colombia"},
    {code:"+56",flag:"🇨🇱",name:"Chile"},{code:"+51",flag:"🇵🇪",name:"Perú"},
    {code:"+58",flag:"🇻🇪",name:"Venezuela"},{code:"+1",flag:"🇺🇸",name:"USA / CA"},
    {code:"+55",flag:"🇧🇷",name:"Brasil"},{code:"+33",flag:"🇫🇷",name:"France"},
    {code:"+49",flag:"🇩🇪",name:"Deutschland"},{code:"+39",flag:"🇮🇹",name:"Italia"},
    {code:"+44",flag:"🇬🇧",name:"UK"},{code:"+351",flag:"🇵🇹",name:"Portugal"},
    {code:"+32",flag:"🇧🇪",name:"Belgique"},{code:"+41",flag:"🇨🇭",name:"Suiza"},
  ] as const;

  const COUNTRIES: Record<string,string[]> = {
    es:["España","México","Argentina","Colombia","Chile","Perú","Venezuela","Estados Unidos","Canadá","Brasil","Francia","Alemania","Italia","Reino Unido","Portugal","Uruguay","Ecuador","Bolivia","Paraguay","Costa Rica","Otro"],
    en:["United States","Canada","Spain","Mexico","Argentina","Colombia","Chile","Peru","Venezuela","Brazil","France","Germany","Italy","United Kingdom","Portugal","Other"],
    fr:["France","Belgique","Suisse","Espagne","Mexique","Argentine","Colombie","États-Unis","Canada","Brésil","Autre"],
    de:["Deutschland","Österreich","Schweiz","Spanien","USA","Kanada","Andere"],
    it:["Italia","Spagna","Messico","Argentina","USA","Brasile","Altro"],
    pt:["Brasil","Portugal","Espanha","México","Argentina","Colômbia","EUA","Outro"],
  };

  const T = ({
    es:{title:"¿Lista para empezar?",sub:"Análisis gratuito en menos de 24h · Sin compromiso",name:"Tu nombre completo",prefix:"Prefijo",phone:"Número WhatsApp",ig:"Instagram o TikTok principal",social2:"Otra red social (opcional)",social3:"Otra más (opcional)",addSocial:"+ Añadir otra red social",email:"Email",monthly:"Ingresos actuales en OnlyFans (USD/mes)",monthlyPh:"Ej: $500/mes, $2.000/mes...",goal:"¿Cuál es tu objetivo?",country:"País",availability:"Disponibilidad diaria",notes:"Cuéntanos tu caso (opcional)",notesPh:"Ej: Llevo 3 meses, gano $500/mes, quiero llegar a $3.000...",submit:"Solicitar análisis gratuito →",ok:"¡Recibido! 🎉 Abriendo WhatsApp...",err:"Error al enviar. Prueba de nuevo o escríbenos directamente.",goals:["Empezar desde cero","Aumentar lo que ya gano","Llegar a +$5.000/mes","Otro objetivo"],avail:["1 hora al día","Hasta 5 horas al día","Hasta 8 horas al día","Todo el día"],note:"Sin compromiso · Sin cuota inicial · 100% confidencial",req:"Campo obligatorio",badPhone:"Número inválido",badEmail:"Email inválido"},
    en:{title:"Ready to start?",sub:"Free analysis in under 24h · No commitment",name:"Your full name",prefix:"Prefix",phone:"WhatsApp number",ig:"Main Instagram or TikTok",social2:"Another social (optional)",social3:"One more (optional)",addSocial:"+ Add another social",email:"Email",monthly:"Current OnlyFans income (USD/month)",monthlyPh:"E.g: $500/mo, $2,000/mo...",goal:"What's your goal?",country:"Country",availability:"Daily availability",notes:"Tell us your case (optional)",notesPh:"E.g: 3 months in, earning $500/mo, want to reach $3,000...",submit:"Request free analysis →",ok:"Received! 🎉 Opening WhatsApp...",err:"Error. Please try again or message us directly.",goals:["Start from scratch","Increase my current income","Reach $5,000+/month","Other goal"],avail:["1 hour a day","Up to 5 hours a day","Up to 8 hours a day","All day"],note:"No commitment · No upfront fee · 100% confidential",req:"Required",badPhone:"Invalid number",badEmail:"Invalid email"},
    fr:{title:"Prête à commencer ?",sub:"Analyse gratuite en moins de 24h · Sans engagement",name:"Ton prénom et nom",prefix:"Préfixe",phone:"Numéro WhatsApp",ig:"Instagram ou TikTok principal",social2:"Autre réseau (optionnel)",social3:"Encore un (optionnel)",addSocial:"+ Ajouter un réseau",email:"Email",monthly:"Revenus actuels (USD/mois)",monthlyPh:"Ex: $500/mois, $2.000/mois...",goal:"Quel est ton objectif ?",country:"Pays",availability:"Disponibilité quotidienne",notes:"Parle-nous de ton cas (optionnel)",notesPh:"Ex: 3 mois d'activité, $500/mois, veux atteindre $3.000...",submit:"Demander une analyse →",ok:"Reçu ! 🎉 Ouverture de WhatsApp...",err:"Erreur. Réessaie ou écris-nous directement.",goals:["Commencer de zéro","Augmenter mes revenus","Atteindre $5.000+/mois","Autre"],avail:["1h par jour","Jusqu'à 5h par jour","Jusqu'à 8h par jour","Toute la journée"],note:"Sans engagement · Sans frais · 100% confidentiel",req:"Obligatoire",badPhone:"Numéro invalide",badEmail:"Email invalide"},
    de:{title:"Bereit loszulegen?",sub:"Kostenlose Analyse in 24h · Unverbindlich",name:"Vollständiger Name",prefix:"Vorwahl",phone:"WhatsApp-Nummer",ig:"Haupt-Instagram oder TikTok",social2:"Weiteres Netzwerk (optional)",social3:"Noch eines (optional)",addSocial:"+ Weiteres Netzwerk",email:"E-Mail",monthly:"Aktuelle Einnahmen (USD/Monat)",monthlyPh:"z.B: $500/Monat, $2.000/Monat...",goal:"Was ist dein Ziel?",country:"Land",availability:"Tägliche Verfügbarkeit",notes:"Erzähl uns deinen Fall (optional)",notesPh:"z.B: 3 Monate aktiv, $500/Monat...",submit:"Kostenlose Analyse anfordern →",ok:"Erhalten! 🎉 WhatsApp wird geöffnet...",err:"Fehler. Bitte erneut versuchen.",goals:["Von Null starten","Einnahmen steigern","$5.000+/Monat erreichen","Anderes Ziel"],avail:["1 Std/Tag","Bis 5 Std/Tag","Bis 8 Std/Tag","Den ganzen Tag"],note:"Unverbindlich · Keine Vorauszahlung · Vertraulich",req:"Pflichtfeld",badPhone:"Ungültige Nummer",badEmail:"Ungültige E-Mail"},
    it:{title:"Pronta a iniziare?",sub:"Analisi gratuita in meno di 24h · Senza impegno",name:"Nome completo",prefix:"Prefisso",phone:"Numero WhatsApp",ig:"Instagram o TikTok principale",social2:"Altro social (opzionale)",social3:"Un altro (opzionale)",addSocial:"+ Aggiungi altro social",email:"Email",monthly:"Guadagni attuali (USD/mese)",monthlyPh:"Es: $500/mese, $2.000/mese...",goal:"Obiettivo?",country:"Paese",availability:"Disponibilità giornaliera",notes:"Raccontaci il tuo caso (opzionale)",notesPh:"Es: 3 mesi attiva, $500/mese...",submit:"Richiedi analisi gratuita →",ok:"Ricevuto! 🎉 Apertura WhatsApp...",err:"Errore. Riprova o scrivici direttamente.",goals:["Iniziare da zero","Aumentare guadagni","Raggiungere $5.000+/mese","Altro"],avail:["1 ora/giorno","Fino a 5 ore/giorno","Fino a 8 ore/giorno","Tutto il giorno"],note:"Senza impegno · Gratuito · Riservato",req:"Obbligatorio",badPhone:"Numero non valido",badEmail:"Email non valida"},
    pt:{title:"Pronta para começar?",sub:"Análise gratuita em menos de 24h · Sem compromisso",name:"Nome completo",prefix:"Prefixo",phone:"Número WhatsApp",ig:"Instagram ou TikTok principal",social2:"Outra rede (opcional)",social3:"Mais uma (opcional)",addSocial:"+ Adicionar rede social",email:"Email",monthly:"Ganhos atuais (USD/mês)",monthlyPh:"Ex: $500/mês, $2.000/mês...",goal:"Qual é seu objetivo?",country:"País",availability:"Disponibilidade diária",notes:"Conte-nos seu caso (opcional)",notesPh:"Ex: 3 meses ativa, $500/mês...",submit:"Solicitar análise gratuita →",ok:"Recebido! 🎉 Abrindo WhatsApp...",err:"Erro. Tente novamente ou escreva-nos diretamente.",goals:["Começar do zero","Aumentar meus ganhos","Chegar a $5.000+/mês","Outro objetivo"],avail:["1 hora/dia","Até 5 horas/dia","Até 8 horas/dia","O dia todo"],note:"Sem compromisso · Gratuito · Confidencial",req:"Obrigatório",badPhone:"Número inválido",badEmail:"Email inválido"},
  } as Record<string,{title:string;sub:string;name:string;prefix:string;phone:string;ig:string;social2:string;social3:string;addSocial:string;email:string;monthly:string;monthlyPh:string;goal:string;country:string;availability:string;notes:string;notesPh:string;submit:string;ok:string;err:string;goals:string[];avail:string[];note:string;req:string;badPhone:string;badEmail:string}>);
  const tx = T[locale] ?? T.es;
  const countries = COUNTRIES[locale] ?? COUNTRIES.es;

  const valPhone = (p:string) => p.replace(/\D/g,"").length >= 6;
  const valEmail = (e:string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

  function validate(){
    const e:Record<string,string>={};
    if(!d.name.trim()) e.name=tx.req;
    if(!d.ig1.trim()) e.ig1=tx.req;
    if(!d.phone.trim()) e.phone=tx.req;
    else if(!valPhone(d.phone)) e.phone=tx.badPhone;
    if(!d.email.trim()) e.email=tx.req;
    else if(!valEmail(d.email)) e.email=tx.badEmail;
    if(!d.goal) e.goal=tx.req;
    return e;
  }

  function buildWaMessage(){
    const socials = [d.ig1, d.social2, d.social3].filter(Boolean).join(", ");
    const lines = [
      `👋 *Nueva solicitud — Only Sweety Agency*`,
      ``,
      `*Nombre:* ${d.name}`,
      `*Redes:* ${socials}`,
      `*Teléfono:* ${d.prefix} ${d.phone}`,
      `*Email:* ${d.email}`,
      d.monthly ? `*Ingresos actuales:* ${d.monthly}` : null,
      d.goal ? `*Objetivo:* ${d.goal}` : null,
      d.country ? `*País:* ${d.country}` : null,
      d.availability ? `*Disponibilidad:* ${d.availability}` : null,
      d.notes ? `\n*Mi caso:* ${d.notes}` : null,
      `\n_He rellenado el formulario en onlysweety.com_`,
    ].filter(Boolean).join("\n");
    return lines;
  }

  async function send(e:React.FormEvent){
    e.preventDefault();
    const errs=validate();
    if(Object.keys(errs).length){setErrors(errs);return;}
    setErrors({});setStatus("sending");

    const fullPhone=d.prefix+" "+d.phone;
    const payload=new URLSearchParams({
      name:d.name, instagram:d.ig1,
      social2:d.social2, social3:d.social3,
      prefix:d.prefix, phone:fullPhone,
      email:d.email, monthly:d.monthly,
      goal:d.goal, country:d.country,
      availability:d.availability, notes:d.notes,
    });

    // Save to backend (best effort)
    fetch("/api/submit",{
      method:"POST",
      headers:{"Content-Type":"application/x-www-form-urlencoded"},
      body:payload.toString(),
    }).catch(()=>{});

    // Short delay then redirect to WhatsApp
    setStatus("ok");
    const waNumber="34644462216";
    const waText=buildWaMessage();
    setTimeout(()=>{
      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`,"_blank");
    }, 1200);
  }

  const inp=(err:boolean):React.CSSProperties=>({
    width:"100%",padding:"14px 18px",borderRadius:12,background:"#fff",
    border:`1.5px solid ${err?"#e05252":"rgba(26,16,24,0.1)"}`,
    color:"var(--dark)",fontFamily:"inherit",fontSize:16,outline:"none",
    transition:"border-color .2s,box-shadow .2s",appearance:"none" as const,
    boxShadow:err?"0 0 0 3px rgba(224,82,82,0.1)":"0 1px 4px rgba(26,16,24,0.04)",
  });
  const selArrow=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c4699a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`;
  const selStyle=(err:boolean):React.CSSProperties=>({...inp(err),backgroundImage:selArrow,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center",paddingRight:40,cursor:"pointer"});
  const Err=({k}:{k:string})=>errors[k]?<p style={{color:"#e05252",fontSize:11,marginTop:4,fontWeight:600}}>{errors[k]}</p>:null;

  if(status==="ok") return(
    <div style={{textAlign:"center",padding:"40px 16px"}}>
      <div style={{fontSize:52,marginBottom:14}}>🎉</div>
      <h3 style={{fontSize:22,fontWeight:800,color:"var(--dark)",marginBottom:8}}>{tx.ok}</h3>
      <p style={{color:"var(--muted)",fontSize:14,marginBottom:24}}>
        {locale==="es"?"Si no se abre automáticamente, pulsa el botón:":"If it doesn't open automatically:"}
      </p>
      <a href={`https://wa.me/34644462216?text=${encodeURIComponent(buildWaMessage())}`}
        target="_blank" rel="noopener noreferrer"
        style={{display:"inline-flex",alignItems:"center",gap:10,padding:"16px 32px",borderRadius:14,background:"#25D366",color:"#fff",fontWeight:800,fontSize:16,boxShadow:"0 4px 20px rgba(37,211,102,0.3)"}}>
        💬 {locale==="es"?"Abrir WhatsApp":locale==="en"?"Open WhatsApp":"WhatsApp"}
      </a>
    </div>
  );

  return(
    <form name="aplicar" onSubmit={send} autoComplete="on" style={{position:"relative",zIndex:1}}>
      <h2 style={{fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:900,color:"var(--dark)",textAlign:"center",marginBottom:6,letterSpacing:"-.5px"}}>{tx.title}</h2>
      <p style={{color:"var(--muted)",textAlign:"center",marginBottom:28,fontSize:14}}>{tx.sub}</p>

      {/* Nombre */}
      <div style={{marginBottom:10}}>
        <input required autoComplete="name" placeholder={tx.name} style={inp(!!errors.name)}
          value={d.name} onChange={e=>setD({...d,name:e.target.value})}
          onBlur={()=>{if(!d.name.trim())setErrors(p=>({...p,name:tx.req}));else setErrors(p=>({...p,name:""}))}}/>
        <Err k="name"/>
      </div>

      {/* Redes sociales */}
      <div style={{marginBottom:10}}>
        <input required autoComplete="username" placeholder={tx.ig} style={inp(!!errors.ig1)}
          value={d.ig1} onChange={e=>setD({...d,ig1:e.target.value})}
          onBlur={()=>{if(!d.ig1.trim())setErrors(p=>({...p,ig1:tx.req}));else setErrors(p=>({...p,ig1:""}))}}/>
        <Err k="ig1"/>
      </div>
      {showSocial2&&(
        <div style={{marginBottom:10}}>
          <input placeholder={tx.social2} style={inp(false)}
            value={d.social2} onChange={e=>setD({...d,social2:e.target.value})}/>
        </div>
      )}
      {showSocial2&&showSocial3&&(
        <div style={{marginBottom:10}}>
          <input placeholder={tx.social3} style={inp(false)}
            value={d.social3} onChange={e=>setD({...d,social3:e.target.value})}/>
        </div>
      )}
      {(!showSocial2||!showSocial3)&&(
        <button type="button" onClick={()=>{if(!showSocial2)setShowSocial2(true);else setShowSocial3(true);}}
          style={{background:"none",border:"none",color:"var(--pink)",fontSize:13,fontWeight:700,cursor:"pointer",padding:"2px 0 12px",textDecoration:"underline",textDecorationStyle:"dotted"}}>
          {tx.addSocial}
        </button>
      )}

      {/* Teléfono */}
      <div style={{marginBottom:10}}>
        <div style={{display:"flex",gap:8}}>
          <select style={{...selStyle(false),width:130,flexShrink:0}} value={d.prefix} onChange={e=>setD({...d,prefix:e.target.value})}>
            {PREFIXES.map(p=><option key={p.code} value={p.code}>{p.flag} {p.code}</option>)}
          </select>
          <div style={{flex:1}}>
            <input required type="tel" autoComplete="tel-national" placeholder={tx.phone} style={inp(!!errors.phone)}
              value={d.phone}
              onChange={e=>{const v=e.target.value.replace(/[^\d\s\-\(\)]/g,"");setD({...d,phone:v});if(errors.phone&&valPhone(v))setErrors(p=>({...p,phone:""}))}}
              onBlur={()=>{if(!d.phone.trim())setErrors(p=>({...p,phone:tx.req}));else if(!valPhone(d.phone))setErrors(p=>({...p,phone:tx.badPhone}));else setErrors(p=>({...p,phone:""}))}}/>
          </div>
        </div>
        <Err k="phone"/>
      </div>

      {/* Email */}
      <div style={{marginBottom:10}}>
        <input required type="email" autoComplete="email" placeholder={tx.email} style={inp(!!errors.email)}
          value={d.email}
          onChange={e=>{setD({...d,email:e.target.value});if(errors.email&&valEmail(e.target.value))setErrors(p=>({...p,email:""}))}}
          onBlur={()=>{if(!d.email.trim())setErrors(p=>({...p,email:tx.req}));else if(!valEmail(d.email))setErrors(p=>({...p,email:tx.badEmail}));else setErrors(p=>({...p,email:""}))}}/>
        <Err k="email"/>
      </div>

      {/* Ingresos + País */}
      <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <input placeholder={tx.monthlyPh} style={inp(false)}
          value={d.monthly} onChange={e=>setD({...d,monthly:e.target.value})}/>
        <select style={selStyle(false)} value={d.country} onChange={e=>setD({...d,country:e.target.value})}>
          <option value="">{tx.country}</option>
          {countries.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Objetivo + Disponibilidad */}
      <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div>
          <select required style={selStyle(!!errors.goal)} value={d.goal}
            onChange={e=>{setD({...d,goal:e.target.value});setErrors(p=>({...p,goal:""}))}}>
            <option value="">{tx.goal}</option>
            {tx.goals.map(g=><option key={g} value={g}>{g}</option>)}
          </select>
          <Err k="goal"/>
        </div>
        <select style={selStyle(false)} value={d.availability} onChange={e=>setD({...d,availability:e.target.value})}>
          <option value="">{tx.availability}</option>
          {tx.avail.map(a=><option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Textarea */}
      <div style={{marginBottom:20}}>
        <textarea rows={3} placeholder={tx.notesPh} autoComplete="off"
          style={{...inp(false),resize:"vertical",minHeight:80,lineHeight:1.6}}
          value={d.notes} onChange={e=>setD({...d,notes:e.target.value})}/>
      </div>

      <button type="submit" disabled={status==="sending"}
        style={{width:"100%",padding:"17px",borderRadius:14,
          background:status==="sending"?"rgba(196,105,154,0.5)":"linear-gradient(135deg,var(--pink),var(--pink2))",
          color:"#fff",fontWeight:800,fontSize:16,cursor:status==="sending"?"wait":"pointer",
          border:"none",fontFamily:"inherit",transition:"all .2s",letterSpacing:"-.2px",
          boxShadow:"0 4px 20px rgba(196,105,154,0.3)"}}>
        {status==="sending"?(locale==="es"?"Enviando…":"Sending…"):tx.submit}
      </button>
      <p style={{textAlign:"center",color:"var(--muted2)",fontSize:12,marginTop:12}}>{tx.note}</p>
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
