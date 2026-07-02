export const BASE_URL = "https://onlysweety.com";
export const WA = "34644462216";
export const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

export const LOCALES = ["es","en","fr","de","it","pt"] as const;
export type Locale = typeof LOCALES[number];

export const LANG: Record<Locale,string> = {
  es:"Español", en:"English", fr:"Français", de:"Deutsch", it:"Italiano", pt:"Português"
};

export const COUNTRIES = {
  espana:     { locale:"es" as Locale, name:"España",      flag:"🇪🇸", city:"Madrid" },
  mexico:     { locale:"es" as Locale, name:"México",       flag:"🇲🇽", city:"Ciudad de México" },
  argentina:  { locale:"es" as Locale, name:"Argentina",    flag:"🇦🇷", city:"Buenos Aires" },
  colombia:   { locale:"es" as Locale, name:"Colombia",     flag:"🇨🇴", city:"Bogotá" },
  chile:      { locale:"es" as Locale, name:"Chile",        flag:"🇨🇱", city:"Santiago" },
  peru:       { locale:"es" as Locale, name:"Perú",         flag:"🇵🇪", city:"Lima" },
  venezuela:  { locale:"es" as Locale, name:"Venezuela",    flag:"🇻🇪", city:"Caracas" },
  ecuador:    { locale:"es" as Locale, name:"Ecuador",      flag:"🇪🇨", city:"Guayaquil" },
  bolivia:    { locale:"es" as Locale, name:"Bolivia",      flag:"🇧🇴", city:"Santa Cruz" },
  paraguay:   { locale:"es" as Locale, name:"Paraguay",     flag:"🇵🇾", city:"Asunción" },
  uruguay:    { locale:"es" as Locale, name:"Uruguay",      flag:"🇺🇾", city:"Montevideo" },
  guatemala:  { locale:"es" as Locale, name:"Guatemala",    flag:"🇬🇹", city:"Guatemala" },
  costarica:  { locale:"es" as Locale, name:"Costa Rica",   flag:"🇨🇷", city:"San José" },
  panama:     { locale:"es" as Locale, name:"Panamá",       flag:"🇵🇦", city:"Panamá" },
  republicadominicana: { locale:"es" as Locale, name:"República Dominicana", flag:"🇩🇴", city:"Santo Domingo" },
  puertorico: { locale:"es" as Locale, name:"Puerto Rico",  flag:"🇵🇷", city:"San Juan" },
  honduras:   { locale:"es" as Locale, name:"Honduras",     flag:"🇭🇳", city:"Tegucigalpa" },
  elsalvador: { locale:"es" as Locale, name:"El Salvador",  flag:"🇸🇻", city:"San Salvador" },
  nicaragua:  { locale:"es" as Locale, name:"Nicaragua",    flag:"🇳🇮", city:"Managua" },
  eeuu:       { locale:"en" as Locale, name:"United States",flag:"🇺🇸", city:"New York" },
  canada:     { locale:"en" as Locale, name:"Canada",       flag:"🇨🇦", city:"Toronto" },
  france:     { locale:"fr" as Locale, name:"France",       flag:"🇫🇷", city:"Paris" },
  belgique:   { locale:"fr" as Locale, name:"Belgique",     flag:"🇧🇪", city:"Bruxelles" },
  deutschland:{ locale:"de" as Locale, name:"Deutschland",  flag:"🇩🇪", city:"Berlin" },
  oesterreich:{ locale:"de" as Locale, name:"Österreich",   flag:"🇦🇹", city:"Wien" },
  italia:     { locale:"it" as Locale, name:"Italia",       flag:"🇮🇹", city:"Milano" },
  brasil:     { locale:"pt" as Locale, name:"Brasil",       flag:"🇧🇷", city:"São Paulo" },
};
export type CountrySlug = keyof typeof COUNTRIES;

export const LOCALE_COUNTRIES: Record<Locale, CountrySlug[]> = {
  es: ["espana","mexico","colombia","argentina","venezuela","chile","peru","ecuador","bolivia","paraguay","uruguay","guatemala","costarica","panama","republicadominicana","puertorico","honduras","elsalvador","nicaragua"],
  en: ["eeuu","canada"],
  fr: ["france","belgique"],
  de: ["deutschland","oesterreich"],
  it: ["italia"],
  pt: ["brasil"],
};

// ── SERVICE / KEYWORD PAGES (much more) ──────────────────────────────────────
export interface ServicePage {
  slug: string; title: string; headline: string; desc: string; kw: string;
  icon: string; color: string; intent?: "info"|"commercial"|"transactional";
}

export const SERVICES: Record<Locale, ServicePage[]> = {
  es: [
    { slug:"chatters-onlyfans", icon:"💬", color:"#c4699a",
      kw:"chatters onlyfans", title:"Chatters OnlyFans 24/7 en Español",
      headline:"Chatters nativos que convierten fans en ingresos",
      desc:"Equipo de chatters humanos en español activos las 24 horas. Cierran ventas PPV, construyen relaciones y nunca dejan un mensaje sin responder. La diferencia entre ganar 500€ y ganar 5.000€ al mes." },
    { slug:"gestion-onlyfans", icon:"⚙️", color:"#8b6cb0",
      kw:"gestión onlyfans", title:"Gestión Completa de OnlyFans",
      headline:"Tu OnlyFans en piloto automático",
      desc:"Nos hacemos cargo de absolutamente todo: calendario de contenido, marketing en redes, mensajes a fans, estrategia PPV y análisis de resultados. Tú solo creas." },
    { slug:"marketing-onlyfans", icon:"📱", color:"#b08a5a",
      kw:"marketing onlyfans", title:"Marketing OnlyFans — Captación de Fans",
      headline:"Fans reales que pagan, no seguidores vacíos",
      desc:"Estrategias probadas en TikTok, Instagram, Reddit y Twitter/X para atraer fans de alta conversión al mercado USA y europeo. Sin comprar seguidores, solo crecimiento orgánico escalable." },
    { slug:"ppv-onlyfans", icon:"💰", color:"#2e9e6b",
      kw:"ppv onlyfans", title:"Estrategia PPV OnlyFans — Maximiza Ingresos",
      headline:"El PPV bien hecho multiplica ingresos por 4",
      desc:"Diseñamos el calendario PPV perfecto: precios, secuencias de calentamiento, momentos de envío y mensajes que convierten. Las creadoras que implementan esta estrategia multiplican ingresos en semanas." },
    { slug:"anonimato-onlyfans", icon:"🔒", color:"#7a6cb8",
      kw:"onlyfans anónima", title:"OnlyFans Anónima — Privacidad Total Garantizada",
      headline:"Gana muy bien sin que nadie sepa quién eres",
      desc:"Protocolo de anonimato en capas: páginas puente, cuentas separadas, dispositivos independientes y chatters que mantienen tu personaje. Muchas de nuestras top creadoras son 100% anónimas." },
    { slug:"dmca-onlyfans", icon:"⚖️", color:"#c05252",
      kw:"dmca onlyfans", title:"Protección DMCA y Filtraciones OnlyFans",
      headline:"Actuamos en menos de 24h si filtran tu contenido",
      desc:"Monitorización activa de filtraciones, DMCA takedowns automáticos y gestión completa de eliminación. Watermarks en todo el contenido. Protección legal cuando la necesitas." },
    { slug:"creadoras-latinas-onlyfans", icon:"🌎", color:"#c4699a",
      kw:"creadoras latinas onlyfans", title:"Creadoras Latinas OnlyFans — Mercado USA",
      headline:"Las latinas dominan el mercado anglófono",
      desc:"Posicionamos a creadoras hispanohablantes en el mercado americano, donde el pago por fan es 5 veces mayor. Chatters bilingües, estrategia de contenido para USA y monetización en dólares." },
    { slug:"monetizar-onlyfans", icon:"📈", color:"#b08a5a",
      kw:"monetizar onlyfans", title:"Cómo Monetizar OnlyFans — Estrategia Completa",
      headline:"Más de 7 fuentes de ingresos simultáneas",
      desc:"Suscripciones, PPV, mensajes de pago, propinas, contenido personalizado, upsells y referidos. Diseñamos el sistema de monetización completo para tu perfil." },
    { slug:"agencia-onlyfans-profesional", icon:"🏆", color:"#c4699a",
      kw:"agencia onlyfans profesional", title:"Agencia OnlyFans Profesional — Por Qué Importa",
      headline:"La diferencia entre una agencia real y las demás",
      desc:"Contrato transparente, chatters humanos verificados, marketing con resultados medibles y salida libre. Sin trampa, sin letras pequeñas. Así trabajan las agencias serias." },
    { slug:"onlyfans-desde-cero", icon:"🚀", color:"#8b6cb0",
      kw:"onlyfans desde cero", title:"Empezar OnlyFans desde Cero — Guía y Gestión",
      headline:"De cero a tus primeros 1.000€ en 30 días",
      desc:"Acompañamos creadoras que empiezan desde cero: creación de cuenta, verificación, primer contenido, estrategia de nicho y primeros suscriptores. No hace falta experiencia previa." },
  ],
  en: [
    { slug:"onlyfans-chatters", icon:"💬", color:"#c4699a",
      kw:"onlyfans chatters", title:"OnlyFans Chatters — 24/7 Native English Speakers",
      headline:"Professional chatters that turn fans into revenue",
      desc:"Real human chatters active around the clock. They close PPV sales, build genuine relationships and never leave a message unanswered. The single biggest lever for income growth." },
    { slug:"onlyfans-management-agency", icon:"⚙️", color:"#8b6cb0",
      kw:"onlyfans management agency", title:"OnlyFans Management Agency — Full Service",
      headline:"Your OnlyFans on autopilot",
      desc:"We handle everything: content calendar, social media marketing, fan messaging, PPV strategy and performance analysis. You only create." },
    { slug:"onlyfans-growth-strategy", icon:"📱", color:"#b08a5a",
      kw:"onlyfans growth strategy", title:"OnlyFans Growth Strategy — Real Fan Acquisition",
      headline:"Real paying fans, not empty followers",
      desc:"Proven strategies on TikTok, Instagram, Reddit and Twitter/X to attract high-converting fans from the US and international market. Organic and scalable." },
    { slug:"onlyfans-ppv-strategy", icon:"💰", color:"#2e9e6b",
      kw:"onlyfans ppv strategy", title:"OnlyFans PPV Strategy — Maximize Revenue Per Fan",
      headline:"Done right, PPV multiplies income by 4x",
      desc:"We design the perfect PPV calendar: pricing, warm-up sequences, send timing and converting messages. Creators who implement this strategy multiply income within weeks." },
    { slug:"anonymous-onlyfans", icon:"🔒", color:"#7a6cb8",
      kw:"anonymous onlyfans", title:"Anonymous OnlyFans — Full Identity Protection",
      headline:"Earn well without anyone knowing who you are",
      desc:"Layered anonymity protocol: bridge pages, separate accounts, independent devices and chatters that maintain your persona. Many of our top creators are 100% anonymous." },
    { slug:"onlyfans-agency-usa", icon:"🇺🇸", color:"#c05252",
      kw:"onlyfans agency usa", title:"OnlyFans Agency USA — For American Creators",
      headline:"The highest-paying market, managed professionally",
      desc:"Specialized management for creators in the US market. Native English chatters, Reddit growth strategy, tax-compliant income structuring and positioning for top 1% revenue." },
  ],
  fr: [
    { slug:"chatteuses-onlyfans", icon:"💬", color:"#c4699a",
      kw:"chatteuses onlyfans", title:"Chatteuses OnlyFans 24/7 en Français",
      headline:"Des chatteuses professionnelles qui transforment les fans en revenus",
      desc:"Vraies chatteuses humaines actives 24h/24. Elles concluent des ventes PPV, construisent des relations authentiques et ne laissent jamais un message sans réponse." },
    { slug:"gestion-onlyfans", icon:"⚙️", color:"#8b6cb0",
      kw:"gestion onlyfans", title:"Gestion Complète OnlyFans & MYM",
      headline:"Votre OnlyFans et MYM en pilote automatique",
      desc:"Nous gérons absolument tout : calendrier de contenu, marketing réseaux sociaux, messages aux fans, stratégie PPV et analyse des résultats. Vous créez seulement." },
    { slug:"marketing-onlyfans-france", icon:"📱", color:"#b08a5a",
      kw:"marketing onlyfans france", title:"Marketing OnlyFans France — Acquisition de Fans",
      headline:"Des vrais fans qui paient, pas des abonnés vides",
      desc:"Stratégies prouvées sur TikTok, Instagram, Reddit et Twitter pour attirer des fans à haute conversion sur les marchés français et américain." },
    { slug:"ppv-onlyfans-strategie", icon:"💰", color:"#2e9e6b",
      kw:"stratégie ppv onlyfans", title:"Stratégie PPV OnlyFans — Maximiser les Revenus",
      headline:"Un PPV bien fait multiplie les revenus par 4",
      desc:"Nous concevons le calendrier PPV parfait : tarifs, séquences de réchauffement, moments d'envoi et messages qui convertissent." },
    { slug:"agence-onlyfans-mym", icon:"🏆", color:"#c4699a",
      kw:"agence onlyfans mym", title:"Agence OnlyFans & MYM — Gestion Biplateforme",
      headline:"OnlyFans pour l\\'international, MYM pour la France",
      desc:"La stratégie biplateforme optimale pour les créatrices francophones : OnlyFans pour le marché anglophone (5x plus rémunérateur), MYM pour l\\'audience francophone fidèle." },
    { slug:"anonymat-onlyfans", icon:"🔒", color:"#7a6cb8",
      kw:"anonymat onlyfans", title:"OnlyFans Anonyme — Protection d\\'Identité",
      headline:"Gagnez très bien sans que personne sache qui vous êtes",
      desc:"Protocole d\\'anonymat en couches : pages relais, comptes séparés, appareils indépendants et chatteuses qui maintiennent votre personnage." },
  ],
  de: [
    { slug:"onlyfans-chatter", icon:"💬", color:"#c4699a",
      kw:"onlyfans chatter deutsch", title:"OnlyFans Chatter — Deutschsprachig 24/7",
      headline:"Professionelle Chatter die Fans in Einnahmen verwandeln",
      desc:"Echte menschliche Chatter rund um die Uhr aktiv. Sie schließen PPV-Verkäufe ab, bauen echte Beziehungen auf und lassen keine Nachricht unbeantwortet." },
    { slug:"onlyfans-management", icon:"⚙️", color:"#8b6cb0",
      kw:"onlyfans management deutschland", title:"OnlyFans Management Deutschland — Komplett-Service",
      headline:"Dein OnlyFans auf Autopilot",
      desc:"Wir kümmern uns um alles: Content-Kalender, Social-Media-Marketing, Fan-Messaging, PPV-Strategie und Ergebnisanalyse. Du erstellst nur Content." },
    { slug:"onlyfans-geld-verdienen", icon:"📈", color:"#b08a5a",
      kw:"geld verdienen onlyfans", title:"Geld Verdienen mit OnlyFans — Komplette Strategie",
      headline:"Mehr als 7 Einnahmequellen gleichzeitig",
      desc:"Abonnements, PPV, bezahlte Nachrichten, Trinkgelder, Custom Content, Upsells und Empfehlungen. Wir gestalten das komplette Monetarisierungssystem für dein Profil." },
    { slug:"onlyfans-agentur-serioes", icon:"🏆", color:"#c4699a",
      kw:"seriöse onlyfans agentur", title:"Seriöse OnlyFans Agentur — Was du Wissen Musst",
      headline:"Der Unterschied zwischen einer echten Agentur und dem Rest",
      desc:"Transparenter Vertrag, verifizierte menschliche Chatter, messbare Marketingergebnisse und freier Ausstieg. Ohne Fallen, ohne Kleingedrucktes." },
  ],
  it: [
    { slug:"chatter-onlyfans", icon:"💬", color:"#c4699a",
      kw:"chatter onlyfans italiano", title:"Chatter OnlyFans 24/7 in Italiano",
      headline:"Chatter professionali che trasformano i fan in guadagni",
      desc:"Veri chatter umani attivi 24 ore su 24. Chiudono vendite PPV, costruiscono relazioni autentiche e non lasciano mai un messaggio senza risposta." },
    { slug:"gestione-onlyfans", icon:"⚙️", color:"#8b6cb0",
      kw:"gestione onlyfans italia", title:"Gestione Completa OnlyFans Italia",
      headline:"Il tuo OnlyFans in pilota automatico",
      desc:"Gestiamo assolutamente tutto: calendario contenuti, marketing social, messaggi ai fan, strategia PPV e analisi dei risultati. Tu crei soltanto." },
    { slug:"marketing-onlyfans-italia", icon:"📱", color:"#b08a5a",
      kw:"marketing onlyfans italia", title:"Marketing OnlyFans Italia — Acquisizione Fan",
      headline:"Veri fan che pagano, non follower vuoti",
      desc:"Strategie comprovate su TikTok, Instagram, Reddit e Twitter per attirare fan ad alta conversione sui mercati italiano e americano." },
    { slug:"agenzia-onlyfans-professionale", icon:"🏆", color:"#2e9e6b",
      kw:"agenzia onlyfans professionale", title:"Agenzia OnlyFans Professionale — Cosa Cercare",
      headline:"La differenza tra un\\'agenzia vera e le altre",
      desc:"Contratto trasparente, chatter umani verificati, marketing con risultati misurabili e uscita libera. Senza trappole, senza clausole nascoste." },
  ],
  pt: [
    { slug:"chatters-onlyfans-br", icon:"💬", color:"#c4699a",
      kw:"chatters onlyfans brasil", title:"Chatters OnlyFans Brasil — 24/7 em Português",
      headline:"Chatters profissionais que transformam fãs em ganhos",
      desc:"Chatters humanos reais ativos 24 horas. Fecham vendas PPV, constroem relacionamentos genuínos e nunca deixam uma mensagem sem resposta." },
    { slug:"gestao-onlyfans", icon:"⚙️", color:"#8b6cb0",
      kw:"gestão onlyfans brasil", title:"Gestão Completa OnlyFans Brasil",
      headline:"Seu OnlyFans no piloto automático",
      desc:"Cuidamos de absolutamente tudo: calendário de conteúdo, marketing nas redes, mensagens aos fãs, estratégia PPV e análise de resultados. Você só cria." },
    { slug:"marketing-onlyfans-brasil", icon:"📱", color:"#b08a5a",
      kw:"marketing onlyfans brasil", title:"Marketing OnlyFans Brasil — Captação de Fãs",
      headline:"Fãs reais que pagam, não seguidores vazios",
      desc:"Estratégias comprovadas no TikTok, Instagram, Reddit e Twitter para atrair fãs de alta conversão nos mercados brasileiro e americano." },
    { slug:"ganhar-dinheiro-onlyfans", icon:"💰", color:"#2e9e6b",
      kw:"ganhar dinheiro onlyfans", title:"Ganhar Dinheiro no OnlyFans — Estratégia Completa",
      headline:"Mais de 7 fontes de renda simultâneas",
      desc:"Assinaturas, PPV, mensagens pagas, gorjetas, conteúdo personalizado, upsells e referências. Desenhamos o sistema de monetização completo para o seu perfil." },
  ],
};

export function waMsg(locale: Locale): string {
  const m: Record<Locale,string> = {
    es: "Hola, quiero que Only Sweety Agency gestione mi OnlyFans. ¿Podemos hablar?",
    en: "Hi, I want Only Sweety Agency to manage my OnlyFans. Can we talk?",
    fr: "Bonjour, je veux que Only Sweety Agency gère mon OnlyFans. Pouvons-nous parler ?",
    de: "Hallo, ich möchte, dass Only Sweety Agency meinen OnlyFans verwaltet. Können wir sprechen?",
    it: "Ciao, voglio che Only Sweety Agency gestisca il mio OnlyFans. Possiamo parlare?",
    pt: "Olá, quero que a Only Sweety Agency gerencie meu OnlyFans. Podemos conversar?",
  };
  return m[locale];
}

// ── HREFLANG helper ──────────────────────────────────────────────────────────
export function langAlternates(pathPerLocale: (l: Locale) => string) {
  const languages: Record<string,string> = {};
  LOCALES.forEach(l => { languages[l] = `${BASE_URL}${pathPerLocale(l as Locale)}`; });
  languages["x-default"] = `${BASE_URL}${pathPerLocale("es" as Locale)}`;
  return languages;
}

// ── SEO title <=65 chars ─────────────────────────────────────────────────────
export function smartTitle(raw: string, brand = " | Only Sweety"): string {
  const withBrand = raw + brand;
  if (withBrand.length <= 65) return withBrand;
  if (raw.length <= 65) return raw;
  const main = raw.split(" — ")[0].trim();
  if (main.length <= 65) return main;
  const cut = raw.slice(0, 62);
  return cut.slice(0, cut.lastIndexOf(" "));
}
