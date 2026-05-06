import 'package:flutter_test/flutter_test.dart';

// Función de validación extraída para probarla unitariamente
bool esPlacaValida(String placa) {
  final placaTrimmed = placa.trim().toUpperCase();
  // Validar que no esté vacía y tenga un formato mínimo (ej. 3 letras, un guion, 3 o 4 números)
  // Para el MVP, simplemente validamos longitud mínima
  return placaTrimmed.isNotEmpty && placaTrimmed.length >= 6;
}

void main() {
  group('Pruebas Unitarias de Lógica de Negocio', () {
    test('esPlacaValida debe retornar true para una placa correcta', () {
      expect(esPlacaValida('ABC-1234'), true);
      expect(esPlacaValida('XYZ-987'), true);
    });

    test('esPlacaValida debe retornar false para una placa vacía', () {
      expect(esPlacaValida('   '), false);
      expect(esPlacaValida(''), false);
    });

    test('esPlacaValida debe retornar false para una placa muy corta', () {
      expect(esPlacaValida('AB-12'), false);
    });
  });
}
