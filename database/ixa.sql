-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-06-2026 a las 04:29:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ixa_db`
--

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

--
-- Volcado de datos para la tabla `analisis_ia`
--

INSERT INTO `analisis_ia` (`id`, `visitante_id`, `perfil_detectado`, `confianza`, `modelo_usado`, `explicacion`, `fecha_analisis`) VALUES
(1, 1, 'Explorador Cultural', 99.62, 'RandomForest', 'Te identificamos como «Explorador Cultural» con una confianza del 100%. Durante el cuestionario mostraste una fuerte afinidad hacia . Por eso te recomendamos experiencias enfocadas en actividades culturales, históricas y patrimoniales dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-11 04:50:49'),
(2, 2, 'Viajero Gastronómico', 99.16, 'RandomForest', 'Te identificamos como «Viajero Gastronómico» con una confianza del 99%. Durante el cuestionario mostraste una fuerte afinidad hacia . Por eso te recomendamos experiencias enfocadas en experiencias culinarias y sabores locales dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-11 04:50:50'),
(3, 3, 'Ecoturista', 99.64, 'RandomForest', 'Te identificamos como «Ecoturista» con una confianza del 100%. Durante el cuestionario mostraste una fuerte afinidad hacia . Por eso te recomendamos experiencias enfocadas en naturaleza, conservación y ecosistemas dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-11 04:50:50'),
(4, 4, 'Descubridor Comunitario', 99.85, 'RandomForest', 'Te identificamos como «Descubridor Comunitario» con una confianza del 100%. Durante el cuestionario mostraste una fuerte afinidad hacia . Por eso te recomendamos experiencias enfocadas en tradiciones vivas y convivencia con la comunidad dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-11 04:50:51'),
(5, 5, 'Buscador de Bienestar', 99.31, 'RandomForest', 'Te identificamos como «Buscador de Bienestar» con una confianza del 99%. Durante el cuestionario mostraste una fuerte afinidad hacia . Por eso te recomendamos experiencias enfocadas en calma, equilibrio y experiencias de bienestar dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-11 04:50:52'),
(6, 6, 'Explorador Cultural', 99.62, 'RandomForest', 'Te identificamos como «Explorador Cultural» con una confianza del 100%. Durante el cuestionario mostraste una fuerte afinidad hacia . Por eso te recomendamos experiencias enfocadas en actividades culturales, históricas y patrimoniales dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-11 04:57:20'),
(7, 7, 'Explorador Cultural', 99.62, 'RandomForest', 'Te identificamos como «Explorador Cultural» con una confianza del 100%. Durante el cuestionario mostraste una fuerte afinidad hacia . Por eso te recomendamos experiencias enfocadas en actividades culturales, históricas y patrimoniales dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-11 05:01:40'),
(8, 8, 'Ecoturista', 33.81, 'RandomForest', 'Te identificamos como «Ecoturista» con una confianza del 34%. Durante el cuestionario mostraste una fuerte afinidad hacia Ecológico, Gastronómico y Cultural. Por eso te recomendamos experiencias enfocadas en naturaleza, conservación y ecosistemas dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-11 05:06:27'),
(9, 9, 'Ecoturista', 69.87, 'RandomForest', 'Te identificamos como «Ecoturista» con una confianza del 70%. Durante el cuestionario mostraste una fuerte afinidad hacia Ecológico, Gastronómico y Cultural. Por eso te recomendamos experiencias enfocadas en naturaleza, conservación y ecosistemas dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-12 16:37:52'),
(10, 10, 'Ecoturista', 69.87, 'RandomForest', 'Te identificamos como «Ecoturista» con una confianza del 70%. Durante el cuestionario mostraste una fuerte afinidad hacia Ecológico, Gastronómico y Cultural. Por eso te recomendamos experiencias enfocadas en naturaleza, conservación y ecosistemas dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-12 16:39:08'),
(11, 11, 'Explorador Cultural', 98.57, 'RandomForest', 'Te identificamos como «Explorador Cultural» con una confianza del 99%. Durante el cuestionario mostraste una fuerte afinidad hacia Cultural y Gastronómico. Por eso te recomendamos experiencias enfocadas en actividades culturales, históricas y patrimoniales dentro de los Pueblos Mágicos de Isla Mujeres.', '2026-06-12 16:41:11');

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
(1, 'Cultural', 'Experiencias históricas, arqueológicas y patrimoniales.', 'landmark', '#B5462F', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(2, 'Gastronómico', 'Rutas de sabores, cocina tradicional y mercados locales.', 'utensils', '#C9A227', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(3, 'Ecológico', 'Senderos, observación de fauna y ecosistemas protegidos.', 'leaf', '#7FA88B', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(4, 'Comunitario', 'Festivales, talleres y convivencia con habitantes locales.', 'users', '#1B4332', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(5, 'Bienestar', 'Retiros, yoga, meditación y espacios de relajación.', 'sparkles', '#0F3D2E', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(6, 'Fotográfico', 'Puntos panorámicos y escenarios ideales para fotografía.', 'camera', '#8B5A2B', '2026-06-11 04:49:18', '2026-06-11 04:49:18');

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
(1, 'theme', 'ixa', '2026-06-12 17:01:27'),
(2, 'theme_4t_enabled', 'false', '2026-06-12 17:01:27'),
(3, 'admin_email', 'AdminIXA@UTCancun.com', '2026-06-11 04:49:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencia`
--

CREATE TABLE `experiencia` (
  `id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(180) NOT NULL,
  `descripcion` text NOT NULL,
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
--

INSERT INTO `experiencia` (`id`, `categoria_id`, `nombre`, `descripcion`, `latitud`, `longitud`, `imagen_url`, `puntuacion_promedio`, `duracion_horas`, `precio_aprox`, `pueblo_magico`, `activa`, `created_at`, `updated_at`) VALUES
(1, 1, 'Templo de la Diosa Ixchel (Punta Sur)', 'Vestigios del santuario maya dedicado a Ixchel, diosa de la luna, la fertilidad y la medicina. Ubicado en el extremo sur, el punto donde primero amanece en México, entre acantilados y el Parque Escultórico.', 21.2058000, -86.7044000, 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=70', 4.80, 2.5, 120.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(2, 1, 'Hacienda Mundaca', 'Antigua hacienda del pirata Fermín Mundaca (s. XIX), con arcos de piedra, jardines y la leyenda de su amor no correspondido por \"La Trigueña\".', 21.2304000, -86.7361000, 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=70', 4.40, 2.0, 70.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(3, 1, 'Centro Histórico y Parroquia', 'Caminata por el corazón del pueblo: la Iglesia de la Inmaculada Concepción, calles coloridas y la historia pesquera de la isla.', 21.2575000, -86.7466000, 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=800&q=70', 4.60, 2.0, 0.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(4, 2, 'Ruta de Cocina Yucateca', 'Degustación de cochinita pibil, tikin xic (pescado en achiote) y recados tradicionales en la Avenida Hidalgo, corredor gastronómico de la isla.', 21.2566000, -86.7461000, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=70', 4.90, 3.0, 450.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(5, 2, 'Taller de Chocolate y Cacao Maya', 'Experiencia sensorial sobre el cacao, desde la semilla hasta la bebida ritual maya, con molienda en metate.', 21.2560000, -86.7456000, 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=70', 4.70, 2.0, 380.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(6, 2, 'Mercado Municipal de Isla Mujeres', 'Recorrido por las cocinas económicas y puestos del mercado local: marquesitas, ceviches y antojitos isleños.', 21.2592000, -86.7479000, 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=70', 4.50, 1.5, 200.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(7, 3, 'Tortugranja (Granja de Tortugas)', 'Centro de protección de la tortuga marina fundado en 1982. Conoce criaderos, corrales marinos y participa en la liberación de crías en temporada.', 21.2227000, -86.7316000, 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=70', 4.75, 2.0, 60.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(8, 3, 'Parque Nacional El Garrafón', 'Snorkel en arrecife de coral, tirolesas frente al mar y senderos en el extremo sur de la isla, área natural protegida.', 21.2106000, -86.7104000, 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=70', 4.60, 3.0, 900.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(9, 3, 'Manglares de Laguna Makax', 'Recorrido en kayak por los manglares de la laguna Makax, refugio de aves, peces juveniles y vida marina.', 21.2360000, -86.7438000, 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=70', 4.55, 2.5, 350.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(10, 4, 'Taller con Artesanos Locales', 'Convivencia con artesanos isleños para crear piezas de barro, concha y tejido inspiradas en la cultura maya-caribeña.', 21.2562000, -86.7459000, 'https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?auto=format&fit=crop&w=800&q=70', 4.75, 2.5, 280.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(11, 4, 'Cooperativa Pesquera Local', 'Sal a la mar con pescadores de la cooperativa, aprende la pesca artesanal y su forma de vida frente a Laguna Makax.', 21.2385000, -86.7425000, 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=70', 4.55, 3.0, 520.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(12, 4, 'Festival de Tradiciones Isleñas', 'Participa en danzas, música yucateca y celebraciones del Parque Central junto a la comunidad local.', 21.2572000, -86.7464000, 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=70', 4.65, 2.5, 120.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(13, 5, 'Yoga al Amanecer en Punta Sur', 'Sesión de yoga y meditación recibiendo el primer amanecer de México sobre los acantilados del Caribe.', 21.2065000, -86.7048000, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=70', 4.90, 1.5, 320.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(14, 5, 'Temazcal Ceremonial Maya', 'Ritual ancestral de purificación en temazcal, guiado por un temazcalero local, cerca de la Hacienda Mundaca.', 21.2320000, -86.7360000, 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=70', 4.80, 2.0, 650.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(15, 5, 'Spa de Bienestar Holístico', 'Terapias de relajación con técnicas tradicionales, aromaterapia y aceites naturales del Caribe.', 21.2548000, -86.7452000, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=70', 4.50, 2.0, 780.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(16, 6, 'Mirador Acantilado del Amanecer (Punta Sur)', 'El punto más oriental de México, ideal para fotografía de paisaje, esculturas monumentales y el mar turquesa.', 21.2056000, -86.7038000, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70', 4.85, 1.5, 120.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(17, 6, 'Galería de Murales del Centro', 'Recorrido fotográfico por el arte urbano y los murales coloridos que decoran las calles del pueblo isleño.', 21.2569000, -86.7458000, 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=800&q=70', 4.40, 1.0, 0.00, 'Isla Mujeres', 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18');

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
(1, 1, 'A', 'Aprender historia', 'Cultural', 1),
(2, 1, 'B', 'Probar comida local', 'Gastronómico', 1),
(3, 1, 'C', 'Explorar naturaleza', 'Ecológico', 1),
(4, 1, 'D', 'Conocer personas locales', 'Comunitario', 1),
(5, 1, 'E', 'Relajarme', 'Bienestar', 1),
(6, 2, 'A', 'Cultura', 'Cultural', 1),
(7, 2, 'B', 'Gastronomía', 'Gastronómico', 1),
(8, 2, 'C', 'Ecosistemas', 'Ecológico', 1),
(9, 2, 'D', 'Tradiciones', 'Comunitario', 1),
(10, 2, 'E', 'Bienestar', 'Bienestar', 1),
(11, 3, 'A', 'Museos', 'Cultural', 1),
(12, 3, 'B', 'Restaurantes', 'Gastronómico', 1),
(13, 3, 'C', 'Senderismo', 'Ecológico', 1),
(14, 3, 'D', 'Eventos comunitarios', 'Comunitario', 1),
(15, 3, 'E', 'Meditación', 'Bienestar', 1),
(16, 4, 'A', 'Recorrido histórico', 'Cultural', 1),
(17, 4, 'B', 'Ruta gastronómica', 'Gastronómico', 1),
(18, 4, 'C', 'Sendero ecológico', 'Ecológico', 1),
(19, 4, 'D', 'Festival local', 'Comunitario', 1),
(20, 4, 'E', 'Retiro de bienestar', 'Bienestar', 1),
(21, 5, 'A', 'Aprendizaje', 'Cultural', 1),
(22, 5, 'B', 'Sabores', 'Gastronómico', 1),
(23, 5, 'C', 'Naturaleza', 'Ecológico', 1),
(24, 5, 'D', 'Comunidad', 'Comunitario', 1),
(25, 5, 'E', 'Tranquilidad', 'Bienestar', 1),
(26, 6, 'A', 'Arquitectura', 'Cultural', 1),
(27, 6, 'B', 'Platillos', 'Gastronómico', 1),
(28, 6, 'C', 'Paisajes', 'Ecológico', 1),
(29, 6, 'D', 'Personas', 'Comunitario', 1),
(30, 6, 'E', 'Espacios relajantes', 'Bienestar', 1),
(31, 7, 'A', 'Taller artesanal', 'Cultural', 1),
(32, 7, 'B', 'Clase de cocina', 'Gastronómico', 1),
(33, 7, 'C', 'Observación de fauna', 'Ecológico', 1),
(34, 7, 'D', 'Actividad comunitaria', 'Comunitario', 1),
(35, 7, 'E', 'Yoga', 'Bienestar', 1),
(36, 8, 'A', 'Historia', 'Cultural', 1),
(37, 8, 'B', 'Gastronomía', 'Gastronómico', 1),
(38, 8, 'C', 'Conservación', 'Ecológico', 1),
(39, 8, 'D', 'Cultura local', 'Comunitario', 1),
(40, 8, 'E', 'Bienestar', 'Bienestar', 1),
(41, 9, 'A', 'Conocimiento', 'Cultural', 1),
(42, 9, 'B', 'Experiencias culinarias', 'Gastronómico', 1),
(43, 9, 'C', 'Aventura natural', 'Ecológico', 1),
(44, 9, 'D', 'Conexión humana', 'Comunitario', 1),
(45, 9, 'E', 'Paz', 'Bienestar', 1),
(46, 10, 'A', 'Cultural', 'Cultural', 1),
(47, 10, 'B', 'Gastronómico', 'Gastronómico', 1),
(48, 10, 'C', 'Ecológico', 'Ecológico', 1),
(49, 10, 'D', 'Comunitario', 'Comunitario', 1),
(50, 10, 'E', 'Relajante', 'Bienestar', 1);

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
(1, 'Explorador Cultural', 'Viajero apasionado por la historia, la arquitectura y las raíces ancestrales de los Pueblos Mágicos.', 'landmark', '#B5462F', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(2, 'Viajero Gastronómico', 'Disfruta descubriendo sabores locales, recetas tradicionales y experiencias culinarias auténticas.', 'utensils', '#C9A227', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(3, 'Ecoturista', 'Busca conexión con la naturaleza, conservación, senderos y ecosistemas únicos de la isla.', 'leaf', '#7FA88B', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(4, 'Descubridor Comunitario', 'Valora el contacto humano, las tradiciones vivas y las experiencias compartidas con la comunidad.', 'users', '#1B4332', '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(5, 'Buscador de Bienestar', 'Prioriza la calma, la meditación, el descanso y las experiencias de bienestar integral.', 'sparkles', '#0F3D2E', '2026-06-11 04:49:18', '2026-06-11 04:49:18');

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
(1, '¿Qué actividad disfrutas más durante un viaje?', 'mixta', 1, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(2, '¿Qué te llama más la atención de un destino?', 'mixta', 2, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(3, '¿Cómo prefieres pasar tu tiempo libre?', 'mixta', 3, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(4, '¿Qué experiencia te genera más emoción?', 'mixta', 4, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(5, '¿Qué valoras más al viajar?', 'mixta', 5, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(6, '¿Qué tipo de fotografías te gusta tomar?', 'mixta', 6, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(7, '¿Qué actividad elegirías?', 'mixta', 7, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(8, '¿Qué tema te interesa más?', 'mixta', 8, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(9, '¿Qué buscas al viajar?', 'mixta', 9, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18'),
(10, '¿Cómo definirías tu viaje ideal?', 'mixta', 10, 1, '2026-06-11 04:49:18', '2026-06-11 04:49:18');

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

--
-- Volcado de datos para la tabla `recomendacion`
--

INSERT INTO `recomendacion` (`id`, `visitante_id`, `experiencia_id`, `score`, `fecha_generada`) VALUES
(1, 1, 1, 124.60, '2026-06-11 04:50:49'),
(2, 1, 3, 124.20, '2026-06-11 04:50:49'),
(3, 1, 2, 123.80, '2026-06-11 04:50:49'),
(4, 1, 4, 9.80, '2026-06-11 04:50:49'),
(5, 1, 13, 9.80, '2026-06-11 04:50:49'),
(6, 1, 16, 9.70, '2026-06-11 04:50:49'),
(7, 1, 14, 9.60, '2026-06-11 04:50:49'),
(8, 1, 7, 9.50, '2026-06-11 04:50:49'),
(9, 2, 4, 124.80, '2026-06-11 04:50:50'),
(10, 2, 5, 124.40, '2026-06-11 04:50:50'),
(11, 2, 6, 124.00, '2026-06-11 04:50:50'),
(12, 2, 13, 9.80, '2026-06-11 04:50:50'),
(13, 2, 16, 9.70, '2026-06-11 04:50:50'),
(14, 2, 1, 9.60, '2026-06-11 04:50:50'),
(15, 2, 14, 9.60, '2026-06-11 04:50:50'),
(16, 2, 7, 9.50, '2026-06-11 04:50:50'),
(17, 3, 7, 124.50, '2026-06-11 04:50:50'),
(18, 3, 8, 124.20, '2026-06-11 04:50:50'),
(19, 3, 9, 124.10, '2026-06-11 04:50:50'),
(20, 3, 4, 9.80, '2026-06-11 04:50:50'),
(21, 3, 13, 9.80, '2026-06-11 04:50:50'),
(22, 3, 16, 9.70, '2026-06-11 04:50:50'),
(23, 3, 1, 9.60, '2026-06-11 04:50:50'),
(24, 3, 14, 9.60, '2026-06-11 04:50:50'),
(25, 4, 10, 124.50, '2026-06-11 04:50:51'),
(26, 4, 12, 124.30, '2026-06-11 04:50:51'),
(27, 4, 11, 124.10, '2026-06-11 04:50:51'),
(28, 4, 4, 9.80, '2026-06-11 04:50:51'),
(29, 4, 13, 9.80, '2026-06-11 04:50:51'),
(30, 4, 16, 9.70, '2026-06-11 04:50:51'),
(31, 4, 1, 9.60, '2026-06-11 04:50:51'),
(32, 4, 14, 9.60, '2026-06-11 04:50:51'),
(33, 5, 13, 124.80, '2026-06-11 04:50:52'),
(34, 5, 14, 124.60, '2026-06-11 04:50:52'),
(35, 5, 15, 124.00, '2026-06-11 04:50:52'),
(36, 5, 4, 9.80, '2026-06-11 04:50:52'),
(37, 5, 16, 9.70, '2026-06-11 04:50:52'),
(38, 5, 1, 9.60, '2026-06-11 04:50:52'),
(39, 5, 7, 9.50, '2026-06-11 04:50:52'),
(40, 5, 10, 9.50, '2026-06-11 04:50:52'),
(41, 6, 1, 124.60, '2026-06-11 04:57:20'),
(42, 6, 3, 124.20, '2026-06-11 04:57:20'),
(43, 6, 2, 123.80, '2026-06-11 04:57:20'),
(44, 6, 4, 9.80, '2026-06-11 04:57:20'),
(45, 6, 13, 9.80, '2026-06-11 04:57:20'),
(46, 6, 16, 9.70, '2026-06-11 04:57:20'),
(47, 6, 14, 9.60, '2026-06-11 04:57:20'),
(48, 6, 7, 9.50, '2026-06-11 04:57:20'),
(49, 7, 1, 124.60, '2026-06-11 05:01:41'),
(50, 7, 3, 124.20, '2026-06-11 05:01:41'),
(51, 7, 2, 123.80, '2026-06-11 05:01:41'),
(52, 7, 4, 9.80, '2026-06-11 05:01:41'),
(53, 7, 13, 9.80, '2026-06-11 05:01:41'),
(54, 7, 16, 9.70, '2026-06-11 05:01:41'),
(55, 7, 14, 9.60, '2026-06-11 05:01:41'),
(56, 7, 7, 9.50, '2026-06-11 05:01:41'),
(57, 8, 7, 64.50, '2026-06-11 05:06:27'),
(58, 8, 8, 64.20, '2026-06-11 05:06:27'),
(59, 8, 9, 64.10, '2026-06-11 05:06:27'),
(60, 8, 4, 39.80, '2026-06-11 05:06:27'),
(61, 8, 5, 39.40, '2026-06-11 05:06:27'),
(62, 8, 6, 39.00, '2026-06-11 05:06:27'),
(63, 8, 13, 19.80, '2026-06-11 05:06:27'),
(64, 8, 1, 19.60, '2026-06-11 05:06:27'),
(65, 9, 7, 64.50, '2026-06-12 16:37:52'),
(66, 9, 8, 64.20, '2026-06-12 16:37:52'),
(67, 9, 9, 64.10, '2026-06-12 16:37:52'),
(68, 9, 4, 39.80, '2026-06-12 16:37:52'),
(69, 9, 5, 39.40, '2026-06-12 16:37:52'),
(70, 9, 6, 39.00, '2026-06-12 16:37:52'),
(71, 9, 1, 29.60, '2026-06-12 16:37:52'),
(72, 9, 3, 29.20, '2026-06-12 16:37:52'),
(73, 10, 7, 64.50, '2026-06-12 16:39:08'),
(74, 10, 8, 64.20, '2026-06-12 16:39:08'),
(75, 10, 9, 64.10, '2026-06-12 16:39:08'),
(76, 10, 4, 39.80, '2026-06-12 16:39:08'),
(77, 10, 5, 39.40, '2026-06-12 16:39:08'),
(78, 10, 6, 39.00, '2026-06-12 16:39:08'),
(79, 10, 1, 29.60, '2026-06-12 16:39:08'),
(80, 10, 3, 29.20, '2026-06-12 16:39:08'),
(81, 11, 1, 114.60, '2026-06-12 16:41:11'),
(82, 11, 3, 114.20, '2026-06-12 16:41:11'),
(83, 11, 2, 113.80, '2026-06-12 16:41:11'),
(84, 11, 4, 19.80, '2026-06-12 16:41:11'),
(85, 11, 5, 19.40, '2026-06-12 16:41:11'),
(86, 11, 6, 19.00, '2026-06-12 16:41:11'),
(87, 11, 13, 9.80, '2026-06-12 16:41:11'),
(88, 11, 16, 9.70, '2026-06-12 16:41:11');

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

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`id`, `visitante_id`, `pregunta_id`, `respuesta`, `puntuacion`, `created_at`) VALUES
(1, 1, 1, 'Aprender historia', 1, '2026-06-11 04:50:49'),
(2, 1, 2, 'Cultura', 1, '2026-06-11 04:50:49'),
(3, 1, 3, 'Museos', 1, '2026-06-11 04:50:49'),
(4, 1, 4, 'Recorrido histórico', 1, '2026-06-11 04:50:49'),
(5, 1, 5, 'Aprendizaje', 1, '2026-06-11 04:50:49'),
(6, 1, 6, 'Arquitectura', 1, '2026-06-11 04:50:49'),
(7, 1, 7, 'Taller artesanal', 1, '2026-06-11 04:50:49'),
(8, 1, 8, 'Historia', 1, '2026-06-11 04:50:49'),
(9, 1, 9, 'Conocimiento', 1, '2026-06-11 04:50:49'),
(10, 1, 10, 'Cultural', 1, '2026-06-11 04:50:49'),
(11, 2, 1, 'Probar comida local', 1, '2026-06-11 04:50:50'),
(12, 2, 2, 'Gastronomía', 1, '2026-06-11 04:50:50'),
(13, 2, 3, 'Restaurantes', 1, '2026-06-11 04:50:50'),
(14, 2, 4, 'Ruta gastronómica', 1, '2026-06-11 04:50:50'),
(15, 2, 5, 'Sabores', 1, '2026-06-11 04:50:50'),
(16, 2, 6, 'Platillos', 1, '2026-06-11 04:50:50'),
(17, 2, 7, 'Clase de cocina', 1, '2026-06-11 04:50:50'),
(18, 2, 8, 'Gastronomía', 1, '2026-06-11 04:50:50'),
(19, 2, 9, 'Experiencias culinarias', 1, '2026-06-11 04:50:50'),
(20, 2, 10, 'Gastronómico', 1, '2026-06-11 04:50:50'),
(21, 3, 1, 'Explorar naturaleza', 1, '2026-06-11 04:50:50'),
(22, 3, 2, 'Ecosistemas', 1, '2026-06-11 04:50:50'),
(23, 3, 3, 'Senderismo', 1, '2026-06-11 04:50:50'),
(24, 3, 4, 'Sendero ecológico', 1, '2026-06-11 04:50:50'),
(25, 3, 5, 'Naturaleza', 1, '2026-06-11 04:50:50'),
(26, 3, 6, 'Paisajes', 1, '2026-06-11 04:50:50'),
(27, 3, 7, 'Observación de fauna', 1, '2026-06-11 04:50:50'),
(28, 3, 8, 'Conservación', 1, '2026-06-11 04:50:50'),
(29, 3, 9, 'Aventura natural', 1, '2026-06-11 04:50:50'),
(30, 3, 10, 'Ecológico', 1, '2026-06-11 04:50:50'),
(31, 4, 1, 'Conocer personas locales', 1, '2026-06-11 04:50:51'),
(32, 4, 2, 'Tradiciones', 1, '2026-06-11 04:50:51'),
(33, 4, 3, 'Eventos comunitarios', 1, '2026-06-11 04:50:51'),
(34, 4, 4, 'Festival local', 1, '2026-06-11 04:50:51'),
(35, 4, 5, 'Comunidad', 1, '2026-06-11 04:50:51'),
(36, 4, 6, 'Personas', 1, '2026-06-11 04:50:51'),
(37, 4, 7, 'Actividad comunitaria', 1, '2026-06-11 04:50:51'),
(38, 4, 8, 'Cultura local', 1, '2026-06-11 04:50:51'),
(39, 4, 9, 'Conexión humana', 1, '2026-06-11 04:50:51'),
(40, 4, 10, 'Comunitario', 1, '2026-06-11 04:50:51'),
(41, 5, 1, 'Relajarme', 1, '2026-06-11 04:50:52'),
(42, 5, 2, 'Bienestar', 1, '2026-06-11 04:50:52'),
(43, 5, 3, 'Meditación', 1, '2026-06-11 04:50:52'),
(44, 5, 4, 'Retiro de bienestar', 1, '2026-06-11 04:50:52'),
(45, 5, 5, 'Tranquilidad', 1, '2026-06-11 04:50:52'),
(46, 5, 6, 'Espacios relajantes', 1, '2026-06-11 04:50:52'),
(47, 5, 7, 'Yoga', 1, '2026-06-11 04:50:52'),
(48, 5, 8, 'Bienestar', 1, '2026-06-11 04:50:52'),
(49, 5, 9, 'Paz', 1, '2026-06-11 04:50:52'),
(50, 5, 10, 'Relajante', 1, '2026-06-11 04:50:52'),
(51, 6, 1, 'Aprender historia', 1, '2026-06-11 04:57:20'),
(52, 6, 2, 'Cultura', 1, '2026-06-11 04:57:20'),
(53, 6, 3, 'Museos', 1, '2026-06-11 04:57:20'),
(54, 6, 4, 'Recorrido histórico', 1, '2026-06-11 04:57:20'),
(55, 6, 5, 'Aprendizaje', 1, '2026-06-11 04:57:20'),
(56, 6, 6, 'Arquitectura', 1, '2026-06-11 04:57:20'),
(57, 6, 7, 'Taller artesanal', 1, '2026-06-11 04:57:20'),
(58, 6, 8, 'Historia', 1, '2026-06-11 04:57:20'),
(59, 6, 9, 'Conocimiento', 1, '2026-06-11 04:57:20'),
(60, 6, 10, 'Cultural', 1, '2026-06-11 04:57:20'),
(61, 7, 1, 'Aprender historia', 1, '2026-06-11 05:01:41'),
(62, 7, 2, 'Cultura', 1, '2026-06-11 05:01:41'),
(63, 7, 3, 'Museos', 1, '2026-06-11 05:01:41'),
(64, 7, 4, 'Recorrido histórico', 1, '2026-06-11 05:01:41'),
(65, 7, 5, 'Aprendizaje', 1, '2026-06-11 05:01:41'),
(66, 7, 6, 'Arquitectura', 1, '2026-06-11 05:01:41'),
(67, 7, 7, 'Taller artesanal', 1, '2026-06-11 05:01:41'),
(68, 7, 8, 'Historia', 1, '2026-06-11 05:01:41'),
(69, 7, 9, 'Conocimiento', 1, '2026-06-11 05:01:41'),
(70, 7, 10, 'Cultural', 1, '2026-06-11 05:01:41'),
(71, 8, 1, 'Probar comida local', 1, '2026-06-11 05:06:27'),
(72, 8, 2, 'Ecosistemas', 1, '2026-06-11 05:06:27'),
(73, 8, 3, 'Eventos comunitarios', 1, '2026-06-11 05:06:27'),
(74, 8, 4, 'Recorrido histórico', 1, '2026-06-11 05:06:27'),
(75, 8, 5, 'Tranquilidad', 1, '2026-06-11 05:06:27'),
(76, 8, 6, 'Paisajes', 1, '2026-06-11 05:06:27'),
(77, 8, 7, 'Clase de cocina', 1, '2026-06-11 05:06:27'),
(78, 8, 8, 'Conservación', 1, '2026-06-11 05:06:27'),
(79, 8, 9, 'Aventura natural', 1, '2026-06-11 05:06:27'),
(80, 8, 10, 'Gastronómico', 1, '2026-06-11 05:06:27'),
(81, 9, 1, 'Explorar naturaleza', 1, '2026-06-12 16:37:52'),
(82, 9, 2, 'Cultura', 1, '2026-06-12 16:37:52'),
(83, 9, 3, 'Restaurantes', 1, '2026-06-12 16:37:52'),
(84, 9, 4, 'Sendero ecológico', 1, '2026-06-12 16:37:52'),
(85, 9, 5, 'Tranquilidad', 1, '2026-06-12 16:37:52'),
(86, 9, 6, 'Paisajes', 1, '2026-06-12 16:37:52'),
(87, 9, 7, 'Clase de cocina', 1, '2026-06-12 16:37:52'),
(88, 9, 8, 'Gastronomía', 1, '2026-06-12 16:37:52'),
(89, 9, 9, 'Conocimiento', 1, '2026-06-12 16:37:52'),
(90, 9, 10, 'Ecológico', 1, '2026-06-12 16:37:52'),
(91, 10, 1, 'Probar comida local', 1, '2026-06-12 16:39:08'),
(92, 10, 2, 'Ecosistemas', 1, '2026-06-12 16:39:08'),
(93, 10, 3, 'Museos', 1, '2026-06-12 16:39:08'),
(94, 10, 4, 'Sendero ecológico', 1, '2026-06-12 16:39:08'),
(95, 10, 5, 'Sabores', 1, '2026-06-12 16:39:08'),
(96, 10, 6, 'Arquitectura', 1, '2026-06-12 16:39:08'),
(97, 10, 7, 'Observación de fauna', 1, '2026-06-12 16:39:08'),
(98, 10, 8, 'Bienestar', 1, '2026-06-12 16:39:08'),
(99, 10, 9, 'Experiencias culinarias', 1, '2026-06-12 16:39:08'),
(100, 10, 10, 'Ecológico', 1, '2026-06-12 16:39:08'),
(101, 11, 1, 'Aprender historia', 1, '2026-06-12 16:41:11'),
(102, 11, 2, 'Cultura', 1, '2026-06-12 16:41:11'),
(103, 11, 3, 'Restaurantes', 1, '2026-06-12 16:41:11'),
(104, 11, 4, 'Recorrido histórico', 1, '2026-06-12 16:41:11'),
(105, 11, 5, 'Aprendizaje', 1, '2026-06-12 16:41:11'),
(106, 11, 6, 'Arquitectura', 1, '2026-06-12 16:41:11'),
(107, 11, 7, 'Taller artesanal', 1, '2026-06-12 16:41:11'),
(108, 11, 8, 'Historia', 1, '2026-06-12 16:41:11'),
(109, 11, 9, 'Conocimiento', 1, '2026-06-12 16:41:11'),
(110, 11, 10, 'Cultural', 1, '2026-06-12 16:41:11');

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
-- Volcado de datos para la tabla `visitante`
--

INSERT INTO `visitante` (`id`, `nombre`, `edad`, `correo_electronico`, `telefono`, `fecha_registro`, `perfil_id`) VALUES
(1, 'T A', 30, 't@ixa.com', '9982223344', '2026-06-11 04:50:47', 1),
(2, 'T B', 30, 't@ixa.com', '9982223344', '2026-06-11 04:50:49', 2),
(3, 'T C', 30, 't@ixa.com', '9982223344', '2026-06-11 04:50:50', 3),
(4, 'T D', 30, 't@ixa.com', '9982223344', '2026-06-11 04:50:51', 4),
(5, 'T E', 30, 't@ixa.com', '9982223344', '2026-06-11 04:50:51', 5),
(6, 'mani', 22, 'manu@gmail.com', '4591089636', '2026-06-11 04:57:20', 1),
(7, 'manu', 20, 'mh@gmail.com', '56465678889', '2026-06-11 05:01:40', 1),
(8, 'AdminIXA', 22, 'AdminIXA@utcancun.com', '67868788888', '2026-06-11 05:06:27', 3),
(9, 'Eduardo', 20, 'herasb6@gmail.com', '7291019772', '2026-06-12 16:37:52', 3),
(10, 'Manu', 22, 'manuel@gmail.com', '4591089636', '2026-06-12 16:39:08', 3),
(11, 'Jdjfjd', 119, 'herasb6@gmail.com', '2468686868', '2026-06-12 16:41:11', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `analisis_ia`
--
ALTER TABLE `analisis_ia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_analisis_visitante` (`visitante_id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `experiencia`
--
ALTER TABLE `experiencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_experiencia_categoria` (`categoria_id`);

--
-- Indices de la tabla `opcion_respuesta`
--
ALTER TABLE `opcion_respuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_opcion_pregunta` (`pregunta_id`);

--
-- Indices de la tabla `perfil_turistico`
--
ALTER TABLE `perfil_turistico`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_perfil` (`nombre_perfil`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recomendacion`
--
ALTER TABLE `recomendacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recomendacion_experiencia` (`experiencia_id`),
  ADD KEY `idx_recomendacion_visitante` (`visitante_id`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_respuesta_pregunta` (`pregunta_id`),
  ADD KEY `idx_respuesta_visitante` (`visitante_id`);

--
-- Indices de la tabla `visitante`
--
ALTER TABLE `visitante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_visitante_correo` (`correo_electronico`),
  ADD KEY `idx_visitante_perfil` (`perfil_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `analisis_ia`
--
ALTER TABLE `analisis_ia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `experiencia`
--
ALTER TABLE `experiencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `opcion_respuesta`
--
ALTER TABLE `opcion_respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `perfil_turistico`
--
ALTER TABLE `perfil_turistico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `recomendacion`
--
ALTER TABLE `recomendacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `visitante`
--
ALTER TABLE `visitante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `analisis_ia`
--
ALTER TABLE `analisis_ia`
  ADD CONSTRAINT `fk_analisis_visitante` FOREIGN KEY (`visitante_id`) REFERENCES `visitante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `experiencia`
--
ALTER TABLE `experiencia`
  ADD CONSTRAINT `fk_experiencia_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opcion_respuesta`
--
ALTER TABLE `opcion_respuesta`
  ADD CONSTRAINT `fk_opcion_pregunta` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recomendacion`
--
ALTER TABLE `recomendacion`
  ADD CONSTRAINT `fk_recomendacion_experiencia` FOREIGN KEY (`experiencia_id`) REFERENCES `experiencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_recomendacion_visitante` FOREIGN KEY (`visitante_id`) REFERENCES `visitante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `fk_respuesta_pregunta` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_respuesta_visitante` FOREIGN KEY (`visitante_id`) REFERENCES `visitante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visitante`
--
ALTER TABLE `visitante`
  ADD CONSTRAINT `fk_visitante_perfil` FOREIGN KEY (`perfil_id`) REFERENCES `perfil_turistico` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;