const Usuario = require('../models/usuario.model');

exports.contarUsuariosPorSuscripcion = async (req, res) => {
    try {
        const { tipoSuscripcion } = req.params; // Obtiene el tipo de suscripción desde la URL

        // Lista de tipos válidos
        const tiposValidos = ['actividad_criminal', 'trafico_vehicular', 'cierre_peatonal', 'desastre_natural', 'incendio'];
        
        // Validar si el tipo de suscripción es correcto
        if (!tiposValidos.includes(tipoSuscripcion)) {
            return res.status(400).json({ error: 'Tipo de suscripción inválido' });
        }

        // Contar usuarios que tienen esta suscripción en su array de suscripciones
        const cantidad = await Usuario.countDocuments({ tipoSuscripcion: tipoSuscripcion });

        // Responder con la cantidad encontrada
        res.status(200).json({ tipoSuscripcion, cantidad });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
