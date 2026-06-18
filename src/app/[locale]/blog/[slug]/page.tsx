import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, type Locale, BASE_URL, LOCALE_COUNTRIES, COUNTRIES, waLink, waMsg } from "@/lib/config";
import { POSTS } from "@/lib/blog";
import { t } from "@/lib/translations";
import MegaNav from "@/components/MegaNav";
import Popup from "@/components/Popup";

export async function generateStaticParams() {
  return POSTS.map(p => ({ locale: p.locale, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = POSTS.find(p => p.locale===locale && p.slug===slug);
  if (!post) return {};
  return {
    title: `${post.title} | VixenAgency`,
    description: post.excerpt,
    keywords: post.kw,
    alternates: { canonical:`${BASE_URL}/${locale}/blog/${slug}/` },
    openGraph: { title:post.title, description:post.excerpt, url:`${BASE_URL}/${locale}/blog/${slug}/`, type:"article" },
  };
}

function renderMd(text: string) {
  return text.split("\n\n").map((block, i) => {
    if (block.startsWith("**") && block.endsWith("**") && !block.slice(2,-2).includes("**")) {
      return <h2 key={i} style={{ fontSize:20,fontWeight:800,color:"#fff",margin:"28px 0 12px" }}>{block.slice(2,-2)}</h2>;
    }
    const parts = block.split(/\*\*(.*?)\*\*/g);
    if (parts.length > 1) {
      return <p key={i} style={{ color:"var(--muted)",lineHeight:1.75,marginBottom:16 }}>
        {parts.map((p,j) => j%2===1 ? <strong key={j} style={{ color:"var(--text)",fontWeight:700 }}>{p}</strong> : p)}
      </p>;
    }
    return <p key={i} style={{ color:"var(--muted)",lineHeight:1.75,marginBottom:16 }}>{block}</p>;
  });
}

export default async function Post({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const post = POSTS.find(p => p.locale===locale && p.slug===slug);
  if (!post) return <div>Not found</div>;
  const ck = (LOCALE_COUNTRIES[l]??[])[0];
  const waHref = ck ? waLink(waMsg(l)) : waLink("VixenAgency");
  const related = POSTS.filter(p => p.locale===locale && p.slug!==slug).slice(0,3);

  const schema = {
    "@context":"https://schema.org","@type":"Article","headline":post.title,"description":post.excerpt,
    "datePublished":post.date,"keywords":post.kw.join(","),
    "author":{"@type":"Organization","name":"VixenAgency","url":BASE_URL},
    "publisher":{"@type":"Organization","name":"VixenAgency","url":BASE_URL},
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MegaNav locale={l} />
      <Popup locale={l} href={waHref} />

      <article style={{ padding:"60px 20px 80px" }}>
        <div style={{ maxWidth:720,margin:"0 auto" }}>
          <div style={{ display:"flex",gap:12,alignItems:"center",marginBottom:24,flexWrap:"wrap" }}>
            <Link href={`/${l}/blog/`} style={{ fontSize:13,color:"var(--muted)",textDecoration:"none" }}>← Blog</Link>
            <span style={{ color:"var(--muted2)",fontSize:12 }}>·</span>
            <span style={{ fontSize:11,color:"var(--teal)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em" }}>{post.kw[0]}</span>
          </div>
          <p style={{ fontSize:12,color:"var(--muted2)",marginBottom:10 }}>{post.date}</p>
          <h1 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:900,color:"#fff",lineHeight:1.18,marginBottom:20 }}>{post.title}</h1>
          <p style={{ fontSize:16,color:"var(--muted)",lineHeight:1.7,marginBottom:40,paddingBottom:32,borderBottom:"1px solid rgba(0,229,212,0.1)",fontStyle:"italic" }}>{post.excerpt}</p>
          <div>{renderMd(post.content)}</div>

          {/* In-article CTA */}
          <div className="card-glow" style={{ padding:32,marginTop:48,textAlign:"center" }}>
            <h3 style={{ fontWeight:900,color:"#fff",fontSize:18,marginBottom:10 }}>
              {l==="es"?"¿Lista para aplicar estas estrategias?":l==="en"?"Ready to apply these strategies?":l==="fr"?"Prête à appliquer ces stratégies ?":l==="de"?"Bereit, diese Strategien anzuwenden?":l==="it"?"Pronta ad applicare queste strategie?":"Pronta para aplicar essas estratégias?"}
            </h3>
            <p style={{ color:"var(--muted)",fontSize:14,marginBottom:24 }}>{t(l,"cta_sub")}</p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:"14px 32px",fontSize:15 }}>
              <span>💬</span> {t(l,"cta_btn")}
            </a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section style={{ padding:"48px 20px 64px",background:"var(--bg2)" }}>
          <div style={{ maxWidth:720,margin:"0 auto" }}>
            <h2 style={{ fontWeight:800,color:"#fff",fontSize:18,marginBottom:24 }}>
              {l==="es"?"También te puede interesar":l==="en"?"Related articles":l==="fr"?"Articles liés":l==="de"?"Ähnliche Artikel":"Articoli correlati"}
            </h2>
            <div style={{ display:"grid",gap:14 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/${l}/blog/${p.slug}/`} style={{ textDecoration:"none" }}>
                  <div className="card" style={{ padding:"18px 22px",display:"flex",gap:14,alignItems:"center" }}>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:11,color:"var(--teal)",marginBottom:4,fontWeight:700 }}>{p.date}</p>
                      <h3 style={{ fontWeight:700,color:"#fff",fontSize:15,lineHeight:1.3 }}>{p.title}</h3>
                    </div>
                    <span style={{ color:"var(--teal)",fontSize:18,flexShrink:0 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
