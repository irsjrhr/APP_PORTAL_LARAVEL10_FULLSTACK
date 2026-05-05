-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 03, 2026 at 06:37 PM
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
-- Database: `app_portal_project`
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
) ENGINE=MyISAM AUTO_INCREMENT=302 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `data_level`
--

DROP TABLE IF EXISTS `data_level`;
CREATE TABLE IF NOT EXISTS `data_level` (
  `id_level` int(11) NOT NULL AUTO_INCREMENT,
  `nama_level` enum('admin','teknisi','user','') NOT NULL,
  `user_admin` varchar(100) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id_level`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_level`
--

INSERT INTO `data_level` (`id_level`, `nama_level`, `user_admin`, `waktu`, `status`) VALUES
(21, 'admin', 'admin', '2025-08-27 00:00:00', 'ACTIVE'),
(22, 'teknisi', 'admin', '2025-08-27 00:00:00', 'ACTIVE'),
(23, 'user', 'admin', '2025-08-27 00:00:00', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `data_produk`
--

DROP TABLE IF EXISTS `data_produk`;
CREATE TABLE IF NOT EXISTS `data_produk` (
  `id_produk` int(11) NOT NULL AUTO_INCREMENT,
  `nama_produk` varchar(100) NOT NULL,
  `deskripsi_produk` text NOT NULL,
  `harga_produk` int(11) NOT NULL,
  `id_file_thumb` varchar(100) NOT NULL,
  `source_file_thumb` text NOT NULL,
  `user_pembuat` varchar(100) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id_produk`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_produk`
--

INSERT INTO `data_produk` (`id_produk`, `nama_produk`, `deskripsi_produk`, `harga_produk`, `id_file_thumb`, `source_file_thumb`, `user_pembuat`, `waktu`, `status`) VALUES
(1, 'Produk A', '', 150000, 'thumb_001', '/images/thumb_001.jpg', 'user1', '2026-01-01 00:00:00', 'ACTIVE'),
(2, 'Produk B', '', 250000, 'thumb_002', '/images/thumb_002.jpg', 'user2', '2026-01-02 00:00:00', 'ACTIVE'),
(3, 'Produk C', '', 100000, 'thumb_003', '/images/thumb_003.jpg', 'user3', '2026-01-03 00:00:00', 'ACTIVE'),
(4, 'Produk D', '', 175000, 'thumb_004', '/images/thumb_004.jpg', 'user1', '2026-01-04 00:00:00', 'ACTIVE'),
(5, 'Produk E', '', 300000, 'thumb_005', '/images/thumb_005.jpg', 'user4', '2026-01-05 00:00:00', 'ACTIVE'),
(6, 'Produk F', '', 120000, 'thumb_006', '/images/thumb_006.jpg', 'user2', '2026-01-06 00:00:00', 'ACTIVE'),
(7, 'Produk G', '', 200000, 'thumb_007', '/images/thumb_007.jpg', 'user3', '2026-01-07 00:00:00', 'ACTIVE'),
(8, 'Produk H', '', 220000, 'thumb_008', '/images/thumb_008.jpg', 'user4', '2026-01-08 00:00:00', 'ACTIVE'),
(9, 'Produk I', '', 180000, 'thumb_009', '/images/thumb_009.jpg', 'user1', '2026-01-09 00:00:00', 'ACTIVE'),
(10, 'Produk J', '', 275000, 'thumb_010', '/images/thumb_010.jpg', 'user2', '2026-01-10 00:00:00', 'ACTIVE'),
(11, 'ada', 'asd', 222, '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', 'admin', '2002-01-26 00:00:00', 'ACTIVE'),
(12, 'sadad', 'asd', 2222, '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', 'admin', '2002-01-26 00:00:00', 'ACTIVE'),
(13, 'sadadkk', 'asd', 2222, '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', 'admin', '2002-01-26 00:00:00', 'ACTIVE'),
(14, 'sadadkkkk', 'asd', 2222, '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', 'admin', '2002-01-26 00:00:00', 'ACTIVE'),
(15, 'sad', 's', 2, '299', 'https://nos.wjv-1.neo.id/certara/uploads/CASUAL-removebg-preview.jpg', 'admin', '2003-01-26 00:00:00', 'ACTIVE'),
(16, 'Produk 1', 'asadbabdsb', 20000, '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', 'admin', '2026-01-16 04:25:14', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `data_project`
--

DROP TABLE IF EXISTS `data_project`;
CREATE TABLE IF NOT EXISTS `data_project` (
  `id_project` int(11) NOT NULL AUTO_INCREMENT,
  `id_produk` int(11) NOT NULL,
  `user_teknisi` varchar(100) NOT NULL,
  `user_client` varchar(100) NOT NULL,
  `nama_project` varchar(100) NOT NULL,
  `deskripsi_project` text NOT NULL,
  `id_dokumen_project` varchar(100) NOT NULL,
  `source_dokumen_project` text NOT NULL,
  `lok_long` varchar(100) NOT NULL,
  `lok_lat` varchar(100) NOT NULL,
  `waktu_mulai_project` datetime DEFAULT NULL,
  `waktu_selesai_project` datetime DEFAULT NULL,
  `status_project` enum('PENDING','TODO','PROGRESS','COMPLETED') NOT NULL,
  `user_pembuat` varchar(100) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id_project`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_project`
--

INSERT INTO `data_project` (`id_project`, `id_produk`, `user_teknisi`, `user_client`, `nama_project`, `deskripsi_project`, `id_dokumen_project`, `source_dokumen_project`, `lok_long`, `lok_lat`, `waktu_mulai_project`, `waktu_selesai_project`, `status_project`, `user_pembuat`, `waktu`, `status`) VALUES
(18, 1, 'teknisi2', 'admin', 'Project 2', 'adsadvagdv', '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', '106.52711752269254', '-6.127640317652643', '2026-01-29 00:00:00', NULL, 'PENDING', 'admin', '2026-01-16 03:17:42', 'ACTIVE'),
(17, 1, 'teknisi4', 'admin', 'Project 1', 's', '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', '106.52711937568816', '-6.1276589826441805', '2026-01-28 00:00:00', NULL, 'PENDING', 'admin', '2026-01-16 03:06:27', 'ACTIVE'),
(20, 1, 'teknisi3', 'admin', 'Project Baru 2', 'asd', '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', '106.52711752269254', '-6.127640317652643', '2026-01-23 05:11:55', NULL, 'PENDING', 'admin', '2026-01-17 05:11:55', 'ACTIVE'),
(21, 7, 'teknisi7', 'admin', 'Project Kalcer', 'adshavdghvahsdv', '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', '106.52715651370343', '-6.127602120036271', '2026-01-30 08:34:05', NULL, 'PENDING', 'admin', '2026-01-17 08:34:05', 'ACTIVE'),
(22, 16, 'teknisi8', 'admin', 'sdasd', 'asdad', '291', 'https://nos.wjv-1.neo.id/certara/uploads/TA%2C%20LMS%20CERTARA.docx', 'NaN', 'NaN', '2026-01-27 13:04:25', NULL, 'PENDING', 'admin', '2026-01-24 13:04:25', 'ACTIVE'),
(23, 5, 'teknisi5', 'admin', 'shandy', 'asadjasdvhasdgv', '301', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/asset_storage/admin/6928974a2353d_file_admin2025-11-27_6928974a236bb.pdf', '106.5267099810929', '-6.127532305182832', '2026-02-20 01:12:54', NULL, 'PENDING', 'admin', '2026-02-17 01:12:54', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `data_user`
--

DROP TABLE IF EXISTS `data_user`;
CREATE TABLE IF NOT EXISTS `data_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `user_pembuat` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_file_profile` varchar(100) NOT NULL,
  `source_file_profile` text NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `level` varchar(100) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_user`
--

INSERT INTO `data_user` (`id_user`, `user`, `user_pembuat`, `password`, `id_file_profile`, `source_file_profile`, `nama`, `alamat`, `email`, `level`, `waktu`, `status`) VALUES
(60, 'admin', 'admin', 'admin', '280', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'admin', 'NULL', 'admin@gmail.com', 'admin', '2025-08-31 00:00:00', 'ACTIVE'),
(66, 'didi', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'didi', 'NULL', 'didi@gmail.com', 'teknisi', '2025-09-30 00:00:00', 'ACTIVE'),
(67, 'dada', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'dada', 'NULL', 'dada@gmail.com', 'user', '2025-10-02 00:00:00', 'ACTIVE'),
(68, 'dudu', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'dudu', 'NULL', 'dudu@gmail..com', 'teknisi', '2025-10-02 00:00:00', 'ACTIVE'),
(69, 'lili', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'lili', 'NULL', 'lili@gmail..com', 'teknisi', '2025-10-02 00:00:00', 'ACTIVE'),
(70, 'lilu', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'lilu', 'NULL', 'lilu@gmail..com', 'teknisi', '2025-10-02 00:00:00', 'ACTIVE'),
(71, 'nana', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'nana', 'NULL', 'nana@gmail..com', 'teknisi', '2025-10-02 00:00:00', 'ACTIVE'),
(72, 'teknisi1', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi1', 'asdasdas', 'teknisi1@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(73, 'teknisi2', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi2', 'asdasdas', 'teknisi2@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(74, 'teknisi3', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi3', 'asdasdas', 'teknisi3@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(75, 'teknisi4', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi4', 'asdasdas', 'teknisi4@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(76, 'teknisi5', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi5', 'asdasdas', 'teknisi5@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(77, 'teknisi6', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi6', 'asdasdas', 'teknisi6@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(78, 'teknisi7', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi7', 'asdasdas', 'teknisi7@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(79, 'teknisi8', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi8', 'asdasdas', 'teknisi8@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(80, 'teknisi9', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi9', 'asdasdas', 'teknisi9@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(81, 'teknisi10', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/service_file/asset_storage/admin/68ef0abf4bcb9_file_admin2025-10-15_68ef0abf4be7c.png', 'teknisi10', 'asdasdas', 'teknisi10@gmail.com', 'teknisi', '2026-01-14 00:00:00', 'ACTIVE'),
(87, 'haikal', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/asset/gam/user_default.png', 'Haikal', 'NULL', 'haikal@gmail.comssss', 'teknisi', '2026-01-16 04:26:54', 'ACTIVE'),
(88, 'sandimongkit', 'admin', 'sandimongkit', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/asset/gam/user_default.png', 'shandy', 'NULL', 'sandimongkit@gmail.comssss', 'teknisi', '2026-02-22 07:27:54', 'ACTIVE'),
(89, 'shandy', 'admin', 'admin', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/asset/gam/user_default.png', 'Irshandy Juniar Hardadi', 'NULL', 'didi@gmail.comssss', 'admin', '2026-03-05 19:55:21', 'ACTIVE'),
(90, 'shadajsbdsbfhab', 'admin', '$irshandy28', '', 'http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_LMS_CERTARA/asset/gam/user_default.png', 'Irshandy Juniar Hardadi', 'NULL', 'ir@gmail.com', 'teknisi', '2026-04-02 13:15:44', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `data_user_teknisi`
--

DROP TABLE IF EXISTS `data_user_teknisi`;
CREATE TABLE IF NOT EXISTS `data_user_teknisi` (
  `id_user_teknisi` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `lok_long` varchar(100) NOT NULL,
  `lok_lat` varchar(100) NOT NULL,
  `status_teknisi` enum('READY','BOOKING','WORKING','') NOT NULL,
  `last_update_lacak` datetime DEFAULT NULL,
  `user_pembuat` varchar(100) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id_user_teknisi`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_user_teknisi`
--

INSERT INTO `data_user_teknisi` (`id_user_teknisi`, `user`, `lok_long`, `lok_lat`, `status_teknisi`, `last_update_lacak`, `user_pembuat`, `waktu`, `status`) VALUES
(15, 'didi', '0', '0', 'READY', '2003-01-26 00:00:00', 'admin', '2003-01-26 00:00:00', 'ACTIVE'),
(16, 'nana', '0', '0', 'READY', '2003-01-26 00:00:00', 'admin', '2003-01-26 00:00:00', 'ACTIVE'),
(17, 'teknisi1', '106.817000', '-6.200500', 'READY', '2026-01-14 00:00:00', 'admin', '2026-01-14 00:00:00', 'ACTIVE'),
(18, 'teknisi2', '106.816500', '-6.199800', 'BOOKING', '2026-01-14 00:00:00', 'admin', '2026-01-16 03:17:43', 'ACTIVE'),
(19, 'teknisi3', '106.817200', '-6.200200', 'BOOKING', '2026-01-14 00:00:00', 'admin', '2026-01-17 05:11:55', 'ACTIVE'),
(14, 'admin', '0', '0', 'READY', '2003-01-26 00:00:00', 'admin', '2003-01-26 00:00:00', 'ACTIVE'),
(20, 'teknisi4', '106.816800', '-6.200700', 'BOOKING', '2026-01-14 00:00:00', 'admin', '2026-01-16 03:06:27', 'ACTIVE'),
(21, 'teknisi5', '106.817100', '-6.200100', 'BOOKING', '2026-01-14 00:00:00', 'admin', '2026-02-17 01:12:54', 'ACTIVE'),
(22, 'teknisi6', '106.816900', '-6.199900', 'BOOKING', '2026-01-14 00:00:00', 'admin', '2026-01-16 04:23:38', 'ACTIVE'),
(23, 'teknisi7', '106.817050', '-6.200300', 'BOOKING', '2026-01-14 00:00:00', 'admin', '2026-01-17 08:34:05', 'ACTIVE'),
(24, 'teknisi8', '106.816750', '-6.200400', 'BOOKING', '2026-01-14 00:00:00', 'admin', '2026-01-24 13:04:25', 'ACTIVE'),
(25, 'teknisi9', '106.817150', '-6.199950', 'READY', '2026-01-14 00:00:00', 'admin', '2026-01-14 00:00:00', 'ACTIVE'),
(26, 'teknisi10', '106.816850', '-6.200600', 'READY', '2026-01-14 00:00:00', 'admin', '2026-01-14 00:00:00', 'ACTIVE'),
(27, 'haikal', '0', '0', 'READY', '2026-01-16 04:27:34', 'admin', '2026-01-16 04:27:34', 'ACTIVE');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
