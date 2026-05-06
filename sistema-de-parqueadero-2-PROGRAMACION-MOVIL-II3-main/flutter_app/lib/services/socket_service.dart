import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService with ChangeNotifier {
  IO.Socket? _socket;

  // Lista de notificaciones recibidas
  final List<String> _notificaciones = [];
  List<String> get notificaciones => _notificaciones;

  // IMPORTANTE: Cambia '192.168.1.XX' por la IP local de tu computadora
  // o tu URL de NGROK, por ejemplo: 'https://xxxxx.ngrok.io'
  final String _serverUrl = 'http://10.0.2.2:3000'; // 10.0.2.2 es localhost en emulador Android

  SocketService() {
    _initConfig();
  }

  void _initConfig() {
    _socket = IO.io(_serverUrl, {
      'transports': ['websocket'],
      'autoConnect': true,
    });

    _socket?.onConnect((_) {
      print('✅ Conectado al servidor Socket.IO');
      notifyListeners();
    });

    _socket?.onDisconnect((_) {
      print('❌ Desconectado del servidor');
      notifyListeners();
    });

    // Escuchar el evento "notificacion" que emite tu server.js
    _socket?.on('notificacion', (data) {
      print('Notificación recibida: $data');
      _notificaciones.insert(0, data.toString()); // Añade al inicio de la lista
      notifyListeners(); // Avisamos a la UI para que se redibuje
    });
  }

  bool get isConnected => _socket?.connected ?? false;

  @override
  void dispose() {
    _socket?.disconnect();
    super.dispose();
  }
}
