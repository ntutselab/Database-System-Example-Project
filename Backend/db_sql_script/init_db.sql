-- create db
DROP DATABASE IF EXISTS bssdb;
CREATE DATABASE bssdb;
USE bssdb;
-- create tables
CREATE TABLE Users (
  ID INTEGER PRIMARY KEY AUTO_INCREMENT,
  Email varchar(50) NOT NULL UNIQUE,
  Password varchar(30) NOT NULL,
  Name varchar(10) NOT NULL,
  Birthday DATE NOT NULL,
  Phone_No varchar(10) NOT NULL,
  Gender varchar(1) NULL
);

CREATE TABLE Buyer (
  ID INTEGER,
  Wallet INT NOT NULL,
  FOREIGN KEY (ID) REFERENCES Users(ID),
  PRIMARY KEY (ID)
);

CREATE TABLE Seller (
  ID INTEGER,
  Profit INT NOT NULL,
  FOREIGN KEY (ID) REFERENCES Users(ID),
  PRIMARY KEY (ID)
);

CREATE TABLE Coupon (
  ID INTEGER PRIMARY KEY AUTO_INCREMENT,
  BuyerID INTEGER NOT NULL,
  Amount INTEGER NOT NULL,
  Used Boolean DEFAULT False,
  Expiry_date DATE NOT NULL,
  FOREIGN KEY (BuyerID) REFERENCES Buyer(ID)
);

CREATE TABLE Products (
  ID INTEGER PRIMARY KEY AUTO_INCREMENT,
  Price INT NOT NULL,
  Sales_volume INT NOT NULL,
  Inventory INT NOT NULL,
  Category varchar(10) NOT NULL,
  Name TEXT NOT NULL,
  Description varchar(500) NOT NULL,
  ImageURL TEXT NOT NULL,
  Available Boolean NOT NULL
);

CREATE TABLE Orders (
  ID INTEGER PRIMARY KEY AUTO_INCREMENT,
  BuyerID INTEGER NOT NULL,
  CouponID INTEGER,
  FOREIGN KEY (BuyerID) REFERENCES Buyer(ID),
  FOREIGN KEY (CouponID) REFERENCES Coupon(ID),
  Date timestamp DEFAULT current_timestamp,
  Price INTEGER NOT NULL,
  Finished Boolean DEFAULT False
);

CREATE TABLE Order_list (
  OrderID INTEGER NOT NULL,
  ProductID INTEGER NOT NULL,
  Amount INTEGER NOT NULL,
  FOREIGN KEY (OrderID) REFERENCES Orders(ID),
  FOREIGN KEY (ProductID) REFERENCES Products(ID),
  PRIMARY KEY (OrderID, ProductID)
);

-- init data
INSERT INTO Users 
VALUES(1, 'buyer@example.com', 'buyer', 'buyer', '2021-01-01', '0912345678', 'M');
INSERT INTO Users 
VALUES(2, 'seller@example.com', 'seller', 'seller', '2021-01-01', '0912345678', 'M');
INSERT INTO Buyer VALUES(1, 2000);
INSERT INTO Seller VALUES(2, 852);
INSERT INTO Coupon (BuyerID, Amount, Used, Expiry_date) VALUES(1, 150, True, '2021-04-01');
INSERT INTO Coupon (BuyerID, Amount, Used, Expiry_date) VALUES(1, 300, False, '2021-04-01');
INSERT INTO Coupon (BuyerID, Amount, Used, Expiry_date) VALUES(1, 250, False, '2021-04-01');
INSERT INTO Orders (BuyerID, CouponID, Date, Price, Finished) VALUES(1, NULL, '2020-12-24', 552, True);
INSERT INTO Orders (BuyerID, CouponID, Date, Price, Finished) VALUES(1, 1, '2020-12-25', 300, True);
INSERT INTO Orders (BuyerID, CouponID, Date, Price, Finished) VALUES(1, NULL, '2020-12-31', 4758, False);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(675, 1, 20, 'blacktea', 'Miaoli Maoli Black Tea', 'Taiwan-Tongluo-Agriculture and Forestry Tongluo Tea Garden', './img/64d6662d.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(350, 0, 20, 'blacktea', 'Organic Honey Fragrant Black Tea', 'After being salivated by a small green leafhopper, the tender tea greens have a delicate fragrance, and the throat is full of sweet and mellow fragrance.', './img/3e3ca728.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(460, 2, 20, 'blacktea', 'Daxi-Honey Fragrant Black Tea (Natural Farming Method)', 'Taiwan-Taoyuan Daxi-Nonglin Amping Tea Garden', './img/6bd812ee.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(400, 0, 20, 'blacktea', 'Organic Qinmi Black Tea', 'Taiwan-Three Gorges-Agriculture and Forestry Xiongkong Ecological Organic Tea Garden', './img/b650222d.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(380, 0, 20, 'blacktea', 'Qinmi Black Tea', 'Picked from Sanyi Agriculture and Forestry and Tongluo Tea Gardens, the tender tea greens have a delicate fragrance after being salivated by a small green leafhopper.', './img/45e5363d.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(450, 0, 20, 'blacktea', 'Selected Red Jade Black Tea', 'Taiwan-Yuchi-Nonglin Yuchi Tea Garden', './img/94d72545.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(130, 1, 20, 'blacktea', 'Fairy black tea', 'Different from the bitterness of ordinary black tea, fairy black tea has a distinctive and rich special flavor.', './img/7c1619ac.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(150, 0, 20, 'blacktea', 'Sun Moon Black Tea', 'Made from carefully selected plump and plump tea leaves, the tea soup is clear and bright red, with a rich fruity aroma, and a sweet and mellow taste.', './img/58c9b267.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(250, 0, 20, 'blacktea', 'Lan Yun Black Tea', 'Brilliant red and translucent, with a strong aroma of orchids and fruits, and a slightly cool throat taste (the smell of four-year-old new tea trees is extraordinary)', './img/0ae63934.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(180, 0, 20, 'blacktea', 'Lugu Black Tea', 'The fruity aroma of oolong tea varieties with small leaves, the taste is relatively sweet and smooth', './img/890943d9.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(420, 0, 20, 'blacktea', 'Organic Qingxingan Green Tea', 'Plant Qingxin Oolong, Qingxin Ganzai, Qingxin Daxiang and other tea species in non-polluting ecological tea gardens.', './img/adfd69d0.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(420, 0, 20, 'greentea', 'Organic Jasper Green Tea', 'Manually collected from the Nonglin Xiongkong organic tea plantation. The tea raw materials are mainly Qingxin Oolong varieties.', './img/27f41f5f.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(490, 0, 20, 'greentea', 'Daxi-Qingxingan Green Tea', 'The old tea factory inherited the traditional tea-making techniques during the Japanese occupation.', './img/18cf52d1.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(500, 0, 20, 'greentea', 'Taiwan Agriculture and Forestry-Select Biluochun Green Tea', 'Taiwan Agriculture and Forestry-Select Biluochun Green Tea', './img/5eb1a6e3.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(500, 0, 20, 'oolongtea', 'Three Gorges Longjing Tea', '【Buertang】Three Gorges Dragon Well Tea', './img/64ac4ed9.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(950, 0, 20, 'oolongtea', 'Strictly selected Alishan Oolong Tea', 'The tea comes from the Alishan tea area.', './img/65e9e086.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(800, 0, 20, 'oolongtea', 'Hand picked high mountain oolong tea', 'The climate in the tea area is cool and cold, and soft and thick tea cyanines are cultivated.', './img/258980af.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(700, 0, 20, 'oolongtea', 'Fragrant Oolong Tea', 'Slightly fermented, the tea soup is fresh and bright yellow, with a characteristic clear taste.', './img/7e610fe8.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(800, 0, 20, 'oolongtea', 'Organic Oriental Beauty Tea', 'Taiwan-Tongluo-Agricultural and Forestry Tongluo Organic Tea Garden', './img/38a78f0d.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(600, 0, 20, 'oolongtea', 'Strictly selected Miaoli Oriental Beauty Tea', 'Strictly selected Miaoli Oriental Beauty Tea', './img/2ca83d0b.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(1080, 0, 20, 'oolongtea', '【Jingshengyu】Light-baked Fir Linxi Oolong', 'Taiwan-Nantou Shanlinxi', './img/dbf27829.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(330, 0, 20, 'oolongtea', '【Longyuan Tea】Traditional taste Dongding Oolong tea', 'Traditional taste Dongding Oolong tea', './img/e39fa72c.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(720, 0, 20, 'oolongtea', 'Open Door Tea House Zhenghe Tieguanyin', 'Three Gorges, Taiwan', './img/9af4fede.jpg', True);
INSERT INTO Products (Price, Sales_volume, Inventory, Category, Name, Description, ImageURL, Available)
VALUES(800, 0, 20, 'oolongtea', '[Emei Tea Shop] Dongding Lao Tea', 'Dongding Lao Tea', './img/f8a071f0.jpg', True);
INSERT INTO Order_list VALUES(1, 1, 1);
INSERT INTO Order_list VALUES(1, 3, 1);
INSERT INTO Order_list VALUES(2, 3, 1);
INSERT INTO Order_list VALUES(3, 1, 1);
INSERT INTO Order_list VALUES(3, 2, 1);
INSERT INTO Order_list VALUES(3, 3, 1);
INSERT INTO Order_list VALUES(3, 4, 1);
INSERT INTO Order_list VALUES(3, 5, 1);
INSERT INTO Order_list VALUES(3, 6, 1);