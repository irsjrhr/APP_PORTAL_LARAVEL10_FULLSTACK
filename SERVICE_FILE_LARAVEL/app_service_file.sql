-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 14, 2026 at 01:13 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_service_file`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_file`
--

DROP TABLE IF EXISTS `data_file`;
CREATE TABLE IF NOT EXISTS `data_file` (
  `id_file` int(11) NOT NULL AUTO_INCREMENT,
  `user_admin` varchar(100) NOT NULL,
  `tipe_penyimpanan` varchar(100) NOT NULL,
  `nama_file` varchar(100) NOT NULL,
  `source_file` text NOT NULL,
  `size_file_kb` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  PRIMARY KEY (`id_file`)
) ENGINE=MyISAM AUTO_INCREMENT=315 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_file`
--

INSERT INTO `data_file` (`id_file`, `user_admin`, `tipe_penyimpanan`, `nama_file`, `source_file`, `size_file_kb`, `status`, `waktu`) VALUES
(313, 'admin', 'lokal', '3a89c170-00ff-4357-b084-966b83890b57.sql', 'http://127.0.0.1:8002/storage/uploads/admin/3a89c170-00ff-4357-b084-966b83890b57.sql', 5, 'active', '2026-04-27 09:20:32'),
(312, 'admin', 'lokal', '4a5f53d7-40bf-4764-9ecf-16c606eb4f89.sql', 'http://127.0.0.1:8002/storage/uploads/admin/4a5f53d7-40bf-4764-9ecf-16c606eb4f89.sql', 5, 'active', '2026-04-27 08:46:27'),
(310, 'admin', 'lokal', '854afa9e-56bc-4f59-a3e1-7319ffdc4dd1.sql', 'http://127.0.0.1:8002/storage/uploads/admin/854afa9e-56bc-4f59-a3e1-7319ffdc4dd1.sql', 5, 'active', '2026-04-27 08:35:03'),
(311, 'admin', 'lokal', 'a5e0d324-5e77-4c72-a257-b3e8fa217bc0.pdf', 'http://127.0.0.1:8002/storage/uploads/admin/a5e0d324-5e77-4c72-a257-b3e8fa217bc0.pdf', 14, 'active', '2026-04-27 08:40:36'),
(314, 'admin', 'lokal', '2c59e342-bf51-4e91-ad59-7c0a77011f86.png', 'http://127.0.0.1:8002/storage/uploads/admin/2c59e342-bf51-4e91-ad59-7c0a77011f86.png', 61, 'active', '2026-05-05 10:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
