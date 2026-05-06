const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("Usuario conectado");
});

app.get("/vehiculo", (req, res) => {
    const placa = req.query.placa;

    io.emit("notificacion", "Vehículo registrado: " + placa);

    res.send("OK");
});

server.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});