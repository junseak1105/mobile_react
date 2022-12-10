CREATE DATABASE  IF NOT EXISTS `mobile_classprj` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mobile_classprj`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mobile_classprj
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `favor_ca`
--

DROP TABLE IF EXISTS `favor_ca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favor_ca` (
  `co_code` varchar(45) NOT NULL,
  `favor_ca_code` varchar(45) NOT NULL,
  `favor_ca_name` varchar(100) NOT NULL,
  UNIQUE KEY `ca_favor_UNIQUE` (`favor_ca_code`),
  KEY `co_code_idx` (`co_code`),
  CONSTRAINT `co_code` FOREIGN KEY (`co_code`) REFERENCES `commoncode` (`co_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favor_ca`
--

LOCK TABLES `favor_ca` WRITE;
/*!40000 ALTER TABLE `favor_ca` DISABLE KEYS */;
INSERT INTO `favor_ca` VALUES ('fa_sex','Female','여성'),('fa_sex','Male','남성'),('fa_hobby','PC방','PC방'),('fa_food','디저트','디저트'),('fa_hobby','보드게임','보드게임'),('fa_hobby','쇼핑','쇼핑'),('fa_hobby','야외활동','야외활동'),('fa_food','양식','양식'),('fa_hobby','영화/드라마','영화/드라마'),('fa_hobby','운동','운동'),('fa_food','인도식','인도식'),('fa_food','일식','일식'),('fa_food','중식','중식'),('fa_food','한식','한식');
/*!40000 ALTER TABLE `favor_ca` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-10 20:27:02
