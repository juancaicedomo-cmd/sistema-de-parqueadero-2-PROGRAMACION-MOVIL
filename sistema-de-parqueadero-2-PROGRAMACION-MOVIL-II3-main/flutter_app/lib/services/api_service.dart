import 'package:http/http.dart' as http;

class ApiService {
  // Ajusta la IP dependiendo de si pruebas en emulador (10.0.2.2) o en dispositivo físico (tu IP local)
  static const String baseUrl = 'http://10.0.2.2:3000';

  static Future<bool> registrarVehiculo(String placa) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/vehiculo?placa=$placa'));
      
      if (response.statusCode == 200) {
        return true;
      }
      return false;
    } catch (e) {
      print('Error en API: $e');
      return false;
    }
  }
}
