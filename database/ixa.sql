-- phpMyAdmin SQL Dump
-- Base de datos: `ixa_db`
-- Proyecto ÍXA · Pueblos Mágicos · Isla Mujeres
-- Datos basados en las Fichas Interpretativas de Isla Mujeres (Junio 2026).

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis_ia`
--

CREATE TABLE `analisis_ia` (
  `id` int(11) NOT NULL,
  `visitante_id` int(11) NOT NULL,
  `perfil_detectado` varchar(120) NOT NULL,
  `confianza` decimal(5,2) DEFAULT 0.00,
  `modelo_usado` varchar(80) DEFAULT 'RandomForest',
  `explicacion` text DEFAULT NULL,
  `fecha_analisis` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `descripcion` text NOT NULL,
  `icono` varchar(60) DEFAULT NULL,
  `color_hex` varchar(9) DEFAULT '#C9A227',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`, `icono`, `color_hex`, `created_at`, `updated_at`) VALUES
(1, 'Histórico-Cultural', 'Patrimonio, monumentos, leyendas e historia viva de Isla Mujeres.', 'landmark', '#B5462F', '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(2, 'Naturaleza y Mar', 'Playas, vida marina y la riqueza natural del mar Caribe.', 'waves', '#7FA88B', '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(3, 'Miradores y Fotografía', 'Miradores, paisajes y los mejores escenarios para fotografiar.', 'camera', '#8B5A2B', '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(4, 'Comunidad e Inclusión', 'Valores, convivencia e inclusión de la comunidad isleña.', 'users', '#1B4332', '2026-06-22 12:00:00', '2026-06-22 12:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `clave` varchar(120) NOT NULL,
  `valor` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id`, `clave`, `valor`, `updated_at`) VALUES
(1, 'theme', 'ixa', '2026-06-22 12:00:00'),
(2, 'theme_4t_enabled', 'false', '2026-06-22 12:00:00'),
(3, 'admin_email', 'AdminIXA@UTCancun.com', '2026-06-22 12:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencia`
--

CREATE TABLE `experiencia` (
  `id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(180) NOT NULL,
  `descripcion` text NOT NULL,
  `historia` text DEFAULT NULL,
  `latitud` decimal(10,7) DEFAULT NULL,
  `longitud` decimal(10,7) DEFAULT NULL,
  `imagen_url` varchar(500) DEFAULT NULL,
  `puntuacion_promedio` decimal(3,2) DEFAULT 0.00,
  `duracion_horas` decimal(4,1) DEFAULT 2.0,
  `precio_aprox` decimal(8,2) DEFAULT 0.00,
  `pueblo_magico` varchar(120) DEFAULT 'Isla Mujeres',
  `activa` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `experiencia`
-- (Atractivos reales del Pueblo Mágico de Isla Mujeres)
--

INSERT INTO `experiencia` (`id`, `categoria_id`, `nombre`, `descripcion`, `historia`, `latitud`, `longitud`, `imagen_url`, `puntuacion_promedio`, `duracion_horas`, `precio_aprox`, `pueblo_magico`, `activa`, `created_at`, `updated_at`) VALUES
(1, 3, 'Mirador Mar Turquesa', 'El Mirador de Isla Mujeres se ubica en una zona elevada del área urbana, junto a las letras emblemáticas del destino. Desde aquí, el Caribe puede observarse en un espacio pensado para disfrutar el paisaje con tranquilidad y respeto por el entorno.', 'Bienvenido a Isla Mujeres. Hace no mucho, aquí llegaban las personas en lanchas con lo necesario para sobrevivir… y lo que faltaba, se lo pedían al mar. Para muchas familias de la isla, el mar fue infancia, alimento… e historia. Y para quienes se fueron, siempre hubo algo que los hizo volver. Porque hay sitios que no se dejan… aunque uno se vaya. Hoy, este paisaje sigue siendo hermoso… pero para muchos, sigue siendo parte de su vida.', 21.2588100, -86.7469200, '/assets/mirador_mar_caribe.jpeg', 4.80, 1.0, 0.00, 'Isla Mujeres', 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(2, 1, 'Monumento a los Pescadores', 'Este conjunto escultórico representa la barracuda y el pez vela, dos especies emblemáticas del Caribe. Sus formas, inspiradas en el movimiento de las olas, se acompañan de una rosa de los vientos que remite a la tradición náutica de la isla. Este espacio evoca la relación histórica entre el mar y las comunidades que han vivido de él.', 'Este monumento no representa solo a los pescadores… representa una parte de la historia de la isla. Antes del turismo, el mar lo era todo: comida, trabajo, vida. Aquí se aprendía desde muy joven a entender al mar… y a trabajar con él para salir adelante. Hoy, muchas cosas han cambiado… pero para quienes viven aquí, el mar sigue siendo parte de su historia. Porque Isla Mujeres nace del mar… y de quienes aprendieron a vivir con él.', 21.2567900, -86.7502500, '/assets/monumento_a_los_pescadores.jpg', 4.60, 0.5, 0.00, 'Isla Mujeres', 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(3, 2, 'Playa Norte', 'Playa Norte es una playa cercana y de fácil acceso, disfrutada tanto por locales como por visitantes. Su amplia costa de arena blanca y sus aguas tranquilas, de tonos únicos, invitan a nadar, descansar y disfrutar del mar con calma.', 'Parece una alberca natural… ¿verdad? Agua tranquila, poca profundidad… todo invita a entrar sin pensarlo. Pero lo que estás viendo aquí no es casualidad. La forma de la isla, las corrientes y la arena hacen que este mar sea así de claro… así de suave… así de único. Para quienes han vivido aquí siempre, este lugar era parte de su día a día. Un espacio donde el mar daba lo necesario para vivir… y también un lugar para encontrarse, descansar… y compartir. Hoy también nosotros lo podemos disfrutar y, mantenerlo así, dependerá de cómo decidimos cuidarlo.', 21.2584700, -86.7525800, '/assets/playa_norte.jpg', 4.90, 3.0, 0.00, 'Isla Mujeres', 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(4, 2, 'Escultura Tiburón Ballena (Dominó)', 'Esta escultura representa al tiburón ballena, una de las especies más emblemáticas de Isla Mujeres. Su estructura, inspirada en una embarcación, hace referencia a la tradición pesquera y al vínculo de la comunidad con el mar. Un símbolo de la riqueza natural y la identidad marina de la isla.', 'Este es el pez más grande del mundo… y para los pescadores de la isla es simplemente «Dominó», por los puntos en su piel. Un nombre sencillo… que nace de observar, convivir… y entender el mar. Hoy lo admiramos… pero para que nos siga visitando, depende de cómo cuidemos este mar.', 21.2507000, -86.7433800, '/assets/tiburon_ballena.jpg', 4.70, 0.5, 0.00, 'Isla Mujeres', 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(5, 4, 'Escaleras de la Inclusión', 'Una escalera que va más allá de conectar espacios… conecta valores. Sus colores y palabras invitan a reflexionar sobre la importancia del respeto, la inclusión y la convivencia en comunidad.', 'Esta escalera no solo conecta un punto con otro… También conecta algo más importante: la forma en que convivimos. Cada color, cada palabra, habla de algo que parece sencillo… pero que hace posible la vida en comunidad: respeto, inclusión, empatía. En un lugar como Isla Mujeres, donde todo se comparte —el mar, el trabajo, la vida— aprender a convivir no es opcional… es parte de todo. Porque al final, más allá del paisaje… lo que realmente construye un lugar son las personas y la forma en que se relacionan.', 21.2533000, -86.7470000, '/assets/escaleras_de_la_inclusion.jpg', 4.50, 0.5, 0.00, 'Isla Mujeres', 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(6, 1, 'Hacienda Mundaca', 'La Hacienda Mundaca, o «Vista Alegre», es un espacio que resguarda parte de la historia de Isla Mujeres. Su arco de acceso abre paso a un entorno natural donde aún permanecen las huellas de otro tiempo. Un sitio que invita a descubrir las historias y leyendas que forman parte de la memoria del lugar.', 'Este lugar no empieza con Mundaca… Mucho antes, este espacio ya había sido habitado. Fue parte de un territorio maya, vinculado con la espiritualidad y la vida en la isla. Siglos después, llegó el pirata Fermín Mundaca, un navegante marcado por el comercio y los conflictos del mar, quien construyó aquí su hacienda con ambición y poder. Pero lo que más permanece… no es eso. Es la historia de una mujer isleña, La Trigueña, que decidió no aceptar ese mundo a cambio de dinero. Y con el tiempo, este lugar se convirtió en un espacio donde se cruzan las historias… y los valores que han dado identidad a la isla.', 21.2304000, -86.7361000, '/assets/hacienda_mundaca.jpg', 4.60, 2.0, 0.00, 'Isla Mujeres', 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(7, 1, 'Módulo de Información', 'Este módulo de atención turística retoma elementos de la arquitectura tradicional de Isla Mujeres. Su diseño, con estructura elevada, uso de madera y techos inclinados, evoca las viviendas que formaron parte del origen de este pueblo de pescadores. Más que un punto de información, representa una referencia visual del estilo de vida y la forma de habitar de las primeras familias de la isla.', 'Este lugar no solo informa… también cuenta cómo se vivía aquí. Antes de los hoteles y las construcciones actuales, las casas en Isla Mujeres eran sencillas, elevadas… adaptadas al clima, al mar y a la vida en comunidad. Materiales locales, espacios abiertos… y una relación muy cercana con el entorno. Vivir aquí no era solo habitar una casa. Era entender el viento, el calor… y el ritmo del mar. Hoy, este espacio recupera esa forma de vivir. Porque la identidad de un lugar también se construye desde cómo se habita.', 21.2507000, -86.7433800, '/assets/modulos_de_informacion.jpg', 4.40, 0.5, 0.00, 'Isla Mujeres', 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opcion_respuesta`
--

CREATE TABLE `opcion_respuesta` (
  `id` int(11) NOT NULL,
  `pregunta_id` int(11) NOT NULL,
  `inciso` char(1) NOT NULL,
  `texto` varchar(300) NOT NULL,
  `categoria_destino` varchar(120) NOT NULL,
  `puntuacion` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `opcion_respuesta`
--

INSERT INTO `opcion_respuesta` (`id`, `pregunta_id`, `inciso`, `texto`, `categoria_destino`, `puntuacion`) VALUES
(1, 1, 'A', 'Historia, monumentos y leyendas', 'Histórico-Cultural', 1),
(2, 1, 'B', 'El mar, las playas y la naturaleza', 'Naturaleza y Mar', 1),
(3, 1, 'C', 'Miradores y paisajes para fotografiar', 'Miradores y Fotografía', 1),
(4, 1, 'D', 'La vida y los valores de la comunidad', 'Comunidad e Inclusión', 1),
(5, 2, 'A', 'Recorrer sitios con historia', 'Histórico-Cultural', 1),
(6, 2, 'B', 'Nadar y disfrutar la playa', 'Naturaleza y Mar', 1),
(7, 2, 'C', 'Tomar fotografías del entorno', 'Miradores y Fotografía', 1),
(8, 2, 'D', 'Convivir con la gente local', 'Comunidad e Inclusión', 1),
(9, 3, 'A', 'Haciendas y monumentos', 'Histórico-Cultural', 1),
(10, 3, 'B', 'Playas y entornos marinos', 'Naturaleza y Mar', 1),
(11, 3, 'C', 'Miradores con vista al mar', 'Miradores y Fotografía', 1),
(12, 3, 'D', 'Espacios de encuentro comunitario', 'Comunidad e Inclusión', 1),
(13, 4, 'A', 'Conocer leyendas del pasado', 'Histórico-Cultural', 1),
(14, 4, 'B', 'Observar la vida marina', 'Naturaleza y Mar', 1),
(15, 4, 'C', 'Capturar un atardecer perfecto', 'Miradores y Fotografía', 1),
(16, 4, 'D', 'Aprender de la cultura local', 'Comunidad e Inclusión', 1),
(17, 5, 'A', 'Su historia e identidad', 'Histórico-Cultural', 1),
(18, 5, 'B', 'Sus paisajes naturales', 'Naturaleza y Mar', 1),
(19, 5, 'C', 'Sus vistas panorámicas', 'Miradores y Fotografía', 1),
(20, 5, 'D', 'Su gente y tradiciones', 'Comunidad e Inclusión', 1),
(21, 6, 'A', 'Arquitectura y monumentos', 'Histórico-Cultural', 1),
(22, 6, 'B', 'Naturaleza y mar', 'Naturaleza y Mar', 1),
(23, 6, 'C', 'Paisajes y panorámicas', 'Miradores y Fotografía', 1),
(24, 6, 'D', 'Personas y comunidad', 'Comunidad e Inclusión', 1),
(25, 7, 'A', 'Visitar una hacienda histórica', 'Histórico-Cultural', 1),
(26, 7, 'B', 'Pasar el día en la playa', 'Naturaleza y Mar', 1),
(27, 7, 'C', 'Subir a un mirador', 'Miradores y Fotografía', 1),
(28, 7, 'D', 'Participar en una actividad comunitaria', 'Comunidad e Inclusión', 1),
(29, 8, 'A', 'Historia y patrimonio', 'Histórico-Cultural', 1),
(30, 8, 'B', 'Mar y conservación', 'Naturaleza y Mar', 1),
(31, 8, 'C', 'Fotografía y paisaje', 'Miradores y Fotografía', 1),
(32, 8, 'D', 'Inclusión y comunidad', 'Comunidad e Inclusión', 1),
(33, 9, 'A', 'Conocimiento del pasado', 'Histórico-Cultural', 1),
(34, 9, 'B', 'Aventura natural', 'Naturaleza y Mar', 1),
(35, 9, 'C', 'Paisajes memorables', 'Miradores y Fotografía', 1),
(36, 9, 'D', 'Conexión humana', 'Comunidad e Inclusión', 1),
(37, 10, 'A', 'Cultural e histórico', 'Histórico-Cultural', 1),
(38, 10, 'B', 'Natural y marino', 'Naturaleza y Mar', 1),
(39, 10, 'C', 'Fotográfico y panorámico', 'Miradores y Fotografía', 1),
(40, 10, 'D', 'Comunitario e inclusivo', 'Comunidad e Inclusión', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_turistico`
--

CREATE TABLE `perfil_turistico` (
  `id` int(11) NOT NULL,
  `nombre_perfil` varchar(120) NOT NULL,
  `descripcion` text NOT NULL,
  `icono` varchar(60) DEFAULT NULL,
  `color_hex` varchar(9) DEFAULT '#0F3D2E',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfil_turistico`
--

INSERT INTO `perfil_turistico` (`id`, `nombre_perfil`, `descripcion`, `icono`, `color_hex`, `created_at`, `updated_at`) VALUES
(1, 'Explorador Cultural', 'Viajero apasionado por la historia, el patrimonio y las leyendas de Isla Mujeres.', 'landmark', '#B5462F', '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(2, 'Amante de la Naturaleza', 'Busca el contacto con el mar, las playas y la vida natural del Caribe.', 'waves', '#7FA88B', '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(3, 'Cazador de Paisajes', 'Disfruta los miradores, las vistas al mar y capturar cada paisaje con su cámara.', 'camera', '#8B5A2B', '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(4, 'Espíritu Comunitario', 'Valora la convivencia, la inclusión y las historias de la comunidad local.', 'users', '#1B4332', '2026-06-22 12:00:00', '2026-06-22 12:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(400) NOT NULL,
  `categoria` varchar(120) NOT NULL,
  `orden` int(11) DEFAULT 0,
  `activa` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `pregunta`, `categoria`, `orden`, `activa`, `created_at`, `updated_at`) VALUES
(1, '¿Qué te gustaría descubrir en Isla Mujeres?', 'mixta', 1, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(2, '¿Qué actividad disfrutas más al viajar?', 'mixta', 2, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(3, '¿Qué tipo de lugar prefieres visitar?', 'mixta', 3, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(4, '¿Qué experiencia te emociona más?', 'mixta', 4, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(5, '¿Qué valoras más de un destino?', 'mixta', 5, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(6, '¿Qué tipo de fotografías te gusta tomar?', 'mixta', 6, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(7, '¿Qué actividad elegirías?', 'mixta', 7, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(8, '¿Qué tema te interesa más?', 'mixta', 8, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(9, '¿Qué buscas al viajar?', 'mixta', 9, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00'),
(10, '¿Cómo definirías tu viaje ideal?', 'mixta', 10, 1, '2026-06-22 12:00:00', '2026-06-22 12:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recomendacion`
--

CREATE TABLE `recomendacion` (
  `id` int(11) NOT NULL,
  `visitante_id` int(11) NOT NULL,
  `experiencia_id` int(11) NOT NULL,
  `score` decimal(5,2) DEFAULT 0.00,
  `fecha_generada` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `id` int(11) NOT NULL,
  `visitante_id` int(11) NOT NULL,
  `pregunta_id` int(11) NOT NULL,
  `respuesta` varchar(300) NOT NULL,
  `puntuacion` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitante`
--

CREATE TABLE `visitante` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `edad` int(11) NOT NULL,
  `correo_electronico` varchar(180) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `perfil_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

ALTER TABLE `analisis_ia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_analisis_visitante` (`visitante_id`);

ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

ALTER TABLE `experiencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_experiencia_categoria` (`categoria_id`);

ALTER TABLE `opcion_respuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_opcion_pregunta` (`pregunta_id`);

ALTER TABLE `perfil_turistico`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_perfil` (`nombre_perfil`);

ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `recomendacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recomendacion_experiencia` (`experiencia_id`),
  ADD KEY `idx_recomendacion_visitante` (`visitante_id`);

ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_respuesta_pregunta` (`pregunta_id`),
  ADD KEY `idx_respuesta_visitante` (`visitante_id`);

ALTER TABLE `visitante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_visitante_correo` (`correo_electronico`),
  ADD KEY `idx_visitante_perfil` (`perfil_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

ALTER TABLE `analisis_ia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `experiencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `opcion_respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

ALTER TABLE `perfil_turistico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `recomendacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `visitante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

ALTER TABLE `analisis_ia`
  ADD CONSTRAINT `fk_analisis_visitante` FOREIGN KEY (`visitante_id`) REFERENCES `visitante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `experiencia`
  ADD CONSTRAINT `fk_experiencia_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `opcion_respuesta`
  ADD CONSTRAINT `fk_opcion_pregunta` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `recomendacion`
  ADD CONSTRAINT `fk_recomendacion_experiencia` FOREIGN KEY (`experiencia_id`) REFERENCES `experiencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_recomendacion_visitante` FOREIGN KEY (`visitante_id`) REFERENCES `visitante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `respuesta`
  ADD CONSTRAINT `fk_respuesta_pregunta` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_respuesta_visitante` FOREIGN KEY (`visitante_id`) REFERENCES `visitante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `visitante`
  ADD CONSTRAINT `fk_visitante_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil_turistico` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
