# SQL Manager 2011 Lite for MySQL 5.1.0.2
# ---------------------------------------
# Host     : localhost
# Port     : 3306
# Database : equipam


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES latin1 */;

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE `equipam`
    CHARACTER SET 'latin1'
    COLLATE 'latin1_swedish_ci';

USE `equipam`;

#
# Structure for the `componente` table : 
#

CREATE TABLE `componente` (
  `id_componente` INTEGER(6) NOT NULL AUTO_INCREMENT,
  `descrip_componente` VARCHAR(200) COLLATE latin1_swedish_ci NOT NULL,
  `id_componente_padre` INTEGER(11) DEFAULT NULL,
  `cant_max` INTEGER(11) DEFAULT NULL,
  PRIMARY KEY (`id_componente`)
)ENGINE=InnoDB
AUTO_INCREMENT=15 AVG_ROW_LENGTH=3276 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `estado` table : 
#

CREATE TABLE `estado` (
  `id_estado` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `descrip_estado` VARCHAR(20) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
)ENGINE=InnoDB
AUTO_INCREMENT=6 AVG_ROW_LENGTH=3276 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `expediente` table : 
#

CREATE TABLE `expediente` (
  `num_exp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `id_elaborador` INTEGER(11) DEFAULT NULL,
  `responsable` INTEGER(11) DEFAULT NULL,
  `id_uo` INTEGER(11) DEFAULT NULL,
  `fecha` DATE DEFAULT NULL,
  `estado` INTEGER(11) DEFAULT 1,
  PRIMARY KEY (`num_exp`)
)ENGINE=InnoDB
AUTO_INCREMENT=14 AVG_ROW_LENGTH=1365 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `persona` table : 
#

CREATE TABLE `persona` (
  `id_persona` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `nombre_completo` VARCHAR(200) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_persona`)
)ENGINE=InnoDB
AUTO_INCREMENT=3 AVG_ROW_LENGTH=8192 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `propiedades` table : 
#

CREATE TABLE `propiedades` (
  `id_propiedad` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `id_componente` INTEGER(11) DEFAULT NULL,
  `descrip_propiedad` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_propiedad`)
)ENGINE=InnoDB
AUTO_INCREMENT=53 AVG_ROW_LENGTH=327 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `usuario` table : 
#

CREATE TABLE `usuario` (
  `id` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(50) COLLATE latin1_swedish_ci NOT NULL,
  `password` VARCHAR(50) COLLATE latin1_swedish_ci NOT NULL,
  `privilegio` INTEGER(11) DEFAULT NULL,
  `nombre` VARCHAR(200) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB
AUTO_INCREMENT=11 AVG_ROW_LENGTH=2730 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_1` table : 
#

CREATE TABLE `zzcomp_1` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_1_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_10` table : 
#

CREATE TABLE `zzcomp_10` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_29` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_30` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_31` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_32` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_33` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_10_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_11` table : 
#

CREATE TABLE `zzcomp_11` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_46` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_47` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_48` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_49` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_11_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_12` table : 
#

CREATE TABLE `zzcomp_12` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_38` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_39` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_40` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_41` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_12_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_13` table : 
#

CREATE TABLE `zzcomp_13` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_1` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_3` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_4` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_13_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_14` table : 
#

CREATE TABLE `zzcomp_14` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_50` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_51` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_52` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_14_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_2` table : 
#

CREATE TABLE `zzcomp_2` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_5` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_6` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_7` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_9` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_2_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=7 AVG_ROW_LENGTH=16384 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_3` table : 
#

CREATE TABLE `zzcomp_3` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_18` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_19` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_20` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_21` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_3_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=5 AVG_ROW_LENGTH=4096 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_4` table : 
#

CREATE TABLE `zzcomp_4` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_22` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_23` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_24` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_4_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_5` table : 
#

CREATE TABLE `zzcomp_5` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_34` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_35` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_36` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_37` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_5_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_6` table : 
#

CREATE TABLE `zzcomp_6` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_25` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_26` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_27` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_28` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_6_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=3 AVG_ROW_LENGTH=8192 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_7` table : 
#

CREATE TABLE `zzcomp_7` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_10` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_11` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_12` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_13` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_7_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_8` table : 
#

CREATE TABLE `zzcomp_8` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_42` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_43` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_44` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_45` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_8_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Structure for the `zzcomp_9` table : 
#

CREATE TABLE `zzcomp_9` (
  `id_cmp` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `num_exp` INTEGER(11) DEFAULT NULL,
  `ppd_14` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_15` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_16` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  `ppd_17` VARCHAR(100) COLLATE latin1_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cmp`),
  KEY `num_exp` (`num_exp`),
  CONSTRAINT `zzcomp_9_ibfk_1` FOREIGN KEY (`num_exp`) REFERENCES `expediente` (`num_exp`) ON DELETE CASCADE
)ENGINE=InnoDB
AUTO_INCREMENT=1 CHARACTER SET 'latin1' COLLATE 'latin1_swedish_ci'
COMMENT=''
;

#
# Data for the `componente` table  (LIMIT -485,500)
#

INSERT INTO `componente` (`id_componente`, `descrip_componente`, `id_componente_padre`, `cant_max`) VALUES 
  (1,'PC',-1,1),
  (2,'Chasis',1,1),
  (3,'Fuente',1,1),
  (4,'Lector DVD/CD',1,1),
  (5,'Motherboard',1,1),
  (6,'Memoria RAM',1,2),
  (7,'CPU',1,1),
  (8,'Tarjeta de Red',1,1),
  (9,'Disco Duro',1,2),
  (10,'Monitor',1,1),
  (11,'Teclado',1,1),
  (12,'Mouse',1,1),
  (13,'Bocina',1,1),
  (14,'UPS',1,1);
COMMIT;

#
# Data for the `estado` table  (LIMIT -494,500)
#

INSERT INTO `estado` (`id_estado`, `descrip_estado`) VALUES 
  (1,'En Confeccion'),
  (2,'En Uso'),
  (3,'Roto'),
  (4,'Reportado'),
  (5,'Incompleto');
COMMIT;

#
# Data for the `expediente` table  (LIMIT -487,500)
#

INSERT INTO `expediente` (`num_exp`, `id_elaborador`, `responsable`, `id_uo`, `fecha`, `estado`) VALUES 
  (2,1,1,3,'2015-10-02',1),
  (3,2,1,2,'2015-10-20',1),
  (4,2,1,4,'2015-10-02',1),
  (5,2,1,4,'2015-10-02',1),
  (6,4,1,2,'2015-10-21',1),
  (7,5,1,4,'2015-10-28',1),
  (8,5,1,2,'2015-10-02',1),
  (9,1,1,4,'2015-10-02',1),
  (10,2,1,4,'2015-10-27',1),
  (11,2,1,4,'2015-10-05',1),
  (12,1,1,4,'2015-10-05',1),
  (13,2,2,4,'2015-10-05',1);
COMMIT;

#
# Data for the `persona` table  (LIMIT -497,500)
#

INSERT INTO `persona` (`id_persona`, `nombre_completo`) VALUES 
  (1,'Yariel Gordillo Linares'),
  (2,'Maria Teresa de los Angeles');
COMMIT;

#
# Data for the `propiedades` table  (LIMIT -449,500)
#

INSERT INTO `propiedades` (`id_propiedad`, `id_componente`, `descrip_propiedad`) VALUES 
  (1,13,'Marca'),
  (3,13,'Modelo'),
  (4,13,'N/S'),
  (5,2,'No. Inventario'),
  (6,2,'No. Serie'),
  (7,2,'Marca'),
  (9,2,'Funcionamniento'),
  (10,7,'Marca'),
  (11,7,'N/S'),
  (12,7,'Velocidad'),
  (13,7,'Tipo'),
  (14,9,'Marca'),
  (15,9,'N/S'),
  (16,9,'Capacidad'),
  (17,9,'Tipo'),
  (18,3,'Marca'),
  (19,3,'N/S'),
  (20,3,'Potencia'),
  (21,3,'Tipo'),
  (22,4,'Marca'),
  (23,4,'N/S'),
  (24,4,'Tipo'),
  (25,6,'Marca'),
  (26,6,'N/S'),
  (27,6,'Capacidad'),
  (28,6,'Tipo'),
  (29,10,'Marca'),
  (30,10,'Modelo'),
  (31,10,'No. Inventario'),
  (32,10,'N/S'),
  (33,10,'Tipo'),
  (34,5,'Marca'),
  (35,5,'N/S'),
  (36,5,'Modelo'),
  (37,5,'Socket'),
  (38,12,'Marca'),
  (39,12,'Modelo'),
  (40,12,'Tipo'),
  (41,12,'N/S'),
  (42,8,'Marca'),
  (43,8,'N/S'),
  (44,8,'Velocidad'),
  (45,8,'Modelo'),
  (46,11,'Marca'),
  (47,11,'Modelo'),
  (48,11,'N/S'),
  (49,11,'Tipo'),
  (50,14,'Marca'),
  (51,14,'N/S'),
  (52,14,'No. Inventario');
COMMIT;

#
# Data for the `usuario` table  (LIMIT -489,500)
#

INSERT INTO `usuario` (`id`, `usuario`, `password`, `privilegio`, `nombre`) VALUES 
  (1,'wency','wency',3,'Wency Rodriguez Sanchez'),
  (2,'leonel','leonel',3,'Leonel Gato Palomino'),
  (3,'lili','lili',3,'Lidianis Borges Cano '),
  (4,'heily','heily',3,'Heily Viera Gonzalez'),
  (5,'diuris','diuris',3,'Diuris Izaguirre Suarez'),
  (6,'david ','david',3,'David Crespo roble'),
  (7,'lorena','lorena',3,'Lorena Perez Jorge'),
  (8,'daniel','daniel',3,'Daniel Angel Barrios'),
  (9,'dayneris','dayneris',3,'Dayneris Piedra Gil '),
  (10,'yariko','yariko',1,'Yariel Gordillo Linares');
COMMIT;

#
# Data for the `zzcomp_2` table  (LIMIT -498,500)
#

INSERT INTO `zzcomp_2` (`id_cmp`, `num_exp`, `ppd_5`, `ppd_6`, `ppd_7`, `ppd_9`) VALUES 
  (6,3,'12333','1421221','222222222','2222222222222');
COMMIT;

#
# Data for the `zzcomp_3` table  (LIMIT -495,500)
#

INSERT INTO `zzcomp_3` (`id_cmp`, `num_exp`, `ppd_18`, `ppd_19`, `ppd_20`, `ppd_21`) VALUES 
  (1,3,'Huntkey','DDDDDD','EEEE','XXXXX'),
  (2,5,'Huntkey','asda','asd','aasdasd'),
  (3,10,'Huntkey','sdfsdf','sdf','sdfsdf'),
  (4,11,'Huntkey','asd','asd','asdasd');
COMMIT;

#
# Data for the `zzcomp_6` table  (LIMIT -497,500)
#

INSERT INTO `zzcomp_6` (`id_cmp`, `num_exp`, `ppd_25`, `ppd_26`, `ppd_27`, `ppd_28`) VALUES 
  (1,3,'asd','asd','asd','asd'),
  (2,3,'asd','asd','asd','asd');
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;