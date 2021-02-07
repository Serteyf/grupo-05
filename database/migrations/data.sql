-- Falta llenar los datos de products, sales y products_sales --
USE `movies_catchup`;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,`user`,`Usuario de Prueba`,`user@level.up`,`Domicilo de prueba`,`$2b$12$dpV7HhRLX6lAUY5Kv55aeeJu9Afg6nCjpASzS..1kokxZl9KXlD8W`, 1, `avatar-1611023247989.png`),(2,`admin`,`Administrador`,`admin@level.up`,`Domicilio de admin`,`$2b$12$7WqrT08NI3o5FB8nAVqaXOi8POKApqu7kbd2dH1JZwi935Lw9tgBO`, 2, `avatar-1611023533110.png`);
UNLOCK TABLES;


LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES (1,NULL,NULL,'Sam','Worthington',7.5,1,'profilePic-1594670324302.png'),(2,NULL,NULL,'Zoe','Saldana',5.5,2,NULL),(3,NULL,NULL,'Sigourney','Weaver',9.7,NULL,NULL),(4,NULL,NULL,'Leonardo','Di Caprio',3.5,4,NULL),(5,NULL,NULL,'Kate','Winslet',1.5,5,NULL),(6,NULL,NULL,'Billy','Zane',7.5,6,NULL),(7,NULL,NULL,'Mark','Hamill',6.5,7,NULL),(8,NULL,NULL,'Harrison','Ford',7.5,8,NULL),(9,NULL,NULL,'Carrie','Fisher',7.5,9,NULL),(10,NULL,NULL,'Sam','Neill',2.5,10,NULL),(11,NULL,NULL,'Laura','Dern',7.5,11,NULL),(12,NULL,NULL,'Jeff','Goldblum',4.5,NULL,NULL),(13,NULL,NULL,'Daniel','Radcliffe',7.5,13,NULL),(14,NULL,NULL,'Emma','Watson',2.5,14,NULL),(15,NULL,NULL,'Rupert','Grint',6.2,15,NULL),(16,NULL,NULL,'Shia','LaBeouf',9.5,16,NULL),(17,NULL,NULL,'Rosie','Huntington-Whiteley',1.5,17,NULL),(18,NULL,NULL,'Matthew','Broderick',6.1,18,NULL),(19,NULL,NULL,'James','Earl Jones',7.5,19,NULL),(20,NULL,NULL,'Jeremy','Irons',7.2,20,NULL),(21,NULL,NULL,'Johnny','Depp',1.5,21,NULL),(22,NULL,NULL,'Helena','Bonham Carter',7.5,1,NULL),(23,NULL,NULL,'Mia','Wasikowska',7.5,2,NULL),(24,NULL,NULL,'Albert','Brooks',2.5,3,NULL),(25,NULL,NULL,'Ellen','DeGeneres',2.6,4,NULL),(26,NULL,NULL,'Alexander','Gould',7.5,5,NULL),(27,NULL,NULL,'Tom','Hanks',4.4,6,NULL),(28,NULL,NULL,'Tim','Allen',7.5,7,NULL),(29,NULL,NULL,'Sean','Penn',9.2,8,NULL),(30,NULL,NULL,'Adam','Sandler',3.1,9,NULL),(31,NULL,NULL,'Renee','Zellweger',9.5,10,NULL),(32,NULL,NULL,'Emilia','Clarke',8.2,11,NULL),(33,NULL,NULL,'Peter','Dinklage',2.3,12,NULL),(34,NULL,NULL,'Kit','Harington',2.4,NULL,NULL),(35,NULL,NULL,'Jared','Padalecki',2.8,14,NULL),(36,NULL,NULL,'Jensen','Ackles',5.5,15,NULL),(37,NULL,NULL,'Jim','Beaver',2.6,16,NULL),(38,NULL,NULL,'Andrew','Lincoln',3.3,17,NULL),(39,NULL,NULL,'Jon','Bernthal',2.9,NULL,NULL),(40,NULL,NULL,'Sarah','Callies',2.4,19,NULL),(41,NULL,NULL,'Jim','Caviezel',1.9,20,NULL),(42,NULL,NULL,'Taraji','Henson',5.9,21,NULL),(43,NULL,NULL,'Kevin','Chapman',2.9,1,NULL),(44,NULL,NULL,'Johnny','Galecki',2.3,2,NULL),(45,NULL,NULL,'Jim','Parsons',6.9,3,NULL),(46,NULL,NULL,'Kaley','Cuoco',2.3,4,NULL),(47,NULL,NULL,'Bryan','Cranston',7.9,NULL,NULL),(48,NULL,NULL,'Aaron','Paul',5.9,6,NULL),(49,NULL,NULL,'Anna','Gunn',3.1,7,NULL);
UNLOCK TABLES;

LOCK TABLES `sales` WRITE;
INSERT INTO `sales` VALUES (1,'2016-07-04 03:00:00',NULL,'Comedia'),(2,'2014-07-04 03:00:00',NULL,'Terror'),(3,'2013-07-04 03:00:00',NULL,'Drama'),(4,'2011-07-04 03:00:00',NULL,'Accion'),(5,'2010-07-04 03:00:00',NULL,'Ciencia Ficcion'),(6,'2013-07-04 03:00:00',NULL,'Suspenso'),(7,'2005-07-04 03:00:00',NULL,'Animacion'),(8,'2003-07-04 03:00:00',NULL,'Aventuras'),(9,'2008-07-04 03:00:00',NULL,'Documental'),(10,'2013-07-04 03:00:00',NULL,'Infantiles'),(11,'2011-07-04 03:00:00',NULL,'Fantasia'),(12,'2013-07-04 03:00:00',NULL,'Musical');
UNLOCK TABLES;


LOCK TABLES `products_sales` WRITE;
INSERT INTO `products_sales` VALUES (1, "");
UNLOCK TABLES;

LOCK TABLES `user_category` WRITE;
INSERT INTO `user_category` VALUES (1, "Usuario"), (2, "Administrador");
UNLOCK TABLES;

LOCK TABLES `products_category` WRITE;
INSERT INTO `products_category` VALUES (1, "Consolas"), (2, "Juegos"), (3, "Accesorios"),(4, "Retro");
UNLOCK TABLES;