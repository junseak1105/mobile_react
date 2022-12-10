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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `userID` varchar(45) NOT NULL,
  `userPW` varchar(45) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `regdate` datetime DEFAULT NULL,
  `grade` varchar(20) NOT NULL,
  `school_code` varchar(45) NOT NULL,
  `sex` varchar(10) NOT NULL,
  PRIMARY KEY (`userID`,`school_code`),
  UNIQUE KEY `userID_UNIQUE` (`userID`),
  KEY `fk_member_school1_idx` (`school_code`),
  CONSTRAINT `fk_member_school1` FOREIGN KEY (`school_code`) REFERENCES `school` (`school_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('happy','56ab24c15b72a457069c5ea42fcfc640','김행복','2022-06-14 23:31:23','user','DSU','Female'),('happy1','3b03c7ea09871a75dce2e403ef28111f','도행복','2022-06-14 23:35:29','user','DSU','Female'),('hello','5d41402abc4b2a76b9719d911017c592','김안녕','2022-06-14 23:42:36','user','DSU','Female'),('hello1','203ad5ffa1d7c650ad681fdff3965cd2','박안녕','2022-06-14 23:45:26','user','DSU','Female'),('nice','7c6483ddcd99eb112c060ecbe0543e86','박행복','2022-06-15 00:19:28','user','DSU','Female'),('nice1','54c2c7619790cebf2b4c6835f1f7ac99','이행복','2022-06-15 00:23:02','user','DSU','Female'),('test','098f6bcd4621d373cade4e832627b4f6','test','2022-05-29 20:54:37','user','DSU','Male'),('test1','5a105e8b9d40e1329780d62ea2265d8a','김민정','2022-05-29 21:05:09','user','DSU','Female'),('test10','c1a8e059bfd1e911cf10b626340c9a54','홍길동','2022-06-14 19:09:02','user','DSU','Male'),('test11','098f6bcd4621d373cade4e832627b4f6','홍길동11','2022-06-14 22:31:06','user','DSU','Male'),('test2','ad0234829205b9033196ba818f7a872b','박수아','2022-06-07 15:43:56','user','DSU','Female'),('test3','8ad8757baa8564dc136c1e07507f4a98','test3','2022-06-07 15:46:10','user','BUK','Male'),('test4','86985e105f79b95d6bc918fb45ec7727','test4','2022-06-07 16:42:38','user','DSU','Male');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-10 20:27:03
