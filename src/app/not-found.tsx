import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#fdf5f8", padding:24, fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ textAlign:"center", maxWidth:440 }}>
        <p style={{ fontSize:80, fontWeight:900, color:"#c4699a", letterSpacing:"-4px", lineHeight:1 }}>404</p>
        <h1 style={{ fontSize:24, fontWeight:800, color:"#1a1018", margin:"14px 0 10px" }}>Página no encontrada</h1>
        <p style={{ color:"rgba(26,16,24,0.55)", fontSize:15, lineHeight:1.6, marginBottom:28 }}>
          La página que buscas no existe o se ha movido. Vuelve al inicio o explora nuestros recursos.
        </p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/es/" style={{ padding:"13px 26px", borderRadius:12, background:"linear-gradient(135deg,#c4699a,#d985b0)", color:"#fff", fontWeight:800, fontSize:14, textDecoration:"none" }}>← Volver al inicio</Link>
          <Link href="/es/blog/" style={{ padding:"13px 26px", borderRadius:12, background:"#fff", border:"1.5px solid rgba(196,105,154,0.3)", color:"#c4699a", fontWeight:700, fontSize:14, textDecoration:"none" }}>Ver el blog</Link>
        </div>
      </div>
    </div>
  );
}
