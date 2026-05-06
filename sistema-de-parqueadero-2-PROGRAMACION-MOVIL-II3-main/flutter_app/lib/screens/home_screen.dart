import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/socket_service.dart';
import '../services/api_service.dart';
import '../services/db_helper.dart';
import '../services/firestore_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _placaController = TextEditingController();
  bool _isLoading = false;
  List<Map<String, dynamic>> _historialLocal = [];
  final FirestoreService _firestoreService = FirestoreService();

  @override
  void initState() {
    super.initState();
    _cargarHistorial();
  }

  Future<void> _cargarHistorial() async {
    final data = await DBHelper().getVehiculos();
    setState(() {
      _historialLocal = data;
    });
  }

  void _registrar() async {
    final placa = _placaController.text.trim().toUpperCase();
    if (placa.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, ingresa una placa válida')),
      );
      return;
    }

    setState(() => _isLoading = true);
    
    // Llamada al endpoint REST de nuestro Node.js
    bool exitoso = await ApiService.registrarVehiculo(placa);
    
    setState(() => _isLoading = false);

    if (exitoso) {
      // Guardar en SQLite
      await DBHelper().insertVehiculo(placa);
      // Guardar en Firebase Firestore
      await _firestoreService.registrarVehiculo(placa);
      // Recargar historial local
      await _cargarHistorial();
      
      _placaController.clear();
      // El servidor enviará ahora el evento por socket.io
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error al registrar vehículo')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final socketService = Provider.of<SocketService>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Parqueadero S3'),
        actions: [
          Icon(
            socketService.isConnected ? Icons.wifi : Icons.wifi_off,
            color: socketService.isConnected ? Colors.green : Colors.red,
          ),
          const SizedBox(width: 20),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            // Tarjeta de Registro
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text(
                      'Registro de Vehículos',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),
                    TextField(
                      controller: _placaController,
                      decoration: InputDecoration(
                        labelText: 'Número de Placa',
                        hintText: 'Ej. ABC-1234',
                        prefixIcon: const Icon(Icons.directions_car),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      textCapitalization: TextCapitalization.characters,
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: _isLoading ? null : _registrar,
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 15),
                        backgroundColor: Theme.of(context).colorScheme.primaryContainer,
                      ),
                      child: _isLoading
                          ? const CircularProgressIndicator()
                          : const Text('Registrar Entrada', style: TextStyle(fontSize: 16)),
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 30),
            
            // Sección de Notificaciones en Tiempo Real
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Notificaciones en Vivo',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 10),
            
            Expanded(
              child: socketService.notificaciones.isEmpty
                  ? const Center(child: Text('No hay notificaciones recientes.'))
                  : ListView.builder(
                      itemCount: socketService.notificaciones.length,
                      itemBuilder: (context, index) {
                        return Card(
                          color: Theme.of(context).colorScheme.surfaceVariant,
                          margin: const EdgeInsets.only(bottom: 10),
                          child: ListTile(
                            leading: const Icon(Icons.notifications_active, color: Colors.amber),
                            title: Text(socketService.notificaciones[index]),
                            subtitle: const Text('Recibido vía WebSocket'),
                          ),
                        );
                      },
                    ),
            ),
            
            const SizedBox(height: 20),
            
            // Sección de Historial Local SQLite
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Historial Local (SQLite)',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 10),
            
            Expanded(
              child: _historialLocal.isEmpty
                  ? const Center(child: Text('No hay vehículos guardados localmente.'))
                  : ListView.builder(
                      itemCount: _historialLocal.length,
                      itemBuilder: (context, index) {
                        final vehiculo = _historialLocal[index];
                        return Card(
                          margin: const EdgeInsets.only(bottom: 10),
                          child: ListTile(
                            leading: const Icon(Icons.save, color: Colors.blue),
                            title: Text('Placa: \${vehiculo['placa']}'),
                            subtitle: Text('Fecha: \${vehiculo['fecha']}'),
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
