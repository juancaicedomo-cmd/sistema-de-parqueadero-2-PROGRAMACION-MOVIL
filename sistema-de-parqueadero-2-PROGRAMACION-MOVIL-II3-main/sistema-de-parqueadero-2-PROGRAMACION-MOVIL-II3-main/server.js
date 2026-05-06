const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Agregado para CORS

const app = express();
app.use(cors()); // Para soportar REST desde local/flutter

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Usuario conectado: " + socket.id);
});

app.get("/vehiculo", (req, res) => {
    const placa = req.query.placa;
    console.log("Registrando vehículo: " + placa);
    io.emit("notificacion", "Vehículo registrado: " + placa);
    res.send("OK");
});

server.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});