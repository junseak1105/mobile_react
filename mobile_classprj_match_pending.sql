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
-- Table structure for table `match_pending`
--

DROP TABLE IF EXISTS `match_pending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_pending` (
  `pending_idx` int NOT NULL AUTO_INCREMENT,
  `complete` char(1) DEFAULT NULL,
  `user1_id` varchar(45) DEFAULT NULL,
  `user1_chk` varchar(45) DEFAULT NULL,
  `user2_id` varchar(45) DEFAULT NULL,
  `user2_chk` varchar(45) DEFAULT NULL,
  `select_time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`pending_idx`),
  UNIQUE KEY `pending_idx_UNIQUE` (`pending_idx`),
  KEY `userids_idx` (`user1_id`,`user2_id`),
  KEY `userIDpend2_idx` (`user2_id`),
  CONSTRAINT `userIDpend1` FOREIGN KEY (`user1_id`) REFERENCES `member` (`userID`),
  CONSTRAINT `userIDpend2` FOREIGN KEY (`user2_id`) REFERENCES `member` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_pending`
--

LOCK TABLES `match_pending` WRITE;
/*!40000 ALTER TABLE `match_pending` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_pending` ENABLE KEYS */;
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
