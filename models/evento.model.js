const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    tipo: { type: String, enum: ['actividad_criminal', 'trafico_vehicular', 'cierre_peatonal','desastre_natural','incendio'], required: true },
    descripcion: { type: String, required: true },
    fecha: { type: String, required: true },
    latitud: { type: String, required: true },
    longitud: { type: String, required: true },
    informacionExtra: { type: String, default: "Nada extra" },
    duracion: { type: Number, required: true },
    duracionTipo: { type: String, enum: ['minutos', 'horas', 'dias'], required: true  }
});

module.exports = mongoose.model('Evento', eventoSchema);
