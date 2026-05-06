const { calcularCosto } = require('../src/utils/costCalculator');

describe('Calculadora de Costos de Parqueadero', () => {

    test('Debería calcular el costo correctamente para un Auto (10 minutos)', () => {
        const horaIngreso = new Date('2024-01-01T10:00:00Z');
        const horaSalida = new Date('2024-01-01T10:10:00Z'); // 10 minutos
        const tipoVehiculo = 'Auto'; // Rate: 100

        const resultado = calcularCosto(horaIngreso, horaSalida, tipoVehiculo);

        expect(resultado.duracionMinutos).toBe(10);
        expect(resultado.valorPagado).toBe(1000); // 10 * 100
    });

    test('Debería calcular el costo correctamente para una Moto (15 minutos)', () => {
        const horaIngreso = new Date('2024-01-01T10:00:00Z');
        const horaSalida = new Date('2024-01-01T10:15:00Z'); // 15 minutos
        const tipoVehiculo = 'Moto'; // Rate: 50

        const resultado = calcularCosto(horaIngreso, horaSalida, tipoVehiculo);

        expect(resultado.duracionMinutos).toBe(15);
        expect(resultado.valorPagado).toBe(750); // 15 * 50
    });

    test('Debería redondear los minutos hacia arriba (1.5 minutos = 2 minutos)', () => {
        const horaIngreso = new Date('2024-01-01T10:00:00Z');
        const horaSalida = new Date('2024-01-01T10:01:30Z'); // 1 minuto 30 segundos
        const tipoVehiculo = 'Auto'; // Rate: 100

        const resultado = calcularCosto(horaIngreso, horaSalida, tipoVehiculo);

        expect(resultado.duracionMinutos).toBe(2);
        expect(resultado.valorPagado).toBe(200); // 2 * 100
    });

    test('Debería lanzar error si la hora de salida es menor a la de ingreso', () => {
        const horaIngreso = new Date('2024-01-01T10:10:00Z');
        const horaSalida = new Date('2024-01-01T10:00:00Z'); // 10 minutos ANTES
        const tipoVehiculo = 'Auto';

        expect(() => {
            calcularCosto(horaIngreso, horaSalida, tipoVehiculo);
        }).toThrow('La hora de salida no puede ser anterior a la de ingreso');
    });
});
