DROP DATABASE IF EXISTS consultoriodb;
CREATE DATABASE consultoriodb;
USE consultoriodb;
CREATE TABLE `paciente` (
  `historia` VARCHAR(20),
  `nombre` VARCHAR(100),
  `apellido` VARCHAR(100),
  `documento` INT(20),
  `sexo` VARCHAR(20),
  `fecha_nacimiento` DATE,
  `eps` VARCHAR(100),
  PRIMARY KEY (`documento`)
);

CREATE TABLE `rol` (
  `id_rol` VARCHAR(5),
  `rol` VARCHAR(30),
  PRIMARY KEY (`id_rol`)
);

CREATE TABLE `usuario` (
  `id_usuario` INT(20),
  `id_rol` VARCHAR(5),
  `nombre` VARCHAR(70),
  `apellido` VARCHAR(70),
  `correo` VARCHAR(50),
  `contrasenia` VARCHAR(20),
  PRIMARY KEY (`id_usuario`),
  FOREIGN KEY (`id_rol`) REFERENCES `rol`(`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `estado` (
  `id_estado` INT(20),
  `nombre` VARCHAR(20),
  PRIMARY KEY (`id_estado`)
);

CREATE TABLE `cita` (
  `id_cita` INT(20) AUTO_INCREMENT,
  `id_paciente` INT(20),
  `fecha` DATETIME,
  `lugar` VARCHAR(100),
  `id_estado` INT(20),
  PRIMARY KEY (`id_cita`),
  FOREIGN KEY (`id_paciente`) REFERENCES `paciente`(`documento`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id_estado`)ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `diagnostico` (
  `id_diagnostico` INT(20) AUTO_INCREMENT,
  `id_cita` INT(20),
  `id_paciente` INT(20),
  `id_medico` INT(20),
  `descripcion` TINYTEXT,
  `observacion` TINYTEXT,
  PRIMARY KEY (`id_diagnostico`),
  FOREIGN KEY (`id_cita`) REFERENCES `cita`(`id_cita`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_medico`) REFERENCES `usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_paciente`) REFERENCES `paciente`(`documento`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `medicamento` (
  `id_medicamento` INT(20),
  `nombre` VARCHAR(40),
  `indicaciones` TINYTEXT,
  PRIMARY KEY (`id_medicamento`)
);

CREATE TABLE `formula` (
  `id_diagnostico` INT(20),
  `id_medicamento` INT(20),
  FOREIGN KEY (`id_medicamento`) REFERENCES `medicamento`(`id_medicamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_diagnostico`) REFERENCES `diagnostico`(`id_diagnostico`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `rol` (`id_rol`, `rol`) VALUES ('r1', 'medico');

INSERT INTO `usuario` (`id_usuario`, `id_rol`, `nombre`, `apellido`, `correo`, `contrasenia`) VALUES ('0', 'r1', 'carlos', 'benavides', 'benavides0@gmail.com', 'hashedpassword');

INSERT INTO `estado` (`id_estado`, `nombre`) VALUES ('401', 'agendado'), ('402', 'cancelado'), ('403', 'realizado');
