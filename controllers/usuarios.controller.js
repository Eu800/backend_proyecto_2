const Usuario = require('../models/usuario.model');

exports.registrarUsuario = async (req, res) => {
    try {
        const { token, tipoSuscripcion, nombre, mail, contrasenia, fechaNacimiento } = req.body;

        // Verificar que tipoSuscripcion sea un string válido
        if (typeof tipoSuscripcion !== 'string' || tipoSuscripcion.trim() === '') {
            return res.status(400).json({ error: 'El tipo de suscripción debe ser un string no vacío.' });
        }

        // Lista de suscripciones válidas
        const tiposValidos = ['actividad_criminal', 'cierre_vehicular ', 'cierre_peatonal', 'desastre_natural', 'incendio', 'sin_suscripcion'];

        // Validar que el tipoSuscripcion sea correcto
        if (!tiposValidos.includes(tipoSuscripcion)) {
            return res.status(400).json({ error: 'El tipo de suscripción no es válido.' });
        }

        // Buscar usuario por token
        let usuario = await Usuario.findOne({ token });

        if (!usuario) {
            // ✅ Si el usuario no existe, se crea con "sin_suscripcion"
            usuario = new Usuario({
                token,
                tipoSuscripcion: ['sin_suscripcion'],
                nombre,
                mail,
                contrasenia,
                fechaNacimiento
            });
        } else {
            // ✅ Si el usuario ya existe, actualizar sus datos
            usuario.nombre = nombre || usuario.nombre;
            usuario.mail = mail || usuario.mail;
            usuario.contrasenia = contrasenia || usuario.contrasenia;
            usuario.fechaNacimiento = fechaNacimiento || usuario.fechaNacimiento;
        }

        // ✅ Agregar la nueva suscripción sin duplicar
        if (!usuario.tipoSuscripcion.includes(tipoSuscripcion)) {
            usuario.tipoSuscripcion.push(tipoSuscripcion);
        }

        // ✅ Si hay más de una suscripción y "sin_suscripcion" está en la lista, se elimina
        if (usuario.tipoSuscripcion.length > 1) {
            usuario.tipoSuscripcion = usuario.tipoSuscripcion.filter(tipo => tipo !== "sin_suscripcion");
        }

        // Guardar usuario en la base de datos
        await usuario.save();

        res.status(200).json(usuario);

    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


exports.eliminarSuscripcion = async (req, res) => {
    try {
        const { token, eliminarSuscripcion } = req.body;

        // Verificar que eliminarSuscripcion es un string válido
        if (typeof eliminarSuscripcion !== 'string' || eliminarSuscripcion.trim() === '') {
            return res.status(400).json({ error: 'El campo eliminarSuscripcion debe ser un string no vacío.' });
        }

        // Lista de suscripciones válidas
        const tiposValidos = ['actividad_criminal', 'cierre_vehicular ', 'cierre_peatonal', 'desastre_natural', 'incendio', 'sin_suscripcion'];

        // Validar que el valor en eliminarSuscripcion sea correcto
        if (!tiposValidos.includes(eliminarSuscripcion)) {
            return res.status(400).json({ error: 'El tipo de suscripción a eliminar no es válido.' });
        }

        // Buscar usuario por token
        let usuario = await Usuario.findOne({ token });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // ✅ Eliminar la suscripción si existe en el array
        usuario.tipoSuscripcion = usuario.tipoSuscripcion.filter(tipo => tipo !== eliminarSuscripcion);

        // ✅ Si después de eliminar todas las suscripciones la lista queda vacía, se asigna "sin_suscripcion"
        if (usuario.tipoSuscripcion.length === 0) {
            usuario.tipoSuscripcion = ['sin_suscripcion'];
        }

        // Guardar cambios en la base de datos
        await usuario.save();

        res.status(200).json(usuario);

    } catch (error) {
        console.error('Error eliminando suscripción:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};