// Datos locales por país para las páginas de país (SEO local + sensación cercana)
// Cifras basadas en OnlyFans Wrapped 2025 (OnlyGuider) y datos públicos del sector

export interface CountryData {
  cities: string[];          // ciudades principales para SEO local
  currency: string;          // moneda local
  idDoc: string;             // documento para verificar OnlyFans
  intro: string;             // párrafo de apertura, cercano y local
  advantage: string;         // ventaja específica del país
  stats: [string, string][]; // [cifra, etiqueta]
  caseStudy: { name: string; city: string; before: string; after: string; time: string };
  faqLocal: [string, string][];
}

export const COUNTRY_DATA: Record<string, CountryData> = {
  espana: {
    cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga", "Bilbao", "Zaragoza"],
    currency: "€ (euros)",
    idDoc: "DNI o pasaporte español",
    intro: "España es uno de los mercados de OnlyFans con mayor crecimiento del sur de Europa. En 2025 el gasto español en la plataforma creció un 25%, alcanzando cifras similares a las de Brasil. Para una creadora española, la gran oportunidad está en el mercado hispano de Estados Unidos, que paga entre 3 y 5 veces más que el mercado local.",
    advantage: "Acceso directo al mercado latino de EEUU (el que más paga del mundo) desde el mismo idioma. Nuestras chatters son nativas en español y saben posicionar tu contenido para captar suscriptores estadounidenses de habla hispana.",
    stats: [["+25%", "crecimiento del mercado español en 2025"], ["3-5×", "más paga el mercado USA vs local"], ["166M€", "gasto anual en España"]],
    caseStudy: { name: "Sofía R.", city: "Madrid", before: "320€", after: "2.140€/mes", time: "8 semanas" },
    faqLocal: [
      ["¿El DNI español sirve para verificar OnlyFans?", "Sí. El DNI o el pasaporte español son aceptados por OnlyFans para verificar tu identidad. Debe estar vigente y ser legible en la foto."],
      ["¿Hay que declarar los ingresos en España?", "Sí. Los ingresos de OnlyFans tributan como actividad de autónoma. Si superas los 1.000€ anuales estás obligada a declararlos. Recomendamos darte de alta y trabajar con un gestor especializado."],
      ["¿Es legal OnlyFans en España?", "Completamente legal. La creación de contenido para adultos por mayores de edad es legal y los ingresos son perfectamente declarables."],
    ],
  },
  mexico: {
    cities: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "Cancún", "Mérida"],
    currency: "$ (pesos mexicanos)",
    idDoc: "INE o pasaporte mexicano",
    intro: "México es la potencia absoluta de OnlyFans en Latinoamérica y está entre los cinco mayores mercados del mundo. Cada día entran cerca de 800.000 dólares al país desde la plataforma, por encima de economías como Alemania, Francia o España. Si eres creadora mexicana, estás en el mejor sitio del mundo hispano para escalar.",
    advantage: "México combina un mercado interno enorme (quinto del mundo en gasto) con acceso al mercado latino de EEUU. La Ciudad de México es el noveno hub mundial por consumo. Nuestras chatters mexicanas conocen los modismos y la cultura local que hacen que un suscriptor pague más.",
    stats: [["Top 5", "mundial en gasto OnlyFans"], ["$800K", "entran a México cada día"], ["+20%", "crecimiento anual CDMX"]],
    caseStudy: { name: "Valentina M.", city: "Guadalajara", before: "0$", after: "1.850$/mes", time: "6 semanas" },
    faqLocal: [
      ["¿La INE sirve para verificar OnlyFans?", "Sí. La credencial del INE o el pasaporte mexicano son válidos para la verificación de identidad de OnlyFans. Debe estar vigente y verse claramente."],
      ["¿Cómo cobro desde México?", "OnlyFans paga por transferencia bancaria internacional o mediante servicios como Wise. Al cobrar en dólares y gastar en pesos, el diferencial cambiario juega totalmente a tu favor."],
      ["¿El SAT vigila los ingresos de OnlyFans?", "El SAT ha empezado a prestar atención a las plataformas digitales. Lo recomendable es formalizar tus ingresos. Te podemos orientar sobre cómo hacerlo correctamente."],
    ],
  },
  colombia: {
    cities: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira"],
    currency: "$ (pesos colombianos)",
    idDoc: "cédula de ciudadanía colombiana",
    intro: "Colombia es uno de los países con más creadoras de OnlyFans de toda Latinoamérica y una de las tasas de crecimiento más altas de la plataforma. La combinación de producción en español, presencia digital fuerte y acceso a audiencias globales hace que el mercado colombiano tenga un potencial enorme para quien lo trabaja con estrategia.",
    advantage: "El diferencial cambiario es tu mayor ventaja: cobras en dólares y gastas en pesos. 1.000 USD/mes en Colombia tiene un poder adquisitivo radicalmente superior al mismo ingreso en EEUU o España. Además, el mercado colombiano está menos saturado — entrar ahora significa construir autoridad antes de la ola de competencia.",
    stats: [["+20%", "crecimiento anual del mercado"], ["USD→COP", "diferencial cambiario a tu favor"], ["Menor", "saturación que España o México"]],
    caseStudy: { name: "Camila R.", city: "Medellín", before: "680$", after: "4.200$/mes", time: "3 meses" },
    faqLocal: [
      ["¿La cédula colombiana sirve para verificar OnlyFans?", "Sí. La cédula de ciudadanía colombiana es aceptada por OnlyFans para la verificación. Tiene que estar vigente y ser claramente legible en la foto."],
      ["¿Cómo cobro desde Colombia?", "Puedes cobrar con Wise o transferencia internacional. Al cobrar en dólares y vivir en pesos, tu poder adquisitivo se multiplica — es la mayor ventaja de las creadoras colombianas."],
      ["¿Es legal OnlyFans en Colombia?", "Sí. OnlyFans es legal en Colombia. No hay legislación que prohíba su uso ni la creación de contenido para adultos por mayores de edad. Los ingresos están sujetos a tributación con la DIAN."],
    ],
  },
  argentina: {
    cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "Mar del Plata", "Tucumán"],
    currency: "$ (pesos argentinos)",
    idDoc: "DNI argentino",
    intro: "Argentina es uno de los mercados hispanos de mayor crecimiento en OnlyFans. Para una creadora argentina, cobrar en dólares es una ventaja transformadora frente a la inflación local. El talento argentino para la comunicación y el contenido tiene una acogida excelente en el mercado latino internacional.",
    advantage: "Cobrar en dólares desde Argentina es la mejor forma de proteger tus ingresos frente a la inflación del peso. Nuestro trabajo se centra en posicionarte en el mercado latino de EEUU, donde tu contenido en español compite con ventaja.",
    stats: [["USD", "cobras en dólares, no en pesos"], ["+20%", "crecimiento LatAm anual"], ["Alta", "demanda de contenido argentino"]],
    caseStudy: { name: "Martina L.", city: "Buenos Aires", before: "450$", after: "2.900$/mes", time: "10 semanas" },
    faqLocal: [
      ["¿El DNI argentino sirve para verificar OnlyFans?", "Sí. El DNI argentino es válido para la verificación de identidad de OnlyFans. Debe estar vigente y ser legible."],
      ["¿Cómo cobro en dólares desde Argentina?", "OnlyFans paga en dólares mediante Wise o transferencia internacional. Cobrar en divisa fuerte es la mayor ventaja para una creadora argentina frente a la inflación."],
      ["¿Es legal OnlyFans en Argentina?", "Sí. Es legal crear contenido para adultos siendo mayor de edad. Los ingresos son declarables como cualquier actividad económica."],
    ],
  },
  venezuela: {
    cities: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay", "Ciudad Guayana", "Mérida"],
    currency: "$ (dólares / bolívares)",
    idDoc: "cédula o pasaporte venezolano",
    intro: "Para una creadora venezolana, OnlyFans representa una de las oportunidades de ingresos en dólares más accesibles que existen. Cobrar en divisa desde Venezuela transforma por completo tu capacidad económica. El talento venezolano para el contenido y la belleza tiene un reconocimiento enorme en el mercado latino internacional.",
    advantage: "Cobrar en dólares desde Venezuela es una ventaja económica sin comparación. Nuestro equipo te ayuda a posicionarte en el mercado latino de EEUU y a maximizar cada suscriptor. El diferencial de poder adquisitivo es el más alto de toda la región.",
    stats: [["USD", "ingresos 100% en dólares"], ["Máximo", "poder adquisitivo de la región"], ["Alta", "demanda de talento venezolano"]],
    caseStudy: { name: "Andrea P.", city: "Caracas", before: "0$", after: "1.600$/mes", time: "7 semanas" },
    faqLocal: [
      ["¿La cédula venezolana sirve para verificar OnlyFans?", "Sí. La cédula o el pasaporte venezolano son válidos para la verificación de OnlyFans, siempre que estén vigentes y legibles."],
      ["¿Cómo cobro desde Venezuela?", "OnlyFans paga en dólares mediante servicios como Wise. Para una creadora venezolana, cobrar en divisa es la mayor transformación económica posible."],
      ["¿Es legal OnlyFans en Venezuela?", "Sí. La creación de contenido para adultos por mayores de edad es legal. Los ingresos en divisa se rigen por la normativa cambiaria vigente."],
    ],
  },
  // Países con datos más genéricos pero igual de cercanos
  chile: {
    cities: ["Santiago", "Valparaíso", "Concepción", "Viña del Mar", "Antofagasta", "Temuco"],
    currency: "$ (pesos chilenos)",
    idDoc: "cédula de identidad chilena",
    intro: "Chile es un mercado hispano con alto poder adquisitivo y fuerte adopción digital. Para una creadora chilena, la combinación de mercado local sólido y acceso al mercado latino de EEUU abre un potencial de ingresos muy interesante cuando se trabaja con estrategia.",
    advantage: "Chile combina una economía digital avanzada con acceso al mercado latino internacional. Cobras en dólares y aprovechas un mercado interno con buen poder adquisitivo.",
    stats: [["USD", "cobras en dólares"], ["Alta", "bancarización y pago digital"], ["+20%", "crecimiento LatAm"]],
    caseStudy: { name: "Javiera S.", city: "Santiago", before: "400$", after: "2.300$/mes", time: "9 semanas" },
    faqLocal: [
      ["¿La cédula chilena sirve para verificar OnlyFans?", "Sí. La cédula de identidad chilena es válida para la verificación, vigente y legible."],
      ["¿Cómo cobro desde Chile?", "Mediante Wise o transferencia internacional en dólares. El diferencial cambiario juega a favor de las creadoras chilenas."],
      ["¿Es legal OnlyFans en Chile?", "Sí. Es legal crear contenido para adultos siendo mayor de edad. Los ingresos son declarables."],
    ],
  },
  peru: {
    cities: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Cusco"],
    currency: "S/ (soles)",
    idDoc: "DNI peruano",
    intro: "Perú es un mercado hispano emergente en OnlyFans con enorme margen de crecimiento. Para una creadora peruana, cobrar en dólares y acceder al mercado latino internacional supone una oportunidad de ingresos que multiplica lo que se puede conseguir localmente.",
    advantage: "El mercado peruano está poco saturado — entrar ahora es construir ventaja. Cobras en dólares y accedes al enorme mercado latino de EEUU con tu contenido en español.",
    stats: [["USD", "ingresos en dólares"], ["Baja", "saturación del mercado"], ["Alto", "margen de crecimiento"]],
    caseStudy: { name: "Daniela C.", city: "Lima", before: "0$", after: "1.400$/mes", time: "8 semanas" },
    faqLocal: [
      ["¿El DNI peruano sirve para verificar OnlyFans?", "Sí. El DNI peruano es válido para la verificación de OnlyFans, vigente y legible."],
      ["¿Cómo cobro desde Perú?", "Con Wise o transferencia internacional en dólares. El diferencial cambiario favorece mucho a las creadoras peruanas."],
      ["¿Es legal OnlyFans en Perú?", "Sí. La creación de contenido para adultos por mayores de edad es legal y los ingresos son declarables."],
    ],
  },
};

// Fallback genérico para países sin datos específicos
export function getCountryData(slug: string, name: string, city: string): CountryData {
  if (COUNTRY_DATA[slug]) return COUNTRY_DATA[slug];
  return {
    cities: [city],
    currency: "USD (dólares)",
    idDoc: "documento de identidad o pasaporte",
    intro: `${name} forma parte del mercado hispano de OnlyFans, uno de los de mayor crecimiento de la plataforma a nivel mundial. Para una creadora de ${name}, cobrar en dólares y acceder al mercado latino internacional abre un potencial de ingresos muy superior al que se consigue localmente.`,
    advantage: `Cobras en dólares mientras vives con costes locales — el diferencial cambiario es tu mayor ventaja. Nuestro equipo te posiciona en el mercado latino de EEUU, el que más paga del mundo, con chatters nativas en español.`,
    stats: [["USD", "ingresos en dólares"], ["+20%", "crecimiento del mercado latino"], ["Global", "acceso a audiencia internacional"]],
    caseStudy: { name: "Creadora", city, before: "0$", after: "1.500$/mes", time: "8 semanas" },
    faqLocal: [
      ["¿Puedo verificar OnlyFans con mi documento?", `Sí. OnlyFans acepta el documento de identidad o pasaporte de ${name} para verificar tu cuenta, siempre que esté vigente y sea legible.`],
      ["¿Cómo cobro desde " + name + "?", "OnlyFans paga en dólares mediante Wise o transferencia internacional. Cobrar en divisa fuerte es la mayor ventaja de las creadoras latinoamericanas."],
      ["¿Es legal OnlyFans en " + name + "?", `Sí. La creación de contenido para adultos por mayores de edad es legal. Los ingresos son declarables según la normativa local.`],
    ],
  };
}
