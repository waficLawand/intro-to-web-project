-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2018 at 06:39 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intro-to-web-project-database`
--

-- --------------------------------------------------------

--
-- Table structure for table `petitions`
--

CREATE TABLE `petitions` (
  `request` varchar(2000) NOT NULL,
  `votes` int(255) NOT NULL,
  `author` varchar(2000) NOT NULL,
  `id` int(255) NOT NULL,
  `votedUsers` varchar(767) NOT NULL,
  `imageUrl` varchar(767) NOT NULL,
  `raisePetitionTo` varchar(767) NOT NULL,
  `title` varchar(767) NOT NULL,
  `signatureGoal` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `petitions`
--

INSERT INTO `petitions` (`request`, `votes`, `author`, `id`, `votedUsers`, `imageUrl`, `raisePetitionTo`, `title`, `signatureGoal`) VALUES
('University premises means buildings, structures and land which are under the control and management of the University and which are used for, or in connection with, the purposes of the University including any land or premises used or occupied by the University pursuant to any lease, licence or right to occupy.', 20, 'Wafic Lawand', 56, '', 'https://images.myparkingsign.com/img/lg/K/aluminum-parking-sign-k-1605.png', 'Principle', 'Scrap car Parking Fees at BAU', 200),
('Originally made of lamb or mutton, today\'s shawarma may also be chicken, turkey, beef, or veal, cut in thin slices and stacked in a cone-like shape on a vertical rotisserie.Thin slices are shaved off the cooked surface as it continuously rotates. Shawarma is one of the world\'s most popular street foods, especially in the countries of the Levant and the Arabian Peninsula.', 50, 'Wafic Lawand', 57, '', 'https://i2.wp.com/media.hungryforever.com/wp-content/uploads/2018/02/13112913/beef-shawarma.jpg?ssl=1?w=356&strip=all&quality=80', 'Cafeteria', 'Add shawarma to the menu', 100),
('The Halifax Central Library, a modern city library\r\nA library is a collection of sources of information and similar resources, made accessible to a defined community for reference or borrowing.[1] It provides physical or digital access to material, and may be a physical building or room, or a virtual space, or both.[2] A library\'s collection can include books, periodicals, newspapers, manuscripts, films, maps, prints, documents, microform, CDs, cassettes, videotapes, DVDs, Blu-ray Discs, e-books, audiobooks, databases, and other formats. Libraries range in size from a few shelves of books to several million items. In Latin and Greek, the idea of a bookcase is represented by Bibliotheca and Biblioth?k? (Greek: ??????????): derivatives of these mean library in many modern languages, e.g. French bibliothèque.\r\n\r\nThe first libraries consisted of archives of the earliest form of writing—the clay tablets in cuneiform script discovered in Sumer, some dating back to 2600 BC. Private or personal libraries made up of written books appeared in classical Greece in the 5th century BC. In the 6th century, at the very close of the Classical period, the great libraries of the Mediterranean world remained those of Constantinople and Alexandria.', 0, 'Mohammad Daouk', 58, '', 'http://scandinavianlibrary.org/wp-content/uploads/2017/11/IMG_0735-1-e1511040507716.jpg', 'Dean of The Faculty', 'Library open hours', 150),
('The specialization in Robotics and Mechatronics deals with the application of modern systems and control methods in practical situations. Its focus is on robotics as a specific class of mechatronic systems. Areas of application include inspection robotics (UAVs, UGV, UUVs), medical robotics (assistance to surgeons), and service robotics (street cleaning, service to people). The science and engineering topics you will work on include modelling and simulation of physical systems, intelligent control, robotic actuators, and embedded control systems.', 1, 'Wafic Lawand', 59, '', 'https://westvancouverschools.ca/wp-content/uploads/2015/11/mechatronics-robotics-header-1.jpg', 'Dean of The Faculty', 'Open a Robotics Club', 100);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `password` varchar(767) NOT NULL,
  `email` varchar(767) NOT NULL,
  `year` int(255) NOT NULL,
  `major` varchar(767) NOT NULL,
  `avatar` varchar(767) NOT NULL,
  `firstName` varchar(767) NOT NULL,
  `lastName` varchar(767) NOT NULL,
  `faculty` varchar(767) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `year`, `major`, `avatar`, `firstName`, `lastName`, `faculty`) VALUES
(201501458, '123', 'mohammad@gmail.com', 0, '', '', 'Mohammad', 'Daouk', ''),
(201801411, 'june201999', 'wafic.lawand@outlook.com', 0, '', '', 'Wafic', 'Lawand', '');

-- --------------------------------------------------------

--
-- Table structure for table `votedusers`
--

CREATE TABLE `votedusers` (
  `userId` int(255) NOT NULL,
  `petitionId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `votedusers`
--

INSERT INTO `votedusers` (`userId`, `petitionId`) VALUES
(201801411, 1),
(201801411, 3),
(201801411, 7),
(201801411, 11),
(201801411, 12),
(201801411, 5),
(52052, 12),
(201801411, 4),
(201801411, 6),
(201801411, 10),
(201801411, 9),
(201801411, 2),
(201801411, 8),
(201801411, 13),
(201801411, 14),
(201801411, 16),
(201801411, 21),
(201801411, 20),
(201801411, 19),
(201801411, 22),
(201801411, 24),
(201801411, 23),
(201801411, 25),
(201801411, 26),
(201801411, 27),
(201801411, 28),
(201801411, 29),
(201801411, 30),
(201801411, 31),
(201801411, 32),
(201801411, 33),
(201801411, 34),
(201801411, 35),
(201801411, 36),
(201801411, 37),
(201801411, 39),
(201801411, 38),
(201801411, 40),
(201801411, 41),
(201801411, 42),
(201801411, 43),
(201801411, 44),
(201801411, 45),
(201801411, 46),
(201801411, 47),
(201801411, 48),
(201801411, 49),
(201801411, 50),
(201801411, 44),
(201801411, 51),
(201801411, 51),
(201801411, 51),
(201801411, 52),
(201801411, 53),
(32578934, 46),
(32578934, 45),
(32578934, 54),
(32578934, 44),
(32578934, 48),
(7887878, 45),
(7887878, 46),
(7887878, 44),
(201801411, 54),
(159786, 45),
(159786, 45),
(159786, 45),
(21, 45),
(21, 44),
(201801411, 55),
(123487, 44),
(123487, 46),
(123487, 51),
(558877, 45),
(123, 47),
(123456, 48),
(123456, 46),
(201801411, 57),
(201801411, 59);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `petitions`
--
ALTER TABLE `petitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `petitions`
--
ALTER TABLE `petitions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
