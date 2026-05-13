const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const server = http.createServer(app);
const allowedOrigins = (process.env.CORS_ORIGIN || '*')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const isWildcardCors = allowedOrigins.includes('*');
const corsOptions = {
    origin: isWildcardCors ? '*' : allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
const io = socketIo(server, {
    cors: corsOptions
});

// Conectar a DB
connectDB();

// Middlewares
app.use(cors(corsOptions));
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

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor corriendo en ${HOST}:${PORT}`);
});
