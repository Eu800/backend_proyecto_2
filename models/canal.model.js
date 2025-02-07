const mongoose = require('mongoose');

const canalSchema = new mongoose.Schema({
    tipoSuscripcion: { type: String, enum: ['actividad_criminal', 'cierre_vehicular', 'cierre_peatonal','desastre_natural','incendio'], required: true },
    numeroSuscriptores: { type: Number, required: true }
});

module.exports = mongoose.model('Canal', canalSchema);