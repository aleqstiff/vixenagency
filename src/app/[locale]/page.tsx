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

const Stars = () => (
  <span style={{ display:"flex", gap:2 }}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#d4826a">
        <path d="M7 1l1.5 4.5H13L9.5 8.5l1 4.5L7 10.5l-3.5 2.5 1-4.5L1 5.5h4.5L7 1z"/>
      </svg>
    ))}
  </span>
);
const Arr = ({c="#fff",s=18}:{c?:string;s?:number}) => (
  <svg width={s} height={s} viewBox="0 0 18 18" fill="none" style={{flexShrink:0}}>
    <path d="M3 9h12M10 4l5 5-5 5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CASES = [
  { name:"Sofía R.", loc:"Madrid 🇪🇸", b:"320€", a:"2.140€/mes", t:"8 sem", p:"+568%", c:"#d4826a", q:"Triipliqué sin mostrar la cara. Los chatters lo hacen tan natural que los fans ni lo notan." },
  { name:"Valentina M.", loc:"Buenos Aires 🇦🇷", b:"0€", a:"1.850€/mes", t:"6 sem", p:"De 0", c:"#8b6cb0", q:"Empecé de cero. A las 6 semanas ganaba más que en mi trabajo anterior." },
  { name:"Camila R.", loc:"Medellín 🇨🇴", b:"680€", a:"4.200€/mes", t:"3 meses", p:"+518%", c:"#c4a45a", q:"El sistema PPV cambió todo. El 73% de mis ingresos ahora viene de DMs." },
  { name:"Mariana S.", loc:"São Paulo 🇧🇷", b:"R$1.2k", a:"R$9.8k/mes", t:"3 meses", p:"+717%", c:"#4a9b7a", q:"Me pusieron en el mercado USA. El 80% de mis fans son americanos." },
];

const Avatar = ({name,color}:{name:string;color:string}) => {
  const init = name.split(" ").map((w:string)=>w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div style={{width:52,height:52,borderRadius:"50%",background:`${color}18`,border:`2px solid ${color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <span style={{fontWeight:900,fontSize:18,color}}>{init}</span>
    </div>
  );
};

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
  const orgSchema = {
    "@context":"https://schema.org","@type":"LocalBusiness","name":"VixenAgency","url":BASE_URL,
    "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"183","bestRating":"5"},
    "areaServed":["ES","MX","AR","CO","CL","PE","US","CA","FR","DE","IT","BR"],
  };

  const CTA:Record<Locale,string> = {es:"Solicitar análisis gratuito",en:"Request free analysis",fr:"Demander une analyse",de:"Kostenlose Analyse",it:"Analisi gratuita",pt:"Análise gratuita"};
  const BEFORE:Record<Locale,string> = {es:"Antes",en:"Before",fr:"Avant",de:"Vorher",it:"Prima",pt:"Antes"};
  const AFTER:Record<Locale,string> = {es:"Después",en:"After",fr:"Après",de:"Nachher",it:"Dopo",pt:"Depois"};

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(orgSchema)}}/>
      {/* Netlify form detection */}
      <form name="aplicar" data-netlify="true" style={{display:"none"}}>
        <input name="name"/><input name="instagram"/><input name="monthly"/>
        <input name="goal"/><input name="country"/><input name="email"/>
      </form>

      <MegaNav locale={l} posts={navPosts}/>

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section style={{position:"relative",minHeight:"95vh",display:"flex",alignItems:"center",overflow:"hidden",background:"var(--bg)"}}>
        {/* Grid texture */}
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
        {/* Rose glow */}
        <div style={{position:"absolute",top:"-20%",right:"-10%",width:700,height:700,borderRadius:"50%",background:"rgba(212,130,106,0.06)",filter:"blur(100px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-20%",left:"-10%",width:600,height:600,borderRadius:"50%",background:"rgba(124,58,237,0.05)",filter:"blur(100px)",pointerEvents:"none"}}/>

        <div style={{maxWidth:1280,margin:"0 auto",padding:"100px 24px 60px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}} className="hero-grid">
          <div>
            <div className="badge" style={{marginBottom:28}}>
              <span className="dot-live"/>{t(l,"badge")}
            </div>
            <h1 style={{fontSize:"clamp(2.8rem,6vw,5.5rem)",fontWeight:900,color:"#fff",lineHeight:1.02,letterSpacing:"-2px",marginBottom:20,textTransform:"uppercase"}}>
              {t(l,"hero_h1")}<br/>
              <span className="g-rose" style={{fontSize:"clamp(2.4rem,5.5vw,5rem)"}}>{t(l,"hero_h1_accent")}</span>
            </h1>
            <p style={{fontSize:17,color:"rgba(255,255,255,0.55)",lineHeight:1.75,marginBottom:36,maxWidth:500}}>
              {t(l,"hero_desc")}
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:28}}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-white" style={{fontSize:15,padding:"17px 36px"}}>
                {CTA[l]} <Arr c="#080808"/>
              </a>
              <Link href={`/${l}/#form`} className="btn btn-outline" style={{fontSize:14}}>
                {l==="es"?"Ver el formulario":l==="en"?"See application":l==="fr"?"Voir le formulaire":"Formular sehen"}
              </Link>
            </div>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.2)"}}>{t(l,"hero_trust")}</p>

            {/* Social proof */}
            <div style={{marginTop:32,padding:"18px 20px",background:"rgba(255,255,255,0.04)",borderRadius:16,border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:16,maxWidth:400}}>
              <div style={{display:"flex"}}>
                {["SR","VM","CR","MS"].map((init,i)=>(
                  <div key={i} style={{width:36,height:36,borderRadius:"50%",marginLeft:i>0?-10:0,border:"2px solid var(--bg)",background:["#d4826a","#8b6cb0","#c4a45a","#4a9b7a"][i]+"22",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontWeight:900,fontSize:11,color:["#d4826a","#8b6cb0","#c4a45a","#4a9b7a"][i]}}>{init}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <Stars/>
                  <span style={{fontWeight:800,color:"#fff",fontSize:15}}>4.9</span>
                </div>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>+200 {l==="es"?"creadoras activas":l==="en"?"active creators":"creator"}</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="hero-img" style={{position:"relative"}}>
            <div style={{position:"absolute",width:460,height:460,borderRadius:"50%",background:"rgba(212,130,106,0.1)",filter:"blur(80px)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
            <div style={{borderRadius:28,overflow:"hidden",boxShadow:"0 40px 120px rgba(0,0,0,0.7)",aspectRatio:"4/5",position:"relative"}}>
              <img src={IMGS.hero} alt="OnlyFans creator VixenAgency" width={520} height={650}
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",display:"block"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,8,8,0.85) 0%,transparent 50%)"}}/>
              {/* Floating result */}
              <div style={{position:"absolute",bottom:24,left:18,right:18,background:"rgba(8,8,8,0.9)",backdropFilter:"blur(20px)",borderRadius:16,padding:"16px 18px",border:"1px solid rgba(255,255,255,0.1)"}}>
                <p style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>Camila R. · Medellín 🇨🇴</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{textAlign:"center"}}>
                    <p style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>antes</p>
                    <p style={{fontWeight:800,fontSize:16,color:"rgba(255,255,255,0.2)"}}>680€</p>
                  </div>
                  <div style={{flex:1,margin:"0 12px"}}>
                    <div style={{height:2,background:"linear-gradient(90deg,rgba(212,130,106,0.3),var(--rose))",borderRadius:1}}/>
                    <p style={{fontSize:10,color:"rgba(255,255,255,0.25)",textAlign:"center",marginTop:3}}>3 meses</p>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <p style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>después</p>
                    <p style={{fontWeight:900,fontSize:22,color:"var(--rose)"}}>4.200€</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Side pill */}
            <div style={{position:"absolute",top:32,right:-12,background:"#fff",color:"#080808",borderRadius:14,padding:"12px 18px",boxShadow:"0 8px 30px rgba(0,0,0,0.4)",textAlign:"center"}}>
              <p style={{fontSize:22,fontWeight:900,color:"#080808",lineHeight:1}}>+340%</p>
              <p style={{fontSize:10,color:"rgba(0,0,0,0.4)",marginTop:2}}>media</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ JOIN TICKER ═══════════════════════════════════ */}
      <div style={{background:"var(--bg2)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",padding:"14px 0",overflow:"hidden"}}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {Array(20).fill(0).map((_,i)=>(
              <span key={i} style={{display:"inline-flex",alignItems:"center",gap:20,padding:"0 28px",fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.6)",whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                {l==="es"?"Únete al equipo":l==="en"?"Join Our Team":l==="fr"?"Rejoins l'équipe":l==="de"?"Werde Teil des Teams":"Unisciti al team"}
                <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--rose)"><circle cx="3" cy="3" r="3"/></svg>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ STATS ═══════════════════════════════════════ */}
      <section style={{padding:"72px 24px",background:"var(--bg)"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <div className="stats-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--border)",borderRadius:20,overflow:"hidden"}}>
            {([
              ["+340%",l==="es"?"aumento medio de ingresos":l==="en"?"average income increase":"aumento medio"],
              ["+200",l==="es"?"creadoras gestionadas":l==="en"?"creators managed":"creator"],
              ["30d",l==="es"?"primeros resultados":l==="en"?"first results":"premiers résultats"],
              ["24/7",l==="es"?"chatters activos":l==="en"?"active chatters":"Chatter"],
            ] as [string,string][]).map(([v,lbl],i)=>(
              <div key={v} style={{padding:"40px 24px",textAlign:"center",background:"var(--bg2)"}}>
                <CounterStat value={v} label={lbl} color={["var(--rose)","#8b6cb0","var(--gold)","#4a9b7a"][i]}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNLOCK — animated big text ════════════════════ */}
      <section style={{background:"var(--bg)",overflow:"hidden",position:"relative"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
        <UnlockSection locale={l}/>
      </section>

      {/* ═══ SERVICIOS ══════════════════════════════════════ */}
      <section id="servicios" style={{padding:"88px 24px",background:"var(--bg2)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <span className="lbl">{l==="es"?"Lo que hacemos":l==="en"?"What we do":l==="fr"?"Ce que nous faisons":l==="de"?"Was wir tun":"Cosa facciamo"}</span>
            <h2 style={{fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:900,color:"#fff",letterSpacing:"-1.5px",lineHeight:1.1}}>
              {t(l,"services_title")}
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
            {ta2(l,"sv").map(([icon,title,desc],i)=>(
              <div key={i} className="card" style={{padding:"28px",position:"relative",overflow:"hidden",transition:"border-color .2s"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${["var(--rose)","#8b6cb0","var(--gold)","#4a9b7a","var(--rose)","#8b6cb0"][i]},transparent)`}}/>
                <div style={{width:52,height:52,borderRadius:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:18}}>
                  {icon}
                </div>
                <h3 style={{fontWeight:800,color:"#fff",fontSize:18,marginBottom:8,letterSpacing:"-0.3px"}}>{title}</h3>
                <p style={{color:"rgba(255,255,255,0.45)",fontSize:14,lineHeight:1.65,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{desc}</p>
              </div>
            ))}
          </div>
          {services.length>0&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:24}}>
              {services.map(s=>(
                <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                  style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,padding:"7px 16px",borderRadius:999,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)",fontWeight:600}}>
                  {s.icon} {s.kw}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ RESULTADOS — dark cards con avatares monograma ═ */}
      <section id="resultados" style={{padding:"88px 24px",background:"var(--bg)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <span className="lbl">{l==="es"?"Casos reales":l==="en"?"Real cases":l==="fr"?"Cas réels":"Echte Fälle"}</span>
            <h2 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:900,color:"#fff",letterSpacing:"-1.5px",lineHeight:1.1,marginBottom:10}}>
              {t(l,"results_title")}
            </h2>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8}}>
              <Stars/>
              <span style={{fontWeight:800,color:"#fff",fontSize:18}}>4.9</span>
              <span style={{color:"rgba(255,255,255,0.35)",fontSize:14}}>· 183 {l==="es"?"reseñas":l==="en"?"reviews":l==="fr"?"avis":"Bewertungen"}</span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:18}}>
            {CASES.map((c,i)=>(
              <div key={i} className="card" style={{overflow:"hidden"}}>
                <div style={{height:4,background:c.c}}/>
                <div style={{padding:"24px 22px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
                    <Avatar name={c.name} color={c.c}/>
                    <div>
                      <p style={{fontWeight:800,color:"#fff",fontSize:16}}>{c.name}</p>
                      <p style={{color:"rgba(255,255,255,0.4)",fontSize:12,marginTop:2}}>{c.loc}</p>
                    </div>
                    <div style={{marginLeft:"auto",textAlign:"right"}}>
                      <p style={{fontSize:10,color:"rgba(255,255,255,0.3)",textTransform:"uppercase"}}>crecimiento</p>
                      <p style={{fontWeight:900,fontSize:20,color:c.c,lineHeight:1}}>{c.p}</p>
                    </div>
                  </div>
                  <Stars/>
                  <div style={{display:"flex",alignItems:"center",gap:8,margin:"14px 0"}}>
                    <div style={{flex:1,padding:"10px 12px",background:"rgba(255,255,255,0.04)",borderRadius:10,textAlign:"center"}}>
                      <p style={{fontSize:10,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",marginBottom:3}}>{BEFORE[l]}</p>
                      <p style={{fontWeight:800,fontSize:15,color:"rgba(255,255,255,0.2)"}}>{c.b}</p>
                    </div>
                    <div style={{color:c.c,fontSize:18,fontWeight:700}}>→</div>
                    <div style={{flex:1,padding:"10px 12px",background:`${c.c}12`,border:`1px solid ${c.c}25`,borderRadius:10,textAlign:"center"}}>
                      <p style={{fontSize:10,color:"rgba(255,255,255,0.25)",textTransform:"uppercase",marginBottom:3}}>{AFTER[l]}</p>
                      <p style={{fontWeight:900,fontSize:16,color:c.c}}>{c.a}</p>
                    </div>
                  </div>
                  <p style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:10,fontWeight:600}}>{l==="es"?"En":l==="en"?"In":"En"} <strong style={{color:"rgba(255,255,255,0.6)"}}>{c.t}</strong></p>
                  <p style={{fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.65,fontStyle:"italic",borderLeft:`2px solid ${c.c}`,paddingLeft:12}}>«{c.q}»</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESO ════════════════════════════════════════ */}
      <section id="como" style={{padding:"88px 24px",background:"var(--bg2)"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:56}}>
            <span className="lbl">{l==="es"?"Proceso":l==="en"?"Process":l==="fr"?"Processus":"Prozess"}</span>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:900,color:"#fff",letterSpacing:"-1px"}}>
              {t(l,"how_title")}
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:28}}>
            {ta2(l,"how").map(([n,title,desc],i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{width:60,height:60,borderRadius:"50%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:24,color:["var(--rose)","#8b6cb0","var(--gold)","#4a9b7a"][i],margin:"0 auto 20px"}}>
                  {i+1}
                </div>
                <h3 style={{fontWeight:800,color:"#fff",fontSize:16,marginBottom:8}}>{title}</h3>
                <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,lineHeight:1.65}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORM — the key differentiator ═══════════════════ */}
      <section id="form" style={{padding:"88px 24px",background:"var(--bg)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:500,borderRadius:"50%",background:"rgba(212,130,106,0.06)",filter:"blur(100px)",pointerEvents:"none"}}/>
        <div style={{maxWidth:680,margin:"0 auto",position:"relative"}}>
          <div className="card-glow" style={{padding:"52px 48px"}}>
            <ApplyForm locale={l} href={href}/>
          </div>
          {/* Decorative side image */}
          <div className="mosaic" style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:"-340px",width:280}}>
            <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
              <img src={IMGS.mosaic1} alt="" width={280} height={380} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,8,8,0.6),transparent)"}}/>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PAÍSES ══════════════════════════════════════════ */}
      {countryKeys.length>1&&(
        <section style={{padding:"64px 24px",background:"var(--bg2)"}}>
          <div style={{maxWidth:1080,margin:"0 auto",textAlign:"center"}}>
            <span className="lbl">{l==="es"?"Cobertura global":l==="en"?"Global coverage":"Couverture"}</span>
            <h2 style={{fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:900,color:"#fff",letterSpacing:"-0.5px",marginBottom:32}}>
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
                      <p style={{fontWeight:700,color:"#fff",fontSize:13}}>{c.name}</p>
                      <p style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>{c.city}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═════════════════════════════════════════════ */}
      <section style={{padding:"88px 24px",background:"var(--bg)"}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <span className="lbl">FAQ</span>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.4rem)",fontWeight:900,color:"#fff",letterSpacing:"-1px"}}>{t(l,"faq_title")}</h2>
          </div>
          <div style={{display:"grid",gap:8}}>
            {ta2(l,"faqs").map(([q,a],i)=>(
              <details key={i} className="card" style={{padding:0}}>
                <summary style={{padding:"18px 22px",fontWeight:700,color:"#fff",cursor:"pointer",fontSize:15,display:"flex",justifyContent:"space-between",alignItems:"center",userSelect:"none",listStyle:"none"}}>
                  <span style={{flex:1,paddingRight:16}}>{q}</span>
                  <span className="plus-icon" style={{color:"var(--rose)",fontSize:24,fontWeight:300,lineHeight:1,flexShrink:0}}>+</span>
                </summary>
                <div style={{padding:"0 22px 18px",borderTop:"1px solid var(--border)"}}>
                  <p style={{color:"rgba(255,255,255,0.45)",lineHeight:1.75,fontSize:14,paddingTop:14}}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BLOG ════════════════════════════════════════════ */}
      {posts.length>0&&(
        <section style={{padding:"88px 24px",background:"var(--bg2)"}}>
          <div style={{maxWidth:1200,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:14}}>
              <div>
                <span className="lbl">Blog</span>
                <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:900,color:"#fff",letterSpacing:"-1px"}}>
                  {l==="es"?"Guías y estrategias":l==="en"?"Guides & strategies":l==="fr"?"Guides & stratégies":"Ratgeber"}
                </h2>
              </div>
              <Link href={`/${l}/blog/`} className="btn btn-outline" style={{fontSize:13,padding:"10px 20px",borderRadius:12}}>
                {l==="es"?"Ver todos":l==="en"?"View all":"Tous"} <Arr s={14}/>
              </Link>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
              {posts.slice(0,3).map(p=>(
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{textDecoration:"none"}}>
                  <article className="card" style={{padding:24,height:"100%",display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <span style={{fontSize:10,fontWeight:700,color:"var(--rose2)",textTransform:"uppercase",letterSpacing:"0.1em",background:"rgba(212,130,106,0.1)",border:"1px solid rgba(212,130,106,0.2)",padding:"2px 8px",borderRadius:999}}>{p.kw[0]}</span>
                      <span style={{fontSize:11,color:"rgba(255,255,255,0.25)"}}>{p.date}</span>
                    </div>
                    <h3 style={{fontWeight:700,color:"#fff",fontSize:15,marginBottom:8,lineHeight:1.35,flex:1}}>{p.title}</h3>
                    <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,lineHeight:1.6,marginBottom:14,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{p.excerpt}</p>
                    <div style={{display:"flex",alignItems:"center",gap:5,color:"var(--rose2)",fontSize:13,fontWeight:700}}>
                      {l==="es"?"Leer":l==="en"?"Read":l==="fr"?"Lire":"Lesen"} <Arr s={14} c="var(--rose2)"/>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA FINAL ══════════════════════════════════════ */}
      <section style={{padding:"96px 24px",background:"var(--bg)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:600,height:400,borderRadius:"50%",background:"rgba(212,130,106,0.07)",filter:"blur(100px)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:680,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <span className="lbl" style={{display:"block",textAlign:"center"}}>VixenAgency</span>
          <h2 style={{fontSize:"clamp(2.4rem,5vw,4rem)",fontWeight:900,color:"#fff",letterSpacing:"-2px",marginBottom:14,lineHeight:1.05,textTransform:"uppercase"}}>
            {t(l,"cta_title")}
          </h2>
          <p style={{color:"rgba(255,255,255,0.45)",lineHeight:1.75,marginBottom:44,fontSize:16}}>{t(l,"cta_sub")}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-white" style={{fontSize:17,padding:"20px 52px"}}>
            {t(l,"cta_btn")} <Arr c="#080808" s={20}/>
          </a>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.2)",marginTop:20}}>{t(l,"cta_note")}</p>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════ */}
      <footer style={{padding:"56px 24px 28px",background:"#050505",borderTop:"1px solid var(--border)"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div className="footer-4" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36,marginBottom:44}}>
            <div className="footer-brand">
              <div style={{fontSize:26,fontWeight:900,marginBottom:14,letterSpacing:"-0.5px"}}>
                <span style={{color:"var(--rose2)"}}>Vixen</span><span style={{color:"#fff"}}>Agency</span>
              </div>
              <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",lineHeight:1.7,maxWidth:260,marginBottom:20}}>{t(l,"footer_desc")}</p>
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{display:"inline-flex",alignItems:"center",gap:8,color:"#4ade80",fontWeight:700,fontSize:14}}>
                <span>💬</span> +{WA.slice(0,2)} {WA.slice(2,4)} {WA.slice(4,7)} {WA.slice(7,10)} {WA.slice(10)}
              </a>
            </div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,0.25)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:16}}>
                {l==="es"?"Servicios":l==="en"?"Services":"Services"}
              </p>
              <div style={{display:"grid",gap:8}}>
                {services.slice(0,5).map(s=>(
                  <Link key={s.slug} href={`/${l}/servicios/${s.slug}/`}
                    style={{fontSize:13,color:"rgba(255,255,255,0.35)"}}>
                    {s.kw}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,0.25)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:16}}>
                {l==="es"?"Países":l==="en"?"Countries":"Pays"}
              </p>
              <div style={{display:"grid",gap:8}}>
                {countryKeys.slice(0,7).map(ck=>{
                  const c=COUNTRIES[ck];
                  return(<Link key={ck} href={`/${l}/${ck}/`} style={{fontSize:13,color:"rgba(255,255,255,0.35)",display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:14}}>{c.flag}</span>{c.name}</Link>);
                })}
              </div>
            </div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,0.25)",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:16}}>Blog</p>
              <div style={{display:"grid",gap:8,marginBottom:20}}>
                {posts.slice(0,4).map(p=>(
                  <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{fontSize:12,color:"rgba(255,255,255,0.3)",lineHeight:1.35}}>{p.title.slice(0,34)}…</Link>
                ))}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {LOCALES.map(loc=>(
                  <Link key={loc} href={`/${loc}/`}
                    style={{fontSize:10,padding:"3px 7px",borderRadius:5,fontFamily:"monospace",textTransform:"uppercase",fontWeight:800,
                      color:loc===l?"var(--rose2)":"rgba(255,255,255,0.25)",
                      background:loc===l?"rgba(212,130,106,0.12)":"rgba(255,255,255,0.04)",
                      border:`1px solid ${loc===l?"rgba(212,130,106,0.35)":"rgba(255,255,255,0.08)"}`}}>
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
