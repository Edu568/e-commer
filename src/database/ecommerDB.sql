-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerDB
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorys` (
  `IdCategory` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`IdCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorys`
--

LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` VALUES (1,'Sandwich'),(2,'Bebidas'),(3,'Postres');
/*!40000 ALTER TABLE `categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `idImage` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idProduct` int(11) NOT NULL,
  PRIMARY KEY (`idImage`),
  KEY `Images_FK` (`idProduct`),
  CONSTRAINT `Images_FK` FOREIGN KEY (`idProduct`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (86,'1686658802039_.jpg',86),(87,'1686659859128_.jpg',87),(88,'1686660631076_.jpg',88),(89,'1686661358098_.jpg',89),(90,'1686661453465_.jpg',90);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderitems` (
  `idOrderItem` int(11) NOT NULL AUTO_INCREMENT,
  `idOrder` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`idOrderItem`),
  UNIQUE KEY `order_items_un` (`idOrderItem`),
  KEY `order_items_FK` (`idProduct`) USING BTREE,
  KEY `order_items_FK_1` (`idOrder`) USING BTREE,
  CONSTRAINT `orderItems_FK` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`idOrder`),
  CONSTRAINT `orderItems_FK_1` FOREIGN KEY (`idProduct`) REFERENCES `products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (49,27,88,2,'2023-06-13','2023-06-13'),(50,28,88,1,'2023-06-13','2023-06-13'),(51,29,88,4,'2023-06-13','2023-06-13');
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `idOrder` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `state` varchar(100) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`idOrder`),
  UNIQUE KEY `orders_un` (`idOrder`),
  KEY `orders_FK` (`idUser`) USING BTREE,
  CONSTRAINT `orders_FK` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (27,10,'PENDING','2023-06-13','2023-06-13'),(28,11,'PENDING','2023-06-13','2023-06-13'),(29,12,'PENDING','2023-06-13','2023-06-13');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `idProduct` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `discount` int(11) NOT NULL,
  `sold` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `idSubCategory` int(11) NOT NULL,
  PRIMARY KEY (`idProduct`),
  KEY `products_FK` (`idSubCategory`),
  CONSTRAINT `products_FK` FOREIGN KEY (`idSubCategory`) REFERENCES `subcategorys` (`idSubCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (86,'Sándwich de pollo a la parrilla','Jugosas pechugas de pollo a la parrilla acompañadas de lechuga fresca, rodajas de tomate, cebolla roja y una suave mayonesa. Servido en pan integral tostado para un toque crujiente.',1200.00,10,5,20,1),(87,'Sándwich de jamón y queso','Deliciosas lonchas de jamón y queso cheddar derretido, con un toque de mostaza y mayonesa. Todo ello envuelto en un pan baguette recién horneado.',1200.00,0,3,20,1),(88,'Sándwich cubano','Inspirado en la cocina cubana, este sándwich está lleno de sabor. Combina lonchas de cerdo asado, jamón, queso suizo, pepinillos y mostaza en un pan crujiente prensado. Una delicia para los amantes de los sabores audaces.',1200.00,25,0,20,1),(89,'Sándwich de atún','Una elección clásica para los amantes del atún. Este sándwich está hecho con una mezcla de atún, mayonesa, apio y cebolla. Se sirve con lechuga, tomate y pepinillos en pan de trigo.',1200.00,0,0,11,1),(90,'Sándwich de pastrami','Este sándwich se compone de generosas capas de pastrami ahumado, queso suizo derretido, mostaza y pepinillos en rodajas, todo ello entre dos rebanadas de pan de centeno. ¡Un auténtico clásico de Nueva York!',1200.00,0,3,20,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorys`
--

DROP TABLE IF EXISTS `subcategorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategorys` (
  `idSubCategory` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idCategory` int(11) NOT NULL,
  PRIMARY KEY (`idSubCategory`),
  KEY `subcategorys_FK` (`idCategory`),
  CONSTRAINT `subcategorys_FK` FOREIGN KEY (`idCategory`) REFERENCES `categorys` (`IdCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorys`
--

LOCK TABLES `subcategorys` WRITE;
/*!40000 ALTER TABLE `subcategorys` DISABLE KEYS */;
INSERT INTO `subcategorys` VALUES (1,'Pebetes Comunes',1),(2,'Veganos',1),(3,'XXL',1),(4,'Infantiles',1),(5,'Gaseosas',2),(6,'Helados',3),(7,'Postres comunes',3);
/*!40000 ALTER TABLE `subcategorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `typeOfAccess` varchar(15) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `users_un` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@mail.com','$2a$12$lOmmimHAmlVbv6O4Qq1mse0EeTRSIUH30VRL5Hq4Xteelk8Perde6','admin'),(2,'user@mail.com','$2a$12$lqxw0Fjf9mhsbpaHZPY4tOxylGaCTc0xXaRbE3dFx.K2lUSTcDYJq','user'),(10,'LUCASFMONSORES@GMAIL.COM','$2a$12$mcfS7EPqx8pD5OJrCEUs2eGLqe.u76yrAvRCMZVkCs1FypfAmCIBa','admin'),(11,'oscar@oscar.com','$2a$12$5jj1cTHLY95.0Gug2KFIsO.TBWlyI9DXuGV4cFnOXqx.Gd/JmyiE6','user'),(12,'teste1@mail.com','$2a$12$h3xoWXt1bHrLKYU51bgkyemSChyQshaoRP25BoK4klqQ8iJOYFQ8y','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersdetail`
--

DROP TABLE IF EXISTS `usersdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersdetail` (
  `idUserDetail` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(80) DEFAULT NULL,
  `lastName` varchar(80) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`idUserDetail`),
  KEY `usersdetail_FK` (`idUser`),
  CONSTRAINT `usersdetail_FK` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersdetail`
--

LOCK TABLES `usersdetail` WRITE;
/*!40000 ALTER TABLE `usersdetail` DISABLE KEYS */;
INSERT INTO `usersdetail` VALUES (1,'admin','admin','admin_avatar.jpg',NULL,NULL,NULL,NULL,NULL,1),(2,'user','user','user_avatar.jpg','','','','','',2),(10,'Lucas','monsores','1686617712058_.jpeg','','','',NULL,NULL,10),(11,'Oscar','Chaco','default-image.png',NULL,NULL,NULL,NULL,NULL,11),(12,'Usuarioteste','Teste','1686663226194_.jpg',NULL,NULL,NULL,NULL,NULL,12);
/*!40000 ALTER TABLE `usersdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ecommerDB'
--
