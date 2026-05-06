const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    placa: {
        type: String,
        required: true
    },
    horaIngreso: {
        type: Date,
        default: Date.now
    },
    horaSalida: {
        type: Date
    },
    duracionMinutos: {
        type: Number
    },
    valorPagado: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        enum: ['En Parqueadero', 'Completado'],
        default: 'En Parqueadero'
    },
    usuarioIngreso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    usuarioSalida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
