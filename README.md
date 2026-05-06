Sistema de Parqueadero

Descripción del proyecto
Este proyecto consiste en el desarrollo de un sistema de parqueadero que permite gestionar el ingreso y salida de vehículos, así como el control de usuarios y cálculo de tarifas.

El objetivo es optimizar el manejo del parqueadero, reduciendo errores y mejorando la eficiencia del proceso.

 Avances Sprint 2
En este segundo sprint se desarrollaron funcionalidades principales del sistema de parqueadero como:

- Registro de ingreso de vehículos
- Registro de salida de vehículos
- Cálculo de tarifas
- Inicio de sesión de usuarios

Además, se mejoró la lógica del sistema y se realizaron pruebas para validar el correcto funcionamiento de cada módulo.

 Historias de Usuario

### HU1 – Registrar vehículo
Como usuario del sistema, quiero registrar el ingreso de un vehículo para llevar control del parqueadero.

### HU2 – Registrar salida
Como usuario, quiero registrar la salida de un vehículo para calcular el valor a pagar.

### HU3 – Login
Como usuario, quiero iniciar sesión para acceder al sistema.

---

Relación con Historias de Usuario

- HU1: Se implementó el registro de vehículos (placa, hora de entrada, tipo)
- HU2: Se desarrolló el cálculo del tiempo y valor a pagar al salir
- HU3: Se implementó el inicio de sesión de usuarios

 Pruebas realizadas

- Se probó el registro de vehículos y funciona correctamente ✔
- Se probó el cálculo de tarifa al salir y funciona correctamente ✔
- Se probó el inicio de sesión de usuarios ✔

Cada funcionalidad fue probada de manera individual para validar su correcto funcionamiento

 Funcionalidades del sistema

- Registrar ingreso de vehículos
- Registrar salida de vehículos
- Calcular tarifas automáticamente
- Gestión de usuarios (login)

Tecnologías utilizadas

- Lenguaje de programación: (agrega el tuyo, ejemplo: Java / Kotlin / Dart)
- Base de datos: (ejemplo: SQLite / MySQL)
- IDE: (ejemplo: Android Studio)

- ### HU4 – Notificaciones de vehículos
Como usuario, quiero recibir notificaciones cuando un vehículo ingrese o salga del parqueadero para estar informado en tiempo real.

Criterios de aceptación:
- El sistema debe enviar una notificación al registrar entrada
- El sistema debe enviar una notificación al registrar salida
- La notificación debe mostrarse en tiempo real

## HU4 – Notificaciones en tiempo real

En este sprint, se implementó la funcionalidad de notificaciones push para el registro de ingreso y salida de vehículos.

### Implementación técnica
- Se utilizó **WebSockets** con Socket.IO para enviar notificaciones en tiempo real.
- Para pruebas locales se configuró **NGROK** para exponer el servidor.
- Alternativa: **Firebase Cloud Messaging** (plan gratuito) para pruebas en dispositivos móviles.

### Cómo probar
1. Abrir la app en el dispositivo administrador.
2. Registrar un vehículo ingresando o saliendo.
3. Verificar que aparece la notificación instantáneamente en el dispositivo.
4. Consultar logs del servidor para confirmar envío correcto.

### Evidencias
- Captura 1: Notificación al ingresar vehículo
- Captura 2: Notificación al salir vehículo
Descripción

En este sprint se implementaron notificaciones en tiempo real, permitiendo informar al usuario sobre eventos importantes del parqueadero.

 Notificaciones

El sistema envía notificaciones cuando:

Se registra un vehículo
Hay cambios en los cupos del parqueadero

Esto permite al usuario estar informado sin actualizar la app.

🛠 Tecnologías
Java (Android)
Android Studio
Firebase / WebSockets
GitHub
Pruebas

Se verificó:

Registro de vehículos
Envío de notificaciones
Funcionamiento en tiempo real
