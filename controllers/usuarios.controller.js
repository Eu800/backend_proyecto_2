const Usuario = require('../models/usuario.model');

exports.registrarUsuario = async (req, res) => {

    try{

        const { token, tipoSuscripcion, nombre, mail, contraseña, fecha_nacimiento } = req.body;

        // Validar que el tipo de suscripción sea válido
        const tiposValidos = ['actividad_criminal', 'trafico_vehicular', 'cierre_peatonal', 'desastre_natural', 'incendio'];
        if (!tiposValidos.includes(tipoSuscripcion)) {
            return res.status(400).json({ error: 'Tipo de suscripción no válido.' });
        }

        // Buscar y actualizar/crear usuario
        const usuario = await Usuario.findOneAndUpdate(
            { token },  // Buscar por token
            { tipoSuscripcion, nombre, mail, contraseña, fecha_nacimiento }, // Datos a actualizar o insertar
            { upsert: true, new: true, setDefaultsOnInsert: true } // Crear si no existe
        );

        res.status(200).json(usuario);

    }catch(error){

        console.error('Error registrando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }

};
