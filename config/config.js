const mongoose = require('mongoose');

const conectarBaseDatos = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/geoAlerta');
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = conectarBaseDatos;
