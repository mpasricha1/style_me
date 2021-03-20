CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `pass` varchar(255),
  `age` varchar(255),
  `gender` varchar(255)
);

CREATE TABLE `item` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `item_name` varchar(255),
  `catalog_id` int,
  `category_id` int,
  `product_link` varchar(255),
  `tags` varchar(255)
);

CREATE TABLE `item_categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category_name` varchar(255)
);

CREATE TABLE `catalog` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `catalog_name` varchar(255)
);

CREATE TABLE `outfit` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `outfit_name` varchar(255),
  `shirt_id` int,
  `pants_id` int,
  `shoes_id` int,
  `outerwear_id` int,
  `hat_id` int,
  `socks_id` int,
  `acc1_id` int,
  `acc2_id` int,
  `acc3_id` int,
  `glasses_id` int,
  `dress_id` int,
  `bag_id` int
);

ALTER TABLE `item` ADD FOREIGN KEY (`catalog_id`) REFERENCES `catalog` (`id`);

ALTER TABLE `item` ADD FOREIGN KEY (`category_id`) REFERENCES `item_categories` (`id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`shirt_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`pants_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`shoes_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`outerwear_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`hat_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`socks_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`acc1_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`acc2_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`acc3_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`glasses_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`dress_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`id`) REFERENCES `outfit` (`bag_id`);

ALTER TABLE `item` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
