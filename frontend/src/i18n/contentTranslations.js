// Traducción de contenido dinámico de la base de datos (preguntas, opciones,
// categorías, nombres, descripciones e historias de los atractivos). Se mapea
// el texto en español (tal como viene del backend) hacia inglés y francés.
// Si no hay traducción, se devuelve el texto original.

const EN = {
  // Preguntas
  '¿Qué te gustaría descubrir en Isla Mujeres?': 'What would you like to discover in Isla Mujeres?',
  '¿Qué actividad disfrutas más al viajar?': 'Which activity do you enjoy most while traveling?',
  '¿Qué tipo de lugar prefieres visitar?': 'What kind of place do you prefer to visit?',
  '¿Qué experiencia te emociona más?': 'Which experience excites you the most?',
  '¿Qué valoras más de un destino?': 'What do you value most about a destination?',
  '¿Qué tipo de fotografías te gusta tomar?': 'What kind of photos do you like to take?',
  '¿Qué actividad elegirías?': 'Which activity would you choose?',
  '¿Qué tema te interesa más?': 'Which topic interests you most?',
  '¿Qué buscas al viajar?': 'What do you look for when traveling?',
  '¿Cómo definirías tu viaje ideal?': 'How would you define your ideal trip?',

  // Opciones
  'Historia, monumentos y leyendas': 'History, monuments and legends',
  'El mar, las playas y la naturaleza': 'The sea, the beaches and nature',
  'Miradores y paisajes para fotografiar': 'Viewpoints and landscapes to photograph',
  'La vida y los valores de la comunidad': 'The life and values of the community',
  'Recorrer sitios con historia': 'Explore historic sites',
  'Nadar y disfrutar la playa': 'Swim and enjoy the beach',
  'Tomar fotografías del entorno': 'Take photos of the surroundings',
  'Convivir con la gente local': 'Spend time with the locals',
  'Haciendas y monumentos': 'Haciendas and monuments',
  'Playas y entornos marinos': 'Beaches and marine settings',
  'Miradores con vista al mar': 'Viewpoints overlooking the sea',
  'Espacios de encuentro comunitario': 'Community gathering spaces',
  'Conocer leyendas del pasado': 'Discover legends of the past',
  'Observar la vida marina': 'Watch marine life',
  'Capturar un atardecer perfecto': 'Capture a perfect sunset',
  'Aprender de la cultura local': 'Learn about local culture',
  'Su historia e identidad': 'Its history and identity',
  'Sus paisajes naturales': 'Its natural landscapes',
  'Sus vistas panorámicas': 'Its panoramic views',
  'Su gente y tradiciones': 'Its people and traditions',
  'Arquitectura y monumentos': 'Architecture and monuments',
  'Naturaleza y mar': 'Nature and sea',
  'Paisajes y panorámicas': 'Landscapes and panoramas',
  'Personas y comunidad': 'People and community',
  'Visitar una hacienda histórica': 'Visit a historic hacienda',
  'Pasar el día en la playa': 'Spend the day at the beach',
  'Subir a un mirador': 'Go up to a viewpoint',
  'Participar en una actividad comunitaria': 'Join a community activity',
  'Historia y patrimonio': 'History and heritage',
  'Mar y conservación': 'Sea and conservation',
  'Fotografía y paisaje': 'Photography and landscape',
  'Inclusión y comunidad': 'Inclusion and community',
  'Conocimiento del pasado': 'Knowledge of the past',
  'Aventura natural': 'Natural adventure',
  'Paisajes memorables': 'Memorable landscapes',
  'Conexión humana': 'Human connection',
  'Cultural e histórico': 'Cultural and historical',
  'Natural y marino': 'Natural and marine',
  'Fotográfico y panorámico': 'Photographic and panoramic',
  'Comunitario e inclusivo': 'Community-driven and inclusive',

  // Categorías
  'Histórico-Cultural': 'Historical & Cultural',
  'Naturaleza y Mar': 'Nature & Sea',
  'Miradores y Fotografía': 'Viewpoints & Photography',
  'Comunidad e Inclusión': 'Community & Inclusion',

  // Bloques de itinerario
  'Mañana': 'Morning',
  'Mediodía': 'Midday',
  'Tarde': 'Afternoon',
  'Noche': 'Evening',
  'Día 1': 'Day 1',
  'Día 2': 'Day 2',

  // Experiencias (nombres)
  'Mirador Mar Turquesa': 'Turquoise Sea Viewpoint',
  'Monumento a los Pescadores': 'Monument to the Fishermen',
  'Playa Norte': 'North Beach (Playa Norte)',
  'Escultura Tiburón Ballena (Dominó)': 'Whale Shark Sculpture (Dominó)',
  'Escaleras de la Inclusión': 'Stairs of Inclusion',
  'Hacienda Mundaca': 'Mundaca Hacienda',
  'Módulo de Información': 'Information Module',

  // Experiencias (descripciones)
  'El Mirador de Isla Mujeres se ubica en una zona elevada del área urbana, junto a las letras emblemáticas del destino. Desde aquí, el Caribe puede observarse en un espacio pensado para disfrutar el paisaje con tranquilidad y respeto por el entorno.':
    'The Isla Mujeres Viewpoint sits on a raised area of the town, next to the destination’s emblematic letters. From here, the Caribbean can be admired in a space designed to enjoy the landscape calmly and with respect for the environment.',
  'Este conjunto escultórico representa la barracuda y el pez vela, dos especies emblemáticas del Caribe. Sus formas, inspiradas en el movimiento de las olas, se acompañan de una rosa de los vientos que remite a la tradición náutica de la isla. Este espacio evoca la relación histórica entre el mar y las comunidades que han vivido de él.':
    'This sculptural ensemble depicts the barracuda and the sailfish, two emblematic Caribbean species. Their shapes, inspired by the movement of the waves, are accompanied by a compass rose that recalls the island’s nautical tradition. The space evokes the historic relationship between the sea and the communities that have lived from it.',
  'Playa Norte es una playa cercana y de fácil acceso, disfrutada tanto por locales como por visitantes. Su amplia costa de arena blanca y sus aguas tranquilas, de tonos únicos, invitan a nadar, descansar y disfrutar del mar con calma.':
    'Playa Norte is a nearby, easily accessible beach enjoyed by locals and visitors alike. Its wide white-sand shore and calm waters, with unique hues, invite you to swim, rest and enjoy the sea peacefully.',
  'Esta escultura representa al tiburón ballena, una de las especies más emblemáticas de Isla Mujeres. Su estructura, inspirada en una embarcación, hace referencia a la tradición pesquera y al vínculo de la comunidad con el mar. Un símbolo de la riqueza natural y la identidad marina de la isla.':
    'This sculpture represents the whale shark, one of the most emblematic species of Isla Mujeres. Its structure, inspired by a boat, references the fishing tradition and the community’s bond with the sea. A symbol of the natural wealth and marine identity of the island.',
  'Una escalera que va más allá de conectar espacios… conecta valores. Sus colores y palabras invitan a reflexionar sobre la importancia del respeto, la inclusión y la convivencia en comunidad.':
    'A stairway that goes beyond connecting spaces… it connects values. Its colors and words invite reflection on the importance of respect, inclusion and community life.',
  'La Hacienda Mundaca, o «Vista Alegre», es un espacio que resguarda parte de la historia de Isla Mujeres. Su arco de acceso abre paso a un entorno natural donde aún permanecen las huellas de otro tiempo. Un sitio que invita a descubrir las historias y leyendas que forman parte de la memoria del lugar.':
    'The Mundaca Hacienda, or “Vista Alegre,” is a place that safeguards part of the history of Isla Mujeres. Its entrance arch opens onto a natural setting where the traces of another time still remain. A site that invites you to discover the stories and legends that are part of the place’s memory.',
  'Este módulo de atención turística retoma elementos de la arquitectura tradicional de Isla Mujeres. Su diseño, con estructura elevada, uso de madera y techos inclinados, evoca las viviendas que formaron parte del origen de este pueblo de pescadores. Más que un punto de información, representa una referencia visual del estilo de vida y la forma de habitar de las primeras familias de la isla.':
    'This tourist information module takes up elements of the traditional architecture of Isla Mujeres. Its design, with a raised structure, the use of wood and sloped roofs, evokes the homes that were part of the origin of this fishing town. More than an information point, it is a visual reference to the lifestyle and way of living of the island’s first families.',

  // Experiencias (historias / guion interpretativo)
  'Bienvenido a Isla Mujeres. Hace no mucho, aquí llegaban las personas en lanchas con lo necesario para sobrevivir… y lo que faltaba, se lo pedían al mar. Para muchas familias de la isla, el mar fue infancia, alimento… e historia. Y para quienes se fueron, siempre hubo algo que los hizo volver. Porque hay sitios que no se dejan… aunque uno se vaya. Hoy, este paisaje sigue siendo hermoso… pero para muchos, sigue siendo parte de su vida.':
    'Welcome to Isla Mujeres. Not long ago, people arrived here by boat with just what they needed to survive… and whatever was missing, they asked it of the sea. For many island families, the sea was childhood, food… and history. And for those who left, there was always something that brought them back. Because there are places you do not leave… even when you go away. Today this landscape is still beautiful… but for many, it is still part of their life.',
  'Este monumento no representa solo a los pescadores… representa una parte de la historia de la isla. Antes del turismo, el mar lo era todo: comida, trabajo, vida. Aquí se aprendía desde muy joven a entender al mar… y a trabajar con él para salir adelante. Hoy, muchas cosas han cambiado… pero para quienes viven aquí, el mar sigue siendo parte de su historia. Porque Isla Mujeres nace del mar… y de quienes aprendieron a vivir con él.':
    'This monument does not represent only the fishermen… it represents a part of the island’s history. Before tourism, the sea was everything: food, work, life. Here you learned from a very young age to understand the sea… and to work with it to get ahead. Today many things have changed… but for those who live here, the sea is still part of their story. Because Isla Mujeres is born from the sea… and from those who learned to live with it.',
  'Parece una alberca natural… ¿verdad? Agua tranquila, poca profundidad… todo invita a entrar sin pensarlo. Pero lo que estás viendo aquí no es casualidad. La forma de la isla, las corrientes y la arena hacen que este mar sea así de claro… así de suave… así de único. Para quienes han vivido aquí siempre, este lugar era parte de su día a día. Un espacio donde el mar daba lo necesario para vivir… y también un lugar para encontrarse, descansar… y compartir. Hoy también nosotros lo podemos disfrutar y, mantenerlo así, dependerá de cómo decidimos cuidarlo.':
    'It looks like a natural pool… doesn’t it? Calm water, shallow depth… everything invites you to step in without a second thought. But what you see here is no accident. The shape of the island, the currents and the sand make this sea so clear… so gentle… so unique. For those who have always lived here, this place was part of their daily life. A space where the sea provided what was needed to live… and also a place to meet, rest… and share. Today we can enjoy it too, and keeping it this way will depend on how we decide to care for it.',
  'Este es el pez más grande del mundo… y para los pescadores de la isla es simplemente «Dominó», por los puntos en su piel. Un nombre sencillo… que nace de observar, convivir… y entender el mar. Hoy lo admiramos… pero para que nos siga visitando, depende de cómo cuidemos este mar.':
    'This is the largest fish in the world… and for the island’s fishermen it is simply “Dominó,” because of the spots on its skin. A simple name… born from observing, coexisting… and understanding the sea. Today we admire it… but whether it keeps visiting us depends on how we care for this sea.',
  'Esta escalera no solo conecta un punto con otro… También conecta algo más importante: la forma en que convivimos. Cada color, cada palabra, habla de algo que parece sencillo… pero que hace posible la vida en comunidad: respeto, inclusión, empatía. En un lugar como Isla Mujeres, donde todo se comparte —el mar, el trabajo, la vida— aprender a convivir no es opcional… es parte de todo. Porque al final, más allá del paisaje… lo que realmente construye un lugar son las personas y la forma en que se relacionan.':
    'This stairway does not just connect one point to another… It also connects something more important: the way we live together. Each color, each word, speaks of something that seems simple… but that makes community life possible: respect, inclusion, empathy. In a place like Isla Mujeres, where everything is shared —the sea, the work, life— learning to coexist is not optional… it is part of everything. Because in the end, beyond the landscape… what truly builds a place is the people and the way they relate to one another.',
  'Este lugar no empieza con Mundaca… Mucho antes, este espacio ya había sido habitado. Fue parte de un territorio maya, vinculado con la espiritualidad y la vida en la isla. Siglos después, llegó el pirata Fermín Mundaca, un navegante marcado por el comercio y los conflictos del mar, quien construyó aquí su hacienda con ambición y poder. Pero lo que más permanece… no es eso. Es la historia de una mujer isleña, La Trigueña, que decidió no aceptar ese mundo a cambio de dinero. Y con el tiempo, este lugar se convirtió en un espacio donde se cruzan las historias… y los valores que han dado identidad a la isla.':
    'This place does not begin with Mundaca… Long before, this space had already been inhabited. It was part of a Maya territory, linked to spirituality and island life. Centuries later came the pirate Fermín Mundaca, a navigator marked by trade and the conflicts of the sea, who built his hacienda here with ambition and power. But what endures most… is not that. It is the story of an island woman, La Trigueña, who chose not to accept that world in exchange for money. And over time, this place became a space where stories cross… and the values that have given the island its identity.',
  'Este lugar no solo informa… también cuenta cómo se vivía aquí. Antes de los hoteles y las construcciones actuales, las casas en Isla Mujeres eran sencillas, elevadas… adaptadas al clima, al mar y a la vida en comunidad. Materiales locales, espacios abiertos… y una relación muy cercana con el entorno. Vivir aquí no era solo habitar una casa. Era entender el viento, el calor… y el ritmo del mar. Hoy, este espacio recupera esa forma de vivir. Porque la identidad de un lugar también se construye desde cómo se habita.':
    'This place does not just inform… it also tells how people lived here. Before the hotels and today’s buildings, the houses in Isla Mujeres were simple, raised… adapted to the climate, the sea and community life. Local materials, open spaces… and a very close relationship with the surroundings. Living here was not just inhabiting a house. It was understanding the wind, the heat… and the rhythm of the sea. Today this space recovers that way of living. Because the identity of a place is also built from how it is inhabited.',
}

const FR = {
  // Preguntas
  '¿Qué te gustaría descubrir en Isla Mujeres?': 'Que souhaitez-vous découvrir à Isla Mujeres ?',
  '¿Qué actividad disfrutas más al viajar?': 'Quelle activité préférez-vous en voyage ?',
  '¿Qué tipo de lugar prefieres visitar?': 'Quel type de lieu préférez-vous visiter ?',
  '¿Qué experiencia te emociona más?': 'Quelle expérience vous enthousiasme le plus ?',
  '¿Qué valoras más de un destino?': 'Qu’appréciez-vous le plus dans une destination ?',
  '¿Qué tipo de fotografías te gusta tomar?': 'Quel type de photos aimez-vous prendre ?',
  '¿Qué actividad elegirías?': 'Quelle activité choisiriez-vous ?',
  '¿Qué tema te interesa más?': 'Quel sujet vous intéresse le plus ?',
  '¿Qué buscas al viajar?': 'Que recherchez-vous en voyageant ?',
  '¿Cómo definirías tu viaje ideal?': 'Comment définiriez-vous votre voyage idéal ?',

  // Opciones
  'Historia, monumentos y leyendas': 'Histoire, monuments et légendes',
  'El mar, las playas y la naturaleza': 'La mer, les plages et la nature',
  'Miradores y paisajes para fotografiar': 'Belvédères et paysages à photographier',
  'La vida y los valores de la comunidad': 'La vie et les valeurs de la communauté',
  'Recorrer sitios con historia': 'Parcourir des sites historiques',
  'Nadar y disfrutar la playa': 'Nager et profiter de la plage',
  'Tomar fotografías del entorno': 'Photographier les environs',
  'Convivir con la gente local': 'Échanger avec les habitants',
  'Haciendas y monumentos': 'Haciendas et monuments',
  'Playas y entornos marinos': 'Plages et milieux marins',
  'Miradores con vista al mar': 'Belvédères avec vue sur la mer',
  'Espacios de encuentro comunitario': 'Espaces de rencontre communautaire',
  'Conocer leyendas del pasado': 'Découvrir les légendes du passé',
  'Observar la vida marina': 'Observer la vie marine',
  'Capturar un atardecer perfecto': 'Capturer un coucher de soleil parfait',
  'Aprender de la cultura local': 'Apprendre la culture locale',
  'Su historia e identidad': 'Son histoire et son identité',
  'Sus paisajes naturales': 'Ses paysages naturels',
  'Sus vistas panorámicas': 'Ses vues panoramiques',
  'Su gente y tradiciones': 'Ses habitants et ses traditions',
  'Arquitectura y monumentos': 'Architecture et monuments',
  'Naturaleza y mar': 'Nature et mer',
  'Paisajes y panorámicas': 'Paysages et panoramas',
  'Personas y comunidad': 'Personnes et communauté',
  'Visitar una hacienda histórica': 'Visiter une hacienda historique',
  'Pasar el día en la playa': 'Passer la journée à la plage',
  'Subir a un mirador': 'Monter à un belvédère',
  'Participar en una actividad comunitaria': 'Participer à une activité communautaire',
  'Historia y patrimonio': 'Histoire et patrimoine',
  'Mar y conservación': 'Mer et conservation',
  'Fotografía y paisaje': 'Photographie et paysage',
  'Inclusión y comunidad': 'Inclusion et communauté',
  'Conocimiento del pasado': 'Connaissance du passé',
  'Aventura natural': 'Aventure naturelle',
  'Paisajes memorables': 'Paysages mémorables',
  'Conexión humana': 'Connexion humaine',
  'Cultural e histórico': 'Culturel et historique',
  'Natural y marino': 'Naturel et marin',
  'Fotográfico y panorámico': 'Photographique et panoramique',
  'Comunitario e inclusivo': 'Communautaire et inclusif',

  // Catégories
  'Histórico-Cultural': 'Historique et culturel',
  'Naturaleza y Mar': 'Nature et mer',
  'Miradores y Fotografía': 'Belvédères et photographie',
  'Comunidad e Inclusión': 'Communauté et inclusion',

  // Blocs d’itinéraire
  'Mañana': 'Matin',
  'Mediodía': 'Midi',
  'Tarde': 'Après-midi',
  'Noche': 'Soir',
  'Día 1': 'Jour 1',
  'Día 2': 'Jour 2',

  // Expériences (noms)
  'Mirador Mar Turquesa': 'Belvédère de la mer turquoise',
  'Monumento a los Pescadores': 'Monument aux pêcheurs',
  'Playa Norte': 'Playa Norte (plage nord)',
  'Escultura Tiburón Ballena (Dominó)': 'Sculpture du requin-baleine (Dominó)',
  'Escaleras de la Inclusión': 'Escaliers de l’inclusion',
  'Hacienda Mundaca': 'Hacienda Mundaca',
  'Módulo de Información': 'Module d’information',

  // Expériences (descriptions)
  'El Mirador de Isla Mujeres se ubica en una zona elevada del área urbana, junto a las letras emblemáticas del destino. Desde aquí, el Caribe puede observarse en un espacio pensado para disfrutar el paisaje con tranquilidad y respeto por el entorno.':
    'Le belvédère d’Isla Mujeres se trouve sur une zone surélevée de la ville, à côté des lettres emblématiques de la destination. D’ici, on peut admirer les Caraïbes dans un espace pensé pour profiter du paysage en toute tranquillité et dans le respect de l’environnement.',
  'Este conjunto escultórico representa la barracuda y el pez vela, dos especies emblemáticas del Caribe. Sus formas, inspiradas en el movimiento de las olas, se acompañan de una rosa de los vientos que remite a la tradición náutica de la isla. Este espacio evoca la relación histórica entre el mar y las comunidades que han vivido de él.':
    'Cet ensemble sculptural représente le barracuda et l’espadon voilier, deux espèces emblématiques des Caraïbes. Leurs formes, inspirées du mouvement des vagues, s’accompagnent d’une rose des vents qui rappelle la tradition nautique de l’île. Cet espace évoque la relation historique entre la mer et les communautés qui en ont vécu.',
  'Playa Norte es una playa cercana y de fácil acceso, disfrutada tanto por locales como por visitantes. Su amplia costa de arena blanca y sus aguas tranquilas, de tonos únicos, invitan a nadar, descansar y disfrutar del mar con calma.':
    'Playa Norte est une plage proche et facile d’accès, appréciée des habitants comme des visiteurs. Son large rivage de sable blanc et ses eaux calmes, aux tons uniques, invitent à nager, se reposer et profiter de la mer en toute sérénité.',
  'Esta escultura representa al tiburón ballena, una de las especies más emblemáticas de Isla Mujeres. Su estructura, inspirada en una embarcación, hace referencia a la tradición pesquera y al vínculo de la comunidad con el mar. Un símbolo de la riqueza natural y la identidad marina de la isla.':
    'Cette sculpture représente le requin-baleine, l’une des espèces les plus emblématiques d’Isla Mujeres. Sa structure, inspirée d’une embarcation, fait référence à la tradition de la pêche et au lien de la communauté avec la mer. Un symbole de la richesse naturelle et de l’identité marine de l’île.',
  'Una escalera que va más allá de conectar espacios… conecta valores. Sus colores y palabras invitan a reflexionar sobre la importancia del respeto, la inclusión y la convivencia en comunidad.':
    'Un escalier qui va au-delà de relier des espaces… il relie des valeurs. Ses couleurs et ses mots invitent à réfléchir à l’importance du respect, de l’inclusion et de la vie en communauté.',
  'La Hacienda Mundaca, o «Vista Alegre», es un espacio que resguarda parte de la historia de Isla Mujeres. Su arco de acceso abre paso a un entorno natural donde aún permanecen las huellas de otro tiempo. Un sitio que invita a descubrir las historias y leyendas que forman parte de la memoria del lugar.':
    'La Hacienda Mundaca, ou « Vista Alegre », est un lieu qui préserve une partie de l’histoire d’Isla Mujeres. Son arche d’entrée ouvre sur un cadre naturel où subsistent encore les traces d’une autre époque. Un site qui invite à découvrir les histoires et les légendes qui font partie de la mémoire du lieu.',
  'Este módulo de atención turística retoma elementos de la arquitectura tradicional de Isla Mujeres. Su diseño, con estructura elevada, uso de madera y techos inclinados, evoca las viviendas que formaron parte del origen de este pueblo de pescadores. Más que un punto de información, representa una referencia visual del estilo de vida y la forma de habitar de las primeras familias de la isla.':
    'Ce module d’accueil touristique reprend des éléments de l’architecture traditionnelle d’Isla Mujeres. Sa conception, avec une structure surélevée, l’usage du bois et des toits inclinés, évoque les habitations qui ont fait partie des origines de ce village de pêcheurs. Plus qu’un point d’information, il représente une référence visuelle au mode de vie et à la façon d’habiter des premières familles de l’île.',

  // Expériences (histoires / script interprétatif)
  'Bienvenido a Isla Mujeres. Hace no mucho, aquí llegaban las personas en lanchas con lo necesario para sobrevivir… y lo que faltaba, se lo pedían al mar. Para muchas familias de la isla, el mar fue infancia, alimento… e historia. Y para quienes se fueron, siempre hubo algo que los hizo volver. Porque hay sitios que no se dejan… aunque uno se vaya. Hoy, este paisaje sigue siendo hermoso… pero para muchos, sigue siendo parte de su vida.':
    'Bienvenue à Isla Mujeres. Il n’y a pas si longtemps, les gens arrivaient ici en barque avec le nécessaire pour survivre… et ce qui manquait, ils le demandaient à la mer. Pour beaucoup de familles de l’île, la mer fut l’enfance, la nourriture… et l’histoire. Et pour ceux qui sont partis, il y a toujours eu quelque chose qui les a fait revenir. Parce qu’il existe des lieux que l’on ne quitte pas… même si l’on s’en va. Aujourd’hui, ce paysage reste magnifique… mais pour beaucoup, il fait toujours partie de leur vie.',
  'Este monumento no representa solo a los pescadores… representa una parte de la historia de la isla. Antes del turismo, el mar lo era todo: comida, trabajo, vida. Aquí se aprendía desde muy joven a entender al mar… y a trabajar con él para salir adelante. Hoy, muchas cosas han cambiado… pero para quienes viven aquí, el mar sigue siendo parte de su historia. Porque Isla Mujeres nace del mar… y de quienes aprendieron a vivir con él.':
    'Ce monument ne représente pas seulement les pêcheurs… il représente une partie de l’histoire de l’île. Avant le tourisme, la mer était tout : nourriture, travail, vie. Ici, on apprenait très jeune à comprendre la mer… et à travailler avec elle pour s’en sortir. Aujourd’hui, bien des choses ont changé… mais pour ceux qui vivent ici, la mer fait toujours partie de leur histoire. Parce qu’Isla Mujeres naît de la mer… et de ceux qui ont appris à vivre avec elle.',
  'Parece una alberca natural… ¿verdad? Agua tranquila, poca profundidad… todo invita a entrar sin pensarlo. Pero lo que estás viendo aquí no es casualidad. La forma de la isla, las corrientes y la arena hacen que este mar sea así de claro… así de suave… así de único. Para quienes han vivido aquí siempre, este lugar era parte de su día a día. Un espacio donde el mar daba lo necesario para vivir… y también un lugar para encontrarse, descansar… y compartir. Hoy también nosotros lo podemos disfrutar y, mantenerlo así, dependerá de cómo decidimos cuidarlo.':
    'On dirait une piscine naturelle… n’est-ce pas ? Une eau calme, peu profonde… tout invite à entrer sans réfléchir. Mais ce que vous voyez ici n’est pas un hasard. La forme de l’île, les courants et le sable rendent cette mer si claire… si douce… si unique. Pour ceux qui ont toujours vécu ici, ce lieu faisait partie du quotidien. Un espace où la mer offrait le nécessaire pour vivre… et aussi un lieu pour se retrouver, se reposer… et partager. Aujourd’hui, nous pouvons en profiter nous aussi et le préserver ainsi dépendra de la façon dont nous décidons d’en prendre soin.',
  'Este es el pez más grande del mundo… y para los pescadores de la isla es simplemente «Dominó», por los puntos en su piel. Un nombre sencillo… que nace de observar, convivir… y entender el mar. Hoy lo admiramos… pero para que nos siga visitando, depende de cómo cuidemos este mar.':
    'C’est le plus grand poisson du monde… et pour les pêcheurs de l’île, c’est simplement « Dominó », à cause des points sur sa peau. Un nom simple… né de l’observation, de la cohabitation… et de la compréhension de la mer. Aujourd’hui nous l’admirons… mais pour qu’il continue de nous rendre visite, tout dépend de la façon dont nous prenons soin de cette mer.',
  'Esta escalera no solo conecta un punto con otro… También conecta algo más importante: la forma en que convivimos. Cada color, cada palabra, habla de algo que parece sencillo… pero que hace posible la vida en comunidad: respeto, inclusión, empatía. En un lugar como Isla Mujeres, donde todo se comparte —el mar, el trabajo, la vida— aprender a convivir no es opcional… es parte de todo. Porque al final, más allá del paisaje… lo que realmente construye un lugar son las personas y la forma en que se relacionan.':
    'Cet escalier ne relie pas seulement un point à un autre… Il relie aussi quelque chose de plus important : la façon dont nous vivons ensemble. Chaque couleur, chaque mot, parle de quelque chose qui semble simple… mais qui rend possible la vie en communauté : respect, inclusion, empathie. Dans un lieu comme Isla Mujeres, où tout se partage —la mer, le travail, la vie— apprendre à vivre ensemble n’est pas optionnel… cela fait partie de tout. Parce qu’au fond, au-delà du paysage… ce qui construit vraiment un lieu, ce sont les personnes et la manière dont elles se lient.',
  'Este lugar no empieza con Mundaca… Mucho antes, este espacio ya había sido habitado. Fue parte de un territorio maya, vinculado con la espiritualidad y la vida en la isla. Siglos después, llegó el pirata Fermín Mundaca, un navegante marcado por el comercio y los conflictos del mar, quien construyó aquí su hacienda con ambición y poder. Pero lo que más permanece… no es eso. Es la historia de una mujer isleña, La Trigueña, que decidió no aceptar ese mundo a cambio de dinero. Y con el tiempo, este lugar se convirtió en un espacio donde se cruzan las historias… y los valores que han dado identidad a la isla.':
    'Ce lieu ne commence pas avec Mundaca… Bien avant, cet espace avait déjà été habité. Il faisait partie d’un territoire maya, lié à la spiritualité et à la vie sur l’île. Des siècles plus tard arriva le pirate Fermín Mundaca, un navigateur marqué par le commerce et les conflits de la mer, qui construisit ici son hacienda avec ambition et pouvoir. Mais ce qui demeure le plus… n’est pas cela. C’est l’histoire d’une femme de l’île, La Trigueña, qui choisit de ne pas accepter ce monde en échange d’argent. Et avec le temps, ce lieu est devenu un espace où se croisent les histoires… et les valeurs qui ont donné son identité à l’île.',
  'Este lugar no solo informa… también cuenta cómo se vivía aquí. Antes de los hoteles y las construcciones actuales, las casas en Isla Mujeres eran sencillas, elevadas… adaptadas al clima, al mar y a la vida en comunidad. Materiales locales, espacios abiertos… y una relación muy cercana con el entorno. Vivir aquí no era solo habitar una casa. Era entender el viento, el calor… y el ritmo del mar. Hoy, este espacio recupera esa forma de vivir. Porque la identidad de un lugar también se construye desde cómo se habita.':
    'Ce lieu ne fait pas qu’informer… il raconte aussi comment on vivait ici. Avant les hôtels et les constructions actuelles, les maisons d’Isla Mujeres étaient simples, surélevées… adaptées au climat, à la mer et à la vie en communauté. Des matériaux locaux, des espaces ouverts… et une relation très étroite avec l’environnement. Vivre ici n’était pas seulement habiter une maison. C’était comprendre le vent, la chaleur… et le rythme de la mer. Aujourd’hui, cet espace retrouve cette façon de vivre. Parce que l’identité d’un lieu se construit aussi à partir de la manière dont on l’habite.',
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
