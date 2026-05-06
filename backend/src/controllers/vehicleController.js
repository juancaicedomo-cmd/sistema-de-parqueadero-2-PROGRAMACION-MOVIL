const Vehicle = require('../models/Vehicle');

// @desc    Registrar un vehículo
// @route   POST /api/vehiculos
exports.registerVehicle = async (req, res) => {
    try {
        const { placa, tipo, marca, modelo, propietario, telefono } = req.body;

        const vehicleExists = await Vehicle.findOne({ placa });
        if (vehicleExists) {
            return res.status(400).json({ message: 'El vehículo con esta placa ya está registrado' });
        }

        const vehicle = await Vehicle.create({
            placa,
            tipo,
            marca,
            modelo,
            propietario,
            telefono,
            usuarioRegistro: req.user._id
        });

        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtener todos los vehículos
// @route   GET /api/vehiculos
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ fechaRegistro: -1 });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Buscar vehículo por placa
// @route   GET /api/vehiculos/:placa
exports.getVehicleByPlate = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ placa: req.params.placa.toUpperCase() });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
