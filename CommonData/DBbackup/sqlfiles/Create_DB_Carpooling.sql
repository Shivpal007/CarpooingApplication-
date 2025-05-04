CREATE DATABASE  IF NOT EXISTS `carpooling` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `carpooling`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: carpooling
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `BookingID` int NOT NULL AUTO_INCREMENT,
  `bookingdate` datetime(6) NOT NULL,
  `RideID` int NOT NULL,
  `UID` int NOT NULL,
  PRIMARY KEY (`BookingID`),
  KEY `RideID` (`RideID`),
  KEY `booking_ibfk_2_idx` (`UID`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`RideID`) REFERENCES `ride` (`RideID`) ON DELETE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `user` (`UID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_booking_insert_update_ride_status` AFTER INSERT ON `booking` FOR EACH ROW BEGIN
    DECLARE total_bookings INT;
    DECLARE total_seats INT;

    -- Get the total number of bookings for the rideId
    SELECT COUNT(*) INTO total_bookings
    FROM `booking`
    WHERE `rideId` = NEW.`rideId`;

    -- Get the total number of seats available for the ride
    SELECT `noseat` INTO total_seats
    FROM `ride`
    WHERE `rideId` = NEW.`rideId`;

    -- If total bookings are equal to or exceed the total seats, update the ride status to 'full'
    IF total_bookings >= total_seats THEN
        UPDATE `ride`
        SET `status` = 'f'
        WHERE `rideId` = NEW.`rideId`;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `CityId` int NOT NULL AUTO_INCREMENT,
  `cityname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CityId`)
) ENGINE=InnoDB AUTO_INCREMENT=494 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Surat'),(2,'Pune'),(3,'Mumbai'),(4,'Nashik'),(5,'Abohar'),(6,'Achalpur'),(7,'Adilabad'),(8,'Adityapur'),(9,'Adoni'),(10,'Agartala'),(11,'Agra'),(12,'Ahmadabad'),(13,'Ahmadnagar'),(14,'Aizawl'),(15,'Ajmer'),(16,'Akbarpur'),(17,'Akola'),(18,'Alandur'),(19,'Alappuzha'),(20,'Aligarh'),(21,'Allahabad'),(22,'Alwar'),(23,'Ambala'),(24,'Ambala'),(25,'Ambarnath'),(26,'Ambattur'),(27,'Ambikapur'),(28,'Ambur'),(29,'Amravati'),(30,'Amreli'),(31,'Amritsar'),(32,'Amroha'),(33,'Anand'),(34,'Anantapur'),(35,'Anantnag'),(36,'Arrah'),(37,'Asansol'),(38,'Ashoknagar'),(39,'Aurangabad'),(40,'Aurangabad'),(41,'Avadi'),(42,'Azamgarh'),(43,'Badlapur'),(44,'Bagaha'),(45,'Bagalkot'),(46,'Bahadurgarh'),(47,'Baharampur'),(48,'Bahraich'),(49,'Baidyabati'),(50,'Baleshwar'),(51,'Ballia'),(52,'Bally'),(53,'Bally'),(54,'Balurghat'),(55,'Banda'),(56,'Bankura'),(57,'Bansberia'),(58,'Banswara'),(59,'Baran'),(60,'Baranagar'),(61,'Barasat'),(62,'Baraut'),(63,'Barddhaman'),(64,'Bareilly'),(65,'Baripada'),(66,'Barnala'),(67,'Barrackpur'),(68,'Barshi'),(69,'Basirhat'),(70,'Basti'),(71,'Batala'),(72,'Bathinda'),(73,'Beawar'),(74,'Begusarai'),(75,'Belgaum'),(76,'Bellary'),(77,'Bengaluru'),(78,'Bettiah'),(79,'Betul'),(80,'Bhadrak'),(81,'Bhadravati'),(82,'Bhadreswar'),(83,'Bhagalpur'),(84,'Bhalswa'),(85,'Bharatpur'),(86,'Bharuch'),(87,'Bhatpara'),(88,'Bhavnagar'),(89,'Bhilai'),(90,'Bhilwara'),(91,'Bhimavaram'),(92,'Bhind'),(93,'Bhiwadi'),(94,'Bhiwandi'),(95,'Bhiwani'),(96,'Bhopal'),(97,'Bhubaneswar'),(98,'Bhuj'),(99,'Bhusawal'),(100,'Bid'),(101,'Bidar'),(102,'Bidhan'),(103,'Biharsharif'),(104,'Bijapur'),(105,'Bikaner'),(106,'Bilaspur'),(107,'Bokaro'),(108,'Bongaon'),(109,'Botad'),(110,'Brahmapur'),(111,'Budaun'),(112,'Bulandshahr'),(113,'Bundi'),(114,'Burari'),(115,'Burhanpur'),(116,'Buxar'),(117,'Champdani'),(118,'Chandannagar'),(119,'Chandausi'),(120,'Chandigarh'),(121,'Chandrapur'),(122,'Chapra'),(123,'Chas'),(124,'Chennai'),(125,'Chhattarpur'),(126,'Chhindwara'),(127,'Chikmagalur'),(128,'Chilakaluripet'),(129,'Chitradurga'),(130,'Chittaurgarh'),(131,'Chittoor'),(132,'Churu'),(133,'Coimbatore'),(134,'Cuddalore'),(135,'Cuttack'),(136,'Dabgram'),(137,'Dallo'),(138,'Damoh'),(139,'Darbhanga'),(140,'Darjiling'),(141,'Datia'),(142,'Davanagere'),(143,'Deesa'),(144,'Dehradun'),(145,'Dehri'),(146,'Delhi'),(147,'Delhi'),(148,'Deoghar'),(149,'Deoli'),(150,'Deoria'),(151,'Dewas'),(152,'Dhanbad'),(153,'Dharmavaram'),(154,'Dhaulpur'),(155,'Dhule'),(156,'Dibrugarh'),(157,'Dimapur'),(158,'Dinapur'),(159,'Dindigul'),(160,'Dum'),(161,'Durg'),(162,'Durgapur'),(163,'Eluru'),(164,'English'),(165,'Erode'),(166,'Etah'),(167,'Etawah'),(168,'Faizabad'),(169,'Faridabad'),(170,'Farrukhabad-cum-Fatehgarh'),(171,'Fatehpur'),(172,'Firozabad'),(173,'Firozpur'),(174,'Gadag-Betigeri'),(175,'Gandhidham'),(176,'Gandhinagar'),(177,'Ganganagar'),(178,'Gangapur'),(179,'Gangawati'),(180,'Gaya'),(181,'Ghazipur'),(182,'Giridih'),(183,'Godhra'),(184,'Gokal'),(185,'Gonda'),(186,'Gondal'),(187,'Gondiya'),(188,'Gorakhpur'),(189,'Hyderabad'),(190,'Noida'),(191,'Gudivada'),(192,'Gulbarga'),(193,'Guna'),(194,'Guntakal'),(195,'Guntur'),(196,'Gurgaon'),(197,'Guwahati'),(198,'Gwalior'),(199,'Habra'),(200,'Hajipur'),(201,'Haldia'),(202,'Haldwani-cum-Kathgodam'),(203,'Halisahar'),(204,'Hanumangarh'),(205,'Haora'),(206,'Hapur'),(207,'Hardoi'),(208,'Hardwar'),(209,'Hassan'),(210,'Hastsal'),(211,'Hathras'),(212,'Hazaribag'),(213,'Hindaun'),(214,'Hindupur'),(215,'Hinganghat'),(216,'Hisar'),(217,'Hoshangabad'),(218,'Hoshiarpur'),(219,'Hospet'),(220,'Hosur'),(221,'Hubli-Dharwad'),(222,'Hugli-Chinsurah'),(223,'Ichalkaranji'),(224,'Imphal'),(225,'Indore'),(226,'Jabalpur'),(227,'Jagadhri'),(228,'Jagdalpur'),(229,'Jaipur'),(230,'Jalandhar'),(231,'Jalgaon'),(232,'Jalna'),(233,'Jalpaiguri'),(234,'Jamalpur'),(235,'Jammu'),(236,'Jamnagar'),(237,'Jamshedpur'),(238,'Jamuria'),(239,'Jaunpur'),(240,'Jehanabad'),(241,'Jetpur'),(242,'Jhansi'),(243,'Jhunjhunun'),(244,'Jind'),(245,'Jodhpur'),(246,'Junagadh'),(247,'Kadapa'),(248,'Kaithal'),(249,'Kakinada'),(250,'Kalol'),(251,'Kalyani'),(252,'Kamarhati'),(253,'Kancheepuram'),(254,'Kanchrapara'),(255,'Kanpur'),(256,'Kanpur'),(257,'Karaikkudi'),(258,'Karawal'),(259,'Karimnagar'),(260,'Karnal'),(261,'Kasganj'),(262,'Kashipur'),(263,'Katihar'),(264,'Khammam'),(265,'Khandwa'),(266,'Khanna'),(267,'Kharagpur'),(268,'Khardaha'),(269,'Khargone'),(270,'Khora'),(271,'Khurja'),(272,'Kirari'),(273,'Kishanganj'),(274,'Kishangarh'),(275,'Kochi'),(276,'Kolar'),(277,'Kolhapur'),(278,'Kolkata'),(279,'Kollam'),(280,'Korba'),(281,'Kota'),(282,'Kozhikode'),(283,'Krishnanagar'),(284,'Kulti'),(285,'Kumbakonam'),(286,'Kurichi'),(287,'Kurnool'),(288,'Lakhimpur'),(289,'Lalitpur'),(290,'Latur'),(291,'Loni'),(292,'Lucknow'),(293,'Ludhiana'),(294,'Machilipatnam'),(295,'Madanapalle'),(296,'Madavaram'),(297,'Madhyamgram'),(298,'Madurai'),(299,'Mahbubnagar'),(300,'Mahesana'),(301,'Maheshtala'),(302,'Mainpuri'),(303,'Malegaon'),(304,'Malerkotla'),(305,'Mandoli'),(306,'Mandsaur'),(307,'Mandya'),(308,'Mangalore'),(309,'Mango'),(310,'Mathura'),(311,'Maunath'),(312,'Medinipur'),(313,'Meerut'),(314,'Mira'),(315,'Miryalaguda'),(316,'Mirzapur-cum-Vindhyachal'),(317,'Modinagar'),(318,'Moga'),(319,'Moradabad'),(320,'Morena'),(321,'Morvi'),(322,'Motihari'),(323,'Mughalsarai'),(324,'Muktsar'),(325,'Munger'),(326,'Murwara'),(327,'Mustafabad'),(328,'Muzaffarnagar'),(329,'Muzaffarpur'),(330,'Mysore'),(331,'Nabadwip'),(332,'Nadiad'),(333,'Nagaon'),(334,'Nagapattinam'),(335,'Nagaur'),(336,'Nagda'),(337,'Nagercoil'),(338,'Nagpur'),(339,'Naihati'),(340,'Nalgonda'),(341,'Nanded'),(342,'Nandurbar'),(343,'Nandyal'),(344,'Nangloi'),(345,'Narasaraopet'),(346,'Navi'),(347,'Navi'),(348,'Navsari'),(349,'Neemuch'),(350,'Nellore'),(351,'New'),(352,'Neyveli'),(353,'Nizamabad'),(354,'Noida'),(355,'North'),(356,'North'),(357,'Ongole'),(358,'Orai'),(359,'Osmanabad'),(360,'Ozhukarai'),(361,'Palakkad'),(362,'Palanpur'),(363,'Pali'),(364,'Pallavaram'),(365,'Palwal'),(366,'Panchkula'),(367,'Panihati'),(368,'Panipat'),(369,'Panvel'),(370,'Parbhani'),(371,'Patan'),(372,'Pathankot'),(373,'Patiala'),(374,'Patna'),(375,'Pilibhit'),(376,'Pimpri'),(377,'Pithampur'),(378,'Porbandar'),(379,'Port'),(380,'Proddatur'),(381,'Puducherry'),(382,'Pudukkottai'),(383,'Puri'),(384,'Purnia'),(385,'Puruliya'),(386,'Rae'),(387,'Raichur'),(388,'Raiganj'),(389,'Raigarh'),(390,'Raipur'),(391,'Rajahmundry'),(392,'Rajapalayam'),(393,'Rajarhat'),(394,'Rajkot'),(395,'Rajnandgaon'),(396,'Rajpur'),(397,'Ramagundam'),(398,'Rampur'),(399,'Ranchi'),(400,'Ranibennur'),(401,'Raniganj'),(402,'Ratlam'),(403,'Raurkela'),(404,'Raurkela'),(405,'Rewa'),(406,'Rewari'),(407,'Rishra'),(408,'Robertson'),(409,'Rohtak'),(410,'Roorkee'),(411,'Rudrapur'),(412,'S.A.S.'),(413,'Sagar'),(414,'Saharanpur'),(415,'Saharsa'),(416,'Salem'),(417,'Sambalpur'),(418,'Sambhal'),(419,'Sangli'),(420,'Santipur'),(421,'Sasaram'),(422,'Satara'),(423,'Satna'),(424,'Sawai'),(425,'Secunderabad'),(426,'Sehore'),(427,'Seoni'),(428,'Serampore'),(429,'Shahjahanpur'),(430,'Shamli'),(431,'Shikohabad'),(432,'Shillong'),(433,'Shimla'),(434,'Shimoga'),(435,'Shivpuri'),(436,'Sikar'),(437,'Silchar'),(438,'Siliguri'),(439,'Singrauli'),(440,'Sirsa'),(441,'Sitapur'),(442,'Siwan'),(443,'Solapur'),(444,'Sonipat'),(445,'South'),(446,'Srikakulam'),(447,'Srinagar'),(448,'Sujangarh'),(449,'Sultan'),(450,'Sultanpur'),(451,'Surendranagar'),(452,'Suryapet'),(453,'Tadepalligudem'),(454,'Tadpatri'),(455,'Tambaram'),(456,'Tenali'),(457,'Thane'),(458,'Thanesar'),(459,'Thanjavur'),(460,'Thiruvananthapuram'),(461,'Thoothukkudi'),(462,'Thrissur'),(463,'Tiruchirappalli'),(464,'Tirunelveli'),(465,'Tirupati'),(466,'Tiruppur'),(467,'Tiruvannamalai'),(468,'Tiruvottiyur'),(469,'Titagarh'),(470,'Tonk'),(471,'Tumkur'),(472,'Udaipur'),(473,'Udgir'),(474,'Udupi'),(475,'Ujjain'),(476,'Ulhasnagar'),(477,'Uluberia'),(478,'Unnao'),(479,'Uttarpara'),(480,'Vadodara'),(481,'Valsad'),(482,'Varanasi'),(483,'Vasai'),(484,'Vellore'),(485,'Veraval'),(486,'Vidisha'),(487,'Vijayawada'),(488,'Visakhapatnam'),(489,'Vizianagaram'),(490,'Warangal'),(491,'Wardha'),(492,'Yamunanagar'),(493,'Yavatmal');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `DriverID` int NOT NULL AUTO_INCREMENT,
  `DrivingLicence` varchar(50) NOT NULL,
  `Age` int NOT NULL,
  `UID` int NOT NULL,
  `VehicleInfo` varchar(255) NOT NULL,
  `status` char(1) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`DriverID`),
  UNIQUE KEY `DrivingLicence` (`DrivingLicence`),
  KEY `driver_ibfk_1_idx` (`UID`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `user` (`UID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_driver_insert_dl` BEFORE INSERT ON `driver` FOR EACH ROW BEGIN
    SET NEW.status = 'n';
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_driver_insert_age` BEFORE INSERT ON `driver` FOR EACH ROW BEGIN
    -- Declare a variable to store the user's date of birth
    DECLARE user_dob DATE;

    -- Fetch the date of birth for the given UserID
    SELECT dob INTO user_dob
    FROM user
    WHERE uid = NEW.UID;

    -- Check if the dob is found; calculate the age
    IF user_dob IS NOT NULL THEN
        SET NEW.age = TIMESTAMPDIFF(YEAR, user_dob, CURDATE());
    ELSE
        -- If no dob is found, raise an error or set a default value
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Date of birth not found for the specified UserID';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_driver_update_dl` BEFORE UPDATE ON `driver` FOR EACH ROW BEGIN
    -- If DrivingLicence is updated, reset status to "notverified"
    IF NEW.DrivingLicence != OLD.DrivingLicence THEN
        SET NEW.status = 'n';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_driver_update_status` AFTER UPDATE ON `driver` FOR EACH ROW BEGIN
    -- Check if the status has changed to 'verified'
    IF NEW.status = 'v' THEN
        -- Update the status of all rides published by this driver
        UPDATE `ride`
        SET `status` = 'a'
        WHERE `DriverID` = NEW.DriverID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `PaymentID` int NOT NULL AUTO_INCREMENT,
  `Amount` float NOT NULL,
  `date` datetime(6) NOT NULL,
  `BookingID` int NOT NULL,
  `Status` char(1) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`PaymentID`),
  KEY `BookingID` (`BookingID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ride`
--

DROP TABLE IF EXISTS `ride`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ride` (
  `RideID` int NOT NULL AUTO_INCREMENT,
  `DriverID` int NOT NULL,
  `SourceCity` int NOT NULL,
  `DestinationCity` int NOT NULL,
  `Fare` float NOT NULL,
  `noseat` int NOT NULL,
  `ridedate` datetime(6) NOT NULL,
  `RideComplete` datetime NOT NULL,
  `status` char(1) NOT NULL,
  PRIMARY KEY (`RideID`),
  KEY `ride_cityid_s_idx` (`SourceCity`),
  KEY `ride_cityid_d_idx` (`DestinationCity`),
  KEY `ride_ibfk_1_idx` (`DriverID`),
  CONSTRAINT `ride_cityid_d` FOREIGN KEY (`DestinationCity`) REFERENCES `city` (`CityId`) ON DELETE CASCADE,
  CONSTRAINT `ride_cityid_s` FOREIGN KEY (`SourceCity`) REFERENCES `city` (`CityId`) ON DELETE CASCADE,
  CONSTRAINT `ride_ibfk_1` FOREIGN KEY (`DriverID`) REFERENCES `driver` (`DriverID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ride`
--

LOCK TABLES `ride` WRITE;
/*!40000 ALTER TABLE `ride` DISABLE KEYS */;
/*!40000 ALTER TABLE `ride` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_ride_insert_status` BEFORE INSERT ON `ride` FOR EACH ROW BEGIN
    DECLARE driver_status VARCHAR(15);

    -- Get the status of the driver based on the DriverID
    SELECT `status` INTO driver_status
    FROM `driver`
    WHERE `DriverID` = NEW.`DriverID`;

    -- Logic based on the driver's status and RideComplete time
    IF NEW.RideComplete > CURRENT_TIMESTAMP THEN
        -- RideComplete is in the future
        IF driver_status = 'n' THEN
            SET NEW.`status` = 'n';
        ELSEIF driver_status = 'v' THEN
            SET NEW.`status` = 'a';
        END IF;
    ELSE
        -- RideComplete is in the past or equal to the current time
        IF driver_status = 'v' THEN
            SET NEW.`status` = 'c';
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_ride_update_status` BEFORE UPDATE ON `ride` FOR EACH ROW BEGIN
    DECLARE driver_status VARCHAR(15);

    -- Get the status of the driver based on the DriverID
    SELECT `status` INTO driver_status
    FROM `driver`
    WHERE `DriverID` = NEW.`DriverID`;

    -- Logic based on the driver's status and RideComplete time
    IF NEW.RideComplete > CURRENT_TIMESTAMP THEN
        -- RideComplete is in the future
        IF driver_status = 'n' THEN
            SET NEW.`status` = 'n';
        ELSEIF driver_status = 'v' and 
			((SELECT COUNT(*) FROM booking WHERE rideid = NEW.rideid) >= NEW.noseat) THEN
            SET NEW.`status` = 'f';
		 ELSEIF driver_status = 'v' THEN
            SET NEW.`status` = 'a';
        END IF;
    ELSE
        -- RideComplete is in the past or equal to the current time
        IF driver_status = 'v' THEN
            SET NEW.`status` = 'c';
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_ride_update_completed` AFTER UPDATE ON `ride` FOR EACH ROW BEGIN
    -- Check if the status is updated to 'completed' and was not previously 'completed'
    IF NEW.status = 'c' AND OLD.status != 'c' THEN
        -- Insert the RideID into the triphistory table
        INSERT INTO triphistory (RideID)
        VALUES (NEW.RideID);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(10) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `triphistory`
--

DROP TABLE IF EXISTS `triphistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `triphistory` (
  `TripID` int NOT NULL AUTO_INCREMENT,
  `RideID` int NOT NULL,
  `rating` int DEFAULT NULL,
  `Feedback` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`TripID`),
  KEY `RideID` (`RideID`),
  CONSTRAINT `triphistory_ibfk_1` FOREIGN KEY (`RideID`) REFERENCES `ride` (`RideID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `triphistory`
--

LOCK TABLES `triphistory` WRITE;
/*!40000 ALTER TABLE `triphistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `triphistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Contactno` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `dob` datetime(6) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `RID` int DEFAULT '2',
  PRIMARY KEY (`UID`),
  UNIQUE KEY `Contactno` (`Contactno`),
  KEY `rid_fk_idx` (`RID`),
  CONSTRAINT `rid_fk` FOREIGN KEY (`RID`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'carpooling'
--

--
-- Dumping routines for database 'carpooling'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-03 20:55:43
