-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: database
-- Generation Time: Sep 14, 2021 at 12:18 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `quiz_item`
--

CREATE TABLE `quiz_item` (
  `id` int(11) NOT NULL,
  `sub_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `answer` int(11) NOT NULL,
  `last_edit_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_set`
--

CREATE TABLE `quiz_set` (
  `id` int(11) NOT NULL,
  `name_set` varchar(255) NOT NULL,
  `last_edit_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_sub`
--

CREATE TABLE `quiz_sub` (
  `id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  `name_sub` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_title`
--

CREATE TABLE `quiz_title` (
  `id` int(11) NOT NULL,
  `name_title` varchar(255) NOT NULL,
  `last_edit_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sub_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `star` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL,
  `totel` int(11) NOT NULL,
  `last_edit_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `result_item`
--

CREATE TABLE `result_item` (
  `id` int(11) NOT NULL,
  `result_id` int(11) NOT NULL,
  `quiz_item_id` int(11) NOT NULL,
  `answer` int(11) NOT NULL,
  `start` int(11) NOT NULL,
  `last_edit_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `age` int(11) NOT NULL,
  `province` varchar(255) NOT NULL,
  `school` varchar(255) NOT NULL,
  `room` varchar(255) NOT NULL,
  `exp_date` date NOT NULL,
  `start` int(11) NOT NULL,
  `set_Quiz` varchar(255) NOT NULL,
  `last_edit_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `title`, `fname`, `lname`, `email`, `nickname`, `birthday`, `age`, `province`, `school`, `room`, `exp_date`, `start`, `set_Quiz`, `last_edit_time`) VALUES
(1, 'tt', 'test', 'tttt', 'ttttttt', 'ss', '2021-09-01', 1, 'aaaa', 'aaaa', 'aaaa', '2021-09-01', 1, 'ee', '2021-09-01'),
(2, 'tt', 'test', 'tttt', 'ttttttt', 'ss', '2021-09-01', 1, 'aaaa', 'aaaa', 'aaaa', '2021-09-01', 1, 'ee', '2021-09-01');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `name_type` varchar(255) NOT NULL,
  `last_edit_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `name_type`, `last_edit_time`) VALUES
(1, 'eeee', '2021-09-01'),
(2, 'eeee', '2021-09-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quiz_item`
--
ALTER TABLE `quiz_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_set`
--
ALTER TABLE `quiz_set`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_sub`
--
ALTER TABLE `quiz_sub`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_title`
--
ALTER TABLE `quiz_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result_item`
--
ALTER TABLE `result_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quiz_item`
--
ALTER TABLE `quiz_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_set`
--
ALTER TABLE `quiz_set`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_sub`
--
ALTER TABLE `quiz_sub`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_title`
--
ALTER TABLE `quiz_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `result_item`
--
ALTER TABLE `result_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
