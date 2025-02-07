const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    token: { type: String, required: true },
    tipoSuscripcion: { 
        type: [String], // ✅ Ahora es un array de strings
        enum: ['actividad_criminal', 'cierre_vehicular', 'cierre_peatonal', 'desastre_natural', 'incendio', 'sin_suscripcion'], 
        default: ['sin_suscripcion'] // ✅ Se inicia con "sin_suscripcion"
    },
    nombre: { type: String, default: "Usuario normal" },
    mail: { type: String, default: "Usuario normal" },
    contrasenia: { type: String, default: "Usuario normal" },
    fechaNacimiento: { type: String, default: "Usuario normal" }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
