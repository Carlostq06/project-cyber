--Hecha por Nacho

CREATE SCHEMA IF NOT EXISTS `consultorio_medico` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `consultorio_medico`;

-- 1. Registro de Pacientes
CREATE TABLE `Pacientes` (
  `id_paciente` INT NOT NULL AUTO_INCREMENT,
  `dni` VARCHAR(255) NOT NULL UNIQUE, -- Debe ir cifrado a nivel de aplicación
  `nombre` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `telefono` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_paciente`)
) ENGINE=InnoDB;

-- 2. Cuadro Médico
CREATE TABLE `Medicos` (
  `id_medico` INT NOT NULL AUTO_INCREMENT,
  `numero_colegiado` VARCHAR(50) NOT NULL UNIQUE,
  `nombre` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `especialidad` VARCHAR(100) NOT NULL,
  `email_corporativo` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id_medico`)
) ENGINE=InnoDB;

-- 3. Catálogo de Tratamientos
CREATE TABLE `Tratamientos` (
  `id_tratamiento` INT NOT NULL AUTO_INCREMENT,
  `nombre_tratamiento` VARCHAR(150) NOT NULL,
  `descripcion` TEXT,
  `coste_base` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_tratamiento`)
) ENGINE=InnoDB;

-- 4. Gestión de Citas
CREATE TABLE `Citas` (
  `id_cita` INT NOT NULL AUTO_INCREMENT,
  `id_paciente` INT NOT NULL,
  `id_medico` INT NOT NULL,
  `id_tratamiento` INT,
  `fecha_hora` DATETIME NOT NULL,
  `estado` ENUM('Programada', 'Completada', 'Cancelada', 'No Asiste') DEFAULT 'Programada',
  `notas_medicas` TEXT, -- Cifrado en reposo obligatorio
  PRIMARY KEY (`id_cita`),
  FOREIGN KEY (`id_paciente`) REFERENCES `Pacientes`(`id_paciente`) ON DELETE RESTRICT,
  FOREIGN KEY (`id_medico`) REFERENCES `Medicos`(`id_medico`) ON DELETE RESTRICT,
  FOREIGN KEY (`id_tratamiento`) REFERENCES `Tratamientos`(`id_tratamiento`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 5. Consentimiento Informado
CREATE TABLE `Consentimientos` (
  `id_consentimiento` INT NOT NULL AUTO_INCREMENT,
  `id_paciente` INT NOT NULL,
  `id_tratamiento` INT NOT NULL,
  `fecha_firma` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `ruta_documento_pdf` VARCHAR(255) NOT NULL,
  `hash_documento` VARCHAR(64) NOT NULL, -- Para garantizar No Repudio e Integridad (SHA-256)
  `firmado_digitalmente` BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (`id_consentimiento`),
  FOREIGN KEY (`id_paciente`) REFERENCES `Pacientes`(`id_paciente`) ON DELETE CASCADE,
  FOREIGN KEY (`id_tratamiento`) REFERENCES `Tratamientos`(`id_tratamiento`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 6. Facturación
CREATE TABLE `Facturas` (
  `id_factura` INT NOT NULL AUTO_INCREMENT,
  `id_cita` INT NOT NULL,
  `fecha_emision` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `importe_total` DECIMAL(10,2) NOT NULL,
  `estado_pago` ENUM('Pendiente', 'Pagado', 'Reembolsado') DEFAULT 'Pendiente',
  `metodo_pago` VARCHAR(50),
  PRIMARY KEY (`id_factura`),
  FOREIGN KEY (`id_cita`) REFERENCES `Citas`(`id_cita`) ON DELETE RESTRICT
) ENGINE=InnoDB;