-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2023 at 04:46 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `added_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(1, 'Laptop'),
(2, 'Speakers'),
(3, 'Headphones');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 - Pending, 1 - Approved, 2 - Cancelled ',
  `order_cancel_reason` text DEFAULT NULL,
  `order_placed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_received_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `status`, `order_cancel_reason`, `order_placed_at`, `order_received_at`) VALUES
(1, 1, 5, 0, NULL, '2023-01-29 15:40:29', NULL),
(2, 1, 4, 2, NULL, '2023-01-29 15:40:34', NULL),
(3, 1, 7, 1, NULL, '2023-01-29 15:43:26', NULL),
(4, 2, 4, 1, NULL, '2023-01-29 15:45:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `item_name` varchar(50) NOT NULL DEFAULT '0',
  `description` varchar(1000) NOT NULL DEFAULT '0',
  `category_id` int(11) NOT NULL,
  `img` varchar(50) DEFAULT NULL,
  `price` double(10,0) NOT NULL,
  `qty` int(11) NOT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `item_name`, `description`, `category_id`, `img`, `price`, `qty`, `is_featured`) VALUES
(4, 'Acer Nitro 5', 'Acer Nitro 5 (2020) is a Windows 10 Home laptop with a 15.00-inch display that has a resolution of 1920x1080 pixels. It is powered by a Core i5 processor and it comes with 8GB of RAM. The Acer Nitro 5 (2020) packs 1TB of HDD storage and 256GB of SSD storage. Graphics are powered by Nvidia GeForce GTX 1650.', 1, '1675006686499.jpg', 25000, 100, 1),
(5, 'Legion 5', 'Lenovo Legion 5 Pro – Performance and gaming. Inside the Legion 5 Pro is an Intel Core i7–12700H with 14 cores and 20 threads, an Nvidia RTX 3070 Ti with 8GB of GDDR6 memory, a 512GB NVMe SSD for storage and 16GB of DDR5 4,800Mhz memory. That\'s a respectable component list for any gaming PC, let alone for a laptop.', 1, '1675006610403.jpg', 35000, 50, 0),
(7, 'Logitech G431', 'With the G431 gaming headset, be surrounded by the game environment. Get the thrill of being fully immersed in the action and always heard for a complete gaming experience.', 3, '1675006982382.png', 1000, 100, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `address`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Joshua Maurice Yaacoub', 'Urdaneta City, Pangasinan', 'joshuayaacoub33@gmail.com', '$2b$10$az83aMBoOaSSZVOWRjwOEu1ZymORJZprfxhOj7Js1UoE.GqaTa.gC', '2023-01-29 14:58:20', '2023-01-29 14:58:20'),
(2, 'Cassandra Santos', 'Urdaneta City, Pangasinan', 'cassandra@example.com', '$2b$10$qZyrfjtOE6wH8o00E2G26uysgxKULY9BZqzIT.3TPE43Kb4Sbc5ou', '2023-01-29 15:44:29', '2023-01-29 15:44:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
