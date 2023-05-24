-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: new_schema
-- ------------------------------------------------------
-- Server version	8.0.31

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

--
-- Table structure for table `orderproducts`
--

DROP TABLE IF EXISTS `orderproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderproducts` (
  `idorderProducts` int unsigned NOT NULL AUTO_INCREMENT,
  `idProduct` int unsigned NOT NULL,
  `idOrder` int unsigned NOT NULL,
  `boughtPrice` int unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  PRIMARY KEY (`idorderProducts`),
  KEY `idProduct_idx` (`idProduct`),
  KEY `idOrder` (`idOrder`),
  CONSTRAINT `idOrder` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`idOrder`),
  CONSTRAINT `idProduct` FOREIGN KEY (`idProduct`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderproducts`
--

LOCK TABLES `orderproducts` WRITE;
/*!40000 ALTER TABLE `orderproducts` DISABLE KEYS */;
INSERT INTO `orderproducts` VALUES (15,1,41,70,1),(16,2,41,80,4),(17,1,42,70,9),(18,3,42,90,4),(19,4,42,95,16);
/*!40000 ALTER TABLE `orderproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idOrder` int unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int unsigned NOT NULL,
  `shippingadress_fullname` varchar(100) NOT NULL,
  `shippingadress_adress` varchar(100) NOT NULL,
  `shippingadress_country` varchar(45) NOT NULL,
  `shippingadress_city` varchar(45) NOT NULL,
  `shippingadress_postalCode` varchar(45) NOT NULL,
  `paymenthMethod` varchar(45) NOT NULL,
  `paymentResult` tinyint(1) DEFAULT NULL,
  `itemsPrice` int NOT NULL,
  `shippingPrice` int NOT NULL,
  `taxPrice` int NOT NULL,
  `totalPrice` int NOT NULL,
  `isPaid` tinyint NOT NULL,
  `isDelivered` tinyint NOT NULL,
  `paidAt` date DEFAULT NULL,
  `deliveredAt` date DEFAULT NULL,
  `writtenAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idOrder`),
  KEY `payment&Delivery` (`isPaid`,`isDelivered`) /*!80000 INVISIBLE */,
  KEY `datesOfPayment&Delivery` (`paidAt`,`deliveredAt`) /*!80000 INVISIBLE */,
  KEY `user_idx` (`idUser`),
  CONSTRAINT `user` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (41,1,'Paul Max Avalos Aguilar','Calle Argelia 1421','Mexico','Puebla','72070','PayPal',NULL,390,0,58,448,0,0,NULL,NULL,'2023-01-30 20:30:01'),(42,1,'Nombre falso 123','Prolongación 12 Norte 2429','Mexico','San Andrés Cholula','72810','PayPal',NULL,2510,0,376,2886,0,0,NULL,NULL,'2023-03-27 02:56:06');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `idProduct` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `slug` varchar(45) NOT NULL,
  `show` tinyint(1) DEFAULT '1',
  `category` varchar(45) NOT NULL,
  `image` varchar(45) NOT NULL,
  `price` int unsigned NOT NULL,
  `brand` varchar(45) NOT NULL,
  `rating` int unsigned DEFAULT NULL,
  `numReviews` int unsigned DEFAULT NULL,
  `countInStock` int unsigned DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProduct`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Testosterona cypionato','testosterona-cypionato',1,'Shirts','/images/Steroids.png',70,'Body Building Labs',4,8,20,'A popular steroid'),(2,'Testosterona decanoato','testosterona-decanoato',1,'Shirts','/images/Steroids.png',80,'Muscle Labs',3,10,20,'A smart steroid'),(3,'Trembolona acetato','trembolona-acetato',1,'Pants','/images/Steroids.png',90,'Powerlifting Labs',3,13,20,'A crazy steroid'),(4,'Nandrolona decanoato','nandrolona-decanoato',1,'Pants','/images/Steroids.png',95,'Muscle Labs',4,7,20,'An interesting steroid'),(5,'Boldenona undecylenato','boldenona-undecylenato',1,'Shirts','/images/Steroids.png',90,'Im in volume phase labs',4,3,20,'A horse steroid'),(6,'Testosterona propionato','testosterona-propionato',1,'Pants','/images/Steroids.png',75,'Wise labs',2,14,20,'A smart steroid');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUsers` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `isAdmin` tinyint DEFAULT NULL,
  PRIMARY KEY (`idUsers`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','admin@example.com','$2a$10$AmPR0BPHLOMgnDiiKBXvc.EWO3s5H9kvbVvcgPj6yWsqiZK/hXWwS',1),(2,'Jane','user@example.com','$2a$10$.v897MQU6orHh5gLa9js/eo8YukCaNZdukebaoOcaXGSH4WVg3zTO',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-23 19:58:50
