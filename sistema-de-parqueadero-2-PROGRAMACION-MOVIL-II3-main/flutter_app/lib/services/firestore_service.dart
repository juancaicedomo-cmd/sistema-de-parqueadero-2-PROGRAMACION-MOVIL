import 'package:cloud_firestore/cloud_firestore.dart';

class FirestoreService {
  final CollectionReference _vehiculosCollection =
      FirebaseFirestore.instance.collection('vehiculos');

  Future<void> registrarVehiculo(String placa) async {
    try {
      await _vehiculosCollection.add({
        'placa': placa,
        'fecha': FieldValue.serverTimestamp(),
      });
      print('Vehículo registrado en Firestore correctamente');
    } catch (e) {
      print('Error al registrar en Firestore: \$e');
    }
  }
}
