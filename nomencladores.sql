# SQL Manager 2011 Lite for MySQL 5.1.0.2
# ---------------------------------------
# Host     : localhost
# Port     : 3306
# Database : nomencladores


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE `nomencladores`
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';

USE `nomencladores`;

#
# Structure for the `nom_uo` table : 
#

CREATE TABLE `nom_uo` (
  `id_uo` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `descrip_uo` VARCHAR(100) COLLATE utf8_general_ci DEFAULT NULL,
  `abreviatura` VARCHAR(50) COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_uo`),
  UNIQUE KEY `id_uo` (`id_uo`)
)ENGINE=InnoDB
AUTO_INCREMENT=85 AVG_ROW_LENGTH=309 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci'
COMMENT=''
;

#
# Structure for the `privilegios` table : 
#

CREATE TABLE `privilegios` (
  `id_privilegios` INTEGER(11) NOT NULL AUTO_INCREMENT,
  `descrip_privilegios` VARCHAR(50) COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_privilegios`),
  UNIQUE KEY `id_privilegios` (`id_privilegios`)
)ENGINE=InnoDB
AUTO_INCREMENT=8 AVG_ROW_LENGTH=2340 CHARACTER SET 'utf8' COLLATE 'utf8_general_ci'
COMMENT=''
;

#
# Data for the `nom_uo` table  (LIMIT -446,500)
#

INSERT INTO `nom_uo` (`id_uo`, `descrip_uo`, `abreviatura`) VALUES 
  (1,'D. P. de la Agricultura','Agricultura'),
  (2,'ONEI San Cristobal','ONEI SC'),
  (3,'ONEI Candelaria','ONEI Cand'),
  (4,'D.G.E.C.D','DGECD'),
  (5,'Centro de Infocomunicaciones','C Infoc'),
  (6,'ONEI Bahia Honda','ONEI BH'),
  (7,'Puesto de Direccion','P Direcc'),
  (8,'D. P de la Defensa','Defensa'),
  (9,'Seguridad y Proteccion','S Protec'),
  (10,'ONEI Artemisa','ONEI Art'),
  (11,'ONEI Guanajay','ONEI Gy'),
  (12,'D. P. del CITMA','CITMA'),
  (13,'D. P. de Educacion','Educacion'),
  (14,'D. P. de Inspeccion','D Inspecc'),
  (15,'ONEI Mariel','ONEI Mariel'),
  (16,'ONEI Caimito','ONEI Caimito'),
  (17,'D. P. de Trabajo','Trabajo'),
  (18,'Centro de Informacion','C Informac'),
  (19,'ONEI Bauta','ONEI Bauta'),
  (20,'ONEI San Antonio','ONEI SAB'),
  (21,'Perfeccionamiento Empresarial','P Empres'),
  (22,'D. P. de Justicia','D Justicia'),
  (23,'ONEI Guira de Melena','ONEI GM'),
  (24,'ONEI Alquizar','ONEI Alquizar'),
  (25,'O.C.I.C','OCIC'),
  (26,'D.G.I.S','DGIS'),
  (27,'Centro de Vialidad','C Vialidad'),
  (28,'D. P. de Auditoria','Auditoria'),
  (29,'Centro de Medicina Deportiva','C Med Deport'),
  (30,'Higiene y Epidemiologia','H Epidem'),
  (31,'D. P. de Hidraulica','D R Hidrau'),
  (32,'D. P de Atencion a los Combatientes','A Combat'),
  (40,'Departamento de Cuadro','Dpto Cuadro'),
  (41,'D.G.E','DGE'),
  (42,'D. P. de Finanzas y Precios','D F Precios'),
  (45,'D.O.P','DOP'),
  (46,'D. P. de Cultura','Cultura'),
  (48,'D. P. de Comercio','Comercio'),
  (49,'D. P. de Planificacion Fisica','P Fisica'),
  (50,'D. P. de Infocomunicaciones','D Infocom'),
  (51,'D. P. de Patrimonio e Inversiones','P Inversiones'),
  (56,'Relaciones Internacionales','R Internac'),
  (60,'Departamento de Energia','Energia'),
  (62,'D. P. de Economia y Planificacion','Eco Planif'),
  (68,'D. P. de Deporte','D Deporte'),
  (71,'U.P.A.S','UPAS'),
  (72,'Asamblea Provincial','ASAMBLEA'),
  (73,'Administracion Provincial','Administracion'),
  (75,'D. P. de Transporte','D Transp'),
  (76,'Atencion a la Poblacion','A Poblacion'),
  (79,'D. P. de Salud','S Publica'),
  (82,'D. P. de la Vivienda','D Vivienda'),
  (84,'D. P. de Informacion','D Informacion');
COMMIT;

#
# Data for the `privilegios` table  (LIMIT -492,500)
#

INSERT INTO `privilegios` (`id_privilegios`, `descrip_privilegios`) VALUES 
  (1,'Administrador General'),
  (2,'Administrador'),
  (3,'Super Usuario'),
  (4,'Usuario Avanzado'),
  (5,'Usuario'),
  (6,'Invitado'),
  (7,'Todos');
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;