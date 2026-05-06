const Transaction = require('../models/Transaction');
const Vehicle = require('../models/Vehicle');

// Tasas por minuto (ejemplo)
const RATES = {
    'Auto': 100,
    'Moto': 50,
    'Camioneta': 150
};

// @desc    Registrar ingreso de vehículo
// @route   POST /api/parqueadero/ingreso
exports.registrarIngreso = async (req, res) => {
    try {
        const { placa } = req.body;

        // Verificar si el vehículo existe
        const vehicle = await Vehicle.findOne({ placa: placa.toUpperCase() });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehículo no registrado. Regístrelo primero.' });
        }

        // Verificar si ya está en el parqueadero
        const activeSession = await Transaction.findOne({ placa: placa.toUpperCase(), estado: 'En Parqueadero' });
        if (activeSession) {
            return res.status(400).json({ message: 'El vehículo ya se encuentra en el parqueadero' });
        }

        const transaction = await Transaction.create({
            vehiculo: vehicle._id,
            placa: vehicle.placa,
            usuarioIngreso: req.user._id,
            estado: 'En Parqueadero'
        });

        // Notificar via Socket (se hará en Sprint 3)
        const io = req.app.get('socketio');
        if (io) io.emit('vehiculoIngreso', { placa: vehicle.placa, hora: transaction.horaIngreso });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Registrar salida de vehículo y calcular costo
// @route   POST /api/parqueadero/salida
exports.registrarSalida = async (req, res) => {
    try {
        const { placa } = req.body;

        const transaction = await Transaction.findOne({ placa: placa.toUpperCase(), estado: 'En Parqueadero' }).populate('vehiculo');
        if (!transaction) {
            return res.status(404).json({ message: 'No se encontró un ingreso activo para este vehículo' });
        }

        const { calcularCosto } = require('../utils/costCalculator');
        const horaSalida = new Date();
        const tipoVehiculo = transaction.vehiculo.tipo;
        
        const { duracionMinutos, valorPagado } = calcularCosto(transaction.horaIngreso, horaSalida, tipoVehiculo);

        transaction.horaSalida = horaSalida;
        transaction.duracionMinutos = duracionMinutos;
        transaction.valorPagado = valorPagado;
        transaction.estado = 'Completado';
        transaction.usuarioSalida = req.user._id;

        await transaction.save();

        // Notificar via Socket (se hará en Sprint 3)
        const io = req.app.get('socketio');
        if (io) io.emit('vehiculoSalida', { placa: transaction.placa, valor: valorPagado });

        res.json({
            message: 'Salida registrada correctamente',
            transaction
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Listar historial de transacciones
// @route   GET /api/parqueadero/historial
exports.getHistorial = async (req, res) => {
    try {
        const history = await Transaction.find().sort({ horaIngreso: -1 }).limit(50);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Listar vehículos actualmente en parqueadero
// @route   GET /api/parqueadero/activos
exports.getActivos = async (req, res) => {
    try {
        const activos = await Transaction.find({ estado: 'En Parqueadero' }).populate('vehiculo');
        res.json(activos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
