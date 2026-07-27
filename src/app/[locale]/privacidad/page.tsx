import type { Metadata } from "next";
import { LOCALES, type Locale, BASE_URL, langAlternates } from "@/lib/config";
import MegaNav from "@/components/MegaNav";

export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const titles: Record<Locale, string> = {
    es: "Política de Privacidad | Only Sweety",
    en: "Privacy Policy | Only Sweety",
    fr: "Politique de Confidentialité | Only Sweety",
    de: "Datenschutzerklärung | Only Sweety",
    it: "Politica sulla Privacy | Only Sweety",
    pt: "Política de Privacidade | Only Sweety",
  };
  return {
    title: titles[l],
    description: "Cómo Only Sweety trata tus datos cuando nos contactas por Instagram u otros canales.",
    alternates: { canonical: `${BASE_URL}/${l}/privacidad/`, languages: langAlternates(loc => `/${loc}/privacidad/`) },
    robots: { index: true, follow: true },
  };
}

const CONTACT_EMAIL = "hola@onlysweety.com"; // ← CAMBIAR por email real cuando el usuario lo indique

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <>
      <MegaNav locale={l} />
      <main style={{ padding: "120px 20px 80px", background: "#fff" }}>
        <article style={{ maxWidth: 760, margin: "0 auto", color: "var(--ink)", lineHeight: 1.75 }}>
          <p style={{ color: "var(--muted)", fontSize: 13, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700, marginBottom: 12 }}>
            Política legal
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 8, color: "var(--dark)" }}>
            Política de Privacidad — Only Sweety
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 40 }}>
            Última actualización: 27 de julio de 2026
          </p>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Quiénes somos</h2>
            <p style={p}>
              Only Sweety es una agencia de gestión de creadoras y redes sociales. Esta política explica cómo tratamos la información cuando contactas con nosotros a través de nuestras cuentas profesionales de Instagram.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Qué datos tratamos</h2>
            <p style={p}>
              Cuando nos envías un mensaje directo a una de nuestras cuentas profesionales de Instagram, tratamos:
            </p>
            <ul style={ul}>
              <li>Tu identificador y nombre de usuario de Instagram.</li>
              <li>El contenido de los mensajes que nos envías.</li>
              <li>Los datos de contacto que decidas compartir para que nuestro equipo te responda.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Para qué los usamos</h2>
            <p style={p}>
              Usamos esta información únicamente para leer y responder a tu consulta, resolver dudas sobre nuestros servicios y, si tienes interés, continuar la conversación por un canal que tú aceptes. Nos basamos en tu propia solicitud/consentimiento al escribirnos primero.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Cómo usamos los datos de Instagram</h2>
            <p style={p}>
              Accedemos a datos de Instagram solo a través de la API oficial de Instagram de Meta y solo para nuestras propias cuentas profesionales conectadas. Solo respondemos a usuarios que nos escriben primero, dentro de la ventana de 24 horas de Meta. No enviamos mensajes no solicitados.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Con quién los compartimos</h2>
            <p style={p}>
              No vendemos tus datos. Solo los compartimos con miembros de nuestro equipo que gestionan tu consulta y con proveedores que nos ayudan a operar (por ejemplo, alojamiento y un proveedor de IA que redacta borradores de respuesta), bajo obligaciones de confidencialidad.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Conservación</h2>
            <p style={p}>
              Conservamos los datos de la conversación solo el tiempo necesario para atender tu consulta y prestar nuestros servicios, y después los eliminamos.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Tus derechos</h2>
            <p style={p}>
              Puedes solicitar acceder a tus datos o eliminarlos en cualquier momento escribiendo a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={link}>{CONTACT_EMAIL}</a>. También puedes detener la conversación cuando quieras y bloquear la cuenta.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Eliminación de datos</h2>
            <p style={p}>
              Para solicitar la eliminación de tus datos, escribe a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={link}>{CONTACT_EMAIL}</a> y los borraremos.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={h2}>Contacto</h2>
            <p style={p}>
              <a href={`mailto:${CONTACT_EMAIL}`} style={link}>{CONTACT_EMAIL}</a> · onlysweety.com
            </p>
          </section>
        </article>
      </main>
    </>
  );
}

const h2: React.CSSProperties = { fontSize: 20, fontWeight: 800, color: "var(--dark)", letterSpacing: "-.3px", marginBottom: 10 };
const p: React.CSSProperties = { fontSize: 15.5, color: "var(--ink)", lineHeight: 1.75 };
const ul: React.CSSProperties = { fontSize: 15.5, color: "var(--ink)", lineHeight: 1.85, paddingLeft: 22, marginTop: 8 };
const link: React.CSSProperties = { color: "var(--pink)", textDecoration: "underline", fontWeight: 600 };
