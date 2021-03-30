DELETE FROM categories;
ALTER TABLE categories AUTO_INCREMENT = 1;
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Tops", NOW(), NOW()); 
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Jeans", NOW(), NOW()); 
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Dress", NOW(), NOW()); 
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Pants", NOW(), NOW()); 
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Shoes", NOW(), NOW()); 
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Handbags", NOW(), NOW()); 
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Accessories", NOW(), NOW()); 
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Skirt", NOW(), NOW()); 
INSERT INTO categories(category_name, createdAt, updatedAt) VALUES("Shorts", NOW(), NOW());

INSERT INTO counters(counter_name, value, createdAt, updatedAt) VALUES("google_email" ,1, NOW(), NOW());

INSERT INTO catalogs(catalog_name, UserId, createdAt, updatedAt) VALUES("Summer", 1, NOW(), NOW());
INSERT INTO catalogs(catalog_name, UserId, createdAt, updatedAt) VALUES("Fall", 1, NOW(), NOW());
INSERT INTO catalogs(catalog_name, UserId, createdAt, updatedAt) VALUES("Spring", 1, NOW(), NOW());
INSERT INTO catalogs(catalog_name, UserId, createdAt, updatedAt) VALUES("Winter", 1, NOW(), NOW());

DELETE FROM items;
ALTER TABLE items AUTO_INCREMENT = 1;
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('test cat', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616877775/w8pes8b8cpzqsluthdbd.jpg', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616877775/w8pes8b8cpzqsluthdbd.jpg', NOW(), NOW(), NULL, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Brown belt', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616883410/ex7od2oaix9nc0ahgl6b.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616883410/ex7od2oaix9nc0ahgl6b.jpg', NOW(), NOW(), 7, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Earrings', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616883805/oahuw7lomhrytpikxw5i.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616883805/oahuw7lomhrytpikxw5i.jpg', NOW(), NOW(), 7, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Pearl Link Bracelet', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616883823/jqluqo9so00tghqcdbox.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616883823/jqluqo9so00tghqcdbox.jpg', NOW(), NOW(), 7, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Rope Belt', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616883850/iebqdrps8tq2njoabwba.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616883850/iebqdrps8tq2njoabwba.jpg', NOW(), NOW(), 7, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Stone Necklace', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616883879/aspvtboveaanmnw2rjhv.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616883879/aspvtboveaanmnw2rjhv.jpg', NOW(), NOW(), 7, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Wood Bracelet', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616883895/orehdfptvuontpwaukqj.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616883895/orehdfptvuontpwaukqj.jpg', NOW(), NOW(), 7, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('linen trousers', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616883952/knrcgigjzy6of6mxhj0l.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616883952/knrcgigjzy6of6mxhj0l.jpg', NOW(), NOW(), 7, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('linen-skirt', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616883974/usoy9s6bulunzo3wv7lp.jpg', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616883974/usoy9s6bulunzo3wv7lp.jpg', NOW(), NOW(), 8, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Linen Pants', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884045/cquaqpiqsjup1krtblpz.jpg', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884045/cquaqpiqsjup1krtblpz.jpg', NOW(), NOW(), 4, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Pink Trousers', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884066/eort6c5da00wikjvrraw.jpg', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884066/eort6c5da00wikjvrraw.jpg', NOW(), NOW(), 4, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Print Shorts', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884092/p0lrtxhhtaac9mwfyehy.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884092/p0lrtxhhtaac9mwfyehy.jpg', NOW(), NOW(), 9, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Striped Skirt', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884154/siamynttqydikevynefo.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884154/siamynttqydikevynefo.jpg', NOW(), NOW(), 8, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('White Jeans', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884178/z9nr1jpcgri56f7r9ers.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884178/z9nr1jpcgri56f7r9ers.jpg', NOW(), NOW(), 2, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Animal Print Dress', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884307/ymfq0han52mnw9aulptn.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884307/ymfq0han52mnw9aulptn.jpg', NOW(), NOW(), 3, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Black Minidress', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884333/pprvuopsoglktp802hay.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884333/pprvuopsoglktp802hay.jpg', NOW(), NOW(), 3, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Blue Sundress', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884349/ztfw8viag8ceojy508g7.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884349/ztfw8viag8ceojy508g7.jpg', NOW(), NOW(), 3, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Crochet dress', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884360/xykcb3khcobwpnxaliz8.jpg', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884360/xykcb3khcobwpnxaliz8.jpg', NOW(), NOW(), 3, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Halter dress', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884382/fmd9ufe390bmc7hukzdj.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884382/fmd9ufe390bmc7hukzdj.jpg', NOW(), NOW(), 3, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Patwork dress', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616884394/mvvj3fbgqdttguegr6dz.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616884394/mvvj3fbgqdttguegr6dz.jpg', NOW(), NOW(), 3, '1');
INSERT INTO Items(item_name, product_link, image_link, image_thumbnail, createdAt, updatedAt, CategoryId, UserId)
VALUES('Crossbody', NULL, 'http://res.cloudinary.com/dnx8v0ryu/image/upload/v1616893526/uwif6zvmods7fht9rgzu.webp', 'https://res.cloudinary.com/dnx8v0ryu/image/upload/c_limit,h_60,w_90/v1616893526/uwif6zvmods7fht9rgzu.jpg', '2021-03-28 01:05:53', '2021-03-28 01:05:53', 6, 1);
