import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

// Ojo: tienes que poner el mismo nombre que el de tu main.dart si cambias algo
import 'package:sistema_parqueadero_sprint3/main.dart'; 
import 'package:sistema_parqueadero_sprint3/services/socket_service.dart';

void main() {
  testWidgets('Test: Verificar título y TextField de la pantalla principal', (WidgetTester tester) async {
    // 1. Construir nuestra app y disparar el frame.
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => SocketService()),
        ],
        child: const ParqueaderoApp(),
      ),
    );

    // 2. Verificar que nuestra App carga el AppBar correctamente.
    expect(find.text('Parqueadero S3'), findsOneWidget);

    // 3. Verificar que existe el campo para escribir la placa.
    expect(find.byType(TextField), findsOneWidget);
    
    // 4. Verificar que exista el botón de registrar.
    expect(find.text('Registrar Entrada'), findsOneWidget);
  });
}
