// Traducción de contenido dinámico de la base de datos (preguntas, opciones,
// categorías y bloques de itinerario). Se mapea el texto en español (tal como
// viene del backend) hacia inglés y francés. Si no hay traducción, se devuelve
// el texto original.

const EN = {
  // Preguntas
  '¿Qué actividad disfrutas más durante un viaje?': 'Which activity do you enjoy most while traveling?',
  '¿Qué te llama más la atención de un destino?': 'What attracts you most about a destination?',
  '¿Cómo prefieres pasar tu tiempo libre?': 'How do you prefer to spend your free time?',
  '¿Qué experiencia te genera más emoción?': 'Which experience excites you the most?',
  '¿Qué valoras más al viajar?': 'What do you value most when traveling?',
  '¿Qué tipo de fotografías te gusta tomar?': 'What kind of photos do you like to take?',
  '¿Qué actividad elegirías?': 'Which activity would you choose?',
  '¿Qué tema te interesa más?': 'Which topic interests you most?',
  '¿Qué buscas al viajar?': 'What do you look for when traveling?',
  '¿Cómo definirías tu viaje ideal?': 'How would you define your ideal trip?',

  // Opciones
  'Aprender historia': 'Learn history',
  'Probar comida local': 'Try local food',
  'Explorar naturaleza': 'Explore nature',
  'Conocer personas locales': 'Meet local people',
  'Relajarme': 'Relax',
  'Cultura': 'Culture',
  'Gastronomía': 'Gastronomy',
  'Ecosistemas': 'Ecosystems',
  'Tradiciones': 'Traditions',
  'Bienestar': 'Wellness',
  'Museos': 'Museums',
  'Restaurantes': 'Restaurants',
  'Senderismo': 'Hiking',
  'Eventos comunitarios': 'Community events',
  'Meditación': 'Meditation',
  'Recorrido histórico': 'Historical tour',
  'Ruta gastronómica': 'Food route',
  'Sendero ecológico': 'Ecological trail',
  'Festival local': 'Local festival',
  'Retiro de bienestar': 'Wellness retreat',
  'Aprendizaje': 'Learning',
  'Sabores': 'Flavors',
  'Naturaleza': 'Nature',
  'Comunidad': 'Community',
  'Tranquilidad': 'Tranquility',
  'Arquitectura': 'Architecture',
  'Platillos': 'Dishes',
  'Paisajes': 'Landscapes',
  'Personas': 'People',
  'Espacios relajantes': 'Relaxing spaces',
  'Taller artesanal': 'Craft workshop',
  'Clase de cocina': 'Cooking class',
  'Observación de fauna': 'Wildlife watching',
  'Actividad comunitaria': 'Community activity',
  'Yoga': 'Yoga',
  'Historia': 'History',
  'Conservación': 'Conservation',
  'Cultura local': 'Local culture',
  'Conocimiento': 'Knowledge',
  'Experiencias culinarias': 'Culinary experiences',
  'Aventura natural': 'Natural adventure',
  'Conexión humana': 'Human connection',
  'Paz': 'Peace',
  'Cultural': 'Cultural',
  'Gastronómico': 'Gastronomic',
  'Ecológico': 'Ecological',
  'Comunitario': 'Community',
  'Relajante': 'Relaxing',

  // Categorías
  'Fotográfico': 'Photographic',

  // Bloques de itinerario (títulos comunes)
  'Mañana': 'Morning',
  'Mediodía': 'Midday',
  'Tarde': 'Afternoon',
  'Noche': 'Evening',
  'Día 1': 'Day 1',
  'Día 2': 'Day 2',

  // Experiencias (nombres)
  'Templo de la Diosa Ixchel (Punta Sur)': 'Temple of the Goddess Ixchel (Punta Sur)',
  'Hacienda Mundaca': 'Mundaca Hacienda',
  'Centro Histórico y Parroquia': 'Historic Center and Parish Church',
  'Ruta de Cocina Yucateca': 'Yucatecan Cuisine Route',
  'Taller de Chocolate y Cacao Maya': 'Maya Chocolate and Cacao Workshop',
  'Mercado Municipal de Isla Mujeres': 'Isla Mujeres Municipal Market',
  'Tortugranja (Granja de Tortugas)': 'Tortugranja (Turtle Farm)',
  'Parque Nacional El Garrafón': 'El Garrafón National Park',
  'Manglares de Laguna Makax': 'Makax Lagoon Mangroves',
  'Taller con Artesanos Locales': 'Workshop with Local Artisans',
  'Cooperativa Pesquera Local': 'Local Fishing Cooperative',
  'Festival de Tradiciones Isleñas': 'Island Traditions Festival',
  'Yoga al Amanecer en Punta Sur': 'Sunrise Yoga at Punta Sur',
  'Temazcal Ceremonial Maya': 'Maya Ceremonial Temazcal',
  'Spa de Bienestar Holístico': 'Holistic Wellness Spa',
  'Mirador Acantilado del Amanecer (Punta Sur)': 'Sunrise Cliff Viewpoint (Punta Sur)',
  'Galería de Murales del Centro': 'Downtown Murals Gallery',

  // Experiencias (descripciones)
  'Vestigios del santuario maya dedicado a Ixchel, diosa de la luna, la fertilidad y la medicina. Ubicado en el extremo sur, el punto donde primero amanece en México, entre acantilados y el Parque Escultórico.':
    'Remains of the Maya sanctuary dedicated to Ixchel, goddess of the moon, fertility and medicine. Located at the southern tip, the spot where the sun first rises in Mexico, among cliffs and the Sculpture Park.',
  'Antigua hacienda del pirata Fermín Mundaca (s. XIX), con arcos de piedra, jardines y la leyenda de su amor no correspondido por "La Trigueña".':
    'Former hacienda of the pirate Fermín Mundaca (19th century), with stone arches, gardens and the legend of his unrequited love for "La Trigueña".',
  'Caminata por el corazón del pueblo: la Iglesia de la Inmaculada Concepción, calles coloridas y la historia pesquera de la isla.':
    'A walk through the heart of the town: the Church of the Immaculate Conception, colorful streets and the island\u2019s fishing history.',
  'Degustación de cochinita pibil, tikin xic (pescado en achiote) y recados tradicionales en la Avenida Hidalgo, corredor gastronómico de la isla.':
    'Tasting of cochinita pibil, tikin xic (achiote fish) and traditional seasonings on Hidalgo Avenue, the island\u2019s food corridor.',
  'Experiencia sensorial sobre el cacao, desde la semilla hasta la bebida ritual maya, con molienda en metate.':
    'A sensory experience about cacao, from the seed to the Maya ritual drink, with grinding on a metate.',
  'Recorrido por las cocinas económicas y puestos del mercado local: marquesitas, ceviches y antojitos isleños.':
    'A tour of the local market\u2019s eateries and stalls: marquesitas, ceviches and island snacks.',
  'Centro de protección de la tortuga marina fundado en 1982. Conoce criaderos, corrales marinos y participa en la liberación de crías en temporada.':
    'Sea turtle protection center founded in 1982. Visit hatcheries, marine pens and join hatchling releases in season.',
  'Snorkel en arrecife de coral, tirolesas frente al mar y senderos en el extremo sur de la isla, área natural protegida.':
    'Snorkeling on a coral reef, seaside ziplines and trails at the southern tip of the island, a protected natural area.',
  'Recorrido en kayak por los manglares de la laguna Makax, refugio de aves, peces juveniles y vida marina.':
    'Kayak tour through the Makax lagoon mangroves, a refuge for birds, juvenile fish and marine life.',
  'Convivencia con artesanos isleños para crear piezas de barro, concha y tejido inspiradas en la cultura maya-caribeña.':
    'Spend time with island artisans creating clay, shell and woven pieces inspired by Maya-Caribbean culture.',
  'Sal a la mar con pescadores de la cooperativa, aprende la pesca artesanal y su forma de vida frente a Laguna Makax.':
    'Head out to sea with cooperative fishers, learn artisanal fishing and their way of life by Makax Lagoon.',
  'Participa en danzas, música yucateca y celebraciones del Parque Central junto a la comunidad local.':
    'Join dances, Yucatecan music and celebrations at the Central Park alongside the local community.',
  'Sesión de yoga y meditación recibiendo el primer amanecer de México sobre los acantilados del Caribe.':
    'Yoga and meditation session welcoming Mexico\u2019s first sunrise over the Caribbean cliffs.',
  'Ritual ancestral de purificación en temazcal, guiado por un temazcalero local, cerca de la Hacienda Mundaca.':
    'Ancestral purification ritual in a temazcal, guided by a local temazcalero, near the Mundaca Hacienda.',
  'Terapias de relajación con técnicas tradicionales, aromaterapia y aceites naturales del Caribe.':
    'Relaxation therapies with traditional techniques, aromatherapy and natural Caribbean oils.',
  'El punto más oriental de México, ideal para fotografía de paisaje, esculturas monumentales y el mar turquesa.':
    'The easternmost point of Mexico, ideal for landscape photography, monumental sculptures and the turquoise sea.',
  'Recorrido fotográfico por el arte urbano y los murales coloridos que decoran las calles del pueblo isleño.':
    'A photographic tour of the urban art and colorful murals that decorate the island town\u2019s streets.',
}

const FR = {
  '¿Qué actividad disfrutas más durante un viaje?': 'Quelle activité préférez-vous en voyage ?',
  '¿Qué te llama más la atención de un destino?': 'Qu’est-ce qui vous attire le plus dans une destination ?',
  '¿Cómo prefieres pasar tu tiempo libre?': 'Comment préférez-vous passer votre temps libre ?',
  '¿Qué experiencia te genera más emoción?': 'Quelle expérience vous enthousiasme le plus ?',
  '¿Qué valoras más al viajar?': 'Qu’appréciez-vous le plus en voyageant ?',
  '¿Qué tipo de fotografías te gusta tomar?': 'Quel type de photos aimez-vous prendre ?',
  '¿Qué actividad elegirías?': 'Quelle activité choisiriez-vous ?',
  '¿Qué tema te interesa más?': 'Quel sujet vous intéresse le plus ?',
  '¿Qué buscas al viajar?': 'Que recherchez-vous en voyageant ?',
  '¿Cómo definirías tu viaje ideal?': 'Comment définiriez-vous votre voyage idéal ?',

  'Aprender historia': 'Apprendre l’histoire',
  'Probar comida local': 'Goûter la cuisine locale',
  'Explorar naturaleza': 'Explorer la nature',
  'Conocer personas locales': 'Rencontrer les habitants',
  'Relajarme': 'Me détendre',
  'Cultura': 'Culture',
  'Gastronomía': 'Gastronomie',
  'Ecosistemas': 'Écosystèmes',
  'Tradiciones': 'Traditions',
  'Bienestar': 'Bien-être',
  'Museos': 'Musées',
  'Restaurantes': 'Restaurants',
  'Senderismo': 'Randonnée',
  'Eventos comunitarios': 'Événements communautaires',
  'Meditación': 'Méditation',
  'Recorrido histórico': 'Circuit historique',
  'Ruta gastronómica': 'Route gastronomique',
  'Sendero ecológico': 'Sentier écologique',
  'Festival local': 'Festival local',
  'Retiro de bienestar': 'Retraite bien-être',
  'Aprendizaje': 'Apprentissage',
  'Sabores': 'Saveurs',
  'Naturaleza': 'Nature',
  'Comunidad': 'Communauté',
  'Tranquilidad': 'Tranquillité',
  'Arquitectura': 'Architecture',
  'Platillos': 'Plats',
  'Paisajes': 'Paysages',
  'Personas': 'Personnes',
  'Espacios relajantes': 'Espaces relaxants',
  'Taller artesanal': 'Atelier artisanal',
  'Clase de cocina': 'Cours de cuisine',
  'Observación de fauna': 'Observation de la faune',
  'Actividad comunitaria': 'Activité communautaire',
  'Yoga': 'Yoga',
  'Historia': 'Histoire',
  'Conservación': 'Conservation',
  'Cultura local': 'Culture locale',
  'Conocimiento': 'Connaissance',
  'Experiencias culinarias': 'Expériences culinaires',
  'Aventura natural': 'Aventure naturelle',
  'Conexión humana': 'Connexion humaine',
  'Paz': 'Paix',
  'Cultural': 'Culturel',
  'Gastronómico': 'Gastronomique',
  'Ecológico': 'Écologique',
  'Comunitario': 'Communautaire',
  'Relajante': 'Relaxant',

  'Fotográfico': 'Photographique',

  'Mañana': 'Matin',
  'Mediodía': 'Midi',
  'Tarde': 'Après-midi',
  'Noche': 'Soir',
  'Día 1': 'Jour 1',
  'Día 2': 'Jour 2',

  // Expériences (noms)
  'Templo de la Diosa Ixchel (Punta Sur)': 'Temple de la déesse Ixchel (Punta Sur)',
  'Hacienda Mundaca': 'Hacienda Mundaca',
  'Centro Histórico y Parroquia': 'Centre historique et église paroissiale',
  'Ruta de Cocina Yucateca': 'Route de la cuisine yucatèque',
  'Taller de Chocolate y Cacao Maya': 'Atelier de chocolat et cacao maya',
  'Mercado Municipal de Isla Mujeres': 'Marché municipal d’Isla Mujeres',
  'Tortugranja (Granja de Tortugas)': 'Tortugranja (ferme de tortues)',
  'Parque Nacional El Garrafón': 'Parc national El Garrafón',
  'Manglares de Laguna Makax': 'Mangroves de la lagune Makax',
  'Taller con Artesanos Locales': 'Atelier avec des artisans locaux',
  'Cooperativa Pesquera Local': 'Coopérative de pêche locale',
  'Festival de Tradiciones Isleñas': 'Festival des traditions insulaires',
  'Yoga al Amanecer en Punta Sur': 'Yoga au lever du soleil à Punta Sur',
  'Temazcal Ceremonial Maya': 'Temazcal cérémoniel maya',
  'Spa de Bienestar Holístico': 'Spa de bien-être holistique',
  'Mirador Acantilado del Amanecer (Punta Sur)': 'Belvédère de la falaise du lever du soleil (Punta Sur)',
  'Galería de Murales del Centro': 'Galerie de fresques du centre',

  // Expériences (descriptions)
  'Vestigios del santuario maya dedicado a Ixchel, diosa de la luna, la fertilidad y la medicina. Ubicado en el extremo sur, el punto donde primero amanece en México, entre acantilados y el Parque Escultórico.':
    'Vestiges du sanctuaire maya dédié à Ixchel, déesse de la lune, de la fertilité et de la médecine. Situé à l’extrémité sud, là où le soleil se lève en premier au Mexique, entre falaises et le Parc des sculptures.',
  'Antigua hacienda del pirata Fermín Mundaca (s. XIX), con arcos de piedra, jardines y la leyenda de su amor no correspondido por "La Trigueña".':
    'Ancienne hacienda du pirate Fermín Mundaca (XIXe siècle), avec arches de pierre, jardins et la légende de son amour non partagé pour « La Trigueña ».',
  'Caminata por el corazón del pueblo: la Iglesia de la Inmaculada Concepción, calles coloridas y la historia pesquera de la isla.':
    'Promenade au cœur du village : l’église de l’Immaculée Conception, des rues colorées et l’histoire de la pêche sur l’île.',
  'Degustación de cochinita pibil, tikin xic (pescado en achiote) y recados tradicionales en la Avenida Hidalgo, corredor gastronómico de la isla.':
    'Dégustation de cochinita pibil, tikin xic (poisson à l’achiote) et de sauces traditionnelles sur l’avenue Hidalgo, le corridor gastronomique de l’île.',
  'Experiencia sensorial sobre el cacao, desde la semilla hasta la bebida ritual maya, con molienda en metate.':
    'Expérience sensorielle autour du cacao, de la fève à la boisson rituelle maya, avec mouture sur metate.',
  'Recorrido por las cocinas económicas y puestos del mercado local: marquesitas, ceviches y antojitos isleños.':
    'Parcours des petites cuisines et des étals du marché local : marquesitas, ceviches et en-cas insulaires.',
  'Centro de protección de la tortuga marina fundado en 1982. Conoce criaderos, corrales marinos y participa en la liberación de crías en temporada.':
    'Centre de protection des tortues marines fondé en 1982. Découvrez les écloseries, les enclos marins et participez au relâcher des bébés en saison.',
  'Snorkel en arrecife de coral, tirolesas frente al mar y senderos en el extremo sur de la isla, área natural protegida.':
    'Snorkeling sur un récif corallien, tyroliennes face à la mer et sentiers à l’extrémité sud de l’île, zone naturelle protégée.',
  'Recorrido en kayak por los manglares de la laguna Makax, refugio de aves, peces juveniles y vida marina.':
    'Excursion en kayak dans les mangroves de la lagune Makax, refuge d’oiseaux, de jeunes poissons et de vie marine.',
  'Convivencia con artesanos isleños para crear piezas de barro, concha y tejido inspiradas en la cultura maya-caribeña.':
    'Rencontre avec des artisans insulaires pour créer des pièces en argile, coquillage et tissage inspirées de la culture maya-caribéenne.',
  'Sal a la mar con pescadores de la cooperativa, aprende la pesca artesanal y su forma de vida frente a Laguna Makax.':
    'Partez en mer avec les pêcheurs de la coopérative, apprenez la pêche artisanale et leur mode de vie face à la lagune Makax.',
  'Participa en danzas, música yucateca y celebraciones del Parque Central junto a la comunidad local.':
    'Participez aux danses, à la musique yucatèque et aux célébrations du Parc central avec la communauté locale.',
  'Sesión de yoga y meditación recibiendo el primer amanecer de México sobre los acantilados del Caribe.':
    'Séance de yoga et de méditation en accueillant le premier lever de soleil du Mexique sur les falaises des Caraïbes.',
  'Ritual ancestral de purificación en temazcal, guiado por un temazcalero local, cerca de la Hacienda Mundaca.':
    'Rituel ancestral de purification en temazcal, guidé par un temazcalero local, près de la Hacienda Mundaca.',
  'Terapias de relajación con técnicas tradicionales, aromaterapia y aceites naturales del Caribe.':
    'Thérapies de relaxation avec techniques traditionnelles, aromathérapie et huiles naturelles des Caraïbes.',
  'El punto más oriental de México, ideal para fotografía de paisaje, esculturas monumentales y el mar turquesa.':
    'Le point le plus oriental du Mexique, idéal pour la photographie de paysage, les sculptures monumentales et la mer turquoise.',
  'Recorrido fotográfico por el arte urbano y los murales coloridos que decoran las calles del pueblo isleño.':
    'Parcours photographique de l’art urbain et des fresques colorées qui décorent les rues du village insulaire.',
}

const MAPS = { en: EN, fr: FR }

/**
 * Traduce contenido dinámico (texto en español de la BD) al idioma activo.
 * Si no existe traducción, devuelve el texto original.
 */
export function tc(text, lang) {
  if (!text || lang === 'es') return text
  const dict = MAPS[lang]
  return (dict && dict[text]) || text
}
