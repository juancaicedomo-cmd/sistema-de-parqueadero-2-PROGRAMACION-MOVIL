const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Conectar a DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Socket.io connection logic
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Hacer io accesible en los controladores
app.set('socketio', io);

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/vehiculos', require('./routes/vehicleRoutes'));
app.use('/api/parqueadero', require('./routes/parkingRoutes'));

// Ruta base
app.get('/', (req, res) => {
    res.send('API de Parqueadero en ejecución...');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
