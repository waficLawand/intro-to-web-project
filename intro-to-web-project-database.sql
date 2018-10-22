-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2018 at 09:29 AM
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
('jdjdjdjdjd', 1, 'Wafic Lawand', 14, '', 'https://clbrestaurants.com/portals/2/images/our-restaurants.jpg', 'Dean of The Faculty', 'Testing new newpetitionForm', 500),
('jwsjdsadkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', 0, 'Wafic Lawand', 19, '', 'https://steamuserimages-a.akamaihd.net/ugc/169283403628286180/9A48260B2D0949563EDA5C548AE5A773D1392644/', 'Dean of The Faculty', 'Testing new newpetitionForm', 100),
('shawarma is life.\r\n', 0, 'Wafic Lawand', 20, '', 'https://steamuserimages-a.akamaihd.net/ugc/169283403628286180/9A48260B2D0949563EDA5C548AE5A773D1392644/', 'Dean of The Faculty', 'Add a shawarma making calss!', 110);

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
(52052, '123', '123@gmail.com', 0, '', '', 'zainab', 'abdelarazak', ''),
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
(201801411, 16);

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
