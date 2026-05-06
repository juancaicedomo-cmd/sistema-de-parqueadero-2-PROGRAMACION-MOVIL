const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: [true, 'La placa es obligatoria'],
        unique: true,
        uppercase: true,
        trim: true
    },
    tipo: {
        type: String,
        enum: ['Auto', 'Moto', 'Camioneta'],
        required: [true, 'El tipo de vehículo es obligatorio']
    },
    marca: String,
    modelo: String,
    propietario: {
        type: String,
        required: [true, 'El nombre del propietario es obligatorio']
    },
    telefono: String,
    usuarioRegistro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
