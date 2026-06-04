#  DOCUMENTACIÓN TÉCNICA DE CIBERSEGURIDAD, ANÁLISIS DE RIESGOS Y CUMPLIMIENTO NORMATIVO

**Proyecto:** Plataforma Web Integral para Consultorio Médico  
**Metodología de Desarrollo:** DevSecOps / S-SDLC (Secure Software Development Life Cycle)

---

## 1. INTRODUCCIÓN Y METODOLOGÍA DE DESARROLLO

El desarrollo de soluciones de software en el ámbito sanitario exige la adopción de un enfoque proactivo y riguroso respecto a la seguridad de la información. Debido a la sofisticación, persistencia y naturaleza dirigida de las amenazas cibernéticas modernas, esta plataforma web se ha diseñado bajo el paradigma de **Seguridad por Diseño (Security by Design)** y **Seguridad por Defecto (Security by Default)**, integrando controles de protección desde las fases iniciales del ciclo de vida del software.

La metodología implementada es **DevSecOps**, la cual extiende las prácticas ágiles tradicionales al unificar el desarrollo, las operaciones y la seguridad como un proceso continuo automatizado. Esto garantiza que cada entrega de código asociada a los módulos del sistema (registro, cuadro médico, tratamientos, citas, consentimiento y facturación) sea sometida a:
*   Análisis estáticos de seguridad de código (SAST).
*   Análisis dinámicos de aplicaciones (DAST).
*   Verificaciones de cumplimiento antes de su despliegue en producción.

---

## 2. ANÁLISIS DE REQUISITOS DE CUMPLIMIENTO REGULATORIO (COMPLIANCE)

El tratamiento de datos de salud está sometido a marcos normativos estrictos debido a su catalogación como "datos de categorías especiales". El incumplimiento puede acarrear sanciones económicas severas y la pérdida de la licencia operativa.

### 2.1. RGPD (UE 2016/679) y LOPDGDD 3/2018
*   **Licitud del Tratamiento (Art. 6 y 9):** Los datos médicos se procesan bajo el amparo del Art. 9.2.h (asistencia sanitaria). Para módulos específicos (recordatorios externos o tratamientos estéticos opcionales), se recaba el consentimiento explícito del usuario (Art. 7).
*   **Minimización de Datos (Art. 5.1.c):** El formulario de registro recopila únicamente los campos estrictamente necesarios para la prestación del servicio clínico y la facturación.
*   **Seguridad del Tratamiento (Art. 32):** Implementación de medidas técnicas y organizativas adecuadas al riesgo, incluyendo seudonimización, cifrado de datos, garantía de resiliencia y planes de recuperación ante desastres (DRP).
*   **Delegado de Protección de Datos (DPO):** Al procesar datos de salud a gran escala, se designa obligatoriamente un DPO (Art. 37.1.c RGPD / Art. 34 LOPDGDD).
*   **Evaluación de Impacto (EIPD/DPIA):** Realización sistemática de evaluaciones de impacto antes de nuevos despliegues que afecten el tratamiento automatizado de datos.

### 2.2. Ejercicio de Derechos del Interesado (ARCO-POL)
La arquitectura provee endpoints específicos para la gestión automatizada de derechos:
*   **Acceso y Portabilidad:** Exportación de expediente clínico y facturas en formatos estructurados y legibles (JSON/PDF cifrado).
*   **Rectificación y Supresión:** Modificación de datos de contacto. *(Nota: Los datos clínicos históricos no se borran deliberadamente si existe obligación legal de conservación, habitualmente 5 años).*
*   **Limitación y Oposición:** Mecanismos para revocar autorizaciones de comunicaciones comerciales o analíticas.

---

## 3. GARANTÍA DE LA INFORMACIÓN (ISO/IEC 27001:2022)

Para salvaguardar los activos digitales, se aplican los pilares de la ciberseguridad en cada componente del software:

### 3.1. Confidencialidad
Asegura que los datos sensibles solo sean legibles por usuarios autorizados.
*   **Aplicación:** Un paciente no debe acceder a datos de otros; un médico solo accede a los de su competencia.
*   **Control Técnico:** Cifrado estricto en reposo (AES-256) para diagnósticos y facturación. Cifrado en tránsito forzado mediante **TLS 1.3**.

### 3.2. Integridad
Garantiza que la información permanezca exacta y libre de modificaciones maliciosas.
*   **Aplicación:** Evitar alteraciones en el catálogo de tratamientos, historial médico y facturación.
*   **Control Técnico:** Validaciones rigurosas en el servidor (Server-Side Validation). Uso de funciones hash (SHA-256) con sales criptográficas para verificar la inmutabilidad de los registros.

### 3.3. Disponibilidad
Garantiza acceso ininterrumpido a los servicios y datos (24/7).
*   **Aplicación:** Gestión de citas y consulta del cuadro médico en tiempo real.
*   **Control Técnico:** Despliegue en la nube con balanceadores de carga en alta disponibilidad (Multi-AZ). Políticas de copias de seguridad inmutables, automatizadas y con replicación geográfica.

### 3.4. Autenticidad
Valida de forma inequívoca la identidad de la entidad que accede a la plataforma.
*   **Aplicación:** Acceso seguro al portal del cuadro médico y panel de administración.
*   **Control Técnico:** Autenticación de Múltiples Factores (MFA) obligatoria con contraseñas robustas y tokens TOTP o llaves FIDO2. Uso de **JWT (RS256)** para el control de sesiones.

### 3.5. No Repudio
Evita que una parte niegue la autoría de una transacción.
*   **Aplicación:** Módulo de consentimiento informado.
*   **Control Técnico:** Firma electrónica avanzada. Captura automatizada del hash del documento, IP, metadatos, *timestamping* de una CA de confianza y clave pública del usuario.

### 3.6. Responsabilidad (Accountability)
Rastreo unívoco de cada acción realizada en la plataforma.
*   **Aplicación:** Monitorización de accesos y modificaciones en historiales y facturación.
*   **Control Técnico:** Framework centralizado de Pistas de Auditoría (*Audit Trails*). Los logs (ID_Usuario, Acción, Timestamp, IP) se transmiten en tiempo real a un SIEM (OpenSearch/Splunk) protegido contra escritura.

---

## 4. MODELADO DE CIBERAMENAZAS (ENFOQUE STRIDE)

Se ha seleccionado el modelo STRIDE (Microsoft) para evaluar el sistema desde la perspectiva del atacante.

| Letra | Amenaza (Inglés) | Amenaza (Español) |
| :---: | :--- | :--- |
| **S** | Spoofing | Suplantación de identidad |
| **T** | Tampering | Alteración de datos |
| **R** | Repudiation | Repudio de acciones |
| **I** | Information Disclosure | Filtración de información |
| **D** | Denial of Service | Denegación de servicio (DoS) |
| **E** | Elevation of Privilege | Elevación de privilegios |

### 4.1. Análisis Detallado por Componente

> **S - Suplantación de Identidad**
> *   **Escenario:** Intercepción de credenciales de un facultativo clínico.
> *   **Componente Crítico:** Panel Médico / Gestión de Citas.
> *   **Consecuencia:** Acceso ilícito a agendas y expedientes, violando la confidencialidad.

> **T - Alteración de Datos**
> *   **Escenario:** Manipulación de parámetros HTTP para modificar precios de tratamientos.
> *   **Componente Crítico:** Módulo de Facturación / Base de datos SQL.
> *   **Consecuencia:** Ruptura de la integridad financiera, cobros erróneos o fraude.

> **R - Repudio**
> *   **Escenario:** Un administrador altera una agenda maliciosamente y alega un fallo del software.
> *   **Componente Crítico:** Gestión de Citas / Configuración Global.
> *   **Consecuencia:** Imposibilidad de imputar responsabilidades legales por ausencia de logs inmutables.

> **I - Filtración de Información**
> *   **Escenario:** Explotación de Inyección SQL (SQLi) en el formulario de registro.
> *   **Componente Crítico:** Base de Datos / Módulo de Registro.
> *   **Consecuencia:** Filtración masiva de datos sensibles, multas (AEPD) y daño reputacional.

> **D - Denegación de Servicio**
> *   **Escenario:** Ataques DDoS o *HTTP Flood* que saturan los endpoints de la API.
> *   **Componente Crítico:** Servidor de Producción / Pasarela de Citas.
> *   **Consecuencia:** Interrupción total del servicio; pacientes y médicos no pueden acceder.

> **E - Elevación de Privilegios**
> *   **Escenario:** Alteración del rol en la cookie o JWT (de "paciente" a "admin") explotando IDOR/BFLA.
> *   **Componente Crítico:** Control de Accesos / Rutas del Backend.
> *   **Consecuencia:** Control administrativo total por parte del atacante.

---

## 5. RECOMENDACIONES DE INFRAESTRUCTURA Y HARDENING

Para mitigar los riesgos del modelo STRIDE, se definen las siguientes directrices esenciales:

### 5.1. Seguridad en la Capa de Red y Perímetro
*   **WAF (Web Application Firewall):** Posicionamiento de un WAF (ej. Cloudflare, AWS WAF) con reglas estrictas (OWASP Top 10) para bloquear ataques automatizados y DDoS perimetral.
*   **Aislamiento (VPC y DMZ):** Alojamiento de la base de datos y *backend* en subredes privadas aisladas. El *frontend* operará en una DMZ, comunicándose con el backend solo por puertos securizados.

### 5.2. Bastionado de Servidores (Hardening)
*   **Principio de Mínimo Privilegio:** Procesos del servidor (Nginx, Node.js, etc.) ejecutados con usuarios dedicados, nunca bajo privilegios `root`.
*   **Gestión Automatizada de Parches:** Canalización sistematizada para aplicar actualizaciones críticas (SO y dependencias) mitigando vulnerabilidades conocidas (CVEs).

### 5.3. Criptografía y Protección del Dato
*   **Configuración TLS Estricta:** Desactivación de TLS 1.0/1.1. Soporte exclusivo de **TLS 1.2/1.3** con *Perfect Forward Secrecy*. Implementación de cabeceras **HSTS**.
*   **Gestión Segura de Secretos:** Prohibición absoluta de credenciales o claves API hardcodeadas en el código (Git). Uso obligatorio de bóvedas de secretos en tiempo de ejecución (ej. HashiCorp Vault, AWS Secrets Manager).

---

## 6. REFERENCIAS BIBLIOGRÁFICAS

*   Agencia Española de Protección de Datos (AEPD). (2021). *Guía para el cumplimiento del deber de informar y el tratamiento de datos de salud*. AEPD. https://www.aepd.es
*   ISO/IEC. (2022). *Information security, cybersecurity and privacy protection — Information security management systems — Requirements* (ISO/IEC Standard No. 27001:2022). International Organization for Standardization.
*   Microsoft. (2022, 14 de noviembre). *The STRIDE Threat Modeling Framework*. Microsoft Security Best Practices. https://learn.microsoft.com/en-us/security/engineering/stride
*   OWASP Top 10. (2021). *The Ten Most Critical Web Application Security Risks*. Open Web Application Security Project. https://owasp.org/www-project-top-ten/
*   Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (*Reglamento General de Protección de Datos*). Diario Oficial de la Unión Europea, L 119, 4 de mayo de 2016.
