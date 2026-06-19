import type { Metadata } from "next";
import Link from "next/link";
import {
  LOCALES, type Locale, COUNTRIES, LOCALE_COUNTRIES,
  SERVICES, BASE_URL, WA, waLink, waMsg
} from "@/lib/config";
import { TR, t, ta, ta2 } from "@/lib/translations";
import { POSTS } from "@/lib/blog";
import { IMGS } from "@/lib/images";
import MegaNav from "@/components/MegaNav";
import { UnlockSection, ApplyForm, CounterStat } from "@/components/HomeClient";

export async function generateStaticParams() { return LOCALES.map(l => ({ locale: l })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const l = locale as Locale;
  const tr = TR[l] as Record<string,string>;
  return { title: tr.meta_title, description: tr.meta_desc };
}

// OnlyFans OF logo SVG — platform logo sin nombrar
const OFLogo = ({ size=24 }:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke="#00AEEF" strokeWidth="7"/>
    <text x="50" y="67" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="38" fill="#00AEEF">OF</text>
  </svg>
);
const Stars = () => (
  <span style={{display:"flex",gap:2}}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#d97b3a">
        <path d="M7 1l1.5 4.5H13L9.5 8.5l1 4.5L7 10.5l-3.5 2.5 1-4.5L1 5.5h4.5L7 1z"/>
      </svg>
    ))}
  </span>
);
const Arr = ({c="currentColor",s=18}:{c?:string;s?:number}) => (
  <svg width={s} height={s} viewBox="0 0 18 18" fill="none" style={{flexShrink:0}}>
    <path d="M3 9h12M10 4l5 5-5 5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{flexShrink:0,marginTop:1}}>
    <circle cx="10" cy="10" r="9" fill="rgba(200,112,90,0.1)" stroke="rgba(200,112,90,0.3)"/>
    <path d="M6 10l3 3 5-6" stroke="var(--rose)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Avatar = ({name,color}:{name:string;color:string}) => {
  const init=name.split(" ").map((w:string)=>w[0]).join("").slice(0,2).toUpperCase();
  return(
    <div style={{width:52,height:52,borderRadius:"50%",background:`${color}12`,border:`2px solid ${color}35`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <span style={{fontWeight:900,fontSize:18,color}}>{init}</span>
    </div>
  );
};

const CASES=[
  {name:"Sofía R.",loc:"Madrid 🇪🇸",b:"320€",a:"2.140€/mes",tm:"8 sem",p:"+568%",c:"#c8705a",q:"Triipliqué sin mostrar la cara. Los chatters lo hacen tan natural que los fans ni lo notan."},
  {name:"Valentina M.",loc:"Buenos Aires 🇦🇷",b:"0€",a:"1.850€/mes",tm:"6 sem",p:"De 0",c:"#8b6cb0",q:"Empecé de cero. A las 6 semanas ganaba más que en mi trabajo anterior."},
  {name:"Camila R.",loc:"Medellín 🇨🇴",b:"680€",a:"4.200€/mes",tm:"3 meses",p:"+518%",c:"#b8925a",q:"El sistema PPV cambió todo. El 73% de mis ingresos ahora viene de DMs."},
  {name:"Mariana S.",loc:"São Paulo 🇧🇷",b:"R$1.2k",a:"R$9.8k/mes",tm:"3 meses",p:"+717%",c:"#4a9b7a",q:"Me pusieron en el mercado USA. El 80% de mis fans son americanos."},
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const l = locale as Locale;
  const href = waLink(waMsg(l));
  const countryKeys = LOCALE_COUNTRIES[l] ?? [];
  const services = SERVICES[l] ?? [];
  const posts = POSTS.filter(p => p.locale === l);
  const navPosts = posts.slice(0,6).map(p => ({ slug:p.slug, title:p.title }));

  const faqSchema = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":ta2(l,"faqs").map(([q,a])=>({
      "@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}
    })),
  };

  const CTA:Record<Locale,string>={es:"Solicitar análisis gratuito",en:"Request free analysis",fr:"Demander une analyse",de:"Kostenlose Analyse",it:"Analisi gratuita",pt:"Análise gratuita"};

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
      {/* Netlify form detection (hidden) */}
      <form name="aplicar" data-netlify="true" hidden>
        <input name="bot-field"/><input name="name"/>
        <input name="instagram"/><input name="monthly"/>
        <input name="goal"/><input name="country"/><input name="email"/>
      </form>
      <MegaNav locale={l} posts={navPosts}/>

      {/* ═══ HERO ══════════════════════════════════════════ */}
      <section style={{position:"relative",minHeight:"90vh",display:"flex",alignItems:"center",overflow:"hidden",background:"var(--bg)"}}>
        {/* Soft blush blob */}
        <div style={{position:"absolute",top:"-15%",right:"-8%",width:600,height:600,borderRadius:"50%",background:"rgba(245,213,204,0.4)",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-10%",left:"-5%",width:400,height:400,borderRadius:"50%",background:"rgba(245,213,204,0.25)",filter:"blur(60px)",pointerEvents:"none"}}/>

        <div style={{maxWidth:1280,margin:"0 auto",padding:"100px 24px 60px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}} className="hero-grid">
          <div>
            {/* Platform badges */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24,flexWrap:"wrap"}}>
              <div className="badge">
                <span className="dot-live"/>{t(l,"badge")}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:999,background:"rgba(0,174,239,0.06)",border:"1px solid rgba(0,174,239,0.2)"}}>
                <OFLogo size={18}/>
                <span style={{fontSize:11,fontWeight:700,color:"#00aeef",letterSpacing:".06em",textTransform:"uppercase"}}>Manager</span>
              </div>
            </div>

            <h1 style={{fontSize:"clamp(2.6rem,5.5vw,5rem)",fontWeight:900,color:"var(--dark)",lineHeight:1.04,letterSpacing:"-2px",marginBottom:16}}>
              {t(l,"hero_h1")}<br/>
              <span className="g-rose">{t(l,"hero_h1_accent")}</span>
            </h1>
            <p style={{fontSize:17,color:"var(--muted)",lineHeight:1.78,marginBottom:36,maxWidth:500}}>
              {t(l,"hero_desc")}
            </p>

            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:28}}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                {CTA[l]} <Arr c="#fff"/>
              </a>
              <Link href={`/${l}/#form`} className="btn btn-outline-rose">
                {l==="es"?"Ver formulario":l==="en"?"Apply now":l==="fr"?"Candidater":"Bewerben"}
              </Link>
            </div>
            <p style={{fontSize:12,color:"var(--muted2)"}}>{t(l,"hero_trust")}</p>

            {/* Social proof card */}
            <div style={{marginTop:28,padding:"16px 20px",background:"var(--bg2)",borderRadius:16,border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:14,maxWidth:400,boxShadow:"0 2px 12px rgba(200,112,90,0.08)"}}>
              <div style={{display:"flex"}}>
                {["SR","VM","CR","MS"].map((init,i)=>(
                  <div key={i} style={{width:36,height:36,borderRadius:"50%",marginLeft:i>0?-10:0,border:"2px solid var(--bg)",background:["#c8705a","#8b6cb0","#b8925a","#4a9b7a"][i]+"18",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontWeight:900,fontSize:11,color:["#c8705a","#8b6cb0","#b8925a","#4a9b7a"][i]}}>{init}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><Stars/><span style={{fontWeight:800,color:"var(--dark)",fontSize:15}}>4.9</span></div>
                <p style={{fontSize:12,color:"var(--muted)"}}>+200 {l==="es"?"creadoras activas":l==="en"?"active creators":"créatrices"}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="hero-img" style={{position:"relative"}}>
            <div style={{position:"absolute",width:440,height:440,borderRadius:"50%",background:"rgba(245,213,204,0.5)",filter:"blur(60px)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
            <div style={{borderRadius:28,overflow:"hidden",boxShadow:"0 32px 80px rgba(200,112,90,0.15)",aspectRatio:"4/5",position:"relative"}}>
              <img src={IMGS.hero} alt="Creator managed by VixenAgency" width={520} height={650}
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",display:"block"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,18,16,0.55) 0%,transparent 55%)"}}/>
              <div style={{position:"absolute",bottom:22,left:18,right:18,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(16px)",borderRadius:14,padding:"14px 18px"}}>
                <p style={{fontSize:10,color:"var(--muted)",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:600}}>Camila R. · Medellín 🇨🇴</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{textAlign:"center"}}><p style={{fontSize:10,color:"var(--muted2)"}}>antes</p><p style={{fontWeight:800,fontSize:15,color:"rgba(26,18,16,0.25)"}}>680€</p></div>
                  <div style={{flex:1,margin:"0 10px"}}><div style={{height:3,borderRadius:2,background:"linear-gradient(90deg,var(--rose-lt),var(--rose))"}}/><p style={{fontSize:10,color:"var(--muted2)",textAlign:"center",marginTop:2}}>3 meses</p></div>
                  <div style={{textAlign:"center"}}><p style={{fontSize:10,color:"var(--muted2)"}}>después</p><p style={{fontWeight:900,fontSize:20,color:"var(--rose)"}}>4.200€</p></div>
                </div>
              </div>
            </div>
            <div style={{position:"absolute",top:28,right:-14,background:"var(--dark)",color:"#fff",borderRadius:14,padding:"12px 16px",boxShadow:"0 8px 28px rgba(26,18,16,0.2)",textAlign:"center"}}>
              <p style={{fontSize:20,fontWeight:900,color:"var(--rose2)",lineHeight:1}}>+340%</p>
              <p style={{fontSize:10,color:"rgba(255,255,255,0.45)",marginTop:2}}>media</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PLATAFORMAS TICKER ════════════════════════════ */}
      <div style={{background:"var(--bg2)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",padding:"12px 0"}}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {Array(18).fill(0).map((_,i)=>(
              <span key={i} style={{display:"inline-flex",alignItems:"center",gap:16,padding:"0 28px",fontSize:12,fontWeight:700,color:"var(--muted)",whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:"0.08em"}}>
                <OFLogo size={18}/>
                {l==="es"?"Gestión profesional":l==="en"?"Professional management":l==="fr"?"Gestion pro":l==="de"?"Professionelles Management":"Gestione pro"}
                <svg width="5" height="5" viewBox="0 0 5 5" fill="var(--rose-lt)"><circle cx="2.5" cy="2.5" r="2.5"/></svg>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ STATS ════════════════════════════════════════ */}
      <section style={{padding:"64px 24px",background:"#fff"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div className="stats-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderRadius:24,overflow:"hidden",border:"1px solid var(--border-d)",boxShadow:"0 4px 24px rgba(200,112,90,0.07)"}}>
            {([
              ["+340%",l==="es"?"aumento medio de ingresos":l==="en"?"avg income increase":"hausse des revenus","var(--rose)"],
              ["+200",l==="es"?"creadoras gestionadas":l==="en"?"creators managed":"Creator","#8b6cb0"],
              ["30d",l==="es"?"primeros resultados":l==="en"?"first results":"premiers résultats","var(--gold)"],
              ["24/7",l==="es"?"chatters activos":l==="en"?"active chatters":"Chatter activi","#4a9b7a"],
            ] as [string,string,string][]).map(([v,lbl,c],i)=>(
              <div key={v} style={{padding:"36px 20px",background:"#fff",borderRight:i<3?"1px solid var(--border-d)":"none"}}>
                <CounterStat value={v} label={lbl} color={c}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNLOCK — rosa claro ══════════════════════════ */}
      <UnlockSection locale={l}/>

      {/* ═══ SERVICIOS ════════════════════════════════════ */}
      <section id="servicios" style={{padding:"88px 24px",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <span className="lbl">{l==="es"?"Lo que hacemos":l==="en"?"What we do":l==="fr"?"Ce que nous faisons":"Was wir tun"}</span>
            <h2 style={{fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"var(--dark)",letterSpacing:"-1.5px",lineHeight:1.1,marginBottom:10}}>
              {t(l,"services_title")}
            </h2>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,color:"var(--muted)",fontSize:14}}>
              <OFLogo size={18}/> <span>{l==="es"?"Gestión especializada en OnlyFans":l==="en"?"Specialized management":"Gestion spécialisée"}</span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
            {ta2(l,"sv").map(([icon,title,desc],i)=>(
              <div key={i} className="card" style={{padding:"28px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:["linear-gradient(90deg,var(--rose),var(--rose2))","linear-gradient(90deg,#8b6cb0,#a98fd4)","linear-gradient(90deg,var(--gold),var(--gold2))","linear-gradient(90deg,#4a9b7a,#6dc4a0)","linear-gradient(90deg,var(--rose),var(--gold))","linear-gradient(90deg,#8b6cb0,var(--rose))"][i%6]}}/>
                <div style={{width:50,height:50,borderRadius:14,background:"var(--rose-bg)",border:"1px solid var(--rose-lt)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16}}>
                  {icon}
                </div>
                <h3 style={{fontWeight:700,color:"var(--dark)",fontSize:17,marginBottom:8}}>{title}</h3>
                <p style={{color:"var(--muted)",fontSize:13,lineHeight:1.65,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{desc}</p>
              </div>
            ))}
          </div>
          {services.length>0&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:24}}>
              {services.map(s=>(
                <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                  style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,padding:"7px 16px",borderRadius:999,background:"var(--bg2)",border:"1px solid var(--border)",color:"var(--muted)",fontWeight:600}}>
                  {s.icon} {s.kw}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ RESULTADOS ════════════════════════════════════ */}
      <section id="resultados" style={{padding:"88px 24px",background:"var(--bg2)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <span className="lbl">{l==="es"?"Casos reales":l==="en"?"Real cases":l==="fr"?"Cas réels":"Echte Fälle"}</span>
            <h2 style={{fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"var(--dark)",letterSpacing:"-1px",lineHeight:1.1,marginBottom:8}}>
              {t(l,"results_title")}
            </h2>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8}}>
              <Stars/><span style={{fontWeight:800,color:"var(--dark)",fontSize:17}}>4.9</span>
              <span style={{color:"var(--muted)",fontSize:14}}>· 183 {l==="es"?"reseñas verificadas":l==="en"?"verified reviews":"avis vérifiés"}</span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(268px,1fr))",gap:18}}>
            {CASES.map((c,i)=>(
              <div key={i} className="card" style={{overflow:"hidden"}}>
                <div style={{height:4,background:c.c}}/>
                <div style={{padding:"24px 22px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
                    <Avatar name={c.name} color={c.c}/>
                    <div>
                      <p style={{fontWeight:800,color:"var(--dark)",fontSize:16}}>{c.name}</p>
                      <p style={{color:"var(--muted)",fontSize:12,marginTop:2}}>{c.loc}</p>
                    </div>
                    <div style={{marginLeft:"auto",textAlign:"right"}}>
                      <p style={{fontSize:10,color:"var(--muted2)",textTransform:"uppercase"}}>crecimiento</p>
                      <p style={{fontWeight:900,fontSize:20,color:c.c,lineHeight:1}}>{c.p}</p>
                    </div>
                  </div>
                  <Stars/>
                  <div style={{display:"flex",alignItems:"center",gap:8,margin:"14px 0"}}>
                    <div style={{flex:1,padding:"10px 12px",background:"var(--bg2)",borderRadius:10,textAlign:"center"}}>
                      <p style={{fontSize:10,color:"var(--muted2)",textTransform:"uppercase",marginBottom:3}}>antes</p>
                      <p style={{fontWeight:800,fontSize:15,color:"rgba(26,18,16,0.25)"}}>{c.b}</p>
                    </div>
                    <div style={{color:c.c,fontSize:20,fontWeight:700}}>→</div>
                    <div style={{flex:1,padding:"10px 12px",background:`${c.c}0d`,border:`1px solid ${c.c}25`,borderRadius:10,textAlign:"center"}}>
                      <p style={{fontSize:10,color:"var(--muted2)",textTransform:"uppercase",marginBottom:3}}>después</p>
                      <p style={{fontWeight:900,fontSize:16,color:c.c}}>{c.a}</p>
                    </div>
                  </div>
                  <p style={{fontSize:11,color:"var(--muted2)",marginBottom:10,fontWeight:600}}>{l==="es"?"En":l==="en"?"In":"En"} <strong style={{color:"var(--dark)"}}>{c.tm}</strong></p>
                  <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.65,fontStyle:"italic",borderLeft:`2px solid ${c.c}`,paddingLeft:12}}>«{c.q}»</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESO ══════════════════════════════════════ */}
      <section id="como" style={{padding:"80px 24px",background:"#fff"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <span className="lbl">{l==="es"?"Proceso":l==="en"?"Process":l==="fr"?"Processus":"Prozess"}</span>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.6rem)",fontWeight:900,color:"var(--dark)",letterSpacing:"-1px"}}>{t(l,"how_title")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:28}}>
            {ta2(l,"how").map(([n,title,desc],i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{width:60,height:60,borderRadius:"50%",background:["var(--rose-bg)","rgba(139,108,176,0.08)","rgba(196,164,90,0.08)","rgba(74,155,122,0.08)"][i],border:`2px solid ${["var(--rose-lt)","rgba(139,108,176,0.3)","rgba(196,164,90,0.3)","rgba(74,155,122,0.3)"][i]}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:22,color:["var(--rose)","#8b6cb0","var(--gold)","#4a9b7a"][i],margin:"0 auto 20px"}}>
                  {i+1}
                </div>
                <h3 style={{fontWeight:700,color:"var(--dark)",fontSize:16,marginBottom:8}}>{title}</h3>
                <p style={{color:"var(--muted)",fontSize:13,lineHeight:1.65}}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:44}}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose">
              {CTA[l]} <Arr c="#fff"/>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FORMULARIO ═══════════════════════════════════ */}
      <section id="form" style={{padding:"88px 24px",background:"var(--bg2)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:500,borderRadius:"50%",background:"rgba(245,213,204,0.3)",filter:"blur(80px)",pointerEvents:"none"}}/>
        <div style={{maxWidth:660,margin:"0 auto",position:"relative"}}>
          <div className="card" style={{padding:"48px 44px",boxShadow:"0 20px 60px rgba(200,112,90,0.1)"}}>
            {/* OF logo en el form */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 20px",background:"rgba(0,174,239,0.06)",borderRadius:999,border:"1px solid rgba(0,174,239,0.15)"}}>
                <OFLogo size={22}/>
                <span style={{fontSize:12,fontWeight:700,color:"#0099cc",letterSpacing:"0.06em",textTransform:"uppercase"}}>Management Application</span>
              </div>
            </div>
            <ApplyForm locale={l} href={href}/>
          </div>
        </div>
      </section>

      {/* ═══ PAÍSES ═══════════════════════════════════════ */}
      {countryKeys.length>1&&(
        <section style={{padding:"64px 24px",background:"#fff"}}>
          <div style={{maxWidth:1080,margin:"0 auto",textAlign:"center"}}>
            <span className="lbl">{l==="es"?"Cobertura":l==="en"?"Coverage":"Couverture"}</span>
            <h2 style={{fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:900,color:"var(--dark)",letterSpacing:"-0.5px",marginBottom:28}}>
              {l==="es"?"España, América Latina y mercados internacionales":l==="en"?"Americas and worldwide":"DACH und weltweit"}
            </h2>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"}}>
              {countryKeys.map(ck=>{
                const c=COUNTRIES[ck];
                return(
                  <Link key={ck} href={`/${l}/${ck}/`} className="card"
                    style={{padding:"10px 18px",display:"inline-flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:20}}>{c.flag}</span>
                    <div style={{textAlign:"left"}}>
                      <p style={{fontWeight:700,color:"var(--dark)",fontSize:13}}>{c.name}</p>
                      <p style={{color:"var(--muted)",fontSize:11}}>{c.city}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═════════════════════════════════════════ */}
      <section style={{padding:"88px 24px",background:"var(--bg2)"}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <span className="lbl">FAQ</span>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.4rem)",fontWeight:900,color:"var(--dark)",letterSpacing:"-1px"}}>{t(l,"faq_title")}</h2>
          </div>
          <div style={{display:"grid",gap:8}}>
            {ta2(l,"faqs").map(([q,a],i)=>(
              <details key={i} className="card" style={{padding:0}}>
                <summary style={{padding:"18px 22px",fontWeight:700,color:"var(--dark)",cursor:"pointer",fontSize:15,display:"flex",justifyContent:"space-between",alignItems:"center",userSelect:"none",listStyle:"none"}}>
                  <span style={{flex:1,paddingRight:16}}>{q}</span>
                  <span className="plus-icon" style={{color:"var(--rose)",fontSize:24,fontWeight:300,lineHeight:1,flexShrink:0}}>+</span>
                </summary>
                <div style={{padding:"0 22px 18px",borderTop:"1px solid var(--border-d)"}}>
                  <p style={{color:"var(--muted)",lineHeight:1.75,fontSize:14,paddingTop:14}}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BLOG ════════════════════════════════════════ */}
      {posts.length>0&&(
        <section style={{padding:"88px 24px",background:"#fff"}}>
          <div style={{maxWidth:1200,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:14}}>
              <div>
                <span className="lbl">Blog</span>
                <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:900,color:"var(--dark)",letterSpacing:"-0.5px"}}>
                  {l==="es"?"Guías y estrategias":l==="en"?"Guides & strategies":"Guides"}
                </h2>
              </div>
              <Link href={`/${l}/blog/`} className="btn btn-outline" style={{fontSize:13,padding:"9px 18px",borderRadius:10,flexShrink:0}}>
                {l==="es"?"Ver todos":l==="en"?"View all":"Tous"} <Arr s={14}/>
              </Link>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:14}}>
              {posts.slice(0,3).map(p=>(
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{textDecoration:"none"}}>
                  <article className="card" style={{padding:24,height:"100%",display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <span style={{fontSize:10,fontWeight:700,color:"var(--rose)",textTransform:"uppercase",letterSpacing:"0.08em",background:"var(--rose-bg)",border:"1px solid var(--rose-lt)",padding:"2px 8px",borderRadius:999}}>{p.kw[0]}</span>
                      <span style={{fontSize:11,color:"var(--muted2)"}}>{p.date}</span>
                    </div>
                    <h3 style={{fontWeight:700,color:"var(--dark)",fontSize:15,marginBottom:8,lineHeight:1.35,flex:1}}>{p.title}</h3>
                    <p style={{color:"var(--muted)",fontSize:13,lineHeight:1.6,marginBottom:14,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{p.excerpt}</p>
                    <div style={{display:"flex",alignItems:"center",gap:5,color:"var(--rose)",fontSize:13,fontWeight:700}}>
                      {l==="es"?"Leer":l==="en"?"Read":"Lire"} <Arr s={14} c="var(--rose)"/>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA FINAL — dark strip ══════════════════════ */}
      <section style={{padding:"88px 24px",background:"var(--dark)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:500,height:400,borderRadius:"50%",background:"rgba(200,112,90,0.08)",filter:"blur(90px)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:680,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
            <OFLogo size={40}/>
          </div>
          <h2 style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",fontWeight:900,color:"#fff",letterSpacing:"-1.5px",marginBottom:14,lineHeight:1.08,textTransform:"uppercase"}}>
            {t(l,"cta_title")}
          </h2>
          <p style={{color:"rgba(255,255,255,0.5)",lineHeight:1.75,marginBottom:44,fontSize:15}}>{t(l,"cta_sub")}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-rose" style={{fontSize:16,padding:"18px 48px"}}>
            {t(l,"cta_btn")} <Arr c="#fff" s={20}/>
          </a>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.2)",marginTop:18}}>{t(l,"cta_note")}</p>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════ */}
      <footer style={{padding:"56px 24px 28px",background:"#0d0a09",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div className="footer-4" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36,marginBottom:44}}>
            <div className="footer-brand">
              <div style={{fontSize:24,fontWeight:900,marginBottom:14,letterSpacing:"-0.5px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:"var(--rose2)"}}>Vixen</span><span style={{color:"#fff"}}>Agency</span>
                <OFLogo size={22}/>
              </div>
              <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",lineHeight:1.7,maxWidth:260,marginBottom:20}}>{t(l,"footer_desc")}</p>
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{display:"inline-flex",alignItems:"center",gap:8,color:"#4ade80",fontWeight:700,fontSize:14}}>
                <span>💬</span> +{WA.slice(0,2)} {WA.slice(2,4)} {WA.slice(4,7)} {WA.slice(7,10)} {WA.slice(10)}
              </a>
            </div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,0.25)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:16}}>{l==="es"?"Servicios":l==="en"?"Services":"Services"}</p>
              <div style={{display:"grid",gap:8}}>
                {services.slice(0,5).map(s=>(
                  <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`} style={{fontSize:13,color:"rgba(255,255,255,0.35)"}}>{s.kw}</Link>
                ))}
              </div>
            </div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,0.25)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:16}}>{l==="es"?"Países":l==="en"?"Countries":"Pays"}</p>
              <div style={{display:"grid",gap:8}}>
                {countryKeys.slice(0,7).map(ck=>{
                  const c=COUNTRIES[ck];
                  return(<Link key={ck} href={`/${l}/${ck}/`} style={{fontSize:13,color:"rgba(255,255,255,0.35)",display:"flex",gap:6,alignItems:"center"}}><span>{c.flag}</span>{c.name}</Link>);
                })}
              </div>
            </div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,0.25)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:16}}>Blog</p>
              <div style={{display:"grid",gap:8,marginBottom:20}}>
                {posts.slice(0,4).map(p=>(<Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{fontSize:12,color:"rgba(255,255,255,0.28)",lineHeight:1.35}}>{p.title.slice(0,34)}…</Link>))}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {LOCALES.map(loc=>(
                  <Link key={loc} href={`/${loc}/`}
                    style={{fontSize:10,padding:"3px 7px",borderRadius:5,fontFamily:"monospace",textTransform:"uppercase",fontWeight:800,
                      color:loc===l?"var(--rose2)":"rgba(255,255,255,0.25)",
                      background:loc===l?"rgba(200,112,90,0.12)":"rgba(255,255,255,0.04)",
                      border:`1px solid ${loc===l?"rgba(200,112,90,0.35)":"rgba(255,255,255,0.08)"}`}}>
                    {loc}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.15)"}}>© 2026 VixenAgency · {t(l,"footer_rights")}</p>
            <p style={{fontSize:11,color:"rgba(255,255,255,0.08)"}}>{t(l,"footer_disclaimer")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
