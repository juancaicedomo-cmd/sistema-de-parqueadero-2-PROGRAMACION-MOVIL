import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DBHelper {
  static final DBHelper _instance = DBHelper._internal();
  factory DBHelper() => _instance;
  DBHelper._internal();

  static Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'parqueadero.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  Future _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE vehiculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        placa TEXT NOT NULL,
        fecha TEXT NOT NULL
      )
    ''');
  }

  Future<int> insertVehiculo(String placa) async {
    Database db = await database;
    Map<String, dynamic> row = {
      'placa': placa,
      'fecha': DateTime.now().toIso8601String(),
    };
    return await db.insert('vehiculos', row);
  }

  Future<List<Map<String, dynamic>>> getVehiculos() async {
    Database db = await database;
    return await db.query('vehiculos', orderBy: 'id DESC');
  }
}
