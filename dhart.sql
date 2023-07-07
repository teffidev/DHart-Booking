CREATE DATABASE  IF NOT EXISTS `0523TDPRON2C01LAED1021PT_GRUPO6` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `0523TDPRON2C01LAED1021PT_GRUPO6`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: db.ctd.academy    Database: 0523TDPRON2C01LAED1021PT_GRUPO6
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `confirmed` bit(1) NOT NULL,
  `date_end` date NOT NULL,
  `date_start` date NOT NULL,
  `total_price` double NOT NULL,
  `product_id` int NOT NULL,
  `usuario_id` bigint NOT NULL,
  `payment_method_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_idx` (`product_id`),
  KEY `usuario_id_idx` (`usuario_id`),
  KEY `payment_method_id_idx` (`payment_method_id`),
  CONSTRAINT `payment_method_id` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  CONSTRAINT `product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (36,_binary '','2023-09-07','2023-08-28',16500000,212,105,1),(37,_binary '','2023-09-07','2023-08-28',16500000,213,105,1),(38,_binary '','2023-09-07','2023-08-28',16500000,215,105,1),(39,_binary '','2023-09-07','2023-08-28',16500000,209,105,1),(52,_binary '','2023-08-06','2023-06-28',250000,205,109,1),(53,_binary '','2023-08-06','2023-06-28',250000,206,109,1),(54,_binary '','2023-08-06','2023-06-28',250000,207,109,1),(55,_binary '','2023-06-29','2023-06-28',287840,215,108,1),(56,_binary '','2023-06-29','2023-06-28',441595,219,108,1),(57,_binary '','2023-07-04','2023-06-29',1448390,211,110,1),(58,_binary '','2023-08-06','2023-06-28',250000,208,109,1),(59,_binary '','2023-07-01','2023-06-30',441595,219,108,1),(60,_binary '','2023-08-06','2023-06-28',250000,209,109,1),(61,_binary '','2023-07-29','2023-07-27',579260,211,110,1),(62,_binary '','2023-08-06','2023-06-28',250000,212,109,1),(63,_binary '','2023-07-01','2023-06-30',287840,215,108,1),(64,_binary '','2023-07-27','2023-07-19',3103840,216,110,1),(65,_binary '','2023-08-06','2023-06-28',250000,213,115,1),(66,_binary '','2023-08-06','2023-06-28',250000,214,115,1),(67,_binary '','2023-08-06','2023-06-28',250000,217,115,1),(68,_binary '','2023-08-06','2023-06-28',250000,218,115,1),(69,_binary '','2023-08-06','2023-06-28',250000,220,115,1);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Pintura','Colecci√≥n de una gran diversidad de pinturas elaboradas con diferentes t√©cnicas y pigmentos. Explora las diferentes expresiones pict√≥ricas de artistas talentosos en una gran variedad de corrientes art√≠sticas. Disfruta nuestra colecci√≥n en l√≠nea y reserva las de tu inter√©s.','https://dhart-loadimages.s3.amazonaws.com/cc0386c9-f644-4a98-af74-9f39046d07cd.jpg','cc0386c9-f644-4a98-af74-9f39046d07cd.jpg'),(2,'Escultura','Explora piezas emblem√°ticas dentro de un repertorio de tendencias, t√©cnicas, materiales y expresiones art√≠sticas. Descubre en ellas la visi√≥n del artista sobre la realidad, la sociedad, la cultura. Dale vida a tus espacio con obras tridimensionales sofisticadas y √∫nicas','https://dhart-loadimages.s3.amazonaws.com/ce47a6ba-408b-4828-851a-7c8b0299dc98.jpg','ce47a6ba-408b-4828-851a-7c8b0299dc98.jpg'),(3,'Fotograf√≠a','Nuestra selecci√≥n de piezas fotogr√°ficas te da la posibilidad de conocer los diferentes contextos de la sociedad. La fotograf√≠a art√≠stica es, en la actualidad, una de las formas de arte m√°s llamativas en sus diferentes g√©neros o disciplinas. Tienes acceso a una gran variedad de obras nacionales e internaciones que buscan hacerte cuestionar y conocer el discurso que el artista refleja en ellas.','https://dhart-loadimages.s3.amazonaws.com/9b692ede-b19c-4ab6-86b9-ee8d4e4d8656.jpg','9b692ede-b19c-4ab6-86b9-ee8d4e4d8656.jpg'),(4,'Dibujo','Si estas interesado por el dibujo art√≠stico, aqu√≠ encontrar√°s diversas t√©cnicas de dibujo apropiadas desde estilo personal y caracter√≠stico de cada artista. Descubre la perspectiva que el artista quiere reflejar en sus trazos.','https://dhart-loadimages.s3.amazonaws.com/204d8f8a-9d33-4d1c-95cd-c7b7391c6b81.jpg','204d8f8a-9d33-4d1c-95cd-c7b7391c6b81.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (9,'https://dhart-loadimages.s3.amazonaws.com/2f7facc4-07b8-4f30-a8cb-7b188b4bf94f.png','Env√≠o gratuito',_binary ''),(10,'https://dhart-loadimages.s3.amazonaws.com/6f9b6831-996f-4e2e-afe3-50dc999fc8ba.png','Embalaje reciclable',_binary ''),(11,'https://dhart-loadimages.s3.amazonaws.com/e14237d8-7196-4a71-b4ba-61b9cc9e3296.png','Alquiler por meses',_binary ''),(12,'https://dhart-loadimages.s3.amazonaws.com/0c38cc21-d877-421e-bfff-b78d1a6f2507.png','Alquiler por d√≠as',_binary ''),(13,'https://dhart-loadimages.s3.amazonaws.com/d49b6380-4bc3-420b-988c-644130147634.png','Uso en exteriores',_binary ''),(14,'https://dhart-loadimages.s3.amazonaws.com/cbd76b14-7b2d-403e-9298-a4ce46d019ca.png','Uso en interiores',_binary '');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` VALUES (1,'Tarjeta de cr√©dito'),(2,'Tarjeta d√©bito'),(3,'Transferencia bancaria electr√≥nica'),(4,'Cheque');
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `location` varchar(100) NOT NULL,
  `author` varchar(70) NOT NULL,
  `technique` varchar(100) NOT NULL,
  `year` smallint NOT NULL,
  `price_hour` double NOT NULL,
  `available` tinyint NOT NULL,
  `category_id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `url_list` varbinary(755) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (205,'Enchanted Light','Pintura impresionista, abstracta y bot√°nica. Sin marco y lista para colgar, llenar√° de luz y dulzura tu espacio. ','UK','Hermione Carline','√ìleo sobre madera',2021,345000,1,1,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/808d6e48-5e42-4bbc-b679-0c2b9ec8c176.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/e023ea75-3a74-41b0-a03e-1ab679aa2ff1.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/e11f889e-fec6-4086-95df-890ece155b69.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/42f6d6c5-7a76-4337-97d9-3d75ff55ec08.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/c023b194-a7b0-4821-9a96-e783997107e1.jpgx'),(206,'Sweet Muse','Pintura impresionista, abstracta y paisajista. Sin marco y lista para colgar, llenar√° mistero y color tu espacio. ','Italia','Francesca Borgo','Acr√≠lico y arena sobre lienzo',2023,152000,1,1,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/cd8a21be-78fc-41e8-9bbc-70c7778fc3ae.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/b41a1d0d-eb4b-4fdf-931b-0669bd84d17b.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/5c77bb30-31ca-44af-9fb5-0fac2d9de569.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/0748916e-8e22-4400-b3ab-0bb27f69c0b3.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/f78ca713-1a29-4076-9ae3-ab668c1bb493.jpgx'),(207,'Alina','Abigail Bowen crea pinturas al √≥leo a gran escala inspiradas en una palabra, sentimiento o pasaje de texto. Las pinturas nebulosas y aut√≥nomas de Abigail son un portal al subconsciente. Ha expuesto extensamente en los √∫ltimos a√±os y contin√∫a vendiendo su trabajo a nivel internacional. ','UK','Abigail Bowen','√ìleo sobre lienzo',2018,265000,1,1,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/f1f8c53a-a992-40a8-a564-fa7c04ff8c2a.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/ade4ab08-2172-485c-b67f-27de84b8fa72.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/6cd5f94e-a258-4903-9a9c-ed66e57951f9.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/14610961-fabc-4065-8bed-f7e48bd93d01.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/83ad1dd6-1d81-4a04-8797-6e7be704012c.jpgx'),(208,'Pearls','Pintura expresionista que muestra la realidad en otra perpectiva. Tama√±o medio.','UK','Stepph Goodger','√ìleo sobre lienzo',2022,1950,1,1,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0chttps://dhart-images.s3.us-east-2.amazonaws.com/+PEARLS+3+-+Steph+Goodger/pearls1DStephGoodger.jpegt\0dhttps://dhart-images.s3.us-east-2.amazonaws.com/+PEARLS+3+-+Steph+Goodger/pearls2DStephGoodger.jpeg t\0chttps://dhart-images.s3.us-east-2.amazonaws.com/+PEARLS+3+-+Steph+Goodger/pearls3DStephGoodger.jpegt\0Rhttps://dhart-loadimages.s3.amazonaws.com/2e564ee6-9561-4ca1-bb6a-94d78310b511.jpgt\0chttps://dhart-images.s3.us-east-2.amazonaws.com/+PEARLS+3+-+Steph+Goodger/pearls1DStephGoodger.jpegx'),(209,'Somewhere in the middle','La artista independiente, naci√≥ Frankfurt y, vive y trabaja en Rodenbach.  Estudi√≥ pintura en color desde 2017 con el profesor Jerry Zeniuk e Ingrid Flo√ü en la Academia de Arte de Kolbermoor y Bad Reichenhall, Susanne le ha dado a su trabajo acentos innovadores. A trav√©s de la interacci√≥n de colores, crea h√°bilmente la ilusi√≥n de profundidad espacial en sus composiciones de m√∫ltiples capas. Esta obra se env√≠a sin marco y firmada, lista para colgar.','UK','Susanne Kirsch','Acr√≠lico y l√°piz sobre lienzo',2023,285000,1,1,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/57508070-42d5-49a9-8185-3df0f902d332.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/b929c62f-dc66-435b-b274-a6abae71b864.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/b7e1c9a8-13a3-4335-84b1-bc5eb6719b5d.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/b7bce4c1-7f8d-4d3d-a38e-ecaf16a502fb.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/1bd5d028-e1ad-4fe7-9af2-dcfb62646da3.jpgx'),(211,'Green Dot Lenin','Escultura retrato cl√°sicos de Lenin de la era sovi√©tica transformado en arte altamente decorativas y ca√≥ticas.','Ukraine','Oleksandr Balbyshev','Escultura en metal, estilo figurativo',2019,289710,1,2,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/037793d3-1938-44ce-832b-121d7c44c709.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/044db792-3cc8-4e4c-a7e6-8ddade61fe3f.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/4017e15b-a3cc-4b46-abe5-c9c4d9075d50.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/b084c428-7e66-4bee-8057-0d4cde36bf18.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/56164003-f4bd-4004-a2dd-44a81252691c.jpgx'),(212,'The Golden Lotus Lake','Fotografia que refleja serenidad, edici√≥n limitada, firmada y certificada','Spain','Viet Ha Tran','Impresionismo',2019,529076,1,3,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/8e30eaae-0144-4fdd-83c7-450c71c1a6f8.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/1a4ad1b9-ec36-447c-bb16-37603e128688.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/69eb6576-c1b9-4eb3-9170-a36b8c46c239.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/eafd83a7-6c73-4201-8abc-29f62c200685.pngt\0Rhttps://dhart-loadimages.s3.amazonaws.com/3b558a5c-e805-4002-8372-83bdef2c55ad.jpgx'),(213,'She knows how to twist','Esta pintura de estilo expresionista, muestra de forma √∫nica un desnudo femenino. La obra est√° firmada, se entrega sin marco y lista para colgar. Malwina Chabocka, su autora, es una pintora y artista interdisciplinaria nacida en Polonia que vive en Varsovia y combina las bellas artes tradicionales con la ilustraci√≥n, la animaci√≥n y la escritura para crear pinturas e historias visuales. ','UK','Susanne Kirsch','Acr√≠lico y l√°piz sobre lienzo',2023,298000,1,1,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/712416a7-3d43-41e7-9a21-5dcfee550a35.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/643a2612-d6f8-45a5-9dc6-934f322805c8.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/526ae153-ea9b-4cd2-84ef-65a60f01d447.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/8a8019ea-a8b9-4a2f-a076-46cced68c45b.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/53042687-4a09-49f2-b26f-8287d54f1003.jpgx'),(214,'Perseus','Escultura dise√±ada inspirada en lo maestros del Renacimiento. Modelado en barro, fundido en bronce y montado sobre base de granito negro con barra de acero inoxidable.','UK','Barry Davies','Escultura en bronce, estilo figurativo',2016,423000,1,2,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/6e1d73b9-c254-4adf-bb8a-fed7d935eaa5.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/2dd75d35-b16b-4e6f-876e-3bc770749ce9.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/4a882e61-d1c3-445c-9193-cc6820267d51.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/ba284ed8-da0e-44b6-805d-f7d0d9f9789d.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/7a60f254-8091-4ba2-b81c-ef41f4ffba93.jpgx'),(215,'Dehiscence 1 ','Esta pintura de estilo abstracto, muestra de forma √∫nica un desnudo femenino, de forma segmentada. La obra est√° firmada, se entrega sin marco y lista para colgar. Dean est√° fascinada con lo grotesco, y la belleza y la repulsi√≥n se entremezclan en sus lienzos. Las figuras se vuelven formas descontextualizadas, ambiguas, an√≥nimas que flotan en el espacio. El cuerpo despojado de su identidad individual se convierte en un veh√≠culo para explorar miedos y experiencias compartidas. El sitio com√∫n donde colisionan diferentes perspectivas, puntos de vista e historias. ','UK','Rosanna Dean','Acr√≠lico y l√°piz sobre lienzo',2022,288000,1,1,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/18c08f63-4241-4053-8247-20c461b45cf1.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/f26e1dce-3da3-4f76-bf55-6d018e2f4455.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/439e151c-0f0d-4cf0-a4fe-acb64af23201.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/beb4d8bb-2ef5-42f3-be69-334cc655a917.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/d6d0a1f6-d08a-4fd1-92eb-845291b01169.jpgx'),(216,'Birthed ','Esta pintura de estilo neocl√°sico abstracto, muestra de forma √∫nica un desnudo femenino, de forma segmentada. La obra est√° firmada, se entrega sin marco y lista para colgar. Dean est√° fascinada con lo grotesco, y la belleza y la repulsi√≥n se entremezclan en sus lienzos. Las figuras se vuelven formas descontextualizadas, ambiguas, an√≥nimas que flotan en el espacio. El cuerpo despojado de su identidad individual se convierte en un veh√≠culo para explorar miedos y experiencias compartidas. El sitio com√∫n donde colisionan diferentes perspectivas, puntos de vista e historias. ','UK','Rosanna Dean','√ìleo sobre lienzo',2018,388000,1,1,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/9eda90e4-a61f-4543-abac-dcb30663dbc3.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/ad483d29-ec7b-4f58-b9c3-b8a851e65436.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/c7133291-6cb7-483f-a70a-c81744789f6d.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/8b59dc05-030b-43d7-9899-96d262df6615.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/7ffbbdd9-952e-41d3-a633-e8b6caed58aa.jpgx'),(217,'Nature-Spirit Rider XI','Pieza sencilla usado como complemento decrativo en cualquier espacio. Escultura modelada con el m√©todo de resina ecol√≥gica','UK','Holly Bennett','Escultura en resina, estilo figurativo',2020,36000,1,2,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/9f7521d7-ce5b-4efc-9a34-99df7e9258ea.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/6ebac333-8cf8-41c0-82e4-81f3597c3ccc.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/ac848702-c8a6-4fd6-90dd-b8490824714b.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/9b968dea-5420-472c-ba54-348252147939.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/a65ba218-d3f4-4202-a024-111dc9673d4e.jpgx'),(218,'River Forms','Fotografia inspirada en la conciencia, la conservaci√≥n y la restauraci√≥n del medio ambiente. Esta imagen capturan las conexiones subconscientes profundas y complejas que tenemos con los oc√©anos, lagos y v√≠as fluviales, con figuras siniestras que emergen de seductoras escenas de ensue√±o.','UK','Zena Holloway','Fotorealismo',2018,36000,1,3,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/6a4d6707-3467-496e-a42b-4589bb549e35.PNGt\0Rhttps://dhart-loadimages.s3.amazonaws.com/8e7c173e-c2c3-4d98-b538-ee2eeefcd352.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/e837d723-225f-413c-b74e-b3c535eaaa98.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/8653fd44-93e8-44e3-85f2-6af60eed8288.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/f000e916-ec86-4357-8b91-54fa40bdffb5.jpgx'),(219,'Surface Tension Series','Fotografia conceptual inspirada en las imperfecciones que estropean la condici√≥n humana y las luchas que podemos o no superar en la vida.','USA','Tabitha Soren','Fotografia Conceptual',2019,441755,1,3,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/df1df737-86dc-4b01-b72c-1b5fc69e7c7c.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/0bbd62f7-d41e-4abd-850a-c311877e26cc.PNGt\0Rhttps://dhart-loadimages.s3.amazonaws.com/f15d895e-0af3-4835-a0ea-50b61ee6e2f5.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/8e1fd730-9e66-49f7-887a-7d9199bb1827.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/c83e7cf2-41e1-45c7-9b5e-9314fab9a956.jpgx'),(220,'White and Gold','Escultura que retrata a Lenin de la era sovi√©tica en forma de obra de arte altamente decorativas y ca√≥ticas.','UK','Oleksandr Balbyshev','Escultura minimalista',2019,76646,1,2,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/7433a60c-1fb6-4616-8f33-36c9f985bcbc.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/9c76428d-144f-4dfd-90d5-59c77832fa21.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/a8392e3f-525a-4d6b-b210-0d17f57bbf61.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/cf27b7d9-e736-42e0-a817-265a5c146e97.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/c0db2419-e275-484c-afc7-abbaaa266b69.jpgx'),(221,'Torso 5 ','Este dibujo de estilo abstracto, muestra de forma √∫nica un desnudo masculino, de forma segmentada. La obra est√° firmada, se entrega con marco y lista para colgar. Magdalena Morey ha expuesto internacionalmente en lugares que van desde Hong Kong hasta Londres. El artista ha trabajado en Polonia, Reino Unido, Suiza y ahora Espa√±a. Las obras de arte en capas de Magdalena est√°n hechas de t√©cnicas mixtas, que incluyen acr√≠licos, acuarelas e incluso pan de oro. ','Espa√±a','Magdalena Morey','Carboncillo sobre papel',2022,256000,1,4,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/520d90d1-c842-4451-8214-da302b997fcd.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/57b11c98-6453-4643-bc02-568a8d2eb730.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/4ef7a129-8400-4874-a3a7-616facc818b7.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/c85b6705-a5da-4394-97ca-7e2ea49fe3be.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/648e11e6-4ff3-4d6f-b34e-9df17ac71d3b.jpgx'),(222,'Ascent','Este dibujo de estilo abstracto est√° hecho sobre muro. Se env√≠a la colecci√≥n de l√°pices con que fue hecho y el registro fotogr√°fico de la obra original de 1988. El artista Pak-Keung Wan practica su arte con moderaci√≥n. Trabajando con lineas individuales, sutiles y pacientes que construyen este dibujo expandido convertido en instalaci√≥n. ','UK','Pak-Keung Wan','L√°piz sobre muro',1998,256000,1,4,NULL,NULL,_binary '¨\Ì\0sr\0java.util.ArrayListxÅ\“ô\«aù\0I\0sizexp\0\0\0w\0\0\0t\0Rhttps://dhart-loadimages.s3.amazonaws.com/a1afb4ba-c839-4895-94ee-705c9e985edc.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/d90f64c0-f08e-4438-bbd8-24b43d212e79.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/0f13337c-496a-4cf4-a272-25d18d0bde52.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/9f5701ea-e6fe-4444-9d1b-848fac37d131.jpgt\0Rhttps://dhart-loadimages.s3.amazonaws.com/161daca7-068b-4b33-b115-9c7211df2eed.jpgx');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_features`
--

DROP TABLE IF EXISTS `products_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `feature_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_idx` (`product_id`),
  KEY `feature_id_idx` (`feature_id`),
  CONSTRAINT `feature_id` FOREIGN KEY (`feature_id`) REFERENCES `features` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_id_fx` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_features`
--

LOCK TABLES `products_features` WRITE;
/*!40000 ALTER TABLE `products_features` DISABLE KEYS */;
INSERT INTO `products_features` VALUES (137,222,10),(138,222,11),(139,222,12),(140,222,14),(141,221,10),(142,221,11),(143,221,12),(144,221,14),(145,220,9),(146,220,14),(147,219,9),(148,219,14),(149,218,10),(150,218,9),(151,218,14),(152,217,10),(153,217,9),(154,217,14),(155,216,9),(156,216,10),(157,216,11),(158,216,12),(159,216,14),(160,215,9),(161,215,10),(162,215,11),(163,215,12),(164,215,14),(165,214,10),(166,214,13),(167,214,14),(168,213,9),(169,213,10),(170,213,11),(171,213,12),(172,213,14),(173,212,10),(174,211,13),(175,211,14),(176,211,10),(177,209,9),(178,209,10),(179,209,11),(180,209,12),(181,209,14),(182,208,14),(183,207,9),(184,207,10),(185,207,11),(186,207,12),(187,207,14),(188,206,9),(189,206,10),(190,206,11),(191,206,12),(192,206,14),(193,205,9),(194,205,10),(195,205,11),(196,205,12),(197,205,14);
/*!40000 ALTER TABLE `products_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id_role` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'USER'),(2,'ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `product_id` int NOT NULL,
  `score` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_score_fk_idx` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_id_score_fx` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (33,105,209,4),(34,105,209,5),(35,105,209,1),(36,105,206,5),(37,105,211,4),(38,105,211,5),(39,105,211,5),(40,105,211,3),(41,105,211,3),(42,105,211,4),(43,105,211,4),(44,105,211,3),(45,105,211,4),(46,105,216,5),(47,105,216,4),(48,69,219,3),(49,69,220,5),(50,69,206,4);
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_confirmed` bit(1) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (69,'$2a$10$kM3P.x0zSYILCbfRUqQfiu8DmVR1HtGcWuh0f3IydY23qLWVL31ae','Administrador','DHart','dhart.connect@gmail.com',_binary ''),(104,'$2a$10$QVWZR434iye4.PPpBPywTOglH8Hbg40hKJ08kNx5I0BnrTNLmw.0C','hjkl','hgjbknlm','alejandratashko@gmail',_binary '\0'),(105,'$2a$10$UT/V2Rt9ZjqCVE/vXOEShutNarCqVKfY6ZYZ1AE1Qbid3V5fYPh6e','Alejandra','Tashko','maleza.proyectos@gmail.com',_binary ''),(106,'$2a$10$errCuVQVhXT8SSJ/rfdkPOLLNDw4qKahm0MnNIKHUL9cqTCqiQKoO','Majo','Mendez','tashkomendez@gmail.com',_binary '\0'),(107,'$2a$10$eK2gicaDvFPinOPB4BiQY.71HfH0wzgTjGjA2d8ZwrZ/l0oPZewfG','Alejandra','Tashko','osoriog.paulaa@gmail.com',_binary ''),(108,'$2a$10$A7RWFrUm9RkO8fyWgO.6quaakne1g83//rxLXV4K0ZeytVlLbq1Qm','Anyeli','Corazon','amava1107@gmail.com',_binary ''),(109,'$2a$10$VhvVFA/aBBYshV39F5HEL.pDKp5c5LCkl7aFPVoKjuRZLXia75msi','Luis','Mora','luis.mora@imagineapps.co',_binary ''),(110,'$2a$10$xX/sJXHsygjf7ttSwEI9Sev4JvQWxGHy6rhUPXMuGbYGDcRNLKFBa','Estefania','Bermudez','tefyberal09@gmail.com',_binary ''),(111,'$2a$10$MQV0v8KTZls31M/SrGeUpO1synI6Ig/Q78uWxr7M4ZYwZGQFcKnDW','Majo','tashko','alejandra@hotmail.com',_binary '\0'),(112,'$2a$10$Nt1yqsNmHsQbc/I.YhQpOug8RC/lLPfruLK9k.nXi7ff/0AHARsGG','mora','luis','luis@hotmail.com',_binary ''),(113,'$2a$10$LzMdwXXBCcn8aSGjpZtnWe0QAWW8ZXFSCpyoNZf/9eRjt6JR6raha','Teff','Bermudez','tefyberal@hotmail.com',_binary ''),(114,'$2a$10$ELDvHxbxzDZVX/kvcPiaFeJa3hnLKiHn/WxEthvzS1pWR9.2mvBr2','Betty','Alvez','beao1626@gmail.com',_binary ''),(115,'$2a$10$/AyJB0R4cOPd0ItIbAKsu.2jgSp4dZEMQwUuVPodyxn5.FqwdR5yu','Luis','Mora','lucamova010@hotmail.com',_binary '');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_roles`
--

DROP TABLE IF EXISTS `usuarios_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_roles` (
  `usuario_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  KEY `FKefntoswg8cckktsk0ha1wpm0i` (`role_id`),
  KEY `FKebiaxjbamgu326glxo1fbysuh` (`usuario_id`),
  CONSTRAINT `FKebiaxjbamgu326glxo1fbysuh` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  CONSTRAINT `FKefntoswg8cckktsk0ha1wpm0i` FOREIGN KEY (`role_id`) REFERENCES `role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_roles`
--

LOCK TABLES `usuarios_roles` WRITE;
/*!40000 ALTER TABLE `usuarios_roles` DISABLE KEYS */;
INSERT INTO `usuarios_roles` VALUES (69,2),(106,1),(104,1),(107,2),(105,1),(108,1);
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_token`
--

DROP TABLE IF EXISTS `verification_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_token` (
  `id` bigint NOT NULL,
  `expiry_date` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmdallcr59j4hv2ub4iyenp0kp` (`user_id`),
  CONSTRAINT `FKmdallcr59j4hv2ub4iyenp0kp` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_token`
--

LOCK TABLES `verification_token` WRITE;
/*!40000 ALTER TABLE `verification_token` DISABLE KEYS */;
INSERT INTO `verification_token` VALUES (905,'2023-06-16 20:33:21.924000','a1050414-1fa2-4b7b-bca3-9282c3d8ba8b',104),(906,'2023-06-16 20:41:12.427000','4e09f607-1103-4279-bca3-fb47f787e6e5',105),(907,'2023-06-16 20:59:47.485000','983008a9-bd85-4763-9678-ae208d36383a',106),(952,'2023-06-17 21:52:02.009000','541bec8b-5525-4f22-ab9d-093bbf3a3036',107),(1002,'2023-06-28 14:07:44.023000','9644ca79-6d90-4282-a36e-1de313efb9df',108),(1052,'2023-06-23 00:22:58.886000','4b2e4956-17fc-4d49-8061-d23b414104d6',109),(1102,'2023-06-23 17:36:09.600000','cd19e5c2-7876-4431-aea5-fd1e18c3ffaf',110),(1152,'2023-06-24 18:27:30.256000','eb7d1610-a620-4cf3-9e99-00fdbe35a896',111),(1202,'2023-06-28 22:22:51.221000','2c91c137-5164-4f6e-a735-6f420c066a87',113),(1252,'2023-06-29 15:08:39.673000','6b742e44-0fa0-4b06-825c-5d4ff1b39c60',114),(1302,'2023-06-29 16:07:16.267000','ee47c102-a88d-40bf-af44-f46da80d882a',115);
/*!40000 ALTER TABLE `verification_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_token_seq`
--

DROP TABLE IF EXISTS `verification_token_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_token_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_token_seq`
--

LOCK TABLES `verification_token_seq` WRITE;
/*!40000 ALTER TABLE `verification_token_seq` DISABLE KEYS */;
INSERT INTO `verification_token_seq` VALUES (1401);
/*!40000 ALTER TABLE `verification_token_seq` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-30 11:35:24
