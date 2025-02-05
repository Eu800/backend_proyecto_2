const Evento = require('../models/evento.model');
const Usuario = require('../models/usuario.model');
const admin = require('firebase-admin');
const { notificarClientes } = require('./websocket.controller');


exports.crearEvento = async (req, res) => {
    const { tipo, descripcion, fecha, latitud, longitud, informacionExtra, duracion, duracionTipo } = req.body;
    console.log(req);

    if (!['actividad_criminal', 'trafico_vehicular', 'cierre_peatonal', 'desastre_natural', 'incendio'].includes(tipo)) {
        return res.status(400).send({ error: 'Tipo de evento no válido.' });
    }

    const nuevoEvento = new Evento({ tipo, descripcion, fecha, latitud, longitud, informacionExtra, duracion, duracionTipo });
    await nuevoEvento.save();

    // // Notificamos a los usuarios suscritos
    // const usuarios = await Usuario.find({ tipoSuscripcion: tipo });
    // usuarios.forEach(usuario => {
    //     admin.messaging().send({
    //         token: usuario.token,
    //         notification: {
    //             title: `Nuevo evento ${tipo}!`,
    //             body: `${nombre} - ${ubicacion}`
    //         },
    //         data: { nombre, ubicacion, descripcion, tipo, fecha }
    //     });
    // });

    // notificarClientes('nuevoEvento', nuevoEvento);

    res.status(201).json(nuevoEvento);
};

exports.obtenerEventos = async (req, res) => {
    const eventos = await Evento.find();
    res.status(200).json(eventos);
};
