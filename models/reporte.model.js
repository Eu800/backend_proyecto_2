const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
    tipo: { type: String, enum: ['actividad_criminal', 'trafico_vehicular', 'cierre_peatonal','desastre_natural','incendio'], required: true },
    quePasa: { type: String, required: true },
    direccion: { type: String, required: true },
    informacionExtra: { type: String, default: "Nada extra" },
    duracion: { type: Number, required: true },
    latLng: {
        lat: { type: String, required: true },
        lng: { type: String, required: true }
    },
    iconoRes: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reporte', reporteSchema);
