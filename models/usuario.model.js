const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    token: { type: String, required: true },
    tipoSuscripcion: { type: String, enum: ['actividad_criminal', 'trafico_vehicular', 'cierre_peatonal','desastre_natural','incendio'], required: true },
    nombre: { type: String, default: "Usuario normal" },
    mail: { type: String, default: "Usuario normal" },
    contraseña: { type: String, default: "Usuario normal" },
    fecha_nacimiento: { type: String, default: "Usuario normal" }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
