const Reporte = require('../models/reporte.model');
const Usuario = require('../models/usuario.model');
const admin = require('firebase-admin');
// const { notificarClientes } = require('./websocket.controller');

exports.crearReporte = async (req, res) => {
    const { tipo, quePasa, direccion, informacionExtra, duracion, latLng, iconoRes } = req.body;

    if (!['actividad_criminal', 'trafico_vehicular', 'cierre_peatonal', 'desastre_natural', 'incendio'].includes(tipo)) {
        return res.status(400).send({ error: 'Tipo de reporte no válido.' });
    }

    const nuevoReporte = new Reporte({
        tipo,
        quePasa,
        direccion,
        informacionExtra,
        duracion,
        latLng,
        iconoRes
    });
    await nuevoReporte.save();

    // Notificamos a los usuarios suscritos
    // const usuarios = await Usuario.find({ tipoSuscripcion: tipo });
    // usuarios.forEach(usuario => {
    //     admin.messaging().send({
    //         token: usuario.token,
    //         notification: {
    //             title: `Nuevo reporte ${tipo}!`,
    //             body: `${quePasa} - ${direccion}`
    //         },
    //         data: { quePasa, direccion, informacionExtra, tipo, fecha: nuevoReporte.fecha }
    //     });
    // });

    // notificarClientes('nuevoReporte', nuevoReporte);

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
