// utils/costCalculator.js

const RATES = {
    'Auto': 100,
    'Moto': 50,
    'Camioneta': 150
};

/**
 * Calcula el costo de parqueo basado en el tiempo y tipo de vehículo.
 * @param {Date} horaIngreso 
 * @param {Date} horaSalida 
 * @param {String} tipoVehiculo 
 * @returns {Object} { duracionMinutos, valorPagado }
 */
const calcularCosto = (horaIngreso, horaSalida, tipoVehiculo) => {
    const diffMs = horaSalida - horaIngreso;
    const diffMin = Math.ceil(diffMs / (1000 * 60)); // Redondear hacia arriba
    
    // Validar tiempo negativo
    if (diffMin < 0) {
        throw new Error('La hora de salida no puede ser anterior a la de ingreso');
    }

    const rate = RATES[tipoVehiculo] || 100; // Auto por defecto
    const valorPagado = diffMin * rate;

    return {
        duracionMinutos: diffMin,
        valorPagado
    };
};

module.exports = { calcularCosto, RATES };
