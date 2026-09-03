export const BASE_URL = "https://onlysweety.com";
export const WA = "34614083416";
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
  cuba:       { locale:"es" as Locale, name:"Cuba",         flag:"🇨🇺", city:"La Habana" },
  guineaecuatorial: { locale:"es" as Locale, name:"Guinea Ecuatorial", flag:"🇬🇶", city:"Malabo" },
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
  es: ["espana","mexico","colombia","argentina","venezuela","chile","peru","ecuador","bolivia","paraguay","uruguay","guatemala","costarica","panama","republicadominicana","puertorico","honduras","elsalvador","nicaragua","cuba","guineaecuatorial"],
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
  // concept: id compartido entre idiomas para páginas de servicio equivalentes
  // (ej. "chatters" en es/en/fr/de/it/pt) — permite generar hreflang recíproco real.
  // Ausente = página de mercado regional sin equivalente en otros idiomas (self-only hreflang).
  concept?: string;
}

export const SERVICES: Record<Locale, ServicePage[]> = {
  es: [
    { slug:"chatters-onlyfans", icon:"💬", color:"#c4699a", concept:"chatters",
      kw:"chatters onlyfans", title:"Chatters OnlyFans 24/7 en Español",
      headline:"Chatters nativos que convierten fans en ingresos",
      desc:"Equipo de chatters humanos en español activos las 24 horas. Cierran ventas PPV, construyen relaciones y nunca dejan un mensaje sin responder. La diferencia entre ganar 500€ y ganar 5.000€ al mes." },
    { slug:"gestion-onlyfans", icon:"⚙️", color:"#8b6cb0", concept:"management",
      kw:"gestión onlyfans", title:"Gestión Completa de OnlyFans",
      headline:"Tu OnlyFans en piloto automático",
      desc:"Nos hacemos cargo de absolutamente todo: calendario de contenido, marketing en redes, mensajes a fans, estrategia PPV y análisis de resultados. Tú solo creas." },
    { slug:"marketing-onlyfans", icon:"📱", color:"#b08a5a", concept:"marketing",
      kw:"marketing onlyfans", title:"Marketing OnlyFans — Captación de Fans",
      headline:"Fans reales que pagan, no seguidores vacíos",
      desc:"Estrategias probadas en TikTok, Instagram, Reddit y Twitter/X para atraer fans de alta conversión al mercado USA y europeo. Sin comprar seguidores, solo crecimiento orgánico escalable." },
    { slug:"ppv-onlyfans", icon:"💰", color:"#2e9e6b", concept:"ppv",
      kw:"ppv onlyfans", title:"Estrategia PPV OnlyFans — Maximiza Ingresos",
      headline:"El PPV bien hecho multiplica ingresos por 4",
      desc:"Diseñamos el calendario PPV perfecto: precios, secuencias de calentamiento, momentos de envío y mensajes que convierten. Las creadoras que implementan esta estrategia multiplican ingresos en semanas." },
    { slug:"anonimato-onlyfans", icon:"🔒", color:"#7a6cb8", concept:"anonymity",
      kw:"onlyfans anónima", title:"OnlyFans Anónima — Privacidad Total Garantizada",
      headline:"Gana muy bien sin que nadie sepa quién eres",
      desc:"Protocolo de anonimato en capas: páginas puente, cuentas separadas, dispositivos independientes y chatters que mantienen tu personaje. Muchas de nuestras top creadoras son 100% anónimas." },
    { slug:"dmca-onlyfans", icon:"⚖️", color:"#c05252", concept:"dmca",
      kw:"dmca onlyfans", title:"Protección DMCA y Filtraciones OnlyFans",
      headline:"Actuamos en menos de 24h si filtran tu contenido",
      desc:"Monitorización activa de filtraciones, DMCA takedowns automáticos y gestión completa de eliminación. Watermarks en todo el contenido. Protección legal cuando la necesitas." },
    { slug:"creadoras-latinas-onlyfans", icon:"🌎", color:"#c4699a",
      kw:"creadoras latinas onlyfans", title:"Creadoras Latinas OnlyFans — Mercado USA",
      headline:"Las latinas dominan el mercado anglófono",
      desc:"Posicionamos a creadoras hispanohablantes en el mercado americano, donde el pago por fan es 5 veces mayor. Chatters bilingües, estrategia de contenido para USA y monetización en dólares." },
    { slug:"monetizar-onlyfans", icon:"📈", color:"#b08a5a", concept:"monetize",
      kw:"monetizar onlyfans", title:"Cómo Monetizar OnlyFans — Estrategia Completa",
      headline:"Más de 7 fuentes de ingresos simultáneas",
      desc:"Suscripciones, PPV, mensajes de pago, propinas, contenido personalizado, upsells y referidos. Diseñamos el sistema de monetización completo para tu perfil." },
    { slug:"agencia-onlyfans-profesional", icon:"🏆", color:"#c4699a", concept:"trust",
      kw:"agencia onlyfans profesional", title:"Agencia OnlyFans Profesional — Por Qué Importa",
      headline:"La diferencia entre una agencia real y las demás",
      desc:"Contrato transparente, chatters humanos verificados, marketing con resultados medibles y salida libre. Sin trampa, sin letras pequeñas. Así trabajan las agencias serias." },
    { slug:"onlyfans-desde-cero", icon:"🚀", color:"#8b6cb0", concept:"beginners",
      kw:"onlyfans desde cero", title:"Empezar OnlyFans desde Cero — Guía y Gestión",
      headline:"De cero a tus primeros 1.000€ en 30 días",
      desc:"Acompañamos creadoras que empiezan desde cero: creación de cuenta, verificación, primer contenido, estrategia de nicho y primeros suscriptores. No hace falta experiencia previa." },
  ],
  en: [
    { slug:"onlyfans-chatters", icon:"💬", color:"#c4699a", concept:"chatters",
      kw:"onlyfans chatters", title:"OnlyFans Chatters — 24/7 Native English Speakers",
      headline:"Professional chatters that turn fans into revenue",
      desc:"Real human chatters active around the clock. They close PPV sales, build genuine relationships and never leave a message unanswered. The single biggest lever for income growth." },
    { slug:"onlyfans-management-agency", icon:"⚙️", color:"#8b6cb0", concept:"management",
      kw:"onlyfans management agency", title:"OnlyFans Management Agency — Full Service",
      headline:"Your OnlyFans on autopilot",
      desc:"We handle everything: content calendar, social media marketing, fan messaging, PPV strategy and performance analysis. You only create." },
    { slug:"onlyfans-growth-strategy", icon:"📱", color:"#b08a5a", concept:"marketing",
      kw:"onlyfans growth strategy", title:"OnlyFans Growth Strategy — Real Fan Acquisition",
      headline:"Real paying fans, not empty followers",
      desc:"Proven strategies on TikTok, Instagram, Reddit and Twitter/X to attract high-converting fans from the US and international market. Organic and scalable." },
    { slug:"onlyfans-ppv-strategy", icon:"💰", color:"#2e9e6b", concept:"ppv",
      kw:"onlyfans ppv strategy", title:"OnlyFans PPV Strategy — Maximize Revenue Per Fan",
      headline:"Done right, PPV multiplies income by 4x",
      desc:"We design the perfect PPV calendar: pricing, warm-up sequences, send timing and converting messages. Creators who implement this strategy multiply income within weeks." },
    { slug:"anonymous-onlyfans", icon:"🔒", color:"#7a6cb8", concept:"anonymity",
      kw:"anonymous onlyfans", title:"Anonymous OnlyFans — Full Identity Protection",
      headline:"Earn well without anyone knowing who you are",
      desc:"Layered anonymity protocol: bridge pages, separate accounts, independent devices and chatters that maintain your persona. Many of our top creators are 100% anonymous." },
    { slug:"onlyfans-dmca-protection", icon:"⚖️", color:"#c05252", concept:"dmca",
      kw:"onlyfans dmca protection", title:"OnlyFans DMCA Protection & Leak Removal",
      headline:"We act within 24h if your content leaks",
      desc:"Active leak monitoring, automated DMCA takedowns and full removal management. Watermarking on all content. Legal protection exactly when you need it." },
    { slug:"how-to-monetize-onlyfans", icon:"📈", color:"#b08a5a", concept:"monetize",
      kw:"how to monetize onlyfans", title:"How to Monetize OnlyFans — Complete Strategy",
      headline:"7+ simultaneous income streams",
      desc:"Subscriptions, PPV, paid messages, tips, custom content, upsells and referrals. We design the complete monetization system for your profile." },
    { slug:"best-onlyfans-agency", icon:"🏆", color:"#c4699a", concept:"trust",
      kw:"best onlyfans agency", title:"Best OnlyFans Agency — What Actually Matters",
      headline:"The difference between a real agency and the rest",
      desc:"Transparent contract, verified human chatters, measurable marketing results and free exit. No traps, no fine print. This is how serious agencies operate." },
    { slug:"onlyfans-from-scratch", icon:"🚀", color:"#8b6cb0", concept:"beginners",
      kw:"start onlyfans from scratch", title:"Start OnlyFans From Scratch — Guide & Management",
      headline:"From zero to your first $1,000 in 30 days",
      desc:"We guide creators starting from zero: account setup, verification, first content, niche strategy and first subscribers. No prior experience needed." },
    { slug:"onlyfans-agency-usa", icon:"🇺🇸", color:"#c05252",
      kw:"onlyfans agency usa", title:"OnlyFans Agency USA — For American Creators",
      headline:"The highest-paying market, managed professionally",
      desc:"Specialized management for creators in the US market. Native English chatters, Reddit growth strategy, tax-compliant income structuring and positioning for top 1% revenue." },
  ],
  fr: [
    { slug:"chatteuses-onlyfans", icon:"💬", color:"#c4699a", concept:"chatters",
      kw:"chatteuses onlyfans", title:"Chatteuses OnlyFans 24/7 en Français",
      headline:"Des chatteuses professionnelles qui transforment les fans en revenus",
      desc:"Vraies chatteuses humaines actives 24h/24. Elles concluent des ventes PPV, construisent des relations authentiques et ne laissent jamais un message sans réponse." },
    { slug:"gestion-onlyfans", icon:"⚙️", color:"#8b6cb0", concept:"management",
      kw:"gestion onlyfans", title:"Gestion Complète OnlyFans & MYM",
      headline:"Votre OnlyFans et MYM en pilote automatique",
      desc:"Nous gérons absolument tout : calendrier de contenu, marketing réseaux sociaux, messages aux fans, stratégie PPV et analyse des résultats. Vous créez seulement." },
    { slug:"marketing-onlyfans-france", icon:"📱", color:"#b08a5a", concept:"marketing",
      kw:"marketing onlyfans france", title:"Marketing OnlyFans France — Acquisition de Fans",
      headline:"Des vrais fans qui paient, pas des abonnés vides",
      desc:"Stratégies prouvées sur TikTok, Instagram, Reddit et Twitter pour attirer des fans à haute conversion sur les marchés français et américain." },
    { slug:"ppv-onlyfans-strategie", icon:"💰", color:"#2e9e6b", concept:"ppv",
      kw:"stratégie ppv onlyfans", title:"Stratégie PPV OnlyFans — Maximiser les Revenus",
      headline:"Un PPV bien fait multiplie les revenus par 4",
      desc:"Nous concevons le calendrier PPV parfait : tarifs, séquences de réchauffement, moments d'envoi et messages qui convertissent." },
    { slug:"agence-onlyfans-mym", icon:"🏆", color:"#c4699a",
      kw:"agence onlyfans mym", title:"Agence OnlyFans & MYM — Gestion Biplateforme",
      headline:"OnlyFans pour l\\'international, MYM pour la France",
      desc:"La stratégie biplateforme optimale pour les créatrices francophones : OnlyFans pour le marché anglophone (5x plus rémunérateur), MYM pour l\\'audience francophone fidèle." },
    { slug:"anonymat-onlyfans", icon:"🔒", color:"#7a6cb8", concept:"anonymity",
      kw:"anonymat onlyfans", title:"OnlyFans Anonyme — Protection d\\'Identité",
      headline:"Gagnez très bien sans que personne sache qui vous êtes",
      desc:"Protocole d\\'anonymat en couches : pages relais, comptes séparés, appareils indépendants et chatteuses qui maintiennent votre personnage." },
    { slug:"protection-dmca-onlyfans", icon:"⚖️", color:"#c05252", concept:"dmca",
      kw:"protection dmca onlyfans", title:"Protection DMCA OnlyFans — Fuites et Retraits",
      headline:"Nous agissons en moins de 24h en cas de fuite",
      desc:"Surveillance active des fuites, retraits DMCA automatisés et gestion complète de la suppression. Filigranes sur tout le contenu. Protection juridique quand vous en avez besoin." },
    { slug:"monetiser-onlyfans", icon:"📈", color:"#b08a5a", concept:"monetize",
      kw:"monétiser onlyfans", title:"Comment Monétiser OnlyFans — Stratégie Complète",
      headline:"Plus de 7 sources de revenus simultanées",
      desc:"Abonnements, PPV, messages payants, pourboires, contenu personnalisé, upsells et parrainages. Nous concevons le système de monétisation complet pour votre profil." },
    { slug:"agence-onlyfans-serieuse", icon:"🏆", color:"#c4699a", concept:"trust",
      kw:"agence onlyfans sérieuse", title:"Agence OnlyFans Sérieuse — Ce Qui Compte Vraiment",
      headline:"La différence entre une vraie agence et les autres",
      desc:"Contrat transparent, chatteuses humaines vérifiées, résultats marketing mesurables et sortie libre. Sans piège, sans petites lignes." },
    { slug:"commencer-onlyfans-de-zero", icon:"🚀", color:"#8b6cb0", concept:"beginners",
      kw:"commencer onlyfans de zéro", title:"Commencer OnlyFans de Zéro — Guide et Gestion",
      headline:"De zéro à vos premiers 1 000 € en 30 jours",
      desc:"Nous accompagnons les créatrices qui démarrent de zéro : création de compte, vérification, premier contenu, stratégie de niche et premiers abonnés. Aucune expérience requise." },
  ],
  de: [
    { slug:"onlyfans-chatter", icon:"💬", color:"#c4699a", concept:"chatters",
      kw:"onlyfans chatter deutsch", title:"OnlyFans Chatter — Deutschsprachig 24/7",
      headline:"Professionelle Chatter die Fans in Einnahmen verwandeln",
      desc:"Echte menschliche Chatter rund um die Uhr aktiv. Sie schließen PPV-Verkäufe ab, bauen echte Beziehungen auf und lassen keine Nachricht unbeantwortet." },
    { slug:"onlyfans-management", icon:"⚙️", color:"#8b6cb0", concept:"management",
      kw:"onlyfans management deutschland", title:"OnlyFans Management Deutschland — Komplett-Service",
      headline:"Dein OnlyFans auf Autopilot",
      desc:"Wir kümmern uns um alles: Content-Kalender, Social-Media-Marketing, Fan-Messaging, PPV-Strategie und Ergebnisanalyse. Du erstellst nur Content." },
    { slug:"onlyfans-marketing-strategie", icon:"📱", color:"#b08a5a", concept:"marketing",
      kw:"onlyfans marketing strategie", title:"OnlyFans Marketing Strategie — Echte Fan-Gewinnung",
      headline:"Echte zahlende Fans, keine leeren Follower",
      desc:"Bewährte Strategien auf TikTok, Instagram, Reddit und Twitter/X, um hochkonvertierende Fans im DACH-Raum zu gewinnen. Organisch und skalierbar, keine gekauften Follower." },
    { slug:"onlyfans-ppv-strategie", icon:"💰", color:"#2e9e6b", concept:"ppv",
      kw:"onlyfans ppv strategie", title:"OnlyFans PPV Strategie — Einnahmen Maximieren",
      headline:"Richtig gemacht vervierfacht PPV die Einnahmen",
      desc:"Wir gestalten den perfekten PPV-Kalender: Preise, Aufwärmsequenzen, Versandzeitpunkte und Nachrichten, die konvertieren. Creator, die diese Strategie umsetzen, vervielfachen ihre Einnahmen innerhalb von Wochen." },
    { slug:"onlyfans-anonym", icon:"🔒", color:"#7a6cb8", concept:"anonymity",
      kw:"onlyfans anonym", title:"OnlyFans Anonym — Vollständiger Identitätsschutz",
      headline:"Gut verdienen, ohne dass jemand weiß, wer du bist",
      desc:"Mehrschichtiges Anonymitätsprotokoll: Bridge-Seiten, getrennte Konten, unabhängige Geräte und Chatter, die deine Persona konsequent aufrechterhalten." },
    { slug:"onlyfans-dmca-schutz", icon:"⚖️", color:"#c05252", concept:"dmca",
      kw:"onlyfans dmca schutz", title:"OnlyFans DMCA-Schutz & Leak-Entfernung",
      headline:"Wir handeln innerhalb von 24h bei einem Leak",
      desc:"Aktive Leak-Überwachung, automatisierte DMCA-Takedowns und vollständiges Löschmanagement. Wasserzeichen auf allem Content. Rechtlicher Schutz genau dann, wenn du ihn brauchst." },
    { slug:"onlyfans-geld-verdienen", icon:"📈", color:"#b08a5a", concept:"monetize",
      kw:"geld verdienen onlyfans", title:"Geld Verdienen mit OnlyFans — Komplette Strategie",
      headline:"Mehr als 7 Einnahmequellen gleichzeitig",
      desc:"Abonnements, PPV, bezahlte Nachrichten, Trinkgelder, Custom Content, Upsells und Empfehlungen. Wir gestalten das komplette Monetarisierungssystem für dein Profil." },
    { slug:"onlyfans-agentur-serioes", icon:"🏆", color:"#c4699a", concept:"trust",
      kw:"seriöse onlyfans agentur", title:"Seriöse OnlyFans Agentur — Was du Wissen Musst",
      headline:"Der Unterschied zwischen einer echten Agentur und dem Rest",
      desc:"Transparenter Vertrag, verifizierte menschliche Chatter, messbare Marketingergebnisse und freier Ausstieg. Ohne Fallen, ohne Kleingedrucktes." },
    { slug:"onlyfans-von-null-starten", icon:"🚀", color:"#8b6cb0", concept:"beginners",
      kw:"onlyfans von null starten", title:"OnlyFans von Null Starten — Guide & Betreuung",
      headline:"Von null zu deinen ersten 1.000 € in 30 Tagen",
      desc:"Wir begleiten Creator, die bei null anfangen: Kontoeinrichtung, Verifizierung, erster Content, Nischenstrategie und erste Abonnenten. Keine Vorerfahrung nötig." },
  ],
  it: [
    { slug:"chatter-onlyfans", icon:"💬", color:"#c4699a", concept:"chatters",
      kw:"chatter onlyfans italiano", title:"Chatter OnlyFans 24/7 in Italiano",
      headline:"Chatter professionali che trasformano i fan in guadagni",
      desc:"Veri chatter umani attivi 24 ore su 24. Chiudono vendite PPV, costruiscono relazioni autentiche e non lasciano mai un messaggio senza risposta." },
    { slug:"gestione-onlyfans", icon:"⚙️", color:"#8b6cb0", concept:"management",
      kw:"gestione onlyfans italia", title:"Gestione Completa OnlyFans Italia",
      headline:"Il tuo OnlyFans in pilota automatico",
      desc:"Gestiamo assolutamente tutto: calendario contenuti, marketing social, messaggi ai fan, strategia PPV e analisi dei risultati. Tu crei soltanto." },
    { slug:"marketing-onlyfans-italia", icon:"📱", color:"#b08a5a", concept:"marketing",
      kw:"marketing onlyfans italia", title:"Marketing OnlyFans Italia — Acquisizione Fan",
      headline:"Veri fan che pagano, non follower vuoti",
      desc:"Strategie comprovate su TikTok, Instagram, Reddit e Twitter per attirare fan ad alta conversione sui mercati italiano e americano." },
    { slug:"strategia-ppv-onlyfans", icon:"💰", color:"#2e9e6b", concept:"ppv",
      kw:"strategia ppv onlyfans", title:"Strategia PPV OnlyFans — Massimizza i Guadagni",
      headline:"Il PPV fatto bene moltiplica i guadagni per 4",
      desc:"Progettiamo il calendario PPV perfetto: prezzi, sequenze di riscaldamento, momenti di invio e messaggi che convertono. Le creator che applicano questa strategia moltiplicano i guadagni in poche settimane." },
    { slug:"onlyfans-anonimo", icon:"🔒", color:"#7a6cb8", concept:"anonymity",
      kw:"onlyfans anonimo", title:"OnlyFans Anonimo — Protezione Totale dell'Identità",
      headline:"Guadagna bene senza che nessuno sappia chi sei",
      desc:"Protocollo di anonimato a più livelli: pagine ponte, account separati, dispositivi indipendenti e chatter che mantengono il tuo personaggio." },
    { slug:"protezione-dmca-onlyfans", icon:"⚖️", color:"#c05252", concept:"dmca",
      kw:"protezione dmca onlyfans", title:"Protezione DMCA OnlyFans — Rimozione Contenuti",
      headline:"Agiamo entro 24h se il tuo contenuto viene diffuso",
      desc:"Monitoraggio attivo delle fughe di contenuto, DMCA takedown automatici e gestione completa della rimozione. Watermark su tutti i contenuti. Protezione legale quando serve davvero." },
    { slug:"guadagnare-onlyfans", icon:"📈", color:"#b08a5a", concept:"monetize",
      kw:"guadagnare onlyfans", title:"Come Guadagnare su OnlyFans — Strategia Completa",
      headline:"Più di 7 fonti di guadagno simultanee",
      desc:"Abbonamenti, PPV, messaggi a pagamento, mance, contenuti personalizzati, upsell e referral. Progettiamo il sistema di monetizzazione completo per il tuo profilo." },
    { slug:"agenzia-onlyfans-professionale", icon:"🏆", color:"#2e9e6b", concept:"trust",
      kw:"agenzia onlyfans professionale", title:"Agenzia OnlyFans Professionale — Cosa Cercare",
      headline:"La differenza tra un\\'agenzia vera e le altre",
      desc:"Contratto trasparente, chatter umani verificati, marketing con risultati misurabili e uscita libera. Senza trappole, senza clausole nascoste." },
    { slug:"iniziare-onlyfans-da-zero", icon:"🚀", color:"#8b6cb0", concept:"beginners",
      kw:"iniziare onlyfans da zero", title:"Iniziare OnlyFans da Zero — Guida e Gestione",
      headline:"Da zero ai tuoi primi 1.000€ in 30 giorni",
      desc:"Accompagniamo le creator che iniziano da zero: creazione dell'account, verifica, primo contenuto, strategia di nicchia e primi abbonati. Nessuna esperienza richiesta." },
  ],
  pt: [
    { slug:"chatters-onlyfans-br", icon:"💬", color:"#c4699a", concept:"chatters",
      kw:"chatters onlyfans brasil", title:"Chatters OnlyFans Brasil — 24/7 em Português",
      headline:"Chatters profissionais que transformam fãs em ganhos",
      desc:"Chatters humanos reais ativos 24 horas. Fecham vendas PPV, constroem relacionamentos genuínos e nunca deixam uma mensagem sem resposta." },
    { slug:"gestao-onlyfans", icon:"⚙️", color:"#8b6cb0", concept:"management",
      kw:"gestão onlyfans brasil", title:"Gestão Completa OnlyFans Brasil",
      headline:"Seu OnlyFans no piloto automático",
      desc:"Cuidamos de absolutamente tudo: calendário de conteúdo, marketing nas redes, mensagens aos fãs, estratégia PPV e análise de resultados. Você só cria." },
    { slug:"marketing-onlyfans-brasil", icon:"📱", color:"#b08a5a", concept:"marketing",
      kw:"marketing onlyfans brasil", title:"Marketing OnlyFans Brasil — Captação de Fãs",
      headline:"Fãs reais que pagam, não seguidores vazios",
      desc:"Estratégias comprovadas no TikTok, Instagram, Reddit e Twitter para atrair fãs de alta conversão nos mercados brasileiro e americano." },
    { slug:"estrategia-ppv-onlyfans", icon:"💰", color:"#2e9e6b", concept:"ppv",
      kw:"estratégia ppv onlyfans", title:"Estratégia PPV OnlyFans — Maximize os Ganhos",
      headline:"O PPV bem feito multiplica os ganhos por 4",
      desc:"Desenhamos o calendário PPV perfeito: preços, sequências de aquecimento, momentos de envio e mensagens que convertem. Criadoras que aplicam essa estratégia multiplicam os ganhos em semanas." },
    { slug:"onlyfans-anonimo", icon:"🔒", color:"#7a6cb8", concept:"anonymity",
      kw:"onlyfans anônimo", title:"OnlyFans Anônimo — Proteção Total de Identidade",
      headline:"Ganhe bem sem que ninguém saiba quem você é",
      desc:"Protocolo de anonimato em camadas: páginas-ponte, contas separadas, dispositivos independentes e chatters que mantêm seu personagem." },
    { slug:"protecao-dmca-onlyfans", icon:"⚖️", color:"#c05252", concept:"dmca",
      kw:"proteção dmca onlyfans", title:"Proteção DMCA OnlyFans — Remoção de Vazamentos",
      headline:"Agimos em menos de 24h se seu conteúdo vazar",
      desc:"Monitoramento ativo de vazamentos, remoções DMCA automáticas e gestão completa da remoção. Marca d'água em todo o conteúdo. Proteção legal quando você precisa." },
    { slug:"ganhar-dinheiro-onlyfans", icon:"💰", color:"#2e9e6b", concept:"monetize",
      kw:"ganhar dinheiro onlyfans", title:"Ganhar Dinheiro no OnlyFans — Estratégia Completa",
      headline:"Mais de 7 fontes de renda simultâneas",
      desc:"Assinaturas, PPV, mensagens pagas, gorjetas, conteúdo personalizado, upsells e referências. Desenhamos o sistema de monetização completo para o seu perfil." },
    { slug:"agencia-onlyfans-confiavel", icon:"🏆", color:"#c4699a", concept:"trust",
      kw:"agência onlyfans confiável", title:"Agência OnlyFans Confiável — O Que Importa",
      headline:"A diferença entre uma agência de verdade e o resto",
      desc:"Contrato transparente, chatters humanos verificados, marketing com resultados mensuráveis e saída livre. Sem pegadinhas, sem letras miúdas." },
    { slug:"comecar-onlyfans-do-zero", icon:"🚀", color:"#8b6cb0", concept:"beginners",
      kw:"começar onlyfans do zero", title:"Começar no OnlyFans do Zero — Guia e Gestão",
      headline:"Do zero aos seus primeiros R$5.000 em 30 dias",
      desc:"Acompanhamos criadoras que estão começando do zero: criação de conta, verificação, primeiro conteúdo, estratégia de nicho e primeiras assinantes. Não é necessária experiência prévia." },
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

// Hreflang recíproco para páginas de servicio: busca, para un `concept` dado
// (ej. "chatters"), la página equivalente en cada idioma que la tenga. Las
// páginas de mercado regional sin concept (ej. onlyfans-agency-usa) devuelven
// solo self, ya que no tienen equivalente real en otros idiomas.
export function serviceAlternates(locale: Locale, slug: string): Record<string,string> | undefined {
  const current = SERVICES[locale]?.find(s => s.slug === slug);
  const selfUrl = `${BASE_URL}/${locale}/servicios/${slug}/`;
  if (!current?.concept) return { [locale]: selfUrl, "x-default": selfUrl };

  const languages: Record<string,string> = {};
  LOCALES.forEach(l => {
    const match = SERVICES[l]?.find(s => s.concept === current.concept);
    if (match) languages[l] = `${BASE_URL}/${l}/servicios/${match.slug}/`;
  });
  languages["x-default"] = languages["es"] ?? selfUrl;
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
