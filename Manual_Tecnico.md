# Manual Técnico - ParkMaster

## 1. Arquitectura del Sistema
El proyecto sigue una arquitectura **Cliente-Servidor**.
- **Backend (Servidor):** Desarrollado en Node.js con el framework Express. Expone una API RESTful y maneja conexiones WebSockets para tiempo real.
- **Frontend (Cliente):** Desarrollado con React Native y el framework Expo. Consume la API REST y se conecta vía sockets para actualizaciones reactivas.
- **Base de Datos:** Utiliza MongoDB (Cloud via Atlas) como base de datos NoSQL para persistir usuarios, vehículos y transacciones. Se usa Mongoose como ODM.

## 2. Tecnologías y Librerías Principales
### Backend
- `express`: Framework web.
- `mongoose`: Modelado de objetos de MongoDB.
- `jsonwebtoken` & `bcryptjs`: Autenticación y seguridad de contraseñas.
- `socket.io`: Comunicación bidireccional en tiempo real.
- `jest` & `supertest`: Entorno para pruebas unitarias e integración.

### Frontend
- `expo`: Herramientas de desarrollo de React Native.
- `@react-navigation`: Enrutamiento y navegación por Stack.
- `axios`: Cliente HTTP para peticiones a la API.
- `socket.io-client`: Cliente para conexión con el servidor de WebSockets.

## 3. Instrucciones de Ejecución

### Prerrequisitos
- Node.js instalado (v16+).
- Cuenta en MongoDB Atlas (o instancia local de MongoDB).
- App **Expo Go** instalada en tu dispositivo físico (iOS/Android) o un emulador configurado.

### Configuración del Backend
1. Navega a la carpeta `backend`: `cd backend`
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno en el archivo `.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/parqueadero?retryWrites=true&w=majority
   JWT_SECRET=tu_secreto_super_seguro
   ```
4. Inicia el servidor de desarrollo: `npm run dev` (o `npx nodemon src/server.js`)

### Configuración del Frontend
1. Obtén tu **Dirección IP Local** (ej. `192.168.1.x`).
2. Abre el archivo `frontend/src/services/api.js` y actualiza `BASE_URL`:
   `const BASE_URL = 'http://192.168.1.x:5000/api';`
3. Abre el archivo `frontend/src/services/socket.js` y actualiza `SOCKET_URL`:
   `const SOCKET_URL = 'http://192.168.1.x:5000';`
4. Navega a la carpeta `frontend`: `cd frontend`
5. Instala las dependencias: `npm install`
6. Inicia Expo: `npx expo start`
7. Escanea el código QR con la app **Expo Go** en tu celular.

## 4. Generación de APK (Android)
Para generar el archivo instalable (.apk) para producción utilizando **EAS Build**:
1. Instala el CLI de EAS globalmente: `npm install -g eas-cli`
2. Inicia sesión en tu cuenta de Expo: `eas login`
3. Dentro de la carpeta `frontend`, inicializa EAS: `eas build:configure`
4. Ejecuta el comando de construcción para Android y especifica perfil local/apk si has configurado `eas.json` (ej: `eas build -p android --profile preview`).

## 5. Lógica de Negocio Central (Cálculo de Costo)
El controlador `parkingController.js` maneja la lógica de salida. Cuando un vehículo sale, se calcula la diferencia en milisegundos entre `horaIngreso` y la fecha actual, se convierte a minutos usando `Math.ceil`, y se multiplica por la tarifa estática definida en el diccionario `RATES` según el tipo de vehículo.
