# Sistema de Parqueadero - Sprint 4 MVP

Aplicación móvil desarrollada en Flutter para la gestión de un parqueadero. Este MVP (Mínimo Producto Viable) incluye registro de vehículos, notificaciones en tiempo real vía WebSockets, persistencia local con SQLite y persistencia en la nube con Firebase Firestore.

---

## 🛠️ Manual Técnico

### Arquitectura del Sistema
El sistema consta de dos partes principales:
1. **Frontend (App Móvil):** Desarrollada en Flutter. Maneja la UI, la base de datos local (SQLite) y la sincronización con la nube (Firebase Firestore).
2. **Backend (Servicio Web):** Desarrollado en Node.js con Express y Socket.io. Expone un API REST para recibir el registro y emite un evento WebSocket para notificar a todos los clientes conectados.

### Dependencias Principales (Flutter)
- `sqflite` & `path`: Para la base de datos local.
- `firebase_core` & `cloud_firestore`: Para la persistencia NoSQL en la nube.
- `socket_io_client`: Para escuchar notificaciones en tiempo real.
- `http`: Para consumir el API REST del servidor Node.js.
- `provider`: Para la gestión de estado de los sockets.

### Instalación y Configuración

**Paso 1: Levantar el Backend (Node.js)**
1. Abre una terminal en la raíz del proyecto.
2. Ejecuta `npm install` para instalar Express y Socket.io.
3. Ejecuta `node server.js` para iniciar el servidor (correrá en el puerto 3000).

**Paso 2: Configurar IP en Flutter**
1. Abre `lib/services/api_service.dart` y `lib/services/socket_service.dart`.
2. Cambia la IP por la IP local de tu computadora. (En Windows abre CMD y escribe `ipconfig` para ver tu dirección IPv4).

**Paso 3: Configurar Firebase**
1. Instala el CLI de Firebase y ejecuta `flutterfire configure` en la carpeta `flutter_app` para vincular tu proyecto a Firebase. Esto generará el archivo `google-services.json` automáticamente.

**Paso 4: Compilar y Ejecutar**
- Para ejecutar en emulador: `flutter run`
- Para generar el **APK Final**:
  ```bash
  flutter build apk --release
  ```
  El APK se generará en la ruta: `build/app/outputs/flutter-apk/app-release.apk`.

---

## 📱 Manual de Usuario

### 1. Conexión Inicial
Al abrir la aplicación, asegúrate de que el icono de Wi-Fi en la esquina superior derecha esté **Verde**. Esto indica que estás conectado correctamente al servidor de notificaciones. Si está rojo, revisa tu conexión a internet o la configuración del servidor.

### 2. Registrar un Vehículo
1. Ubica la tarjeta "Registro de Vehículos" en la pantalla principal.
2. Escribe el número de placa en el campo de texto (Ej. ABC-1234).
3. Presiona el botón azul "Registrar Entrada".
4. Verás un indicador de carga por un segundo mientras se guarda en SQLite (local) y Firebase (nube).

### 3. Visualizar Notificaciones
Justo debajo del botón de registro, encontrarás la sección "Notificaciones en Vivo". Cada vez que se registre un vehículo (desde tu celular o desde cualquier otro celular conectado), aparecerá aquí una nueva tarjeta amarilla informando del registro en tiempo real.

### 4. Consultar Historial Local
En la parte inferior de la pantalla, tienes el "Historial Local (SQLite)". Aquí puedes ver un registro histórico de todas las placas que has guardado desde tu dispositivo, incluyendo la fecha y hora exacta del registro. Esta lista funciona incluso si te quedas sin conexión a internet.
