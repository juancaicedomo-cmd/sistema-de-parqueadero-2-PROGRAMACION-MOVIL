const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        const externalMongoUri = process.env.MONGO_URI;

        if (externalMongoUri) {
            try {
                await mongoose.connect(externalMongoUri);
                console.log('✅ MongoDB Conectado (MONGO_URI)');
                return;
            } catch (externalError) {
                console.warn(
                    `⚠️ No se pudo conectar con MONGO_URI (${externalError.message}). Usando MongoDB en memoria.`
                );
            }
        }

        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB Conectado (Memoria Local - Listo para usar)');
    } catch (error) {
        console.error('❌ Error de conexión a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
