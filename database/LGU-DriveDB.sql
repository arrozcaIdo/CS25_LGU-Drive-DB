-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: importationform
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `ApplicationID` char(5) NOT NULL,
  `DoneeID` char(5) NOT NULL,
  `DonorID` char(5) NOT NULL,
  `ApplicationDate` date NOT NULL,
  `AuthorizedSignature` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ApplicationID`),
  KEY `DoneeID` (`DoneeID`),
  KEY `DonorID` (`DonorID`),
  CONSTRAINT `application_ibfk_1` FOREIGN KEY (`DoneeID`) REFERENCES `donee` (`DoneeID`),
  CONSTRAINT `application_ibfk_2` FOREIGN KEY (`DonorID`) REFERENCES `donor` (`DonorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES ('APP01','DON01','DOR01','2019-01-04','[signature_app01.png]'),('APP02','DON01','DOR01','2021-07-25','[signature_app02.png]'),('APP03','DON02','DOR02','2022-05-15','[signature_app03.png]'),('APP04','DON01','DOR04','2024-11-27','[signature_app04.png]'),('APP05','DON01','DOR04','2025-02-22','[signature_app05.png]'),('APP06','DON04','DOR02','2026-06-07','[signature_app06.png]'),('APP07','DON03','DOR05','2026-09-10','[signature_app07.png]');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donatedvehicle`
--

DROP TABLE IF EXISTS `donatedvehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donatedvehicle` (
  `DonateID` char(6) NOT NULL,
  `ApplicationID` char(5) NOT NULL,
  `VehicleDescription` varchar(100) DEFAULT NULL,
  `VehicleTariff` int DEFAULT NULL,
  `Origin` varchar(50) DEFAULT NULL,
  `Quantity` int DEFAULT '1',
  `CarType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`DonateID`),
  KEY `ApplicationID` (`ApplicationID`),
  CONSTRAINT `donatedvehicle_ibfk_1` FOREIGN KEY (`ApplicationID`) REFERENCES `application` (`ApplicationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donatedvehicle`
--

LOCK TABLES `donatedvehicle` WRITE;
/*!40000 ALTER TABLE `donatedvehicle` DISABLE KEYS */;
INSERT INTO `donatedvehicle` VALUES ('CARS01','APP01','Toyota Corolla',8703,'Japan',1,'Passenger Car'),('CARS02','APP02','Toyota Corolla',8703,'Japan',1,'Passenger Car'),('CARS03','APP02','Mercedes-Benz Unimog',8705,'Germany',1,'Special Purpose Truck'),('CARS04','APP03','Ford F-650',8704,'USA',2,'Commercial Truck'),('CARS05','APP03','Honda Civic',8703,'Japan',1,'Passenger Car'),('CARS06','APP04','Komatsu WA600',8709,'Japan',1,'Industrial Truck'),('CARS07','APP05','Honda Civic',8703,'Japan',1,'Passenger Car'),('CARS08','APP06','Kenworth T680',8704,'USA',1,'Commercial Truck'),('CARS09','APP07','Freightliner Cascadia',8704,'USA',1,'Commercial Truck'),('CARS10','APP07','Honda Civic',8703,'Japan',1,'Passenger Car');
/*!40000 ALTER TABLE `donatedvehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donee`
--

DROP TABLE IF EXISTS `donee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donee` (
  `DoneeID` char(5) NOT NULL,
  `DoneeName` varchar(100) NOT NULL,
  `DoneeAddress` varchar(255) DEFAULT NULL,
  `ContactPerson` varchar(100) DEFAULT NULL,
  `DoneeTelNo` varchar(20) DEFAULT NULL,
  `DoneeFaxNo` varchar(20) DEFAULT NULL,
  `DoneeEmail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DoneeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donee`
--

LOCK TABLES `donee` WRITE;
/*!40000 ALTER TABLE `donee` DISABLE KEYS */;
INSERT INTO `donee` VALUES ('DON01','City Government of Quezon City','Elliptical Rd, Diliman, Quezon City','Maria Santos','02-8988-4242','02-8921-6731','mayor@quezoncity.gov.ph'),('DON02','City of Makati','J.P. Rizal St., Makati City','Ricardo Mercado','8899-1234','02-8899-5678','r.mercado@makati.gov.ph'),('DON03','City Government of Antipolo City','Brgy. Mambugan, Antipolo City','Lourdes Tolentino','8254-6767','02-4325-7691','loutolentino87@gmail.com'),('DON04','Province of Laguna','Brgy. San Isidro, Laguna','Mica Reyes','8123-1111','01-7652-1020','vreyes89@gmail.com');
/*!40000 ALTER TABLE `donee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donor`
--

DROP TABLE IF EXISTS `donor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donor` (
  `DonorID` char(5) NOT NULL,
  `DonorName` varchar(100) NOT NULL,
  `DonorAddress` varchar(255) DEFAULT NULL,
  `DonorTelNo` varchar(20) DEFAULT NULL,
  `DonorFaxNo` varchar(20) DEFAULT NULL,
  `DonorEmail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DonorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor`
--

LOCK TABLES `donor` WRITE;
/*!40000 ALTER TABLE `donor` DISABLE KEYS */;
INSERT INTO `donor` VALUES ('DOR01','Global Aid Automotive Japan','1-2-1 Shibaura, Minato City, Tokyo','81 3-5440-8000','02-0212-6757','logistics@globalaid.jp'),('DOR02','Seoul Charity Foundation','12 Sejong-daero, Jung-gu, Seoul','84 3-5440-8898','02-0212-3457','logistics@seoulcharity.kr'),('DOR04','GreenTech Innovations','50 California St, San Francisco, USA','4155-10000','01-4155-9990','donations@greentech.com'),('DOR05','Michael Tan','Makati City, Metro Manila','8234-8967','01-6767-4049','michaetan99@gmail.com');
/*!40000 ALTER TABLE `donor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passengercar`
--

DROP TABLE IF EXISTS `passengercar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengercar` (
  `VIN` char(17) NOT NULL,
  `DonateID` char(6) NOT NULL,
  `YearModel` int DEFAULT NULL,
  `Color` varchar(30) DEFAULT NULL,
  `RegistrationDate` date DEFAULT NULL,
  `VehicleWeight` int DEFAULT NULL,
  `EngineNumber` varchar(50) DEFAULT NULL,
  `EngineDisplacement` varchar(20) DEFAULT NULL,
  `FuelType` char(3) DEFAULT NULL,
  PRIMARY KEY (`VIN`),
  UNIQUE KEY `DonateID` (`DonateID`),
  CONSTRAINT `passengercar_ibfk_1` FOREIGN KEY (`DonateID`) REFERENCES `donatedvehicle` (`DonateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengercar`
--

LOCK TABLES `passengercar` WRITE;
/*!40000 ALTER TABLE `passengercar` DISABLE KEYS */;
INSERT INTO `passengercar` VALUES ('3HTWHAAR98N654321','CARS05',2022,'Black','2024-11-10',1300,'6ASDF334455','1500 cc','G'),('JTDBR32E502345678','CARS01',2021,'Black','2021-01-15',1300,'7ABCD987654','1800 cc','G'),('MR0HA3CD400567890','CARS07',2019,'Silver','2020-02-25',1300,'2GDFTV445566','1500 cc','G'),('VF622BKA000043210','CARS02',2015,'Blue','2022-02-22',1300,'3QWERT456123','1800 cc','G'),('WP1ZZZ9PZ8LA65432','CARS10',2023,'White','2024-11-10',1300,'8HGFD554433','1500 cc','G');
/*!40000 ALTER TABLE `passengercar` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-19 18:47:16
