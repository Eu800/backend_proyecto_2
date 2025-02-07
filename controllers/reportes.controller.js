const Reporte = require('../models/reporte.model');
const Usuario = require('../models/usuario.model');
const admin = require('firebase-admin');
const { notificarClientes } = require('./websocket.controller');

exports.crearReporte = async (req, res) => {
    const { tipo, quePasa, direccion, informacionExtra, duracion, lat, lng, iconoRes } = req.body;

    if (!['actividad_criminal', 'cierre_vehicular', 'cierre_peatonal', 'desastre_natural', 'incendio'].includes(tipo)) {
        return res.status(400).send({ error: 'Tipo de reporte no válido.' });
    }

    const nuevoReporte = new Reporte({
        tipo,
        quePasa,
        direccion,
        informacionExtra,
        duracion,
        lat,
        lng,
        iconoRes
    });
    await nuevoReporte.save();
    console.log(nuevoReporte._id.toString)

    const usuarios = await Usuario.find({ tipoSuscripcion: tipo });
    usuarios.forEach(async (usuario) => {
    try {
        const response = await admin.messaging().send({
            token: usuario.token,
            notification: {
                title: `Nuevo reporte ${tipo}!`,
                body: `${quePasa} - ${direccion}`,
            },
            data: { 
                quePasa, direccion, informacionExtra, tipo, 
                fecha: String(nuevoReporte.fecha),
                ReporteId: nuevoReporte._id.toString()
            }
        });
        console.log(`Notificación enviada correctamente: ${response}`);
    } catch (error) {
        console.error(`Error al enviar la notificación a ${usuario.token}:`, error);
    }
});

    res.status(201).json(nuevoReporte);
};

exports.obtenerReportes = async (req, res) => {
    try {
        const reportes = await Reporte.find();
        res.status(200).json(reportes);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
