"use client";
import { useState, useEffect, useRef } from "react";

export function UnlockSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:.1});
    obs.observe(el); return ()=>obs.disconnect();
  },[]);

  const words = ({es:["MULTIPLICA","TU","POTENCIAL"],en:["UNLOCK","YOUR","POTENTIAL"],fr:["LIBÈRE","TON","POTENTIEL"],de:["ENTFALTE","DEIN","POTENZIAL"],it:["LIBERA","IL TUO","POTENZIALE"],pt:["LIBERA","SEU","POTENCIAL"]} as Record<string,string[]>)[locale]??["MULTIPLICA","TU","POTENCIAL"];
  const imgs = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=face&q=80",
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=120&h=120&fit=crop&crop=top&q=80",
    "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=120&h=120&fit=crop&crop=face&q=80",
  ];
  return (
    <div ref={ref} style={{padding:"72px 0",overflow:"hidden",userSelect:"none",background:"var(--bg2)"}}>
      {words.map((word,i)=>(
        <div key={i} className="unlock-row" style={{
          justifyContent:i%2===0?"flex-start":"flex-end",
          paddingLeft:i%2===0?"5vw":"0",paddingRight:i%2!==0?"5vw":"0",
          opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",
          transition:`opacity .7s ease ${i*.15}s,transform .7s ease ${i*.15}s`,
        }}>
          {i%2===0&&<img src={imgs[i%imgs.length]} alt="" className="unlock-img" style={{opacity:vis?1:0,transition:`opacity .5s ease ${i*.2+.3}s`}}/>}
          <span className="unlock-text g-rose">{word}</span>
          {i%2!==0&&<img src={imgs[(i+1)%imgs.length]} alt="" className="unlock-img" style={{opacity:vis?1:0,transition:`opacity .5s ease ${i*.2+.3}s`}}/>}
        </div>
      ))}
    </div>
  );
}

export function ApplyForm({ locale, href }: { locale: string; href: string }) {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");
  const [d, setD] = useState({name:"",instagram:"",monthly:"",goal:"",country:"",email:""});

  const tx = ({
    es:{title:"¿Lista para multiplicar tus ingresos?",sub:"Cuéntanos sobre tu cuenta. Análisis gratuito en menos de 24h.",name:"Tu nombre *",ig:"Instagram / TikTok *",monthly:"Ingresos actuales en OnlyFans",goal:"¿Cuál es tu objetivo? *",country:"País",email:"Email (para enviarte el análisis)",submit:"Solicitar análisis gratuito →",ok:"¡Perfecto! 🎉 Te contactamos en menos de 24 horas.",err:"Algo falló. Escríbenos por WhatsApp.",goals:["Empezar desde cero","Aumentar lo que ya gano","Llegar a +5.000€/mes","Quiero máximo anonimato","Otro objetivo"],note:"Sin compromiso · Sin cuota inicial · 100% confidencial"},
    en:{title:"Ready to multiply your income?",sub:"Tell us about your account. Free analysis within 24 hours.",name:"Your name *",ig:"Instagram / TikTok *",monthly:"Current OnlyFans income",goal:"What's your goal? *",country:"Country",email:"Email (to send you the analysis)",submit:"Request free analysis →",ok:"Perfect! 🎉 We'll contact you within 24 hours.",err:"Something went wrong. Message us on WhatsApp.",goals:["Start from scratch","Increase my current income","Reach $5,000+/month","I want full anonymity","Other"],note:"No commitment · No upfront fee · 100% confidential"},
    fr:{title:"Prête à multiplier tes revenus ?",sub:"Parle-nous de ton compte. Analyse gratuite en moins de 24h.",name:"Ton prénom *",ig:"Instagram / TikTok *",monthly:"Revenus actuels sur OnlyFans",goal:"Quel est ton objectif ? *",country:"Pays",email:"Email (pour t'envoyer l'analyse)",submit:"Demander une analyse gratuite →",ok:"Parfait ! 🎉 On te contacte dans moins de 24h.",err:"Erreur. Écris-nous sur WhatsApp.",goals:["Commencer de zéro","Augmenter mes revenus","Atteindre 5.000€+/mois","Anonymat total","Autre"],note:"Sans engagement · Sans frais · 100% confidentiel"},
    de:{title:"Bereit dein Einkommen zu multiplizieren?",sub:"Erzähl uns von deinem Account. Kostenlose Analyse in 24h.",name:"Dein Name *",ig:"Instagram / TikTok *",monthly:"Aktuelle OnlyFans-Einnahmen",goal:"Was ist dein Ziel? *",country:"Land",email:"E-Mail (für die Analyse)",submit:"Kostenlose Analyse anfordern →",ok:"Super! 🎉 Wir melden uns innerhalb von 24h.",err:"Fehler. Schreib uns auf WhatsApp.",goals:["Von Null starten","Einnahmen steigern","5.000€+/Monat erreichen","Vollständige Anonymität","Anderes Ziel"],note:"Unverbindlich · Keine Vorauszahlung · 100% vertraulich"},
    it:{title:"Pronta a moltiplicare i tuoi guadagni?",sub:"Raccontaci del tuo account. Analisi gratuita entro 24 ore.",name:"Il tuo nome *",ig:"Instagram / TikTok *",monthly:"Guadagni attuali su OnlyFans",goal:"Qual è il tuo obiettivo? *",country:"Paese",email:"Email (per inviarti l'analisi)",submit:"Richiedi analisi gratuita →",ok:"Perfetto! 🎉 Ti contatteremo entro 24 ore.",err:"Errore. Scrivici su WhatsApp.",goals:["Iniziare da zero","Aumentare i guadagni","Raggiungere 5.000€+/mese","Anonimato totale","Altro"],note:"Senza impegno · Senza costi · 100% riservato"},
    pt:{title:"Pronta para multiplicar seus ganhos?",sub:"Fale-nos sobre sua conta. Análise gratuita em menos de 24h.",name:"Seu nome *",ig:"Instagram / TikTok *",monthly:"Ganhos atuais no OnlyFans",goal:"Qual é o seu objetivo? *",country:"País",email:"Email (para enviar a análise)",submit:"Solicitar análise gratuita →",ok:"Perfeito! 🎉 Entraremos em contato em menos de 24h.",err:"Erro. Escreva-nos pelo WhatsApp.",goals:["Começar do zero","Aumentar meus ganhos","Chegar a 5.000€+/mês","Anonimato total","Outro objetivo"],note:"Sem compromisso · Sem taxa · 100% confidencial"},
  } as Record<string,{title:string;sub:string;name:string;ig:string;monthly:string;goal:string;country:string;email:string;submit:string;ok:string;err:string;goals:string[];note:string}>)[locale]??({} as {title:string;sub:string;name:string;ig:string;monthly:string;goal:string;country:string;email:string;submit:string;ok:string;err:string;goals:string[];note:string});

  async function send(e: React.FormEvent){
    e.preventDefault(); setStatus("sending");
    try{
      const body=new URLSearchParams({"form-name":"aplicar",...d});
      const r=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:body.toString()});
      setStatus(r.ok?"ok":"err");
    }catch{setStatus("err");}
  }

  if(status==="ok") return (
    <div style={{textAlign:"center",padding:"48px 16px"}}>
      <div style={{fontSize:56,marginBottom:20}}>🎉</div>
      <h3 style={{fontSize:22,fontWeight:800,color:"var(--dark)",marginBottom:10}}>{tx.ok}</h3>
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:20,padding:"14px 28px",borderRadius:14,background:"#25D366",color:"#fff",fontWeight:700,fontSize:15}}>
        💬 WhatsApp
      </a>
    </div>
  );

  return(
    <div>
      <h2 style={{fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:900,color:"var(--dark)",textAlign:"center",marginBottom:8,letterSpacing:"-.5px"}}>{tx.title}</h2>
      <p style={{color:"var(--muted)",textAlign:"center",marginBottom:36,fontSize:15}}>{tx.sub}</p>
      <form name="aplicar" onSubmit={send} data-netlify="true" netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="aplicar"/>
        <input type="hidden" name="bot-field"/>
        <div className="form-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          <input required className="input" placeholder={tx.name} value={d.name} onChange={e=>setD({...d,name:e.target.value})}/>
          <input required className="input" placeholder={tx.ig} value={d.instagram} onChange={e=>setD({...d,instagram:e.target.value})}/>
          <input className="input" placeholder={tx.monthly} value={d.monthly} onChange={e=>setD({...d,monthly:e.target.value})}/>
          <input className="input" placeholder={tx.country} value={d.country} onChange={e=>setD({...d,country:e.target.value})}/>
        </div>
        <select required className="input" style={{marginBottom:12,cursor:"pointer",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c8705a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center",paddingRight:"40px"}} value={d.goal} onChange={e=>setD({...d,goal:e.target.value})}>
          <option value="">{tx.goal}</option>
          {tx.goals?.map(g=><option key={g} value={g}>{g}</option>)}
        </select>
        <input className="input" type="email" placeholder={tx.email} value={d.email} onChange={e=>setD({...d,email:e.target.value})} style={{marginBottom:20}}/>
        <button type="submit" disabled={status==="sending"} style={{width:"100%",padding:"17px",borderRadius:14,background:status==="sending"?"rgba(200,112,90,0.5)":"var(--rose)",color:"#fff",fontWeight:800,fontSize:16,cursor:status==="sending"?"wait":"pointer",border:"none",fontFamily:"inherit",transition:"all .2s",letterSpacing:"-.2px",boxShadow:"0 4px 20px rgba(200,112,90,0.3)"}}>
          {status==="sending"?"Enviando…":tx.submit}
        </button>
        {status==="err"&&<p style={{color:"#e05252",textAlign:"center",marginTop:12,fontSize:13}}>{tx.err}</p>}
        <p style={{textAlign:"center",color:"var(--muted2)",fontSize:12,marginTop:12}}>{tx.note}</p>
      </form>
    </div>
  );
}

export function CounterStat({value,label,color="var(--rose)"}:{value:string;label:string;color?:string}){
  const ref=useRef<HTMLDivElement>(null);
  const[vis,setVis]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:.3});
    obs.observe(el);return()=>obs.disconnect();
  },[]);
  return(
    <div ref={ref} style={{textAlign:"center",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"opacity .6s,transform .6s"}}>
      <div style={{fontSize:"clamp(2.2rem,4.5vw,3.8rem)",fontWeight:900,color,letterSpacing:"-2px",lineHeight:1}}>{value}</div>
      <div style={{fontSize:13,color:"var(--muted)",marginTop:8,fontWeight:500}}>{label}</div>
    </div>
  );
}
