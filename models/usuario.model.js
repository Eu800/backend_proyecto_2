const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    token: { type: String, required: true },
    tipoSuscripcion: { type: String, enum: ['actividad_criminal', 'trafico_vehicular', 'cierre_peatonal','desastre_natural','incendio'], required: true },
    nombre: { type: String, default: "Usuario normal" },
    mail: { type: String, default: "Usuario normal" },
    contrasenia: { type: String, default: "Usuario normal" },
    fechaNacimiento: { type: String, default: "Usuario normal" }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
